"undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls = {
        isEditMode: !1,
        config: null,
        isInEditor: !1,
        userBookmarks: [],
        init: function (e) {
            (this.config = e),
                this.loadUserBookmarks(),
                (null == e.disableControls || (null != e.disableControls && !e.disableControls.zoom)) && hzflip.controls.zoom.bindings(),
                hzflip.controls.fullscreen.bindings(),
                hzflip.controls.navigation.bindings(e),
                hzflip.controls.slider.bindings(e, "SWIPER" === e.viewer),
                hzflip.controls.sound.bindings(e),
                hzflip.controls.share.bindings(e),
                hzflip.controls.search.bindings(e),
                hzflip.controls.form.bindings(e),
                hzflip.controls.bookmark.bindings(e),
                hzflip.controls.navpanel.bindings(e),
                hzflip.controls.simpleBindings(e);
        },
        destroy: function () {
            hzflip.controls.fullscreen.destroy(),
                hzflip.controls.sound.destroy(),
                hzflip.controls.share.destroy(),
                hzflip.controls.search.destroy(),
                hzflip.controls.form.destroy(),
                hzflip.controls.bookmark.destroy(),
                hzflip.controls.navpanel.destroy(),
                hzflip.controls.simpleBindingsDestroy();
        },
        setEditMode: function (e) {
            hzflip.controls.zoom.setEditMode(e), hzflip.controls.fullscreen.setEditMode(e), hzflip.controls.navpanel.setEditMode(e), (this.isEditMode = e);
        },
        loadForEditor: function (e) {
            (this.isInEditor = !0), hzflip.controls.form.loadForEditor(e), hzflip.controls.bookmark.loadForEditor(e), hzflip.controls.navpanel.loadForEditor(e);
        },
        initViewerControls: function (e) {
            hzflip.controls.slider.bindings(e, "SWIPER" === e.viewer),
                setTimeout(() => {
                    hzflip.controls.toolbar.resizeViewport();
                });
        },
        turned: function (e) {
            hzflip.controls.zoom.turned(e),
                hzflip.controls.slider.turned(e),
                hzflip.controls.navigation.turned(e),
                hzflip.controls.share.turned(e),
                hzflip.controls.search.turned(e),
                hzflip.controls.form.turned(e),
                hzflip.controls.bookmark.turned(e),
                hzflip.controls.navpanel.turned(e),
                $(".logo-backs2").parent().is("a") && null != e && (1 == e || (e == heyzine.config.num_pages && heyzine.config.num_pages % 2 == 0) ? $(".logo-backs2").css("z-index", 1) : $(".logo-backs2").css("z-index", 0));
        },
        turning: function (e) {
            hzflip.controls.slider.turning(e),
                hzflip.controls.navigation.turning(e),
                hzflip.controls.share.turning(e),
                hzflip.controls.sound.turning(e),
                hzflip.controls.search.turning(e),
                hzflip.controls.form.turning(e),
                hzflip.controls.bookmark.turning(e),
                hzflip.controls.navpanel.turning(e),
                $(".logo-backs2").parent().is("a") && null != e && (1 == e || (e == heyzine.config.num_pages && heyzine.config.num_pages % 2 == 0) ? $(".logo-backs2").css("z-index", 1) : $(".logo-backs2").css("z-index", 0));
        },
        peelStart: function (e) {
            hzflip.controls.sound.peelStart(e), hzflip.controls.bookmark.peelStart(e);
        },
        peelEnd: function (e, t) {
            hzflip.controls.sound.peelEnd(e, t), hzflip.controls.bookmark.peelEnd(e, t);
        },
        resizeViewport: function (e) {
            null != e && hzflip.controls.navigation.resizeViewport(e), hzflip.controls.toolbar.resizeViewport(), hzflip.controls.search.resizeViewport(), hzflip.layers.popup.resizeViewport(), hzflip.controls.bookmark.resizeViewport();
        },
        fontsLoaded: function () {
            hzflip.controls.bookmark.resizeViewport();
        },
        userBookmarkChange: function (e) {
            hzflip.controls.bookmark.userBookmarkChange(e), hzflip.controls.navpanel.userBookmarkChange(e);
        },
        allowTurn: function (e) {
            return hzflip.controls.form.allowTurn(e);
        },
        allowPrint: function () {
            return hzflip.controls.form.allowActionOrShow();
        },
        allowDownload: function () {
            return hzflip.controls.form.allowActionOrShow();
        },
        goToPage: function (e, t) {
            if ("url" == t) {
                const i = heyzine.getCurrentPage();
                let n = e;
                (n = "previous" === e ? this.allowTurn(i - 1) + 1 : "next" === e ? this.allowTurn(i + 1) + 1 : this.allowTurn(e)), heyzine.goToPage(n, t);
            } else heyzine.goToPage(e, t);
        },
        setZoom: function (e, t, i) {
            hzflip.controls.zoom.setZoom(e, t, i);
        },
        getZoomScale: function () {
            return hzflip.controls.zoom.getScale();
        },
        onFullScreen: function (e) {
            hzflip.controls.zoom.onFullScreen(e);
        },
        simpleBindings: function (e) {
            $("#btnPrint").on("click", () => {
                if (!this.allowPrint()) return !1;
                $(".printIframe").remove();
                let e = document.createElement("iframe");
                (e.className = "printIframe"), (e.style.display = "none"), document.body.appendChild(e);
                let t = $("#btnPrint").attr("data-print");
                if ("" == t) return !1;
                if ("./" == t.substr(0, 2))
                    (e.onload = function () {
                        e.focus(), e.contentWindow.print(), heyzine.stats.trackControls("print");
                    }),
                        (e.src = t);
                else {
                    let i = "https://" + new URL(t).host;
                    (e.onload = function () {
                        heyzine.stats.trackControls("print"), e.contentWindow.postMessage(JSON.stringify({ action: "print", url: t }), i);
                    }),
                        (e.src = i + "/printing.html");
                }
                return !1;
            }),
                $(".hz-icon.down-pdf").on("click", () => {
                    if (!this.allowDownload()) return !1;
                    heyzine.stats.trackControls("down");
                }),
                document.addEventListener("contextmenu", (e) => {
                    this.isInEditor || e.preventDefault();
                });
        },
        simpleBindingsDestroy: function () {
            $("#btnPrint").off("click"), $(".hz-icon.down-pdf").off("click");
        },
        toolbar: {},
        loadUserBookmarks: function () {
            if (0 == this.userBookmarks.length) {
                const e = heyzine.storage.getItem("heyzine-bookmarks-" + this.config.name);
                null != e && ((this.userBookmarks = JSON.parse(e)), null == this.userBookmarks.length && (this.userBookmarks = []));
            }
        },
        getUserBookmarks: function () {
            return this.userBookmarks;
        },
        saveUserBookmarks: function () {
            heyzine.storage.setItem("heyzine-bookmarks-" + this.config.name, JSON.stringify(this.userBookmarks));
        },
        addUserBookmark: function (e, t) {
            return (
                null != e && (null == t && (t = heyzine.lang.translate.fromKey("page") + " " + e), this.userBookmarks.push({ title: t, page: e })),
                this.saveUserBookmarks(),
                null != e && this.userBookmarkChange(this.userBookmarks[this.userBookmarks.length - 1]),
                this.userBookmarks.length - 1
            );
        },
        updateUserBookmark: function (e, t, i) {
            null != t && (this.userBookmarks[e].title = t), null != i && (this.userBookmarks[e].page = i), this.saveUserBookmarks(), (null == t && null == i) || this.userBookmarkChange(this.userBookmarks[e]);
        },
        removeUserBookmark: function (e) {
            this.userBookmarks.splice(e, 1), this.saveUserBookmarks(), this.userBookmarkChange();
        },
        hidePanels: function (e) {
            null == e
                ? (heyzine.controls.navpanel.hide(), heyzine.controls.share.toggleShow(!1), heyzine.controls.search.toggleShow(!1))
                : "#pnlNav" == e
                ? (heyzine.controls.share.toggleShow(!1), heyzine.controls.search.toggleShow(!1))
                : "#pnlSearch" == e
                ? (heyzine.controls.navpanel.hide(), heyzine.controls.share.toggleShow(!1))
                : "#pnlShare" == e && (heyzine.controls.navpanel.hide(), heyzine.controls.search.toggleShow(!1));
        },
        showPanelLateral: function (e) {
            this.hidePanels(e);
            let t = heyzine.controls.toolbar.getStyle();
            if (("right" == t.alignX ? $(e).css({ "margin-right": "0", width: "calc(100% - 40px)" }) : $(e).css({ "margin-right": "10px", width: "calc(100% - 40px)" }), "horizontal" == t.direction)) {
                let i;
                if (
                    (1 == t.float
                        ? "center" == t.alignX
                            ? (i = 20)
                            : "left" == t.alignX
                            ? (i = $("#pnlControls").offset().left - $("#canvas").offset().left)
                            : "right" == t.alignX && (i = $("#pnlControls").offset().left + $("#pnlControls").width() - $(e).width() - $("#canvas").offset().left)
                        : (i = "left" == t.alignX || "center" == t.alignX ? 20 : $("#pnlControls").width() - $(e).width() - 10),
                    "top" == t.alignY)
                ) {
                    let t = parseInt($("#pnlControls").get(0).style.top.replace("px", "")) + $("#pnlControls").height() + 20,
                        n = $("#canvas").outerHeight() - t - 10;
                    $(e).css({ left: i + "px", right: "auto", top: t + "px", bottom: "auto", "max-height": n + "px", transform: "none" });
                } else {
                    let n = 1 == t.float ? (0 == heyzine.design.data.show_slider ? 0 : heyzine.controls.toolbar.def.slider.pad) : 0,
                        o = parseInt($("#pnlControls").get(0).style.bottom.replace("px", "")) + $("#pnlControls").height() + 20 + n,
                        s = $("#canvas").outerHeight() - o - 10;
                    $(e).css({ left: i + "px", right: "auto", top: "auto", bottom: o + "px", "max-height": s + "px", transform: "none" });
                }
            } else {
                let i,
                    n = 0,
                    o = "auto",
                    s = $("#pnlControls").width() + 20;
                "top" == t.alignY
                    ? ((n = 1 == t.float ? $("#pnlControls").offset().top - $("#canvas").offset().top : 20), (i = $("#canvas").outerHeight() - n - 10))
                    : "center" == t.alignY
                    ? ((n = 20), (i = $("#canvas").outerHeight() - n - 10))
                    : "bottom" == t.alignY && ((n = "auto"), (o = parseInt($("#pnlControls").get(0).style.bottom.replace("px", "")) + (1 == t.float ? 0 : 20)), (i = $("#canvas").outerHeight() - o - 20)),
                    "left" == t.alignX
                        ? $(e).css({ left: s + parseInt($("#pnlControls").get(0).style.left.replace("px", "")) + "px", right: "auto", top: "auto" != n ? n + "px" : n, bottom: "auto" != o ? o + "px" : o, "max-height": i, transform: "none" })
                        : $(e).css({
                              left: "auto",
                              right: s + parseInt($("#pnlControls").get(0).style.right.replace("px", "")) + "px",
                              top: "auto" != n ? n + "px" : n,
                              bottom: "auto" != o ? o + "px" : o,
                              "max-height": i,
                              transform: "none",
                          });
            }
        },
        showPanel: function (e, t) {
            this.hidePanels(t);
            let i = heyzine.controls.toolbar.getStyle();
            if (
                ("right" == i.alignX ? $(t).css({ "margin-right": "0" }) : $(t).css({ "margin-right": "10px" }),
                "horizontal" == i.direction ? $(t).css({ width: "calc(100% - 40px)" }) : $(t).css({ width: "calc(100% - 70px)" }),
                "horizontal" == i.direction)
            ) {
                let n;
                n = 1 == i.float ? $("#pnlControls").offset().left + $("#pnlControls").width() / 2 - $(t).width() / 2 : $(e).offset().left - $(t).width() / 2;
                let o = $("#pnlControls").height() + 20;
                if (n < $("#canvas").offset().left) n = 1 == i.float ? $("#pnlControls").offset().left - $("#canvas").offset().left : 20;
                else if (n + $(t).width() > $("#canvas").offset().left + $("#canvas").width()) {
                    const e = parseInt($("#canvas").get(0).style.paddingRight.replace("px", ""));
                    n = 1 == i.float ? $("#pnlControls").offset().left + $("#pnlControls").outerWidth() - $(t).outerWidth() - $("#canvas").offset().left : $("#canvas").outerWidth() - $(t).outerWidth() - e;
                } else n -= $("#canvas").offset().left;
                if ((n < 0 && (n = 20), "top" == i.alignY)) $(t).css({ left: n + "px", right: "auto", top: o + parseInt($("#pnlControls").get(0).style.top.replace("px", "")) + "px", bottom: "auto", transform: "none" });
                else {
                    let e = 0;
                    1 == i.float && (e = 0 == heyzine.design.data.show_slider ? 0 : heyzine.controls.toolbar.def.slider.pad),
                        $(t).css({ left: n + "px", right: "auto", top: "auto", bottom: e + o + parseInt($("#pnlControls").get(0).style.bottom.replace("px", "")) + "px", transform: "none" });
                }
            } else {
                let n = $(e).offset().top + $(e).height() / 2 - $(t).outerHeight() / 2,
                    o = $("#pnlControls").width() + 20;
                n < $("#canvas").offset().top ? (n = 20) : n + $(t).outerHeight() > $("#canvas").offset().top + $("#canvas").height() ? (n = $("#canvas").height() - $(t).outerHeight() - 20) : (n -= $("#canvas").offset().top),
                    n < 0 && (n = 20),
                    "left" == i.alignX
                        ? $(t).css({ left: o + parseInt($("#pnlControls").get(0).style.left.replace("px", "")) + "px", right: "auto", top: n + "px", bottom: "auto", transform: "none" })
                        : $(t).css({ left: "auto", right: o + parseInt($("#pnlControls").get(0).style.right.replace("px", "")) + "px", top: n + "px", bottom: "auto", transform: "none" });
            }
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.fullscreen = {
        isEditMode: !1,
        bindings: function () {
            $(".fullscreen-button").on("click", function () {
                return (
                    !scaler.isInIframe() || (hzflip.controls.fullscreen.isSupported() && !hzflip.controls.fullscreen.isTopInFullscreen()) ? hzflip.controls.fullscreen.toggle() : hzflip.controls.fullscreen.toggleMessage(),
                    heyzine.firstInteraction(),
                    !1
                );
            }),
                scaler.isInIframe() || this.isSupported() || $(".fullscreen-button").hide();
        },
        destroy: function () {
            $(".fullscreen-button").off("click");
        },
        isSupported: function () {
            var e = document,
                t = !0;
            $("#canvas").parent().is("body") || ((e = $("#canvas").parent().get(0)), (t = !1));
            var i = e;
            return t && (i = e.documentElement), !!i.requestFullScreen || !!i.mozRequestFullScreen || !!i.webkitRequestFullScreen;
        },
        isTopInFullscreen: function () {
            try {
                return top.document.fullscreenElement && null !== top.document.fullscreenElement && ("HTML" == top.document.fullscreenElement.tagName || "BODY" == top.document.fullscreenElement.tagName);
            } catch (e) {
                return !1;
            }
        },
        toggleMessage: function () {
            $(".fullscreen-button").hasClass("hz-icn-fullscreen-on")
                ? ($(".fullscreen-button").removeClass("hz-icn-fullscreen-on").addClass("hz-icn-fullscreen-off"),
                  window.parent.postMessage({ action: "heyzineFullscreen", value: !0, target: document.location.href }, "*"),
                  heyzine.controls.onFullScreen(!0))
                : ($(".fullscreen-button").removeClass("hz-icn-fullscreen-off").addClass("hz-icn-fullscreen-on"),
                  window.parent.postMessage({ action: "heyzineFullscreen", value: !1, target: document.location.href }, "*"),
                  heyzine.controls.onFullScreen(!1));
        },
        toggle: function () {
            if (!this.isEditMode) {
                var e = document,
                    t = !0;
                if (($("#canvas").parent().is("body") || ((e = $("#canvas").parent().get(0)), (t = !1)), (e.fullScreenElement && null !== e.fullScreenElement) || (!document.mozFullScreen && !document.webkitIsFullScreen))) {
                    var i = e;
                    t && (i = e.documentElement),
                        i.requestFullScreen ? i.requestFullScreen() : i.mozRequestFullScreen ? i.mozRequestFullScreen() : i.webkitRequestFullScreen && i.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT),
                        $(".fullscreen-button").removeClass("hz-icn-fullscreen-on").addClass("hz-icn-fullscreen-off"),
                        heyzine.stats.trackControls("fullscreen"),
                        heyzine.controls.onFullScreen(!0);
                } else
                    document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen(),
                        $(".fullscreen-button").removeClass("hz-icn-fullscreen-off").addClass("hz-icn-fullscreen-on"),
                        heyzine.controls.onFullScreen(!1);
            }
        },
        setEditMode: function (e) {
            this.isEditMode = e;
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.navigation = {
        inited: !1,
        numPages: 0,
        hashNavigation: !0,
        firstTurned: !1,
        tmrPageDepthLabel: null,
        pageDepthPage: null,
        enabled: !0,
        bindings: function (e) {
            var t = hzflip.controls.navigation;
            (t.numPages = e.num_pages),
                (t.hashNavigation = null == e.hashNavigation || !1 !== e.hashNavigation),
                t.inited ||
                    ((t.inited = !0),
                    (null != heyzine.design.data.embed_mode && 1 == heyzine.design.data.embed_mode) ||
                        $(document).keydown(function (e) {
                            if ($(e.target).is("input") || $(e.target).is("textarea")) return;
                            let i = 37,
                                n = 39;
                            switch ((null != heyzine.viewer && "SWIPER" == heyzine.viewer.viewerName && 1 == heyzine.design.data.viewer_dir && ((i = 38), (n = 40)), e.keyCode)) {
                                case i:
                                    1 == heyzine.design.data.rtl ? t.goToPage("next", "keyboard") : t.goToPage("previous", "keyboard"), e.preventDefault();
                                    break;
                                case n:
                                    1 == heyzine.design.data.rtl ? t.goToPage("previous", "keyboard") : t.goToPage("next", "keyboard"), e.preventDefault();
                                    break;
                                case 27:
                                    hzflip.controls.setZoom("zoomOut"), e.preventDefault();
                            }
                        }),
                    $(document)
                        .on("click", ".btnNext", function (e) {
                            1 == heyzine.design.data.rtl ? t.goToPage("previous", "button") : t.goToPage("next", "button");
                        })
                        .on("mouseenter", ".btnNext", function () {
                            $(this).hasClass("next-button") && $(this).addClass("next-button-hover");
                        })
                        .on("mouseleave", ".btnNext", function () {
                            $(this).hasClass("next-button") && $(this).removeClass("next-button-hover");
                        }),
                    $(document)
                        .on("click", ".btnPrevious", function (e) {
                            1 == heyzine.design.data.rtl ? t.goToPage("next", "button") : t.goToPage("previous", "button");
                        })
                        .on("mouseenter", ".btnPrevious", function () {
                            $(this).hasClass("previous-button") && $(this).addClass("previous-button-hover");
                        })
                        .on("mouseleave", ".btnPrevious", function () {
                            $(this).hasClass("previous-button") && $(this).removeClass("previous-button-hover");
                        }),
                    $(document).on("click", "#btnNavPrev", function () {
                        return 1 == heyzine.design.data.rtl ? t.goToPage("next", "button-nav") : t.goToPage("previous", "button-nav"), heyzine.firstInteraction(), !1;
                    }),
                    $(document).on("click", "#btnNavNext", function () {
                        return 1 == heyzine.design.data.rtl ? t.goToPage("previous", "button-nav") : t.goToPage("next", "button-nav"), heyzine.firstInteraction(), !1;
                    }),
                    $(document).on("click", "#btnNavStart", function () {
                        let e = "" == $.trim(heyzine.design.data.start_page) ? 1 : heyzine.design.data.start_page;
                        return 1 == heyzine.design.data.rtl && (e = "" == $.trim(heyzine.design.data.end_page) ? t.numPages : heyzine.design.data.end_page), t.goToPage(e, "button-nav"), heyzine.firstInteraction(), !1;
                    }),
                    $(document).on("click", "#btnNavEnd", function () {
                        let e = "" == $.trim(heyzine.design.data.end_page) ? t.numPages : heyzine.design.data.end_page;
                        return 1 == heyzine.design.data.rtl && (e = "" == $.trim(heyzine.design.data.start_page) ? 1 : heyzine.design.data.start_page), t.goToPage(e, "button-nav"), heyzine.firstInteraction(), !1;
                    }),
                    $(document).on("mouseenter", ".page-depth", function (e) {
                        1 == heyzine.getZoomScale() &&
                            t.enabled &&
                            (t.tmrPageDepthLabel = setTimeout(() => {
                                $(".page-depth-label").fadeIn("fast");
                            }, 50));
                    }),
                    $(document).on("mouseleave", ".page-depth", function (e) {
                        $(".page-depth-label").hide(), null != t.tmrPageDepthLabel && ((t.pageDepthPage = null), clearTimeout(t.tmrPageDepthLabel));
                    }),
                    $(document).on("mousemove", ".page-depth", function (e) {
                        if (!t.enabled) return;
                        if (1 != heyzine.getZoomScale()) return $(".page-depth-label").hide(), void (t.pageDepthPage = null);
                        let i = 0;
                        $(this).hasClass("page-depth-left") && (i = 2 * $(this).width()),
                            $(".page-depth-label").css({ top: e.clientY - 40 - $("#canvas").offset().top, left: e.clientX - i - $(this).width() / 4 - $("#canvas").offset().left });
                        const n = heyzine.getVisiblePages();
                        let o = 0;
                        if (1 == heyzine.design.data.rtl)
                            if ($(this).hasClass("page-depth-right")) {
                                const t = Math.abs($(this).css("right").replace("px", "")),
                                    i = Math.abs($(this).offset().left + ($(this).width() - t) - e.pageX),
                                    s = n[0] - 1,
                                    a = 1,
                                    l = t;
                                o = Math.round(i / (l / (a - s))) + s;
                            } else {
                                const i = Math.abs($(this).position().left),
                                    s = $(this).offset().left + i - e.pageX,
                                    a = (n.length > 1 ? n[1] : n[0]) + 1,
                                    l = t.numPages,
                                    r = i;
                                o = Math.round(s / (r / (l - a))) + a;
                            }
                        else if ($(this).hasClass("page-depth-left")) {
                            const t = e.pageX - $(this).offset().left,
                                i = n[0] - 1 < 1 ? 1 : n[0] - 1,
                                s = Math.abs($(this).position().left);
                            o = Math.round(t / (s / i)) + 1;
                        } else {
                            const i = Math.abs($(this).css("right").replace("px", "")),
                                s = e.pageX - $(this).offset().left - $(this).width() + i,
                                a = n.length > 1 ? n[1] : n[0],
                                l = t.numPages,
                                r = a + 1 > t.numPages ? t.numPages : a + 1,
                                h = i;
                            o = Math.round(s / (h / (l - r))) + r;
                        }
                        (t.pageDepthPage = o), $(".page-depth-label").html(o);
                    }),
                    $(document).on("click", ".page-depth", function (e) {
                        null != t.pageDepthPage && t.goToPage(t.pageDepthPage, "button-nav");
                    }),
                    t.hashNavigation &&
                        "undefined" != typeof Hash &&
                        Hash.on("^page/([0-9]*)$", {
                            yep: function (e, i) {
                                var n = i[1];
                                void 0 !== n && t.goToPage(parseInt(n), "url");
                            },
                            nop: function (e) {
                                null == heyzine.loadOnLastPage && t.goToPage(1, "url");
                            },
                        }));
        },
        turned: (e) => {
            var t = hzflip.controls.navigation;
            t.showHide(e), t.hashNavigation && "undefined" != typeof Hash && t.firstTurned && null == heyzine.browserNavButtons ? Hash.go("page/" + e).update() : (t.firstTurned = !0);
        },
        turning: (e) => {
            var t = hzflip.controls.navigation;
            null != e && t.showHide(e);
        },
        resizeViewport: (e) => {
            $(".next-button").css({ height: e.height, backgroundPosition: "-38px " + (e.height / 2 - 16) + "px" }), $(".previous-button").css({ height: e.height, backgroundPosition: "-4px " + (e.height / 2 - 16) + "px" });
        },
        showHide: (e) => {
            3 != heyzine.design.data.arrows &&
                (1 == heyzine.design.data.rtl
                    ? (1 == e ? $(".next-button").hide() : $(".next-button").show(), heyzine.isLastPage(e) ? $(".previous-button").hide() : $(".previous-button").show())
                    : (1 == e ? $(".previous-button").hide() : $(".previous-button").show(), heyzine.isLastPage(e) ? $(".next-button").hide() : $(".next-button").show()));
        },
        startAutoPlay: function (e) {
            null == e ||
                e < 1 ||
                setInterval(() => {
                    heyzine.isLastPage() ? this.goToPage(1) : this.goToPage("next", "button-nav");
                }, 1e3 * e);
        },
        setEnabled: function (e) {
            this.enabled = e;
        },
        goToPage: function (e, t) {
            this.enabled && hzflip.controls.goToPage(e, t);
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.slider = {
        numPages: 0,
        config: null,
        drag: !1,
        positionSliderThumb: function (e, t) {
            var i = $(e).parent().find(t).outerWidth() / 2,
                n = $(e).width(),
                o = n / 2,
                s = (e.value - 1) / (e.max - e.min);
            (isNaN(s) || s < 0) && (s = 0);
            var a = s * n,
                l = a - i - 42.5 * ((a - o) / o);
            1 == heyzine.design.data.rtl
                ? $(e)
                      .parent()
                      .find(t)
                      .css("right", l + "px")
                : $(e)
                      .parent()
                      .find(t)
                      .css("left", l + "px");
        },
        isSinglePage: function () {
            return "SWIPER" == heyzine.config.viewer || 2 == heyzine.design.data.show_double;
        },
        bindings: function (e) {
            if ($(".page-bar").length <= 0 || 0 == heyzine.design.data.show_slider) return;
            1 == heyzine.design.data.rtl ? $(".page-bar input[type=range]").css("direction", "rtl") : $(".page-bar input[type=range]").css("direction", "ltr");
            const t = null == heyzine.design.data.show_slider || 1 == heyzine.design.data.show_slider || 3 == heyzine.design.data.show_slider,
                i = 2 == heyzine.design.data.show_slider || 3 == heyzine.design.data.show_slider;
            var n = hzflip.controls.slider;
            (this.config = e),
                (n.numPages = e.num_pages),
                $(".page-bar input[type=range]").attr("min", 1),
                $(".page-bar input[type=range]").attr("max", n.isSinglePage() ? n.numPages : n.numPages % 2 == 0 ? Math.floor((n.numPages - 2) / 2) + 2 : Math.floor(n.numPages / 2) + 1),
                i ? $(".page-bar .page-bar-value").addClass("page-bar-num-enabled") : $(".page-bar .page-bar-value").removeClass("page-bar-num-enabled"),
                $(".page-bar input[type=range]").on("input mousedown", function () {
                    if (((n.drag = !0), t)) {
                        let e = 100;
                        !0 === heyzine.config.toc ? (e = 1) : $(".page-bar-value").hide(),
                            n.positionSliderThumb(this, "span.page-bar-value"),
                            n
                                .thumbnails($(this).parent().find("span.page-bar-value"), $(this).val(), e)
                                .then(() => {
                                    n.drag && (n.positionSliderThumb(this, "span.page-bar-value"), $(".page-bar-value").fadeIn("fast"));
                                })
                                .catch(() => {});
                    }
                    if (i) {
                        $("span.page-bar-num").show();
                        const e = n.rangeToPage($(this).val());
                        null == e[1] ? $("span.page-bar-num").html(e[0]) : $("span.page-bar-num").html(e[0] + " - " + e[1]), n.positionSliderThumb(this, "span.page-bar-num");
                    }
                }),
                $(".page-bar input[type=range]").on("mouseup touchend", function () {
                    (n.drag = !1),
                        setTimeout(() => {
                            t && $(".page-bar-value").fadeOut("fast"), i && $("span.page-bar-num").fadeOut("fast");
                        }, 500);
                    let e = n.isSinglePage() ? $(this).val() : 1 == $(this).val() ? 1 : 2 * $(this).val() - 2;
                    hzflip.controls.goToPage(e, "slider");
                });
        },
        turned: function (e) {},
        turning: function (e) {
            if (null == e) return;
            if ($(".page-bar").length <= 0 || null == heyzine.design.data || 0 == heyzine.design.data.show_slider) return;
            let t = this.isSinglePage() ? e : 1 == e ? 1 : Math.floor(e / 2) + 1;
            $(".page-bar input[type=range]").val(t);
        },
        rangeToPage: function (e) {
            var t,
                i = this.numPages;
            return (
                i % 2 == 0 && (t = (i - 2) / 2 + 2),
                i % 2 != 0 && (t = (i - 1) / 2 + 1),
                this.isSinglePage() || 1 == e ? [parseInt(e), null] : e == t ? (i % 2 != 0 ? [2 * (e - 1), 2 * (e - 1) + 1] : [2 * (e - 1), null]) : [2 * (e - 1), 2 * (e - 1) + 1]
            );
        },
        thumbnails: function (e, t, i) {
            if (!($(".page-bar").length <= 0 || null == heyzine.design.data || 0 == heyzine.design.data.show_slider))
                return new Promise((n, o) => {
                    "undefined" != typeof timerThumbs && clearTimeout(timerThumbs),
                        (timerThumbs = setTimeout(() => {
                            const i = this.rangeToPage(t);
                            heyzine.loadPageThumbnails(i[0], i[1], e).then(() => {
                                n();
                            });
                        }, i));
                });
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.zoom = {
        pos: {},
        isEditMode: !1,
        initial: {},
        timerDelay: !1,
        isZoomIn: !1,
        isZoomProgress: !1,
        isZoomEnabled: !0,
        isInFullScreen: !1,
        preventDoubleTap: !1,
        delayTimer: null,
        hammer: null,
        xMove: null,
        yMove: null,
        state: { inc: 1.15, scale: 1, xLast: 0, yLast: 0, xImage: 0, yImage: 0, pinchScale: 0 },
        bindings: function () {
            var e = hzflip.controls.zoom;
            (null != heyzine.design.data.embed_mode && 1 == heyzine.design.data.embed_mode) || (0 == heyzine.design.data.show_zoom && 0 == heyzine.design.data.click_zoom) ? (this.isZoomDisabled = !0) : (this.isZoomDisabled = !1),
                (this.initial.transform = $("#magazineViewport").css("transform")),
                (this.initial.origin = $("#magazineViewport").css("transform-origin")),
                (this.xMove = null),
                (this.yMove = null);
            const t = !scaler.isInIframe();
            (this.hammer = new Hammer.Manager($("#canvas").get(0), { recognizers: [[Hammer.Pinch, { enable: t }]] })), (this.hammer.options.domEvents = !0);
            var i = new Hammer.Tap({ event: "singletap" }),
                n = new Hammer.Tap({ event: "doubletap", taps: 2 });
            this.hammer.add([n, i]),
                n.recognizeWith(i),
                $(window).on("mouseout", () => {
                    this.moveEnd();
                }),
                $("#canvas").on("mouseout", () => {
                    this.moveEnd();
                }),
                $("#canvas").on("touchstart", (e) => {
                    this.moveStart(e.touches[0].pageX, e.touches[0].pageY);
                }),
                $("#canvas").on("touchend", () => {
                    this.moveEnd();
                }),
                $("#canvas").on("touchmove", (e) => {
                    $(e.target).closest(".layer-action-render").hasClass("layer-disable-page-drag") || this.moveProgress(e.touches[0].pageX, e.touches[0].pageY);
                }),
                $("#canvas").on("mousedown", (e) => {
                    this.moveStart(e.pageX, e.pageY);
                }),
                $("#canvas").on("mouseup", () => {
                    this.moveEnd();
                }),
                $("#canvas").on("mousemove", (e) => {
                    $(e.target).closest(".layer-action-render").hasClass("layer-disable-page-drag") || this.moveProgress(e.pageX, e.pageY);
                }),
                this.hammer.on("pinch", function (t) {
                    if (!e.isEditMode && !e.isZoomDisabled) {
                        (window.disableTurnEvents = !0), (e.pinching = !0);
                        let i = t.scale > 0 ? 3 * (t.scale - 1) : 3 * (1 - t.scale);
                        e.zoomSet({ size: e.state.pinchScale + i, animate: !1 }, { x: t.center.x - $("#canvas").offset().left, y: t.center.y - $("#canvas").offset().top, noRender: !0 }),
                            t.srcEvent.stopPropagation(),
                            t.srcEvent.stopImmediatePropagation(),
                            t.srcEvent.preventDefault();
                    }
                    return !1;
                }),
                this.hammer.on("pinchend", function (t) {
                    let i = t.scale > 0 ? 3 * (t.scale - 1) : 3 * (1 - t.scale);
                    (e.state.pinchScale += i),
                        (e.pinching = !1),
                        null != e.tmrRenderPinch && clearTimeout(e.tmrRenderPinch),
                        (e.tmrRenderPinch = setTimeout(() => {
                            e.pinching || e.renderPages();
                        }, 600));
                }),
                $("#canvas").mousewheel(function (t, i) {
                    let n = heyzine.design.data.click_zoom,
                        o = t.originalEvent.ctrlKey;
                    return (
                        !(!scaler.isInIframe() || e.isInFullScreen) ||
                        (e.isEditMode ||
                            e.isZoomDisabled ||
                            0 == n ||
                            (((1 == n && !o) || (2 == n && o)) && e.zoomSet({ dir: i, animate: !1 }, { x: t.pageX - $(this).offset().left, y: t.pageY - $(this).offset().top }),
                            ((2 == n && !o) || (1 == n && o)) &&
                                (e.isZoomIn
                                    ? (e.moveStart(t.pageX, t.pageY), i > 0 ? e.moveProgress(t.pageX, t.pageY + 30) : e.moveProgress(t.pageX, t.pageY - 30), e.moveEnd())
                                    : (null == e.delayTimer || new Date().getTime() - e.delayTimer > 300) &&
                                      (i > 0 ? hzflip.controls.goToPage("previous", "button-nav") : hzflip.controls.goToPage("next", "button-nav"), (e.delayTimer = new Date().getTime())))),
                        !(!e.isZoomDisabled && 0 != heyzine.design.data.click_zoom))
                    );
                }),
                $(".zoom-icon").on("click", function () {
                    return e.isEditMode || e.isZoomDisabled || (e.isZoomIn ? e.zoomReset() : e.zoomCenter()), heyzine.firstInteraction(), !1;
                }),
                this.hammer.on("singletap", function (t) {
                    "pnlControls" == $(t.target).attr("id") ||
                    "pnlControls" == $(t.target).parent().attr("id") ||
                    (null != $(t.target).parent().parent() && "pnlControls" == $(t.target).parent().parent().attr("id")) ||
                    "true" == $(t.target).attr("data-disable-zoom")
                        ? (e.preventDoubleTap = !0)
                        : (e.preventDoubleTap = !1);
                }),
                this.hammer.on("doubletap", function (t) {
                    e.preventDoubleTap ||
                        "pnlControls" == $(t.target).attr("id") ||
                        "pnlControls" == $(t.target).parent().attr("id") ||
                        "true" == $(t.target).attr("data-disable-zoom") ||
                        "true" === $(t.target).closest("[data-disable-zoom]").attr("data-disable-zoom") ||
                        (0 != heyzine.design.data.click_zoom && (e.isEditMode || e.isZoomDisabled || (e.isZoomIn ? e.zoomReset() : e.zoomCenter()), t.srcEvent.stopPropagation(), t.srcEvent.stopImmediatePropagation()));
                }),
                $(".btnZoomMore").on("dblclick", function (e) {
                    return e.stopPropagation(), e.preventDefault(), !1;
                }),
                $(".btnZoomLess").on("dblclick", function (e) {
                    return e.stopPropagation(), e.preventDefault(), !1;
                }),
                $(".btnZoomMore").on("click", function (t) {
                    return e.zoomCenter(1), !1;
                }),
                $(".btnZoomLess").on("click", function (t) {
                    return e.zoomCenter(-1), !1;
                });
        },
        onFullScreen: function (e) {
            (this.isInFullScreen = e), scaler.isInIframe() && this.hammer.get("pinch").set({ enable: e });
        },
        moveStart: function (e, t) {
            if (!this.isEditMode && !this.isZoomDisabled && 1 != this.state.scale) {
                var i = hzflip.controls.zoom.pos;
                (i.dragging = !0), (this.xMove = e), (this.yMove = t), (i.xInit = i.xNew), (i.yInit = i.yNew), $(".magazine-viewport").addClass("grabbing");
            }
        },
        moveEnd: function () {
            if (this.isEditMode || this.isZoomDisabled) return !0;
            (hzflip.controls.zoom.pos.dragging = !1), $(".magazine-viewport").removeClass("grabbing");
        },
        moveProgress: function (e, t) {
            if (this.isEditMode || this.isZoomDisabled || 1 == this.state.scale) return !0;
            var i = hzflip.controls.zoom.pos;
            if (i.dragging) {
                var n = i.xNew,
                    o = i.yNew,
                    s = this.state.xLast,
                    a = this.state.yLast,
                    l = this.xMove - e,
                    r = this.yMove - t;
                (this.xMove = e),
                    (this.yMove = t),
                    (i.xNew -= l / this.state.scale),
                    (i.yNew -= r / this.state.scale),
                    (this.state.xLast -= l),
                    (this.state.yLast -= r),
                    $("#magazineViewport").css("transform", "scale(" + i.scale + ")translate(" + i.xNew + "px, " + i.yNew + "px)");
                let h = null,
                    d = null,
                    c = null,
                    p = null;
                const g = heyzine.getVisiblePages();
                for (let e = 0; e < g.length; e++)
                    (null == h || h > $('#magazineViewport [page="' + g[e] + '"]').offset().left) && (h = $('#magazineViewport [page="' + g[e] + '"]').offset().left),
                        (null == d || d > $('#magazineViewport [page="' + g[e] + '"]').offset().top) && (d = $('#magazineViewport [page="' + g[e] + '"]').offset().top),
                        (null == p || p < $('#magazineViewport [page="' + g[e] + '"]').offset().top + $('#magazineViewport [page="' + g[e] + '"]').height() * this.state.scale) &&
                            (p = $('#magazineViewport [page="' + g[e] + '"]').offset().top + $('#magazineViewport [page="' + g[e] + '"]').height() * this.state.scale),
                        (null == c || c < $('#magazineViewport [page="' + g[e] + '"]').offset().left + $('#magazineViewport [page="' + g[e] + '"]').width() * this.state.scale) &&
                            (c = $('#magazineViewport [page="' + g[e] + '"]').offset().left + $('#magazineViewport [page="' + g[e] + '"]').width() * this.state.scale);
                (h -= $("#canvas").offset().left),
                    (c -= $("#canvas").offset().left),
                    (d -= $("#canvas").offset().top),
                    (p -= $("#canvas").offset().top),
                    ((h > 0 && i.xNew > n) || (c < $("#canvas").width() && i.xNew < n)) &&
                        ((i.xNew = n), (this.state.xLast = s), $("#magazineViewport").css("transform", "scale(" + i.scale + ")translate(" + i.xNew + "px, " + i.yNew + "px)")),
                    ((d > 0 && i.yNew > o) || (p < $("#canvas").height() && i.yNew < o)) &&
                        ((i.yNew = o), (this.state.yLast = a), $("#magazineViewport").css("transform", "scale(" + i.scale + ")translate(" + i.xNew + "px, " + i.yNew + "px)"));
            }
        },
        setZoom: function (e, t, i) {
            this.isEditMode || this.isZoomDisabled || ("zoomIn" == e ? this.zoomCenter() : "zoomOut" == e ? this.zoomReset() : "zoomLayer" == e && this.zoomToLayer("#layer" + t, i));
        },
        zoomToLayer: function (e, t) {
            this.state.pinchScale = 0;
            const i = t.scale;
            if (this.isZoomIn) return;
            let n = $("#canvas").height() / $("#canvas").width() < $(e).height() / $(e).width() ? $("#canvas").height() / $(e).height() : $("#canvas").width() / $(e).width();
            (n *= i),
                this.zoomSet({ dir: 1, increment: n, force: !0, animate: "animated", noRender: !0 }, { x: $(e).offset().left, y: $(e).offset().top }, () => {
                    let t = -$(e).offset().left / n + ($("#canvas").width() + $("#canvas").offset().left) / n / 2 - $(e).width() / 2,
                        i = -$(e).offset().top / n + ($("#canvas").height() + $("#canvas").offset().top) / n / 2 - $(e).height() / 2;
                    var o = hzflip.controls.zoom.pos;
                    (o.scale = n),
                        (o.xNew = t),
                        (o.yNew = i),
                        $("#magazineViewport").addClass("animated"),
                        $("#magazineViewport").css("transform", "scale(" + o.scale + ")translate(" + o.xNew + "px, " + o.yNew + "px)"),
                        setTimeout(() => {
                            $("#magazineViewport").one("transitionend", () => {
                                $("#magazineViewport").removeClass("animated"), this.renderPages();
                            });
                        });
                });
        },
        zoomReset: function (e) {
            (this.state.pinchScale = 0),
                (this.state.scale = 1),
                (this.state.xImage = 0),
                (this.state.yImage = 0),
                (this.state.xLast = 0),
                (this.state.yLast = 0),
                (this.pos.scale = 1),
                $("#magazineViewport").addClass("animated"),
                $("#magazineViewport").css("transform", this.initial.transform),
                $("#magazineViewport").css("transform-origin", this.initial.origin),
                heyzine.setZoomViewer("zoomOut"),
                $("#magazineViewport").one("transitionend", function () {
                    $("#magazineViewport").removeClass("animated"), null != e && e();
                }),
                this.setZoomOutControls();
        },
        zoomCenter: function (e, t) {
            this.state.pinchScale = 0;
            const i = null != e ? e : 1,
                n = null != t ? t : 1.5;
            this.zoomSet({ dir: i, increment: n, animate: "animated" }, { x: $("#canvas").width() / 2, y: $("#canvas").height() / 2 });
        },
        zoomSet: function (e, t, i) {
            var n = t.x,
                o = t.y;
            if (
                ((this.state.xImage = this.state.xImage + (n - this.state.xLast) / this.state.scale),
                (this.state.yImage = this.state.yImage + (o - this.state.yLast) / this.state.scale),
                this.state.scale > 1 ? this.setZoomInControls() : this.setZoomOutControls(),
                e.size)
            )
                1 == this.state.scale && e.size > 1 && (this.setZoomInControls(), heyzine.setZoomViewer("zoomIn")), (this.state.scale = e.size), (this.state.scale = this.state.scale < 1 ? 1 : this.state.scale > 6 ? 6 : this.state.scale);
            else {
                var s = null != e.increment ? e.increment : this.state.inc;
                e.dir > 0 ? (1 == this.state.scale && (this.setZoomInControls(), heyzine.setZoomViewer("zoomIn")), (this.state.scale *= s)) : (this.state.scale /= s),
                    (this.state.scale = this.state.scale < 1 ? 1 : this.state.scale > 6 && !e.force ? 6 : this.state.scale);
            }
            var a = (n - this.state.xImage) / this.state.scale,
                l = (o - this.state.yImage) / this.state.scale;
            (this.state.xLast = n), (this.state.yLast = o);
            var r = hzflip.controls.zoom.pos;
            (r.scale = this.state.scale),
                (r.xNew = a),
                (r.yNew = l),
                (r.xImage = this.state.xImage),
                (r.yImage = this.state.yImage),
                1 == this.state.scale
                    ? (this.zoomReset(), (this.state.xLast = 0), (this.state.yLast = 0), (this.state.xImage = 0), (this.state.yImage = 0), t.noRender || this.renderPages())
                    : (e.animate ? $("#magazineViewport").addClass(e.animate) : $("#magazineViewport").removeClass("animated"),
                      $("#magazineViewport").css("transform", "scale(" + r.scale + ")translate(" + r.xNew + "px, " + r.yNew + "px)"),
                      "SWIPER" != heyzine.config.viewer && $("#magazineViewport").css("transform-origin", r.xImage + "px " + r.yImage + "px"),
                      e.animate
                          ? $("#magazineViewport").one("transitionend", () => {
                                t.noRender || this.renderPages(), null != i ? i() : $("#magazineViewport").removeClass(e.animate);
                            })
                          : (t.noRender || this.renderPages(), null != i && i()));
        },
        setZoomInControls: function () {
            (this.isZoomIn = !0),
                (window.disableTurnEvents = !0),
                0 != heyzine.design.data.show_slider && $(".control-bottom .page-bar").hide(),
                heyzine.stats.trackControls("zoom-in"),
                $(".zoom-icon").removeClass("zoom-icon-in").addClass("zoom-icon-out"),
                $(".layer-zoom").removeClass("layer-zoom-in").addClass("layer-zoom-out"),
                $("#pnlZoomStep").fadeIn("fast"),
                $(".btnPrevious").fadeOut("fast"),
                $(".btnNext").fadeOut("fast"),
                $(".magazine-viewport").addClass("grab");
        },
        setZoomOutControls: function () {
            (this.isZoomIn = !1),
                (window.disableTurnEvents = !1),
                0 != heyzine.design.data.show_slider && $(".control-bottom .page-bar").fadeIn(),
                heyzine.progressBar("cancel"),
                $(".zoom-icon").removeClass("zoom-icon-out").addClass("zoom-icon-in"),
                $(".layer-zoom").removeClass("layer-zoom-out").addClass("layer-zoom-in"),
                $("#pnlZoomStep").fadeOut("fast"),
                3 != heyzine.design.data.arrows && ($(".btnPrevious").fadeIn("fast"), $(".btnNext").fadeIn("fast")),
                $(".magazine-viewport").removeClass("grab").removeClass("grabbing");
        },
        setEditMode: function (e) {
            this.isEditMode = e;
        },
        renderPages: function () {
            !this.timerDelay &&
                (this.state.scale >= 1.5 || this.state.scale <= 1) &&
                ((this.timerDelay = !0),
                setTimeout(() => {
                    const e = heyzine.getVisiblePages();
                    heyzine.progressBar("start", { num: e.length });
                    for (let t = 0; t < e.length; t++) {
                        const i = e[t],
                            n = $("[page=" + e[t] + "] .page-cont"),
                            o = this.state.scale <= 1 ? "normal" : this.state.scale > 2.5 ? "xlarge" : "large";
                        heyzine
                            .loadPageView(i, n, o)
                            .then(() => {
                                (this.timerDelay = !1), heyzine.progressBar("end");
                            })
                            .catch(() => {});
                    }
                }, 500));
        },
        getScale: function () {
            var e = hzflip.controls.zoom.pos;
            return null == e || null == e.scale || e.scale < 1 ? 1 : e.scale;
        },
        turned: function () {
            1 != this.getScale() && this.renderPages();
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.sound = {
        isSoundEnabled: !0,
        isPageTurnSound: !1,
        config: {},
        audio: null,
        audio2: null,
        audio3: null,
        bindings: function () {
            $("#btnSoundOff").on(
                "click",
                () => (
                    (this.isSoundEnabled = !this.isSoundEnabled),
                    this.isSoundEnabled
                        ? ($("#btnSoundOff").addClass("hz-icn-sound-on").removeClass("hz-icn-sound-off"), heyzine.stats.trackControls("sound-on"))
                        : ($("#btnSoundOff").removeClass("hz-icn-sound-on").addClass("hz-icn-sound-off"), heyzine.stats.trackControls("sound-off")),
                    heyzine.layers.soundToggle(this.isSoundEnabled),
                    heyzine.firstInteraction(),
                    !1
                )
            );
        },
        destroy: function () {
            $("#btnSoundOff").off("click");
        },
        getSoundEnabled: function () {
            return this.isSoundEnabled;
        },
        peelStart: function (e) {
            null != heyzine.design && null != heyzine.design.data && null != heyzine.design.data.sound_flip && (this.isPageTurnSound = !0 === heyzine.design.data.sound_flip || 1 == heyzine.design.data.sound_flip),
                this.isSoundEnabled &&
                    this.isPageTurnSound &&
                    Howler &&
                    !1 !== Howler._audioUnlocked &&
                    (null == this.audio && (this.audio = new Howl({ src: ["https://cdnc.heyzine.com/flipbook/snd/flip-ct-sm.mp3"], volume: 0.1 })), this.audio.stop(), this.audio.play());
        },
        peelEnd: function (e, t) {},
        turning: function (e) {
            if (
                (null != heyzine.design && null != heyzine.design.data && null != heyzine.design.data.sound_flip && (this.isPageTurnSound = !0 === heyzine.design.data.sound_flip || 1 == heyzine.design.data.sound_flip),
                this.isSoundEnabled && this.isPageTurnSound && Howler && !1 !== Howler._audioUnlocked && null != e)
            ) {
                const t = heyzine.getVisiblePages();
                e < t[0] - 1 || (2 == t.length && e > t[1] + 1) || (1 == t.length && e > t[0] + 1)
                    ? (null == this.audio3 && (this.audio3 = new Howl({ src: ["https://cdnc.heyzine.com/flipbook/snd/flip-ct-lg.mp3"], volume: 0.2 })), this.audio3.stop(), this.audio3.play())
                    : (null == this.audio2 && (this.audio2 = new Howl({ src: ["https://cdnc.heyzine.com/flipbook/snd/flip-ct-md.mp3"], volume: 0.2 })), this.audio2.stop(), this.audio2.play());
            }
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.share = {
        isVisible: !1,
        link: "",
        currentPage: !1,
        bindings: function () {
            const e = this;
            $("#btnShare").on("click", () => (this.toggleShow(), heyzine.firstInteraction(), !1)),
                $(".btnShareCopy").on("click", () => {
                    this.clipboard.copy(this.link),
                        $(".btn-copy-done").fadeIn("fast"),
                        $(".btn-copy-icon").css("opacity", "0.1"),
                        setTimeout(() => {
                            $(".btn-copy-done").fadeOut("fast"), $(".btn-copy-icon").css("opacity", "1");
                        }, 3e3);
                }),
                $(".selPageSelector").on("click", () => {
                    $(".selPageDropDown").is(":visible") ? $(".selPageDropDown").hide() : $(".selPageDropDown").show();
                }),
                $(".selPageDropDown").on("click", "div", function (t) {
                    let i = $(this).text();
                    1 != i
                        ? ($(".selPageSelected").show(), $(".selPageEmpty").hide(), $(".btn-sharing-page").addClass("btn-sharing-page-selected"), (e.currentPage = !0))
                        : ($(".selPageEmpty").show(), $(".selPageSelected").hide(), $(".btn-sharing-page").removeClass("btn-sharing-page-selected"), (e.currentPage = !1)),
                        e.setPage(i),
                        heyzine.goToPage(i),
                        $(".selPageDropDown").hide(),
                        t.stopPropagation();
                }),
                $(".selPageDropDown").on("mousewheel", "div", function (e) {
                    e.stopPropagation();
                }),
                $(document).on("mouseup", (e) => {
                    let t = $("#pnlShare"),
                        i = $("#btnShare");
                    t.is(e.target) || 0 !== t.has(e.target).length || i.is(e.target) || 0 !== i.has(e.target).length || this.toggleShow(!1),
                        (t = $(".selPageDropDown")),
                        t.is(e.target) || 0 !== t.has(e.target).length || $(".selPageDropDown").hide();
                }),
                $("#pnlShare [data-share]").on("click", function () {
                    const t = $(this).attr("data-share");
                    return e.socialOpen(t, e.link), e.toggleShow(!1), !1;
                });
        },
        setPage: function (e) {
            this.currentPage && (this.setLink(e), $(".selPageSelected").html("p" + e));
        },
        setLink: function (e) {
            let t = "";
            if ((1 != e && null != e && (t = "#page/" + e), heyzine.config && heyzine.config.domain && heyzine.config.domain.indexOf(document.location.host) >= 0)) {
                const e = "https://heyzine.com" == heyzine.config.domain ? "/flip-book" : "";
                this.link = heyzine.config.domain + e + "/" + heyzine.config.custom_name + t;
            } else {
                const e = document.location.href.replace(document.location.hash, "");
                this.link = e + t;
            }
        },
        toggleShow: function (e) {
            if (((this.isVisible = null == e ? !this.isVisible : e), this.setLink(), this.isVisible)) {
                heyzine.controls.showPanel("#btnShare", "#pnlShare"), $(".selPageDropDown").html("");
                for (let e = 1; e <= heyzine.config.num_pages; e++) $(".selPageDropDown").append("<div>" + e + "</div>");
                $(".txtLink").val(this.link), $("#pnlShare").fadeIn("fast");
            } else $("#pnlShare").hide();
        },
        destroy: function () {
            $("#btnShare").off("click"), $("#pnlShare [data-share]").off("click");
        },
        turned: function (e) {
            this.setPage(e);
        },
        turning: function (e) {},
        socialOpen: function (e, t) {
            "facebook" == e && heyzine.navigate("https://www.facebook.com/sharer.php?u=" + encodeURI(t), "newtab"),
                "twitter" == e && heyzine.navigate("https://twitter.com/intent/tweet?url=" + encodeURI(t), "newtab"),
                "linkedin" == e && heyzine.navigate("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURI(t), "newtab"),
                "whatsapp" == e && heyzine.navigate("https://wa.me/?text=" + encodeURI(t), "newtab"),
                "telegram" == e && heyzine.navigate("https://t.me/share/url?url=" + encodeURI(t), "newtab"),
                "pinterest" == e && heyzine.navigate("https://www.pinterest.com/pin/create/button/?url=" + encodeURI(t), "newtab"),
                "messenger" == e && heyzine.navigate("https://www.facebook.com/dialog/send?app_id=887549652630742&link=" + encodeURI(t) + "&redirect_uri=" + encodeURI(t), "newtab"),
                "email" == e && heyzine.navigate("mailto://?body=" + encodeURI(t), "newtab");
        },
        clipboard: {
            copy: function (e) {
                navigator.clipboard
                    ? navigator.clipboard.writeText(e).then(
                          function () {
                              console.log("async clipboard copy");
                          },
                          function (e) {
                              console.error("async clipboard error ", e);
                          }
                      )
                    : this.clipboard.fallback(e);
            },
            copyRaw: function (e) {
                var t, i;
                document.createRange ? ((t = document.createRange()).selectNode(e), (i = window.getSelection()).removeAllRanges(), i.addRange(t)) : ((t = document.body.createTextRange()).moveToElementText(e), t.select());
                try {
                    var n = document.execCommand("copy");
                    return console.log(n), i && i.removeAllRanges(), !!n;
                } catch (e) {
                    return !1;
                }
            },
            fallback: function (e) {
                var t = document.createElement("textarea");
                (t.value = e), (t.style.top = "0"), (t.style.left = "0"), (t.style.position = "fixed"), document.body.appendChild(t), this.copyRaw(t), document.body.removeChild(t);
            },
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.toolbar = {
        def: {
            vertical: 20,
            centerVertical: 10,
            gapIcon: 12,
            padding: { horizontal: 10, vertical: 6, fullX: 20 },
            horizontal: function () {
                return $(window).width() < 790 ? 20 : 50;
            },
            canvas: {
                horizontal: function () {
                    return 2 == heyzine.design.data.show_outline || 3 == heyzine.design.data.show_outline || 2 == heyzine.design.data.show_bookmarks || 3 == heyzine.design.data.show_bookmarks ? 38 : $(window).width() < 790 ? 10 : 20;
                },
                vertical: function () {
                    return $(window).width() < 790 ? 10 : 20;
                },
            },
            zoom: function () {
                return $(window).width() < 790 ? 10 : 50;
            },
            arrows: function () {
                return 3 != heyzine.design.data.arrows && $(window).width() > 750 ? (1 == heyzine.design.data.arrows ? 32 : 14) : 0;
            },
            panel: {
                horizontal: function () {
                    return $(window).width() < 790 ? 5 : $(window).width() < 930 ? 20 : 50;
                },
                vertical: function () {
                    return $(window).height() < 700 ? 5 : 20;
                },
            },
            slider: { pad: 24 },
        },
        sliderInBar: !1,
        setDisposition: function (e) {
            if (null == $("#pnlControls").offset() || null == e) return;
            let t = e,
                i = this.parseStyle(t.controls_style);
            $("#pnlControls").attr("style", t.controls_style),
                ("100%" != $("#pnlControls").get(0).style.width && "100%" != $("#pnlControls").get(0).style.height) || $("#pnlControls").css("border-radius", 0),
                $("#pnlControls").removeClass("controls-disp-bottom").removeClass("controls-disp-top").removeClass("controls-disp-center"),
                $("#pnlControls").removeClass("controls-disp-fx-v-l").removeClass("controls-disp-fx-v-r"),
                "top" == i.alignY ? $("#pnlControls").addClass("controls-disp-top") : "center" == i.alignY ? $("#pnlControls").addClass("controls-disp-center") : $("#pnlControls").addClass("controls-disp-bottom"),
                "vertical" == i.direction && 0 == i.float && ("right" == i.alignX ? $("#pnlControls").addClass("controls-disp-fx-v-r") : $("#pnlControls").addClass("controls-disp-fx-v-l")),
                $(".controls-pdf").css("background-color", $("#pnlControls").css("background-color")),
                0 != t.show_slider && this.setSliderDisposition(i, !0),
                this.setTitleDisposition(i),
                this.setCanvasDisposition(i),
                $("#pnlControls").hasClass("panel-controls-hidden") && $("#pnlControls").hide();
        },
        setCanvasDisposition: function (e) {
            let t = this.def.canvas.horizontal(),
                i = this.def.canvas.vertical(),
                n = this.def.arrows();
            if (0 == e.float && "horizontal" == e.direction) {
                const o = ($("#pnlControls").is(":visible") ? $("#pnlControls").outerHeight() : 0) + i,
                    s = 0 == heyzine.design.data.show_slider || this.sliderInBar ? 0 : this.def.slider.pad;
                "top" == e.alignY
                    ? $("#canvas").css({ "padding-left": t + n + "px", "padding-right": t + n + "px", "padding-top": o + "px", "padding-bottom": i + s + "px" })
                    : $("#canvas").css({ "padding-left": t + n + "px", "padding-right": t + n + "px", "padding-top": i + "px", "padding-bottom": o + s + "px" });
            } else if (0 == e.float && "vertical" == e.direction) {
                let o = 0;
                const s = o + t,
                    a = 0 == heyzine.design.data.show_slider || this.sliderInBar ? 0 : this.def.slider.pad;
                if ($("#pnlControls").is(":visible")) {
                    let e = $("#pnlControls").css("padding-left").replace("px", ""),
                        t = $("#pnlControls").css("padding-right").replace("px", ""),
                        i = $("#pnlControls a:visible").width();
                    "" != $.trim(i) && "" != $.trim(e) && "" != $.trim(t) && (o = i + e + t);
                }
                "left" == e.alignX
                    ? $("#canvas").css({ "padding-left": s + n + "px", "padding-right": t + n + "px", "padding-top": i + "px", "padding-bottom": i + a + "px" })
                    : $("#canvas").css({ "padding-left": t + n + "px", "padding-right": s + n + "px", "padding-top": i + "px", "padding-bottom": i + a + "px" });
            } else if (1 == e.float) {
                const e = 0 == heyzine.design.data.show_slider ? 0 : this.def.slider.pad;
                $("#canvas").css({ "padding-left": t + n + "px", "padding-right": t + n + "px", "padding-top": i + "px", "padding-bottom": e + i + "px" });
            }
        },
        setTitleDisposition: function (e) {
            let t = this.def.panel.horizontal(),
                i = this.def.vertical;
            if ($(".flipbook-title").is(":visible")) {
                let n = $("#canvas").get(0).style.paddingTop.replace("px", "");
                n = "" != $.trim(n) ? parseInt(n) : 0;
                let o = $("#canvas").get(0).style.paddingLeft.replace("px", "") - this.def.arrows();
                o = "" != $.trim(o) ? parseInt(o) : 0;
                let s = 50 == this.def.panel.horizontal() ? 1.5 : 2,
                    a = this.def.panel.horizontal() * s;
                const l = $("#pnlControls").is(":visible") ? $("#pnlControls").outerWidth() : 0,
                    r = ($("#pnlControls").is(":visible") ? $("#pnlControls").outerHeight() : 0) + i + n;
                if (($(".flipbook-title").css({ top: "", left: "" }), 0 == e.float))
                    "top" == e.alignY && "horizontal" == e.direction
                        ? $(".flipbook-title").css({ top: n })
                        : "bottom" == e.alignY && "horizontal" == e.direction
                        ? $(".flipbook-title").css({ top: i + "px" })
                        : "left" == e.alignX && "vertical" == e.direction
                        ? $(".flipbook-title").css({ top: i + "px", left: o + "px" })
                        : "right" == e.alignX && "vertical" == e.direction && $(".flipbook-title").css({ top: i + "px" });
                else if ("top left" == e.position)
                    if ("vertical" == e.direction) {
                        let e = n;
                        const t = this.parseLogoStyle(heyzine.design.data.company_logo_style);
                        "top" == t.position[0] && "left" == t.position[1] && (e += $(".logo-backs2").height() + i), $(".flipbook-title").css({ top: e + "px", left: l + a + "px" });
                    } else $(".flipbook-title").css({ top: r + "px", left: t + "px" });
                else "center left" == e.position || "bottom left" == e.position ? $(".flipbook-title").css({ top: this.def.vertical + "px", left: t + "px" }) : $(".flipbook-title").css({ top: this.def.vertical + "px" });
                const h = $(window).width() - $(".flipbook-title").offset().left - $("#canvas").offset().left - 10;
                $(".flipbook-title").css("width", h + "px");
            } else $(".flipbook-title").css({ top: "", left: "" });
        },
        setZoomStepDisposition: function (e) {
            "horizontal" == e.direction
                ? ("top" == e.alignY ? $("#pnlZoomStep").css({ top: "100px", bottom: "auto" }) : $("#pnlZoomStep").css({ top: "auto", bottom: "100px" }),
                  "left" == e.alignX ? $("#pnlZoomStep").css({ left: this.def.zoom() + "px", right: "auto" }) : $("#pnlZoomStep").css({ left: "auto", right: this.def.zoom() + "px" }))
                : ("bottom" == e.alignY ? $("#pnlZoomStep").css({ top: "auto", bottom: this.def.vertical }) : $("#pnlZoomStep").css({ top: this.def.vertical, bottom: "auto" }),
                  "left" == e.alignX ? $("#pnlZoomStep").css({ left: "auto", right: this.def.zoom() }) : $("#pnlZoomStep").css({ left: this.def.zoom(), right: "auto" }));
        },
        setSliderDisposition: function (e, t) {
            if (
                0 != $(".control-bottom").length &&
                ((this.sliderInBar = t),
                ($("#pnlControls .slider-vertical").length > 0 || $("#pnlControls .slider-horizontal").length > 0) &&
                    ($(".control-bottom").appendTo("#magazineViewport"), $(".slider-vertical").remove(), $(".slider-horizontal").remove(), ($(".control-bottom").get(0).style = "")),
                0 == e.float && t)
            )
                if ("vertical" == e.direction) {
                    let t = $('<div class="slider-toolbar slider-vertical">');
                    "bottom right" == e.position || "bottom left" == e.position ? t.prependTo("#pnlControls") : t.appendTo("#pnlControls"),
                        "right" == e.alignX ? t.addClass("sliderbar-right") : t.addClass("sliderbar-left"),
                        $(".control-bottom").appendTo(t);
                } else if ("horizontal" == e.direction) {
                    let t = $('<div class="slider-toolbar slider-horizontal">');
                    "top" == e.alignY ? t.addClass("sliderbar-top") : t.addClass("sliderbar-bottom"), "right" == e.alignX ? t.prependTo("#pnlControls") : t.appendTo("#pnlControls"), $(".control-bottom").appendTo(t);
                }
        },
        resizeViewport: function () {
            if (null == $("#pnlControls").offset()) return;
            let e = this.parseStyle(heyzine.design.data.controls_style);
            if ($(window).width() <= 475 || $(window).height() <= 475) $(".controls-pdf").removeClass("controls-lg").removeClass("controls-md").addClass("controls-sm");
            else if ($(window).width() <= 575 || $(window).height() <= 575) "sm" != heyzine.design.data.controls_size && $(".controls-pdf").removeClass("controls-lg").removeClass("controls-sm").addClass("controls-md");
            else {
                let e = "" != $.trim(heyzine.design.data.controls_size) ? heyzine.design.data.controls_size : "md";
                $(".controls-pdf")
                    .removeClass("controls-lg")
                    .removeClass("controls-md")
                    .removeClass("controls-sm")
                    .addClass("controls-" + e);
            }
            if (1 == e.float) {
                if ("center" != e.alignX) {
                    const t = "left" == e.alignX ? "left" : "right",
                        i = "left" == e.alignX ? "right" : "left",
                        n = "left" == e.alignX ? "margin-left" : "margin-right";
                    $("#pnlControls").css(t, this.def.panel.horizontal() + "px"), $("#pnlControls").css(i, "auto");
                    let o = 0;
                    null != this.def && null != this.def.canvas && null != this.def.arrows && (o = this.def.canvas.horizontal() + this.def.arrows()), $(".logo-backs2").css(n, -1 * o + this.def.panel.horizontal() + "px");
                }
                if ("center" != e.alignY) {
                    const t = "top" == e.alignY ? "top" : "bottom",
                        i = "top" == e.alignY ? "bottom" : "top";
                    $("#pnlControls").css(t, this.def.panel.vertical() + "px"), $("#pnlControls").css(i, "auto");
                }
            }
            if (0 == e.float && "vertical" == e.direction && 0 != heyzine.design.data.show_slider) {
                let t = 0;
                $("#pnlControls .hz-icon:visible,#pnlControls .hz-icon-2:visible").each(function () {
                    t += $(this).height();
                });
                let i = $("#pnlControls .hz-icon:visible").length + $("#pnlControls .hz-icon-2:visible").length,
                    n = $("#pnlControls").height() - t - i * this.def.gapIcon - 2 * this.def.vertical;
                n < 200
                    ? this.sliderInBar && this.setSliderDisposition(e, !1)
                    : (this.sliderInBar || this.setSliderDisposition(e, !0),
                      $(".slider-vertical .control-bottom").css({ width: n + "px", transform: "rotate(90deg) translateX(-" + n + "px)" }),
                      $(".slider-vertical:first-child").length > 0 ? $(".slider-vertical").css({ height: n + "px", "margin-bottom": this.def.vertical }) : $(".slider-vertical").css({ height: n + "px", "margin-top": this.def.vertical }));
            } else if (0 == e.float && 0 != heyzine.design.data.show_slider) {
                let t = 0;
                $("#pnlControls .hz-icon:visible,#pnlControls .hz-icon-2:visible").each(function () {
                    t += $(this).width();
                });
                let i = $("#pnlControls .hz-icon:visible,#pnlControls .hz-icon-2:visible").length,
                    n = $("#pnlControls").width() - t - i * this.def.gapIcon - this.def.horizontal();
                n < 200
                    ? this.sliderInBar && this.setSliderDisposition(e, !1)
                    : (this.sliderInBar || this.setSliderDisposition(e, !0),
                      $(".slider-horizontal .control-bottom").css({ width: n + "px" }),
                      $(".slider-horizontal:first-child").length > 0
                          ? $(".slider-horizontal").css({ width: n + "px", "margin-right": this.def.horizontal() / 2 + "px" })
                          : $(".slider-horizontal").css({ width: n + "px", "margin-left": this.def.horizontal() / 2 + "px" }));
            }
            this.setCanvasDisposition(e), this.setTitleDisposition(e), this.setZoomStepDisposition(e);
            let t = $("#canvas").offsetParent().offset().left,
                i = $("#pnlControls").offset().left + t;
            $("#pnlControls").removeClass("controls-xs-snap-top").removeClass("controls-xs-snap-bottom").removeClass("controls-snap"),
                "100%" != $("#pnlControls").prop("style").width &&
                    (i < 0 ||
                    $("#pnlControls").offset().left + $("#pnlControls").width() > $(window).width() ||
                    ("auto" == $("#pnlControls").prop("style").right && $("#pnlControls").offset().left - t > $(window).width() - $("#pnlControls").offset().left - $("#pnlControls").width()) ||
                    ("auto" != $("#pnlControls").prop("style").right && $("#pnlControls").offset().left - t < $(window).width() - $("#pnlControls").offset().left - $("#pnlControls").width())
                        ? ($("#pnlControls").addClass("controls-snap"), "auto" != $("#pnlControls").prop("style").top ? $("#pnlControls").addClass("controls-xs-snap-top") : $("#pnlControls").addClass("controls-xs-snap-bottom"))
                        : $("#pnlControls").removeClass("controls-snap"));
        },
        getStyle: function () {
            return this.parseStyle(heyzine.design.data.controls_style);
        },
        parseStyle: function (e) {
            let t = $(".controls-pdf").css("background-color");
            if ("" == $.trim(e)) return { position: "top right", direction: "horizontal", float: 1, backgroundColor: t, alignX: "right", alignY: "top" };
            let i = $.cssToObject(e),
                n = "",
                o = 1,
                s = "horizontal",
                a = "top",
                l = "right";
            return (
                "50%" == i.top && "auto" == i.bottom && "translateY(-50%)" == i.transform
                    ? ((n += "center"), (a = "center"))
                    : "auto" == i.bottom && "auto" != i.top
                    ? ((n += "top"), (a = "top"))
                    : "auto" != i.bottom && "auto" == i.top
                    ? ((n += "bottom"), (a = "bottom"))
                    : "start" == i["justify-content"]
                    ? ((n += "top"), (a = "top"))
                    : "end" == i["justify-content"]
                    ? ((n += "bottom"), (a = "bottom"))
                    : "center" == i["justify-content"] && ((n += "center"), (a = "center")),
                "50%" == i.left && "auto" == i.right && "translateX(-50%)" == i.transform
                    ? ((n += " center"), (l = "center"))
                    : "auto" != i.left && "auto" == i.right
                    ? ((n += " left"), (l = "left"))
                    : "auto" == i.left && "auto" != i.right
                    ? ((n += " right"), (l = "right"))
                    : "start" == i["justify-content"]
                    ? ((n += " left"), (l = "left"))
                    : "end" == i["justify-content"]
                    ? ((n += " right"), (l = "right"))
                    : "center" == i["justify-content"] && ((n += " center"), (l = "center")),
                (o = "100%" == i.width || "100%" == i.height ? 0 : 1),
                (s = "column" == i["flex-direction"] ? "vertical" : "horizontal"),
                { position: n, direction: s, float: o, backgroundColor: t, alignX: l, alignY: a }
            );
        },
        serializeStyle: function (e) {
            const t = e.position.split(" "),
                i = this.def.horizontal() + "px",
                n = this.def.vertical + "px",
                o = this.def.gapIcon + "px";
            let s = n,
                a = "auto",
                l = "50%",
                r = "auto",
                h = "",
                d = "",
                c = "",
                p = "",
                g = "",
                u = "",
                f = "",
                m = "",
                y = "",
                v = 0 != heyzine.design.data.show_slider ? this.def.slider.pad : 0;
            return (
                "top" == t[0] ? ((s = n), (a = "auto")) : "bottom" == t[0] ? ((s = "auto"), (a = this.def.vertical + v + "px")) : "center" == t[0] && ((s = "50%"), (a = "auto"), (h = "translateY(-50%)")),
                "center" == t[1] ? ((l = "50%"), (r = "auto"), (h = "translateX(-50%)")) : "left" == t[1] ? ((l = i), (r = "auto")) : "right" == t[1] && ((l = "auto"), (r = i)),
                (g += "background-color:" + e.backgroundColor + ";"),
                1 == e.float
                    ? "horizontal" == e.direction
                        ? ((m = this.def.padding.horizontal + "px"), (y = this.def.padding.vertical + "px"))
                        : "vertical" == e.direction && ((m = this.def.padding.vertical + "px"), (y = this.def.padding.horizontal + "px"), (f = o))
                    : "horizontal" == e.direction
                    ? ((m = this.def.padding.fullX + "px"), (y = this.def.padding.vertical + "px"))
                    : "vertical" == e.direction && ((m = this.def.padding.vertical + "px"), (y = this.def.padding.fullX + "px"), (f = o)),
                0 == e.float
                    ? ((d = "center"),
                      "horizontal" == e.direction
                          ? ("top" == t[0] ? ((l = "0px"), (r = "0px"), (s = "0px"), (c = "100%")) : "bottom" == t[0] && ((l = "0px"), (r = "0px"), (a = "0px"), (c = "100%")),
                            "left" == t[1] ? (d = "start") : "right" == t[1] ? (d = "end") : "center" == t[1] && ((d = "center"), (h = "")))
                          : ("top" == t[0] ? (d = "start") : "bottom" == t[0] ? (d = "end") : "center" == t[0] && (d = "center"),
                            "left" == t[1]
                                ? ((l = "0px"), (r = "auto"), (s = "0px"), (a = "0px"), (c = "auto"), (p = "100%"), (h = ""))
                                : "right" == t[1] && ((l = "auto"), (r = "0px"), (s = "0px"), (a = "0px"), (c = "auto"), (p = "100%"), (h = ""))))
                    : "center" == t[1] && "horizontal" == e.direction && ("top" == t[0] ? (s = this.def.centerVertical + "px") : "bottom" == t[0] && (a = this.def.centerVertical + v + "px")),
                "horizontal" == e.direction ? (u = "row") : "vertical" == e.direction && (u = "column"),
                (g = this.addStyle(g, "top", s)),
                (g = this.addStyle(g, "bottom", a)),
                (g = this.addStyle(g, "width", c)),
                (g = this.addStyle(g, "height", p)),
                (g = this.addStyle(g, "left", l)),
                (g = this.addStyle(g, "right", r)),
                (g = this.addStyle(g, "transform", h)),
                (g = this.addStyle(g, "justify-content", d)),
                (g = this.addStyle(g, "flex-direction", u)),
                (g = this.addStyle(g, "padding-left", m)),
                (g = this.addStyle(g, "padding-right", m)),
                (g = this.addStyle(g, "padding-top", y)),
                (g = this.addStyle(g, "padding-bottom", y)),
                (g = this.addStyle(g, "gap", f)),
                g
            );
        },
        serializeLogoStyle: function (e, t) {
            let i = e.size,
                n = e.position,
                o = t.position,
                s = null != i ? { "max-width": -1 == i.indexOf("%") ? i + "%" : i } : {},
                a = {},
                l = {};
            const r = $("#pnlControls").is(":visible") ? $("#pnlControls").outerWidth() : 0,
                h = $("#pnlControls").is(":visible") ? $("#pnlControls").outerHeight() : 0;
            if (null != n) {
                if ("top" == n[0]) {
                    let e = parseInt($("#canvas").get(0).style.paddingTop.replace("px", "")),
                        i = 0,
                        s = i;
                    "left" == n[1] && $(".flipbook-title").is(":visible")
                        ? (s = 1 == t.float && "vertical" == t.direction && "top left" == o ? i : $(".flipbook-title").position().top + $(".flipbook-title").outerHeight() + 25 - e)
                        : "horizontal" == t.direction && (("left" == n[1] && "top left" == o) || ("right" == n[1] && "top right" == o)) && 1 == t.float && (s = $("#pnlControls").position().top + h + 25 - e),
                        "SWIPER" == heyzine.config.viewer && (s += e),
                        (l = { top: s + "px", bottom: "auto" });
                } else {
                    let e = parseInt($("#canvas").get(0).style.paddingBottom.replace("px", "")),
                        i = 0;
                    if (1 == t.float && "horizontal" == t.direction && (("left" == n[1] && "bottom left" == o) || ("right" == n[1] && "bottom right" == o))) {
                        i = h + 10 + 25 + (0 == heyzine.design.data.show_slider ? 0 : this.def.slider.pad) - e + "px";
                    }
                    "SWIPER" == heyzine.config.viewer && (i += e), (l = { top: "auto", bottom: i });
                }
                if ("right" == n[1]) {
                    let e = parseInt($("#canvas").get(0).style.paddingRight.replace("px", "")),
                        i = -e + this.def.horizontal();
                    1 != t.float || ("top right" != o && "bottom right" != o && "center right" != o)
                        ? 0 != t.float || "vertical" != t.direction || ("top right" != o && "bottom right" != o && "center right" != o) || (i += this.def.canvas.horizontal())
                        : "vertical" == t.direction && (("top right" == o && "top" == n[0]) || ("bottom right" == o && "bottom" == n[0])) && (i += r + this.def.vertical + 4),
                        "SWIPER" == heyzine.config.viewer && (i += e),
                        (a = { left: "auto", right: i + "px" });
                } else {
                    let e = parseInt($("#canvas").get(0).style.paddingLeft.replace("px", "")),
                        i = -e + this.def.horizontal();
                    1 != t.float || ("top left" != o && "bottom left" != o && "center left" != o)
                        ? 0 != t.float || "vertical" != t.direction || ("top left" != o && "bottom left" != o && "center left" != o) || (i += this.def.canvas.horizontal())
                        : "vertical" == t.direction && (("bottom left" == o && "bottom" == n[0]) || ("top left" == o && "top" == n[0])) && (i += r + this.def.vertical + 4),
                        "SWIPER" == heyzine.config.viewer && (i += e),
                        (a = { left: i + "px", right: "auto" });
                }
            }
            let d = $.extend({}, s, l, a);
            return JSON.stringify(d);
        },
        parseLogoStyle: function (e) {
            let t = JSON.parse(e),
                i = "" != $.trim(t["max-width"]) ? t["max-width"] : 20,
                n = ["bottom", "left"];
            return (n[0] = "auto" == t.top ? "bottom" : "top"), (n[1] = "auto" == t.left ? "right" : "left"), { position: n, size: i };
        },
        addStyle: function (e, t, i) {
            return "" != $.trim(i) && (e += t + ": " + i + "; "), e;
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.search = {
        inited: !1,
        isVisible: !1,
        searchedPages: 0,
        lastSearch: "",
        highlighting: [],
        bindings: function () {
            const e = this;
            $("#btnSearch").on("click", () => (this.toggleShow(), heyzine.firstInteraction(), $("#txtContentSearch").focus(), $("#txtContentSearch").select(), !1)),
                $("#btnContentSearch").on("click", () => {
                    this.clearHighlight();
                    const e = $("#txtContentSearch").val();
                    "" != $.trim(e) && ((this.lastSearch = e), $("#btnContentSearchCancel").show(), $("#btnContentSearch").hide(), this.findInContent(e));
                }),
                $("#btnContentSearchCancel").on("click", () => {
                    $("#btnContentSearchCancel").hide(),
                        $("#btnContentSearch").show(),
                        $("#txtContentSearch").val(""),
                        $(".panel-search-results").hide(),
                        $(".panel-search-results").html(""),
                        this.clearHighlight(),
                        $("#txtContentSearch").focus();
                }),
                $("#pnlSearch").on("click", "[data-found-page]", function () {
                    const t = parseInt($(this).attr("data-found-page"));
                    heyzine.goToPage(t, "button"),
                        $(".panel-search-results").find("[data-found-page]").removeClass("selected"),
                        $(".panel-search-results")
                            .find('[data-found-page="' + t + '"]')
                            .addClass("selected");
                    return (
                        heyzine.getVisiblePages().filter((e) => e == t).length > 0 &&
                            ($(".text-highlight-sub").hide(),
                            setTimeout(() => {
                                $(".text-highlight-sub").show();
                            }, 200)),
                        e.toggleShow(!1),
                        !1
                    );
                }),
                $(document).on("mouseup", (e) => {
                    let t = $("#pnlSearch"),
                        i = $("#btnSearch");
                    t.is(e.target) || 0 !== t.has(e.target).length || i.is(e.target) || 0 !== i.has(e.target).length || this.toggleShow(!1);
                }),
                $("#pnlSearch").on("wheel mousemove touchstart touchend touchmove", (e) => {
                    e.stopPropagation();
                }),
                $("#txtContentSearch").on("keypress", (e) => {
                    "Enter" == e.key && $("#btnContentSearch").trigger("click"), $("#txtContentSearch").val() != this.lastSearch && ($("#btnContentSearchCancel").hide(), $("#btnContentSearch").show());
                }),
                heyzine.design.data.show_search &&
                    $(window).on("keydown", (e) => {
                        if ("Escape" != e.key) {
                            if (this.isVisible) {
                                let t = $(".panel-search-results-item");
                                if (("ArrowDown" == e.key || "ArrowUp" == e.key) && t.length > 0)
                                    if (($("#txtContentSearch").blur(), 0 == $(".panel-search-results-item.focused").length)) $($(".panel-search-results-item").get(0)).addClass("focused");
                                    else {
                                        let t = $(".panel-search-results-item");
                                        for (let i = 0; i < t.length; i++)
                                            if ($(t[i]).hasClass("focused")) {
                                                let n;
                                                $(t[i]).removeClass("focused"),
                                                    (n = "ArrowUp" == e.key ? t[i - 1 < 0 ? 0 : i - 1] : t[i + 1 > t.length - 1 ? t.length - 1 : i + 1]),
                                                    $(n).addClass("focused"),
                                                    $(n).focus(),
                                                    ($(".panel-search-results").get(0).scrollTop = $(n).get(0).offsetTop - 3 * $(n).height());
                                                break;
                                            }
                                    }
                                else "Enter" == e.key && t.length > 0 && 1 == $(".panel-search-results-item.focused").length && $(".panel-search-results-item.focused").trigger("click");
                            }
                            (e.ctrlKey || e.metaKey) && 70 === e.keyCode && ($("#btnSearch").trigger("click"), e.preventDefault());
                        } else this.toggleShow(!1);
                    });
        },
        toggleShow: function (e) {
            (this.isVisible = null == e ? !this.isVisible : e),
                this.isVisible ? (this.inited || (hzflip.controls.searchProcess.init(), (this.inited = !0)), heyzine.controls.showPanel("#btnSearch", "#pnlSearch"), $("#pnlSearch").fadeIn("fast")) : $("#pnlSearch").hide();
        },
        destroy: function () {
            $("#btnSearch").off("click"), $("#btnContentSearch").off("click"), $("#pnlSearch [data-found-page]").off("click");
        },
        turned: function (e) {
            const t = $("#txtContentSearch").val();
            "" != $.trim(t) && this.findAndHighlight(e, t);
            const i = heyzine.getVisiblePages();
            $(".panel-search-results").find("[data-found-page]").removeClass("selected");
            for (let e = 0; e < i.length; e++)
                $(".panel-search-results")
                    .find('[data-found-page="' + i[e] + '"]')
                    .addClass("selected");
        },
        turning: function (e) {},
        resizeViewport: function () {
            const e = $("#txtContentSearch").val();
            "" != $.trim(e) && this.findAndHighlight(heyzine.getCurrentPage(), e);
        },
        findInContent: function (e) {
            const t = heyzine.getVisiblePages();
            (this.searchedPages = 0), $(".panel-search-results").show(), $(".panel-search-results").html("");
            for (let i = 1; i <= heyzine.config.num_pages; i++)
                heyzine.pdf
                    .getPage(i)
                    .then((e) => ({ text: e.getTextContent(), viewport: e.getViewport() }))
                    .then((n) => {
                        n.text
                            .then((n) => {
                                const o = [];
                                for (const e of n.items) o.push(e.str), e.hasEOL && o.push("\n");
                                const s = o.join("");
                                [hzflip.controls.searchProcess._pageContents[i], hzflip.controls.searchProcess._pageDiffs[i], hzflip.controls.searchProcess._hasDiacritics[i]] = hzflip.controls.searchProcess.normalize(s);
                                let a = hzflip.controls.searchProcess._pageContents[i];
                                if (null != a && a.length > 0 && "" != $.trim(a)) {
                                    let n, o, a;
                                    [n, o, a] = hzflip.controls.searchProcess.normalize(e);
                                    let l = hzflip.controls.searchProcess._calculateMatch(n, i);
                                    if (l.length > 0) {
                                        let o = l[0],
                                            a = 0;
                                        for (; a < o; ) "\n" == s[a] && o++, a++;
                                        const r = 20,
                                            h = s.replaceAll("\n", " "),
                                            d = o - r < 0 ? 0 : o - r,
                                            c = h.substr(d, o - d) + ("<strong>" + h.substr(o, n.length) + "</strong>") + h.substr(o + n.length, o + n.length + r);
                                        $(".panel-search-results").append(
                                            '<div class="panel-search-results-item" data-found-page="' +
                                                i +
                                                '"><span class="search-result-num">' +
                                                heyzine.lang.translate.fromKey("page") +
                                                " " +
                                                i +
                                                '</span><span class="search-result-text">' +
                                                $.trim(c) +
                                                "</span></div>"
                                        ),
                                            $(".panel-search-results")
                                                .find(".panel-search-results-item")
                                                .sort(function (e, t) {
                                                    return $(e).attr("data-found-page") - $(t).attr("data-found-page");
                                                })
                                                .appendTo(".panel-search-results"),
                                            t.filter((e) => e == i).length > 0 && this.findAndHighlight(i, e);
                                    }
                                }
                                this.searchedPages++, this.updateSearchBar();
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    });
        },
        clearHighlight: function (e) {
            null != e ? $(".page-wrapper[page=" + e + "] .page-cont .text-highlight").remove() : $(".text-highlight").remove();
        },
        findAndHighlight: async function (e, t) {
            if (!this.highlighting[e]) {
                let i, n, o;
                ([i, n, o] = hzflip.controls.searchProcess.normalize(t.toLowerCase())), (this.highlighting[e] = !0), this.clearHighlight();
                let s = e - 1 < 1 ? 1 : e + 1 > heyzine.config.num_pages ? e - 2 : e - 1,
                    a = e + 1 > heyzine.config.num_pages ? heyzine.config.num_pages : e - 1 < 1 ? e + 2 : e + 1;
                for (let e = s; e <= a; e++) hzflip.controls.searchProcess._calculateMatch(i, e), await this.findAndHighlightOne(e, i);
                this.highlighting[e] = !1;
            }
        },
        findAndHighlightOne: async function (e, t) {
            return new Promise((t, i) => {
                heyzine.pdf
                    .getPage(parseInt(e))
                    .then((t) => {
                        let i = $(".page-wrapper .page-cont").width(),
                            n = heyzine.loadViewport(t, e, i);
                        return { text: t.getTextContent(), viewport: n };
                    })
                    .then((n) => {
                        n.text
                            .then((i) => {
                                let o = hzflip.controls.searchProcess._updateMatches(e, i.items),
                                    s = i.items,
                                    a = i.styles,
                                    l = null;
                                this.clearHighlight(e);
                                for (const t of o) {
                                    const i = t.begin,
                                        o = t.end;
                                    if (
                                        (l && i.divIdx === l.divIdx
                                            ? this.createHighlight(n.viewport, e, a, s[l.divIdx], l.divIdx, l.offset, i.offset, "")
                                            : (null !== l && this.createHighlight(n.viewport, e, a, s[l.divIdx], l.divIdx, l.offset, null, ""), this.createHighlight(n.viewport, e, a, s[i.divIdx], i.divIdx, 0, i.offset, "")),
                                        i.divIdx === o.divIdx)
                                    )
                                        this.createHighlight(n.viewport, e, a, s[i.divIdx], i.divIdx, i.offset, o.offset, "highlight-full");
                                    else {
                                        this.createHighlight(n.viewport, e, a, s[i.divIdx], i.divIdx, i.offset, null, "highlight-start");
                                        for (let t = i.divIdx + 1, l = o.divIdx; t < l; t++) this.createHighlight(n.viewport, e, a, s[t], t, null, null, "highlight-middle");
                                        this.createHighlight(n.viewport, e, a, s[o.divIdx], o.divIdx, 0, o.offset, "highlight-end");
                                    }
                                    l = o;
                                }
                                t();
                            })
                            .catch((e) => {
                                console.log(e), i();
                            });
                    });
            });
        },
        createHighlight: function (e, t, i, n, o, s, a, l) {
            let r = "p" + t + "l" + o,
                h = $('[data-highlight-id="' + r + '"]');
            if (h.length <= 0) {
                h = $('<div class="text-highlight" data-highlight-id="' + r + '"></div>');
                const o = hzflip.controls.searchProcess.transformMatrix(e.transform, n.transform);
                let s = 0,
                    a = 0,
                    l = Math.atan2(o[1], o[0]);
                const d = i[n.fontName];
                d.vertical && (l += Math.PI / 2);
                const c = Math.hypot(o[2], o[3]);
                let p = c * hzflip.controls.searchProcess.getAscent(d.fontFamily),
                    g = "";
                0 === l ? ((s = o[4]), (a = o[5] - p)) : ((s = o[4] + p * Math.sin(l)), (a = o[5] - p * Math.cos(l)), (l *= 180 / Math.PI), (g = ` rotate(${l}deg)`));
                const u = window.devicePixelRatio || 1;
                let f = e.scale,
                    m = hzflip.controls.searchProcess.measureText(c, d.fontFamily, n.str);
                m > 0 && (f = ((d.vertical ? n.height : n.width) * e.scale * u) / m),
                    h.css({ transform: "scaleX(" + f + ")" + g, fontSize: `${c}px`, fontFamily: d.fontFamily, left: `${s}px`, top: `${a}px` }),
                    h.appendTo(".page-wrapper[page=" + t + "] .page-cont");
            }
            let d = n.str.substring(null == s ? 0 : s, null == a ? n.str.length : a),
                c = null;
            (c = $('<span class="text-highlight-sub ' + l + '">' + d + "\n</span>")), c.appendTo(h);
        },
        updateSearchBar: function () {
            let e = Math.ceil((this.searchedPages / heyzine.config.num_pages) * 100);
            $(".search-progress").css("width", e + "%"),
                $(".search-progress").show(),
                $(".panel-search-results .panel-search-results-item").length <= 0 &&
                    ($(".panel-search-results .panel-search-results-empty").remove(),
                    $(".panel-search-results").append('<div class="panel-search-results-item panel-search-results-empty">' + heyzine.lang.translate.fromKey("searching") + "</div>")),
                e >= 100 &&
                    ($(".search-progress").hide(),
                    $(".panel-search-results .panel-search-results-empty").remove(),
                    $(".panel-search-results .panel-search-results-item").length <= 0 &&
                        $(".panel-search-results").append('<div class="panel-search-results-item panel-search-results-empty">' + heyzine.lang.translate.fromKey("noresults") + "</div>"));
        },
        startSearch: function (e) {
            this.inited || (hzflip.controls.searchProcess.init(), (this.inited = !0)),
                $("#txtContentSearch").val(e),
                this.clearHighlight(),
                (this.lastSearch = e),
                $("#btnContentSearchCancel").show(),
                $("#btnContentSearch").hide(),
                this.findInContent(e);
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.searchProcess = {
        _pageContents: [],
        _pageDiffs: [],
        _hasDiacritics: [],
        _pageMatches: [],
        _pageMatchesLength: [],
        _layoutTextCtx: null,
        _layoutTextLastFontSize: null,
        _layoutTextLastFontFamily: null,
        normalizationRegex: null,
        matches: [],
        ascentCache: new Map(),
        DEFAULT_FONT_SIZE: 30,
        DEFAULT_FONT_ASCENT: 0.8,
        CHARACTERS_TO_NORMALIZE: { вЂђ: "-", "вЂ": "'", "вЂ™": "'", вЂљ: "'", "вЂ›": "'", вЂњ: '"', вЂќ: '"', вЂћ: '"', вЂџ: '"', Вј: "1/4", ВЅ: "1/2", Вѕ: "3/4" },
        DIACRITICS_EXCEPTION: null,
        DIACRITICS_REG_EXP: /\p{M}+/gu,
        SPECIAL_CHARS_REG_EXP: /([.*+?^${}()|[\]\\])|(\p{P})|(\s+)|(\p{M})|(\p{L})/gu,
        NOT_DIACRITIC_FROM_END_REG_EXP: /([^\p{M}])\p{M}*$/u,
        NOT_DIACRITIC_FROM_START_REG_EXP: /^\p{M}*([^\p{M}])/u,
        init: function () {
            (this.DIACRITICS_EXCEPTION = new Set([
                12441,
                12442,
                2381,
                2509,
                2637,
                2765,
                2893,
                3021,
                3149,
                3277,
                3387,
                3388,
                3405,
                3530,
                3642,
                3770,
                3972,
                4153,
                4154,
                5908,
                5940,
                6098,
                6752,
                6980,
                7082,
                7083,
                7154,
                7155,
                11647,
                43014,
                43052,
                43204,
                43347,
                43456,
                43766,
                44013,
                3158,
                3953,
                3954,
                3962,
                3963,
                3964,
                3965,
                3968,
                3956,
            ])),
                (this.DIACRITICS_EXCEPTION_STR = [...this.DIACRITICS_EXCEPTION.values()].map((e) => String.fromCharCode(e)).join(""));
            const e = document.createElement("canvas");
            ("undefined" == typeof PDFJSDev || PDFJSDev.test("MOZCENTRAL || GENERIC")) && (e.mozOpaque = !0), (this._layoutTextCtx = e.getContext("2d", { alpha: !1 }));
        },
        destroy: function () {
            this._layoutTextCtx && ((this._layoutTextCtx.canvas.width = 0), (this._layoutTextCtx.canvas.height = 0), (this._layoutTextCtx = null));
        },
        normalize: function (e) {
            if (!this.normalizationRegex) {
                const e = Object.keys(this.CHARACTERS_TO_NORMALIZE).join("");
                this.normalizationRegex = new RegExp(`([${e}])|(\\p{M}+(?:-\\n)?)|(\\S-\\n)|(\\n)`, "gum");
            }
            const t = [];
            let i;
            for (; null !== (i = this.DIACRITICS_REG_EXP.exec(e)); ) t.push([i[0].length, i.index]);
            let n = e.normalize("NFD");
            const o = [[0, 0]];
            let s = 0,
                a = 0,
                l = 0,
                r = 0,
                h = !1;
            return (
                (n = n.replace(this.normalizationRegex, (e, i, n, d, c, p) => {
                    if (((p -= l), i)) {
                        const t = this.CHARACTERS_TO_NORMALIZE[e],
                            i = t.length;
                        for (let e = 1; e < i; e++) o.push([p - a + e, a - e]);
                        return (a -= i - 1), t;
                    }
                    if (n) {
                        const e = n.endsWith("\n"),
                            i = e ? n.length - 2 : n.length;
                        h = !0;
                        let d = i;
                        null != t[s] && null != t[s][1] && p + r === t[s][1] && ((d -= t[s][0]), ++s);
                        for (let e = 1; e < d + 1; e++) o.push([p - 1 - a + e, a - e]);
                        return (a -= d), (l += d), e ? ((p += i - 1), o.push([p - a + 1, 1 + a]), (a += 1), (l += 1), (r += 1), n.slice(0, i)) : n;
                    }
                    return d ? (o.push([p - a + 1, 1 + a]), (a += 1), (l += 1), (r += 1), d.charAt(0)) : (o.push([p - a + 1, a - 1]), (a -= 1), (l += 1), (r += 1), " ");
                })),
                o.push([n.length, a]),
                [n, o, h]
            );
        },
        getOriginalIndex: function (e, t, i) {
            if (!e) return [t, i];
            const n = t,
                o = t + i;
            let s = this.binarySearchFirstItem(e, (e) => e[0] >= n);
            e[s][0] > n && --s;
            let a = this.binarySearchFirstItem(e, (e) => e[0] >= o, s);
            return e[a][0] > o && --a, [n + e[s][1], i + e[a][1] - e[s][1]];
        },
        binarySearchFirstItem: function (e, t, i = 0) {
            let n = i,
                o = e.length - 1;
            if (o < 0 || !t(e[o])) return e.length;
            if (t(e[n])) return n;
            for (; n < o; ) {
                const i = (n + o) >> 1;
                t(e[i]) ? (o = i) : (n = i + 1);
            }
            return n;
        },
        _calculateRegExpMatch: function (e, t, i, n) {
            const o = [],
                s = [],
                a = this._pageDiffs[i];
            let l;
            for (; null !== (l = e.exec(n)); ) {
                const [e, t] = this.getOriginalIndex(a, l.index, l[0].length);
                t && (o.push(e), s.push(t));
            }
            (this._pageMatches[i] = o), (this._pageMatchesLength[i] = s);
        },
        _convertToRegExpString: function (e, t) {
            let i = !1;
            const n = "[ ]*";
            return (
                (e = e.replace(this.SPECIAL_CHARS_REG_EXP, (e, n, o, s, a, l) =>
                    n ? `[ ]*\\${n}[ ]*` : o ? `[ ]*${o}[ ]*` : s ? "[ ]+" : a ? (this.DIACRITICS_EXCEPTION.has(a.charCodeAt(0)) ? a : "") : t ? ((i = !0), `${l}\\p{M}*`) : l
                )).endsWith(n) && (e = e.slice(0, e.length - n.length)),
                [i, e]
            );
        },
        _calculateMatch: function (e, t) {
            let i = e;
            if (0 === i.length) return [];
            const n = this._pageContents[t],
                o = this._hasDiacritics[t];
            let s = !1;
            [s, i] = this._convertToRegExpString(i, o);
            (i = new RegExp(i, `g${s ? "u" : ""}i`)), this._calculateRegExpMatch(i, !1, t, n);
            const a = this._pageMatches[t].length;
            return a > 0 && (this._matchesCountTotal += a), this._pageMatches[t];
        },
        _updateMatches: function (e, t) {
            const i = this._pageMatches[e] || null,
                n = this._pageMatchesLength[e] || null;
            if (!i) return [];
            const o = t.map((e) => e.str);
            let s = 0,
                a = 0;
            const l = o.length - 1,
                r = [];
            for (let e = 0, t = i.length; e < t; e++) {
                let t = i[e];
                for (; s !== l && t >= a + o[s].length; ) (a += o[s].length), s++;
                const h = { begin: { divIdx: s, offset: t - a } };
                for (t += n[e]; s !== l && t > a + o[s].length; ) (a += o[s].length), s++;
                (h.end = { divIdx: s, offset: t - a }), r.push(h);
            }
            return r;
        },
        measureText: function (e, t, i) {
            const n = window.devicePixelRatio || 1;
            (e === this._layoutTextLastFontSize && t === this._layoutTextLastFontFamily) || ((this._layoutTextCtx.font = `${e * n}px ${t}`), (this._layoutTextLastFontSize = e), (this._layoutTextLastFontFamily = t));
            const { width: o } = this._layoutTextCtx.measureText(i);
            return o;
        },
        getAscent: function (e) {
            let t = this._layoutTextCtx;
            const i = this.ascentCache.get(e);
            if (i) return i;
            t.save(), (t.font = `${this.DEFAULT_FONT_SIZE}px ${e}`);
            const n = t.measureText("");
            let o = n.fontBoundingBoxAscent,
                s = Math.abs(n.fontBoundingBoxDescent);
            if (o) {
                t.restore();
                const i = o / (o + s);
                return this.ascentCache.set(e, i), i;
            }
            (t.strokeStyle = "red"), t.clearRect(0, 0, this.DEFAULT_FONT_SIZE, this.DEFAULT_FONT_SIZE), t.strokeText("g", 0, 0);
            let a = t.getImageData(0, 0, this.DEFAULT_FONT_SIZE, this.DEFAULT_FONT_SIZE).data;
            s = 0;
            for (let e = a.length - 1 - 3; e >= 0; e -= 4)
                if (a[e] > 0) {
                    s = Math.ceil(e / 4 / this.DEFAULT_FONT_SIZE);
                    break;
                }
            t.clearRect(0, 0, this.DEFAULT_FONT_SIZE, this.DEFAULT_FONT_SIZE), t.strokeText("A", 0, this.DEFAULT_FONT_SIZE), (a = t.getImageData(0, 0, this.DEFAULT_FONT_SIZE, this.DEFAULT_FONT_SIZE).data), (o = 0);
            for (let e = 0, t = a.length; e < t; e += 4)
                if (a[e] > 0) {
                    o = this.DEFAULT_FONT_SIZE - Math.floor(e / 4 / this.DEFAULT_FONT_SIZE);
                    break;
                }
            if ((t.restore(), o)) {
                const t = o / (o + s);
                return this.ascentCache.set(e, t), t;
            }
            return this.ascentCache.set(e, DEFAULT_FONT_ASCENT), DEFAULT_FONT_ASCENT;
        },
        transformMatrix: function (e, t) {
            return [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]];
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.form = {
        config: {},
        isEnabled: !0,
        isControlsEnabled: !0,
        isDirty: !1,
        fromData: null,
        pageAfterSubmit: null,
        bindings: function (e) {
            if (((this.config = e), (this.isEnabled = e && e.lead && 1 === e.lead.enabled), null != this.config && null != this.config.lead && this.isEnabled)) {
                const e = this.config.lead.page,
                    t = heyzine.getVisiblePages();
                null != t && t.length > 0 && t[0] >= e && this.show();
            }
        },
        destroy: function () {},
        turning: function (e) {
            if (null != e && null != this.config && null != this.config.lead && this.isEnabled) {
                const e = this.config.lead.page,
                    t = heyzine.getVisiblePages();
                null != t && t.length > 0 && t[0] >= e && this.show();
            }
        },
        turned: function (e) {
            if (null != this.config && null != this.config.lead && this.isEnabled) {
                const e = this.config.lead.page,
                    t = heyzine.getVisiblePages();
                null != t && t.length > 0 && t[0] >= e && this.show();
            }
        },
        allowTurn: function (e) {
            return null != this.config.lead && this.isEnabled && !this.getFormSentOrSkipped() && e >= this.config.lead.page ? ((this.pageAfterSubmit = e), this.config.lead.page) : e;
        },
        allowActionOrShow: function () {
            return !(null != this.config.lead && this.isEnabled && !this.getFormSentOrSkipped()) || (this.show(), !1);
        },
        setEnabled: function (e) {
            (this.isEnabled = e), this.isEnabled || this.hide(!1);
        },
        setControlsEnabled: function (e) {
            (this.isControlsEnabled = e), this.isControlsEnabled || this.removeFormSent();
        },
        loadForEditor: function (e) {
            (this.config = e), null != this.config && null != this.config.lead && null != this.config.lead.page && (heyzine.isVisiblePage(this.config.lead.page) && this.isEnabled ? (this.hide(!1), this.show(!1)) : this.hide(!1));
        },
        hide: function (e) {
            null == e || e
                ? $("#form-lead").fadeOut("fast", function () {
                      $("#form-lead").remove();
                  })
                : $("#form-lead").remove(),
                heyzine.controls.navigation.setEnabled(!0);
        },
        show: function (e) {
            if (null == this.config.lead || 1 != this.config.lead.enabled) return;
            if (this.getFormSentOrSkipped()) return;
            if ($("#form-lead").length > 0) return this.hide(!1), void this.show(!1);
            const t = this.config.lead,
                i = $('<div id="form-lead" style="display: none;"></div>'),
                n = $('<div class="form-lead-content"></div>');
            i.append(n);
            const o = $('<div class="form-lead-data"></div>');
            n.append(o);
            let s = !1;
            if (
                ("blur_dark" == t.theme
                    ? ($(i).addClass("form-theme-dark"), (s = !0))
                    : "solid_light" == t.theme
                    ? $(i).addClass("form-theme-solid").addClass("form-theme-light")
                    : "solid_dark" == t.theme && ($(i).addClass("form-theme-solid").addClass("form-theme-dark"), (s = !0)),
                "" != $.trim(t.picture_url))
            ) {
                let e = "";
                (".svg" != t.picture_url.substr(-4) && ".png" != t.picture_url.substr(-4)) || (e = "size-limit");
                let i = s ? t.picture_url.replace(".", "-dark.") : t.picture_url;
                n.append('<div class="form-lead-pic"><img src="' + heyzine.cdnPath + i + '" class="' + e + '" /></div>');
            }
            if (("" != $.trim(t.text) && $('<div class="form-lead-header"></div>').text(t.text).appendTo(o), null != t.fields && t.fields.length > 0 && this.addFields(o), 1 == t.privacy)) {
                o.append('<div class="form-lead-privacy"><label></label></div>');
                let e = heyzine.lang.translate.fromKey("privacy").replace("{link}", t.privacy_link).replace("{company}", t.privacy_name);
                o.find(".form-lead-privacy label").html(e), o.find(".form-lead-privacy label").prepend('<input type="checkbox" id="chkFormPrivacy" />');
            }
            $('<div class="form-lead-submit"><button type="button" id="btnFormSubmit" class="form-lead-button">' + heyzine.lang.translate.fromKey("send") + "</button></div>").appendTo(o),
                "" != $.trim(t.text_button) && o.find("#btnFormSubmit").text(t.text_button),
                1 == t.skip &&
                    (o.find(".form-lead-submit").append('<a href="" id="btnFormSkip">' + heyzine.lang.translate.fromKey("skip") + "</a>"),
                    "" != $.trim(t.text_skip) &&
                        (o.find("#btnFormSkip").text(t.text_skip),
                        o
                            .find("#btnFormSkip")
                            .append(
                                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50"><path d="M18.278,40.219L15.09,37.03c-0.781-0.781-0.781-2.047,0-2.828L24.292,25l-9.202-9.202c-0.781-0.781-0.781-2.047,0-2.828\tl3.188-3.188C19.059,9,20.326,9,21.107,9.781L34.91,23.585c0.781,0.781,0.781,2.047,0,2.828L21.107,40.218\tC20.326,41,19.059,41,18.278,40.219z"></path></svg>'
                            ))),
                $("#canvas").parent().append(i),
                this.formBindings(i),
                null == e || e ? i.fadeIn("fast") : i.show(),
                heyzine.controls.navigation.setEnabled(!1);
        },
        addFields: function (e) {
            let t = this.config.lead.fields;
            for (let i = 0; i < t.length; i++) {
                let n;
                "check" != t[i].type && ((n = $('<div class="form-lead-field" data-field-id="' + i + '"><label for="leadField' + i + '"></label></div>')), n.find("label").text(t[i].label)),
                    "text" == t[i].type
                        ? n.append('<input id="leadField' + i + '" type="text" ' + (t[i].required ? "required" : "") + " />")
                        : "email" == t[i].type
                        ? n.append('<input id="leadField' + i + '" type="email" ' + (t[i].required ? "required" : "") + " />")
                        : "paragraph" == t[i].type
                        ? n.append('<textarea id="leadField' + i + '" ' + (t[i].required ? "required" : "") + "></textarea>")
                        : "number" == t[i].type
                        ? n.append('<input id="leadField' + i + '" type="number" ' + (t[i].required ? "required" : "") + " />")
                        : "review" == t[i].type
                        ? this.addFieldReview(n)
                        : "check" == t[i].type &&
                          ((n = $('<div class="form-lead-field form-lead-check" data-field-id="' + i + '"><label for="leadField' + i + '"></label></div>')),
                          n.find("label").text(t[i].label),
                          n.find("label").html(this.getMarkdownTransform(n.find("label").html())),
                          n.find("label").prepend('<input id="leadField' + i + '" type="checkbox" ' + (t[i].required ? "required" : "") + " />")),
                    e.append(n);
            }
        },
        addFieldReview: function (e) {
            const t =
                    '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M 25 1 A 1.0001 1.0001 0 0 0 24.068359 1.6386719 L 17.902344 17.535156 L 0.94921875 18.400391 A 1.0001 1.0001 0 0 0 0.3671875 20.173828 L 13.568359 30.966797 L 9.2324219 47.34375 A 1.0001 1.0001 0 0 0 10.740234 48.441406 L 25 39.289062 L 39.259766 48.441406 A 1.0001 1.0001 0 0 0 40.767578 47.34375 L 36.431641 30.966797 L 49.632812 20.173828 A 1.0001 1.0001 0 0 0 49.050781 18.400391 L 32.097656 17.535156 L 25.931641 1.6386719 A 1.0001 1.0001 0 0 0 25 1 z M 25 4.7636719 L 30.466797 18.861328 A 1.0001 1.0001 0 0 0 31.349609 19.498047 L 46.359375 20.265625 L 34.667969 29.826172 A 1.0001 1.0001 0 0 0 34.333984 30.855469 L 38.175781 45.369141 L 25.541016 37.257812 A 1.0001 1.0001 0 0 0 24.458984 37.257812 L 11.824219 45.369141 L 15.666016 30.855469 A 1.0001 1.0001 0 0 0 15.332031 29.826172 L 3.640625 20.265625 L 18.650391 19.498047 A 1.0001 1.0001 0 0 0 19.533203 18.861328 L 25 4.7636719 z"></path></svg>',
                i = $('<div class="form-lead-field-review"></div>');
            for (let e = 0; e < 5; e++) {
                let n = $('<a class="form-lead-field-review-item"></a>');
                $(t).appendTo(n), $(n).attr("data-review", e + 1), i.append(n);
            }
            i.appendTo(e),
                $(i).on("click", "[data-review]", function () {
                    let e = parseInt($(this).attr("data-review"));
                    for (let i = 1; i <= 5; i++)
                        i <= e
                            ? $(this)
                                  .closest(".form-lead-field-review")
                                  .find("[data-review=" + i + "]")
                                  .html(
                                      '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M10.2,48.6c-0.2,0-0.4-0.1-0.6-0.2c-0.3-0.2-0.5-0.7-0.4-1.1l4.4-16.4L0.4,20.2C0,20-0.1,19.5,0,19.1 c0.1-0.4,0.5-0.7,0.9-0.7l17-0.9l6.1-15.9C24.2,1.3,24.6,1,25,1c0.4,0,0.8,0.3,0.9,0.6l6.1,15.9l17,0.9c0.4,0,0.8,0.3,0.9,0.7 c0.1,0.4,0,0.8-0.3,1.1L36.4,30.9l4.4,16.4c0.1,0.4,0,0.8-0.4,1.1c-0.3,0.2-0.8,0.3-1.1,0L25,39.2l-14.3,9.2 C10.5,48.6,10.4,48.6,10.2,48.6z"></path></svg>'
                                  )
                            : $(this)
                                  .closest(".form-lead-field-review")
                                  .find("[data-review=" + i + "]")
                                  .html(t);
                    return $(this).closest(".form-lead-field-review").attr("data-val", e), $(this).trigger("review:click"), !1;
                });
        },
        getMarkdownTransform: function (e) {
            let t = e,
                i = t.matchAll(/\[([^\[\]]*)\]\((.*?)\)/gm),
                n = i.next();
            for (; n && !n.done && n.value && n.value.length >= 3; ) (t = t.replace(n.value[0], '<a href="' + n.value[2] + '">' + n.value[1] + "</a>")), (n = i.next());
            return t;
        },
        setFormSkipped: function () {
            this.isControlsEnabled && (sessionStorage.setItem("heyzine-form-lead-" + heyzine.config.name, "1"), null != heyzine.tag && sessionStorage.setItem("heyzine-form-lead-" + heyzine.tag, "1"));
        },
        setFormSent: function () {
            this.isControlsEnabled && (heyzine.storage.setItem("heyzine-form-lead-" + heyzine.config.name, "1"), null != heyzine.tag && heyzine.storage.setItem("heyzine-form-lead-" + heyzine.tag, "1"));
        },
        removeFormSent: function () {
            heyzine.storage.removeItem("heyzine-form-lead-" + heyzine.config.name),
                sessionStorage.removeItem("heyzine-form-lead-" + heyzine.config.name),
                null != heyzine.tag && (heyzine.storage.removeItem("heyzine-form-lead-" + heyzine.tag), sessionStorage.removeItem("heyzine-form-lead-" + heyzine.tag));
        },
        getFormSentOrSkipped: function () {
            let e = "1" === heyzine.storage.getItem("heyzine-form-lead-" + heyzine.config.name) || "1" === sessionStorage.getItem("heyzine-form-lead-" + heyzine.config.name);
            return e || null == heyzine.tag || (e = "1" === heyzine.storage.getItem("heyzine-form-lead-" + heyzine.tag) || "1" === sessionStorage.getItem("heyzine-form-lead-" + heyzine.tag)), e;
        },
        submitOrSkipClicked: function () {
            null != this.pageAfterSubmit && (heyzine.goToPage(this.pageAfterSubmit), (this.pageAfterSubmit = null));
        },
        formBindings: function (e) {
            $("#btnFormSkip").on("click", () => (this.hide(), this.setFormSkipped(), this.submitOrSkipClicked(), !1)),
                $("#btnFormSubmit").on("click", () => (this.formValidation(e) && (this.isControlsEnabled && (this.sendForm(e), this.setFormSent()), this.hide(), this.submitOrSkipClicked()), !1)),
                e.find("input").on("keyup", () => {
                    this.isDirty && ($(e).find(".form-field-error").removeClass("form-field-error"), this.formValidation(e));
                }),
                e.find("textarea").on("keyup", () => {
                    this.isDirty && ($(e).find(".form-field-error").removeClass("form-field-error"), this.formValidation(e));
                }),
                e.find("[data-review]").on("review:click", () => {
                    this.isDirty && ($(e).find(".form-field-error").removeClass("form-field-error"), this.formValidation(e));
                }),
                e.find(".form-lead-privacy").on("click", () => {
                    this.isDirty && ($(e).find(".form-field-error").removeClass("form-field-error"), this.formValidation(e));
                }),
                e.on("mousemove", function (e) {
                    e.preventDefault(), e.stopPropagation();
                });
        },
        formValidation: function (e) {
            let t = this.config.lead.fields;
            (this.formData = []), (this.isDirty = !0);
            let i = !0;
            e.find(".form-lead-field").each((e, n) => {
                $(n).removeClass("form-field-error");
                const o = $(n).attr("data-field-id"),
                    s = t[o].type;
                let a = "";
                "text" == s || "email" == s
                    ? (a = $.trim($(n).find("input").val()))
                    : "paragraph" == s
                    ? (a = $.trim($(n).find("textarea").val()))
                    : "number" == s
                    ? (a = $.trim($(n).find("input").val()))
                    : "review" == s
                    ? (a = $.trim($(n).find(".form-lead-field-review").attr("data-val")))
                    : "check" == s && (a = $(n).find("input").is(":checked") ? "yes" : ""),
                    (1 == t[o].required && "" == a) || ("number" == s && "" != a && !heyzine.helpers.parser.isNumeric(a)) || ("email" == s && "" != a && !heyzine.helpers.parser.isEmail(a))
                        ? ($(n).addClass("form-field-error"), (i = !1))
                        : this.formData.push({ label: t[o].label, value: a });
            });
            const n = e.find(".form-lead-privacy");
            return n.length > 0 && (n.find("input[type=checkbox]").is(":checked") || (n.addClass("form-field-error"), (i = !1))), i;
        },
        sendForm: function () {
            $.post("/flip-book/lead-form", { name: heyzine.config.name, idLeadForm: heyzine.config.lead.id_lead_form, lead: this.formData }, function (e) {});
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.bookmark = {
        config: {},
        bookmarkList: [],
        lastLeft: "",
        lastRight: "",
        tmrShowSides: null,
        tmrShowLeft: null,
        tmrShowRight: null,
        rightSide: [],
        leftSide: [],
        tabEffectDelayShow: 400,
        tabEffectDelayHide: 50,
        tabEffectShowTime: 200,
        tabEffectHideTime: 100,
        sideEffectDelay: 800,
        sideEffectTime: 200,
        tabMouseDown: null,
        bindings: function (e) {
            (this.sideEffectDelay = hzflip.viewers.magazine.duration),
                (this.config = e),
                (this.bookmarkList = this.config && this.config.bookmark && this.config.bookmark.list && this.config.bookmark.list.length > 0 ? this.config.bookmark.list : []);
            const t = this;
            $(".page-findex")
                .off("click")
                .on("click", ".page-bookmark-add-left", (e) => {
                    let t = heyzine.getVisiblePages()[0];
                    heyzine.controls.addUserBookmark(t), heyzine.stats.trackBookmarkAdd(t);
                }),
                $(".page-findex").on("click", ".page-bookmark-add-right", (e) => {
                    const t = heyzine.getVisiblePages();
                    let i = 2 == t.length ? t[1] : t[0];
                    heyzine.controls.addUserBookmark(i), heyzine.stats.trackBookmarkAdd(i);
                }),
                $(".page-findex").on("click", ".page-findex-item", function () {
                    if (!($(this).outerWidth() < 60)) return void $(this).addClass("page-findex-out");
                    t.releaseDragTab(this);
                    const e = $(this).attr("data-findex-page");
                    null != e && (heyzine.goToPage(e, "button"), heyzine.stats.trackBookmarkClick($(this).text(), e));
                }),
                $(".page-findex")
                    .off("mousedown touchstart")
                    .on("mousedown touchstart", "[data-findex-ubix].page-findex-item", function (e) {
                        let i = null == e.pageX ? e.changedTouches[0].pageX : e.pageX;
                        const n = $(this).closest(".page-findex").hasClass("page-findex-left") ? "left" : "right";
                        t.tabMouseDown = { x: i, tabWidth: $(this).outerWidth(), side: n };
                    }),
                $(".page-findex")
                    .off("mousemove touchmove")
                    .on("mousemove touchmove", "[data-findex-ubix].page-findex-item", function (e) {
                        if (1 == e.buttons || (e.touches && 1 == e.touches.length)) {
                            let i = null == e.pageX ? e.changedTouches[0].pageX : e.pageX,
                                n = "right" == t.slideDirection(t.tabMouseDown.side) ? i - t.tabMouseDown.x : t.tabMouseDown.x - i,
                                o = t.tabMouseDown.tabWidth + n;
                            if (Math.abs(n) < 8) return;
                            $(this).addClass("page-findex-drag"),
                                o >= 60 ? $(this).css("width", "60px") : o < 30 ? ($(this).css("width", "30px"), $(this).removeClass("page-findex-out")) : ($(this).css("width", o + "px"), $(this).removeClass("page-findex-out")),
                                o > 10 && $(this).find(".tab-del-drag").length <= 0
                                    ? ($(this).prepend(
                                          '<div class="tab-del-drag" style="opacity: 0;"><svg width="14px" height="14px" viewBox="0 0 24 24" stroke-width="2.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75" stroke="#515151" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>'
                                      ),
                                      $(this).prepend(
                                          '<div class="tab-undo-drag" style="opacity: 0;"><svg width="14px" height="14px" viewBox="0 0 24 24" stroke-width="2.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M4.5 8H15s0 0 0 0 5 0 5 4.706C20 18 15 18 15 18H6.286" stroke="#515151" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 11.5L4 8l3.5-3.5" stroke="#000000" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>'
                                      ))
                                    : $(this).find(".tab-del-drag").length > 0 &&
                                      (o > 46
                                          ? ($(this)
                                                .find(".tab-del-drag")
                                                .css("opacity", o / 60),
                                            $(this)
                                                .find(".tab-undo-drag")
                                                .css("opacity", o / 60))
                                          : ($(this).find(".tab-del-drag").css("opacity", 0), $(this).find(".tab-undo-drag").css("opacity", 0)));
                        } else {
                            $(this).outerWidth() < 60 ? t.releaseDragTab(this) : $(this).addClass("page-findex-out");
                        }
                    }),
                $(".page-findex").on("click", ".tab-undo-drag", function (e) {
                    t.releaseDragTab($(this).closest(".page-findex-item"));
                }),
                $(".page-findex").on("click", ".tab-del-drag", function (e) {
                    const i = $(this).closest(".page-findex-item").attr("data-findex-ubix");
                    null != i && heyzine.controls.removeUserBookmark(i), t.releaseDragTab($(this).closest(".page-findex-item"));
                }),
                this.show();
        },
        releaseDragTab: function (e) {
            $(e).removeClass("page-findex-out"), $(e).removeClass("page-findex-drag"), $(e).css("width", "30px"), $(e).find(".tab-del-drag").remove(), $(e).find(".tab-undo-drag").remove();
        },
        slideDirection: function (e) {
            return 1 == heyzine.design.data.rtl ? ("left" == e ? "right" : "left") : e;
        },
        getTabData: function () {
            let e = [];
            if (!this.isEnabled()) return null;
            if (
                (this.bookmarkList.length > 0 && (2 == heyzine.design.data.show_outline || 3 == heyzine.design.data.show_outline) && (e = e.concat(this.config.bookmark.list.filter((e) => null != e.page))),
                heyzine.controls.getUserBookmarks().length > 0 && (2 == heyzine.design.data.show_bookmarks || 3 == heyzine.design.data.show_bookmarks))
            ) {
                const t = heyzine.controls.getUserBookmarks();
                for (let i = 0; i < t.length; i++) (t[i].userBookmarkIx = i), e.push(t[i]);
            }
            e.sort((e, t) => (null === e.page || null === t.page ? 1 : e.page - t.page));
            for (let t = 0; t < e.length; t++) e[t].id = t;
            return e;
        },
        destroy: function () {},
        loadForEditor: function (e) {
            if ((this.bindings(e), this.show(), !this.isEnabled())) {
                let e = $("#magazineViewport").find(".page-findex-left"),
                    t = $("#magazineViewport").find(".page-findex-right");
                e.html(""), t.html(""), e.hide(), t.hide();
            }
        },
        userBookmarkChange: function () {
            this.show();
        },
        isEnabled: function () {
            return 2 == heyzine.design.data.show_outline || 3 == heyzine.design.data.show_outline || 2 == heyzine.design.data.show_bookmarks || 3 == heyzine.design.data.show_bookmarks;
        },
        isBookmarksEnabled: function () {
            return 2 == heyzine.design.data.show_bookmarks || 3 == heyzine.design.data.show_bookmarks;
        },
        isOneSide: function () {
            return "SWIPER" != heyzine.config.viewer && heyzine.isSinglePage();
        },
        turning: function (e) {
            if (this.isEnabled() && null != e) {
                if ("SWIPER" == heyzine.config.viewer) {
                    const t = $('.swiper-slide[page="' + e + '"]');
                    1 == t.length ? $(".page-findex").appendTo(t) : $(".page-findex").appendTo(".swiper.container");
                }
                if (this.isOneSide())
                    heyzine.getCurrentPage() > e && ($(".magazine-viewport.page-single").addClass("page-controls-turn"), $(".page-findex-right").hide("slide", { direction: this.slideDirection("left") }, this.sideEffectTime));
                else if (
                    (this.distributeSides(e),
                    this.hideTabsSide(),
                    setTimeout(() => {
                        let e = JSON.stringify(this.leftSide),
                            t = JSON.stringify(this.rightSide);
                        (e == this.lastLeft && t == this.lastRight) || (this.showTabsSide(), (this.lastLeft = e), (this.lastRight = t));
                    }, this.tabEffectDelayHide + this.tabEffectHideTime),
                    1 == e)
                )
                    null != this.tmrShowLeft && clearTimeout(this.tmrShowLeft),
                        $(".page-findex-left").hide(),
                        (this.tmrShowRight = setTimeout(() => {
                            $(".page-findex-right").show("slide", { direction: this.slideDirection("left") }, this.sideEffectTime);
                        }, this.sideEffectDelay));
                else if (e == heyzine.config.num_pages)
                    null != this.tmrShowRight && clearTimeout(this.tmrShowRight),
                        $(".page-findex-right").hide(),
                        (this.tmrShowLeft = setTimeout(() => {
                            $(".page-findex-left").show("slide", { direction: this.slideDirection("right") }, this.sideEffectTime);
                        }, this.sideEffectDelay));
                else {
                    const e = 1 == heyzine.getCurrentPage() || heyzine.getCurrentPage() == heyzine.config.num_pages ? this.sideEffectDelay : 0;
                    $(".page-findex-left").is(":visible") ||
                        setTimeout(() => {
                            $(".page-findex-left").show("slide", { direction: this.slideDirection("right") }, this.sideEffectTime);
                        }, e),
                        $(".page-findex-right").is(":visible") ||
                            setTimeout(() => {
                                $(".page-findex-right").show("slide", { direction: this.slideDirection("left") }, this.sideEffectTime);
                            }, e);
                }
            }
        },
        turned: function (e) {
            if (
                this.isEnabled() &&
                (this.isOneSide() && ($(".magazine-viewport.page-single").removeClass("page-controls-turn"), $(".page-findex-right").show("slide", { direction: this.slideDirection("left") }, this.sideEffectTime)),
                "SWIPER" == heyzine.config.viewer)
            ) {
                const t = $('.swiper-slide[page="' + e + '"]');
                1 == t.length && $(".page-findex").closest(".swiper-slide").attr("page") != e && $(".page-findex").appendTo(t);
            }
        },
        peelStart: function (e) {
            this.isEnabled() &&
                (1 == e.next
                    ? $(".page-findex-left").hide("slide", { direction: this.slideDirection("right") }, this.sideEffectTime)
                    : e.next == heyzine.config.num_pages && $(".page-findex-right").hide("slide", { direction: this.slideDirection("left") }, this.sideEffectTime));
        },
        peelEnd: function (e, t) {
            this.isEnabled() &&
                null != this.getTabData() &&
                (1 == e.next
                    ? ($(".page-findex-left").hide(), $(".page-findex-left").show("slide", { direction: this.slideDirection("right") }, this.sideEffectTime))
                    : e.next == heyzine.config.num_pages && ($(".page-findex-right").hide(), $(".page-findex-right").show("slide", { direction: this.slideDirection("left") }, this.sideEffectTime)));
        },
        resizeViewport: function () {
            this.show();
        },
        createTabDom: function (e, t) {
            let i;
            return (
                "{{add-bookmark-left}}" == e.title
                    ? ((i = $('<div class="page-findex-item page-bookmark-add page-bookmark-add-left"></div>')),
                      i.html(
                          '<svg width="16px" height="30px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-5.918-3.805a2 2 0 00-2.164 0L5 21z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
                      ))
                    : "{{add-bookmark-right}}" == e.title
                    ? ((i = $('<div class="page-findex-item page-bookmark-add page-bookmark-add-right"></div>')),
                      i.html(
                          '<svg width="16px" height="30px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-5.918-3.805a2 2 0 00-2.164 0L5 21z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
                      ))
                    : ((i = $('<div class="page-findex-item" data-findex-id="' + e.id + '"></div>')), i.text(e.title), i.attr("data-findex-page", e.page), null != e.userBookmarkIx && i.attr("data-findex-ubix", e.userBookmarkIx)),
                e.background ? i.css("background-color", e.background.indexOf("#") < 0 && e.background.indexOf("rgb") < 0 ? "rgb(" + e.background + ")" : e.background) : i.css("background-color", "white"),
                e.color ? i.css("color", e.color.indexOf("#") < 0 && e.color.indexOf("rgb") < 0 ? "rgb(" + e.color + ")" : e.color) : i.css("color", "black"),
                e.style && (e.style.indexOf("bold") > -1 && i.css("font-weight", "bold"), e.style.indexOf("italic") > -1 && i.css("font-style", "italic")),
                t.append(i),
                i
            );
        },
        hideTabsSide: function () {
            for (let e = 0; e < this.rightSide.length; e++) {
                const t = $("[data-findex-id=" + this.rightSide[e].id + "]");
                t.closest(".page-findex-right").length <= 0 &&
                    setTimeout(() => {
                        $(t).hide("slide", { direction: this.slideDirection("right") }, this.tabEffectHideTime);
                    }, this.tabEffectDelayHide);
            }
            for (let e = 0; e < this.leftSide.length; e++) {
                const t = $("[data-findex-id=" + this.leftSide[e].id + "]");
                t.closest(".page-findex-left").length <= 0 &&
                    setTimeout(() => {
                        $(t).hide("slide", { direction: this.slideDirection("left") }, this.tabEffectHideTime);
                    }, this.tabEffectDelayHide);
            }
        },
        showTabsSide: function () {
            for (let e = 0; e < this.rightSide.length; e++) {
                const t = $("[data-findex-id=" + this.rightSide[e].id + "]");
                $(t).css("z-index", this.rightSide.length - e),
                    t.closest(".page-findex-right").length <= 0 &&
                        (t.appendTo(".page-findex-right"),
                        setTimeout(() => {
                            $(t).show("slide", { direction: this.slideDirection("left") }, this.tabEffectShowTime);
                        }, this.tabEffectDelayShow));
            }
            for (let e = 0; e < this.leftSide.length; e++) {
                const t = $("[data-findex-id=" + this.leftSide[e].id + "]");
                $(t).css("z-index", e),
                    t.closest(".page-findex-left").length <= 0 &&
                        (t.appendTo(".page-findex-left"),
                        setTimeout(() => {
                            $(t).show("slide", { direction: this.slideDirection("right") }, this.tabEffectShowTime);
                        }, this.tabEffectDelayShow));
            }
        },
        createTabsSides: function () {
            let e = $("#magazineViewport").find(".page-findex-left"),
                t = $("#magazineViewport").find(".page-findex-right"),
                i = 0,
                n = [];
            e.html(""), e.show();
            let o = !1;
            for (let t = 0; t < this.leftSide.length; t++) {
                const s = this.leftSide[t],
                    a = this.createTabDom(s, e);
                0 == t && this.isBookmarksEnabled() ? ((i += a.outerHeight()), n.push(a), (o = !0)) : (0 != t || (0 == t && !this.isBookmarksEnabled())) && ((i += a.outerHeight()), n.push(a));
            }
            t.html(""), t.show();
            for (let e = 0; e < this.rightSide.length; e++) {
                const s = this.rightSide[e],
                    a = this.createTabDom(s, t);
                ((0 == e && this.isBookmarksEnabled() && !o) || 0 != e || (0 == e && !this.isBookmarksEnabled())) && ((i += a.outerHeight()), n.push(a));
            }
            const s = $(".page-findex-left").outerHeight(),
                a = s - i;
            if (a >= 0) {
                const e = a / (n.length - 1);
                let t = 0;
                for (let i = 0; i < n.length; i++) n[i].css("top", t + "px"), (t += n[i].outerHeight() + e);
            } else {
                let e = s / i,
                    t = (n[0].outerHeight() - n[0].outerHeight() * e) / (n.length - 1),
                    o = 0;
                for (let i = 0; i < n.length; i++) i > 0 && (o += n[i - 1].outerHeight() - n[i].outerHeight() + n[i].outerHeight() * e - t), n[i].css({ top: o + "px", "z-index": n.length - i });
            }
            if (this.isOneSide()) e.hide();
            else {
                const i = heyzine.getVisiblePages();
                1 == i[0] ? e.hide() : i[0] == heyzine.config.num_pages && t.hide();
            }
        },
        distributeSides: function (e) {
            const t = this.getTabData();
            if (null == t) return;
            let i = heyzine.getVisiblePages(e);
            (this.rightSide = []), (this.leftSide = []), this.isBookmarksEnabled() && (this.rightSide.push({ title: "{{add-bookmark-right}}" }), this.leftSide.push({ title: "{{add-bookmark-left}}" }));
            for (let e = 0; e < t.length; e++) {
                const n = t[e];
                2 == i.length ? (n.page >= i[1] ? this.rightSide.push(n) : this.leftSide.push(n)) : this.isOneSide() || (n.page >= i[0] && i[0] != heyzine.config.num_pages) ? this.rightSide.push(n) : this.leftSide.push(n);
            }
            this.rightSide.sort((e, t) => (null === e.page || null === t.page ? 1 : e.page - t.page)), this.leftSide.sort((e, t) => (null === e.page || null === t.page ? 1 : e.page - t.page));
        },
        show: function () {
            this.isEnabled() && null != this.getTabData() && (this.distributeSides(), this.createTabsSides());
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.controls && (hzflip.controls = {}),
    (hzflip.controls.navpanel = {
        config: {},
        bookmarkList: [],
        opened: !1,
        isEditMode: !1,
        panel: "thumbnails",
        isEditingBookmarks: !1,
        thumbEnabled: !0,
        outlineEnabled: !1,
        bookmarkEnabled: !1,
        thumbPreloadNum: 11,
        tmrThumbPreload: null,
        bindings: function (e) {
            (this.config = e),
                (this.bookmarkList = this.config && this.config.bookmark && this.config.bookmark.list && this.config.bookmark.list.length > 0 ? this.config.bookmark.list : []),
                $("#btnNavPanelBookmarkAdd .btn-nav-panel-text").text(heyzine.lang.translate.fromKey("bookmark_add")),
                $("#btnNavPanel")
                    .off("click")
                    .on("click", () => (this.isEditMode || (this.opened ? this.hide() : this.show()), !1)),
                $("#btnNavPanelThumbnails")
                    .off("click")
                    .on("click", () => {
                        $(".panel-nav-body").hide(), $(".panel-nav-thumbnails").show();
                    }),
                $("#btnNavPanelOutline")
                    .off("click")
                    .on("click", () => {
                        $(".panel-nav-body").hide(), $(".panel-nav-outline").show();
                    }),
                $("#btnNavPanelBookmark")
                    .off("click")
                    .on("click", () => {
                        $(".panel-nav-body").hide(), $(".panel-nav-bookmark").show();
                    }),
                $("#btnNavPanelBookmarkAdd")
                    .off("click")
                    .on("click", () => {
                        const e = heyzine.getCurrentPage();
                        heyzine.controls.addUserBookmark(e), heyzine.stats.trackBookmarkAdd(e);
                    }),
                $(".panel-nav-close")
                    .off("click")
                    .on("click", () => (this.hide(), !1)),
                $("#pnlNav").on("wheel mousemove touchstart touchend touchmove dblclick", (e) => {
                    e.stopPropagation();
                }),
                $("#pnlNav").on("dblclick", (e) => {
                    e.stopPropagation();
                });
            const t = this;
            $("#pnlNav")
                .off("click")
                .on("click", "[data-nav-page]", function () {
                    const e = $(this).attr("data-nav-page");
                    heyzine.goToPage(e, "button"), t.selectPages(heyzine.getVisiblePages(e)), heyzine.stats.trackBookmarkClick($(this).text(), e), null != $(window).width() && $(window).width() < 854 && t.hide();
                }),
                $("#pnlNav").on("click", "[data-nav-link]", function () {
                    const e = $(this).attr("data-nav-link");
                    heyzine.navigate(t.config.bookmark.list[e].target, "newtab"), null != $(window).width() && $(window).width() < 854 && t.hide();
                }),
                $("#btnNavPanelEditBookmarks")
                    .off("click")
                    .on("click", () => {
                        this.showBookmarkEdit();
                    }),
                $("#btnNavPanelSaveBookmarks")
                    .off("click")
                    .on("click", () => {
                        $(".panel-nav-bookmark-body .panel-nav-bm").each(function (e, t) {
                            const i = $(t),
                                n = i.find(".panel-nav-bm-text").val(),
                                o = i.attr("data-nav-ix");
                            i.find(".lblTextBookmark").text(n), heyzine.controls.updateUserBookmark(o, n);
                        }),
                            this.hideBookmarkEdit();
                    }),
                $("#pnlNav").on("click", ".btnDelBookmark", function () {
                    let e = $(this).closest(".panel-nav-bm");
                    const t = e.attr("data-nav-ix");
                    heyzine.controls.removeUserBookmark(t),
                        e.remove(),
                        $(".panel-nav-bookmark-body .panel-nav-bm").each(function (e, t) {
                            $(this).attr("data-nav-ix", e);
                        });
                }),
                $(".panel-nav-thumbnails-body")
                    .off("scroll")
                    .on("scroll", () => {
                        null != this.tmrThumbPreload && clearTimeout(this.tmrThumbPreload),
                            (this.tmrThumbPreload = setTimeout(() => {
                                const e = $("[data-nav-page]");
                                for (let t = 0; t < e.length; t++) {
                                    const i = e[t];
                                    "false" == $(i).attr("data-thumb-loaded") && this.isElementVisible(i, $(".panel-nav-thumbnails-body").get(0)) && this.loadThumbnail($(i).attr("data-nav-page"), $(i));
                                }
                            }, 300));
                    });
        },
        destroy: function () {},
        turning: function (e) {},
        turned: function (e) {
            null != e && this.selectPages(heyzine.getVisiblePages());
        },
        userBookmarkChange: function () {
            this.loadBookmarks(), this.isEditingBookmarks ? this.showBookmarkEdit() : this.hideBookmarkEdit();
        },
        selectPages: function (e) {
            $(".panel-nav-page-current").removeClass("panel-nav-page-current");
            for (let t = 0; t < e.length; t++) $("[data-nav-page=" + e[t] + "]").addClass("panel-nav-page-current");
        },
        isElementVisible: function (e, t) {
            t = t || document.body;
            const { top: i, bottom: n, height: o } = e.getBoundingClientRect(),
                s = t.getBoundingClientRect();
            return i <= s.top ? s.top - i <= o : n - s.bottom <= o;
        },
        loadThumbnail: function (e, t) {
            return new Promise((i, n) => {
                t.attr("data-thumb-loaded", "true"),
                    heyzine
                        .loadPageThumbnails(parseInt(e), null, t)
                        .then(() => {
                            t.find("img").attr("alt", heyzine.lang.translate.fromKey("page") + " " + e),
                                t.find("img").attr("title", heyzine.lang.translate.fromKey("page") + " " + e),
                                2 == heyzine.design.data.show_thumbpanel && t.append('<div class="panel-nav-page-num">' + e + "</div>"),
                                i();
                        })
                        .catch(() => {
                            n();
                        });
            });
        },
        setDisposition: function () {
            const e = heyzine.design.data;
            let t = 0;
            1 == e.show_thumbpanel || 2 == e.show_thumbpanel ? ($("#btnNavPanelThumbnails").show(), (this.thumbEnabled = !0), t++) : ($("#btnNavPanelThumbnails").hide(), (this.thumbEnabled = !1)),
                this.bookmarkList.length > 0 && (1 == e.show_outline || 3 == e.show_outline) ? ($("#btnNavPanelOutline").show(), (this.outlineEnabled = !0), t++) : ($("#btnNavPanelOutline").hide(), (this.outlineEnabled = !1)),
                1 == e.show_bookmarks || 3 == e.show_bookmarks ? ($("#btnNavPanelBookmark").show(), (this.bookmarkEnabled = !0), t++) : ($("#btnNavPanelBookmark").hide(), (this.bookmarkEnabled = !1));
            let i = 0;
            $(".panel-nav-thumbnails").is(":visible") ? (i = 1) : $(".panel-nav-outline").is(":visible") ? (i = 2) : $(".panel-nav-bookmark").is(":visible") && (i = 3),
                $("#pnlNav .panel-nav-body").hide(),
                this.thumbEnabled || this.outlineEnabled || this.bookmarkEnabled
                    ? !this.thumbEnabled || (1 != i && 0 != i)
                        ? !this.outlineEnabled || (2 != i && 0 != i)
                            ? !this.bookmarkEnabled || (3 != i && 0 != i) || $("#pnlNav .panel-nav-bookmark").show()
                            : $("#pnlNav .panel-nav-outline").show()
                        : $("#pnlNav .panel-nav-thumbnails").show()
                    : this.hide(),
                t <= 1 ? $("#pnlNav").addClass("no-sections") : $("#pnlNav").removeClass("no-sections");
        },
        loadForEditor: function (e) {
            this.bindings(e), this.setDisposition(), this.show(e, !1);
        },
        isOpened: function () {
            return this.opened;
        },
        open: function () {
            this.isOpened() || (heyzine.controls.showPanelLateral("#pnlNav"), $("#pnlNav").show(), (this.opened = !0));
        },
        show: function (e, t) {
            this.thumbEnabled && this.loadThumbnails(e),
                this.outlineEnabled && this.loadOutline(e),
                this.bookmarkEnabled && (this.loadBookmarks(e), this.hideBookmarkEdit()),
                (null != t && !0 !== t) || (heyzine.controls.showPanelLateral("#pnlNav"), $("#pnlNav").show(), (this.opened = !0));
        },
        showSubPanel: function (e) {
            "thumbnail" == e
                ? ($(".panel-nav-body").hide(), $(".panel-nav-thumbnails").show())
                : "outline" == e
                ? ($(".panel-nav-body").hide(), $(".panel-nav-outline").show())
                : "bookmark" == e && ($(".panel-nav-body").hide(), $(".panel-nav-bookmark").show());
        },
        loadThumbnails: function (e) {
            null != e && (this.config = e), $("#pnlNav .panel-nav-thumbnails-body").html("");
            const t = heyzine.getVisiblePages();
            for (let e = 1; e <= this.config.num_pages; e++) {
                const i = $('<div class="panel-nav-page" data-nav-page="' + e + '"></div>');
                $("#pnlNav .panel-nav-thumbnails-body").append(i),
                    heyzine.isLandscape() || 1 == e || (e == this.config.num_pages && this.config.num_pages % 2 == 0) ? i.addClass("panel-nav-page-full") : e % 2 != 0 && i.addClass("panel-nav-page-odd");
                for (let n = 0; n < t.length; n++) e == t[n] && i.addClass("panel-nav-page-current");
                i.attr("data-thumb-loaded", "false"), (this.config.num_pages <= heyzine.tocMaxPages || e <= this.thumbPreloadNum) && this.loadThumbnail(e, i);
            }
        },
        loadOutline: function (e) {
            if ((null != e && (this.config = e), this.bookmarkList.length <= 0)) return;
            $("#pnlNav .panel-nav-outline-body").html("");
            const t = this.bookmarkList;
            for (let e = 0; e < t.length; e++) {
                const i = $('<div class="panel-nav-bm"></div>');
                i.text(t[e].title),
                    "link" == t[e].type ? i.attr("data-nav-link", e) : i.attr("data-nav-page", t[e].page),
                    t[e].color && i.css("color", t[e].color),
                    t[e].style && t[e].style.indexOf("bold") && i.css("font-weight", "bold"),
                    t[e].style && t[e].style.indexOf("italic") && i.css("font-style", "italic"),
                    $("#pnlNav .panel-nav-outline-body").append(i);
            }
        },
        loadBookmarks: function (e) {
            if ((null != e && (this.config = e), $("#pnlNav .panel-nav-bookmark-body").html(""), heyzine.controls.getUserBookmarks().length <= 0)) return;
            const t = heyzine.controls.getUserBookmarks();
            t.sort((e, t) => (null === e.page || null === t.page ? 1 : e.page - t.page));
            for (let e = 0; e < t.length; e++) {
                const i = $('<div class="panel-nav-bm"><span class="lblTextBookmark"></span></div>');
                i.attr("data-nav-page", t[e].page),
                    i.attr("data-nav-ix", e),
                    i.append('<input type="text" maxlength="55" class="panel-nav-bm-text panel-nav-bm-btn" />'),
                    i.append(
                        '<span class="btnDelBookmark panel-nav-bm-btn"><svg width="16px" height="16px" viewBox="0 0 24 24" stroke-width="2" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>'
                    ),
                    i.find(".lblTextBookmark").text(t[e].title),
                    i.find(".panel-nav-bm-text").val(t[e].title),
                    $("#pnlNav .panel-nav-bookmark-body").append(i);
            }
        },
        showBookmarkEdit: function () {
            $(".panel-nav-bm-btn").show(),
                $(".lblTextBookmark").hide(),
                $("#btnNavPanelEditBookmarks").hide(),
                heyzine.controls.getUserBookmarks().length <= 0 ? $("#btnNavPanelSaveBookmarks").hide() : $("#btnNavPanelSaveBookmarks").show(),
                (this.isEditingBookmarks = !0);
        },
        hideBookmarkEdit: function () {
            $(".panel-nav-bm-btn").hide(),
                $(".lblTextBookmark").show(),
                heyzine.controls.getUserBookmarks().length <= 0 ? $("#btnNavPanelEditBookmarks").hide() : $("#btnNavPanelEditBookmarks").show(),
                $("#btnNavPanelSaveBookmarks").hide(),
                (this.isEditingBookmarks = !1);
        },
        hide: function () {
            $("#pnlNav").hide(), (this.opened = !1);
        },
        setEditMode: function (e) {
            this.isEditMode = e;
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    (hzflip.layers = {
        layers: [],
        layersDom: [],
        layersComp: [],
        layersGif: [],
        config: null,
        isEditMode: !1,
        singlePage: !1,
        soundEnabled: null,
        lastPage: null,
        init: function (e) {
            (this.config = e), this.load(e.layers);
        },
        firstInteraction: function () {
            let e = heyzine.getCurrentPage();
            this.startTurnLayerActions(e), (this.lastPage = e);
        },
        load: function (e) {
            (this.layers = e),
                (this.singlePage = "SWIPER" == heyzine.config.viewer || 2 == heyzine.design.data.show_double),
                this.resetLayersComp(),
                (null != heyzine.design.data.sound_flip && (1 == $.trim(heyzine.design.data.sound_flip) || !0 === heyzine.design.data.sound_flip)) || this.existSoundLayers() ? $("#btnSoundOff").show() : $("#btnSoundOff").hide();
        },
        existSoundLayers: function () {
            return null != this.layers && this.layers.findIndex((e) => ("background" == e.type && "audio" == e.media.type) || "video" == e.type || "audio" == e.type) > -1;
        },
        setEditMode: function (e) {
            this.isEditMode = e;
        },
        setPageDisplay: function (e) {
            this.singlePage = "single" == e;
        },
        turning: function (e) {
            if (null != this.layers) {
                for (let e = 0; e < this.layers.length; e++) this.layers[e].visible = !1;
                null != e && heyzine.layers.popup.closeAll(!0);
            }
        },
        turned: function (e) {
            null != this.layers && (this.showPageLayers(e), this.startTurnLayerActions(e), this.repositionEditLayers(e), heyzine.layers.popup.closeAll(!0)), (this.lastPage = e), $.fitWidth("refitAll");
        },
        repositionEditLayers: function (e) {
            if (this.isEditMode)
                for (let t = 0; t < this.layers.length; t++) {
                    const i = this.layers[t];
                    if ((i.visible && !this.singlePage) || (i.page == e && this.singlePage)) {
                        const n = $(".page-wrapper[page=" + i.page + "]").get(0),
                            o = $("#content");
                        if (null == $(n).offset())
                            return void setTimeout(() => {
                                this.repositionEditLayers(e);
                            }, 600);
                        (this.layers[t].css.width = ($(n).width() / i.wrapper.width) * i.css.width),
                            (this.layers[t].css.height = ($(n).height() / i.wrapper.height) * i.css.height),
                            (this.layers[t].css.left = $(n).offset().left - o.offset().left + (i.css.left - i.wrapper.left) * ($(n).width() / i.wrapper.width)),
                            (this.layers[t].css.top = $(n).offset().top - o.offset().top + (i.css.top - i.wrapper.top) * ($(n).height() / i.wrapper.height)),
                            (this.layers[t].wrapper = { width: $(n).width(), height: $(n).height(), left: $(n).offset().left - $(o).offset().left, top: $(n).offset().top - $(o).offset().top });
                    }
                }
        },
        showPageLayers: function (e) {
            for (let e = 0; e < this.layers.length; e++) this.layers[e].visible = !1;
            for (let t = 0; t < this.layers.length; t++)
                if (
                    (this.singlePage || 1 == e || (e == this.config.num_pages && this.config.num_pages % 2 == 0)
                        ? e == this.layers[t].page && (this.layers[t].visible = !0)
                        : (e != this.config.num_pages && e != this.config.num_pages - 1) || this.config.num_pages % 2 == 0
                        ? ((e % 2 == 0 && (e == this.layers[t].page || (e + 1 == this.layers[t].page && e + 1 != this.config.num_pages))) || (e % 2 != 0 && (e == this.layers[t].page || (e - 1 == this.layers[t].page && e - 1 != 1)))) &&
                          (this.layers[t].visible = !0)
                        : (e != this.layers[t].page && e + 1 != this.layers[t].page) || (this.layers[t].visible = !0),
                    this.layersDom[t])
                ) {
                    this.layers[t].visible && this.layers[t].action && 1 == this.layers[t].action.highlight ? this.layersDom[t].addClass("layer-action-highlight") : this.layersDom[t].removeClass("layer-action-highlight");
                    const i = this.layers[t];
                    if (i && "video" == i.type) {
                        if ("youtube" == i.media.type) {
                            const n = $(this.layersDom[t]).find("iframe");
                            if (n.length > 0) {
                                const t = n.attr("src") + "&cache=" + new Date().getTime();
                                (i.visible && !this.singlePage) || (i.page == e && this.singlePage)
                                    ? "1" == i.media.options.autoplay && n.attr("src", t.replace("&autoplay=0", "&autoplay=1"))
                                    : n.attr("src", t.replace("&autoplay=1", "&autoplay=0"));
                            }
                        } else if (null != this.layersDom[t]) {
                            const n = $(this.layersDom[t]).find("video").get(0);
                            null != n &&
                                ((i.visible && !this.singlePage) || (i.page == e && this.singlePage)
                                    ? !0 === i.media.played && "1" == i.media.options.once
                                        ? ((n.currentTime = n.duration), n.pause())
                                        : "1" == i.media.options.autoplay && (n.pause(), (n.currentTime = 0), n.load(), n.play(), (i.media.played = !0))
                                    : !0 === i.media.played && "1" == i.media.options.once
                                    ? ((n.currentTime = n.duration), n.pause())
                                    : ("1" == i.media.options.restart && (n.currentTime = 0), n.pause()));
                        }
                    } else if (i && "audio" == i.type) {
                        let n = this.layersComp[t];
                        null != n && ((i.visible && !this.singlePage) || (i.page == e && this.singlePage) ? "1" == i.media.options.autoplay && (n.pause(), n.play()) : 1 != i.media.options.keep && n.pause());
                    } else i && "picture" == i.type && this.layersDom[t].hasClass("layer-action-gif") && this.layersDom[t].find("img").attr("src", this.layersDom[t].find("img").attr("src"));
                }
        },
        startTurnLayerActions: function (e, t) {
            if (this.isEditMode || null == this.layers) return;
            let i = !1;
            for (let t = 0; t < this.layers.length; t++) {
                let n = this.layers[t];
                if ("background" == n.type && "audio" == n.media.type) {
                    this.startTurnAudio(e, n, t) && (i = !0);
                }
            }
            if (!t && !i && !heyzine.isSinglePage()) {
                const t = heyzine.getVisiblePages(e);
                if (2 == t.length) {
                    const i = t[0] == e ? t[1] : t[0];
                    this.startTurnLayerActions(i, !0);
                }
            }
        },
        startTurnAudio: function (e, t, i) {
            let n = i;
            this.layersComp[n] ||
                ((this.layersComp[n] = new Audio(t.media.url)),
                (this.layersComp[n].compType = "backAudio"),
                null != t.media.options && t.media.options.volume && (this.layersComp[n].volume = t.media.options.volume / 100),
                this.layersComp[n].addEventListener("play", (e) => {
                    t.media.played = !0;
                }),
                this.layersComp[n].addEventListener("ended", (e) => {
                    if (null != this.lastPage && this.lastPage >= this.layers[n].page && this.lastPage <= this.layers[n].page_end) {
                        null != t.media.options && t.media.options.loop && ((this.layersComp[n].currentTime = 0), this.layersComp[n].play());
                        for (let e = 0; e < this.layers.length; e++)
                            if (this.layers[e] && "background" == this.layers[e].type && "audio" == this.layers[e].media.type) {
                                const t = heyzine.getVisiblePages(this.lastPage);
                                if (!heyzine.isSinglePage() && 2 == t.length) {
                                    const i = t[0] == this.lastPage ? t[1] : t[0];
                                    this.startTurnAudio(i, this.layers[e], e);
                                }
                            }
                    }
                }));
            let o = e >= t.page && e <= t.page_end,
                s = e < t.page || e > t.page_end,
                a = null != this.lastPage && this.lastPage >= t.page && this.lastPage <= t.page_end;
            if ((null == this.lastPage || this.lastPage < t.page || this.lastPage > t.page_end) && o) {
                if (null != t.media.options && t.media.options.once && t.media.played) return;
                return !1 === this.soundEnabled && (this.layersComp[n].muted = !this.soundEnabled), (this.layersComp[n].currentTime = 0), this.layersComp[n].play(), !0;
            }
            return a && o ? (t.media.played || this.layersComp[n].play(), !1) : (!s || (null != t.media.options && null != t.media.options.keep && !1 !== t.media.options.keep) || this.layersComp[n].pause(), !1);
        },
        resetLayersComp: function () {
            for (let e = 0; e < this.layersComp.length; e++) this.layersComp[e] && ("audio" == this.layersComp[e].compType ? this.layersComp[e].unload() : "backAudio" == this.layersComp[e].compType && this.layersComp[e].pause());
            this.layersComp.length = 0;
        },
        destroyViewportLayers: function (e) {
            return new Promise((e, t) => {
                e("");
            });
        },
        loadViewportLayers: function (e) {
            return new Promise((e, t) => {
                e("");
            });
        },
        loadPageLayers: function (e, t, i) {
            if (($(t).find(".layer-action-render").remove(), this.isEditMode || null == this.layers))
                return new Promise((e, t) => {
                    e("");
                });
            for (let i = 0; i < this.layers.length; i++)
                if (e == this.layers[i].page) {
                    const e = $('<div class="layer-action-render" id="layer' + this.layers[i].id + '" style="position: absolute;" data-disable-events="start"></div>');
                    if (
                        (e
                            .appendTo(t)
                            .css({
                                left: ((this.layers[i].css.left - this.layers[i].wrapper.left + 1) / this.layers[i].wrapper.width) * 100 + "%",
                                top: ((this.layers[i].css.top - this.layers[i].wrapper.top + 1) / this.layers[i].wrapper.height) * 100 + "%",
                                width: (this.layers[i].css.width / this.layers[i].wrapper.width) * 100 + "%",
                                height: (this.layers[i].css.height / this.layers[i].wrapper.height) * 100 + "%",
                            }),
                        (this.layersDom[i] = e),
                        "picture" == this.layers[i].type)
                    )
                        this.createPicture(e, this.layers[i], i);
                    else if ("video" == this.layers[i].type) {
                        const t = this.layers[i].media;
                        if ((e.addClass("layer-action-vid"), t.options && "4" == t.options.controls && e.addClass("layer-controls-disabled"), "youtube" == t.type))
                            e.append('<iframe class="layer-vid" allow="autoplay" allowfullscreen src="' + t.url.replace("&autoplay=1", "&autoplay=0") + '"></iframe>');
                        else {
                            let n = t.options && "1" == t.options.autoplay && 1 == this.layers[i].page,
                                o = t.options && "1" == t.options.once && 1 == this.layers[i].page;
                            this.createVideoPlayer(e, t, { muted: t.options && "1" == t.options.mute, autoplay: n, once: o });
                        }
                    } else if ("web" == this.layers[i].type) {
                        e.addClass("layer-action-web");
                        const t = this.layers[i].media;
                        if (null != t.url && "null" != t.url) {
                            let i = "";
                            1 == t.options.noscroll && (i = 'scrolling="no"'),
                                e.append(
                                    '<iframe class="layer-web"  allow="autoplay *;camera *;microphone *;geolocation *;gyroscope *;fullscreen *;display-capture *;" allowusermedia allowfullscreen ' + i + ' src="' + t.url + '"></iframe>'
                                );
                        }
                    } else if ("audio" == this.layers[i].type) {
                        e.addClass("layer-action-audio"), e.addClass("layer-disable-page-drag");
                        const t = this.layers[i].media;
                        if (null != t.url && "null" != t.url) {
                            let n = hzflip.player.createPlayer(e, { title: t.options.title, url: t.url, style: t.options.controls, autoplay: t.options.autoplay, color1: t.options.color1, color2: t.options.color2 });
                            (n.compType = "audio"), (this.layersComp[i] = n);
                        }
                    }
                    "zoom" == this.layers[i].action.type && e.addClass("layer-zoom").addClass("layer-zoom-in"),
                        this.loadLayerActions(e, this.layers[i], "#layer" + this.layers[i].id),
                        1 == this.layers[i].action.highlight &&
                            setTimeout(() => {
                                e.addClass("layer-action-highlight");
                            }, 1e3);
                }
            return (
                heyzine.stats.trackIframes(this.layers),
                heyzine.stats.trackMedia(this.layers, this.layersComp, this.layersDom),
                $.fitWidth("refitAll"),
                new Promise((e, t) => {
                    e("");
                })
            );
        },
        loadLayerActions: function (e, t, i) {
            $("#magazineViewport")
                .off("click", i)
                .on("click", i, (e) => {
                    heyzine.layers.popup.closeAll(),
                        "page" == t.action.type
                            ? "" != $.trim(t.action.target) && (heyzine.goToPage(parseInt(t.action.target)), heyzine.stats.trackLayer("link-int", t))
                            : "link" == t.action.type
                            ? "" != $.trim(t.action.target) &&
                              (t.action.extra && "1" == t.action.extra.new_tab
                                  ? (heyzine.navigate(t.action.target, "newtab"), heyzine.stats.trackLayer("link-ext", t))
                                  : heyzine.stats.trackLayer("link-ext", t, () => {
                                        heyzine.navigate(t.action.target, "content");
                                    }))
                            : "zoom" == t.action.type
                            ? "" != $.trim(t.action.target) &&
                              (heyzine.setZoom("zoomLayer", t.id, { scale: t.action.target, zoomOut: t.action.extra.zoomOut }), heyzine.stats.trackLayer("zoom-layer", { action: { target: t.id }, page: t.page }))
                            : "popup" == t.action.type && heyzine.layers.popup.show(t, e);
                });
        },
        render: function (e, t) {},
        soundToggle: function (e) {
            if (((this.soundEnabled = e), null != this.layers)) {
                for (let e = 0; e < this.layers.length; e++)
                    if (this.layersDom[e]) {
                        const t = this.layers[e],
                            i = this.layers[e].media;
                        if (t && "video" == t.type)
                            if ("youtube" == t.media.type) {
                                if (null == i || null == i.options || "1" != i.options.mute) {
                                    const t = $(this.layersDom[e]).find("iframe"),
                                        i = t.attr("src");
                                    this.soundEnabled ? t.attr("src", i.replace("&mute=1", "&mute=0")) : t.attr("src", i.replace("&mute=0", "&mute=1"));
                                }
                            } else {
                                const t = $(this.layersDom[e]).find("video").get(0);
                                (null != i && null != i.options && "1" == i.options.mute && t.muted) || (t.muted = !this.soundEnabled);
                            }
                        else if (t && "audio" == t.type) {
                            const t = this.layersComp[e];
                            null != t && t.mute(!this.soundEnabled);
                        }
                    }
                for (let e = 0; e < this.layersComp.length; e++) this.layersComp[e] && (null == this.soundEnabled ? (this.layersComp[e].muted = !1) : (this.layersComp[e].muted = !this.soundEnabled));
            }
        },
        userInteraction: function (e) {
            if (null != this.layers) {
                for (let t = 0; t < this.layers.length; t++)
                    if (this.layersDom[t]) {
                        const i = this.layers[t];
                        if (i && "video" == i.type)
                            if ("youtube" == i.media.type);
                            else {
                                const i = $(this.layersDom[t]).find("video").get(0),
                                    n = i.muted;
                                (i.muted = e), (i.muted = !e), (i.muted = n);
                            }
                        else if (i && "audio" == i.type) {
                            const i = this.layersComp[t];
                            null != i && (i.mute(e), i.mute(!e));
                        }
                    }
                for (let t = 0; t < this.layersComp.length; t++)
                    if (this.layersComp[t]) {
                        const i = this.layersComp[t].muted;
                        (this.layersComp[t].muted = e), (this.layersComp[t].muted = !e), (this.layersComp[t].muted = i);
                    }
            }
        },
        createPicture: function (e, t, i) {
            if (null == t.media || null == t.media.url) return;
            const n = t.media.url.substr(-4);
            if (!this.layersGif[i] && (".svg" == n || ".gif" == n))
                return void fetch(t.media.url)
                    .then((e) => e.blob())
                    .then((e) => URL.createObjectURL(e))
                    .then((n) => {
                        (this.layersGif[i] = n), this.createPicture(e, t, i);
                    });
            let o = t.media.url;
            !this.layersGif[i] || (".svg" != n && ".gif" != n) || ((o = this.layersGif[i]), e.addClass("layer-action-gif")),
                e.addClass("layer-action-pic"),
                "" == $.trim(t.action.target) && e.css("cursor", "auto"),
                e.append('<img src="' + o + '" draggable="false" class="layer-pic" />');
        },
        createVideoPlayer: function (e, t, i) {
            if (
                ($(e).append(
                    '<video playsinline="true" class="layer-vid" controlsList="nodownload" oncontextmenu="return false;" preload="metadata" ' +
                        (t.options && "1" == t.options.controls ? "controls " : 'onclick="this.paused ? this.play() : this.pause();" ') +
                        (i.muted ? "muted " : "") +
                        (i.autoplay ? "autoplay " : "") +
                        (t.options && t.options.loop ? "loop " : "") +
                        '> <source src="' +
                        t.url +
                        '#t=0.1" type="video/mp4"></video>'
                ),
                "1" == i.autoplay && "1" == i.once && (t.played = !0),
                t.options && ("2" == t.options.controls || "3" == t.options.controls))
            ) {
                let i = '<div class="layer-vid-controls-min" data-options="' + t.options.controls + '">';
                "2" == t.options.controls &&
                    (i +=
                        '<div class="layer-vid-playpause"><svg class="layer-vid-play" fill="white" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.90588 4.53682C6.50592 4.2998 6 4.58808 6 5.05299V18.947C6 19.4119 6.50592 19.7002 6.90588 19.4632L18.629 12.5162C19.0211 12.2838 19.0211 11.7162 18.629 11.4838L6.90588 4.53682Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="layer-vid-pause" style="display: none;" fill="white" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18.4V5.6C6 5.26863 6.26863 5 6.6 5H9.4C9.73137 5 10 5.26863 10 5.6V18.4C10 18.7314 9.73137 19 9.4 19H6.6C6.26863 19 6 18.7314 6 18.4Z" stroke="currentColor" stroke-width="1.5"/><path d="M14 18.4V5.6C14 5.26863 14.2686 5 14.6 5H17.4C17.7314 5 18 5.26863 18 5.6V18.4C18 18.7314 17.7314 19 17.4 19H14.6C14.2686 19 14 18.7314 14 18.4Z" stroke="currentColor" stroke-width="1.5"/></svg></div>'),
                    (i +=
                        '<div class="layer-vid-fullscreen"><svg class="layer-vid-fullscreen-btn" fill="white" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 16H4C2.89543 16 2 15.1046 2 14V6C2 4.89543 2.89543 4 4 4H15C16.1046 4 17 4.89543 17 6V9" stroke="currentColor" stroke-width="1.5"/><path d="M7 19V11C7 9.89543 7.89543 9 9 9H20C21.1046 9 22 9.89543 22 11V19C22 20.1046 21.1046 21 20 21H9C7.89543 21 7 20.1046 7 19Z" stroke="currentColor" stroke-width="1.5"/><path d="M10 12H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>'),
                    $(e).append(i);
                let n = $(e).find("video").get(0);
                $(n).addClass("vid-no-controls"),
                    $(document).off("mouseenter", "#" + $(e).attr("id") + " .layer-vid-controls-min"),
                    $(document).on("mouseenter", "#" + $(e).attr("id") + " .layer-vid-controls-min", function () {
                        n.paused || n.ended ? ($(e).find(".layer-vid-play").show(), $(e).find(".layer-vid-pause").hide()) : ($(e).find(".layer-vid-play").hide(), $(e).find(".layer-vid-pause").show());
                    }),
                    $(document).off("click", "#" + $(e).attr("id") + " .layer-vid-playpause"),
                    $(document).on("click", "#" + $(e).attr("id") + " .layer-vid-playpause", function () {
                        n.paused || n.ended ? (n.play(), $(e).find(".layer-vid-play").hide(), $(e).find(".layer-vid-pause").show()) : (n.pause(), $(e).find(".layer-vid-play").show(), $(e).find(".layer-vid-pause").hide());
                    }),
                    $(document).off("click", "#" + $(e).attr("id") + " .layer-vid-fullscreen"),
                    $(document).on("click", "#" + $(e).attr("id") + " .layer-vid-fullscreen", function () {
                        (n.controls = !1),
                            document.fullscreenElement
                                ? document.exitFullscreen()
                                : document.webkitFullscreenElement
                                ? document.webkitExitFullscreen()
                                : n.webkitRequestFullscreen
                                ? n.webkitRequestFullscreen()
                                : n.webkitEnterFullscreen
                                ? n.webkitEnterFullscreen()
                                : n.enterFullscreen
                                ? n.enterFullscreen()
                                : n.requestFullscreen(),
                            (n.controls = !1),
                            (n.paused || n.ended) && n.play();
                    }),
                    $(document).off("click", "#" + $(e).attr("id")),
                    $(document).on("click", "#" + $(e).attr("id"), function (e) {
                        document.fullscreenElement &&
                            (e.preventDefault(),
                            e.stopPropagation(),
                            document.exitFullscreen
                                ? document.exitFullscreen()
                                : document.webkitExitFullscreen
                                ? document.webkitExitFullscreen()
                                : document.mozCancelFullScreen
                                ? document.mozCancelFullScreen()
                                : document.msExitFullscreen && document.msExitFullscreen());
                    });
            }
            return $(e).find("video").get(0);
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    (hzflip.player = {
        createPlayer: function (e, t) {
            let i = this.getTemplateDefault(e, t),
                n = $(i).appendTo(e),
                o = n.find(".track > span"),
                s = n.find(".timer > span"),
                a = n.find(".duration > span"),
                l = n.find(".playBtn"),
                r = n.find(".play-show"),
                h = n.find(".pause-show"),
                d = n.find(".volumeOn"),
                c = n.find(".volumeOff"),
                p = n.find(".loading"),
                g = n.find(".progress"),
                u = n.find(".seeker");
            this.setStyle(e, t);
            var f = function (e) {
                (this.song = e), void 0 === this.song.howl && (this.song.howl = null), (o.innerHTML = e.title), $(o).attr("title", e.title);
            };
            f.prototype = {
                seekerDown: !1,
                lastSeekPos: null,
                load: function () {
                    $(p).show();
                    let e = this,
                        t = this.song,
                        i = t.howl;
                    i ||
                        (i = t.howl = new Howl({
                            src: [t.url],
                            html5: !0,
                            onplay: function () {
                                $(a).html(e.formatTime(Math.round(i.duration()))),
                                    requestAnimationFrame(e.step.bind(e)),
                                    $(r).hide(),
                                    $(h).show(),
                                    $(l).addClass("pauseBtn").removeClass("playBtn"),
                                    e.waveAnim("start"),
                                    $(e).trigger("player:play");
                            },
                            onload: function () {
                                $(p).hide(), $(a).html(e.formatTime(Math.round(i.duration()))), $(o).html(t.title), $(o).attr("title", t.title);
                            },
                            onend: function () {
                                $(r).show(), $(h).hide(), $(l).addClass("playBtn").removeClass("pauseBtn"), e.waveAnim("stop"), i.seek(0), e.seekView(0);
                            },
                            onpause: function () {},
                            onstop: function () {},
                            onseek: function () {
                                requestAnimationFrame(e.step.bind(e));
                            },
                        }));
                },
                unload: function () {
                    this.song.howl.unload();
                },
                play: function () {
                    const e = this.song.howl;
                    e.play(),
                        "loaded" === e.state()
                            ? ($(r).hide(), $(h).show(), $(l).removeClass("playBtn").addClass("pauseBtn"), this.waveAnim("start"))
                            : ($(r).show(), $(h).hide(), $(l).removeClass("pauseBtn").addClass("playBtn"), this.waveAnim("stop"));
                },
                pause: function () {
                    this.song.howl.pause(), $(r).show(), $(h).hide(), $(l).removeClass("pauseBtn").addClass("playBtn"), this.waveAnim("stop");
                },
                volume: function (e) {
                    Howler.volume(e);
                },
                mute: function (e) {
                    this.song.howl.mute(e);
                },
                seek: function (e) {
                    const t = this.song.howl;
                    t && t.seek(t.duration() * e);
                },
                seekView: function (e) {
                    const t = this;
                    if (t.song.howl) {
                        let i = t.song.howl.duration();
                        $(s).html(m.formatTime(Math.round(e * i))), $(g).css("width", Math.round(e * $(u).width() || 0) + "px");
                    }
                },
                step: function () {
                    const e = this,
                        t = e.song.howl;
                    let i = t.seek() || 0;
                    i > 0 && ($(s).html(e.formatTime(Math.round(i))), $(g).css("width", Math.round((i / t.duration()) * $(u).width() || 0) + "px")), t.playing() && requestAnimationFrame(e.step.bind(e));
                },
                formatTime: function (e) {
                    let t = Math.floor(e / 60) || 0,
                        i = e - 60 * t || 0;
                    return t + ":" + (i < 10 ? "0" : "") + i;
                },
                waveAnim: function (e) {
                    "wave" != this.song.style
                        ? "ocean" != this.song.style || ("start" == e ? $(n).removeClass("paused") : "stop" == e && $(n).addClass("paused"))
                        : "load" == e
                        ? (this.siriWave = new SiriWave({ container: $(n).find(".theme-siri").get(0), style: "ios", cover: !0, autostart: !1, color: this.formatColor(this.song.color2) || "#fff" }))
                        : "start" == e
                        ? (null == this.siriWave && this.waveAnim("load"), this.siriWave.start())
                        : "stop" == e && null != this.siriWave && this.siriWave.stop();
                },
                formatColor: function (e) {
                    if (null == e) return null;
                    var t,
                        i = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
                    function n(e) {
                        return isNaN(e) ? "00" : i[(e - (e % 16)) / 16] + i[e % 16];
                    }
                    return "#" + n((t = (t = e).match(/^rgba\((\d+),\s*(\d+),\s*(\d+)\,\s*(\d+)\)$/))[1]) + n(t[2]) + n(t[3]);
                },
            };
            let m = new f(t);
            return (
                m.load(),
                $(document).off("click", "#" + $(e).attr("id") + " .playBtn"),
                $(document).on("click", "#" + $(e).attr("id") + " .playBtn", function () {
                    m.play();
                }),
                $(document).off("click", "#" + $(e).attr("id") + " .pauseBtn"),
                $(document).on("click", "#" + $(e).attr("id") + " .pauseBtn", function () {
                    m.pause();
                }),
                $(document).off("click", "#" + $(e).attr("id") + " .volumeOn"),
                $(document).on("click", "#" + $(e).attr("id") + " .volumeOn", function () {
                    $(this).hide(), $(c).show(), m.mute(!0);
                }),
                $(document).off("click", "#" + $(e).attr("id") + " .volumeOff"),
                $(document).on("click", "#" + $(e).attr("id") + " .volumeOff", function () {
                    $(this).hide(), $(d).show(), m.mute(!1);
                }),
                $(document).off("mousedown touchstart", "#" + $(e).attr("id") + " .seeker"),
                $(document).on("mousedown touchstart", "#" + $(e).attr("id") + " .seeker", function () {
                    m.seekerDown = !0;
                }),
                $(document).off("mousemove touchmove", "#" + $(e).attr("id") + " .seeker"),
                $(document).on("mousemove touchmove", "#" + $(e).attr("id") + " .seeker", function (e) {
                    if ((0 === e.originalEvent.buttons && (m.seekerDown = !1), m.seekerDown)) {
                        let t = null != e.clientX ? e.clientX : e.changedTouches.length > 0 ? e.changedTouches[0].clientX : 0;
                        if (0 == t) return;
                        let i = Math.round(((t - $(u).offset().left) / ($(u).width() * heyzine.getZoomScale())) * 1e4) / 1e4;
                        m.seekView(i), (null == m.lastSeekPos || Math.abs(m.lastSeekPos - i) > 0.01) && (m.seek(i), (m.lastSeekPos = i));
                    }
                }),
                $(document).off("mouseup touchend click", "#" + $(e).attr("id") + " .seeker"),
                $(document).on("mouseup touchend click", "#" + $(e).attr("id") + " .seeker", function (e) {
                    let t = null != e.clientX ? e.clientX : e.changedTouches.length > 0 ? e.changedTouches[0].clientX : 0;
                    if (0 == t) return;
                    m.seekerDown = !1;
                    let i = Math.round(((t - $(u).offset().left) / ($(u).width() * heyzine.getZoomScale())) * 1e4) / 1e4;
                    m.seekView(i), m.seek(i), (m.lastSeekPos = i);
                }),
                $(document).off("hz.endresize", "#" + $(e).attr("id")),
                $(document).on("hz.endresize", "#" + $(e).attr("id"), function () {
                    $(e)
                        .find("[data-fit-text]")
                        .each(function (e, t) {
                            $.fitWidth("refit", t);
                        });
                }),
                "none" == t.style &&
                    ($(document).off("click", "#" + $(e).attr("id")),
                    $(document).on("click", "#" + $(e).attr("id"), function () {
                        m.song.howl.playing() ? m.pause() : m.play();
                    }),
                    $(document).off("dblclick", "#" + $(e).attr("id")),
                    $(document).on("dblclick", "#" + $(e).attr("id"), function () {
                        return m.song.howl.stop(), m.play(), !1;
                    })),
                m
            );
        },
        setPlayUi: function (e) {},
        getTemplateDefault: function (e, t) {
            let i = t.style;
            return "none" == i ? this.getThemeNone(e, t) : "btn" == i ? this.getThemeBtn(e, t) : "ocean" == i || "wave" == i ? this.getThemeVisualizer(e, t) : "min" == i ? this.getThemeBar(e, t) : void 0;
        },
        getThemeNone: function (e, t) {
            return $(e).addClass("layer-player-none"), '<div class="layer-player paused" data-disable-zoom="true"></div>';
        },
        getThemeBtn: function (e, t) {
            return (
                $(e).addClass("layer-player-btn"),
                '<div class="layer-player paused"><div class="controlsOuter playBtn"><div class="controlsInner"><div class="loading"></div><svg class="btn-player play-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z"/></svg><svg class="btn-player pause-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 8 4 C 6.895 4 6 4.895 6 6 L 6 24 C 6 25.105 6.895 26 8 26 L 10 26 C 11.105 26 12 25.105 12 24 L 12 6 C 12 4.895 11.105 4 10 4 L 8 4 z M 20 4 C 18.895 4 18 4.895 18 6 L 18 24 C 18 25.105 18.895 26 20 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 6 C 24 4.895 23.105 4 22 4 L 20 4 z"/></svg></div></div>'
            );
        },
        getThemeBar: function (e, t) {
            $(e).addClass("layer-player-min");
            let i = '<div class="layer-player paused">';
            return (
                (i += '<div class="title">'),
                (i += '<div class="controlsAlt playBtn">'),
                (i +=
                    '<svg class="btn-player play-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z"/></svg>'),
                (i +=
                    '<svg class="btn-player pause-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 8 4 C 6.895 4 6 4.895 6 6 L 6 24 C 6 25.105 6.895 26 8 26 L 10 26 C 11.105 26 12 25.105 12 24 L 12 6 C 12 4.895 11.105 4 10 4 L 8 4 z M 20 4 C 18.895 4 18 4.895 18 6 L 18 24 C 18 25.105 18.895 26 20 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 6 C 24 4.895 23.105 4 22 4 L 20 4 z"/></svg>'),
                (i += "</div>"),
                (i += '<div class="timer"><span data-fit-text>0:00</span></div>'),
                (i += '<div class="track"><span data-fit-text></span></div>'),
                (i += '<div class="duration"><span data-fit-text>0:00</span></div>'),
                (i += "</div>"),
                (i += "<div></div>"),
                (i += '<div class="seeker"></div>'),
                (i += '<div class="progress"></div>'),
                (i += "</div>"),
                '<div class="layer-player paused"><div class="title"><div class="controlsAlt playBtn"><svg class="btn-player play-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z"/></svg><svg class="btn-player pause-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 8 4 C 6.895 4 6 4.895 6 6 L 6 24 C 6 25.105 6.895 26 8 26 L 10 26 C 11.105 26 12 25.105 12 24 L 12 6 C 12 4.895 11.105 4 10 4 L 8 4 z M 20 4 C 18.895 4 18 4.895 18 6 L 18 24 C 18 25.105 18.895 26 20 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 6 C 24 4.895 23.105 4 22 4 L 20 4 z"/></svg></div><div class="timer"><span data-fit-text>0:00</span></div><div class="track"><span data-fit-text></span></div><div class="duration"><span data-fit-text>0:00</span></div></div><div></div><div class="seeker"></div><div class="progress"></div></div>'
            );
        },
        getThemeVisualizer: function (e, t) {
            let i = t.style,
                n = '<div class="layer-player paused">';
            return (
                (n += '<div class="title">'),
                (n += '<div class="timer"><span data-fit-text>0:00</span></div>'),
                (n += '<div class="track"><span data-fit-text></span></div>'),
                (n += '<div class="duration"><span data-fit-text>0:00</span></div>'),
                (n += "</div>"),
                "ocean" == i ? (n += '<div class="theme-player theme-ocean"><div class="theme-back-cont"><div class="wave"></div><div class="wave"></div></div></div>') : "wave" == i && (n += '<div class="theme-siri"></div>'),
                (n += '<div class="seeker"></div>'),
                (n += '<div class="controlsOuter">'),
                (n += '<div class="controlsInner playBtn">'),
                (n += '<div class="loading"></div>'),
                (n +=
                    '<svg class="btn-player play-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z"/></svg>'),
                (n +=
                    '<svg class="btn-player pause-show" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 8 4 C 6.895 4 6 4.895 6 6 L 6 24 C 6 25.105 6.895 26 8 26 L 10 26 C 11.105 26 12 25.105 12 24 L 12 6 C 12 4.895 11.105 4 10 4 L 8 4 z M 20 4 C 18.895 4 18 4.895 18 6 L 18 24 C 18 25.105 18.895 26 20 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 6 C 24 4.895 23.105 4 22 4 L 20 4 z"/></svg>'),
                (n += "</div>"),
                (n +=
                    '<svg class="btn-player volumeBtn volumeOn" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="1 1 21 21" width="24px" height="24px">    <path d="M 10.294922 3.9882812 C 10.122922 3.9882812 9.9476875 4.0533125 9.8046875 4.1953125 L 5 9 L 3 9 C 1.895 9 1 9.895 1 11 L 1 13 C 1 14.105 1.895 15 3 15 L 5 15 L 9.8046875 19.804688 C 9.9476875 19.947688 10.122922 20.011719 10.294922 20.011719 C 10.654922 20.011719 11 19.732547 11 19.310547 L 11 4.6894531 C 11 4.2674531 10.654922 3.9882812 10.294922 3.9882812 z M 15.939453 6.0390625 A 1.0001 1.0001 0 0 0 15.242188 7.7578125 C 17.594098 10.109723 17.593888 13.891346 15.242188 16.242188 A 1.0001 1.0001 0 1 0 16.65625 17.65625 C 19.772549 14.541091 19.772339 9.4598394 16.65625 6.34375 A 1.0001 1.0001 0 0 0 15.939453 6.0390625 z M 13.111328 8.8691406 A 1.0001 1.0001 0 0 0 12.414062 10.585938 C 13.204152 11.376027 13.204152 12.623974 12.414062 13.414062 A 1.0005843 1.0005843 0 1 0 13.828125 14.830078 C 15.382035 13.276168 15.382035 10.725785 13.828125 9.171875 A 1.0001 1.0001 0 0 0 13.111328 8.8691406 z"/></svg>'),
                (n +=
                    '<svg class="btn-player volumeBtn volumeOff" style="display: none;" viewBox="2 1 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"><path d="M 11.294922 3.9882812 C 11.122922 3.9882812 10.947687 4.0533125 10.804688 4.1953125 L 6 9 L 4 9 C 2.895 9 2 9.895 2 11 L 2 13 C 2 14.105 2.895 15 4 15 L 6 15 L 10.804688 19.804688 C 10.947688 19.947688 11.122922 20.011719 11.294922 20.011719 C 11.654922 20.011719 12 19.732547 12 19.310547 L 12 4.6894531 C 12 4.2674531 11.654922 3.9882812 11.294922 3.9882812 z M 14.990234 7.9902344 A 1.0001 1.0001 0 0 0 14.292969 9.7070312 L 16.585938 12 L 14.292969 14.292969 A 1.0001 1.0001 0 1 0 15.707031 15.707031 L 18 13.414062 L 20.292969 15.707031 A 1.0001 1.0001 0 1 0 21.707031 14.292969 L 19.414062 12 L 21.707031 9.7070312 A 1.0001 1.0001 0 0 0 20.980469 7.9902344 A 1.0001 1.0001 0 0 0 20.292969 8.2929688 L 18 10.585938 L 15.707031 8.2929688 A 1.0001 1.0001 0 0 0 14.990234 7.9902344 z"/></svg>'),
                (n += "</div>"),
                (n += '<div class="progress"></div>'),
                (n += "</div>"),
                n
            );
        },
        setStyle: function (e, t) {
            t.color1 && ($(e).css("background-color", t.color1), $(e).find(".title").css("background-color", t.color1), $(e).find(".controlsOuter").css("background-color", t.color1)),
                t.color2 && ($(e).find(".title").css("color", t.color2), $(e).find(".btn-player").css("color", t.color2)),
                $.fitWidth();
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.layers && (hzflip.layers = {}),
    (hzflip.layers.text = {
        page: 0,
        css: { left: 0, right: 0, top: 0, bottom: 0, width: "200px", height: "100px", zIndex: 100 },
        content: "text",
        target: "page",
        layer: null,
        render: function (e, t, i) {
            null != this.layer && this.layer.remove(), (this.layer = $('<div class="layer-text"></div>')), this.layer.append(this.content), this.layer.css(this.css), t.append(this.layer);
        },
        renderViewport: function (e) {
            const t = $('<div class="layer-text"></div>');
            t.append(this.content), t.css(this.css), e.append(t);
        },
        destroyViewport: function () {
            null != this.layer && this.layer.remove();
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.layers && (hzflip.layers = {}),
    (hzflip.layers.popup = {
        activeLayer: null,
        show: function (e, t) {
            if (((this.activeLayer = e), "tooltip" == e.action.extra.inline)) {
                this.createTooltip(e).fadeIn("fast");
            } else {
                this.createModal(e).fadeIn("fast");
            }
            null != t && (t.preventDefault(), t.stopPropagation());
        },
        closeAll: function (e) {
            this.activeLayer = null;
            (heyzine.layers.isEditMode && !e) ||
                $(".layer-popup").each(function () {
                    $(this).is(":visible") &&
                        $(this).fadeOut("fast", () => {
                            $(this).remove();
                        });
                });
        },
        resizeViewport: function () {
            if (null != this.activeLayer) {
                let e = this.activeLayer;
                setTimeout(() => {
                    "tooltip" == e.action.extra.inline ? this.repositionTooltip(e) : this.repositionModal(e);
                }, 100);
            }
        },
        createTooltip: function (e) {
            const t = heyzine.layers.isEditMode,
                i = $('<div class="layer-popup layer-popup-' + e.id + '">'),
                n = $('<div class="layer-popup-content">');
            let o = t ? $("#" + e.id) : $("#layer" + e.id);
            $("#magazineViewport").one("click", (e) => {
                this.closeAll();
            }),
                document.documentElement.style.setProperty("--popup-color", $("#pnlControls").css("background-color"));
            let s = "45%";
            i.appendTo($("#canvas")), (s = Math.round((45 * $(".page-wrapper[page=" + e.page + "]").width()) / 100) + "px"), i.addClass("layer-popup-float").removeClass("layer-popup-float-bottom");
            let a = o.get(0).style.left;
            return (
                t || (a = Math.round($(o).offset().left - $("#canvas").offset().left) + "px"),
                i.css({ width: s, height: "auto", left: a, top: o.get(0).style.top, bottom: "auto" }),
                n.appendTo(i),
                this.setPositionFloat(i, o),
                this.createContent(e)
                    .then((e) => {
                        e.appendTo(n), this.setPositionFloat(i, o);
                    })
                    .catch((e) => {
                        console.log(e);
                    }),
                i
            );
        },
        repositionTooltip: function (e) {
            const t = heyzine.layers.isEditMode,
                i = $(".layer-popup-" + e.id);
            let n = t ? $("#" + e.id) : $("#layer" + e.id),
                o = "45%";
            o = Math.round((45 * $(".page-wrapper[page=" + e.page + "]").width()) / 100) + "px";
            let s = n.get(0).style.left;
            t || (s = Math.round($(n).offset().left - $("#canvas").offset().left) + "px"), i.css({ width: o, height: "auto", left: s, top: n.get(0).style.top, bottom: "auto" }), this.setPositionFloat(i, n);
        },
        createModal: function (e) {
            heyzine.layers.isEditMode;
            const t = $('<div class="layer-popup layer-popup-' + e.id + '">'),
                i = $('<div class="layer-popup-content">');
            return (
                t.css("background-color", $("#pnlControls").css("background-color")),
                t.appendTo("#canvas"),
                i.appendTo(t),
                t.on("click", function (e) {
                    const i = $(".layer-popup-video");
                    i.is(e.target) ||
                        0 !== i.has(e.target).length ||
                        t.fadeOut("fast", function () {
                            t.remove();
                        }),
                        e.preventDefault(),
                        e.stopPropagation();
                }),
                t.on("mousemove", function (e) {
                    e.preventDefault(), e.stopPropagation();
                }),
                this.createContent(e)
                    .then((n) => {
                        this.createCloseButton(e, n, i), n.appendTo(i), this.setPositionModal(t);
                    })
                    .catch((e) => {
                        console.log(e);
                    }),
                t
            );
        },
        repositionModal: function (e) {
            heyzine.layers.isEditMode;
            const t = $(".layer-popup-" + e.id);
            this.setPositionModal(t);
        },
        createContent: function (e) {
            return new Promise((t, i) => {
                let n = null;
                if ("picture" == e.action.subtype)
                    (n = $('<img src="' + e.action.target + '" class="layer-popup-picture layer-popup-el" />')),
                        $(n).on("load", () => {
                            t(n);
                        });
                else if ("web" == e.action.subtype) {
                    let i = 1 == e.action.extra.noscroll ? 'scrolling="no"' : "";
                    (n = $('<iframe class="layer-popup-web layer-popup-el" allowfullscreen ' + i + ' src="' + e.action.target + '"></iframe>')), t(n);
                } else if ("video" == e.action.subtype) {
                    (n = $('<div class="layer-popup-video layer-popup-el">')), e.action.extra && "4" == e.action.extra.controls && n.addClass("layer-controls-disabled");
                    const i = heyzine.layers.createVideoPlayer(n, { url: e.action.target, options: e.action.extra }, { muted: e.action.extra && "1" == e.action.extra.mute, autoplay: !1 });
                    $(i).on("loadedmetadata", function () {
                        e.action.extra && "1" == e.action.extra.autoplay && this.play(), t(n);
                    });
                } else
                    "youtube" == e.action.subtype
                        ? ((n = $('<div class="layer-popup-video layer-popup-el">')),
                          e.action.extra && "4" == e.action.extra.controls && n.addClass("layer-controls-disabled"),
                          n.append('<iframe class="layer-vid" allow="autoplay" allowfullscreen src="' + e.action.target + '"></iframe>'),
                          t(n))
                        : i();
            });
        },
        createCloseButton: function (e, t, i) {
            "youtube" == e.action.subtype || "video" == e.action.subtype
                ? setTimeout(() => {
                      const e = $(
                          '<svg class="layer-popup-close" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" style=" fill:#fff;"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path></svg>'
                      );
                      e.css({ fill: $("#pnlControls").css("background-color"), left: $(t).offset().left - $("#canvas").offset().left + $(t).width() - 22, top: $(t).offset().top - $("#canvas").offset().top - 20 - 11 }), e.appendTo(i);
                  }, 100)
                : $(t).on("load", function () {
                      const e = $(
                          '<svg class="layer-popup-close" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" style=" fill:#fff;"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path></svg>'
                      );
                      e.css({ fill: $("#pnlControls").css("background-color"), left: $(t).offset().left - $("#canvas").offset().left + $(t).width() - 22, top: $(t).offset().top - $("#canvas").offset().top - 20 - 11 }), e.appendTo(i);
                  });
        },
        setPositionFloat: function (e, t) {
            e.css({ "margin-left": t.width() / 2 - $(e).width() / 2, "margin-top": Math.round(-$(e).height() - 25) + "px" }),
                e.offset().top < $("#magazineViewport").offset().top && (e.css({ "margin-top": t.height() + 15 }), e.addClass("layer-popup-float-bottom")),
                0 != $(e).find(".layer-popup-video").length && 0 != $(e).find("video").length && $(e).find(".layer-vid").css("float", "left");
        },
        setPositionModal: function (e) {
            const t = $(e).find(".layer-popup-el");
            if (
                ($(e)
                    .find(".layer-popup-close")
                    .css({ fill: $("#pnlControls").css("background-color"), left: $(t).offset().left - $("#canvas").offset().left + $(t).width() - 22, top: $(t).offset().top - $("#canvas").offset().top - 20 - 11 }),
                0 == $(e).find(".layer-popup-video").length || 0 == $(e).find("video").length)
            )
                return;
            let i = $(".layer-popup-content").width(),
                n = $(".layer-popup-content").height();
            const o = { width: $(e).find("video").get(0).videoWidth, height: $(e).find("video").get(0).videoHeight, boundWidth: i, boundHeight: n },
                s = { width: o.width, height: o.height };
            if (s.width > o.boundWidth || s.height > o.boundHeight) {
                var a = s.width / s.height;
                o.boundWidth / a > o.boundHeight && o.boundHeight * a <= o.boundWidth ? ((s.width = Math.round(o.boundHeight * a)), (s.height = o.boundHeight)) : ((s.width = o.boundWidth), (s.height = Math.round(o.boundWidth / a)));
            }
            $(e).find(".layer-popup-video").css({ width: s.width, height: s.height });
        },
    }),
    (hzpdf = {
        pdfjsLib: null,
        pdf: null,
        renderQueue: [],
        loadingPages: [],
        renderTasks: [],
        fixedAspectRation: !1,
        load: (e, t) => (
            (heyzine.config = t),
            new Promise((t, i) => {
                (heyzine.pdfjsLib = window.pdfjsLib), (heyzine.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER);
                let n = { url: e, cMapUrl: PDFJS_CMAP_URL, cMapPacked: !0 };
                if (heyzine.config.size > 15e6) {
                    let t = 4 * Math.ceil(heyzine.config.size / heyzine.config.num_pages);
                    t < 1e7 && heyzine.config.num_pages > 100 ? (t = 1e7) : t < 1048576 && (t = 1048576), (n = { url: e, disableStream: !0, disableAutoFetch: !0, rangeChunkSize: t, cMapUrl: PDFJS_CMAP_URL, cMapPacked: !0 });
                }
                var o = heyzine.pdfjsLib.getDocument(n);
                "undefined" != typeof hzp &&
                    (o.onProgress = function (e) {
                        0 == hzp.val && null != e.total && e.total > 0 && hzp.check(heyzine.config.width, heyzine.config.height, heyzine.config.num_pages, e.total, heyzine.config.id);
                    }),
                    o.promise.then(
                        (e) => {
                            (heyzine.pdf = e), t(this.pdf);
                        },
                        (e) => {
                            console.error(e), i(e);
                        }
                    );
            })
        ),
        processRenderQueue: function (e, t, i, n) {
            this.renderQueue.length > 0
                ? (this.renderQueue.push({ numPage: e, page: t, renderContext: i, resolve: n }), this.sortRenderQueue())
                : (this.renderQueue.push({ numPage: e, page: t, renderContext: i, resolve: n }), this.processRender(e, t, i, n));
        },
        processRender: function (e, t, i, n) {
            console.log(Math.round(new Date().getTime() / 1e3) + " startrender " + e), heyzine.progressBar("progress", { inc: 10, abs: 40 });
            var o = t.render(i);
            (o.onContinue = function (e) {
                e();
            }),
                this.renderTasks.push(o),
                o.promise
                    .then(() => {
                        (this.renderQueue = this.renderQueue.filter((e) => e.resolve != n)),
                            console.log(Math.round(new Date().getTime() / 1e3) + " endrender " + e),
                            heyzine.progressBar("progress", { inc: 10, abs: 50 }),
                            n(i),
                            this.renderQueue.length > 0 && (this.sortRenderQueue(), this.processRender(this.renderQueue[0].numPage, this.renderQueue[0].page, this.renderQueue[0].renderContext, this.renderQueue[0].resolve));
                    })
                    .catch(() => {
                        console.log("render canceled");
                    });
        },
        resetRender: function () {
            console.log("reset render");
            for (let e = 0; e < this.renderTasks.length; e++) this.renderTasks[e].cancel();
            (this.renderTasks.length = 0), this.renderQueue.length > 0 && (this.sortRenderQueue(), this.processRender(this.renderQueue[0].numPage, this.renderQueue[0].page, this.renderQueue[0].renderContext, this.renderQueue[0].resolve));
        },
        sortRenderQueue: function () {
            this.renderQueue.sort((e, t) => {
                const i = heyzine.getCurrentPage() - 1;
                return (e.numPage < i && t.numPage < i) || (e.numPage > i && t.numPage > i) ? e.numPage - t.numPage : e.numPage >= i && t.numPage < i ? -1 : e.numPage < i && t.numPage >= i ? 1 : e.numPage - t.numPage;
            });
        },
        turn: function (e, t, i) {
            this.loadPage(e, t), this.loadPage(e + 1, i);
        },
        loadPageView: function (e, t, i) {
            heyzine.config;
            const n = $("<canvas>");
            return new Promise((o, s) => {
                this.loadingPages.filter((t) => t.page == e && t.size == i).length > 0
                    ? s()
                    : (this.loadingPages.push({ page: e, size: i }),
                      this.loadPageUrl(e, n, i).then((n) => {
                          if ((heyzine.helpers.loading.hide(t), $(t).find(".page-img-content").length <= 0)) {
                              let i = new Image();
                              i.src = n;
                              let o = "width: 100%; height: 100%; object-fit: contain; ";
                              (i.style = o), $(i).addClass("page-img-content"), $(i).attr("draggable", !1), $(i).appendTo(t), heyzine.coverPagesClass(i, e);
                          } else $(t).find(".page-img-content").attr("src", n);
                          if (scaler.isIos() && "MAGAZINE" == heyzine.viewer.viewerName) {
                              const e = $(t).find(".page-img-content");
                              let i = "";
                              "album" != heyzine.design.data.type && (i += "translate3d(0,0,0) "),
                                  heyzine.controls.zoom.getScale() > 1
                                      ? (e.css("width", "calc(100% * " + heyzine.controls.zoom.getScale() + ")"),
                                        e.css("height", "calc(100% * " + heyzine.controls.zoom.getScale() + ")"),
                                        (i += "scale(" + 1 / heyzine.controls.zoom.getScale() + ")"),
                                        e.css("transform", i),
                                        e.css("transform-origin", "top left"))
                                      : (e.css("width", "100%"), e.css("height", "100%"), e.css("transform", i), e.css("transform-origin", ""));
                          }
                          (this.loadingPages = this.loadingPages.filter((t) => !(t.page == e && t.size == i))), o(t);
                      }));
            });
        },
        loadPageUrl: function (e, t, i) {
            return new Promise((n, o) => {
                heyzine.progressBar("progress", { inc: 10, abs: 10 });
                let s = heyzine.getDesiredCanvasSize(i),
                    a = heyzine.getPageCache(e, i, s);
                null == a
                    ? heyzine.loadPage(e, t.get(0), i).then((o) => {
                          let s = o.canvasContext.canvas.width;
                          heyzine.progressBar("progress", { inc: 20, abs: 70 }),
                              $(t)
                                  .get(0)
                                  .toBlob(function (o) {
                                      heyzine.progressBar("progress", { inc: 15, abs: 85 });
                                      let a = URL.createObjectURL(o);
                                      heyzine.setPageCache(e, i, s, a);
                                      let l = $(t).get(0);
                                      if (l) {
                                          (l.width = 1), (l.height = 1);
                                          const e = l.getContext("2d");
                                          e && e.clearRect(0, 0, 1, 1);
                                      }
                                      n(a);
                                  });
                      })
                    : n(a);
            });
        },
        loadViewport: function (e, t, i) {
            const n = null == i ? "normal" : i,
                o = parseInt(t),
                s = heyzine.getDesiredCanvasSize(n);
            if (null != heyzine.viewportScales[o] && null != heyzine.viewportScales[o][s]) return heyzine.viewportScales[o][s];
            let a = e.getViewport({ scale: 1 }),
                l = s / a.width;
            if ((scaler.isIos() && l <= 1 && (l = 1.5), scaler.isIos() && a.width * l * a.height * l > 16777215)) {
                (l = Math.sqrt(16777215 / (a.height / a.width)) / a.width), (a = e.getViewport({ scale: l }));
            } else a = e.getViewport({ scale: l });
            return null == heyzine.viewportScales[o] && (heyzine.viewportScales[o] = []), (heyzine.viewportScales[o][s] = a), a;
        },
        loadPage: function (e, t, i) {
            let n = this;
            return new Promise((o, s) => {
                console.log(Math.round(new Date().getTime() / 1e3) + " loadpage " + e),
                    heyzine.pdf
                        .getPage(e)
                        .then(function (s) {
                            console.log(Math.round(new Date().getTime() / 1e3) + " loadpage end " + e), heyzine.progressBar("progress", { inc: 20, abs: 30 });
                            let a = n.loadViewport(s, e, i);
                            var l = t.getContext("2d", { willReadFrequently: !0 });
                            a.width - Math.trunc(a.width) > 0.9999 || a.height - Math.trunc(a.height) > 0.9999
                                ? ((t.height = Math.round(a.height)), (t.width = Math.round(a.width)))
                                : ((t.height = Math.trunc(a.height)), (t.width = Math.trunc(a.width))),
                                n.fixedAspectRatio || ((heyzine.renderAspectRatio = a.height / a.width), heyzine.resizeViewport(), (n.fixedAspectRatio = !0));
                            var r = { canvasContext: l, viewport: a, loadingPage: e };
                            heyzine.processRenderQueue(e, s, r, o);
                        })
                        .catch((e) => {
                            console.log(e), s(e);
                        });
            });
        },
        loadImage: (e, t) =>
            new Promise((t, i) => {
                function n() {
                    heyzine.config.toc = !1;
                    const n = $("<canvas>");
                    heyzine.loadPage(e, n.get(0), 253.6).then(() => {
                        var e = new Image();
                        (e.src = n.get(0).toDataURL()),
                            (e.style = "height: 100%;"),
                            (e.onload = () => {
                                t(e);
                            }),
                            (e.onerror = () => {
                                i(e);
                            });
                    });
                }
                if (!1 === heyzine.config.toc || null == heyzine.toc) return void n();
                const o = new Image();
                (o.onload = function () {
                    const i = (130 / o.naturalHeight) * 400;
                    (o.style = "width: " + i + "px; object-position:-" + i * (e - 1) + "px"), (heyzine.config.toc = !0), t(o);
                }),
                    (o.onerror = function () {
                        n();
                    }),
                    (o.src = heyzine.toc.src);
            }),
        loadPageThumbnails: (e, t, i) =>
            new Promise((n, o) => {
                var s = null == t ? "full" : "left";
                heyzine.loadImage(e, s).then((e) => {
                    null != t
                        ? heyzine.loadImage(t, "right").then((t) => {
                              $(i).html(""), $(e).appendTo(i), $(t).appendTo(i), n();
                          })
                        : ($(i).html(""), $(e).appendTo(i), n());
                });
            }),
        getDesiredCanvasSize: (e) => {
            let t = $(".page-wrapper").width();
            0 == t && (t = $(document).width() / 2 > 300 ? $(document).width() / 2 : 300);
            let i = t;
            return (
                i <= 800 && (i = 3 * t),
                void 0 !== e && (i = "large" == e ? 3 * t * window.devicePixelRatio : "xlarge" == e ? 6 * t * window.devicePixelRatio : "normal" == e ? t * window.devicePixelRatio : "small" == e ? (t / 1.5) * window.devicePixelRatio : e),
                (i = Math.trunc(i)),
                i
            );
        },
    }),
    (hzimg = {
        pictures: [],
        walls: [],
        load: (e, t) => (
            (heyzine.config = t),
            new Promise((t, i) => {
                $.getJSON(e, function (e) {
                    (heyzine.pictures = e), t("");
                });
            })
        ),
        loadPageView: (e, t, i) => {
            heyzine.config;
            heyzine.helpers.loading.hide(t), $(t).html("");
            const n = $('<div class="hz-grid" id="hz-grid-' + e + '"></div>');
            for (let e = 0; e < heyzine.pictures.length; e++)
                e < 2
                    ? n.append('<div class="hz-grid-item" style="width: 160px;"><img src="' + heyzine.pictures[e].url + '" /></div>')
                    : n.append('<div class="hz-grid-item" style="width: 80px;"><img src="' + heyzine.pictures[e].url + '" /></div>');
            n.appendTo(t);
            var o = new Freewall(n);
            return (
                o.reset({
                    selector: ".hz-grid-item",
                    animate: !1,
                    draggable: !1,
                    cellW: 80,
                    cellH: "auto",
                    onResize: function () {
                        o.fitZone(300, 450);
                    },
                }),
                heyzine.walls.push(o),
                o.fitZone(300, 450),
                o.container.find("img").load(function () {
                    o.fitZone(300, 450);
                }),
                heyzine.coverPagesClass(t, e),
                new Promise((e, t) => {
                    e("");
                })
            );
        },
        loadPageThumbnails: (e, t, i) => {},
    }),
    (hzprev = {
        pictureUrl: null,
        load: function (e, t) {
            return (
                (heyzine.config = t),
                (this.pictureUrl = e),
                new Promise((e, t) => {
                    e();
                })
            );
        },
        loadPageView: function (e, t, i) {
            return new Promise((i, n) => {
                heyzine.helpers.loading.hide(t);
                var o = new Image();
                (o.src = this.pictureUrl), (o.style = "width: 100%;"), (o.alt = "Flipbook cover"), $(o).appendTo(t), $(t).closest(".page-wrapper").css("box-shadow", "0 0 20px 2px lightgray"), heyzine.coverPagesClass(o, e), i(t);
            });
        },
        loadPageThumbnails: (e, t, i) => {},
        resizeViewport: () => {},
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.helpers && (hzflip.helpers = {}),
    (hzflip.helpers.loading = {
        show: (e, t, i) => {
            const n =
                '<div class="loader loader-1-circle">   <div class="loader-1-circle1 loader-1-child"></div>      <div class="loader-1-circle2 loader-1-child"></div>      <div class="loader-1-circle3 loader-1-child"></div>      <div class="loader-1-circle4 loader-1-child"></div>      <div class="loader-1-circle5 loader-1-child"></div>      <div class="loader-1-circle6 loader-1-child"></div>      <div class="loader-1-circle7 loader-1-child"></div>      <div class="loader-1-circle8 loader-1-child"></div>      <div class="loader-1-circle9 loader-1-child"></div>      <div class="loader-1-circle10 loader-1-child"></div>     <div class="loader-1-circle11 loader-1-child"></div>     <div class="loader-1-circle12 loader-1-child"></div>   </div> ';
            if (null == e || null == t) return $(".page-wrapper .page").append('<div class="gradient"></div>' + n), void $(".page-wrapper img").css("opacity", "0.5");
            if ("crisp" == e && null != t) {
                t.html('<div class="gradient"></div>'), t.append('<div class="loader-preview-cont"></div>');
                const e = t.find(".loader-preview-cont");
                return e.append(heyzine.thumbnail), e.append(n), void t.find(".loader-preview").addClass("loader-preview-effect-done").attr("draggable", "false");
            }
            if ("blur" == e && null != t)
                if (null != heyzine.toc) {
                    const e = new Image();
                    (e.src = null == i ? heyzine.thumbnail.src : heyzine.toc.src), e.classList.add("loader-preview"), e.classList.add("no-drag"), t.html('<div class="gradient"></div>'), t.append('<div class="loader-preview-cont"></div>');
                    const o = t.find(".loader-preview-cont");
                    if ((o.append(e), o.append(n), null != i)) {
                        const e = (100 / (heyzine.config.num_pages - 1)) * (i - 1);
                        t.find(".loader-preview")
                            .attr("draggable", "false")
                            .css("object-position", e + "%");
                    }
                } else t.html('<div class="gradient">' + n + "</div>");
        },
        hide: function (e) {
            return new Promise((t, i) => {
                null == e ? $("#magazineViewport").find(".loader").remove() : e.find(".loader").remove(), heyzine.thumbnail && $(heyzine.thumbnail).css("opacity", 1);
                const n = $(e).find(".loader-preview-cont");
                n.length > 0
                    ? (n.find(".loader-preview").addClass("loader-preview-effect-done"),
                      setTimeout(() => {
                          n.remove(), t();
                      }, 200))
                    : t();
            });
        },
        startEffect: function (e, t) {},
        showViewportLoader: function () {
            let e = heyzine.getBound();
            this.show("blur", $(".magazine-viewport-loader")),
                this.startEffect([".magazine-viewport-loader"], "appear"),
                "width" == e.fit
                    ? (e.isSingle ? $(".loader-preview").css({ width: "100%", height: "auto", "object-fit": "contain" }) : $(".loader-preview").css({ width: "50%", height: "auto", "object-fit": "contain" }),
                      $(".magazine-viewport-loader").fadeIn("fast"))
                    : ($(".loader-preview").css({ width: "auto", height: "100%", "object-fit": "contain" }), $(".magazine-viewport-loader").fadeIn("fast"));
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.helpers && (hzflip.helpers = {}),
    (hzflip.helpers.parser = {
        isEmail: function (e) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e);
        },
        isNumeric: (e) => "string" == typeof e && !isNaN(e) && !isNaN(parseFloat(e)),
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.viewers && (hzflip.viewers = {}),
    (hzflip.viewers.magazine = {
        viewerName: "MAGAZINE",
        config: {},
        design: {},
        isZoomedIn: !1,
        isEditMode: !1,
        loadedPages: [],
        duration: 1e3,
        prevPage: 0,
        peelTurning: !1,
        startDisabled: !1,
        tmrDepthRight: null,
        tmrDepthLeft: null,
        render: (e, t) => {
            $(".logo-backs2").remove(),
                $("#pnlControls .slider-toolbar").remove(),
                $("#magazineViewport").html(""),
                $("#magazineViewport").append($("#tplMagazine").html()),
                $("#magazineViewport").css("width", "auto"),
                $("#magazineViewport").css("height", "auto"),
                $("#canvas").removeClass("canvas-center"),
                $("#canvas").fadeIn(1e3);
            var i = $(".magazine"),
                n = hzflip.viewers.magazine;
            (n.config = e),
                (n.design = t),
                null != t &&
                    ("book" == t.type
                        ? $(".magazine-viewport").addClass("magazine-book")
                        : "album" == t.type
                        ? $(".magazine-viewport").addClass("magazine-album")
                        : "notebook" == t.type && $(".magazine-viewport").addClass("magazine-book").addClass("round-pages"),
                    "1" == t.rtl ? $(".magazine").attr("dir", "rtl") : $(".magazine").removeAttr("dir"),
                    1 == t.show_double
                        ? ($(".magazine-viewport").removeClass("page-single"), $(".magazine-viewport").addClass("page-double"))
                        : 2 == n.design.show_double
                        ? ($(".magazine-viewport").removeClass("page-double"), $(".magazine-viewport").addClass("page-single"))
                        : ($(".magazine-viewport").removeClass("page-single"), $(".magazine-viewport").removeClass("page-double"))),
                0 != i.width() && 0 != i.height()
                    ? (i.turn({
                          width: e.width * e.isize * 2,
                          height: e.height * e.isize,
                          duration: n.duration,
                          gradients: e.num_pages > 1,
                          autoCenter: !0,
                          elevation: 200,
                          pages: e.num_pages,
                          display: 2 == n.design.show_double ? "single" : "double",
                          when: {
                              start: function (e, t, i) {
                                  if ("undefined" != typeof heyzinea && null != heyzinea.api && null != heyzinea.api.flipbook && null != heyzinea.api.flipbook.options && null != heyzinea.api.flipbook.options.disableCorners) {
                                      const t = heyzinea.api.flipbook.options.disableCorners;
                                      for (let n = 0; n < t.length; n++) if (i == t[n]) return (this.startDisabled = !0), void e.preventDefault();
                                  }
                                  if (n.isEditMode || n.isZoomedIn) return (this.startDisabled = !0), void e.preventDefault();
                                  (this.startDisabled = !1), heyzine.turning();
                              },
                              end: function (e, t, i) {
                                  heyzine.turned(t.page, "end");
                              },
                              peelStart: function (e, t, i) {
                                  this.peelTurning || this.startDisabled || heyzine.peelStart(t);
                              },
                              peelEnd: function (e, t, i) {
                                  this.peelTurning || this.startDisabled || heyzine.peelEnd(t, i);
                              },
                              turning: function (e, t, i) {
                                  null != t && (this.peelTurning = !0), heyzine.turning(t), n.adjustPageDepth(t), $(".page.hard").closest(".page-wrapper").addClass("hard-page-wrapper");
                              },
                              turned: function (t, i, o) {
                                  (this.peelTurning = !1), $(this).turn("center"), $(".page.hard").closest(".page-wrapper").addClass("hard-page-wrapper"), heyzine.helpers.loading.startEffect(), heyzine.turned(i);
                                  for (let t = 4; t < 8; t++) i + t <= e.num_pages && !n.isPageLoaded(i + t) && (n.addPage(i + t, $(this)), n.loadedPages.push(i + t));
                              },
                              missing: function (e, t) {
                                  for (var i = 0; i < t.length; i++) n.addPage(t[i], $(this)), n.loadedPages.push(t[i]);
                              },
                          },
                      }),
                      e.num_pages <= 1 && $("#magazineViewport .shadow").remove(),
                      $(".magazine").addClass("animated"),
                      n.resizeViewport())
                    : setTimeout(() => {
                          hzflip.viewers.magazine.render(e, t);
                      }, 10);
        },
        goToPage: (e) => {
            $(".magazine").turn("is") && (isNaN(parseInt(e)) ? $(".magazine").turn(e) : $(".magazine").turn("page", e));
        },
        setZoom: (e, t) => {
            var i = hzflip.viewers.magazine;
            i.isZoomedIn = "zoomIn" == e;
        },
        destroy: () => {
            $("#magazineViewport").html("");
        },
        isPageLoaded: function (e) {
            for (var t = 0; t < this.loadedPages.length; t++) if (e == this.loadedPages[t]) return !0;
            return !1;
        },
        addPage: (e, t) => {
            const i = hzflip.viewers.magazine,
                n = i.config,
                o = i.design;
            let s = $("<div />", {});
            s.addClass("page-cont"),
                e == n.num_pages ? s.addClass("page-last") : e == n.num_pages - 1 && s.addClass("page-second-last"),
                null != n &&
                    null != o &&
                    null != o.type &&
                    ("book" == o.type || "notebook" == o.type ? (1 == e || 2 == e || e == n.num_pages || (n.num_pages % 2 == 0 && e == n.num_pages - 1)) && s.addClass("hard") : "album" == o.type && s.addClass("hard")),
                t.turn("addPage", s, e) &&
                    (1 == e && null != n.thumbnail && "" != $.trim(n.thumbnail) ? heyzine.helpers.loading.show("crisp", s, e) : heyzine.helpers.loading.show("blur", s, e),
                    heyzine
                        .loadPageView(e, s, "normal")
                        .then(() => {
                            heyzine.loadPageLayers(e, s, "normal");
                        })
                        .catch(() => {}));
        },
        setEditMode: function (e) {
            this.isEditMode = e;
        },
        getCurrentPage: function () {
            return $(".magazine").turn("page");
        },
        getVisiblePages: function (e) {
            var t = hzflip.viewers.magazine;
            const i = null == e ? $(".magazine").turn("page") : e;
            var n = $("#canvas").width(),
                o = $("#canvas").height();
            return (n < 750 && n <= o && 0 == t.design.show_double) || 2 == t.design.show_double
                ? [i]
                : 1 == i
                ? [1]
                : this.isLastPage(i)
                ? t.config.num_pages % 2 == 0
                    ? [t.config.num_pages]
                    : [t.config.num_pages - 1, t.config.num_pages]
                : i % 2 == 0
                ? [i, i + 1]
                : i % 2 != 0
                ? [i - 1, i]
                : void 0;
        },
        getVisiblePagesElements: function () {
            const e = this.getVisiblePages(),
                t = [];
            for (let i = 0; i < e.length; i++) t.push($('#magazineViewport [page="' + e[i] + '"]'));
            return t;
        },
        isLastPage: (e) => {
            var t = hzflip.viewers.magazine,
                i = null == e ? $(".magazine").turn("page") : e,
                n = $("#canvas").width(),
                o = $("#canvas").height();
            return (n < 750 && n <= o && 0 == t.design.show_double) || 2 == t.design.show_double
                ? t.config.num_pages == i
                : (t.config.num_pages % 2 != 0 && (i == t.config.num_pages || i == t.config.num_pages - 1)) || (t.config.num_pages % 2 == 0 && i == t.config.num_pages);
        },
        adjustPageDepth: function (e) {
            if (null == this.design.show_edges || 0 == this.design.show_edges) return;
            let t = 4;
            if (
                (null != this.design.show_round && 1 == this.design.show_round
                    ? ($(".magazine-viewport .page-depth > img").each(function () {
                          $(this).attr("src", $(this).attr("src").replace("pages-depth.svg", "pages-depth-rounded.svg"));
                      }),
                      (t = this.config.width >= this.config.height ? 6 : 5.3))
                    : ($(".magazine-viewport .page-depth > img").each(function () {
                          $(this).attr("src", $(this).attr("src").replace("pages-depth-rounded.svg", "pages-depth.svg"));
                      }),
                      (t = 4)),
                this.config.num_pages < 4)
            )
                return;
            this.config.num_pages < 8 && (t = 6);
            let i = $(".page-depth-left").width() / t,
                n = this.config.num_pages - 1,
                o = i - (i / n) * (e - 1),
                s = i - (i / n) * (this.config.num_pages - e),
                a = $(".magazine").turn("display"),
                l = () => {
                    null != this.tmrDepthLeft && clearTimeout(this.tmrDepthLeft);
                },
                r = () => {
                    null != this.tmrDepthRight && clearTimeout(this.tmrDepthRight);
                },
                h = (e) => {
                    $(".page-depth-right").css("right", "0px"),
                        setTimeout(
                            () => {
                                $(".page-depth-right").hide();
                            },
                            null == e ? 100 : e
                        );
                },
                d = (e, t) => {
                    let i = 0;
                    (i = 1 == this.design.rtl ? (this.prevPage > t ? 100 : this.duration - 200) : this.prevPage > t ? this.duration - 200 : 100),
                        (this.tmrDepthRight = setTimeout(() => {
                            $(".page-depth-right").show(),
                                setTimeout(() => {
                                    $(".page-depth-right").css("right", "-" + e + "px");
                                }, 10);
                        }, i));
                },
                c = (e) => {
                    $(".page-depth-left").css("left", "0px"),
                        setTimeout(
                            () => {
                                $(".page-depth-left").hide();
                            },
                            null == e ? 100 : e
                        );
                },
                p = (e, t) => {
                    let i = 0;
                    (i = 1 == this.design.rtl ? (this.prevPage < t ? 100 : this.duration - 200) : this.prevPage < t ? this.duration - 200 : 100),
                        (this.tmrDepthLeft = setTimeout(() => {
                            $(".page-depth-left").show(),
                                setTimeout(() => {
                                    $(".page-depth-left").css("left", "-" + e + "px");
                                }, 10);
                        }, i));
                };
            e == this.config.num_pages ? (1 == this.design.rtl ? (c(0), l()) : (h(0), r())) : 1 == e && (1 == this.design.rtl ? (h(0), r()) : (c(0), l())),
                o < 1 || e == this.config.num_pages || e == this.config.num_pages - 1 || ("double" == a && e == this.config.num_pages - 2) ? (1 == this.design.rtl ? c() : h()) : 1 == this.design.rtl ? p(o, e) : d(o, e),
                s < 1 || 1 == e || 2 == e || ("double" == a && 3 == e) ? (1 == this.design.rtl ? h() : c()) : 1 == this.design.rtl ? d(s, e) : p(s, e),
                (this.prevPage = e);
        },
        resizeViewport: () => {
            var e = hzflip.viewers.magazine,
                t = $("#canvas").width(),
                i = $("#canvas").height(),
                n = $(".magazine").turn("options");
            if (($(".magazine").removeClass("animated"), $(".magazine-viewport").css({ width: t, height: i }), null != n)) {
                var o = !1,
                    s = n.width;
                0 == e.design.show_double
                    ? t < 750 && t <= i
                        ? ((s = n.width / 2), (o = !0), "double" == $(".magazine").turn("display") && ($(".magazine").turn("display", "single"), heyzine.setPageDisplay("single")))
                        : ((s = n.width), (o = !1), "single" == $(".magazine").turn("display") && ($(".magazine").turn("display", "double"), heyzine.setPageDisplay("double")))
                    : 1 == e.design.show_double
                    ? ((s = n.width), (o = !1), "single" == $(".magazine").turn("display") && ($(".magazine").turn("display", "double"), heyzine.setPageDisplay("double")))
                    : 2 == e.design.show_double && ((s = n.width / 2), (o = !0), "double" == $(".magazine").turn("display") && ($(".magazine").turn("display", "single"), heyzine.setPageDisplay("single"))),
                    o ? ($(".magazine-viewport").addClass("page-single"), $(".magazine-viewport").removeClass("page-double")) : ($(".magazine-viewport").removeClass("page-single"), $(".magazine-viewport").addClass("page-double"));
                var a = e.calculateBound({ width: s, height: n.height, boundWidth: Math.min(s, t), boundHeight: Math.min(n.height, i) });
                a.width % 2 != 0 && a.width--,
                    null != heyzine.renderAspectRatio && (a.height = o ? Math.trunc(a.width * heyzine.renderAspectRatio) : Math.trunc((a.width / 2) * heyzine.renderAspectRatio)),
                    (a.width == $(".magazine").width() && a.height == $(".magazine").height()) || ($(".magazine").turn("size", a.width, a.height), hzflip.controls.resizeViewport(a)),
                    $(".magazine").css({ top: -a.height / 2, left: -a.width / 2 }),
                    $(".magazine").addClass("animated"),
                    $(document).trigger("heyzineResizeViewport", []),
                    e.adjustPageDepth(e.getCurrentPage());
            }
        },
        calculateBound: (e) => {
            var t = { width: e.width, height: e.height };
            if (t.width > e.boundWidth || t.height > e.boundHeight) {
                var i = t.width / t.height;
                e.boundWidth / i > e.boundHeight && e.boundHeight * i <= e.boundWidth ? ((t.width = Math.round(e.boundHeight * i)), (t.height = e.boundHeight)) : ((t.width = e.boundWidth), (t.height = Math.round(e.boundWidth / i)));
            }
            return t;
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    null == hzflip.viewers && (hzflip.viewers = {}),
    (hzflip.viewers.swiper = {
        viewerName: "SWIPER",
        slides: [],
        config: {},
        design: {},
        swiper: {},
        isEditMode: !1,
        enabledEvents: !0,
        render: (e, t) => {
            $("#pnlControls .slider-toolbar").remove(),
                $(".logo-backs2").remove(),
                $("#magazineViewport").html(""),
                $("#magazineViewport").append($("#tplSwiper").html()),
                $("#canvas").addClass("canvas-center"),
                $("#canvas").fadeIn(1e3),
                $(".logo-backs2").length > 0 && ($(".logo-backs2").parent().is("a") ? $(".logo-backs2").parent().appendTo("#canvas") : $(".logo-backs2").appendTo("#canvas"));
            var i = hzflip.viewers.swiper;
            (i.config = e), (i.design = t), null != t && ("1" == t.rtl ? $("#magazineViewport .container").attr("dir", "rtl") : $("#magazineViewport .container").removeAttr("dir")), (i.slides = []);
            for (let t = 0; t < e.num_pages; t++) i.slides.push(t);
            e.num_pages <= 1 && $("#magazineViewport .container").addClass("swiper-one-page"), i.resizeViewport();
            const n = "fade" == t.type ? null : t.type,
                o = 1 == t.viewer_dir ? "vertical" : "horizontal";
            (i.swiper = new Swiper("#magazineViewport .container", {
                direction: o,
                observeParents: !0,
                effect: n,
                speed: i.isEditMode ? 0 : 300,
                preventClicks: !1,
                preventClicksPropagation: !1,
                shortSwipes: !1,
                coverflowEffect: { rotate: 30, slideShadows: !1 },
                flipEffect: { rotate: 30, slideShadows: !0 },
                loop: !1,
                navigation: { nextEl: ".btnNext", prevEl: ".btnPrevious" },
                virtual: {
                    slides: i.slides,
                    addSlidesBefore: 2,
                    addSlidesAfter: 2,
                    renderExternal: function (e) {
                        const n = $("#magazineViewport").find(".swiper-wrapper");
                        n.find(".swiper-slide").each(function () {
                            var t = $(this).attr("data-slidei");
                            (t < e.from || t > e.to) && $(this).remove();
                        });
                        const s = n.find(".swiper-slide").first(),
                            a = n.find(".swiper-slide").last(),
                            l = s.length > 0 ? s.attr("data-slidei") : 0,
                            r = a.length > 0 ? a.attr("data-slidei") : 0;
                        for (let t = 0; t < e.slides.length; t++) {
                            const o = e.slides[t];
                            if (n.find('[data-slidei="' + o + '"]').length <= 0 && o >= r) {
                                const e = $('<div class="swiper-slide page-wrapper" data-slidei="' + o + '" page="' + (o + 1) + '"><div class="swiper-zoom-container page-cont p' + (o + 1) + '"></div></div>');
                                e.appendTo(n),
                                    o + 1 == 1 ? heyzine.helpers.loading.show("crisp", e.find(".swiper-zoom-container"), o + 1) : heyzine.helpers.loading.show("blur", e.find(".swiper-zoom-container"), o + 1),
                                    heyzine
                                        .loadPageView(o + 1, e.find(".swiper-zoom-container"), "normal")
                                        .then(() => {
                                            $(".swiper-slide").children().addClass("inactive"),
                                                $('.swiper-slide[data-slidei="' + i.slides[i.swiper.realIndex] + '"]')
                                                    .children()
                                                    .removeClass("inactive"),
                                                $(".swiper-slide").removeClass("swiper-slide-active"),
                                                $('.swiper-slide[data-slidei="' + i.slides[i.swiper.realIndex] + '"]').addClass("swiper-slide-active"),
                                                heyzine.loadPageLayers(o + 1, e.find(".swiper-zoom-container"), "normal");
                                        })
                                        .catch(() => {});
                            }
                        }
                        for (let t = e.slides.length - 1; t >= 0; t--) {
                            const o = e.slides[t];
                            if (n.find('[data-slidei="' + o + '"]').length <= 0 && o < l) {
                                const e = $('<div class="swiper-slide page-wrapper" data-slidei="' + o + '" page="' + (o + 1) + '"><div class="swiper-zoom-container page-cont p' + (o + 1) + '"></div></div>');
                                e.prependTo(n),
                                    o + 1 == 1 ? heyzine.helpers.loading.show("crisp", e.find(".swiper-zoom-container"), o + 1) : heyzine.helpers.loading.show("blur", e.find(".swiper-zoom-container"), o + 1),
                                    heyzine
                                        .loadPageView(o + 1, e.find(".swiper-zoom-container"), "normal")
                                        .then(() => {
                                            $(".swiper-slide").children().addClass("inactive"),
                                                $('.swiper-slide[data-slidei="' + i.slides[i.swiper.realIndex] + '"]')
                                                    .children()
                                                    .removeClass("inactive"),
                                                $(".swiper-slide").removeClass("swiper-slide-active"),
                                                $('.swiper-slide[data-slidei="' + i.slides[i.swiper.realIndex] + '"]').addClass("swiper-slide-active"),
                                                heyzine.loadPageLayers(o + 1, e.find(".swiper-zoom-container"), "normal");
                                        })
                                        .catch(() => {});
                            }
                        }
                        let h = 1 == t.rtl ? -e.offset : e.offset;
                        "vertical" == o ? $(".swiper-slide").css("top", Math.abs(h)) : $(".swiper-slide").css("left", h);
                    },
                },
                on: {
                    slideChange: function () {
                        var e = i.slides[i.swiper.realIndex];
                        $(".swiper-slide").children().addClass("inactive"),
                            $('.swiper-slide[data-slidei="' + e + '"]')
                                .children()
                                .removeClass("inactive"),
                            heyzine.turning(i.slides[i.swiper.realIndex] + 1),
                            setTimeout(() => {
                                $('.swiper-slide[data-slidei="' + e + '"]').addClass("swiper-slide-active"), heyzine.turned(e + 1), heyzine.helpers.loading.startEffect();
                            }, 350);
                    },
                    transitionStart: function () {
                        var e = i.slides[i.swiper.realIndex];
                        $('.swiper-slide[data-slidei="' + e + '"]').addClass("swiper-slide-active"),
                            1 == i.config.num_pages &&
                                setTimeout(() => {
                                    $(".swiper-slide").addClass("swiper-slide-active");
                                }, 400);
                    },
                    transitionEnd: function () {
                        var e = i.slides[i.swiper.realIndex];
                        $('.swiper-slide[data-slidei="' + e + '"]').addClass("swiper-slide-active");
                    },
                    touchStart: function (e) {
                        $(e.target).closest(".layer-action-render").hasClass("layer-disable-page-drag") && (this.allowTouchMove = !1);
                    },
                    touchEnd: function () {
                        this.allowTouchMove = !0;
                    },
                    zoomChange: function (e, t, i) {},
                },
            })),
                $("#canvas").on("mousedown", ".swiper-zoom-container > img", function (e) {
                    return e.preventDefault(), !0;
                });
        },
        goToPage: (e, t) => {
            var i = hzflip.viewers.swiper;
            "string" != typeof e || "next" != e || ("keyboard" != t && "button-nav" != t)
                ? "string" != typeof e || "previous" != e || ("keyboard" != t && "button-nav" != t)
                    ? isNaN(parseInt(e)) || (i.isEditMode ? i.swiper.slideTo(parseInt(e) - 1, 0) : i.swiper.slideTo(parseInt(e) - 1))
                    : i.isEditMode
                    ? i.swiper.slidePrev(0)
                    : i.swiper.slidePrev()
                : i.isEditMode
                ? i.swiper.slideNext(0)
                : i.swiper.slideNext();
        },
        setZoom: function (e, t) {
            null == e
                ? this.enabledEvents || (heyzine.viewer.swiper.attachEvents(), (this.enabledEvents = !0))
                : "string" == typeof e &&
                  ("zoomIn" == e ? this.enabledEvents && (heyzine.viewer.swiper.detachEvents(), (this.enabledEvents = !1)) : "zoomOut" == e && (this.enabledEvents || (heyzine.viewer.swiper.attachEvents(), (this.enabledEvents = !0))));
        },
        destroy: () => {
            $("#magazineViewport").html(""), $("#magazineViewport").css("padding", "0");
        },
        resizeViewport: function () {
            var e = hzflip.viewers.swiper;
            const t = scaler.getObjectFitSize(!0, $("#canvas").width(), $("#canvas").height(), this.config.width, this.config.height);
            $("#magazineViewport").attr("style", "width:" + Math.ceil(t.width) + "px !important; height: " + Math.ceil(t.height) + "px !important;"), null != e.swiper && e.swiper.update && e.swiper.update();
        },
        getCurrentPage: () => {
            var e = hzflip.viewers.swiper;
            return e.slides[e.swiper.realIndex] + 1;
        },
        getVisiblePages: function () {
            var e = hzflip.viewers.swiper;
            const t = e.slides[e.swiper.realIndex] + 1,
                i = [];
            return i.push(t), i;
        },
        getVisiblePagesElements: function () {
            const e = this.getVisiblePages(),
                t = [];
            for (let i = 0; i < e.length; i++) t.push($('#magazineViewport [page="' + e[i] + '"]'));
            return t;
        },
        isLastPage: (e) => {
            var t = hzflip.viewers.swiper;
            return null == e ? t.slides[t.swiper.realIndex] + 1 == t.config.num_pages : e == t.config.num_pages;
        },
        setEditMode: function (e) {
            (this.isEditMode = e), this.isEditMode ? (heyzine.viewer.swiper.params.speed = 0) : (heyzine.viewer.swiper.params.speed = 300);
        },
        adjustPageDepth: function (e) {},
    }),
    "undefined" == typeof hzp && (hzp = {}),
    (hzp = {
        val: !1,
        tmrValidate: null,
        hash: function (e, t) {
            return crypto.subtle.digest(e, new TextEncoder("utf-8").encode(t)).then((e) => Array.prototype.map.call(new Uint8Array(e), (e) => ("00" + e.toString(16)).slice(-2)).join(""));
        },
        validate: function (e, t, i, n, o) {
            return new Promise((s, a) => {
                var l = e + "-" + t + "-" + i + "-" + n;
                this.hash("SHA-256", l).then((e) => {
                    s(o == e.substr(0, 41));
                });
            });
        },
        check: function (e, t, i, n, o) {
            null != this.tmrValidate && clearTimeout(this.tmrValidate),
                (this.tmrValidate = setTimeout(() => {
                    this.validate(e, t, i, n, o).then((e) => {
                        if (e) console.log("sco"), (hzp.val = !0);
                        else {
                            console.log("sc");
                            document.location.href = "/";
                        }
                    });
                }, 4e3));
        },
    }),
    "undefined" == typeof hzflip && (hzflip = {}),
    (hzflip.stats = {
        iframes: { isOver: !1, el: null },
        sessionTracks: [],
        track: function (e, t, i, n) {
            if ("undefined" == typeof plausible) return void (null != n && n());
            let o = null;
            null != n &&
                (o = setTimeout(() => {
                    n();
                }, 1e3));
            let s = e + t + i,
                a = Math.round(new Date().getTime() / 1e3);
            if (this.sessionTracks[s] && a - this.sessionTracks[s] < 30) return null != n && n(), void (null != o && clearTimeout(o));
            (this.sessionTracks[s] = a),
                plausible(heyzine.config.name, {
                    props: { type: e, target: t, page: i, token: heyzine.config.readerToken },
                    callback: () => {
                        null != n && n(), null != o && clearTimeout(o);
                    },
                });
        },
        trackLayer: function (e, t, i) {
            let n = null;
            null != t.action.target ? (n = t.action.target) : null != t.media && null != t.media.url && (n = t.media.url), this.track(e, n, t.page, i);
        },
        trackControls: function (e) {
            this.track(e, null, null, null);
        },
        trackBookmarkAdd: function (e) {
            this.track("bookmark-add", "bookmark-add-" + e, e);
        },
        trackBookmarkClick: function (e, t) {
            this.track("bookmark", "bookmark-click-" + e, t);
        },
        trackIframes: function (e) {
            let t = this;
            $(".layer-action-render iframe")
                .off("mouseenter")
                .on("mouseenter", function () {
                    (t.iframes.isOver = !0), (t.iframes.el = $(this));
                }),
                $(".layer-action-render iframe")
                    .off("mouseleave")
                    .on("mouseleave", function () {
                        t.iframes.isOver = !1;
                    }),
                $(window)
                    .off("blur")
                    .on("blur", () => {
                        if (this.iframes.isOver && this.iframes.el) {
                            let t = this.iframes.el.closest(".layer-action-render").attr("id");
                            if (null != t) {
                                t = t.replace("layer", "");
                                for (let i = 0; i < e.length; i++) e[i].id == t && this.trackLayer(e[i].type, e[i]);
                            }
                        }
                    });
        },
        trackMedia: function (e, t, i) {
            for (let i = 0; i < t.length; i++)
                null != t[i] &&
                    "backAudio" != t[i].compType &&
                    ($(t[i])
                        .off("play")
                        .on("play", () => {
                            this.trackLayer(e[i].type, e[i]);
                        }),
                    $(t[i])
                        .off("player:play")
                        .on("player:play", () => {
                            this.trackLayer(e[i].type, e[i]);
                        }));
            for (let t = 0; t < i.length; t++)
                e[t] &&
                    "video" == e[t].type &&
                    e[t].media &&
                    "youtube" != e[t].media.type &&
                    $(i[t])
                        .find("video")
                        .off("play")
                        .on("play", () => {
                            this.trackLayer(e[t].type, e[t]);
                        });
        },
    }),
    (heyzineDesign = {
        data: {},
        afterLoad: function (e, t) {
            (heyzineDesign.data = e),
                null == t && ($(".logo-backs2-loading").remove(), this.setLogo(e)),
                this.setNextPrevious(e),
                this.setSlider(e),
                this.setIconset(e),
                this.setDisposition(e, !0),
                this.setPageEffect(e),
                $(".logo-backs2").parent().is("a") &&
                    ($(".logo-backs2").css("z-index", 1),
                    null == heyzine || null == heyzine.config || 1 == heyzine.getCurrentPage() || (heyzine.getCurrentPage() == heyzine.config.num_pages && heyzine.config.num_pages % 2 == 0) || $(".logo-backs2").css("z-index", 0));
        },
        load: function (e) {
            (heyzineDesign.data = e), heyzine.lang.translate.init();
            let t = this.setVisibleControls(e);
            $("#pnlControls").show(),
                t ? ($("#pnlControls").hide(), $("#pnlControls").addClass("panel-controls-hidden")) : ($("#pnlControls").show(), $("#pnlControls").removeClass("panel-controls-hidden")),
                this.setBackground(e),
                this.setTitle(e),
                this.setPageEffect(e),
                this.setIconset(e),
                this.setDisposition(e, !1),
                this.setLogo(e),
                this.setTooltips(),
                (document.location.href.indexOf("?ctl=0") > 0 || document.location.href.indexOf("&ctl=0") > 0) && $("#pnlControls").hide(),
                heyzineDesign.afterLoad(e, !0);
        },
        setTitle: function (e) {
            $(".flipbook-title").hide(),
                $(".flipbook-title p").html(""),
                $(".flipbook-title h2").html(""),
                $(".flipbook-title h1").html(""),
                null != e.show_text && 1 == e.show_text && null != e.title && "" != $.trim(e.title) && ($(".flipbook-title h1").html(sanitizer.sanitize(e.title.replace(/(?:\r\n|\r|\n)/g, "<br>"))), $(".flipbook-title").show()),
                null != e.show_text && 1 == e.show_text && null != e.subtitle && "" != $.trim(e.subtitle) && ($(".flipbook-title h2").html(sanitizer.sanitize(e.subtitle.replace(/(?:\r\n|\r|\n)/g, "<br>"))), $(".flipbook-title").show()),
                null != e.show_text &&
                    1 == e.show_text &&
                    null != e.description &&
                    "" != $.trim(e.description) &&
                    ($(".flipbook-title p").html(sanitizer.sanitize(e.description.replace(/(?:\r\n|\r|\n)/g, "<br>"))), $(".flipbook-title").show());
        },
        setBackground: function (e) {
            if (
                (null != e.background && "" != $.trim(e.background) && ("none" == e.background ? $(".logo-backs").css("background-image", "none") : $(".logo-backs").css("background-image", "url('" + e.background + "')")),
                null != e.background_color && "" != $.trim(e.background_color) && $(".logo-backs").parent().css("background-color", e.background_color),
                null != e.background_style && "" != $.trim(e.background_style))
            ) {
                const t = e.background_style;
                null != t.size && $(".logo-backs").css("background-size", t.size),
                    null != t.size && $(".logo-backs").css("background-position", t.position),
                    null != t.transparency && $(".logo-backs").css("opacity", 1 - t.transparency / 100),
                    null != t.blur && $(".logo-backs").css("filter", "blur(" + t.blur + "px)");
            }
        },
        setLogo: function (e) {
            null != e.company_logo && "" != $.trim(e.company_logo) ? ($(".logo-backs2").attr("src", e.company_logo), $(".logo-backs2").show()) : ($(".logo-backs2").attr("src", ""), $(".logo-backs2").hide()),
                $(".logo-backs2").length > 0 && $(".logo-backs2").parent().is("a") && $(".logo-backs2").unwrap(),
                null != e.company_logo &&
                    "" != $.trim(e.company_logo) &&
                    null != e.company_logo_link &&
                    "" != $.trim(e.company_logo_link) &&
                    (1 == e.company_logo_link_mode
                        ? $(".logo-backs2").wrap('<a rel="nofollow,noindex" target="_BLANK">')
                        : 2 == e.company_logo_link_mode
                        ? $(".logo-backs2").wrap('<a rel="nofollow,noindex" target="_TOP">')
                        : $(".logo-backs2").wrap('<a rel="nofollow,noindex">'),
                    $(".logo-backs2").parent().attr("href", e.company_logo_link));
        },
        setNextPrevious: function (e) {
            null != e.arrows &&
                ($(".next-button").css("background-image", ""),
                $(".previous-button").css("background-image", ""),
                $(".next-button").css("display", ""),
                $(".previous-button").css("display", ""),
                $(".next-button").removeClass("corner-right"),
                $(".previous-button").removeClass("corner-left"),
                $(".next-button").removeClass("next-show"),
                $(".previous-button").removeClass("previous-show"),
                $(".swiper-button-next").show(),
                $(".swiper-button-prev").show(),
                $(".page-findex").removeClass("page-findex-arrows"),
                1 == e.arrows
                    ? ($(".next-button").addClass("corner-right"),
                      $(".previous-button").addClass("corner-left"),
                      $(".next-button").addClass("next-show"),
                      $(".previous-button").addClass("previous-show"),
                      $(".page-findex").addClass("page-findex-arrows"),
                      (document.location.href.indexOf("#page/1") > 0 || document.location.href.indexOf("#page") < 0) && (1 == e.rtl ? $(".next-button").css("display", "none") : $(".previous-button").css("display", "none")))
                    : 0 == e.arrows ||
                      (2 == e.arrows
                          ? ($(".next-button").addClass("next-show"),
                            $(".previous-button").addClass("previous-show"),
                            (document.location.href.indexOf("#page/1") > 0 || document.location.href.indexOf("#page") < 0) && (1 == e.rtl ? $(".next-button").css("display", "none") : $(".previous-button").css("display", "none")))
                          : ($(".next-button").css("display", "none"), $(".previous-button").css("display", "none"), $(".swiper-button-next").hide(), $(".swiper-button-prev").hide())));
        },
        setSlider: function (e) {
            null == e.show_slider || (0 != $.trim(e.show_slider) && !1 !== e.show_slider) ? $(".control-bottom .page-bar").show() : $(".control-bottom .page-bar").hide();
        },
        setIconset: function (e) {
            let t = ICONSET_VER,
                i = ICONSET_VER,
                n = "iconset2_" + i,
                o = e.controls_iconset;
            if (($(".next-button").addClass("hz-iconset-2"), $(".previous-button").addClass("hz-iconset-2"), $("#pnlControls").addClass("hz-iconset-2"), $("#pnlZoomStep").addClass("hz-iconset-2"), null != e.controls_iconset)) {
                const n = e.controls_iconset.split("_");
                (i = parseInt(n[n.length - 1])),
                    i < 5 && ($(".next-button").removeClass("hz-iconset-2"), $(".previous-button").removeClass("hz-iconset-2"), $("#pnlControls").removeClass("hz-iconset-2"), $("#pnlZoomStep").removeClass("hz-iconset-2")),
                    -1 === e.controls_iconset.indexOf("iconsetu") && (o = e.controls_iconset.replace("_" + i, "_" + t));
            }
            1 == e.arrows &&
                (null != e.controls_iconset
                    ? ($(".next-button").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + o + ".png')"), $(".previous-button").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + o + ".png')"))
                    : ($(".next-button").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + n + ".png')"), $(".previous-button").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + n + ".png')"))),
                null != e.controls_iconset
                    ? ($(".hz-icon").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + o + ".png')"),
                      $(".hz-icon-2").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + o + ".png')"),
                      $("[data-iconset]").hide(),
                      $("[data-iconset=" + e.controls_iconset.split("_")[0] + "]").length > 0 ? $("[data-iconset=" + e.controls_iconset.split("_")[0] + "]").show() : $("[data-iconset=iconset5]").show())
                    : ($(".hz-icon").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + n + ".png')"),
                      $(".hz-icon-2").css("background-image", "url('" + CDN_PATH + "/flipbook/img/" + n + ".png')"),
                      $("[data-iconset]").hide(),
                      $("[data-iconset=iconset5]").show());
        },
        setVisibleControls: function (e) {
            let t = !0;
            return (
                null == e.show_zoom || (0 != $.trim(e.show_zoom) && !1 !== e.show_zoom) ? ($("#pnlControls .zoom-icon").show(), (t = !1)) : $("#pnlControls .zoom-icon").hide(),
                null == e.show_share || 0 == $.trim(e.show_share) || !1 === e.show_share ? $("#btnShare").hide() : ($("#btnShare").show(), (t = !1)),
                null == e.show_search || 0 == $.trim(e.show_search) || !1 === e.show_search ? $("#btnSearch").hide() : ($("#btnSearch").show(), (t = !1)),
                null == e.show_prevnext || (1 != $.trim(e.show_prevnext) && !0 !== e.show_prevnext)
                    ? ($("#btnNavPrev").hide(), $("#btnNavNext").hide())
                    : ($("#btnNavPrev").show(),
                      $("#btnNavNext").show(),
                      1 == e.viewer_dir
                          ? ($("#btnNavPrev .hz-icon").addClass("button-prev-vertical"), $("#btnNavNext .hz-icon").addClass("button-next-vertical"))
                          : ($("#btnNavPrev .hz-icon").removeClass("button-prev-vertical"), $("#btnNavNext .hz-icon").removeClass("button-next-vertical")),
                      (t = !1)),
                null == e.show_start || (1 != $.trim(e.show_start) && !0 !== e.show_start)
                    ? $("#btnNavStart").hide()
                    : ($("#btnNavStart").show(), 1 == e.viewer_dir ? $("#btnNavStart .hz-icon").addClass("button-start-vertical") : $("#btnNavStart .hz-icon").removeClass("button-start-vertical"), (t = !1)),
                null == e.show_end || (1 != $.trim(e.show_end) && !0 !== e.show_end)
                    ? $("#btnNavEnd").hide()
                    : ($("#btnNavEnd").show(), 1 == e.viewer_dir ? $("#btnNavEnd .hz-icon").addClass("button-end-vertical") : $("#btnNavEnd .hz-icon").removeClass("button-end-vertical"), (t = !1)),
                null == e.sound_flip || (1 != $.trim(e.sound_flip) && !0 !== e.sound_flip) ? $("#btnSoundOff").hide() : ($("#btnSoundOff").show(), (t = !1)),
                null == e.show_download || (0 != $.trim(e.show_download) && !1 !== e.show_download) ? ($(".down-pdf").show(), (t = !1)) : $(".down-pdf").hide(),
                null == e.show_print || 0 == $.trim(e.show_print) || !1 === e.show_print || $.isTouch ? $("#btnPrint").hide() : ($("#btnPrint").show(), (t = !1)),
                (null != e.show_thumbpanel && 0 != e.show_thumbpanel) || (null != e.show_outline && 0 != e.show_outline && 2 != e.show_outline) || (null != e.show_bookmarks && 0 != e.show_bookmarks && 2 != e.show_bookmarks)
                    ? ($("#btnNavPanel").show(), (t = !1))
                    : $("#btnNavPanel").hide(),
                null == e.show_fullscreen || 0 == $.trim(e.show_fullscreen) || !1 === e.show_fullscreen ? $("#btnFullscreen").hide() : ($("#btnFullscreen").show(), (t = !1)),
                t
            );
        },
        setPageEffect: function (e) {
            let t = "none";
            null != e.show_depth && ("0" == e.show_depth ? $("#magazineViewport").addClass("no-depth") : $("#magazineViewport").removeClass("no-depth")),
                null != e.show_edges && 1 == e.show_edges && (t = "small"),
                null != e.show_shadow && ("0" == e.show_shadow ? $("#magazineViewport").addClass("no-shadow") : ($("#magazineViewport").removeClass("no-shadow"), (t = "small"))),
                null != e.show_bookmarks && ((2 != e.show_bookmarks && 3 != e.show_bookmarks) || (t = "large")),
                null != e.show_outline && ((2 != e.show_outline && 3 != e.show_outline) || (t = "large")),
                null != e.arrows && 3 != e.arrows && (t = "none" == t || "small" == t ? "medium" : t),
                $("#magazineViewport").removeClass("page-controls-turn"),
                $("#magazineViewport").removeClass("page-controls-md"),
                $("#magazineViewport").removeClass("page-controls"),
                "large" == t ? $("#magazineViewport").addClass("page-controls") : "medium" == t ? $("#magazineViewport").addClass("page-controls-md") : "small" == t && $("#magazineViewport").addClass("page-controls-turn"),
                null != e.show_round &&
                    ("1" == e.show_round
                        ? ($("#magazineViewport").addClass("round-pages"),
                          $("#magazineViewport .page-depth > img").each(function () {
                              null != $(this).attr("src") && $(this).attr("src", $(this).attr("src").replace("pages-depth.svg", "pages-depth-rounded.svg"));
                          }))
                        : ($("#magazineViewport").removeClass("round-pages"),
                          $("#magazineViewport .page-depth > img").each(function () {
                              null != $(this).attr("src") && $(this).attr("src", $(this).attr("src").replace("pages-depth-rounded.svg", "pages-depth.svg"));
                          }))),
                null != e.show_binding && ("1" == e.show_binding ? $("#magazineViewport").addClass("binding-pages") : $("#magazineViewport").removeClass("binding-pages")),
                null != e.show_center && ("0" == e.show_center ? $("#magazineViewport").addClass("no-center") : $("#magazineViewport").removeClass("no-center"));
        },
        setDisposition: function (e, t) {
            $(".controls-pdf").removeClass("controls-sm"),
                $(".controls-pdf").removeClass("controls-md"),
                $(".controls-pdf").removeClass("controls-lg"),
                "" == $.trim(e.controls_size) || ("sm" != e.controls_size && "lg" != e.controls_size) ? $(".controls-pdf").addClass("controls-md") : $(".controls-pdf").addClass("controls-" + e.controls_size),
                "" == $.trim(e.controls_size) || ("sm" != e.controls_size && "lg" != e.controls_size) ? $(".controls-pdf").addClass("controls-md") : $(".controls-pdf").addClass("controls-" + e.controls_size),
                null != e.controls_style && heyzine.controls.toolbar.setDisposition(e),
                t && heyzine.controls.navpanel.setDisposition(),
                $(".logo-backs2").attr("style", ""),
                "" != $.trim(e.company_logo_style) && 0 != e.company_logo_style && $(".logo-backs2").css(JSON.parse(e.company_logo_style)),
                null != e.company_logo && "" != $.trim(e.company_logo) ? $(".logo-backs2").show() : $(".logo-backs2").hide().css({ width: "0px", height: "0px" });
        },
        setTooltips: function () {
            $.isTouch ||
                ($("#pnlControls #btnNavStart").attr("aria-label", heyzine.lang.translate.fromKey("first")),
                $("#pnlControls #btnNavPrev").attr("aria-label", heyzine.lang.translate.fromKey("prev")),
                $("#pnlControls #btnNavNext").attr("aria-label", heyzine.lang.translate.fromKey("next")),
                $("#pnlControls #btnNavEnd").attr("aria-label", heyzine.lang.translate.fromKey("last")),
                $("#pnlControls #btnShare").attr("aria-label", heyzine.lang.translate.fromKey("share")),
                $("#pnlControls .down-pdf").attr("aria-label", heyzine.lang.translate.fromKey("download")),
                $("#pnlControls #btnPrint").attr("aria-label", heyzine.lang.translate.fromKey("print")),
                $("#pnlControls .zoom-icon").attr("aria-label", heyzine.lang.translate.fromKey("zoom")),
                $("#pnlControls #btnFullscreen").attr("aria-label", heyzine.lang.translate.fromKey("fullscreen")),
                $("#pnlControls #btnSoundOff").attr("aria-label", heyzine.lang.translate.fromKey("sound")),
                $("#pnlControls #btnSearch").attr("aria-label", heyzine.lang.translate.fromKey("search")),
                $("#pnlControls #btnNavPanel").attr("aria-label", heyzine.lang.translate.fromKey("table_contents")),
                $("#pnlZoomStep .btnZoomMore").attr("aria-label", heyzine.lang.translate.fromKey("zoomin")),
                $("#pnlZoomStep .btnZoomLess").attr("aria-label", heyzine.lang.translate.fromKey("zoomout")),
                $("#pnlNav #btnNavPanelThumbnails").attr("aria-label", heyzine.lang.translate.fromKey("thumbnails")),
                $("#pnlNav #btnNavPanelOutline").attr("aria-label", heyzine.lang.translate.fromKey("outline")),
                $("#pnlNav #btnNavPanelBookmark").attr("aria-label", heyzine.lang.translate.fromKey("bookmark")),
                $("#pnlNav .panel-nav-controls .panel-nav-close").attr("aria-label", heyzine.lang.translate.fromKey("close")),
                $("[aria-label]").on("click touchend", function () {
                    $(this).addClass("no-tooltip");
                }),
                $("[aria-label]").on("mouseenter", function () {
                    $(this).removeClass("no-tooltip");
                }),
                $("[aria-label]").on("mouseleave", function () {
                    $(this).removeClass("no-tooltip");
                }));
        },
    }),
    (resetHeyzine = null),
    (heyzine = {
        config: null,
        design: heyzineDesign,
        controls: hzflip.controls,
        layers: hzflip.layers,
        helpers: hzflip.helpers,
        stats: hzflip.stats,
        viewer: null,
        largeWidth: 2214,
        url: null,
        renderAspectRatio: null,
        viewportScales: [],
        inited: !1,
        firstInteractionState: !1,
        cdnPath: CDN_PATH,
        thumbnailPath: THUMBNAIL_PATH,
        thumbnail: new Image(),
        tocPath: TOC_PATH,
        toc: new Image(),
        tocMaxPages: 80,
        tag: null,
        autoPlay: null,
        browserNavButtons: null,
        loadOnLastPage: null,
        peelAnimation: null,
        timerRes: !1,
        progressState: { started: !1, progress: 0, numIndicators: 0, ended: 0 },
        destroy: () => {
            heyzine.controls.destroy(), (heyzine = $.extend(!0, {}, resetHeyzine));
        },
        reload: function (e) {
            try {
                sessionStorage.clear();
            } catch (e) {
                console.log("sessionStorage not available");
            }
            return new Promise((t, i) => {
                heyzine.render(), null != e ? (heyzine.controls.initViewerControls(e), heyzine.layers.init(e)) : heyzine.controls.initViewerControls(heyzine.config), t();
            });
        },
        loadForEditor: function (e) {
            heyzine.controls.loadForEditor(e);
        },
        setViewer: (e, t) => (
            heyzine.viewer.destroy(),
            (heyzine.design.data.type = t),
            (heyzine.config.type = t),
            (heyzine.config.viewer = e),
            (heyzine.viewer = "SWIPER" == e ? hzflip.viewers.swiper : hzflip.viewers.magazine),
            "magazine" == t || "album" == t
                ? ((heyzine.design.data.show_edges = 1), (heyzine.design.data.show_round = 0), (heyzine.design.data.show_depth = 1), (heyzine.design.data.show_binding = 0))
                : "book" == t
                ? ((heyzine.design.data.show_edges = 1), (heyzine.design.data.show_round = 0), (heyzine.design.data.show_depth = 1), (heyzine.design.data.show_binding = 1))
                : "notebook" == t
                ? ((heyzine.design.data.show_edges = 1), (heyzine.design.data.show_round = 1), (heyzine.design.data.show_depth = 1), (heyzine.design.data.show_binding = 0))
                : "cards" == t
                ? ((heyzine.design.data.show_edges = 0), (heyzine.design.data.show_round = 1), (heyzine.design.data.show_depth = 0), (heyzine.design.data.show_binding = 0))
                : "fade" == t || "coverflow" == t
                ? ((heyzine.design.data.show_edges = 0), (heyzine.design.data.show_round = 0), (heyzine.design.data.show_depth = 1), (heyzine.design.data.show_binding = 0))
                : "flip" == t && ((heyzine.design.data.show_edges = 0), (heyzine.design.data.show_round = 0), (heyzine.design.data.show_depth = 0), (heyzine.design.data.show_binding = 0)),
            heyzine.design.data
        ),
        load: (e, t) => {
            try {
                sessionStorage.clear();
            } catch (e) {
                console.log("sessionStorage not available");
            }
            if (
                ((heyzine.url = e),
                (heyzine.config = t),
                (heyzine.thumbnail.src = heyzine.thumbnailPath + t.thumbnail),
                heyzine.thumbnail.classList.add("loader-preview"),
                (heyzine.thumbnail.alt = "flipbook cover"),
                document.location.hash && "#page/" == document.location.hash && (document.location.hash = "#page/1"),
                document.location.href.indexOf("?dp=1") > 0 || document.location.href.indexOf("&dp=1") > 0
                    ? (heyzine.design.data.show_double = 1)
                    : (document.location.href.indexOf("?dp=2") > 0 || document.location.href.indexOf("&dp=2") > 0) && (heyzine.design.data.show_double = 2),
                null != heyzine.parseUrl().ap && (heyzine.autoPlay = heyzine.parseUrl().ap),
                null != heyzine.parseUrl().bn && (heyzine.browserNavButtons = heyzine.parseUrl().bn),
                null != heyzine.parseUrl().hn && 0 == heyzine.parseUrl().hn && (t.hashNavigation = !1),
                null != heyzine.parseUrl().tag && (heyzine.tag = heyzine.parseUrl().tag),
                null == heyzine.parseUrl().pl ||
                    ("tr" != heyzine.parseUrl().pl && "br" != heyzine.parseUrl().pl && "tl" != heyzine.parseUrl().pl && "bl" != heyzine.parseUrl().pl) ||
                    (heyzine.peelAnimation = { timer: null, state: "", corner: heyzine.parseUrl().pl }),
                0 == heyzine.inited && (heyzine.helpers.loading.showViewportLoader(), (heyzine.inited = !0)),
                "LOWT" == heyzine.config.mode && scaler.isInIframe())
            )
                return (
                    $(".magazine-viewport-loader .loader-preview-cont").append('<div class="lowt-overlay"></div>'),
                    $(".magazine-viewport-loader .loader-preview-cont .loader").hide(),
                    $(".magazine-viewport-loader .loader-preview-cont img.loader-preview").css({ filter: "blur(0) opacity(1)", width: "100%" }),
                    $(".lowt-overlay").on("click", function () {
                        $(".magazine-viewport-loader .loader-preview-cont img.loader-preview").hide(), $(".lowt-overlay").fadeOut("fast"), (t.mode = "PDF"), heyzine.load(e, t);
                    }),
                    new Promise((e, t) => {
                        heyzine.resizeViewport(), e("");
                    })
                );
            if (
                ((null != heyzine.design.data.embed_mode && 1 == heyzine.design.data.embed_mode) ||
                    (null == heyzine.toc && (heyzine.toc = new Image()),
                    (heyzine.toc.onerror = () => {
                        heyzine.toc = null;
                    }),
                    (heyzine.toc.src = heyzine.tocPath + t.thumbnail.replace("-thumb.jpg", "") + "-toc.jpg")),
                "" != $.trim(heyzine.design.data.load_page))
            ) {
                const e = -1 == heyzine.design.data.load_page ? heyzine.storage.getItem("lastpage-" + heyzine.config.name) : heyzine.design.data.load_page;
                null != e && (heyzine.loadOnLastPage = e);
            }
            return new Promise((i, n) => {
                null == resetHeyzine && (resetHeyzine = $.extend(!0, {}, heyzine)),
                    "IMG" == heyzine.config.mode ? $.extend(!0, heyzine, hzimg) : "PREV" == heyzine.config.mode ? $.extend(!0, heyzine, hzprev) : $.extend(!0, heyzine, hzpdf),
                    "SWIPER" == heyzine.config.viewer ? (heyzine.viewer = hzflip.viewers.swiper) : (heyzine.viewer = hzflip.viewers.magazine),
                    heyzine
                        .load(e, t)
                        .then(() => {
                            if (
                                (heyzine.layers.init(t),
                                heyzine.render(),
                                heyzine.controls.init(t),
                                heyzine.refreshSession(),
                                heyzine.design.afterLoad(heyzine.design.data),
                                null != heyzine.autoPlay && heyzine.controls.navigation.startAutoPlay(heyzine.autoPlay),
                                null != heyzine.loadOnLastPage && heyzine.goToPage(heyzine.loadOnLastPage),
                                null != heyzine.peelAnimation &&
                                    null != $(".magazine").turn &&
                                    (heyzine.peelAnimation.timer = setInterval(() => {
                                        (heyzine.peelAnimation.state = "" == heyzine.peelAnimation.state ? heyzine.peelAnimation.corner : ""), $(".magazine").turn("peel", heyzine.peelAnimation.state);
                                    }, 3e3)),
                                $(window)
                                    .resize(function () {
                                        heyzine.resizeViewport(), heyzine.adjustResolution(), heyzine.setCssVariables();
                                    })
                                    .bind("orientationchange", function () {
                                        heyzine.resizeViewport(), heyzine.adjustResolution(), heyzine.setCssVariables();
                                    }),
                                $(document).on("click", () => {
                                    heyzine.firstInteraction();
                                }),
                                $(document).on("touchstart", () => {
                                    heyzine.firstInteraction();
                                }),
                                $(".magazine").on("touchstart", () => {
                                    heyzine.firstInteraction();
                                }),
                                document.fonts.ready.then(function () {
                                    heyzine.controls.fontsLoaded();
                                }),
                                heyzine.resizeViewport(),
                                null != heyzine.parseUrl().search)
                            ) {
                                const e = heyzine.parseUrl().search;
                                "" != $.trim(e) && heyzine.controls.search.startSearch(decodeURIComponent(e));
                            }
                            i("");
                        })
                        .catch((e) => {
                            n(e);
                        });
            });
        },
        storage: {
            getItem: function (e) {
                try {
                    return localStorage.getItem(e);
                } catch (e) {
                    return console.log("localStorage not available"), null;
                }
            },
            setItem: function (e, t) {
                try {
                    return localStorage.setItem(e, t), e;
                } catch (e) {
                    return console.log("localStorage not available"), null;
                }
            },
            removeItem: function (e) {
                try {
                    return localStorage.removeItem(e), e;
                } catch (e) {
                    return console.log("localStorage not available"), null;
                }
            },
        },
        refreshSession: function () {
            heyzine.url.indexOf("/private/" + heyzine.config.name) > 0 &&
                setInterval(() => {
                    $.getJSON("/private/session/" + heyzine.config.name, function (e) {
                        (heyzine.pdf._transport._fullReader._stream.source.url = e.url), (heyzine.url = e.url), $(".down-pdf").attr("href", e.download);
                    });
                }, 3e5);
        },
        adjustResolution: function (e) {
            null == e && (e = 500),
                (this.timerRes = !0),
                setTimeout(() => {
                    const e = heyzine.getVisiblePages();
                    for (let t = 0; t < e.length; t++) {
                        const i = e[t];
                        let n = $("[page=" + e[t] + "] .page-cont.p" + e[t]);
                        heyzine
                            .loadPageView(i, n, "normal")
                            .then(() => {
                                this.timerRes = !1;
                            })
                            .catch(() => {});
                    }
                }, e);
        },
        startAutoPlay: function () {},
        firstInteraction: function () {
            this.firstInteractionState || (console.log("first interaction"), heyzine.layers.firstInteraction(), (this.firstInteractionState = !0));
            const e = heyzine.controls.sound.getSoundEnabled();
            heyzine.layers.userInteraction(e), null != heyzine.peelAnimation && null != heyzine.peelAnimation.timer && (clearInterval(heyzine.peelAnimation.timer), (heyzine.peelAnimation.timer = null));
        },
        setEditMode: function (e) {
            heyzine.viewer.setEditMode(e), heyzine.controls.setEditMode(e), heyzine.layers.setEditMode(e);
        },
        setPageDisplay: function (e) {
            heyzine.layers.setPageDisplay(e);
        },
        resizeViewport: function () {
            if ($.isTouch) {
                let e = window.innerHeight + "px";
                scaler.isSamsungBrowser() && (e = window.innerHeight > window.innerWidth ? "calc(100vh - 96px)" : "calc(100vh - 48px)"),
                    ($("#canvas").prop("style").marginTop = "1px"),
                    $("body").css("height", e),
                    $(".logo-backs").css("height", e),
                    setTimeout(() => {
                        $("#canvas").prop("style").marginTop = "0";
                    }, 500);
            }
            null != heyzine.controls && heyzine.controls.resizeViewport(), null != heyzine.viewer && heyzine.viewer.resizeViewport();
        },
        render: function () {
            null != heyzine.config && null != heyzine.design && heyzine.viewer.render(heyzine.config, heyzine.design.data), heyzine.setCssVariables();
        },
        setCssVariables: function () {
            let e;
            (e = $(".magazine").length > 0 ? $(".magazine").outerWidth() : $(".magazine-viewport").length > 0 ? $(".magazine-viewport").outerWidth() : $("#canvas").outerWidth()),
                document.documentElement.style.setProperty("--fborder", Math.round(0.024 * e) + "px");
        },
        getCurrentPage: function (e) {
            if (null == heyzine || null == heyzine.viewer) {
                const e = Hash.fragment();
                return null != e && "" != $.trim(e.replace("page/", "")) ? parseInt(e.replace("page/", "")) : null;
            }
            return heyzine.viewer.getCurrentPage();
        },
        isVisiblePage: function (e) {
            const t = heyzine.viewer.getVisiblePages();
            if (null != t && t.length > 0) for (let i = 0; i < t.length; i++) if (t[i] == e) return !0;
            return !1;
        },
        getVisiblePages: function (e) {
            return heyzine.viewer.getVisiblePages(e);
        },
        getVisiblePagesElements: function () {
            return heyzine.viewer.getVisiblePagesElements();
        },
        getZoomScale: function () {
            return heyzine.controls.getZoomScale();
        },
        isLandscape: function () {
            return this.config.width > this.config.height;
        },
        isSinglePage: function () {
            let e,
                t = $("#canvas").width(),
                i = $("#canvas").height();
            return "SWIPER" == this.config.viewer ? (e = !0) : 0 == this.design.data.show_double ? (e = t < 750 && t <= i) : 1 == this.design.data.show_double ? (e = !1) : 2 == this.design.data.show_double && (e = !0), e;
        },
        isLastPage: function (e) {
            return heyzine.viewer.isLastPage(e);
        },
        showLoader: (e, t, i) => {},
        turned: function (e, t) {
            if (
                "end" != t &&
                (heyzine.controls.turned(e),
                heyzine.layers.turned(e),
                heyzine.adjustResolution(0),
                -1 === heyzine.design.data.load_page && heyzine.storage.setItem("lastpage-" + heyzine.config.name, e),
                $(document).trigger("heyzineTurned", [heyzine.config.name, e]),
                "undefined" != typeof heyzinea && null != heyzinea.api && null != heyzinea.api.flipbook && null != heyzinea.api.flipbook.onPageChange)
            ) {
                const e = heyzine.getVisiblePages();
                for (let t = 0; t < e.length; t++) heyzinea.api.flipbook.onPageChange({ id: heyzine.config.name, page: e[t], numPages: heyzine.config.num_pages });
            }
        },
        turning: (e) => {
            heyzine.controls.turning(e), heyzine.layers.turning(e), $(document).trigger("heyzineTurning", [heyzine.config.name, e]);
        },
        peelStart: function (e) {
            heyzine.controls.peelStart(e);
        },
        peelEnd: function (e, t) {
            heyzine.controls.peelEnd(e, t);
        },
        loadPageView: (e, t, i) => {
            heyzine.loadPageView(e, t, i);
        },
        loadPageLayers: (e, t, i) => {
            heyzine.layers.loadPageLayers(e, t, i);
        },
        loadPageThumbnails: (e, t, i) => {
            heyzine.loadPageThumbnails(e, t, i);
        },
        navigate: function (e, t) {
            "newtab" === t ? window.open(e, "_blank") : (document.location.href = e);
        },
        goToPage: (e, t) => {
            heyzine.viewer.goToPage(e, t);
        },
        setZoom: (e, t, i) => {
            heyzine.controls.setZoom(e, t, i);
        },
        setPageCache: function (e, t, i, n) {
            const o = "hz_cache_" + Math.trunc(i) + "_p_" + e + "_" + t + "_" + heyzine.url;
            this.isSessionStorageEnabled() ? sessionStorage.setItem(o, n) : (window.hstorage[o] = n);
        },
        getPageCache: function (e, t, i) {
            const n = "hz_cache_" + Math.trunc(i) + "_p_" + e + "_" + t + "_" + heyzine.url;
            return this.isSessionStorageEnabled() ? sessionStorage.getItem(n) : window.hstorage[n];
        },
        clearPageCache: function () {
            this.isSessionStorageEnabled()
                ? Object.keys(sessionStorage).forEach((e) => {
                      console.log(e), "hz_cache_" == e.substr(0, 9) && sessionStorage.removeItem(e);
                  })
                : Object.keys(window.hstorage).forEach((e) => {
                      console.log(e), "hz_cache_" == e.substr(0, 9) && delete window.hstorage[e];
                  });
        },
        isSessionStorageEnabled: function () {
            try {
                var e = "__test__";
                return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0;
            } catch (e) {
                return null == window.hstorage && (window.hstorage = []), !1;
            }
        },
        progressBar: function (e, t) {
            if ("start" == e || this.progressState.started) {
                if ("start" == e) $("#loaderLine").show(), (this.progressState.started = !0), (this.progressState.ended = 0), (this.progressState.progress = 0), (this.progressState.numIndicators = t.num);
                else if ("progress" == e) this.progressState.progress += t.inc / this.progressState.numIndicators;
                else {
                    if ("end" == e)
                        return (
                            this.progressState.ended++,
                            void (
                                this.progressState.ended >= this.progressState.numIndicators &&
                                ((this.progressState.started = !1),
                                $("#loaderLine").css("width", $(window).width() + "px"),
                                setTimeout(() => {
                                    $("#loaderLine").hide();
                                }, 200))
                            )
                        );
                    "cancel" == e && ((this.progressState.started = !1), $("#loaderLine").hide());
                }
                $("#loaderLine").css("width", (this.progressState.progress * $(window).width()) / 100 + "px");
            }
        },
        parseUrl: function (e) {
            var t,
                i,
                n,
                o,
                s = {},
                a = e || window.location.href;
            if ("string" == typeof a && a.length)
                for (
                    o = (i = (a = a.indexOf("?") > -1 ? a.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                        return "" !== e;
                    })).length,
                        t = 0;
                    t < o;
                    t += 1
                )
                    (n = i[t].replace(/#\S+/g, "").split("=")), (s[decodeURIComponent(n[0])] = void 0 === n[1] ? void 0 : decodeURIComponent(n[1]) || "");
            return s;
        },
        getBound: function () {
            let e = $("#canvas").width(),
                t = $("#canvas").height(),
                i = this.config.width,
                n = { width: i, height: this.config.height };
            (i = (this.isSinglePage(), this.config.width)), (n.isSingle = !1);
            let o = { boundWidth: e, boundHeight: t },
                s = i / n.height;
            return (
                s <= o.boundWidth / o.boundHeight ? ((n.width = Math.round(o.boundHeight * s)), (n.height = o.boundHeight), (n.fit = "height")) : ((n.width = o.boundWidth), (n.height = Math.round(o.boundWidth / s)), (n.fit = "width")), n
            );
        },
        setZoomViewer: (e, t) => heyzine.viewer.setZoom(e, t),
        coverPagesClass: (e, t) => {
            const i = heyzine.config;
            var n = $(e).closest(".page");
            t - heyzine.design.data.cover == 1 ? n.addClass("page-first") : t - heyzine.design.data.cover == i.num_pages && n.addClass("page-last");
        },
    }),
    null == heyzine.lang && (heyzine.lang = {}),
    null == heyzine.lang.text && (heyzine.lang.text = {}),
    (heyzine.lang.text.ca = {
        page: "PГ gina",
        search: "Cercar text",
        searching: "Cercant...",
        noresults: "No sВґha trobat resultats",
        first: "Primera pГ gina",
        last: "Гљltima pГ gina",
        prev: "PГ gina anterior",
        next: "PГ gina segГјent",
        fullscreen: "Pantalla completa",
        sound: "So activat / desactivat",
        zoom: "Zoom",
        zoomin: "Ampliar zoom",
        zoomout: "Allunyar zoom",
        zoomreset: "Restablir zoom",
        download: "Descarregar",
        share: "Compartir",
        print: "Imprimir",
        send: "Envia",
        skip: "Salta",
        privacy: 'Accepto la <a href="{link}" target="_BLANK">polГ­tica de privacitat</a> de {company}.',
        bookmark_add: "Afegir marcador",
        table_contents: "Taula de continguts",
        thumbnails: "Miniatures",
        outline: "ГЌndex",
        bookmark: "Marcadors",
        close: "Tanca",
    }),
    null == heyzine.lang && (heyzine.lang = {}),
    null == heyzine.lang.text && (heyzine.lang.text = {}),
    (heyzine.lang.text.de = {
        page: "Seite",
        search: "Text suchen",
        searching: "Auf der Suche nach...",
        noresults: "Keine Ergebnisse gefunden",
        first: "Titelseite",
        last: "Letzte Seite",
        prev: "Vorherige Seite",
        next: "NГ¤chste Seite",
        fullscreen: "Vollbild",
        sound: "Ton ein / aus",
        zoom: "Zoom",
        zoomin: "VergrГ¶Гџern",
        zoomout: "Herauszoomen",
        zoomreset: "Zoom zurГјcksetzen",
        download: "Herunterladen",
        share: "Teilen",
        print: "Drucken",
        send: "Senden Sie",
        skip: "Гњberspringen",
        privacy: 'Ich akzeptiere die <a href="{link}" target="_BLANK">Datenschutzbestimmungen</a> von {company}.',
        bookmark_add: "Lesezeichen hinzufГјgen",
        table_contents: "InhaltsГјbersicht",
        thumbnails: "Thumbnails",
        outline: "Index",
        bookmark: "Lesezeichen",
        close: "SchlieГџen",
    }),
    null == heyzine.lang && (heyzine.lang = {}),
    null == heyzine.lang.text && (heyzine.lang.text = {}),
    (heyzine.lang.text.en = {
        page: "Page",
        search: "Search text",
        searching: "Searching...",
        noresults: "No results found",
        first: "First page",
        last: "Last page",
        prev: "Previous page",
        next: "Next page",
        fullscreen: "Full screen",
        sound: "Sound off / on",
        zoom: "Zoom",
        zoomin: "Zoom in",
        zoomout: "Zoom out",
        zoomreset: "Zoom reset",
        download: "Download",
        share: "Share",
        print: "Print",
        send: "Send",
        skip: "Skip",
        privacy: 'I accept {company}\'s <a href="{link}" target="_BLANK">privacy policy</a>.',
        bookmark_add: "Add bookmark",
        table_contents: "Table of contents",
        thumbnails: "Thumbnails",
        outline: "Index",
        bookmark: "Bookmarks",
        close: "Close",
    }),
    null == heyzine.lang && (heyzine.lang = {}),
    null == heyzine.lang.text && (heyzine.lang.text = {}),
    (heyzine.lang.text.es = {
        page: "PГЎgina",
        search: "Buscar texto",
        searching: "Buscando...",
        noresults: "No se ha encontrado resultados",
        first: "Primera pГЎgina",
        last: "Гљltima pГЎgina",
        prev: "PГЎgina anterior",
        next: "PГЎgina siguiente",
        fullscreen: "Pantalla completa",
        sound: "Sonido activado / desactivado",
        zoom: "Zoom",
        zoomin: "Ampliar zoom",
        zoomout: "Alejar zoom",
        zoomreset: "Restablecer zoom",
        download: "Descargar",
        share: "Compartir",
        print: "Imprimir",
        send: "Enviar",
        skip: "Saltar",
        privacy: 'Acepto la <a href="{link}" target="_BLANK">polГ­tica de privacidad</a> de {company}.',
        bookmark_add: "AГ±adir marcador",
        table_contents: "Tabla de contenidos",
        thumbnails: "Miniaturas",
        outline: "ГЌndice",
        bookmark: "Marcadores",
        close: "Cerrar",
    }),
    null == heyzine.lang && (heyzine.lang = {}),
    null == heyzine.lang.text && (heyzine.lang.text = {}),
    (heyzine.lang.text.fr = {
        page: "Page",
        search: "Recherche de texte",
        searching: "Cherche...",
        noresults: "Aucun rГ©sultat trouvГ©",
        first: "PremiГЁre page",
        last: "DerniГЁre page",
        prev: "Page prГ©cГ©dente",
        next: "Page suivante",
        fullscreen: "Plein Г©cran",
        sound: "Son activГ© / dГ©sactivГ©",
        zoom: "Zoom",
        zoomin: "Zoom avant",
        zoomout: "Zoom arriГЁre",
        zoomreset: "RГ©initialiser le zoom",
        download: "TГ©lГ©charger",
        share: "Partager",
        print: "Imprimer",
        send: "Envoyer",
        skip: "Skip",
        privacy: 'J\'accepte la <a href="{link}" target="_BLANK">politique de confidentialitГ©</a> de {company}.',
        bookmark_add: "Ajouter un marqueur",
        table_contents: "Table de matiГЁres",
        thumbnails: "Miniatures",
        outline: "Indice",
        bookmark: "Marqueurs",
        close: "Fermer",
    }),
    null == heyzine.lang && (heyzine.lang = {}),
    null == heyzine.lang.text && (heyzine.lang.text = {}),
    (heyzine.lang.text.pt = {
        page: "PГЎgina",
        search: "Procurar texto",
        searching: "Procurando...",
        noresults: "NГЈo foram encontrados resultados",
        first: "Primeira pГЎgina",
        last: "Гљltima pГЎgina",
        prev: "PГЎgina anterior",
        next: "PГЎgina seguinte",
        fullscreen: "EcrГЈ inteiro",
        sound: "Som ligado / desligado",
        zoom: "Zoom",
        zoomin: "Ampliar",
        zoomout: "Diminuir",
        zoomreset: "Reiniciar zoom",
        download: "Descarregar",
        share: "Partilha",
        print: "Imprimir",
        send: "Enviar",
        skip: "Pular",
        privacy: 'Aceito a <a href="{link}" target="_BLANK">polГ­tica de privacidade</a> de {company}.',
        bookmark_add: "Adicionar um marcador",
        table_contents: "ГЌndice de conteГєdos",
        thumbnails: "Miniaturas",
        outline: "ГЌndice",
        bookmark: "Marcadores",
        close: "Fechar",
    }),
    null == heyzine.lang && (heyzine.lang = {}),
    (heyzine.lang.translate = {
        lang: null,
        init: function () {
            let e = this.getLangCode();
            null != e && (-1 !== e.indexOf("-") && (e = e.split("-")[0]), -1 !== e.indexOf("_") && (e = e.split("_")[0])), (this.lang = e);
        },
        fromKey: function (e) {
            let t = "en";
            return null != heyzine.lang.text[this.lang] && (t = this.lang), null != heyzine.lang.text[t][e] ? heyzine.lang.text[t][e] : "";
        },
        getLangCode: function () {
            var e,
                t,
                i = window.navigator,
                n = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
            if (Array.isArray(i.languages)) for (e = 0; e < i.languages.length; e++) if ((t = i.languages[e]) && t.length) return t;
            for (e = 0; e < n.length; e++) if ((t = i[n[e]]) && t.length) return t;
            return null;
        },
    });
