/// <reference path="./types.d.ts" />

// Content script to detect JSON on web pages
(function() {
    'use strict';

    function findJSONOnPage(): string | null {
        const jsonPatterns = [
            // Look for JSON in script tags
            () => {
                const scripts = document.querySelectorAll('script[type="application/json"]');
                for (const script of scripts) {
                    const text = script.textContent?.trim();
                    if (text && isValidJSON(text)) {
                        return text;
                    }
                }
                return null;
            },
            
            // Look for JSON in pre tags (common in API documentation)
            () => {
                const pres = document.querySelectorAll('pre');
                for (const pre of pres) {
                    const text = pre.textContent?.trim();
                    if (text && isValidJSON(text)) {
                        return text;
                    }
                }
                return null;
            },
            
            // Look for JSON in code blocks
            () => {
                const codes = document.querySelectorAll('code');
                for (const code of codes) {
                    const text = code.textContent?.trim();
                    if (text && text.length > 20 && isValidJSON(text)) {
                        return text;
                    }
                }
                return null;
            },
            
            // Look for JSON-like patterns in the page text
            () => {
                const text = document.body.textContent || '';
                const jsonRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
                const matches = text.match(jsonRegex);
                
                if (matches) {
                    for (const match of matches) {
                        if (match.length > 20 && isValidJSON(match)) {
                            return match;
                        }
                    }
                }
                return null;
            }
        ];

        for (const pattern of jsonPatterns) {
            const result = pattern();
            if (result) {
                return result;
            }
        }

        return null;
    }

    function isValidJSON(text: string): boolean {
        try {
            JSON.parse(text);
            return true;
        } catch {
            return false;
        }
    }

    function formatJSON(json: string): string {
        try {
            const parsed = JSON.parse(json);
            return JSON.stringify(parsed, null, 2);
        } catch {
            return json;
        }
    }

    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'detectJSON') {
            const jsonData = findJSONOnPage();
            if (jsonData) {
                sendResponse({ json: formatJSON(jsonData) });
            } else {
                sendResponse({ json: null });
            }
        }
        return true; // Keep the message channel open for async response
    });

    // Also try to detect JSON when the page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const jsonData = findJSONOnPage();
                if (jsonData) {
                    console.log('JSON detected on page:', jsonData.substring(0, 100) + '...');
                }
            }, 1000);
        });
    }
})(); 