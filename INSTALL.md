# Quick Installation Guide

## Chrome/Edge Installation

1. **Download the extension**
   - Clone this repository or download as ZIP
   - Extract if downloaded as ZIP

2. **Open Chrome/Edge Extensions page**
   - Go to `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge)
   - Or click Menu → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the extension**
   - Click "Load unpacked" button
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

5. **Pin the extension (optional)**
   - Click the puzzle piece icon in the browser toolbar
   - Find "JSON to Table Converter" and click the pin icon
   - The extension icon will now appear in your toolbar

## Testing the Extension

1. **Test with sample data**
   - Open `test_data.json` in a text editor
   - Copy the JSON content
   - Click the extension icon
   - Paste the JSON and click "Convert & Copy"
   - Open Excel/Google Sheets and paste

2. **Test page detection**
   - Visit any webpage with JSON data (like an API endpoint)
   - Click the extension icon
   - Click "Detect JSON from Page"
   - The extension should find and load any JSON on the page

## Troubleshooting

### Extension won't load
- Make sure you selected the correct folder (should contain `manifest.json`)
- Check that all files are present (especially `manifest.json`, `popup.html`, `popup.js`)
- Look for error messages in the Extensions page

### Icons not showing
- SVG icons may not work in all browsers
- Convert the SVG files to PNG format if needed
- Update the `manifest.json` file paths accordingly

### Permission issues
- Make sure the extension has clipboard write permissions
- Check that the permissions are listed in `manifest.json`

## Updating the Extension

1. Make your changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## Support

For issues or questions, please check the main README.md file or create an issue on the repository. 