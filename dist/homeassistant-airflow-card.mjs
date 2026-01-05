/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, q = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), Q = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (n) => new ct(typeof n == "string" ? n : n + "", void 0, G), dt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new ct(e, n, G);
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
const { is: xt, defineProperty: At, getOwnPropertyDescriptor: wt, getOwnPropertyNames: Et, getOwnPropertySymbols: bt, getPrototypeOf: St } = Object, _ = globalThis, tt = _.trustedTypes, Ct = tt ? tt.emptyScript : "", F = _.reactiveElementPolyfillSupport, C = (n, t) => n, H = { toAttribute(n, t) {
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
} }, W = (n, t) => !xt(n, t), et = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: W };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
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
    const { get: i, set: r } = wt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, a, s);
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
      const e = this.properties, s = [...Et(e), ...bt(e)];
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
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : H).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), h = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : H;
      this._$Em = i;
      const l = h.fromAttribute(e, a.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? W)(r, e) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
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
        const { wrapped: a } = o, h = this[r];
        a !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, o, h);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: A }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, st = (n) => n, N = P.trustedTypes, it = N ? N.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, pt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + y, Pt = `<${ut}>`, x = document, k = () => x.createComment(""), O = (n) => n === null || typeof n != "object" && typeof n != "function", Z = Array.isArray, kt = (n) => Z(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, rt = />/g, g = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, at = /"/g, ft = /^(?:script|style|textarea|title)$/i, $t = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), R = $t(1), u = $t(2), E = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), m = x.createTreeWalker(x, 129);
function yt(n, t) {
  if (!Z(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Ot = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
  for (let a = 0; a < e; a++) {
    const h = n[a];
    let l, d, c = -1, f = 0;
    for (; f < h.length && (o.lastIndex = f, d = o.exec(h), d !== null); ) f = o.lastIndex, o === S ? d[1] === "!--" ? o = nt : d[1] !== void 0 ? o = rt : d[2] !== void 0 ? (ft.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = g) : d[3] !== void 0 && (o = g) : o === g ? d[0] === ">" ? (o = i ?? S, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? g : d[3] === '"' ? at : ot) : o === at || o === ot ? o = g : o === nt || o === rt ? o = S : (o = g, i = void 0);
    const $ = o === g && n[a + 1].startsWith("/>") ? " " : "";
    r += o === S ? h + Pt : c >= 0 ? (s.push(l), h.slice(0, c) + pt + h.slice(c) + y + $) : h + y + (c === -2 ? a : $);
  }
  return [yt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, h = this.parts, [l, d] = Ot(t, e);
    if (this.el = M.createElement(l, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = m.nextNode()) !== null && h.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(pt)) {
          const f = d[o++], $ = i.getAttribute(c).split(y), T = /([.?@])?(.*)/.exec(f);
          h.push({ type: 1, index: r, name: T[2], strings: $, ctor: T[1] === "." ? Ut : T[1] === "?" ? Tt : T[1] === "@" ? Lt : z }), i.removeAttribute(c);
        } else c.startsWith(y) && (h.push({ type: 6, index: r }), i.removeAttribute(c));
        if (ft.test(i.tagName)) {
          const c = i.textContent.split(y), f = c.length - 1;
          if (f > 0) {
            i.textContent = N ? N.emptyScript : "";
            for (let $ = 0; $ < f; $++) i.append(c[$], k()), m.nextNode(), h.push({ type: 2, index: ++r });
            i.append(c[f], k());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ut) h.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(y, c + 1)) !== -1; ) h.push({ type: 7, index: r }), c += y.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function b(n, t, e = n, s) {
  var o, a;
  if (t === E) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = O(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = b(n, i._$AS(n, t.values), i, s)), t;
}
class Mt {
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
    let r = m.nextNode(), o = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new U(r, r.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && (l = new Ht(r, this, t)), this._$AV.push(l), h = s[++a];
      }
      o !== (h == null ? void 0 : h.index) && (r = m.nextNode(), o++);
    }
    return m.currentNode = x, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = b(this, t, e), O(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = M.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new Mt(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new U(this.O(k()), this.O(k()), this, this.options)) : s = e[i], s._$AI(r), i++;
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
class z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = b(this, t, e, 0), o = !O(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const a = t;
      let h, l;
      for (t = r[0], h = 0; h < r.length - 1; h++) l = b(this, a[s + h], e, h), l === E && (l = this._$AH[h]), o || (o = !O(l) || l !== this._$AH[h]), l === p ? t = p : t !== p && (t += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ut extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Tt extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Lt extends z {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = b(this, t, e, 0) ?? p) === E) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ht {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    b(this, t);
  }
}
const j = P.litHtmlPolyfillSupport;
j == null || j(M, U), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const Nt = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new U(t.insertBefore(k(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class w extends A {
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
    return E;
  }
}
var lt;
w._$litElement$ = !0, w.finalized = !0, (lt = v.litElementHydrateSupport) == null || lt.call(v, { LitElement: w });
const I = v.litElementPolyfillSupport;
I == null || I({ LitElement: w });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: W }, Bt = (n = Rt, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), s === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const h = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, h, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, n, a), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(a) {
      const h = this[o];
      t.call(this, a), this.requestUpdate(o, h, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(n) {
  return (t, e) => typeof e == "object" ? Bt(n, t, e) : ((s, i, r) => {
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
var Dt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, K = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? zt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Dt(t, e, i), i;
};
let B = class extends w {
  setConfig(n) {
    this._config = n;
  }
  render() {
    return !this.hass || !this._config ? R`` : R`
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
                         .hass=${this.hass}
                         .value=${this._config.entity_level}
                         .configValue=${"entity_level"}
                         label="Fan Level Sensor (Optional, 0-10)"
                         @value-changed=${this._valueChanged}
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
], B.prototype, "hass", 2);
K([
  gt()
], B.prototype, "_config", 2);
B = K([
  _t("airflow-card-editor")
], B);
var Ft = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, Y = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Vt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Ft(t, e, i), i;
};
let D = class extends w {
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
      entity_temp_exhaust: "sensor.exhaust_temp",
      entity_level: "sensor.fan_level",
      entity_efficiency: "sensor.efficiency"
    };
  }
  shouldUpdate(n) {
    return !0;
  }
  render() {
    return !this.config || !this.hass ? R`` : R`
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
    const i = "#4CAF50", r = "#FFC107", o = "#F44336", a = "#2196F3";
    return u`
       <svg viewBox="0 0 ${600} ${450}" xmlns="http://www.w3.org/2000/svg">
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
                <stop offset="0%" stop-color="${a}" />
                <stop offset="100%" stop-color="${i}" />
            </linearGradient>

            <linearGradient id="gradExtractExhaust" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${r}" />
                <stop offset="100%" stop-color="${o}" />
            </linearGradient>
            
            <!-- Fan Animation -->
            <style>
                .fan-spin { animation: spin 2s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                .flow-line {
                    stroke-dasharray: 10, 15;
                    animation: flow 0.8s linear infinite;
                }
                .flow-line-inner {
                    stroke-dasharray: 4, 8;
                    animation: flow 0.8s linear infinite;
                }
                @keyframes flow {
                    to { stroke-dashoffset: -25; }
                }
            </style>
         </defs>

         <!-- Main Unit Box (Now large enough to contain everything) -->
         <rect x="${50}" y="${45}" width="500" height="360" rx="15" fill="white" stroke="#333" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <path d="M ${300} ${145} L ${380} ${225} L ${300} ${305} L ${220} ${225} Z" fill="#fdfdfd" stroke="#ccc" stroke-width="1" />
         
         <!-- Background Ducts (Static) -->
         <!-- Path 1: Outdoor -> Supply -->
         <path d="M ${50} ${165} L ${240} ${165} L ${360} ${285} L ${550} ${285}" fill="none" stroke="#f0f0f0" stroke-width="12" stroke-linecap="round"/>
         <!-- Path 2: Extract -> Exhaust -->
         <path d="M ${550} ${165} L ${360} ${165} L ${240} ${285} L ${50} ${285}" fill="none" stroke="#f0f0f0" stroke-width="12" stroke-linecap="round"/>

         <!-- Animated Airflow Lines -->
         <!-- Path 1: Outdoor (Left Top) -> Supply (Right Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${50} ${165} L ${240} ${165} L ${260} ${185}" fill="none" stroke="${a}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${260} ${185} L ${340} ${265}" fill="none" stroke="url(#gradOutdoorSupply)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${340} ${265} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${i}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${550} ${165} L ${360} ${165} L ${340} ${185}" fill="none" stroke="${r}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${340} ${185} L ${260} ${265}" fill="none" stroke="url(#gradExtractExhaust)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${260} ${265} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${o}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(70, 65, "Outdoor", this.config.entity_temp_outdoor, a)}
         ${this.renderEfficiency(255, 65)}
         ${this.renderPortBox(440, 65, "Extract", this.config.entity_temp_extract, r)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(70, 330, "Exhaust", this.config.entity_temp_exhaust, o)}
         ${this.renderLevel(255, 330)}
         ${this.renderPortBox(440, 330, "Supply", this.config.entity_temp_supply, i)}

         <!-- Fans -->
         ${this.renderFan(450, 285, this.config.entity_fan_supply, i)}
         ${this.renderFan(150, 285, this.config.entity_fan_extract, o)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(300, 225)}



       </svg>
     `;
  }
  renderPortBox(n, t, e, s, i) {
    var l, d;
    const r = s ? ((l = this.hass.states[s]) == null ? void 0 : l.state) ?? "N/A" : "-", o = s ? ((d = this.hass.states[s]) == null ? void 0 : d.attributes.unit_of_measurement) ?? "°C" : "", a = 90;
    return u`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${a}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${a / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${i}">${e}</text>
                <text x="${a / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${r}${o}</text>
            </g>
        `;
  }
  renderBypass(n, t) {
    var i;
    if (!this.config.entity_bypass) return u``;
    const e = (i = this.hass.states[this.config.entity_bypass]) == null ? void 0 : i.state;
    return e === "on" || e === "open" || e === "active" ? u`
            <path d="M ${n - 60} ${t - 40} C ${n - 10} ${t - 40}, ${n + 10} ${t + 40}, ${n + 60} ${t + 40}" fill="none" stroke="#2196F3" stroke-width="4" stroke-dasharray="5,5" />
            <text x="${n}" y="${t}" font-size="10" text-anchor="middle" fill="#2196F3" dy="-5">BYPASS</text>
        ` : u``;
  }
  renderEfficiency(n, t) {
    var r;
    if (!this.config.entity_efficiency) return u``;
    const e = ((r = this.hass.states[this.config.entity_efficiency]) == null ? void 0 : r.state) ?? "-", s = 90;
    return u`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${s}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${s / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">Effizienz</text>
                <text x="${s / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${e}%</text>
            </g>
        `;
  }
  renderLevel(n, t) {
    var r;
    if (!this.config.entity_level) return u``;
    const e = ((r = this.hass.states[this.config.entity_level]) == null ? void 0 : r.state) ?? "-", s = 90;
    return u`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${s}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${s / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">Stufe</text>
                <text x="${s / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${e}</text>
            </g>
        `;
  }
  renderFan(n, t, e, s) {
    const i = e ? this.hass.states[e] : void 0, r = (i == null ? void 0 : i.state) ?? "0", o = (i == null ? void 0 : i.attributes.unit_of_measurement) ?? "", a = r === "on" || parseFloat(r) > 0;
    return u`
            <g transform="translate(${n}, ${t})">
                <!-- Speed Display above fan -->
                <text x="0" y="-25" font-size="10" text-anchor="middle" fill="#555" font-weight="bold">${r}${o}</text>
                
                <g class="${a ? "fan-spin" : ""}" style="transform-origin: 0 0;">
                    <circle cx="0" cy="0" r="20" fill="white" stroke="${s}" stroke-width="2"/>
                    <g fill="${s}" opacity="0.9">
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(120)" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(240)" />
                    </g>
                    <circle cx="0" cy="0" r="4" fill="white" stroke="${s}" stroke-width="1"/>
                </g>
            </g>
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

    `;
  }
};
Y([
  J({ attribute: !1 })
], D.prototype, "hass", 2);
Y([
  gt()
], D.prototype, "config", 2);
D = Y([
  _t("airflow-card")
], D);
export {
  D as AirflowCard
};
