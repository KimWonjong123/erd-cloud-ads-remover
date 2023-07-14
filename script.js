const intervalForAds = setInterval(() => {
        let ads;
        let container;
        ads = document.querySelector(".erd-ads-area");
        if (ads !== null) {
            ads.remove();
            container = document.querySelector(".erd-container");
            if (container) {
                container.style.width = "100%";
            }
            clearInterval(intervalForAds);
        }
}, 100);