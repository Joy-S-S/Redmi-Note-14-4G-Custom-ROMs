/**
 * Parser for Redmi Note 14 4G (tanzanite) Telegram release posts
 */

export function parseTelegramPost(post) {
  const { postId, html, photoUrl, links = [] } = post;

  // Convert HTML breaks to newlines and decode common entities
  const cleanText = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&#33;/g, "!")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ");

  const lines = cleanText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const firstLine = lines[0] || "";

  // 1. Detect Category (#Port, #Hyperos, or custom rom)
  const isPort =
    /#Port\b/i.test(cleanText) ||
    /#Hyperos\b/i.test(cleanText) ||
    /\bport\b/i.test(firstLine) ||
    /from xiaomi/i.test(cleanText);

  const category = isPort ? "ported-rom" : "custom-rom";

  // 2. Name & Version
  // E.g.: "Project Infinity X 4.1 | UNOFFICIAL | Android 17 QPR0" -> "Project Infinity X 4.1"
  let name = firstLine;
  if (firstLine.includes("|")) {
    name = firstLine.split("|")[0].trim();
  }

  // 3. Android Version
  let androidVersion = "16";
  const aMatch =
    cleanText.match(/Android\s*(\d+)/i) ||
    cleanText.match(/#A(\d+)\b/i) ||
    firstLine.match(/\bA(\d+)\b/i);
  if (aMatch) {
    androidVersion = aMatch[1];
  }

  // 4. GApps status & Mode
  const hasGappsLink = links.some((l) => /gapps/i.test(l.label));
  const hasVanillaLink = links.some((l) => /vanilla/i.test(l.label));
  const isVanillaOnly =
    (/\bVANILLA\b/i.test(firstLine) && !/\bGMS\b/i.test(firstLine) && !hasGappsLink) ||
    (/#Vanilla\b/i.test(cleanText) && !hasGappsLink);

  let gappsMode = "gapps";
  let gapps = true;

  if (hasVanillaLink && hasGappsLink) {
    gappsMode = "both";
    gapps = true;
  } else if (isVanillaOnly || (hasVanillaLink && !hasGappsLink)) {
    gappsMode = "vanilla";
    gapps = false;
  } else {
    gappsMode = "gapps";
    gapps = true;
  }

  // 5. Build Date: e.g. "Build Date: 20/10/'26" or "Build date: 05/10/\"26"
  let date = new Date().toISOString().split("T")[0];
  const dateMatch = cleanText.match(/Build\s*date:\s*(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](?:'|")?(\d{2,4})/i);
  if (dateMatch) {
    const day = String(dateMatch[1]).padStart(2, "0");
    const month = String(dateMatch[2]).padStart(2, "0");
    let year = dateMatch[3];
    if (year.length === 2) {
      year = "20" + year;
    }
    date = `${year}-${month}-${day}`;
  }

  // 6. Developer: e.g. "By : @Yaseakun"
  let developer = "Anonymous";
  const devMatch = cleanText.match(/By\s*:\s*@?([A-Za-z0-9_]+)/i);
  if (devMatch) {
    developer = devMatch[1].replace(/^@/, "");
  }

  // 7. Links extraction
  let downloadUrl = "";
  let downloadGappsUrl = "";
  let downloadVanillaUrl = "";
  let vendorBootUrl = "";
  let screenshotsUrl = "";
  let supportGroup = "";
  let donateUrl = "";
  let flashingInstructionsUrl = "";
  let sourceChangelogUrl = "";
  let deviceChangelogUrl = "";

  for (const link of links) {
    const label = link.label.toLowerCase();
    const url = link.url;

    if (label === "gapps") {
      downloadGappsUrl = url;
    } else if (label === "vanilla") {
      downloadVanillaUrl = url;
    } else if (label === "download" || label === "rom" || label.includes("download")) {
      downloadUrl = url;
    } else if (label.includes("vendor_boot") || label.includes("vendor")) {
      vendorBootUrl = url;
    } else if (label.includes("screenshot")) {
      screenshotsUrl = url;
    } else if (label.includes("support") || label.includes("group") || label.includes("chat")) {
      supportGroup = url;
    } else if (label.includes("donate")) {
      donateUrl = url;
    } else if (label.includes("flashing") || label.includes("instruction") || label.includes("guide")) {
      flashingInstructionsUrl = url.includes("Redmi-Note-14-4G-tanzanite---Flashing-guide-05-28") ? "/guide/" : url;
    } else if (label.includes("note")) {
      if (!flashingInstructionsUrl) {
        flashingInstructionsUrl = url.includes("Redmi-Note-14-4G-tanzanite---Flashing-guide-05-28") ? "/guide/" : url;
      }
    } else if (label === "source" || (label.includes("source") && label.includes("changelog"))) {
      sourceChangelogUrl = url;
    } else if (label === "device" || (label.includes("device") && label.includes("changelog"))) {
      deviceChangelogUrl = url;
    } else if (label.includes("changelog")) {
      if (!sourceChangelogUrl) {
        sourceChangelogUrl = url;
      } else if (!deviceChangelogUrl) {
        deviceChangelogUrl = url;
      }
    }
  }

  // Handle single vs dual download links:
  // If both GApps and Vanilla links exist
  if (downloadGappsUrl && downloadVanillaUrl) {
    downloadUrl = downloadGappsUrl;
  } else if (downloadGappsUrl && !downloadVanillaUrl) {
    downloadUrl = downloadGappsUrl;
  } else if (downloadVanillaUrl && !downloadGappsUrl) {
    downloadUrl = downloadVanillaUrl;
  } else if (downloadUrl) {
    // Single generic download link: default to vanilla unless explicitly GApps
    if (gapps) {
      downloadGappsUrl = downloadUrl;
    } else {
      downloadVanillaUrl = downloadUrl;
    }
  } else {
    downloadUrl = downloadGappsUrl || downloadVanillaUrl || "";
  }

  // 8. Sections extraction: Changelog, Notes, Known Issues
  const changelog = [];
  const romNotes = [];
  const knownIssues = [];

  let currentSection = null;
  for (const line of lines) {
    const headerCheck = line.replace(/^[^\w\s]+/, "").trim();

    // 1. Changelog heading: e.g. "Changelog", "Changelogs", "Changelogs:", "Change log"
    if (/^change\s*logs?(?:\s*:|\b|$)/i.test(headerCheck)) {
      currentSection = "changelog";
      continue;
    }

    // 2. Notes heading: e.g. "Notes :", "Notes:", "Notes", "A17 QPR0 Notes:", "Additional Notes:"
    if (
      /^(?:(?:[a-z0-9\s]*qpr\d*|additional|rom|device)?\s*notes?\s*:|notes?$)/i.test(headerCheck) &&
      !/^(?:please|read|do not|flash|clean)\b/i.test(headerCheck)
    ) {
      currentSection = "notes";
      continue;
    }

    // 3. Known issues heading: e.g. "Known issue:", "Known issues:", "Known issues", "Bugs:"
    if (/^(?:known\s*)?(?:issues?|bugs?)(?:\s*:|\b|$)/i.test(headerCheck)) {
      currentSection = "issues";
      continue;
    }

    // 4. Terminating sections: Credits, Testers, Follow us, Thanks, Hashtags
    if (
      /^(?:credits?|testers?|follow\s*us|thanks|special\s*thanks|donat(?:e|ion))\s*(?::|\b|$)/i.test(headerCheck) ||
      /^#\w+/.test(line) ||
      /^👉\s*@/.test(line)
    ) {
      currentSection = null;
      continue;
    }

    if (!currentSection) continue;

    // Remove leading bullet characters
    const cleanItem = line.replace(/^[•\-\*▪️▫️\s]+/, "").trim();
    if (!cleanItem) continue;

    if (currentSection === "changelog") {
      // Don't include raw links or common post link labels as changelog bullets
      if (
        !/^https?:\/\//i.test(cleanItem) &&
        !/^(?:source|device)(?:\s*\|\s*(?:source|device))?$/i.test(cleanItem) &&
        !/^(?:support(?:\s*group)?|flashing(?:\s*(?:guide|instructions?))?|screenshots?|downloads?|donate)$/i.test(cleanItem)
      ) {
        changelog.push(cleanItem);
      }
    } else if (currentSection === "notes") {
      romNotes.push(cleanItem);
    } else if (currentSection === "issues") {
      knownIssues.push(cleanItem);
    }
  }

  // Fallback defaults if empty: never write raw URLs into changelog
  if (changelog.length === 0) {
    if (!sourceChangelogUrl && !deviceChangelogUrl) {
      changelog.push("Initial release / upstream update");
    }
  }

  if (romNotes.length === 0) {
    romNotes.push("Backup data and IMEI before flashing.");
    if (vendorBootUrl) {
      romNotes.push("Flash matching vendor_boot before recovery.");
    }
  }

  return {
    postId,
    category,
    name,
    androidVersion,
    gapps,
    gappsMode,
    date,
    developer,
    coverPhotoUrl: photoUrl || "",
    screenshotsUrl,
    screenshotUrls: [], // Populated by deep scraper
    downloadUrl,
    downloadGappsUrl,
    downloadVanillaUrl,
    hasBothDownloads: Boolean(downloadGappsUrl && downloadVanillaUrl),
    vendorBootUrl,
    supportGroup,
    donateUrl,
    flashingInstructionsUrl,
    sourceChangelogUrl,
    deviceChangelogUrl,
    changelog,
    romNotes,
    knownIssues: knownIssues.length > 0 ? knownIssues : ["None reported"],
    rawPostText: cleanText,
  };
}
