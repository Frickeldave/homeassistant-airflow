/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, q = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), Y = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Y.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Y.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (n) => new lt(typeof n == "string" ? n : n + "", void 0, W), dt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new lt(e, n, W);
}, vt = (n, t) => {
  if (q) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = L.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, X = q ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return mt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xt, defineProperty: At, getOwnPropertyDescriptor: Et, getOwnPropertyNames: bt, getOwnPropertySymbols: wt, getPrototypeOf: St } = Object, y = globalThis, tt = y.trustedTypes, Ct = tt ? tt.emptyScript : "", B = y.reactiveElementPolyfillSupport, C = (n, t) => n, N = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Ct : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Z = (n, t) => !xt(n, t), et = { attribute: !0, type: String, converter: N, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && At(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const h = i == null ? void 0 : i.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = St(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, s = [...bt(e), ...wt(e)];
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
      for (const i of s) e.unshift(X(i));
    } else t !== void 0 && e.push(X(t));
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
    return vt(t, this.constructor.elementStyles), t;
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
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : N).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((r = h.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? h.converter : N;
      this._$Em = i;
      const l = a.fromAttribute(e, h.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = h.getPropertyOptions(t)), !((s.hasChanged ?? Z)(r, e) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: h } = o, a = this[r];
        h !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), B == null || B({ ReactiveElement: A }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, st = (n) => n, R = P.trustedTypes, it = R ? R.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, pt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + _, Pt = `<${ut}>`, x = document, M = () => x.createComment(""), T = (n) => n === null || typeof n != "object" && typeof n != "function", G = Array.isArray, Ot = (n) => G(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, rt = />/g, g = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, at = /"/g, $t = /^(?:script|style|textarea|title)$/i, ft = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), O = ft(1), f = ft(2), b = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), m = x.createTreeWalker(x, 129);
function _t(n, t) {
  if (!G(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Mt = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
  for (let h = 0; h < e; h++) {
    const a = n[h];
    let l, p, c = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); ) u = o.lastIndex, o === S ? p[1] === "!--" ? o = nt : p[1] !== void 0 ? o = rt : p[2] !== void 0 ? ($t.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = g) : p[3] !== void 0 && (o = g) : o === g ? p[0] === ">" ? (o = i ?? S, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, l = p[1], o = p[3] === void 0 ? g : p[3] === '"' ? at : ot) : o === at || o === ot ? o = g : o === nt || o === rt ? o = S : (o = g, i = void 0);
    const $ = o === g && n[h + 1].startsWith("/>") ? " " : "";
    r += o === S ? a + Pt : c >= 0 ? (s.push(l), a.slice(0, c) + pt + a.slice(c) + _ + $) : a + _ + (c === -2 ? h : $);
  }
  return [_t(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, a = this.parts, [l, p] = Mt(t, e);
    if (this.el = U.createElement(l, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(pt)) {
          const u = p[o++], $ = i.getAttribute(c).split(_), H = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: H[2], strings: $, ctor: H[1] === "." ? Ut : H[1] === "?" ? kt : H[1] === "@" ? Ht : j }), i.removeAttribute(c);
        } else c.startsWith(_) && (a.push({ type: 6, index: r }), i.removeAttribute(c));
        if ($t.test(i.tagName)) {
          const c = i.textContent.split(_), u = c.length - 1;
          if (u > 0) {
            i.textContent = R ? R.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(c[$], M()), m.nextNode(), a.push({ type: 2, index: ++r });
            i.append(c[u], M());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ut) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(_, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += _.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(n, t, e = n, s) {
  var o, h;
  if (t === b) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = T(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = w(n, i._$AS(n, t.values), i, s)), t;
}
class Tt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    m.currentNode = i;
    let r = m.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new k(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new Lt(r, this, t)), this._$AV.push(l), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (r = m.nextNode(), o++);
    }
    return m.currentNode = x, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class k {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = w(this, t, e), T(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(_t(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new Tt(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    G(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new k(this.O(M()), this.O(M()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = st(t).nextSibling;
      st(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = w(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== b, o && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = w(this, h[s + a], e, a), l === b && (l = this._$AH[a]), o || (o = !T(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ut extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class kt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Ht extends j {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? d) === b) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Lt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    w(this, t);
  }
}
const F = P.litHtmlPolyfillSupport;
F == null || F(U, k), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const Nt = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new k(t.insertBefore(M(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class E extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Nt(e, this.renderRoot, this.renderOptions);
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
    return b;
  }
}
var ct;
E._$litElement$ = !0, E.finalized = !0, (ct = v.litElementHydrateSupport) == null || ct.call(v, { LitElement: E });
const I = v.litElementPolyfillSupport;
I == null || I({ LitElement: E });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: Z }, Dt = (n = Rt, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, n, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, n, h), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, n, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(n) {
  return (t, e) => typeof e == "object" ? Dt(n, t, e) : ((s, i, r) => {
    const o = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function gt(n) {
  return J({ ...n, state: !0, attribute: !1 });
}
var zt = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, K = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? jt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && zt(t, e, i), i;
};
let D = class extends E {
  setConfig(n) {
    this._config = n;
  }
  render() {
    return !this.hass || !this._config ? O`` : O`
            <div class="card-config">
                <div class="option">
                    <ha-entity-picker
                        .hass=\${this.hass}
                        .value=\${this._config.entity_temp_supply}
                        .configValue=\${'entity_temp_supply'}
                        label="Supply Temperature (Zuluft)"
                        @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                        .hass=\${this.hass}
                        .value=\${this._config.entity_temp_extract}
                        .configValue=\${'entity_temp_extract'}
                        label="Extract Temperature (Abluft)"
                        @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                        .hass=\${this.hass}
                        .value=\${this._config.entity_temp_exhaust}
                        .configValue=\${'entity_temp_exhaust'}
                        label="Exhaust Temperature (Fortluft)"
                        @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                         .hass=\${this.hass}
                         .value=\${this._config.entity_temp_outdoor}
                         .configValue=\${'entity_temp_outdoor'}
                         label="Outdoor Temperature (Außenluft)"
                         @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <!-- Fan Sensors -->
                 <div class="option">
                    <ha-entity-picker
                         .hass=\${this.hass}
                         .value=\${this._config.entity_fan_supply}
                         .configValue=\${'entity_fan_supply'}
                         label="Supply Fan RPM (Optional)"
                         @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                         .hass=\${this.hass}
                         .value=\${this._config.entity_fan_extract}
                         .configValue=\${'entity_fan_extract'}
                         label="Extract Fan RPM (Optional)"
                         @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                 <div class="option">
                    <ha-entity-picker
                         .hass=\${this.hass}
                         .value=\${this._config.entity_efficiency}
                         .configValue=\${'entity_efficiency'}
                         label="Efficiency Sensor (Optional)"
                         @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                 <div class="option">
                    <ha-entity-picker
                         .hass=\${this.hass}
                         .value=\${this._config.entity_bypass}
                         .configValue=\${'entity_bypass'}
                         label="Bypass Entity (Optional)"
                         @value-changed=\${this._valueChanged}
                    ></ha-entity-picker>
                </div>
            </div>
        `;
  }
  _valueChanged(n) {
    if (!this._config || !this.hass)
      return;
    const e = n.target.configValue, s = n.detail.value;
    if (this._config[e] === s)
      return;
    const i = {
      ...this._config,
      [e]: s
    }, r = new CustomEvent("config-changed", {
      detail: { config: i },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(r);
  }
  static get styles() {
    return dt`
            .card-config {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .option {
                display: flex;
                flex-direction: column;
            }
        `;
  }
};
K([
  J({ attribute: !1 })
], D.prototype, "hass", 2);
K([
  gt()
], D.prototype, "_config", 2);
D = K([
  yt("airflow-card-editor")
], D);
var Bt = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, Q = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Vt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Bt(t, e, i), i;
};
let z = class extends E {
  setConfig(n) {
    !n.entity_temp_supply || n.entity_temp_extract, this.config = n;
  }
  static getConfigElement() {
    return document.createElement("airflow-card-editor");
  }
  static getStubConfig() {
    return {
      entity_temp_supply: "sensor.supply_temp",
      entity_temp_extract: "sensor.extract_temp",
      entity_temp_outdoor: "sensor.outdoor_temp",
      entity_temp_exhaust: "sensor.exhaust_temp"
    };
  }
  shouldUpdate(n) {
    return !0;
  }
  render() {
    return !this.config || !this.hass ? O`` : O`
      <ha-card .header=\${this.config.name}>
        <div class="card-content">
          <div class="drawing-container">
            \${this.renderDrawing()}
          </div>
          \${this.renderInfo()}
        </div>
      </ha-card>
    `;
  }
  renderDrawing() {
    return f`
       <svg viewBox="0 0 \${width} \${height}" xmlns="http://www.w3.org/2000/svg">
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
            
            <!-- Fan Animation -->
            <style>
                .fan-spin { transform-origin: center; animation: spin 2s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            </style>
         </defs>

         <!-- Main Unit Box -->
         <rect x="\${cx - 150}" y="\${cy - 100}" width="300" height="200" rx="10" fill="white" stroke="#333" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <path d="M \${cx} \${cy-70} L \${cx+70} \${cy} L \${cx} \${cy+70} L \${cx-70} \${cy} Z" fill="#eee" stroke="#999" stroke-width="2" />
         
         <!-- Ducts & Arrows -->
         <!-- Outdoor (Left Bottom) -> Heat Exchanger -->
         <path d="M \${cx-150} \${cy+50} L \${cx-70} \${cy+50} L \${cx-50} \${cy+30}" fill="none" stroke="\${colorOutdoor}" stroke-width="8" />
         <text x="\${cx-130}" y="\${cy+80}" fill="\${colorOutdoor}" font-size="12">Outdoor</text>
         
         <!-- Supply (Right Bottom) <- Heat Exchanger -->
         <path d="M \${cx+50} \${cy+30} L \${cx+70} \${cy+50} L \${cx+150} \${cy+50}" fill="none" stroke="\${colorFresh}" stroke-width="8" />
         <text x="\${cx+100}" y="\${cy+80}" fill="\${colorFresh}" font-size="12">Supply</text>

         <!-- Extract (Right Top) -> Heat Exchanger -->
         <path d="M \${cx+150} \${cy-50} L \${cx+70} \${cy-50} L \${cx+50} \${cy-30}" fill="none" stroke="\${colorStale}" stroke-width="8" />
         <text x="\${cx+100}" y="\${cy-80}" fill="\${colorStale}" font-size="12">Extract</text>

         <!-- Exhaust (Left Top) <- Heat Exchanger -->
         <path d="M \${cx-50} \${cy-30} L \${cx-70} \${cy-50} L \${cx-150} \${cy-50}" fill="none" stroke="\${colorExhaust}" stroke-width="8" />
         <text x="\${cx-130}" y="\${cy-80}" fill="\${colorExhaust}" font-size="12">Exhaust</text>

         <!-- Fans -->
         \${this.renderFan(cx + 100, cy + 50, this.config.entity_fan_supply, colorFresh)}
         \${this.renderFan(cx - 100, cy - 50, this.config.entity_fan_extract, colorExhaust)}
         
         <!-- Bypass (If Active) -->
         \${this.renderBypass(cx, cy)}

         <!-- Efficiency Text (Center) -->
         \${this.renderEfficiency(cx, cy)}

         <!-- Overlay Text (Temperatures) -->
         \${this.renderTemp(cx-110, cy+40, this.config.entity_temp_outdoor)}
         \${this.renderTemp(cx+110, cy+40, this.config.entity_temp_supply)}
         \${this.renderTemp(cx+110, cy-60, this.config.entity_temp_extract)}
         \${this.renderTemp(cx-110, cy-60, this.config.entity_temp_exhaust)}

       </svg>
     `;
  }
  renderBypass(n, t) {
    var i;
    if (!this.config.entity_bypass) return f``;
    const e = (i = this.hass.states[this.config.entity_bypass]) == null ? void 0 : i.state;
    return e === "on" || e === "open" || e === "active" ? f`
            <path d="M \${cx-60} \${cy+40} Q \${cx} \${cy+90} \${cx+60} \${cy+40}" fill="none" stroke="#2196F3" stroke-width="4" stroke-dasharray="5,5" />
            <text x="\${cx}" y="\${cy+80}" font-size="10" text-anchor="middle" fill="#2196F3">BYPASS</text>
        ` : f``;
  }
  renderEfficiency(n, t) {
    var e;
    return this.config.entity_efficiency ? ((e = this.hass.states[this.config.entity_efficiency]) == null || e.state, f`
            <text x="\${cx}" y="\${cy}" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#444">\${state}%</text>
            <text x="\${cx}" y="\${cy+15}" font-size="8" text-anchor="middle" fill="#666">Efficiency</text>
        `) : f``;
  }
  renderFan(n, t, e, s) {
    var i;
    return e && ((i = this.hass.states[e]) == null || i.state), f`
            <g transform="translate(\${x}, \${y})" class="\${isSpinning ? 'fan-spin' : ''}">
                <circle cx="0" cy="0" r="20" fill="white" stroke="\${color}" stroke-width="2"/>
                <path d="M 0 -18 L 10 -10 L 18 0 L 10 10 L 0 18 L -10 10 L -18 0 L -10 -10 Z" fill="\${color}" opacity="0.7"/>
            </g>
        `;
  }
  renderTemp(n, t, e) {
    var s, i;
    return e && ((s = this.hass.states[e]) == null || s.state), e && ((i = this.hass.states[e]) == null || i.attributes.unit_of_measurement), f`
            <text x="\${x}" y="\${y}" font-size="14" text-anchor="middle" fill="#333">\${state}\${unit}</text>
        `;
  }
  renderInfo() {
    return O`
          <div class="stats">
              <div>Supply: \${getState(this.config.entity_temp_supply)}°C</div>
              <div>Extract: \${getState(this.config.entity_temp_extract)}°C</div>
              <div>Outdoor: \${getState(this.config.entity_temp_outdoor)}°C</div>
              <div>Exhaust: \${getState(this.config.entity_temp_exhaust)}°C</div>
          </div>
      `;
  }
  static get styles() {
    return dt`
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
      .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          width: 100%;
          font-size: 0.9em;
      }
    `;
  }
};
Q([
  J({ attribute: !1 })
], z.prototype, "hass", 2);
Q([
  gt()
], z.prototype, "config", 2);
z = Q([
  yt("airflow-card")
], z);
export {
  z as AirflowCard
};
