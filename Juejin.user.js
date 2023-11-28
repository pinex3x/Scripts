// ==UserScript==
// @name         掘金（自用）
// @version      0.1
// @author       Pine
// @description  调整字体大小、默认沉浸模式
// @match        https://juejin.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-end
// @namespace    https://github.com/pinex3x/Scripts/

// ==/UserScript==


(function() {
    // 1.保护视力，调整文章字体大小
    GM_addStyle("#article-root.markdown-body { font-size: 16px }");

    // 2. 默认沉浸模式
    unsafeWindow.onload = async () => {
        // 等待文章加载
        const article = await getArticle(2000);
        if (article != null) {
            const btns = article.querySelectorAll(".panel-btn");
            if (btns != null && btns.length > 0) {
                const immerseBtn = btns[btns.length - 1];
                immerseBtn.click();
            }
        }
    }

    // 获取加载后的文章
    function getArticle (sec = 1000) {
        let i = undefined;
        return Promise.race([
            new Promise(res => {
                i = setInterval(() => {
                    const article = unsafeWindow.document.querySelector(".article-suspended-panel.dynamic-data-ready");
                    if (article != null) {
                        res(article);
                    }
                }, 100);
            }),
            new Promise((_, rej) => setTimeout(() => {
                clearInterval(i);
                rej(null);
            }, sec))
        ]);
    }
})();