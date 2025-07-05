# JSON to Table Converter Browser Extension

A browser extension that converts JSON data to table format and copies it to the clipboard for easy import into spreadsheets.

## Features

- **JSON to Table Conversion**: Convert JSON objects and arrays into table format
- **Multiple Output Formats**: Support for Tab-separated (Excel/Sheets), CSV, and Pipe-separated formats
- **Flexible Options**: 
  - Include/exclude headers
  - Flatten nested objects
  - Handle different JSON structures
- **Auto-detection**: Detect JSON on web pages automatically
- **Context Menu**: Right-click on selected JSON to convert
- **Copy to Clipboard**: One-click copy to clipboard for easy pasting

## Installation

1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory
5. The extension should now appear in your browser toolbar

## Usage

### Basic Usage

1. Click the extension icon in the browser toolbar
2. Paste your JSON data in the text area
3. Configure options (headers, flattening, delimiter)
4. Click "Convert & Copy" to copy the table to clipboard
5. Paste into your spreadsheet application

### Auto-detection

- Click "Detect JSON from Page" to automatically find JSON on the current web page
- The extension will search for JSON in script tags, code blocks, and pre tags

### Context Menu

- Select JSON text on any web page
- Right-click and select "Convert JSON to Table"
- The JSON will be automatically loaded into the extension popup

### Preview

- Click "Preview" to see how the table will look before copying
- Useful for testing different options and configurations

## Supported JSON Formats

The extension handles various JSON structures:

- **Arrays of objects**: `[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]`
- **Single objects**: `{"name": "John", "age": 30, "city": "New York"}`
- **Nested objects**: Automatically flattened with dot notation
- **Arrays within objects**: Converted to JSON strings
- **Primitive values**: Wrapped in simple single-column tables

## Options

### Include Headers
- **On**: First row contains column names
- **Off**: Data only, no headers

### Flatten Nested Objects
- **On**: Nested objects become separate columns (e.g., `address.street`, `address.city`)
- **Off**: Nested objects are kept as JSON strings

### Delimiter
- **Tab**: Best for Excel and Google Sheets (default)
- **Comma**: Standard CSV format
- **Pipe**: Pipe-separated values

## Examples

### Input JSON
```json
[
  {
    "name": "John Doe",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "New York"
    }
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "address": {
      "street": "456 Oak Ave",
      "city": "Los Angeles"
    }
  }
]
```

### Output (with headers and flattening)
```
name	age	address.street	address.city
John Doe	30	123 Main St	New York
Jane Smith	25	456 Oak Ave	Los Angeles
```

## Development

### Prerequisites
- Node.js (for TypeScript compilation)
- TypeScript

### Build
```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run build

# Watch for changes during development
npm run watch
```

### File Structure
```
/
├── manifest.json          # Extension manifest
├── popup.html            # Extension popup UI
├── popup.css             # Popup styles
├── popup.js              # Main popup logic
├── content.js            # Content script for page detection
├── background.js         # Background script
├── icons/                # Extension icons
├── *.ts                  # TypeScript source files
└── README.md             # This file
```

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Firefox (with manifest v2 conversion)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use and modify as needed.

## Support

For issues or feature requests, please create an issue on the GitHub repository. 

## Next Steps
- [ ] Make it intelligent to detect if there are nested items in the json to detect which table you want. (e.g: [{lender: XXX, IBAN:XXX, transactions:[], lender: YYY...}]
- [ ] Create Icon
- [ ] Update UX to make it smoother
