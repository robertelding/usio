# Chrome Web Store Listing

Everything below is ready to paste into the Chrome Web Store Developer Dashboard. Keep claims in sync with the extension version being submitted.

## Store Fields

Name: usio - Screen Recorder & Video Messages

Short name: usio

Summary (132 char max, mirrors manifest description): Record your screen, tab, camera and mic in Chrome, then share a video link the moment you stop.

Category: Productivity → Communication

Language: English

Website: https://usio.co.uk

Support: https://usio.co.uk/support

Privacy policy: https://usio.co.uk/privacy

## Detailed Description (paste as plain text)

usio is a screen recorder for Chrome. Record. Stop. Share.

Record a tab, a window, your full screen, or just your camera. Your video uploads while you record, so the link is ready the moment you stop. No exports, no waiting.

usio is a simple Loom alternative for quick video messages: show what you mean, send a link, and skip the meeting.

What you can record

• The current tab, for web app demos and bug reports.
• Your full screen or a single window.
• Your camera on its own, for quick updates.
• Your mic, system audio (where Chrome supports it), and your camera in a bubble over your screen.

While you record

• Pause and pick up where you left off.
• Draw on the page to point things out.
• Blur anything you don't want people to see.

After you stop

• One link to share. People watch in their browser.
• Viewers can comment and react.
• Add a password to any link.
• Transcripts, plus AI titles, summaries and chapters.
• A shared library for your team, with folders and spaces.
• Keep videos in your own S3-compatible storage.
• Moving from Loom? Import your old videos from their share links.

Made for everyday video

Async standups, code reviews, bug reports, product demos, customer support, onboarding, tutorials and design feedback. Record once, share a link.

How it works

1. Click the usio icon and pick tab, window, full screen or camera.
2. Choose your mic and camera, then hit record.
3. Stop. Your video is already in your usio library and the link is ready to share.

Also on the web

You can record from usio.co.uk in any browser too. Everything lands in the same library.

usio is open source under AGPLv3: https://github.com/robertelding/usio

## SEO Positioning

Primary keywords (use naturally in the description, never stuffed):

- screen recorder / screen recorder for Chrome
- screen capture / screen recording
- record browser tab
- screen recorder with camera and microphone
- webcam recorder
- video messages / async video
- Loom alternative (used exactly once in the detailed description; never in the name, summary or screenshot text)

Name strategy: "usio - Screen Recorder & Video Messages" leads with the brand, then covers the highest-volume query and what usio is for. It matches the manifest name.

Summary strategy: lists the capture surfaces, then ends on the instant link. It matches the manifest description word for word.

Review-safety notes:

- Keep every claim true for the submitted build (system audio is "where Chrome supports it").
- Name competitors only in the detailed description: "Loom alternative" once, and Loom once more for the importer.
- Don't mention prices, plan names, free tiers or limits until usio pricing is set.
- Don't claim certifications or compliance (SOC 2, HIPAA, GDPR, audits). usio has none.
- Don't mention desktop or mobile apps. usio has neither yet.

## Icons

`public/icons/` is generated from the usio mark `apps/web/public/usio-icon.svg`, the same mark the web app uses as its favicon:

- icon-16/32/48: full-bleed, used for toolbar and favicon contexts.
- icon-128: 96x96 artwork centred with 16px transparent padding, per Chrome Web Store icon guidelines (this is the store listing icon).
- icon-256: same padded treatment at 2x.

The committed icon-128 and icon-256 are full-bleed. Regenerate them before you submit.

Regenerate with rsvg-convert:

```sh
cd apps/chrome-extension/public/icons
for s in 16 32 48; do rsvg-convert -w $s -h $s ../../../web/public/usio-icon.svg -o icon-$s.png; done
rsvg-convert -w 96 -h 96 --page-width 128 --page-height 128 --top 16 --left 16 ../../../web/public/usio-icon.svg -o icon-128.png
rsvg-convert -w 192 -h 192 --page-width 256 --page-height 256 --top 32 --left 32 ../../../web/public/usio-icon.svg -o icon-256.png
```

## Promotional Images

Store sources live in `store-assets/`. PNGs are full-bleed 24-bit PNGs with square corners and no alpha channel, as the store requires.

- promo-small.png: 440x280 small promo tile (required).
- promo-marquee.png: 1400x560 marquee tile (optional, needed for feature placement).

The SVG sources follow the usio design system: the mark on a signal `#F2542D` tile, ink `#15171C` and ink-muted `#585D68` text on paper `#F6F6F3`, the wordmark and "Record. Stop. Share." in Schibsted Grotesk 800, body text in Figtree 400 and 600, and the timecode in JetBrains Mono 500.

The fonts are the variable woff2 files in `public/fonts`, with their OFL licences beside them. Renderers can't use them as they are: fontconfig and resvg don't read woff2, resvg only sees a variable font's default instance, and Figtree's variable font names its family "Figtree Light". The script below cuts static TTFs at the weights the SVGs use and gives each its plain family name. Render with resvg (`brew install resvg` or `cargo install resvg`), which takes the font directory as an argument. librsvg builds that resolve text through CoreText ignore `FONTCONFIG_FILE` on macOS and fall back to system fonts.

```sh
cd apps/chrome-extension
python3 -m pip install fonttools brotli pillow
FONTS=/tmp/usio-fonts
python3 - public/fonts "$FONTS" <<'EOF'
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

src, out = Path(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
faces = [
    ("schibsted-grotesk", "Schibsted Grotesk", 800),
    ("figtree", "Figtree", 400),
    ("figtree", "Figtree", 600),
    ("jetbrains-mono", "JetBrains Mono", 500),
]
for stem, family, weight in faces:
    font = instantiateVariableFont(TTFont(src / f"{stem}-latin-wght-normal.woff2"), {"wght": weight})
    font.flavor = None
    font["OS/2"].usWeightClass = weight
    names = font["name"]
    for name_id in (1, 2, 4, 6, 16, 17):
        names.removeNames(nameID=name_id)
    names.setName(family, 1, 3, 1, 0x409)
    names.setName("Regular", 2, 3, 1, 0x409)
    names.setName(f"{family} {weight}", 4, 3, 1, 0x409)
    names.setName(f"{family.replace(' ', '')}-{weight}", 6, 3, 1, 0x409)
    font.save(out / f"{stem}-{weight}.ttf")
EOF
resvg --skip-system-fonts --use-fonts-dir "$FONTS" -w 440 -h 280 store-assets/promo-small.svg "$FONTS/promo-small.png"
resvg --skip-system-fonts --use-fonts-dir "$FONTS" -w 1400 -h 560 store-assets/promo-marquee.svg "$FONTS/promo-marquee.png"
python3 -c 'import sys; from PIL import Image; [Image.open(f"{sys.argv[1]}/{n}.png").convert("RGB").save(f"store-assets/{n}.png", optimize=True) for n in ("promo-small", "promo-marquee")]' "$FONTS"
```

`resvg --list-fonts` with the same font flags shows which faces it loaded. Check that the PNGs show Schibsted Grotesk and Figtree, not a fallback, before you upload them.

## Screenshot Plan

Use 1280x800 PNG screenshots, full bleed, square corners, no padding. Capture the rebranded extension against a real page, not a blank tab. Headlines follow the usio voice: short, sentence case, "usio" in lowercase.

1. Recorder panel open with the recording mode selector (tab / window / full screen / camera) visible.
2. Recording setup showing microphone and camera selectors plus the system audio toggle.
3. Recording in progress with the recording bar and camera bubble on a real page.
4. Upload/completion state with the share-link handoff.
5. The usio share page at usio.co.uk/s/… (player, comments, summary, chapters) after a recording is available.

All five files in `store-assets/` still show Cap UI and need re-capturing:

- screenshot-1-record.png: "Cap" panel header, Cap's blue ring mark in the toolbar and panel, blue "Start recording" button.
- screenshot-2-modes.png: "Cap" panel header and blue ring mark, blue mode selector.
- screenshot-3-devices.png: "Cap" panel header and blue ring mark, blue camera bubble and "Start recording" button.
- screenshot-4-upload.png: Cap's blue ring mark in the toolbar and recording bar.
- screenshot-5-share.png: cap.so URLs in the address bar and "Link copied" toast, "— Cap" tab title, Cap logo on the player, and the headline copy "Send a Cap the moment you finish. Open source, owned by you."

## Review Notes: Permission Justifications

- activeTab and scripting: show the recording controls overlay on the page the user is recording.
- tabCapture: record the current browser tab when the user selects tab recording.
- offscreen: run capture, encoding, and upload outside the recorder panel so recordings survive closing it.
- storage: remember account session, selected devices, and recording preferences.
- identity: sign the user in to their usio account.
- host permissions: inject the recording overlay and camera preview on pages the user chooses to record.

Submission checklist: icon present (128px padded), summary under 132 chars, at least one 1280x800 screenshot of the usio UI, small promo tile uploaded, privacy policy URL set and the page describes usio, permission justifications filled in.
