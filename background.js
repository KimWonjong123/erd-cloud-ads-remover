chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    let tabId = details.tabId;
    let url = new URL(details.url);
    if (tabId && url.pathname.includes("d/")) {
        chrome.tabs.sendMessage(tabId, { action: "removeAd" }, response => {
            if (response && response.status) {
                setTimeout(() => {
                    chrome.tabs.setZoom(1.05)
                        .then(chrome.tabs.setZoom(0));
                }, 500);
            }
        });
    }
}, { urls: ["*://*.erdcloud.com/*"] });