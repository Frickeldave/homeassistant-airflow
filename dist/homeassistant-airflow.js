/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, X = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = Symbol(), ft = /* @__PURE__ */ new WeakMap();
let Ct = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ft.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ft.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (o) => new Ct(typeof o == "string" ? o : o + "", void 0, tt), Pt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new Ct(e, o, tt);
}, Dt = (o, t) => {
  if (X) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = j.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, $t = X ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Rt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zt, defineProperty: jt, getOwnPropertyDescriptor: It, getOwnPropertyNames: Gt, getOwnPropertySymbols: Vt, getPrototypeOf: Wt } = Object, v = globalThis, yt = v.trustedTypes, qt = yt ? yt.emptyScript : "", K = v.reactiveElementPolyfillSupport, F = (o, t) => o, I = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? qt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, et = (o, t) => !zt(o, t), _t = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = _t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && jt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = It(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const c = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const t = Wt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const e = this.properties, s = [...Gt(e), ...Vt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift($t(i));
    } else t !== void 0 && e.push($t(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : I).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : I;
      this._$Em = i;
      const d = a.fromAttribute(e, c.type);
      this[i] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? et)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: c } = r, a = this[n];
        c !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[F("elementProperties")] = /* @__PURE__ */ new Map(), k[F("finalized")] = /* @__PURE__ */ new Map(), K == null || K({ ReactiveElement: k }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, mt = (o) => o, G = L.trustedTypes, gt = G ? G.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, kt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, Mt = "?" + g, Zt = `<${Mt}>`, C = document, B = () => C.createComment(""), H = (o) => o === null || typeof o != "object" && typeof o != "function", st = Array.isArray, Kt = (o) => st(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vt = /-->/g, xt = />/g, w = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bt = /'/g, At = /"/g, Ot = /^(?:script|style|textarea|title)$/i, Tt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), U = Tt(1), y = Tt(2), O = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function Nt(o, t) {
  if (!st(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gt !== void 0 ? gt.createHTML(t) : t;
}
const Jt = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = N;
  for (let c = 0; c < e; c++) {
    const a = o[c];
    let d, l, h = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, l = r.exec(a), l !== null); ) p = r.lastIndex, r === N ? l[1] === "!--" ? r = vt : l[1] !== void 0 ? r = xt : l[2] !== void 0 ? (Ot.test(l[2]) && (i = RegExp("</" + l[2], "g")), r = w) : l[3] !== void 0 && (r = w) : r === w ? l[0] === ">" ? (r = i ?? N, h = -1) : l[1] === void 0 ? h = -2 : (h = r.lastIndex - l[2].length, d = l[1], r = l[3] === void 0 ? w : l[3] === '"' ? At : bt) : r === At || r === bt ? r = w : r === vt || r === xt ? r = N : (r = w, i = void 0);
    const u = r === w && o[c + 1].startsWith("/>") ? " " : "";
    n += r === N ? a + Zt : h >= 0 ? (s.push(d), a.slice(0, h) + kt + a.slice(h) + g + u) : a + g + (h === -2 ? c : u);
  }
  return [Nt(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [d, l] = Jt(t, e);
    if (this.el = R.createElement(d, s), E.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = E.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(kt)) {
          const p = l[r++], u = i.getAttribute(h).split(g), $ = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: $[2], strings: u, ctor: $[1] === "." ? Qt : $[1] === "?" ? Xt : $[1] === "@" ? te : q }), i.removeAttribute(h);
        } else h.startsWith(g) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if (Ot.test(i.tagName)) {
          const h = i.textContent.split(g), p = h.length - 1;
          if (p > 0) {
            i.textContent = G ? G.emptyScript : "";
            for (let u = 0; u < p; u++) i.append(h[u], B()), E.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[p], B());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Mt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(g, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += g.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = C.createElement("template");
    return s.innerHTML = t, s;
  }
}
function T(o, t, e = o, s) {
  var r, c;
  if (t === O) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = H(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = T(o, i._$AS(o, t.values), i, s)), t;
}
class Yt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? C).importNode(e, !0);
    E.currentNode = i;
    let n = E.nextNode(), r = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new D(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new ee(n, this, t)), this._$AV.push(d), a = s[++c];
      }
      r !== (a == null ? void 0 : a.index) && (n = E.nextNode(), r++);
    }
    return E.currentNode = C, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class D {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = T(this, t, e), H(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(Nt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new Yt(i, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = wt.get(t.strings);
    return e === void 0 && wt.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new D(this.O(B()), this.O(B()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = mt(t).nextSibling;
      mt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = T(this, t, e, 0), r = !H(t) || t !== this._$AH && t !== O, r && (this._$AH = t);
    else {
      const c = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = T(this, c[s + a], e, a), d === O && (d = this._$AH[a]), r || (r = !H(d) || d !== this._$AH[a]), d === f ? t = f : t !== f && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Xt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class te extends q {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? f) === O) return;
    const s = this._$AH, i = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== f && (s === f || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ee {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const Y = L.litHtmlPolyfillSupport;
Y == null || Y(R, D), (L.litHtmlVersions ?? (L.litHtmlVersions = [])).push("3.3.2");
const se = (o, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new D(t.insertBefore(B(), n), n, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis;
class M extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return O;
  }
}
var St;
M._$litElement$ = !0, M.finalized = !0, (St = S.litElementHydrateSupport) == null || St.call(S, { LitElement: M });
const Q = S.litElementPolyfillSupport;
Q == null || Q({ LitElement: M });
(S.litElementVersions ?? (S.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: et }, oe = (o = ie, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(e.name, o), s === "accessor") {
    const { name: r } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, o, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, o, c), c;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, o, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function it(o) {
  return (t, e) => typeof e == "object" ? oe(o, t, e) : ((s, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Lt(o) {
  return it({ ...o, state: !0, attribute: !1 });
}
const Et = {
  en: {
    efficiency: "Efficiency",
    level: "Level",
    outdoor: "Outdoor",
    extract: "Extract",
    exhaust: "Exhaust",
    supply: "Supply",
    calculated_efficiency: "Calculated Efficiency",
    bypass_active: "BYPASS ACTIVE"
  },
  de: {
    efficiency: "Wirkungsgrad",
    level: "Stufe",
    outdoor: "Außenluft",
    extract: "Abluft",
    exhaust: "Fortluft",
    supply: "Zuluft",
    calculated_efficiency: "Berechneter HWG",
    bypass_active: "BYPASS AKTIV"
  }
};
var re = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, ot = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ne(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && re(t, e, i), i;
};
let V = class extends M {
  setConfig(o) {
    this._config = o;
  }
  render() {
    if (!this.hass || !this._config)
      return U``;
    const o = [
      { label: "Blue (#2196F3)", value: "#2196F3" },
      { label: "Green (#4CAF50)", value: "#4CAF50" },
      { label: "Amber (#FFB300)", value: "#FFB300" },
      { label: "Red (#F44336)", value: "#F44336" },
      { label: "Grey (#9E9E9E)", value: "#9E9E9E" },
      { label: "Black (#000000)", value: "#000000" },
      { label: "White (#FFFFFF)", value: "#FFFFFF" }
    ];
    return this._ensureColorOption("color_outdoor", o), this._ensureColorOption("color_supply", o), this._ensureColorOption("color_extract", o), this._ensureColorOption("color_exhaust", o), U`
            <div class="card-config">
                <div class="debug-box">
                    <strong>Editor Config:</strong><br>
                    Version: 1.5 (Level Min/Max)<br>
                </div>

                ${this.renderSelector("name", "Name", { text: {} })}

                <h3>Display Settings</h3>
                ${this.renderSelector("language", "Language", {
      select: {
        mode: "dropdown",
        options: [
          { label: "Automatic", value: "auto" },
          { label: "Deutsch", value: "de" },
          { label: "English", value: "en" }
        ]
      }
    })}
                ${this.renderSelector("card_background_mode", "Appearance (Theme)", {
      select: {
        mode: "dropdown",
        options: [
          { label: "Automatic (HA Theme)", value: "auto" },
          { label: "Dark Mode", value: "dark" },
          { label: "Light Mode", value: "light" }
        ]
      }
    })}

                <h3>Temperatures</h3>
                ${this.renderSelector("entity_temp_supply", "Supply Temperature (Zuluft)", { entity: { domain: "sensor" } })}
                ${this.renderSelector("entity_temp_extract", "Extract Temperature (Abluft)", { entity: { domain: "sensor" } })}
                ${this.renderSelector("entity_temp_exhaust", "Exhaust Temperature (Fortluft)", { entity: { domain: "sensor" } })}
                ${this.renderSelector("entity_temp_outdoor", "Outdoor Temperature (Außenluft)", { entity: { domain: "sensor" } })}

                <h3>Fans & Efficiency</h3>
                ${this.renderSelector("entity_fan_supply", "Supply Fan (RPM)", { entity: { domain: "sensor" } })}
                ${this.renderSelector("entity_fan_extract", "Extract Fan (RPM)", { entity: { domain: "sensor" } })}
                ${this.renderSelector("entity_level", "Fan Level Entity", { entity: { domain: "sensor" } })}
                ${this.renderSelector("level_min", "Min Level (Default: 0)", { number: { mode: "box", min: 0, max: 100 } })}
                ${this.renderSelector("level_max", "Max Level (Default: 4)", { number: { mode: "box", min: 0, max: 100 } })}
                ${this.renderSelector("entity_efficiency", "Efficiency Entity", { entity: { domain: "sensor" } })}

                <h3>Bypass</h3>
                ${this.renderSelector("entity_bypass", "Bypass Entity", { entity: { domain: ["binary_sensor", "sensor"] } })}

                <h3>Colors</h3>
                ${this.renderSelector("color_outdoor", "Outdoor Color", { select: { mode: "dropdown", options: o, custom_value: !0 } })}
                ${this.renderSelector("color_supply", "Supply Color", { select: { mode: "dropdown", options: o, custom_value: !0 } })}
                ${this.renderSelector("color_extract", "Extract Color", { select: { mode: "dropdown", options: o, custom_value: !0 } })}
                ${this.renderSelector("color_exhaust", "Exhaust Color", { select: { mode: "dropdown", options: o, custom_value: !0 } })}

                <h3>Other</h3>
                ${this.renderSelector("efficiency_calculation_dynamic", "Enable dynamic calculation from temperatures", { boolean: {} })}
            </div>
        `;
  }
  _ensureColorOption(o, t) {
    const e = this._config[o];
    e && !t.some((s) => s.value === e) && t.push({ label: e, value: e });
  }
  renderSelector(o, t, e) {
    return U`
            <div class="option">
                <ha-selector
                    .hass=${this.hass}
                    .selector=${e}
                    .value=${this._config[o]}
                    .label=${t}
                    @value-changed=${(s) => this._updateConfig(o, s.detail.value)}
                ></ha-selector>
            </div>
        `;
  }
  _updateConfig(o, t) {
    if (!this._config) return;
    const e = { ...this._config, [o]: t };
    this._config = e, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    }));
  }
  static get styles() {
    return Pt`
            .card-config {
                padding: 16px;
                /* font-family property is handled by HA environment mostly, but good to keep if needed */
            }
            .debug-box {
                background: #e8f5e9;
                border: 1px solid #4caf50;
                padding: 10px;
                margin-bottom: 20px; 
                border-radius: 4px; 
                font-size: 12px;
                color: #2e7d32;
            }
            .option {
                margin-bottom: 16px;
            }
            h3 {
                font-size: 14px;
                margin: 20px 0 10px 0;
                border-bottom: 1px solid var(--divider-color, #eee);
                padding-bottom: 4px;
            }
        `;
  }
};
ot([
  it({ attribute: !1 })
], V.prototype, "hass", 2);
ot([
  Lt()
], V.prototype, "_config", 2);
V = ot([
  Ft("airflow-card-editor")
], V);
var ae = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, rt = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ce(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && ae(t, e, i), i;
};
let W = class extends M {
  setConfig(o) {
    !o.entity_temp_supply || o.entity_temp_extract, this.config = o;
  }
  static getConfigElement() {
    return document.createElement("airflow-card-editor");
  }
  static getStubConfig() {
    return {
      entity_temp_supply: "sensor.supply_temp",
      entity_temp_extract: "sensor.extract_temp",
      entity_temp_outdoor: "sensor.outdoor_temp",
      entity_temp_exhaust: "sensor.exhaust_temp",
      entity_level: "sensor.fan_level",
      level_min: 0,
      level_max: 4,
      entity_efficiency: "sensor.efficiency",
      color_outdoor: "#2196F3",
      color_supply: "#4CAF50",
      color_extract: "#FFB300",
      color_exhaust: "#F44336"
    };
  }
  shouldUpdate(o) {
    return !0;
  }
  render() {
    return !this.config || !this.hass ? U`` : U`
      <ha-card .header=${this.config.name}>
        <div class="card-content">
          <div class="drawing-container">
            ${this.renderDrawing()}
          </div>
        </div>
      </ha-card>
    `;
  }
  renderDrawing() {
    var ut, pt;
    const i = this.config.color_supply || "#4CAF50", n = this.config.color_extract || "#FFB300", r = this.config.color_exhaust || "#F44336", c = this.config.color_outdoor || "#2196F3", a = this.config.entity_bypass, d = a ? (ut = this.hass.states[a]) == null ? void 0 : ut.state : "off", l = d === "on" || d === "open" || d === "active", h = this.config.entity_level, p = h ? parseFloat(((pt = this.hass.states[h]) == null ? void 0 : pt.state) ?? "1") : 1, u = isNaN(p) ? 1 : p, $ = this.config.level_min ?? 0, at = (this.config.level_max ?? 4) - $, ct = at > 0 ? Math.max(0, Math.min(1, (u - $) / at)) : 0.5, Z = u > 0 ? (3 - ct * 2.6).toFixed(2) : "0", lt = u > 0 ? (2 - ct * 1.8).toFixed(2) : "0";
    let z = this.config.language;
    (!z || z === "auto") && (z = this.hass.language === "de" ? "de" : "en");
    const P = Et[z] || Et.en, ht = this.config.card_background_mode || "auto", m = ht === "light", x = ht === "auto", _ = x ? "var(--ha-card-background, var(--card-background-color, var(--paper-card-background-color, white)))" : m ? "white" : "#1c1c1c", b = x ? "var(--primary-text-color, var(--primary-text-color, #333))" : m ? "#333" : "#e1e1e1", Ut = x ? "var(--secondary-text-color, var(--secondary-text-color, #444))" : m ? "#444" : "#b0b0b0", A = x ? "var(--divider-color, var(--divider-color, #ccc))" : m ? "#ccc" : "#444", Bt = x ? "var(--divider-color, var(--primary-text-color, #333))" : m ? "#333" : "#444", Ht = x ? "var(--primary-background-color, var(--primary-background-color, #fdfdfd))" : m ? "#fdfdfd" : "#2c2c2c", dt = x ? "var(--secondary-background-color, var(--secondary-background-color, #f0f0f0))" : m ? "#f0f0f0" : "#333";
    return y`
       <svg viewBox="0 0 ${600} ${450}" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${Z}s; --flow-speed: ${lt}s; --flow-display: ${lt === "0" ? "none" : "block"};">
         <defs>
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feFlood flood-color="rgba(0,0,0,0.2)"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>

            <linearGradient id="gradOutdoorSupply" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${c}" />
                <stop offset="100%" stop-color="${i}" />
            </linearGradient>

            <linearGradient id="gradExtractExhaust" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${n}" />
                <stop offset="100%" stop-color="${r}" />
            </linearGradient>
         </defs>

         <!-- Main Unit Box (Now large enough to contain everything) -->
         <rect x="${50}" y="${45}" width="500" height="360" rx="15" fill="${_}" stroke="${Bt}" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <rect x="${300 - 56.5}" y="${225 - 56.5}" width="113" height="113" transform="rotate(45 ${300} ${225})" fill="${Ht}" stroke="${A}" stroke-width="1" />
         
         <!-- Background Ducts (Static) -->
         <!-- Path 1: Outdoor -> Supply -->
         <path d="M ${50} ${165} L ${240} ${165} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${dt}" stroke-width="12" stroke-linecap="round"/>
         <!-- Path 2: Extract -> Exhaust -->
         <path d="M ${550} ${165} L ${360} ${165} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${dt}" stroke-width="12" stroke-linecap="round"/>

         <!-- Animated Airflow Lines -->
         <!-- Path 1: Outdoor (Left Top) -> Supply (Right Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${50} ${165} L ${240} ${165} L ${260} ${185}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner with Gradient. Diverts if Bypass is Active -->
         <path class="flow-line-inner" d="${l ? "M 260 185 L 220 225 L 300 305 L 340 265" : "M 260 185 L 340 265"}" fill="none" stroke="${l ? c : "url(#gradOutdoorSupply)"}" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${340} ${265} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${l ? c : i}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${550} ${165} L ${360} ${165} L ${340} ${185}" fill="none" stroke="${n}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${340} ${185} L ${260} ${265}" fill="none" stroke="url(#gradExtractExhaust)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${260} ${265} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${r}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(70, 65, P.outdoor, this.config.entity_temp_outdoor, c, _, A, b)}
         ${this.renderEfficiency(255, 65, P.efficiency, _, A, Ut, b)}
         ${this.renderPortBox(440, 65, P.extract, this.config.entity_temp_extract, n, _, A, b)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(70, 330, P.exhaust, this.config.entity_temp_exhaust, r, _, A, b)}
         ${this.renderPortBox(255, 330, P.level, this.config.entity_level, m ? "#444" : b, _, A, b)}
         ${this.renderPortBox(440, 330, P.supply, this.config.entity_temp_supply, l ? c : i, _, A, b)}

         <!-- Fans -->
         ${this.renderFan(450, 285, this.config.entity_fan_supply, l ? c : i, Z, _)}
         ${this.renderFan(150, 285, this.config.entity_fan_extract, r, Z, _)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(300, 225)}



       </svg>
     `;
  }
  renderPortBox(o, t, e, s, i, n, r, c) {
    var p, u;
    const a = s ? ((p = this.hass.states[s]) == null ? void 0 : p.state) ?? "N/A" : "-", d = s ? ((u = this.hass.states[s]) == null ? void 0 : u.attributes.unit_of_measurement) ?? "" : "", l = 90;
    return y`
            <g transform="translate(${o}, ${t})">
                <rect x="0" y="0" width="${l}" height="${55}" rx="10" fill="${n}" stroke="${r}" stroke-width="1" />
                <text x="${l / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${i}">${e}</text>
                <text x="${l / 2}" y="42" font-size="14" text-anchor="middle" fill="${c}">${a}${d}</text>
            </g>
        `;
  }
  renderBypass(o, t) {
    const e = this.config.entity_bypass;
    if (!e) return y``;
    const s = this.hass.states[e], i = s == null ? void 0 : s.state;
    return i === "on" || i === "open" || i === "active" ? y`` : y``;
  }
  renderEfficiency(o, t, e, s, i, n, r) {
    var l;
    let c = "-";
    if (this.config.efficiency_calculation_dynamic) {
      const h = this._getNumericState(this.config.entity_temp_supply), p = this._getNumericState(this.config.entity_temp_extract), u = this._getNumericState(this.config.entity_temp_outdoor);
      if (h !== void 0 && p !== void 0 && u !== void 0) {
        const $ = p - u;
        if (Math.abs($) > 0.1) {
          const nt = (h - u) / $ * 100;
          c = Math.max(0, Math.min(100, Math.round(nt))).toString();
        }
      }
    } else if (this.config.entity_efficiency)
      c = ((l = this.hass.states[this.config.entity_efficiency]) == null ? void 0 : l.state) ?? "-";
    else
      return y``;
    const a = 90;
    return y`
            <g transform="translate(${o}, ${t})">
                <rect x="0" y="0" width="${a}" height="${55}" rx="10" fill="${s}" stroke="${i}" stroke-width="1" />
                <text x="${a / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${n}">${e}</text>
                <text x="${a / 2}" y="42" font-size="14" text-anchor="middle" fill="${r}">${c}%</text>
            </g>
        `;
  }
  _getNumericState(o) {
    var s;
    if (!o) return;
    const t = (s = this.hass.states[o]) == null ? void 0 : s.state;
    if (t === void 0) return;
    const e = parseFloat(t);
    return isNaN(e) ? void 0 : e;
  }
  renderFan(o, t, e, s, i, n) {
    const r = e ? this.hass.states[e] : void 0, c = (r == null ? void 0 : r.state) ?? "0";
    r == null || r.attributes.unit_of_measurement;
    const a = parseFloat(c), d = c === "on" || !isNaN(a) && a > 0 || i !== "0", l = !isNaN(a) && a > 0;
    return y`
            <g transform="translate(${o}, ${t})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${l ? y`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${s}" font-weight="bold">${c} RPM</text>
                ` : ""}
                
                <g>
                    ${d && i !== "0" ? y`
                        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="${i}s" repeatCount="indefinite"/>
                    ` : ""}
                    <circle cx="0" cy="0" r="20" fill="${n}" stroke="${s}" stroke-width="2"/>
                    <g fill="${s}" opacity="0.9">
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(120)" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(240)" />
                    </g>
                    <circle cx="0" cy="0" r="4" fill="${n}" stroke="${s}" stroke-width="1"/>
                </g>
            </g>
        `;
  }
  static get styles() {
    return Pt`
      .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
      }
      .drawing-container {
        width: 100%;
        max-width: 500px;
        margin-bottom: 16px;
      }
      .flow-line {
          stroke-dasharray: 10, 15;
          animation: flow var(--flow-speed, 0.8s) linear infinite;
          display: var(--flow-display, block);
      }
      .flow-line-inner {
          stroke-dasharray: 4, 8;
          animation: flow var(--flow-speed, 0.8s) linear infinite;
          display: var(--flow-display, block);
      }
      @keyframes flow {
          to { stroke-dashoffset: -25; }
      }
    `;
  }
};
rt([
  it({ attribute: !1 })
], W.prototype, "hass", 2);
rt([
  Lt()
], W.prototype, "config", 2);
W = rt([
  Ft("airflow-card")
], W);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "airflow-card",
  name: "Airflow Card",
  preview: !0,
  description: "A card to visualize airflow and efficiency for ventilation systems."
});
export {
  W as AirflowCard
};
