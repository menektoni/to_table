/// <reference path="./types.d.ts" />

interface ConversionOptions {
    includeHeaders: boolean;
    flattenNested: boolean;
    delimiter: 'tab' | 'comma' | 'pipe';
}

interface ParsedData {
    headers: string[];
    rows: string[][];
}

class JSONToTableConverter {
    private statusElement: HTMLElement;
    private previewSection: HTMLElement;
    private previewContent: HTMLElement;
    private jsonInput: HTMLTextAreaElement;

    constructor() {
        this.statusElement = document.getElementById('status') as HTMLElement;
        this.previewSection = document.getElementById('preview-section') as HTMLElement;
        this.previewContent = document.getElementById('preview-content') as HTMLElement;
        this.jsonInput = document.getElementById('json-input') as HTMLTextAreaElement;

        this.initEventListeners();
    }

    private initEventListeners(): void {
        const convertBtn = document.getElementById('convert-btn') as HTMLButtonElement;
        const previewBtn = document.getElementById('preview-btn') as HTMLButtonElement;
        const detectBtn = document.getElementById('detect-json-btn') as HTMLButtonElement;

        convertBtn.addEventListener('click', () => this.convertAndCopy());
        previewBtn.addEventListener('click', () => this.showPreview());
        detectBtn.addEventListener('click', () => this.detectJSONFromPage());
    }

    private getOptions(): ConversionOptions {
        return {
            includeHeaders: (document.getElementById('include-headers') as HTMLInputElement).checked,
            flattenNested: (document.getElementById('flatten-nested') as HTMLInputElement).checked,
            delimiter: (document.getElementById('delimiter') as HTMLSelectElement).value as 'tab' | 'comma' | 'pipe'
        };
    }

    private showStatus(message: string, type: 'success' | 'error' | 'info'): void {
        this.statusElement.textContent = message;
        this.statusElement.className = `status ${type}`;
        setTimeout(() => {
            this.statusElement.textContent = '';
            this.statusElement.className = 'status';
        }, 3000);
    }

    private parseJSON(jsonString: string): any {
        try {
            const trimmed = jsonString.trim();
            if (!trimmed) {
                throw new Error('Empty JSON input');
            }
            return JSON.parse(trimmed);
        } catch (error) {
            throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private flattenObject(obj: any, prefix: string = ''): Record<string, any> {
        let flattened: Record<string, any> = {};
        
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                
                if (obj[key] === null || obj[key] === undefined) {
                    flattened[newKey] = '';
                } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    Object.assign(flattened, this.flattenObject(obj[key], newKey));
                } else if (Array.isArray(obj[key])) {
                    flattened[newKey] = JSON.stringify(obj[key]);
                } else {
                    flattened[newKey] = obj[key];
                }
            }
        }
        
        return flattened;
    }

    private convertJSONToTable(data: any, options: ConversionOptions): ParsedData {
        let processedData: any[] = [];

        // Handle different JSON structures
        if (Array.isArray(data)) {
            processedData = data;
        } else if (typeof data === 'object' && data !== null) {
            // If it's a single object, wrap it in an array
            processedData = [data];
        } else {
            // If it's a primitive value, create a simple table
            return {
                headers: ['Value'],
                rows: [[String(data)]]
            };
        }

        // Flatten nested objects if requested
        if (options.flattenNested) {
            processedData = processedData.map(item => 
                typeof item === 'object' && item !== null ? this.flattenObject(item) : item
            );
        }

        // Extract all unique headers
        const headersSet = new Set<string>();
        processedData.forEach(item => {
            if (typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(key => headersSet.add(key));
            }
        });

        const headers = Array.from(headersSet);
        
        // Create rows
        const rows = processedData.map(item => {
            return headers.map(header => {
                if (typeof item === 'object' && item !== null) {
                    const value = item[header];
                    if (value === null || value === undefined) {
                        return '';
                    }
                    if (typeof value === 'object') {
                        return JSON.stringify(value);
                    }
                    return String(value);
                } else {
                    return String(item);
                }
            });
        });

        return { headers, rows };
    }

    private formatTable(data: ParsedData, options: ConversionOptions): string {
        const delimiters = {
            'tab': '\t',
            'comma': ',',
            'pipe': '|'
        };

        const delimiter = delimiters[options.delimiter];
        const lines: string[] = [];

        // Add headers if requested
        if (options.includeHeaders && data.headers.length > 0) {
            lines.push(data.headers.join(delimiter));
        }

        // Add data rows
        data.rows.forEach(row => {
            lines.push(row.join(delimiter));
        });

        return lines.join('\n');
    }

    private async copyToClipboard(text: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    private async convertAndCopy(): Promise<void> {
        try {
            const jsonString = this.jsonInput.value;
            if (!jsonString.trim()) {
                this.showStatus('Please enter JSON data', 'error');
                return;
            }

            const data = this.parseJSON(jsonString);
            const options = this.getOptions();
            const parsedData = this.convertJSONToTable(data, options);
            const formattedTable = this.formatTable(parsedData, options);

            await this.copyToClipboard(formattedTable);
            this.showStatus('Table copied to clipboard!', 'success');
        } catch (error) {
            this.showStatus(error instanceof Error ? error.message : 'Unknown error', 'error');
        }
    }

    private showPreview(): void {
        try {
            const jsonString = this.jsonInput.value;
            if (!jsonString.trim()) {
                this.showStatus('Please enter JSON data', 'error');
                return;
            }

            const data = this.parseJSON(jsonString);
            const options = this.getOptions();
            const parsedData = this.convertJSONToTable(data, options);
            const formattedTable = this.formatTable(parsedData, options);

            this.previewContent.textContent = formattedTable;
            this.previewSection.style.display = 'block';
            this.showStatus('Preview updated', 'info');
        } catch (error) {
            this.showStatus(error instanceof Error ? error.message : 'Unknown error', 'error');
        }
    }

    private async detectJSONFromPage(): Promise<void> {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const response = await chrome.tabs.sendMessage(tab.id!, { action: 'detectJSON' });
            
            if (response?.json) {
                this.jsonInput.value = response.json;
                this.showStatus('JSON detected from page!', 'success');
            } else {
                this.showStatus('No JSON found on the page', 'info');
            }
        } catch (error) {
            this.showStatus('Error detecting JSON from page', 'error');
        }
    }
}

// Initialize the converter when the popup loads
document.addEventListener('DOMContentLoaded', () => {
    new JSONToTableConverter();
}); 