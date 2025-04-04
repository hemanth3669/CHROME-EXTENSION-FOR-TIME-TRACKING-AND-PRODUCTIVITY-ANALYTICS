let activeTabId = null;
let startTime = null;
let siteData = {};

// Detect tab switch or update
chrome.tabs.onActivated.addListener(activeInfo => {
    trackTime();
    activeTabId = activeInfo.tabId;
    startTime = new Date().getTime();
});

// Detect tab update (navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        trackTime();
        activeTabId = tabId;
        startTime = new Date().getTime();
    }
});

// Track the time spent
function trackTime() {
    if (activeTabId && startTime) {
        let timeSpent = new Date().getTime() - startTime;
        
        chrome.tabs.get(activeTabId, (tab) => {
            if (tab && tab.url) {
                let url = new URL(tab.url);
                let domain = url.hostname;

                if (!siteData[domain]) {
                    siteData[domain] = 0;
                }
                siteData[domain] += timeSpent;

                chrome.storage.local.set({ siteData });
            }
        });
    }
}
