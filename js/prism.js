/* PrismJS 1.26.0
https://prismjs.com/download.html#themes=prism&languages=markup+json+json5+jsonp&plugins=line-highlight+line-numbers+autolinker+jsonp-highlight+match-braces */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function (u) {
        var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, n = 0, e = {}, M = {
            manual: u.Prism && u.Prism.manual,
            disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
            util: {
                encode: function e(n) {
                    return n instanceof W ? new W(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                }, type: function (e) {
                    return Object.prototype.toString.call(e).slice(8, -1)
                }, objId: function (e) {
                    return e.__id || Object.defineProperty(e, "__id", {value: ++n}), e.__id
                }, clone: function t(e, r) {
                    var a, n;
                    switch (r = r || {}, M.util.type(e)) {
                        case"Object":
                            if (n = M.util.objId(e), r[n]) return r[n];
                            for (var i in a = {}, r[n] = a, e) e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                            return a;
                        case"Array":
                            return n = M.util.objId(e), r[n] ? r[n] : (a = [], r[n] = a, e.forEach(function (e, n) {
                                a[n] = t(e, r)
                            }), a);
                        default:
                            return e
                    }
                }, getLanguage: function (e) {
                    for (; e;) {
                        var n = t.exec(e.className);
                        if (n) return n[1].toLowerCase();
                        e = e.parentElement
                    }
                    return "none"
                }, setLanguage: function (e, n) {
                    e.className = e.className.replace(RegExp(t, "gi"), ""), e.classList.add("language-" + n)
                }, currentScript: function () {
                    if ("undefined" == typeof document) return null;
                    if ("currentScript" in document) return document.currentScript;
                    try {
                        throw new Error
                    } catch (e) {
                        var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) || [])[1];
                        if (n) {
                            var t = document.getElementsByTagName("script");
                            for (var r in t) if (t[r].src == n) return t[r]
                        }
                        return null
                    }
                }, isActive: function (e, n, t) {
                    for (var r = "no-" + n; e;) {
                        var a = e.classList;
                        if (a.contains(n)) return !0;
                        if (a.contains(r)) return !1;
                        e = e.parentElement
                    }
                    return !!t
                }
            },
            languages: {
                plain: e, plaintext: e, text: e, txt: e, extend: function (e, n) {
                    var t = M.util.clone(M.languages[e]);
                    for (var r in n) t[r] = n[r];
                    return t
                }, insertBefore: function (t, e, n, r) {
                    var a = (r = r || M.languages)[t], i = {};
                    for (var l in a) if (a.hasOwnProperty(l)) {
                        if (l == e) for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                        n.hasOwnProperty(l) || (i[l] = a[l])
                    }
                    var s = r[t];
                    return r[t] = i, M.languages.DFS(M.languages, function (e, n) {
                        n === s && e != t && (this[e] = i)
                    }), i
                }, DFS: function e(n, t, r, a) {
                    a = a || {};
                    var i = M.util.objId;
                    for (var l in n) if (n.hasOwnProperty(l)) {
                        t.call(n, l, n[l], r || l);
                        var o = n[l], s = M.util.type(o);
                        "Object" !== s || a[i(o)] ? "Array" !== s || a[i(o)] || (a[i(o)] = !0, e(o, t, l, a)) : (a[i(o)] = !0, e(o, t, null, a))
                    }
                }
            },
            plugins: {},
            highlightAll: function (e, n) {
                M.highlightAllUnder(document, e, n)
            },
            highlightAllUnder: function (e, n, t) {
                var r = {
                    callback: t,
                    container: e,
                    selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                };
                M.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), M.hooks.run("before-all-elements-highlight", r);
                for (var a, i = 0; a = r.elements[i++];) M.highlightElement(a, !0 === n, r.callback)
            },
            highlightElement: function (e, n, t) {
                var r = M.util.getLanguage(e), a = M.languages[r];
                M.util.setLanguage(e, r);
                var i = e.parentElement;
                i && "pre" === i.nodeName.toLowerCase() && M.util.setLanguage(i, r);
                var l = {element: e, language: r, grammar: a, code: e.textContent};

                function o(e) {
                    l.highlightedCode = e, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), t && t.call(l.element)
                }

                if (M.hooks.run("before-sanity-check", l), (i = l.element.parentElement) && "pre" === i.nodeName.toLowerCase() && !i.hasAttribute("tabindex") && i.setAttribute("tabindex", "0"), !l.code) return M.hooks.run("complete", l), void (t && t.call(l.element));
                if (M.hooks.run("before-highlight", l), l.grammar) if (n && u.Worker) {
                    var s = new Worker(M.filename);
                    s.onmessage = function (e) {
                        o(e.data)
                    }, s.postMessage(JSON.stringify({language: l.language, code: l.code, immediateClose: !0}))
                } else o(M.highlight(l.code, l.grammar, l.language)); else o(M.util.encode(l.code))
            },
            highlight: function (e, n, t) {
                var r = {code: e, grammar: n, language: t};
                return M.hooks.run("before-tokenize", r), r.tokens = M.tokenize(r.code, r.grammar), M.hooks.run("after-tokenize", r), W.stringify(M.util.encode(r.tokens), r.language)
            },
            tokenize: function (e, n) {
                var t = n.rest;
                if (t) {
                    for (var r in t) n[r] = t[r];
                    delete n.rest
                }
                var a = new i;
                return I(a, a.head, e), function e(n, t, r, a, i, l) {
                    for (var o in r) if (r.hasOwnProperty(o) && r[o]) {
                        var s = r[o];
                        s = Array.isArray(s) ? s : [s];
                        for (var u = 0; u < s.length; ++u) {
                            if (l && l.cause == o + "," + u) return;
                            var c = s[u], g = c.inside, f = !!c.lookbehind, h = !!c.greedy, d = c.alias;
                            if (h && !c.pattern.global) {
                                var v = c.pattern.toString().match(/[imsuy]*$/)[0];
                                c.pattern = RegExp(c.pattern.source, v + "g")
                            }
                            for (var p = c.pattern || c, m = a.next, y = i; m !== t.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                                var k = m.value;
                                if (t.length > n.length) return;
                                if (!(k instanceof W)) {
                                    var x, b = 1;
                                    if (h) {
                                        if (!(x = z(p, y, n, f)) || x.index >= n.length) break;
                                        var w = x.index, A = x.index + x[0].length, P = y;
                                        for (P += m.value.length; P <= w;) m = m.next, P += m.value.length;
                                        if (P -= m.value.length, y = P, m.value instanceof W) continue;
                                        for (var E = m; E !== t.tail && (P < A || "string" == typeof E.value); E = E.next) b++, P += E.value.length;
                                        b--, k = n.slice(y, P), x.index -= y
                                    } else if (!(x = z(p, 0, k, f))) continue;
                                    var w = x.index, L = x[0], S = k.slice(0, w), O = k.slice(w + L.length),
                                        j = y + k.length;
                                    l && j > l.reach && (l.reach = j);
                                    var C = m.prev;
                                    S && (C = I(t, C, S), y += S.length), q(t, C, b);
                                    var N = new W(o, g ? M.tokenize(L, g) : L, d, L);
                                    if (m = I(t, C, N), O && I(t, m, O), 1 < b) {
                                        var _ = {cause: o + "," + u, reach: j};
                                        e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach)
                                    }
                                }
                            }
                        }
                    }
                }(e, a, n, a.head, 0), function (e) {
                    var n = [], t = e.head.next;
                    for (; t !== e.tail;) n.push(t.value), t = t.next;
                    return n
                }(a)
            },
            hooks: {
                all: {}, add: function (e, n) {
                    var t = M.hooks.all;
                    t[e] = t[e] || [], t[e].push(n)
                }, run: function (e, n) {
                    var t = M.hooks.all[e];
                    if (t && t.length) for (var r, a = 0; r = t[a++];) r(n)
                }
            },
            Token: W
        };

        function W(e, n, t, r) {
            this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length
        }

        function z(e, n, t, r) {
            e.lastIndex = n;
            var a = e.exec(t);
            if (a && r && a[1]) {
                var i = a[1].length;
                a.index += i, a[0] = a[0].slice(i)
            }
            return a
        }

        function i() {
            var e = {value: null, prev: null, next: null}, n = {value: null, prev: e, next: null};
            e.next = n, this.head = e, this.tail = n, this.length = 0
        }

        function I(e, n, t) {
            var r = n.next, a = {value: t, prev: n, next: r};
            return n.next = a, r.prev = a, e.length++, a
        }

        function q(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
            (n.next = r).prev = n, e.length -= a
        }

        if (u.Prism = M, W.stringify = function n(e, t) {
            if ("string" == typeof e) return e;
            if (Array.isArray(e)) {
                var r = "";
                return e.forEach(function (e) {
                    r += n(e, t)
                }), r
            }
            var a = {
                type: e.type,
                content: n(e.content, t),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: t
            }, i = e.alias;
            i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run("wrap", a);
            var l = "";
            for (var o in a.attributes) l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
            return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l + ">" + a.content + "</" + a.tag + ">"
        }, !u.document) return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function (e) {
            var n = JSON.parse(e.data), t = n.language, r = n.code, a = n.immediateClose;
            u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close()
        }, !1)), M;
        var r = M.util.currentScript();

        function a() {
            M.manual || M.highlightAll()
        }

        if (r && (M.filename = r.src, r.hasAttribute("data-manual") && (M.manual = !0)), !M.manual) {
            var l = document.readyState;
            "loading" === l || "interactive" === l && r && r.defer ? document.addEventListener("DOMContentLoaded", a) : window.requestAnimationFrame ? window.requestAnimationFrame(a) : window.setTimeout(a, 16)
        }
        return M
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: {pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0},
    prolog: {pattern: /<\?[\s\S]+?\?>/, greedy: !0},
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            "internal-subset": {pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null},
            string: {pattern: /"[^"]*"|'[^']*'/, greedy: !0},
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            name: /[^\s<>'"]+/
        }
    },
    cdata: {pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0},
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {pattern: /^<\/?[^\s>\/]+/, inside: {punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/}},
            "special-attr": [],
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {punctuation: [{pattern: /^=/, alias: "attr-equals"}, /"|'/]}
            },
            punctuation: /\/?>/,
            "attr-name": {pattern: /[^\s>\/]+/, inside: {namespace: /^[^\s>\/:]+:/}}
        }
    },
    entity: [{pattern: /&[\da-z]{1,8};/i, alias: "named-entity"}, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
        var s = {};
        s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var t = {"included-cdata": {pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s}};
        t["language-" + e] = {pattern: /[\s\S]+/, inside: Prism.languages[e]};
        var n = {};
        n[a] = {
            pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
                return a
            }), "i"), lookbehind: !0, greedy: !0, inside: t
        }, Prism.languages.insertBefore("markup", "cdata", n)
    }
}), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (a, e) {
        Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
            lookbehind: !0,
            inside: {
                "attr-name": /^[^\s=]+/,
                "attr-value": {
                    pattern: /=[\s\S]+/,
                    inside: {
                        value: {
                            pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                            lookbehind: !0,
                            alias: [e, "language-" + e],
                            inside: Prism.languages[e]
                        }, punctuation: [{pattern: /^=/, alias: "attr-equals"}, /"|'/]
                    }
                }
            }
        })
    }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
Prism.languages.json = {
    property: {pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0},
    string: {pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0},
    comment: {pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0},
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:false|true)\b/,
    null: {pattern: /\bnull\b/, alias: "keyword"}
}, Prism.languages.webmanifest = Prism.languages.json;
!function (n) {
    var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
    n.languages.json5 = n.languages.extend("json", {
        property: [{
            pattern: RegExp(e.source + "(?=\\s*:)"),
            greedy: !0
        }, {pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/, alias: "unquoted"}],
        string: {pattern: e, greedy: !0},
        number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/
    })
}(Prism);
Prism.languages.jsonp = Prism.languages.extend("json", {punctuation: /[{}[\]();,.]/}), Prism.languages.insertBefore("jsonp", "punctuation", {function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/});
!function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document && document.querySelector) {
        var t, o = "line-numbers", s = "linkable-line-numbers", l = function () {
            if (void 0 === t) {
                var e = document.createElement("div");
                e.style.fontSize = "13px", e.style.lineHeight = "1.5", e.style.padding = "0", e.style.border = "0", e.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(e), t = 38 === e.offsetHeight, document.body.removeChild(e)
            }
            return t
        }, a = !0;
        Prism.plugins.lineHighlight = {
            highlightLines: function (u, e, c) {
                var t = (e = "string" == typeof e ? e : u.getAttribute("data-line") || "").replace(/\s+/g, "").split(",").filter(Boolean),
                    d = +u.getAttribute("data-line-offset") || 0,
                    h = (l() ? parseInt : parseFloat)(getComputedStyle(u).lineHeight), f = Prism.util.isActive(u, o),
                    i = u.querySelector("code"), p = f ? u : i || u, g = [], m = i && p != i ? function (e, t) {
                        var i = getComputedStyle(e), n = getComputedStyle(t);

                        function r(e) {
                            return +e.substr(0, e.length - 2)
                        }

                        return t.offsetTop + r(n.borderTopWidth) + r(n.paddingTop) - r(i.paddingTop)
                    }(u, i) : 0;
                t.forEach(function (e) {
                    var t = e.split("-"), i = +t[0], n = +t[1] || i,
                        r = u.querySelector('.line-highlight[data-range="' + e + '"]') || document.createElement("div");
                    if (g.push(function () {
                        r.setAttribute("aria-hidden", "true"), r.setAttribute("data-range", e), r.className = (c || "") + " line-highlight"
                    }), f && Prism.plugins.lineNumbers) {
                        var o = Prism.plugins.lineNumbers.getLine(u, i), s = Prism.plugins.lineNumbers.getLine(u, n);
                        if (o) {
                            var l = o.offsetTop + m + "px";
                            g.push(function () {
                                r.style.top = l
                            })
                        }
                        if (s) {
                            var a = s.offsetTop - o.offsetTop + s.offsetHeight + "px";
                            g.push(function () {
                                r.style.height = a
                            })
                        }
                    } else g.push(function () {
                        r.setAttribute("data-start", String(i)), i < n && r.setAttribute("data-end", String(n)), r.style.top = (i - d - 1) * h + m + "px", r.textContent = new Array(n - i + 2).join(" \n")
                    });
                    g.push(function () {
                        r.style.width = u.scrollWidth + "px"
                    }), g.push(function () {
                        p.appendChild(r)
                    })
                });
                var n = u.id;
                if (f && Prism.util.isActive(u, s) && n) {
                    y(u, s) || g.push(function () {
                        u.classList.add(s)
                    });
                    var r = parseInt(u.getAttribute("data-start") || "1");
                    v(".line-numbers-rows > span", u).forEach(function (e, t) {
                        var i = t + r;
                        e.onclick = function () {
                            var e = n + "." + i;
                            a = !1, location.hash = e, setTimeout(function () {
                                a = !0
                            }, 1)
                        }
                    })
                }
                return function () {
                    g.forEach(b)
                }
            }
        };
        var u = 0;
        Prism.hooks.add("before-sanity-check", function (e) {
            var t = e.element.parentElement;
            if (c(t)) {
                var i = 0;
                v(".line-highlight", t).forEach(function (e) {
                    i += e.textContent.length, e.parentNode.removeChild(e)
                }), i && /^(?: \n)+$/.test(e.code.slice(-i)) && (e.code = e.code.slice(0, -i))
            }
        }), Prism.hooks.add("complete", function e(t) {
            var i = t.element.parentElement;
            if (c(i)) {
                clearTimeout(u);
                var n = Prism.plugins.lineNumbers, r = t.plugins && t.plugins.lineNumbers;
                if (y(i, o) && n && !r) Prism.hooks.add("line-numbers", e); else Prism.plugins.lineHighlight.highlightLines(i)(), u = setTimeout(d, 1)
            }
        }), window.addEventListener("hashchange", d), window.addEventListener("DOMContentLoaded", function () {
            v("pre").filter(c).map(function (e) {
                return Prism.plugins.lineHighlight.highlightLines(e)
            }).forEach(b)
        }), window.addEventListener("click", function () {
            setTimeout(function() {
            v("pre").filter(c).map(function (e) {
                return Prism.plugins.lineHighlight.highlightLines(e)
            }).forEach(b);}, 500);
        });
    }

    function v(e, t) {
        return Array.prototype.slice.call((t || document).querySelectorAll(e))
    }

    function y(e, t) {
        return e.classList.contains(t)
    }

    function b(e) {
        e()
    }

    function c(e) {
        return !(!e || !/pre/i.test(e.nodeName)) && (!!e.hasAttribute("data-line"))
    }

    function d() {
        var e = location.hash.slice(1);
        v(".temporary.line-highlight").forEach(function (e) {
            e.parentNode.removeChild(e)
        });
        var t = (e.match(/\.([\d,-]+)$/) || [, ""])[1];
        if (t && !document.getElementById(e)) {
            var i = e.slice(0, e.lastIndexOf(".")), n = document.getElementById(i);
            if (n) n.hasAttribute("data-line") || n.setAttribute("data-line", ""), Prism.plugins.lineHighlight.highlightLines(n, t, "temporary ")(), a && document.querySelector(".temporary.line-highlight").scrollIntoView()
        }
    }
}();
!function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var o = "line-numbers", a = /\n(?!$)/g, e = Prism.plugins.lineNumbers = {
            getLine: function (e, n) {
                if ("PRE" === e.tagName && e.classList.contains(o)) {
                    var t = e.querySelector(".line-numbers-rows");
                    if (t) {
                        var i = parseInt(e.getAttribute("data-start"), 10) || 1, r = i + (t.children.length - 1);
                        n < i && (n = i), r < n && (n = r);
                        var s = n - i;
                        return t.children[s]
                    }
                }
            }, resize: function (e) {
                u([e])
            }, assumeViewportIndependence: !0
        }, n = void 0;
        window.addEventListener("resize", function () {
            e.assumeViewportIndependence && n === window.innerWidth || (n = window.innerWidth, u(Array.prototype.slice.call(document.querySelectorAll("pre." + o))))
        }), Prism.hooks.add("complete", function (e) {
            if (e.code) {
                var n = e.element, t = n.parentNode;
                if (t && /pre/i.test(t.nodeName) && !n.querySelector(".line-numbers-rows") && Prism.util.isActive(n, o)) {
                    n.classList.remove(o), t.classList.add(o);
                    var i, r = e.code.match(a), s = r ? r.length + 1 : 1, l = new Array(s + 1).join("<span></span>");
                    (i = document.createElement("span")).setAttribute("aria-hidden", "true"), i.className = "line-numbers-rows", i.innerHTML = l, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)), e.element.appendChild(i), u([t]), Prism.hooks.run("line-numbers", e)
                }
            }
        }), Prism.hooks.add("line-numbers", function (e) {
            e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
        })
    }

    function u(e) {
        if (0 != (e = e.filter(function (e) {
            var n = function (e) {
                return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
            }(e)["white-space"];
            return "pre-wrap" === n || "pre-line" === n
        })).length) {
            var n = e.map(function (e) {
                var n = e.querySelector("code"), t = e.querySelector(".line-numbers-rows");
                if (n && t) {
                    var i = e.querySelector(".line-numbers-sizer"), r = n.textContent.split(a);
                    i || ((i = document.createElement("span")).className = "line-numbers-sizer", n.appendChild(i)), i.innerHTML = "0", i.style.display = "block";
                    var s = i.getBoundingClientRect().height;
                    return i.innerHTML = "", {element: e, lines: r, lineHeights: [], oneLinerHeight: s, sizer: i}
                }
            }).filter(Boolean);
            n.forEach(function (e) {
                var i = e.sizer, n = e.lines, r = e.lineHeights, s = e.oneLinerHeight;
                r[n.length - 1] = void 0, n.forEach(function (e, n) {
                    if (e && 1 < e.length) {
                        var t = i.appendChild(document.createElement("span"));
                        t.style.display = "block", t.textContent = e
                    } else r[n] = s
                })
            }), n.forEach(function (e) {
                for (var n = e.sizer, t = e.lineHeights, i = 0, r = 0; r < t.length; r++) void 0 === t[r] && (t[r] = n.children[i++].getBoundingClientRect().height)
            }), n.forEach(function (e) {
                var n = e.sizer, t = e.element.querySelector(".line-numbers-rows");
                n.style.display = "none", n.innerHTML = "", e.lineHeights.forEach(function (e, n) {
                    t.children[n].style.height = e + "px"
                })
            })
        }
    }
}();
!function () {
    if ("undefined" != typeof Prism) {
        var e = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
            r = /\b\S+@[\w.]+[a-z]{2}/, a = /\[([^\]]+)\]\(([^)]+)\)/, l = ["comment", "url", "attr-value", "string"];
        Prism.plugins.autolinker = {
            processGrammar: function (i) {
                i && !i["url-link"] && (Prism.languages.DFS(i, function (i, n, t) {
                    -1 < l.indexOf(t) && !Array.isArray(n) && (n.pattern || (n = this[i] = {pattern: n}), n.inside = n.inside || {}, "comment" == t && (n.inside["md-link"] = a), "attr-value" == t ? Prism.languages.insertBefore("inside", "punctuation", {"url-link": e}, n) : n.inside["url-link"] = e, n.inside["email-link"] = r)
                }), i["url-link"] = e, i["email-link"] = r)
            }
        }, Prism.hooks.add("before-highlight", function (i) {
            Prism.plugins.autolinker.processGrammar(i.grammar)
        }), Prism.hooks.add("wrap", function (i) {
            if (/-link$/.test(i.type)) {
                i.tag = "a";
                var n = i.content;
                if ("email-link" == i.type && 0 != n.indexOf("mailto:")) n = "mailto:" + n; else if ("md-link" == i.type) {
                    var t = i.content.match(a);
                    n = t[2], i.content = t[1]
                }
                i.attributes.href = n;
                try {
                    i.content = decodeURIComponent(i.content)
                } catch (i) {
                }
            }
        })
    }
}();
!function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var s = [];
        t(function (t) {
            if (t && t.meta && t.data) {
                if (t.meta.status && 400 <= t.meta.status) return "Error: " + (t.data.message || t.meta.status);
                if ("string" == typeof t.data.content) return "function" == typeof atob ? atob(t.data.content.replace(/\s/g, "")) : "Your browser cannot decode base64"
            }
            return null
        }, "github"), t(function (t, e) {
            if (t && t.meta && t.data && t.data.files) {
                if (t.meta.status && 400 <= t.meta.status) return "Error: " + (t.data.message || t.meta.status);
                var n = t.data.files, a = e.getAttribute("data-filename");
                if (null == a) for (var r in n) if (n.hasOwnProperty(r)) {
                    a = r;
                    break
                }
                return void 0 !== n[a] ? n[a].content : "Error: unknown or missing gist file " + a
            }
            return null
        }, "gist"), t(function (t) {
            return t && t.node && "string" == typeof t.data ? t.data : null
        }, "bitbucket");
        var f = 0, d = "data-jsonp-status", l = "loading", c = "loaded", m = "failed",
            p = "pre[data-jsonp]:not([" + d + '="' + c + '"]):not([' + d + '="' + l + '"])';
        Prism.hooks.add("before-highlightall", function (t) {
            t.selector += ", " + p
        }), Prism.hooks.add("before-sanity-check", function (t) {
            var r = t.element;
            if (r.matches(p)) {
                t.code = "", r.setAttribute(d, l);
                var i = r.appendChild(document.createElement("CODE"));
                i.textContent = "Loading…";
                var e = t.language;
                i.className = "language-" + e;
                var n = Prism.plugins.autoloader;
                n && n.loadLanguages(e);
                var a = r.getAttribute("data-adapter"), o = null;
                if (a) {
                    if ("function" != typeof window[a]) return r.setAttribute(d, m), void (i.textContent = function (t) {
                        return '✖ Error: JSONP adapter function "' + t + "\" doesn't exist"
                    }(a));
                    o = window[a]
                }
                var u = r.getAttribute("data-jsonp");
                !function (t, e, n, a) {
                    var r = "prismjsonp" + f++, i = document.createElement("a");
                    i.href = t, i.href += (i.search ? "&" : "?") + (e || "callback") + "=" + r;
                    var o = document.createElement("script");
                    o.src = i.href, o.onerror = function () {
                        s(), a("network")
                    };
                    var u = setTimeout(function () {
                        s(), a("timeout")
                    }, Prism.plugins.jsonphighlight.timeout);

                    function s() {
                        clearTimeout(u), document.head.removeChild(o), delete window[r]
                    }

                    window[r] = function (t) {
                        s(), n(t)
                    }, document.head.appendChild(o)
                }(u, r.getAttribute("data-callback"), function (t) {
                    var e = null;
                    if (o) e = o(t, r); else for (var n = 0, a = s.length; n < a && null === (e = s[n].adapter(t, r)); n++) ;
                    null === e ? (r.setAttribute(d, m), i.textContent = "✖ Error: Cannot parse response (perhaps you need an adapter function?)") : (r.setAttribute(d, c), i.textContent = e, Prism.highlightElement(i))
                }, function () {
                    r.setAttribute(d, m), i.textContent = function (t) {
                        return "✖ Error: Timeout loading " + t
                    }(u)
                })
            }
        }), Prism.plugins.jsonphighlight = {
            timeout: 5e3, registerAdapter: t, removeAdapter: function (e) {
                if ("string" == typeof e && (e = n(e)), "function" == typeof e) {
                    var t = s.findIndex(function (t) {
                        return t.adapter === e
                    });
                    0 <= t && s.splice(t, 1)
                }
            }, highlight: function (t) {
                for (var e, n = (t || document).querySelectorAll(p), a = 0; e = n[a++];) Prism.highlightElement(e)
            }
        }
    }

    function t(t, e) {
        e = e || t.name, "function" != typeof t || n(t) || n(e) || s.push({adapter: t, name: e})
    }

    function n(t) {
        if ("function" == typeof t) {
            for (var e = 0; n = s[e++];) if (n.adapter.valueOf() === t.valueOf()) return n.adapter
        } else if ("string" == typeof t) {
            var n;
            for (e = 0; n = s[e++];) if (n.name === t) return n.adapter
        }
        return null
    }
}();
!function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var d = {"(": ")", "[": "]", "{": "}"}, u = {"(": "brace-round", "[": "brace-square", "{": "brace-curly"},
            f = {"${": "{"}, h = 0, n = /^(pair-\d+-)(close|open)$/;
        Prism.hooks.add("complete", function (e) {
            var t = e.element, n = t.parentElement;
            if (n && "PRE" == n.tagName) {
                var r = [];
                if (Prism.util.isActive(t, "match-braces") && r.push("(", "[", "{"), 0 != r.length) {
                    n.__listenerAdded || (n.addEventListener("mousedown", function () {
                        var e = n.querySelector("code"), t = p("brace-selected");
                        Array.prototype.slice.call(e.querySelectorAll("." + t)).forEach(function (e) {
                            e.classList.remove(t)
                        })
                    }), Object.defineProperty(n, "__listenerAdded", {value: !0}));
                    var o = Array.prototype.slice.call(t.querySelectorAll("span." + p("token") + "." + p("punctuation"))),
                        l = [];
                    r.forEach(function (e) {
                        for (var t = d[e], n = p(u[e]), r = [], c = [], s = 0; s < o.length; s++) {
                            var i = o[s];
                            if (0 == i.childElementCount) {
                                var a = i.textContent;
                                (a = f[a] || a) === e ? (l.push({
                                    index: s,
                                    open: !0,
                                    element: i
                                }), i.classList.add(n), i.classList.add(p("brace-open")), c.push(s)) : a === t && (l.push({
                                    index: s,
                                    open: !1,
                                    element: i
                                }), i.classList.add(n), i.classList.add(p("brace-close")), c.length && r.push([s, c.pop()]))
                            }
                        }
                        r.forEach(function (e) {
                            var t = "pair-" + h++ + "-", n = o[e[0]], r = o[e[1]];
                            n.id = t + "open", r.id = t + "close", [n, r].forEach(function (e) {
                                e.addEventListener("mouseenter", v), e.addEventListener("mouseleave", m), e.addEventListener("click", b)
                            })
                        })
                    });
                    var c = 0;
                    l.sort(function (e, t) {
                        return e.index - t.index
                    }), l.forEach(function (e) {
                        e.open ? (e.element.classList.add(p("brace-level-" + (c % 12 + 1))), c++) : (c = Math.max(0, c - 1), e.element.classList.add(p("brace-level-" + (c % 12 + 1))))
                    })
                }
            }
        })
    }

    function p(e) {
        var t = Prism.plugins.customClass;
        return t ? t.apply(e, "none") : e
    }

    function e(e) {
        var t = n.exec(e.id);
        return document.querySelector("#" + t[1] + ("open" == t[2] ? "close" : "open"))
    }

    function v() {
        Prism.util.isActive(this, "brace-hover", !0) && [this, e(this)].forEach(function (e) {
            e.classList.add(p("brace-hover"))
        })
    }

    function m() {
        [this, e(this)].forEach(function (e) {
            e.classList.remove(p("brace-hover"))
        })
    }

    function b() {
        Prism.util.isActive(this, "brace-select", !0) && [this, e(this)].forEach(function (e) {
            e.classList.add(p("brace-selected"))
        })
    }
}();
