"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import {
  BatteryCharging,
  CheckCircle2,
  CheckSquare,
  FileDown,
  Laptop,
  RotateCcw,
  ShieldAlert,
  Usb,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/site/callout";
import { CopyButton } from "@/components/site/copy-button";

const STEPS = [
  { id: "step-1", number: 1, title: "Download Required Files" },
  { id: "step-2", number: 2, title: "Boot into Fastboot Mode" },
  { id: "step-3", number: 3, title: "Flash vendor_boot.img" },
  { id: "step-4", number: 4, title: "Boot into Recovery Mode" },
  { id: "step-5", number: 5, title: "Format Data Partition" },
  { id: "step-6", number: 6, title: "Flash Custom ROM" },
  { id: "step-7", number: 7, title: "Post-Flash Steps (GApps / Magisk)" },
  { id: "step-8", number: 8, title: "Final Reboot to System" },
];

const emptySubscribe = () => () => {};

export function FlashingGuide() {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("rn14_guide_progress");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [flashMethod, setFlashMethod] = useState<"sideload" | "sdcard">("sideload");

  const toggleStep = (id: string) => {
    const next = { ...completedSteps, [id]: !completedSteps[id] };
    setCompletedSteps(next);
    try {
      localStorage.setItem("rn14_guide_progress", JSON.stringify(next));
    } catch {
      // Ignore localStorage errors
    }
  };

  const resetProgress = () => {
    setCompletedSteps({});
    try {
      localStorage.removeItem("rn14_guide_progress");
    } catch {
      // Ignore
    }
  };

  const completedCount = STEPS.filter((s) => completedSteps[s.id]).length;
  const progressPercent = Math.round((completedCount / STEPS.length) * 100);

  return (
    <div className="grid w-full max-w-full min-w-0 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
      {/* Sticky Table of Contents & Progress (Desktop) */}
      <aside className="surface hidden p-5 lg:block sticky top-24 no-print">
        <div className="border-b border-border pb-4 mb-4">
          <p className="eyebrow">Interactive checklist</p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">
              {completedCount} of {STEPS.length} completed
            </span>
            <span className="font-mono text-muted-foreground">{progressPercent}%</span>
          </div>
          {/* Progress Bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {completedCount > 0 ? (
            <button
              type="button"
              onClick={resetProgress}
              className="mt-2 inline-flex items-center gap-1 text-[0.7rem] text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              Reset checklist
            </button>
          ) : null}
        </div>

        <nav className="space-y-1 text-xs" aria-label="Table of Contents">
          <a
            href="#prerequisites"
            className="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Prerequisites
          </a>
          <a
            href="#video-tutorial"
            className="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Video Walkthrough
          </a>

          <div className="pt-2 pb-1 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground/80 px-2">
            Steps
          </div>

          {STEPS.map((step) => {
            const done = isMounted && Boolean(completedSteps[step.id]);
            return (
              <a
                key={step.id}
                href={`#${step.id}`}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 transition-colors ${
                  done
                    ? "text-emerald-400 font-medium bg-emerald-500/10"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="truncate">
                  {step.number}. {step.title}
                </span>
                {done ? <CheckCircle2 className="size-3 shrink-0 ml-1.5" /> : null}
              </a>
            );
          })}

          <div className="pt-2">
            <a
              href="#troubleshooting"
              className="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Troubleshooting
            </a>
          </div>
        </nav>
      </aside>

      {/* Guide Content */}
      <article className="space-y-10 min-w-0 max-w-full">
        {/* Important Warning */}
        <Callout variant="danger" title="Critical Warning">
          <p>
            Modifying system partitions and flashing custom recoveries carries inherent risk.
            It can void your manufacturer warranty and will permanently erase user data.
            Charge your battery to at least 80% (ideally 100%), backup your credentials, and follow the
            exact commands below.
          </p>
        </Callout>

        {/* Prerequisites Section */}
        <section id="prerequisites" className="scroll-mt-24">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Preparation</p>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Prerequisites Checklist
              </h2>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="surface p-4 flex gap-3">
              <Laptop className="size-5 shrink-0 text-foreground mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">Computer with ADB &amp; Fastboot</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Install Google Platform Tools on Windows, macOS, or Linux with USB drivers configured.
                </p>
              </div>
            </div>

            <div className="surface p-4 flex gap-3">
              <Usb className="size-5 shrink-0 text-foreground mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">High-Quality USB Cable</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Use the original Xiaomi cable or a tested data-transfer cable. Avoid loose hubs.
                </p>
              </div>
            </div>

            <div className="surface p-4 flex gap-3">
              <BatteryCharging className="size-5 shrink-0 text-foreground mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">Battery Charge</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ensure at least 80% to 100% battery before starting to prevent sudden power loss.
                </p>
              </div>
            </div>

            <div className="surface p-4 flex gap-3">
              <FileDown className="size-5 shrink-0 text-foreground mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">Downloaded ROM &amp; Vendor Boot</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Obtain your ROM package and the matching <code className="font-mono text-xs">vendor_boot.img</code> file.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section id="video-tutorial" className="scroll-mt-24 surface p-5 sm:p-6 no-print">
          <div className="flex items-center gap-2 mb-3">
            <Video className="size-4 text-foreground" />
            <h3 className="text-base font-semibold">Video Tutorial Walkthrough</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Watch the video by Yousef Sayed alongside these written steps for full clarity.
          </p>
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/KMPkcgs6JIY"
              title="Redmi Note 14 4G Custom ROM Flashing Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="space-y-6">
          <p className="eyebrow">Execution</p>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Step-by-Step Installation
          </h2>

          {/* Step 1 */}
          <div
            id="step-1"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-1"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  1
                </span>
                <h3 className="text-base font-semibold">Download Required Files</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-1")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-1"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-1"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-2">
              <p>Place the following files in your platform-tools directory on your computer:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-foreground">vendor_boot.img</strong> — Partition image matching your chosen ROM.
                </li>
                <li>
                  <strong className="text-foreground">Custom ROM zip</strong> — Downloaded from our{" "}
                  <Link href="/roms/" className="text-foreground underline">
                    Custom ROM catalog
                  </Link>.
                </li>
                <li>
                  <strong className="text-foreground">GApps package (optional)</strong> — E.g., MindTheGapps arm64 for your Android version if the ROM is Vanilla.
                </li>
                <li>
                  <strong className="text-foreground">Magisk / KernelSU (optional)</strong> — For root access after first boot.
                </li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div
            id="step-2"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-2"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  2
                </span>
                <h3 className="text-base font-semibold">Boot into Fastboot Mode</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-2")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-2"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-2"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-3">
              <p>
                Turn off your phone completely. Press and hold <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">Volume Down</kbd> + <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">Power</kbd> simultaneously until the orange Fastboot logo appears. Connect the phone to your PC via USB.
              </p>
              <div className="rounded-lg border border-border bg-black/60 p-3 font-mono text-xs text-foreground max-w-full overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-border/40 text-[0.7rem] text-muted-foreground">
                  <span>Verify connection</span>
                  <CopyButton value="fastboot devices" size="sm" />
                </div>
                <pre className="pt-2 text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all sm:break-normal">fastboot devices</pre>
              </div>
              <p>You should see your device serial number returned in the terminal window.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            id="step-3"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-3"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  3
                </span>
                <h3 className="text-base font-semibold">Flash vendor_boot.img</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-3")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-3"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-3"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-3">
              <div className="rounded-lg border border-destructive/30 bg-destructive/[0.06] p-3 text-destructive/90 flex gap-2.5">
                <ShieldAlert className="size-4 shrink-0 text-destructive mt-0.5" />
                <div>
                  <strong className="text-foreground">CRITICAL SAFETY INSTRUCTION:</strong>
                  <p className="mt-0.5">
                    Execute <code className="font-mono text-foreground font-semibold">fastboot reboot</code> — DO NOT USE <code className="font-mono text-foreground">fastboot reboot recovery</code>, or your partition tables may get corrupted!
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-black/60 p-3 font-mono text-xs text-foreground max-w-full overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-border/40 text-[0.7rem] text-muted-foreground">
                  <span>Fastboot commands</span>
                  <CopyButton
                    value="fastboot flash vendor_boot --slot=all vendor_boot.img&#10;fastboot reboot"
                    size="sm"
                  />
                </div>
                <pre className="pt-2 text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all sm:break-normal">
fastboot flash vendor_boot --slot=all vendor_boot.img&#10;fastboot reboot
                </pre>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div
            id="step-4"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-4"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  4
                </span>
                <h3 className="text-base font-semibold">Boot into Recovery</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-4")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-4"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-4"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-2">
              <p>
                As soon as the screen turns black after typing <code className="font-mono text-foreground">fastboot reboot</code>, immediately press and hold the <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">Volume Up</kbd> button.
              </p>
              <p>
                Keep holding Volume Up until the AOSP / TWRP recovery interface displays on screen.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div
            id="step-5"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-5"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  5
                </span>
                <h3 className="text-base font-semibold">Format Data</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-5")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-5"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-5"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-2">
              <p>In Recovery mode:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Select <strong>Factory Reset</strong> or <strong>Wipe</strong>.</li>
                <li>Tap <strong>Format Data</strong> (or Format data partition).</li>
                <li>Type &ldquo;yes&rdquo; or confirm formatting when prompted.</li>
                <li>Return to the main Recovery menu.</li>
              </ol>
            </div>
          </div>

          {/* Step 6 */}
          <div
            id="step-6"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-6"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  6
                </span>
                <h3 className="text-base font-semibold">Flash Custom ROM</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-6")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-6"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-6"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-3">
              <div className="flex flex-wrap gap-2 border-b border-border pb-3 no-print">
                <button
                  type="button"
                  onClick={() => setFlashMethod("sideload")}
                  className={`rounded-md px-3 py-1 font-medium ${
                    flashMethod === "sideload"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  ADB Sideload Method (Recommended)
                </button>
                <button
                  type="button"
                  onClick={() => setFlashMethod("sdcard")}
                  className={`rounded-md px-3 py-1 font-medium ${
                    flashMethod === "sdcard"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  SD Card Method
                </button>
              </div>

              {flashMethod === "sideload" ? (
                <div>
                  <p>In Recovery, select <strong>Apply Update</strong> &rarr; <strong>Apply from ADB</strong>.</p>
                  <div className="mt-3 rounded-lg border border-border bg-black/60 p-3 font-mono text-xs text-foreground max-w-full overflow-hidden">
                    <div className="flex items-center justify-between pb-2 border-b border-border/40 text-[0.7rem] text-muted-foreground">
                      <span>Command</span>
                      <CopyButton value="adb sideload rom-filename.zip" size="sm" />
                    </div>
                    <pre className="pt-2 text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all sm:break-normal">adb sideload rom-filename.zip</pre>
                  </div>
                  <p className="mt-2 text-[0.7rem] text-muted-foreground">
                    Tip: You can type <code className="font-mono text-foreground">adb sideload </code> and drag-and-drop the zip file into your terminal.
                  </p>
                </div>
              ) : (
                <div>
                  <p>If you placed the ROM zip on a microSD card:</p>
                  <ol className="list-decimal pl-5 space-y-1 mt-2">
                    <li>Select <strong>Apply Update</strong> &rarr; <strong>Choose from SD Card</strong>.</li>
                    <li>Navigate to the ROM file and confirm installation.</li>
                    <li>Wait for the flashing process to complete.</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Step 7 */}
          <div
            id="step-7"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-7"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  7
                </span>
                <h3 className="text-base font-semibold">Post-Flash Steps (Optional GApps &amp; Root)</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-7")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-7"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-7"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-2">
              <p>
                After the ROM finishes installing, if the recovery asks to <strong>Reboot to Recovery</strong> to flash additional zip files, select <strong>Yes</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>GApps:</strong> If your chosen ROM is Vanilla and requires Google Apps:
                  <div className="mt-1 rounded-lg border border-border bg-black/60 p-2 font-mono text-xs text-foreground max-w-full overflow-hidden">
                    <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all sm:break-normal">adb sideload MindTheGapps-15.0-arm64.zip</pre>
                  </div>
                </li>
                <li>
                  <strong>Magisk:</strong> If you wish to install root:
                  <div className="mt-1 rounded-lg border border-border bg-black/60 p-2 font-mono text-xs text-foreground max-w-full overflow-hidden">
                    <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all sm:break-normal">adb sideload Magisk-v28.0.zip</pre>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 8 */}
          <div
            id="step-8"
            className={`surface p-5 sm:p-6 scroll-mt-24 transition-colors ${
              completedSteps["step-8"] ? "border-emerald-500/40 bg-emerald-500/[0.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-md border border-border bg-muted font-mono text-xs font-semibold">
                  8
                </span>
                <h3 className="text-base font-semibold">Reboot to System</h3>
              </div>
              <button
                type="button"
                onClick={() => toggleStep("step-8")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground no-print"
                aria-pressed={Boolean(completedSteps["step-8"])}
              >
                <CheckSquare className="size-3.5" />
                <span>{completedSteps["step-8"] ? "Completed" : "Mark done"}</span>
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted-foreground space-y-2">
              <p>In Recovery, select <strong>Reboot System Now</strong>.</p>
              <p>
                First boot may take between 5 to 10 minutes while Android completes compilation and sets up internal encryption. Keep the device powered.
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section id="troubleshooting" className="scroll-mt-24 surface p-5 sm:p-6">
          <p className="eyebrow">Solutions</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
            Frequently Encountered Issues
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-lg border border-border p-3.5">
              <h4 className="font-semibold text-foreground">Sideload stops at 47%</h4>
              <p className="mt-1 text-muted-foreground">
                This is normal behavior on certain recovery builds. The terminal may display &ldquo;Total xfer: 1.00x&rdquo; or step 2/2 completed. Check device screen for completion.
              </p>
            </div>

            <div className="rounded-lg border border-border p-3.5">
              <h4 className="font-semibold text-foreground">Device not recognized in fastboot</h4>
              <p className="mt-1 text-muted-foreground">
                Check Windows Device Manager for an &ldquo;Android&rdquo; device with a yellow exclamation mark. Install the Google USB Driver or MediaTek VCOM driver.
              </p>
            </div>

            <div className="rounded-lg border border-border p-3.5">
              <h4 className="font-semibold text-foreground">Stuck in bootloop / ROM won&apos;t boot</h4>
              <p className="mt-1 text-muted-foreground">
                Re-flash the exact matching <code className="font-mono text-foreground">vendor_boot.img</code> from your ROM developer and format data again. Clean flash is mandatory when changing ROMs.
              </p>
            </div>

            <div className="rounded-lg border border-border p-3.5">
              <h4 className="font-semibold text-foreground">Cannot access recovery mode</h4>
              <p className="mt-1 text-muted-foreground">
                Power off phone. Hold Volume Up + Power simultaneously until the recovery logo displays. Ensure USB cable is unplugged if key combos are stubborn.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
