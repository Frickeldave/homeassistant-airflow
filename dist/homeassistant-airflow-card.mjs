/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, G = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let pt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (G && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xt = (n) => new pt(typeof n == "string" ? n : n + "", void 0, W), ut = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new pt(e, n, W);
}, At = (n, t) => {
  if (G) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = T.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, et = G ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return xt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wt, defineProperty: bt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: St, getOwnPropertySymbols: Ct, getPrototypeOf: kt } = Object, _ = globalThis, it = _.trustedTypes, Pt = it ? it.emptyScript : "", V = _.reactiveElementPolyfillSupport, k = (n, t) => n, H = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Pt : null;
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
} }, Z = (n, t) => !wt(n, t), st = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && bt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const h = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = kt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, i = [...St(e), ...Ct(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(et(s));
    } else t !== void 0 && e.push(et(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return At(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : H).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((r = h.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? h.converter : H;
      this._$Em = s;
      const l = a.fromAttribute(e, h.type);
      this[s] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? Z)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: h } = o, a = this[r];
        h !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[k("elementProperties")] = /* @__PURE__ */ new Map(), w[k("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: w }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, nt = (n) => n, N = P.trustedTypes, rt = N ? N.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ft = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + y, Mt = `<${$t}>`, A = document, M = () => A.createComment(""), O = (n) => n === null || typeof n != "object" && typeof n != "function", J = Array.isArray, Ot = (n) => J(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", j = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, at = />/g, m = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, lt = /"/g, yt = /^(?:script|style|textarea|title)$/i, _t = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), R = _t(1), $ = _t(2), E = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ct = /* @__PURE__ */ new WeakMap(), v = A.createTreeWalker(A, 129);
function gt(n, t) {
  if (!J(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(t) : t;
}
const Ut = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let h = 0; h < e; h++) {
    const a = n[h];
    let l, d, c = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, d = o.exec(a), d !== null); ) u = o.lastIndex, o === C ? d[1] === "!--" ? o = ot : d[1] !== void 0 ? o = at : d[2] !== void 0 ? (yt.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = m) : d[3] !== void 0 && (o = m) : o === m ? d[0] === ">" ? (o = s ?? C, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? m : d[3] === '"' ? lt : ht) : o === lt || o === ht ? o = m : o === ot || o === at ? o = C : (o = m, s = void 0);
    const f = o === m && n[h + 1].startsWith("/>") ? " " : "";
    r += o === C ? a + Mt : c >= 0 ? (i.push(l), a.slice(0, c) + ft + a.slice(c) + y + f) : a + y + (c === -2 ? h : f);
  }
  return [gt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, a = this.parts, [l, d] = Ut(t, e);
    if (this.el = U.createElement(l, i), v.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = v.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(ft)) {
          const u = d[o++], f = s.getAttribute(c).split(y), g = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? Tt : g[1] === "?" ? Ht : g[1] === "@" ? Nt : z }), s.removeAttribute(c);
        } else c.startsWith(y) && (a.push({ type: 6, index: r }), s.removeAttribute(c));
        if (yt.test(s.tagName)) {
          const c = s.textContent.split(y), u = c.length - 1;
          if (u > 0) {
            s.textContent = N ? N.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(c[f], M()), v.nextNode(), a.push({ type: 2, index: ++r });
            s.append(c[u], M());
          }
        }
      } else if (s.nodeType === 8) if (s.data === $t) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(y, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += y.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(n, t, e = n, i) {
  var o, h;
  if (t === E) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = O(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = S(n, s._$AS(n, t.values), s, i)), t;
}
class Lt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    v.currentNode = s;
    let r = v.nextNode(), o = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new L(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new Rt(r, this, t)), this._$AV.push(l), a = i[++h];
      }
      o !== (a == null ? void 0 : a.index) && (r = v.nextNode(), o++);
    }
    return v.currentNode = A, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = S(this, t, e), O(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = U.createElement(gt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const o = new Lt(s, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ct.get(t.strings);
    return e === void 0 && ct.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new L(this.O(M()), this.O(M()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = nt(t).nextSibling;
      nt(t).remove(), t = s;
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
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = S(this, t, e, 0), o = !O(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = S(this, h[i + a], e, a), l === E && (l = this._$AH[a]), o || (o = !O(l) || l !== this._$AH[a]), l === p ? t = p : t !== p && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Tt extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ht extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Nt extends z {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? p) === E) return;
    const i = this._$AH, s = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Rt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const I = P.litHtmlPolyfillSupport;
I == null || I(U, L), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const Bt = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new L(t.insertBefore(M(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
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
var dt;
b._$litElement$ = !0, b.finalized = !0, (dt = x.litElementHydrateSupport) == null || dt.call(x, { LitElement: b });
const q = x.litElementPolyfillSupport;
q == null || q({ LitElement: b });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: Z }, zt = (n = Dt, t, e) => {
  const { kind: i, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), i === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, n, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, n, h), h;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, n, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function K(n) {
  return (t, e) => typeof e == "object" ? zt(n, t, e) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function vt(n) {
  return K({ ...n, state: !0, attribute: !1 });
}
var Ft = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, Y = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Vt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Ft(t, e, s), s;
};
let B = class extends b {
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
                         label="Fan Level Sensor (Optional)"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="side-by-side">
                    <ha-textfield
                        label="Min Level"
                        type="number"
                        .value=${this._config.level_min ?? 0}
                        .configValue=${"level_min"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <ha-textfield
                        label="Max Level"
                        type="number"
                        .value=${this._config.level_max ?? 4}
                        .configValue=${"level_max"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
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
    var o;
    if (!this._config || !this.hass)
      return;
    const t = n.target, e = t.configValue;
    let i = ((o = n.detail) == null ? void 0 : o.value) !== void 0 ? n.detail.value : t.value;
    if ((e === "level_min" || e === "level_max") && (i = i !== "" ? Number(i) : void 0), this._config[e] === i)
      return;
    const s = {
      ...this._config,
      [e]: i
    }, r = new CustomEvent("config-changed", {
      detail: { config: s },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(r);
  }
  static get styles() {
    return ut`
            .card-config {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .option {
                display: flex;
                flex-direction: column;
            }
            .side-by-side {
                display: flex;
                flex-direction: row;
                gap: 8px;
            }
            .side-by-side > * {
                flex: 1;
            }
        `;
  }
};
Y([
  K({ attribute: !1 })
], B.prototype, "hass", 2);
Y([
  vt()
], B.prototype, "_config", 2);
B = Y([
  mt("airflow-card-editor")
], B);
var jt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, Q = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? It(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && jt(t, e, s), s;
};
let D = class extends b {
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
      level_min: 0,
      level_max: 4,
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
    var X;
    const s = "#4CAF50", r = "#FFC107", o = "#F44336", h = "#2196F3", a = this.config.entity_level, l = a ? parseFloat(((X = this.hass.states[a]) == null ? void 0 : X.state) ?? "0") : 1, d = this.config.level_min ?? 0, u = (this.config.level_max ?? 4) - d, f = u > 0 ? Math.max(0, Math.min(1, (l - d) / u)) : 0.5, g = l > 0 ? (3 - f * 2.6).toFixed(2) : 0, F = l > 0 ? (2 - f * 1.8).toFixed(2) : 0;
    return $`
       <svg viewBox="0 0 ${600} ${450}" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${g}s; --flow-speed: ${F}s;">
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
                <stop offset="0%" stop-color="${h}" />
                <stop offset="100%" stop-color="${s}" />
            </linearGradient>

            <linearGradient id="gradExtractExhaust" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${r}" />
                <stop offset="100%" stop-color="${o}" />
            </linearGradient>
            
            <!-- Fan Animation -->
            <style>
                .fan-spin { 
                    animation: spin var(--fan-speed, 2s) linear infinite;
                    animation-play-state: ${g === 0 ? "paused" : "running"};
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                .flow-line {
                    stroke-dasharray: 10, 15;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${F === 0 ? "none" : "block"};
                }
                .flow-line-inner {
                    stroke-dasharray: 4, 8;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${F === 0 ? "none" : "block"};
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
         <path class="flow-line" d="M ${50} ${165} L ${240} ${165} L ${260} ${185}" fill="none" stroke="${h}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${260} ${185} L ${340} ${265}" fill="none" stroke="url(#gradOutdoorSupply)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${340} ${265} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${s}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${550} ${165} L ${360} ${165} L ${340} ${185}" fill="none" stroke="${r}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${340} ${185} L ${260} ${265}" fill="none" stroke="url(#gradExtractExhaust)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${260} ${265} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${o}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(70, 65, "Outdoor", this.config.entity_temp_outdoor, h)}
         ${this.renderEfficiency(255, 65)}
         ${this.renderPortBox(440, 65, "Extract", this.config.entity_temp_extract, r)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(70, 330, "Exhaust", this.config.entity_temp_exhaust, o)}
         ${this.renderLevel(255, 330)}
         ${this.renderPortBox(440, 330, "Supply", this.config.entity_temp_supply, s)}

         <!-- Fans -->
         ${this.renderFan(450, 285, this.config.entity_fan_supply, s)}
         ${this.renderFan(150, 285, this.config.entity_fan_extract, o)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(300, 225)}



       </svg>
     `;
  }
  renderPortBox(n, t, e, i, s) {
    var l, d;
    const r = i ? ((l = this.hass.states[i]) == null ? void 0 : l.state) ?? "N/A" : "-", o = i ? ((d = this.hass.states[i]) == null ? void 0 : d.attributes.unit_of_measurement) ?? "°C" : "", h = 90;
    return $`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${h}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${h / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${s}">${e}</text>
                <text x="${h / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${r}${o}</text>
            </g>
        `;
  }
  renderBypass(n, t) {
    var s;
    if (!this.config.entity_bypass) return $``;
    const e = (s = this.hass.states[this.config.entity_bypass]) == null ? void 0 : s.state;
    return e === "on" || e === "open" || e === "active" ? $`
            <path d="M ${n - 60} ${t - 40} C ${n - 10} ${t - 40}, ${n + 10} ${t + 40}, ${n + 60} ${t + 40}" fill="none" stroke="#2196F3" stroke-width="4" stroke-dasharray="5,5" />
            <text x="${n}" y="${t}" font-size="10" text-anchor="middle" fill="#2196F3" dy="-5">BYPASS</text>
        ` : $``;
  }
  renderEfficiency(n, t) {
    var r;
    if (!this.config.entity_efficiency) return $``;
    const e = ((r = this.hass.states[this.config.entity_efficiency]) == null ? void 0 : r.state) ?? "-", i = 90;
    return $`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${i}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${i / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">Effizienz</text>
                <text x="${i / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${e}%</text>
            </g>
        `;
  }
  renderLevel(n, t) {
    var r;
    if (!this.config.entity_level) return $``;
    const e = ((r = this.hass.states[this.config.entity_level]) == null ? void 0 : r.state) ?? "-", i = 90;
    return $`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${i}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${i / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">Stufe</text>
                <text x="${i / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${e}</text>
            </g>
        `;
  }
  renderFan(n, t, e, i) {
    const s = e ? this.hass.states[e] : void 0, r = (s == null ? void 0 : s.state) ?? "0";
    s == null || s.attributes.unit_of_measurement;
    const o = parseFloat(r), h = r === "on" || o > 0, a = !isNaN(o) && o > 0;
    return $`
            <g transform="translate(${n}, ${t})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${a ? $`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${i}" font-weight="bold">${r} RPM</text>
                ` : ""}
                
                <g class="${h ? "fan-spin" : ""}" style="transform-origin: 0 0;">
                    <circle cx="0" cy="0" r="20" fill="white" stroke="${i}" stroke-width="2"/>
                    <g fill="${i}" opacity="0.9">
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(120)" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(240)" />
                    </g>
                    <circle cx="0" cy="0" r="4" fill="white" stroke="${i}" stroke-width="1"/>
                </g>
            </g>
        `;
  }
  static get styles() {
    return ut`
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
Q([
  K({ attribute: !1 })
], D.prototype, "hass", 2);
Q([
  vt()
], D.prototype, "config", 2);
D = Q([
  mt("airflow-card")
], D);
export {
  D as AirflowCard
};
