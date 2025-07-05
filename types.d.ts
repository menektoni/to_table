// TypeScript declarations for Chrome Extension APIs

declare namespace chrome {
    namespace runtime {
        interface Port {
            name: string;
            disconnect(): void;
            onDisconnect: ChromeEvent<(port: Port) => void>;
            onMessage: ChromeEvent<(message: any, port: Port) => void>;
            postMessage(message: any): void;
            sender?: MessageSender;
        }

        interface MessageSender {
            tab?: chrome.tabs.Tab;
            frameId?: number;
            id?: string;
            url?: string;
            tlsChannelId?: string;
        }

        interface ChromeEvent<T> {
            addListener(callback: T): void;
            removeListener(callback: T): void;
            hasListener(callback: T): boolean;
        }

        const onMessage: ChromeEvent<(message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void | boolean>;
        const onInstalled: ChromeEvent<(details: { reason: string }) => void>;
        
        function sendMessage(message: any, responseCallback?: (response: any) => void): void;
        function sendMessage(extensionId: string, message: any, responseCallback?: (response: any) => void): void;
    }

    namespace tabs {
        interface Tab {
            id?: number;
            index: number;
            windowId: number;
            openerTabId?: number;
            selected: boolean;
            highlighted: boolean;
            active: boolean;
            pinned: boolean;
            audible?: boolean;
            discarded: boolean;
            autoDiscardable: boolean;
            mutedInfo?: MutedInfo;
            url?: string;
            pendingUrl?: string;
            title?: string;
            favIconUrl?: string;
            status?: string;
            incognito: boolean;
            width?: number;
            height?: number;
            sessionId?: string;
        }

        interface MutedInfo {
            muted: boolean;
            reason?: string;
            extensionId?: string;
        }

        function query(queryInfo: {
            active?: boolean;
            currentWindow?: boolean;
            [key: string]: any;
        }): Promise<Tab[]>;

        function sendMessage(tabId: number, message: any, responseCallback?: (response: any) => void): void;
        function sendMessage(tabId: number, message: any, options?: { frameId?: number }, responseCallback?: (response: any) => void): void;
    }

    namespace contextMenus {
        interface CreateProperties {
            id?: string;
            title?: string;
            contexts?: string[];
            [key: string]: any;
        }

        interface OnClickData {
            menuItemId: string | number;
            parentMenuItemId?: string | number;
            mediaType?: string;
            linkUrl?: string;
            srcUrl?: string;
            pageUrl?: string;
            frameUrl?: string;
            frameId?: number;
            selectionText?: string;
            editable: boolean;
            wasChecked?: boolean;
            checked?: boolean;
        }

        function create(createProperties: CreateProperties, callback?: () => void): void;
        const onClicked: chrome.runtime.ChromeEvent<(info: OnClickData, tab?: chrome.tabs.Tab) => void>;
    }
} 