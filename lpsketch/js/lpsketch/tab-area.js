const style = document.createElement("style");
style.innerHTML = `
.tab-area {
    display: flex;
    flex-direction: column;
}

.tab-area > nav {
    display: flex;
    overflow: hidden;
    border: 1px solid #ccc;
    background: #f1f1f1;
    min-height: 50px;
}

.tab-area > nav > * {
    background-color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
}

.tab-area > nav > button:hover {
    background-color: #ddd;
}

.tab-area > nav > button.active {
    background-color: #ccc;
}

.tab-area > section {
    display: none;
    padding: 6px 0px;
    border: 1px solid #ccc;
    border-top: none;
    width: 100%;
    height: 100%;
    min-height: 268px;
}

.tab-area > section > * {
    margin: 4px 0px 4px 0px;
    text-align: center;
}
`

class TabArea extends HTMLElement {
    constructor() {
        super();
        this.classList.add("tab-area");
        this.appendChild(style);
        this._setupTabs();
    }

    _setupTabs() {
        this.querySelectorAll("[data-tab-target]").forEach((tabTarget) => {
            tabTarget.onclick = () => {
                this.querySelectorAll("[data-tab-target]")
                    .forEach((tabTarget) => tabTarget.classList.remove("active"));
                tabTarget.classList.add("active");
                this.querySelectorAll("[data-tab-content]").forEach((tabContent) => {
                    if (tabTarget.dataset.tabTarget === tabContent.dataset.tabContent)
                        tabContent.style.display = "block";
                    else
                        tabContent.style.display = "none";
                });
            };

            if (tabTarget.classList.contains("active"))
                tabTarget.click();
        });
    }
}

window.customElements.define("tab-area", TabArea);
