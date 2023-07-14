let tabId, currentUrl, url;

const zoominzoomout = tabId => {
    setTimeout(() => {
        chrome.tabs.setZoom(tabId, 0.9, () => {
            setTimeout(() => {
                chrome.tabs.setZoom(tabId, 1.0, () => { });
            }, 500);
        });
    }, 500);
}

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    tabId = details.tabId;
    currentUrl = details.url;
}, { url: [{ hostSuffix: "erdcloud.com" }] });

chrome.webRequest.onCompleted.addListener(details => {
    url = new URL(details.url);
    if (url.pathname.includes("d/") && tabId) {
        chrome.tabs.sendMessage(tabId, { action: "removeAd" }, response => {
            if (response && response.status === "success") {
                zoominzoomout(tabId);
            }
        });
    }
}, { urls: ["*://*.erdcloud.com/*"] });