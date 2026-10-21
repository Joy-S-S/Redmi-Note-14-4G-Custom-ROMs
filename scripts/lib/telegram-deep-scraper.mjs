import { exec, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * Fetch URL via curl (forced IPv4, stdout) with native fetch fallback
 */
export async function fetchHtmlWithFallback(url) {
  try {
    const html = execSync(`curl.exe -s -L -4 -m 12 "${url}"`, {
      maxBuffer: 10 * 1024 * 1024,
      encoding: "utf8",
    });
    if (html && html.length > 50) {
      return html;
    }
  } catch {
    // Fall back to native fetch
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timer);
    if (res.ok) {
      return await res.text();
    }
  } catch {
    // Ignore
  }

  return "";
}

/**
 * Fetch channel posts from Telegram web preview with multi-page support
 */
export async function fetchChannelPosts(channelUsername = "TanzaniteUpdate", pages = 3, startBefore = "") {
  let currentBefore = startBefore;
  const posts = [];
  const seenIds = new Set();

  for (let p = 0; p < pages; p++) {
    const url = currentBefore
      ? `https://t.me/s/${channelUsername}?before=${currentBefore}`
      : `https://t.me/s/${channelUsername}`;

    const html = await fetchHtmlWithFallback(url);
    if (!html) break;

    const rawBlocks = html.split(/<div class="tgme_widget_message_wrap[^"]*"/);

    for (let i = 1; i < rawBlocks.length; i++) {
      const block = rawBlocks[i];
      const postMatch = block.match(/data-post="([^"]+)"/);
      const postId = postMatch ? postMatch[1] : `post-${p}-${i}`;
      if (seenIds.has(postId)) continue;

      const textMatch = block.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
      if (!textMatch) continue;

      const textHtml = textMatch[1];
      // Must be a ROM or Port post
      if (!/#(?:ROM|Port|Hyperos|Mod)\b/i.test(textHtml) && !/build date/i.test(textHtml)) {
        continue;
      }

      seenIds.add(postId);

      const linkMatches = [...textHtml.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
      const links = linkMatches.map((lm) => ({
        label: lm[2].replace(/<[^>]+>/g, "").trim(),
        url: lm[1],
      }));

      const photoMatch = block.match(/tgme_widget_message_photo_wrap[\s\S]*?background-image:url\('([^']+)'\)/);
      const photoUrl = photoMatch ? photoMatch[1] : "";

      posts.push({
        postId,
        photoUrl,
        html: textHtml,
        links,
      });
    }

    const prevMatch = html.match(/<link rel="prev" href="\/s\/[A-Za-z0-9_]+\?before=(\d+)"/);
    if (prevMatch) {
      currentBefore = prevMatch[1];
    } else {
      break;
    }
  }

  return posts;
}

/**
 * Deep scrape changelog bullet points from raw GitHub device changelog or source Telegram post
 */
export async function resolveChangelogBullets(sourceUrl, deviceUrl) {
  const bullets = [];

  // 1. Try Device Changelog URL (e.g. raw GitHub)
  if (deviceUrl && (deviceUrl.includes("raw.githubusercontent.com") || deviceUrl.includes("github.com"))) {
    try {
      const rawUrl = deviceUrl.replace("github.com/", "raw.githubusercontent.com/").replace("/blob/", "/");
      const raw = await fetchHtmlWithFallback(rawUrl);
      if (raw && raw.length > 20 && !raw.includes("404: Not Found")) {
        const lines = raw.split("\n");
        const hasHashHeader = lines.some((l) => l.trim().startsWith("#"));
        let inSection = !hasHashHeader; // If no headers, read from start

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("#")) {
            if (inSection && bullets.length > 0) break; // Reached next version
            inSection = true;
            continue;
          }
          if (inSection && (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("•"))) {
            const clean = trimmed.replace(/^[-*•\s]+/, "").trim();
            if (clean && !bullets.includes(clean)) bullets.push(clean);
          }
        }
        if (bullets.length > 0) return bullets.slice(0, 15);
      }
    } catch {
      // Ignore
    }
  }

  // 2. Try Telegraph Changelog URL (e.g. https://telegra.ph/Changelog-...)
  const telegraphUrl = [deviceUrl, sourceUrl].find((u) => u && u.includes("telegra.ph/"));
  if (telegraphUrl) {
    try {
      const html = await fetchHtmlWithFallback(telegraphUrl);
      if (html && !html.includes("404 Not Found") && !html.includes("Page Not Found")) {
        const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        if (articleMatch) {
          const text = articleMatch[1];
          const paras = text.split(/<\/?(?:p|h\d|li|br)[^>]*>/i);
          for (const p of paras) {
            const clean = p.replace(/<[^>]+>/g, "").trim();
            const line = clean.replace(/^[•\-*▪▫\s]+/, "").trim();
            if (
              line &&
              line.length > 2 &&
              !bullets.includes(line) &&
              !line.toLowerCase().startsWith("changelog") &&
              !line.toLowerCase().startsWith("http")
            ) {
              bullets.push(line);
            }
          }
          if (bullets.length > 0) return bullets.slice(0, 15);
        }
      }
    } catch {
      // Ignore
    }
  }

  // 3. Try Source Changelog URL (e.g. Telegram post embed)
  const tgUrl = [sourceUrl, deviceUrl].find((u) => u && u.includes("t.me/"));
  if (tgUrl) {
    try {
      const match = tgUrl.match(/(?:t\.me\/(?:s\/)?)?([A-Za-z0-9_]+)\/(\d+)/);
      if (match) {
        const embedUrl = `https://t.me/${match[1]}/${match[2]}?embed=1`;
        const html = await fetchHtmlWithFallback(embedUrl);
        const textMatch = html.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        if (textMatch) {
          const clean = textMatch[1].replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "");
          const lines = clean.split("\n");
          for (const l of lines) {
            const trimmed = l.trim();
            if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
              const item = trimmed.replace(/^[-*•\s]+/, "").trim();
              if (item && !bullets.includes(item) && !item.toLowerCase().includes("http")) {
                bullets.push(item);
              }
            }
          }
          if (bullets.length > 0) return bullets.slice(0, 15);
        }
      }
    } catch {
      // Ignore
    }
  }

  // 4. Fallback clean default bullets (never return raw URLs)
  if (bullets.length === 0) {
    return [
      "Upstream source update",
      "Performance and battery optimizations",
      "Clean build for Tanzanite",
    ];
  }

  return bullets;
}

/**
 * Fetch a single Telegram post by its URL or post ID
 */
export async function fetchSingleTelegramPost(postUrlOrId) {
  const clean = postUrlOrId.trim();
  const match = clean.match(/(?:t\.me\/(?:s\/)?)?([A-Za-z0-9_]+)\/(\d+)/);
  let embedUrl = "";
  let targetPostId = "";

  if (match) {
    const channel = match[1];
    const id = match[2];
    embedUrl = `https://t.me/${channel}/${id}?embed=1`;
    targetPostId = `${channel}/${id}`;
  } else {
    embedUrl = clean.startsWith("http") ? clean : `https://t.me/${clean}`;
  }

  const html = await fetchHtmlWithFallback(embedUrl);
  if (!html) return null;

  let textHtml = "";
  let photoUrl = "";
  let links = [];

  const textMatch = html.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
  if (!textMatch) return null;
  textHtml = textMatch[1];

  const linkMatches = [...textHtml.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  links = linkMatches.map((lm) => ({
    label: lm[2].replace(/<[^>]+>/g, "").trim(),
    url: lm[1],
  }));

  const photoMatch = html.match(/tgme_widget_message_photo_wrap[\s\S]*?background-image:url\('([^']+)'\)/);
  if (photoMatch) {
    photoUrl = photoMatch[1];
  }

  const postMatch = html.match(/data-post="([^"]+)"/);
  const postId = targetPostId || (postMatch ? postMatch[1] : clean);

  return {
    postId,
    photoUrl,
    html: textHtml,
    links,
  };
}

/**
 * Deep scrape screenshots from linked Telegram gallery or Telegraph article
 */
export async function fetchScreenshotsFromGallery(screenshotsUrl) {
  if (!screenshotsUrl) return [];

  const images = [];

  function extractPhotos(sourceHtml) {
    if (!sourceHtml) return [];
    const matches = [...sourceHtml.matchAll(/background-image:url\('([^']+)'\)/g)].map((m) => m[1]);
    return matches.filter((img) => {
      return (
        !img.includes("emoji") &&
        !img.startsWith("data:") &&
        (img.includes("telesco.pe") || /\.(jpg|jpeg|png|webp)/i.test(img))
      );
    });
  }

  try {
    // 1. Telegram post link (e.g. https://t.me/iarchives0/103 or https://t.me/ssplij/199?single)
    if (screenshotsUrl.includes("t.me/")) {
      const match = screenshotsUrl.match(/(?:t\.me\/(?:s\/)?)?([A-Za-z0-9_]+)\/(\d+)/);
      if (match) {
        const channel = match[1];
        const postId = Number(match[2]);

        // Try embed first (fastest)
        const embedUrl = `https://t.me/${channel}/${postId}?embed=1`;
        const embedHtml = await fetchHtmlWithFallback(embedUrl);
        const embedPhotos = extractPhotos(embedHtml);
        for (const p of embedPhotos) {
          if (!images.includes(p)) images.push(p);
        }

        // If embed had no real photos, or if it might be an album post (Telegram albums span adjacent IDs),
        // check /s/ channel preview
        if (images.length === 0) {
          const sUrl = `https://t.me/s/${channel}/${postId}`;
          const sHtml = await fetchHtmlWithFallback(sUrl);

          if (sHtml) {
            const blocks = sHtml.split(/<div class="tgme_widget_message_wrap[^"]*"/);
            for (let i = 1; i < blocks.length; i++) {
              const b = blocks[i];
              const pMatch = b.match(/data-post="[^"]*\/(\d+)"/);
              const pNum = pMatch ? Number(pMatch[1]) : null;

              // If block is within ±12 of targeted post ID
              if (pNum !== null && Math.abs(pNum - postId) <= 12) {
                const blockPhotos = extractPhotos(b);
                for (const p of blockPhotos) {
                  if (!images.includes(p)) images.push(p);
                }
              }
            }

            // Fallback: If still empty, grab any photos found on that preview page
            if (images.length === 0) {
              const anyPhotos = extractPhotos(sHtml);
              for (const p of anyPhotos) {
                if (!images.includes(p)) images.push(p);
              }
            }
          }
        }
      }
    }

    // 2. Telegraph link (e.g. https://telegra.ph/...)
    else if (screenshotsUrl.includes("telegra.ph/")) {
      const html = await fetchHtmlWithFallback(screenshotsUrl);
      if (html) {
        const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)].map((m) => m[1]);
        for (let src of matches) {
          if (src.startsWith("/")) {
            src = `https://telegra.ph${src}`;
          }
          if (!images.includes(src)) {
            images.push(src);
          }
        }
      }
    }
  } catch (err) {
    console.warn(`Could not scrape screenshots from ${screenshotsUrl}:`, err.message);
  }

  return images.slice(0, 15);
}

/**
 * Download image to local path asynchronously without blocking the event loop
 */
export async function downloadImageFile(imageUrl, targetPath) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 1. Fast async curl with IPv4 flag (-4)
  return new Promise((resolve) => {
    exec(`curl.exe -4 -s -L -m 15 "${imageUrl}" -o "${targetPath}"`, (err) => {
      if (!err && fs.existsSync(targetPath) && fs.statSync(targetPath).size > 500) {
        resolve(true);
      } else {
        // Fallback to fetch
        fetch(imageUrl)
          .then((res) => (res.ok ? res.arrayBuffer() : null))
          .then((buf) => {
            if (buf) {
              fs.writeFileSync(targetPath, Buffer.from(buf));
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => resolve(false));
      }
    });
  });
}
