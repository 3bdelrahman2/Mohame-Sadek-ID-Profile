# Structure

```
index.html          → profile page
register.html        → lead-capture form (sends to your WhatsApp)
css/style.css
css/register.css
js/profile.js
js/register.js
data/client.json     → per-client content (name, phone, whatsapp, email, image)
assets/image/        → put the client's photo here as img-profile.jpg
```

# To deploy a new client
1. Copy this whole folder.
2. Edit `data/client.json` with the new client's info.
3. Drop their photo into `assets/image/img-profile.jpg`.
4. Upload to a real host (GitHub Pages, Netlify, Vercel — anything with http/https).
   Opening `index.html` directly from your file system will NOT work; the
   `fetch("data/client.json")` call is blocked by the browser on `file://` URLs.
5. Generate a QR code pointing at the hosted URL.

# What was fixed vs. the original files
- Added `dir="rtl" lang="ar"` — content is Arabic, page wasn't set to RTL.
- Fixed all file paths to actually match a `css/`, `js/`, `data/` folder structure.
- Added meta description + Open Graph tags so shared links show a preview instead of a bare URL.
- `profile.js` now shows a visible Arabic error message if the data fails to load, instead of leaving "---" or a blank page with only a console error.
- `register.js` now validates phone/email format, disables the submit button while sending, shows a success/error message, and adds a manual fallback link if the WhatsApp popup gets blocked (common in in-app browsers like Instagram/Facebook).
- WhatsApp number in `register.js` is now stored pre-stripped of `+`/spaces to match what `wa.me` actually expects.

# Still on you (not a bug, a business decision)
- Per-client info edits require you to manually update `client.json` — consider charging a small annual fee for this instead of doing it free indefinitely.
- No analytics on QR scans — can't currently prove "your card got scanned X times" to a client for renewal conversations.
- This is one static site per client. Fine under ~10 clients; past that, worth rebuilding as one dynamic app with a database.
