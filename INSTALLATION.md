# Installation Guide

## Method 1: Quick Start (Recommended)

1. Open [WhatsApp Web](https://web.whatsapp.com)
2. Open DevTools (F12 or Cmd+Option+I)
3. Go to "Console" tab
4. Copy-paste the entire content of `christmasgreeter.js`
5. Press ENTER
6. Done! 🎉

## Method 2: Bookmarklet (Advanced)

1. Create a new bookmark in your browser
2. Set the URL to:
```javascript
javascript:(function(){/* paste minified code here */})();
```
3. Click the bookmark when on WhatsApp Web

## Method 3: Browser Extension (Coming Soon)

Stay tuned for a Chrome/Firefox extension!

## Verification

After installation, you should see:
- ✅ A console message: "ChristmasGreeter v1.0.0 ATTIVATO!"
- ✅ A button (default: 🎄) integrated in the message bar

## Troubleshooting

**Button not appearing?**
- Check console for errors
- Verify you're on web.whatsapp.com
- Try reloading the page

**Name extraction not working?**
- Set `debug: true` in CONFIG
- Check console output
- Report issue on GitHub with your findings
