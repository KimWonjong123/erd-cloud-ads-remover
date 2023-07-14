let tabId, currentUrl, url;

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    tabId = details.tabId;
    currentUrl = details.url;
}, { url: [{ hostSuffix: "erdcloud.com" }] });

chrome.webRequest.onCompleted.addListener(details => {
    url = new URL(details.url);
    if (url.pathname.includes("d/") && tabId) {
        chrome.tabs.sendMessage(tabId, { action: "removeAd" }, response => {
            if (response && response.status) {
                setTimeout(() => {
                    chrome.tabs.setZoom(1.05)
                        .then(chrome.tabs.setZoom(0));
                }, 1000);
            }
        });
    }
}, { urls: ["*://*.erdcloud.com/*"] });