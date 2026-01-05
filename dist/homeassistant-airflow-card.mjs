/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, Z = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (n) => new gt(typeof n == "string" ? n : n + "", void 0, q), vt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new gt(e, n, q);
}, kt = (n, t) => {
  if (Z) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = N.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, rt = Z ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Pt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mt, defineProperty: Ot, getOwnPropertyDescriptor: Lt, getOwnPropertyNames: Tt, getOwnPropertySymbols: Ut, getPrototypeOf: Nt } = Object, y = globalThis, at = y.trustedTypes, Ht = at ? at.emptyScript : "", j = y.reactiveElementPolyfillSupport, k = (n, t) => n, H = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Ht : null;
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
} }, K = (n, t) => !Mt(n, t), lt = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: K };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ot(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Lt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const a = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = Nt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, i = [...Tt(e), ...Ut(e)];
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
      for (const s of i) e.unshift(rt(s));
    } else t !== void 0 && e.push(rt(t));
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
    return kt(t, this.constructor.elementStyles), t;
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
      const a = i.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : H;
      this._$Em = s;
      const c = l.fromAttribute(e, a.type);
      this[s] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? K)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
        const { wrapped: a } = o, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[k("elementProperties")] = /* @__PURE__ */ new Map(), w[k("finalized")] = /* @__PURE__ */ new Map(), j == null || j({ ReactiveElement: w }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ct = (n) => n, B = M.trustedTypes, ht = B ? B.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, mt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + _, Bt = `<${xt}>`, x = document, O = () => x.createComment(""), L = (n) => n === null || typeof n != "object" && typeof n != "function", J = Array.isArray, Rt = (n) => J(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, pt = />/g, g = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, ft = /"/g, At = /^(?:script|style|textarea|title)$/i, wt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), R = wt(1), $ = wt(2), E = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), v = x.createTreeWalker(x, 129);
function bt(n, t) {
  if (!J(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Ft = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let c, d, h = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, d = o.exec(l), d !== null); ) u = o.lastIndex, o === P ? d[1] === "!--" ? o = dt : d[1] !== void 0 ? o = pt : d[2] !== void 0 ? (At.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = g) : d[3] !== void 0 && (o = g) : o === g ? d[0] === ">" ? (o = s ?? P, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? g : d[3] === '"' ? ft : ut) : o === ft || o === ut ? o = g : o === dt || o === pt ? o = P : (o = g, s = void 0);
    const f = o === g && n[a + 1].startsWith("/>") ? " " : "";
    r += o === P ? l + Bt : h >= 0 ? (i.push(c), l.slice(0, h) + mt + l.slice(h) + _ + f) : l + _ + (h === -2 ? a : f);
  }
  return [bt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Ft(t, e);
    if (this.el = T.createElement(c, i), v.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = v.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(mt)) {
          const u = d[o++], f = s.getAttribute(h).split(_), C = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: C[2], strings: f, ctor: C[1] === "." ? Vt : C[1] === "?" ? zt : C[1] === "@" ? jt : V }), s.removeAttribute(h);
        } else h.startsWith(_) && (l.push({ type: 6, index: r }), s.removeAttribute(h));
        if (At.test(s.tagName)) {
          const h = s.textContent.split(_), u = h.length - 1;
          if (u > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(h[f], O()), v.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[u], O());
          }
        }
      } else if (s.nodeType === 8) if (s.data === xt) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(_, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += _.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(n, t, e = n, i) {
  var o, a;
  if (t === E) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = L(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = S(n, s._$AS(n, t.values), s, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    v.currentNode = s;
    let r = v.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new U(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new It(r, this, t)), this._$AV.push(c), l = i[++a];
      }
      o !== (l == null ? void 0 : l.index) && (r = v.nextNode(), o++);
    }
    return v.currentNode = x, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
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
    t = S(this, t, e), L(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Rt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && L(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = T.createElement(bt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const o = new Dt(s, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = $t.get(t.strings);
    return e === void 0 && $t.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new U(this.O(O()), this.O(O()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = ct(t).nextSibling;
      ct(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
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
    if (r === void 0) t = S(this, t, e, 0), o = !L(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = S(this, a[i + l], e, l), c === E && (c = this._$AH[l]), o || (o = !L(c) || c !== this._$AH[l]), c === p ? t = p : t !== p && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class zt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class jt extends V {
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
class It {
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
const W = M.litHtmlPolyfillSupport;
W == null || W(T, U), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const Wt = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new U(t.insertBefore(O(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const m = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Wt(e, this.renderRoot, this.renderOptions);
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
var yt;
b._$litElement$ = !0, b.finalized = !0, (yt = m.litElementHydrateSupport) == null || yt.call(m, { LitElement: b });
const G = m.litElementPolyfillSupport;
G == null || G({ LitElement: b });
(m.litElementVersions ?? (m.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: K }, Zt = (n = Gt, t, e) => {
  const { kind: i, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), i === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Y(n) {
  return (t, e) => typeof e == "object" ? Zt(n, t, e) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function St(n) {
  return Y({ ...n, state: !0, attribute: !1 });
}
const _t = {
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
var qt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, Q = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Kt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && qt(t, e, s), s;
};
let F = class extends b {
  setConfig(n) {
    this._config = n;
  }
  render() {
    return !this.hass || !this._config ? R`` : R`
            <div class="card-config">
                <div class="option">
                    <ha-select
                        label="Language"
                        .value=${this._config.language ?? "en"}
                        .configValue=${"language"}
                        @selected=${this._valueChanged}
                        @closed=${(n) => n.stopPropagation()}
                    >
                        <mwc-list-item value="en">English</mwc-list-item>
                        <mwc-list-item value="de">Deutsch</mwc-list-item>
                    </ha-select>
                </div>
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
                         .hass=${this.hass}
                         .value=${this._config.entity_efficiency}
                         .configValue=${"entity_efficiency"}
                         label="Efficiency Sensor (Optional)"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-formfield label="Calculated Efficiency (instead of sensor)">
                        <ha-switch
                            .checked=${this._config.efficiency_calculation_dynamic}
                            .configValue=${"efficiency_calculation_dynamic"}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </ha-formfield>
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

                <!-- Colors -->
                <h3>Colors</h3>
                <div class="side-by-side">
                    <ha-textfield
                        label="Outdoor Color"
                        .value=${this._config.color_outdoor ?? "#2196F3"}
                        .configValue=${"color_outdoor"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <ha-textfield
                        label="Supply Color"
                        .value=${this._config.color_supply ?? "#4CAF50"}
                        .configValue=${"color_supply"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
                <div class="side-by-side">
                    <ha-textfield
                        label="Extract Color"
                        .value=${this._config.color_extract ?? "#FFB300"}
                        .configValue=${"color_extract"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <ha-textfield
                        label="Exhaust Color"
                        .value=${this._config.color_exhaust ?? "#F44336"}
                        .configValue=${"color_exhaust"}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
            </div>
        `;
  }
  _valueChanged(n) {
    var o;
    if (!this._config || !this.hass)
      return;
    const t = n.target, e = t.configValue;
    let i = ((o = n.detail) == null ? void 0 : o.value) !== void 0 ? n.detail.value : t.checked !== void 0 ? t.checked : t.value;
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
    return vt`
            .card-config {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .option {
                display: flex;
                flex-direction: column;
            }
            ha-select {
                width: 100%;
            }
            .side-by-side {
                display: flex;
                flex-direction: row;
                gap: 8px;
            }
            .side-by-side > * {
                flex: 1;
            }
            ha-formfield {
                display: flex;
                height: 56px;
                align-items: center;
                --mdc-typography-body2-font-size: 14px;
            }
            ha-switch {
                padding: 16px;
            }
            h3 {
                margin: 16px 0 8px 0;
                font-size: 16px;
                font-weight: 500;
                color: var(--secondary-text-color);
            }
        `;
  }
};
Q([
  Y({ attribute: !1 })
], F.prototype, "hass", 2);
Q([
  St()
], F.prototype, "_config", 2);
F = Q([
  Et("airflow-card-editor")
], F);
var Jt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, X = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Yt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Jt(t, e, s), s;
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
      entity_efficiency: "sensor.efficiency",
      color_outdoor: "#2196F3",
      color_supply: "#4CAF50",
      color_extract: "#FFB300",
      color_exhaust: "#F44336"
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
    var st, nt;
    const s = this.config.color_supply || "#4CAF50", r = this.config.color_extract || "#FFB300", o = this.config.color_exhaust || "#F44336", a = this.config.color_outdoor || "#2196F3", l = this.config.entity_bypass, c = l ? (st = this.hass.states[l]) == null ? void 0 : st.state : "off", d = c === "on" || c === "open" || c === "active", h = this.config.entity_level, u = h ? parseFloat(((nt = this.hass.states[h]) == null ? void 0 : nt.state) ?? "0") : 1, f = this.config.level_min ?? 0, tt = (this.config.level_max ?? 4) - f, et = tt > 0 ? Math.max(0, Math.min(1, (u - f) / tt)) : 0.5, it = u > 0 ? (3 - et * 2.6).toFixed(2) : 0, z = u > 0 ? (2 - et * 1.8).toFixed(2) : 0, Ct = this.config.language ?? "en", A = _t[Ct] || _t.en;
    return $`
       <svg viewBox="0 0 ${600} ${450}" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${it}s; --flow-speed: ${z}s;">
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
                    animation-play-state: ${it === 0 ? "paused" : "running"};
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                .flow-line {
                    stroke-dasharray: 10, 15;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${z === 0 ? "none" : "block"};
                }
                .flow-line-inner {
                    stroke-dasharray: 4, 8;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${z === 0 ? "none" : "block"};
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
         <path class="flow-line" d="M ${340} ${265} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${d ? a : s}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${550} ${165} L ${360} ${165} L ${340} ${185}" fill="none" stroke="${r}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${340} ${185} L ${260} ${265}" fill="none" stroke="url(#gradExtractExhaust)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${260} ${265} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${o}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(70, 65, A.outdoor, this.config.entity_temp_outdoor, a)}
         ${this.renderEfficiency(255, 65, A.efficiency)}
         ${this.renderPortBox(440, 65, A.extract, this.config.entity_temp_extract, r)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(70, 330, A.exhaust, this.config.entity_temp_exhaust, o)}
         ${this.renderPortBox(255, 330, A.level, this.config.entity_level, "#444")}
         ${this.renderPortBox(440, 330, A.supply, this.config.entity_temp_supply, d ? a : s)}

         <!-- Fans -->
         ${this.renderFan(450, 285, this.config.entity_fan_supply, d ? a : s)}
         ${this.renderFan(150, 285, this.config.entity_fan_extract, o)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(300, 225)}



       </svg>
     `;
  }
  renderPortBox(n, t, e, i, s) {
    var c, d;
    const r = i ? ((c = this.hass.states[i]) == null ? void 0 : c.state) ?? "N/A" : "-", o = i ? ((d = this.hass.states[i]) == null ? void 0 : d.attributes.unit_of_measurement) ?? "" : "", a = 90;
    return $`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${a}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${a / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${s}">${e}</text>
                <text x="${a / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${r}${o}</text>
            </g>
        `;
  }
  renderBypass(n, t) {
    const e = this.config.entity_bypass;
    if (!e) return $``;
    const i = this.hass.states[e], s = i == null ? void 0 : i.state;
    return s === "on" || s === "open" || s === "active" ? $`` : $``;
  }
  renderEfficiency(n, t, e) {
    var o;
    let i = "-";
    if (this.config.efficiency_calculation_dynamic) {
      const a = this._getNumericState(this.config.entity_temp_supply), l = this._getNumericState(this.config.entity_temp_extract), c = this._getNumericState(this.config.entity_temp_outdoor);
      if (a !== void 0 && l !== void 0 && c !== void 0) {
        const d = l - c;
        if (Math.abs(d) > 0.1) {
          const h = (a - c) / d * 100;
          i = Math.max(0, Math.min(100, Math.round(h))).toString();
        }
      }
    } else if (this.config.entity_efficiency)
      i = ((o = this.hass.states[this.config.entity_efficiency]) == null ? void 0 : o.state) ?? "-";
    else
      return $``;
    const s = 90;
    return $`
            <g transform="translate(${n}, ${t})">
                <rect x="0" y="0" width="${s}" height="${55}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${s / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">${e}</text>
                <text x="${s / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${i}%</text>
            </g>
        `;
  }
  _getNumericState(n) {
    var i;
    if (!n) return;
    const t = (i = this.hass.states[n]) == null ? void 0 : i.state;
    if (t === void 0) return;
    const e = parseFloat(t);
    return isNaN(e) ? void 0 : e;
  }
  renderFan(n, t, e, i) {
    const s = e ? this.hass.states[e] : void 0, r = (s == null ? void 0 : s.state) ?? "0";
    s == null || s.attributes.unit_of_measurement;
    const o = parseFloat(r), a = r === "on" || o > 0, l = !isNaN(o) && o > 0;
    return $`
            <g transform="translate(${n}, ${t})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${l ? $`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${i}" font-weight="bold">${r} RPM</text>
                ` : ""}
                
                <g class="${a ? "fan-spin" : ""}" style="transform-origin: 0 0;">
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
    return vt`
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
export {
  D as AirflowCard
};
