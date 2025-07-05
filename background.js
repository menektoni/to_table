// Background script for the JSON to Table Converter extension

chrome.runtime.onInstalled.addListener(() => {
    console.log('JSON to Table Converter extension installed');
});

// Handle clipboard write permissions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'copyToClipboard') {
        // This is handled by the popup script directly
        // but we keep this here for future clipboard operations
        return true;
    }
});

// Set up context menu (optional feature)
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'convertJSON',
        title: 'Convert JSON to Table',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'convertJSON' && info.selectionText) {
        // Send the selected text to the popup
        chrome.tabs.sendMessage(tab.id, {
            action: 'convertSelectedJSON',
            json: info.selectionText
        });
    }
}); 