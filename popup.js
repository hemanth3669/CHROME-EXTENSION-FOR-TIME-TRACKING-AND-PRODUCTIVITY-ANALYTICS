document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get("siteData", function (data) {
        let timeList = document.getElementById("timeList");
        timeList.innerHTML = "";

        if (data.siteData) {
            for (let site in data.siteData) {
                let listItem = document.createElement("li");
                let timeSpent = Math.round(data.siteData[site] / 1000); // Convert to seconds
                listItem.textContent = `${site}: ${timeSpent} sec`;
                timeList.appendChild(listItem);
            }
        }
    });
});
