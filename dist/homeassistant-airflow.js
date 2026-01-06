/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, Z = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), rt = /* @__PURE__ */ new WeakMap();
let mt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (o) => new mt(typeof o == "string" ? o : o + "", void 0, q), gt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new mt(e, o, q);
}, Mt = (o, t) => {
  if (Z) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = N.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, nt = Z ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Pt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ot, defineProperty: kt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Lt, getOwnPropertySymbols: Tt, getPrototypeOf: Ut } = Object, _ = globalThis, at = _.trustedTypes, Nt = at ? at.emptyScript : "", I = _.reactiveElementPolyfillSupport, M = (o, t) => o, B = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Nt : null;
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
} }, K = (o, t) => !Ot(o, t), ct = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: K };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && kt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, s = [...Lt(e), ...Tt(e)];
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
      for (const i of s) e.unshift(nt(i));
    } else t !== void 0 && e.push(nt(t));
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
    return Mt(t, this.constructor.elementStyles), t;
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
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : B).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : B;
      this._$Em = i;
      const l = c.fromAttribute(e, a.type);
      this[i] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? K)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
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
        const { wrapped: a } = r, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[M("elementProperties")] = /* @__PURE__ */ new Map(), w[M("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: w }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, lt = (o) => o, H = O.trustedTypes, ht = H ? H.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, xt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, vt = "?" + y, Bt = `<${vt}>`, v = document, F = () => v.createComment(""), L = (o) => o === null || typeof o != "object" && typeof o != "function", J = Array.isArray, Ht = (o) => J(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, pt = />/g, m = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, ft = /"/g, At = /^(?:script|style|textarea|title)$/i, wt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), k = wt(1), $ = wt(2), E = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), g = v.createTreeWalker(v, 129);
function bt(o, t) {
  if (!J(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Rt = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = P;
  for (let a = 0; a < e; a++) {
    const c = o[a];
    let l, d, h = -1, u = 0;
    for (; u < c.length && (r.lastIndex = u, d = r.exec(c), d !== null); ) u = r.lastIndex, r === P ? d[1] === "!--" ? r = dt : d[1] !== void 0 ? r = pt : d[2] !== void 0 ? (At.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = m) : d[3] !== void 0 && (r = m) : r === m ? d[0] === ">" ? (r = i ?? P, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, l = d[1], r = d[3] === void 0 ? m : d[3] === '"' ? ft : ut) : r === ft || r === ut ? r = m : r === dt || r === pt ? r = P : (r = m, i = void 0);
    const f = r === m && o[a + 1].startsWith("/>") ? " " : "";
    n += r === P ? c + Bt : h >= 0 ? (s.push(l), c.slice(0, h) + xt + c.slice(h) + y + f) : c + y + (h === -2 ? a : f);
  }
  return [bt(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class T {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, c = this.parts, [l, d] = Rt(t, e);
    if (this.el = T.createElement(l, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = g.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(xt)) {
          const u = d[r++], f = i.getAttribute(h).split(y), C = /([.?@])?(.*)/.exec(u);
          c.push({ type: 1, index: n, name: C[2], strings: f, ctor: C[1] === "." ? zt : C[1] === "?" ? jt : C[1] === "@" ? It : z }), i.removeAttribute(h);
        } else h.startsWith(y) && (c.push({ type: 6, index: n }), i.removeAttribute(h));
        if (At.test(i.tagName)) {
          const h = i.textContent.split(y), u = h.length - 1;
          if (u > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let f = 0; f < u; f++) i.append(h[f], F()), g.nextNode(), c.push({ type: 2, index: ++n });
            i.append(h[u], F());
          }
        }
      } else if (i.nodeType === 8) if (i.data === vt) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(y, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += y.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(o, t, e = o, s) {
  var r, a;
  if (t === E) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = L(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = S(o, i._$AS(o, t.values), i, s)), t;
}
class Dt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? v).importNode(e, !0);
    g.currentNode = i;
    let n = g.nextNode(), r = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new U(n, n.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (l = new Gt(n, this, t)), this._$AV.push(l), c = s[++a];
      }
      r !== (c == null ? void 0 : c.index) && (n = g.nextNode(), r++);
    }
    return g.currentNode = v, i;
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
    t = S(this, t, e), L(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && L(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(bt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new Dt(i, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = $t.get(t.strings);
    return e === void 0 && $t.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new U(this.O(F()), this.O(F()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = lt(t).nextSibling;
      lt(t).remove(), t = i;
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
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = S(this, t, e, 0), r = !L(t) || t !== this._$AH && t !== E, r && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++) l = S(this, a[s + c], e, c), l === E && (l = this._$AH[c]), r || (r = !L(l) || l !== this._$AH[c]), l === p ? t = p : t !== p && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class jt extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class It extends z {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? p) === E) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const V = O.litHtmlPolyfillSupport;
V == null || V(T, U), (O.litHtmlVersions ?? (O.litHtmlVersions = [])).push("3.3.2");
const Vt = (o, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new U(t.insertBefore(F(), n), n, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class b extends w {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vt(e, this.renderRoot, this.renderOptions);
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
var _t;
b._$litElement$ = !0, b.finalized = !0, (_t = x.litElementHydrateSupport) == null || _t.call(x, { LitElement: b });
const W = x.litElementPolyfillSupport;
W == null || W({ LitElement: b });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: K }, Zt = (o = Wt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(e.name, o), s === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, c, o, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, o, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(a) {
      const c = this[r];
      t.call(this, a), this.requestUpdate(r, c, o, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Y(o) {
  return (t, e) => typeof e == "object" ? Zt(o, t, e) : ((s, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function St(o) {
  return Y({ ...o, state: !0, attribute: !1 });
}
const yt = {
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
var qt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, Q = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Kt(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && qt(t, e, i), i;
};
let R = class extends b {
  setConfig(o) {
    this._config = o;
  }
  render() {
    if (!this.hass || !this._config)
      return k``;
    const o = [
      { label: "Blue (#2196F3)", value: "#2196F3" },
      { label: "Green (#4CAF50)", value: "#4CAF50" },
      { label: "Amber (#FFB300)", value: "#FFB300" },
      { label: "Red (#F44336)", value: "#F44336" },
      { label: "Grey (#9E9E9E)", value: "#9E9E9E" },
      { label: "Black (#000000)", value: "#000000" },
      { label: "White (#FFFFFF)", value: "#FFFFFF" }
    ];
    return this._ensureColorOption("color_outdoor", o), this._ensureColorOption("color_supply", o), this._ensureColorOption("color_extract", o), this._ensureColorOption("color_exhaust", o), k`
            <div class="card-config">
                <div class="debug-box">
                    <strong>Editor Config:</strong><br>
                    Version: 1.5 (Level Min/Max)<br>
                </div>

                ${this.renderSelector("name", "Name", { text: {} })}

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
    return k`
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
    return gt`
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
Q([
  Y({ attribute: !1 })
], R.prototype, "hass", 2);
Q([
  St()
], R.prototype, "_config", 2);
R = Q([
  Et("airflow-card-editor")
], R);
var Jt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, X = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Yt(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && Jt(t, e, i), i;
};
let D = class extends b {
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
    return !this.config || !this.hass ? k`` : k`
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
    var it, ot;
    const i = this.config.color_supply || "#4CAF50", n = this.config.color_extract || "#FFB300", r = this.config.color_exhaust || "#F44336", a = this.config.color_outdoor || "#2196F3", c = this.config.entity_bypass, l = c ? (it = this.hass.states[c]) == null ? void 0 : it.state : "off", d = l === "on" || l === "open" || l === "active", h = this.config.entity_level, u = h ? parseFloat(((ot = this.hass.states[h]) == null ? void 0 : ot.state) ?? "0") : 1, f = this.config.level_min ?? 0, tt = (this.config.level_max ?? 4) - f, et = tt > 0 ? Math.max(0, Math.min(1, (u - f) / tt)) : 0.5, st = u > 0 ? (3 - et * 2.6).toFixed(2) : 0, j = u > 0 ? (2 - et * 1.8).toFixed(2) : 0, Ct = this.config.language ?? "en", A = yt[Ct] || yt.en;
    return $`
       <svg viewBox="0 0 ${600} ${450}" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${st}s; --flow-speed: ${j}s;">
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
                <stop offset="0%" stop-color="${n}" />
                <stop offset="100%" stop-color="${r}" />
            </linearGradient>
            
            <!-- Fan Animation -->
            <style>
                .fan-spin { 
                    animation: spin var(--fan-speed, 2s) linear infinite;
                    animation-play-state: ${st === 0 ? "paused" : "running"};
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                .flow-line {
                    stroke-dasharray: 10, 15;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${j === 0 ? "none" : "block"};
                }
                .flow-line-inner {
                    stroke-dasharray: 4, 8;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${j === 0 ? "none" : "block"};
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
         <!-- Crossing (Inside Heat Exchanger) - Thinner with Gradient. Diverts if Bypass is Active -->
         <path class="flow-line-inner" d="${d ? "M 260 185 L 220 225 L 300 305 L 340 265" : "M 260 185 L 340 265"}" fill="none" stroke="${d ? a : "url(#gradOutdoorSupply)"}" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${340} ${265} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${d ? a : i}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${550} ${165} L ${360} ${165} L ${340} ${185}" fill="none" stroke="${n}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${340} ${185} L ${260} ${265}" fill="none" stroke="url(#gradExtractExhaust)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${260} ${265} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${r}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(70, 65, A.outdoor, this.config.entity_temp_outdoor, a)}
         ${this.renderEfficiency(255, 65, A.efficiency)}
         ${this.renderPortBox(440, 65, A.extract, this.config.entity_temp_extract, n)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(70, 330, A.exhaust, this.config.entity_temp_exhaust, r)}
         ${this.renderPortBox(255, 330, A.level, this.config.entity_level, "#444")}
         ${this.renderPortBox(440, 330, A.supply, this.config.entity_temp_supply, d ? a : i)}

         <!-- Fans -->
         ${this.renderFan(450, 285, this.config.entity_fan_supply, d ? a : i)}
         ${this.renderFan(150, 285, this.config.entity_fan_extract, r)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(300, 225)}



       </svg>
     `;
  }
  renderPortBox(o, t, e, s, i) {
    var l, d;
    const n = s ? ((l = this.hass.states[s]) == null ? void 0 : l.state) ?? "N/A" : "-", r = s ? ((d = this.hass.states[s]) == null ? void 0 : d.attributes.unit_of_measurement) ?? "" : "", a = 90;
    return $`
            <g transform="translate(${o}, ${t})">
                <rect x="0" y="0" width="${a}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${a / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${i}">${e}</text>
                <text x="${a / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${n}${r}</text>
            </g>
        `;
  }
  renderBypass(o, t) {
    const e = this.config.entity_bypass;
    if (!e) return $``;
    const s = this.hass.states[e], i = s == null ? void 0 : s.state;
    return i === "on" || i === "open" || i === "active" ? $`` : $``;
  }
  renderEfficiency(o, t, e) {
    var r;
    let s = "-";
    if (this.config.efficiency_calculation_dynamic) {
      const a = this._getNumericState(this.config.entity_temp_supply), c = this._getNumericState(this.config.entity_temp_extract), l = this._getNumericState(this.config.entity_temp_outdoor);
      if (a !== void 0 && c !== void 0 && l !== void 0) {
        const d = c - l;
        if (Math.abs(d) > 0.1) {
          const h = (a - l) / d * 100;
          s = Math.max(0, Math.min(100, Math.round(h))).toString();
        }
      }
    } else if (this.config.entity_efficiency)
      s = ((r = this.hass.states[this.config.entity_efficiency]) == null ? void 0 : r.state) ?? "-";
    else
      return $``;
    const i = 90;
    return $`
            <g transform="translate(${o}, ${t})">
                <rect x="0" y="0" width="${i}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${i / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">${e}</text>
                <text x="${i / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${s}%</text>
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
  renderFan(o, t, e, s) {
    const i = e ? this.hass.states[e] : void 0, n = (i == null ? void 0 : i.state) ?? "0";
    i == null || i.attributes.unit_of_measurement;
    const r = parseFloat(n), a = n === "on" || r > 0, c = !isNaN(r) && r > 0;
    return $`
            <g transform="translate(${o}, ${t})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${c ? $`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${s}" font-weight="bold">${n} RPM</text>
                ` : ""}
                
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
    return gt`
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
X([
  Y({ attribute: !1 })
], D.prototype, "hass", 2);
X([
  St()
], D.prototype, "config", 2);
D = X([
  Et("airflow-card")
], D);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "airflow-card",
  name: "Airflow Card",
  preview: !0,
  description: "A card to visualize airflow and efficiency for ventilation systems."
});
export {
  D as AirflowCard
};
