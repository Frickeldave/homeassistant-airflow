/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, pt = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = Symbol(), St = /* @__PURE__ */ new WeakMap();
let Dt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (pt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = St.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && St.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Qt = (i) => new Dt(typeof i == "string" ? i : i + "", void 0, ut), Ht = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[n + 1], i[0]);
  return new Dt(e, i, ut);
}, Yt = (i, t) => {
  if (pt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), o = Y.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, Et = pt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Qt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xt, defineProperty: te, getOwnPropertyDescriptor: ee, getOwnPropertyNames: se, getOwnPropertySymbols: oe, getPrototypeOf: ie } = Object, M = globalThis, Ct = M.trustedTypes, re = Ct ? Ct.emptyScript : "", ct = M.reactiveElementPolyfillSupport, I = (i, t) => i, X = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? re : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, ft = (i, t) => !Xt(i, t), Pt = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Pt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && te(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: n } = ee(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const c = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = ie(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, s = [...se(e), ...oe(e)];
      for (const o of s) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, o] of e) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const o = this._$Eu(e, s);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) e.unshift(Et(o));
    } else t !== void 0 && e.push(Et(t));
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
    return Yt(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : X).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = s.getPropertyOptions(o), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : X;
      this._$Em = o;
      const l = a.fromAttribute(e, c.type);
      this[o] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, o = !1, n) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (n = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? ft)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: c } = r, a = this[n];
        c !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[I("elementProperties")] = /* @__PURE__ */ new Map(), L[I("finalized")] = /* @__PURE__ */ new Map(), ct == null || ct({ ReactiveElement: L }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Mt = (i) => i, tt = W.trustedTypes, Ot = tt ? tt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Rt = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, zt = "?" + P, ne = `<${zt}>`, N = document, V = () => N.createComment(""), q = (i) => i === null || typeof i != "object" && typeof i != "function", $t = Array.isArray, ae = (i) => $t(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", lt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, kt = /-->/g, Ft = />/g, F = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tt = /'/g, Bt = /"/g, jt = /^(?:script|style|textarea|title)$/i, It = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), S = It(1), g = It(2), D = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Nt = /* @__PURE__ */ new WeakMap(), T = N.createTreeWalker(N, 129);
function Wt(i, t) {
  if (!$t(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ot !== void 0 ? Ot.createHTML(t) : t;
}
const ce = (i, t) => {
  const e = i.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = j;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let l, h, d = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, h = r.exec(a), h !== null); ) p = r.lastIndex, r === j ? h[1] === "!--" ? r = kt : h[1] !== void 0 ? r = Ft : h[2] !== void 0 ? (jt.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = F) : h[3] !== void 0 && (r = F) : r === F ? h[0] === ">" ? (r = o ?? j, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, l = h[1], r = h[3] === void 0 ? F : h[3] === '"' ? Bt : Tt) : r === Bt || r === Tt ? r = F : r === kt || r === Ft ? r = j : (r = F, o = void 0);
    const u = r === F && i[c + 1].startsWith("/>") ? " " : "";
    n += r === j ? a + ne : d >= 0 ? (s.push(l), a.slice(0, d) + Rt + a.slice(d) + P + u) : a + P + (d === -2 ? c : u);
  }
  return [Wt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class G {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, h] = ce(t, e);
    if (this.el = G.createElement(l, s), T.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = T.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Rt)) {
          const p = h[r++], u = o.getAttribute(d).split(P), _ = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: _[2], strings: u, ctor: _[1] === "." ? he : _[1] === "?" ? de : _[1] === "@" ? pe : ot }), o.removeAttribute(d);
        } else d.startsWith(P) && (a.push({ type: 6, index: n }), o.removeAttribute(d));
        if (jt.test(o.tagName)) {
          const d = o.textContent.split(P), p = d.length - 1;
          if (p > 0) {
            o.textContent = tt ? tt.emptyScript : "";
            for (let u = 0; u < p; u++) o.append(d[u], V()), T.nextNode(), a.push({ type: 2, index: ++n });
            o.append(d[p], V());
          }
        }
      } else if (o.nodeType === 8) if (o.data === zt) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(P, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += P.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = N.createElement("template");
    return s.innerHTML = t, s;
  }
}
function H(i, t, e = i, s) {
  var r, c;
  if (t === D) return t;
  let o = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = q(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = o : e._$Cl = o), o !== void 0 && (t = H(i, o._$AS(i, t.values), o, s)), t;
}
class le {
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
    const { el: { content: e }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? N).importNode(e, !0);
    T.currentNode = o;
    let n = T.nextNode(), r = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new Z(n, n.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (l = new ue(n, this, t)), this._$AV.push(l), a = s[++c];
      }
      r !== (a == null ? void 0 : a.index) && (n = T.nextNode(), r++);
    }
    return T.currentNode = N, o;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Z {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = H(this, t, e), q(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== D && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ae(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = G.createElement(Wt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const r = new le(o, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Nt.get(t.strings);
    return e === void 0 && Nt.set(t.strings, e = new G(t)), e;
  }
  k(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const n of t) o === e.length ? e.push(s = new Z(this.O(V()), this.O(V()), this, this.options)) : s = e[o], s._$AI(n), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = Mt(t).nextSibling;
      Mt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, e = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = H(this, t, e, 0), r = !q(t) || t !== this._$AH && t !== D, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++) l = H(this, c[s + a], e, a), l === D && (l = this._$AH[a]), r || (r = !q(l) || l !== this._$AH[a]), l === f ? t = f : t !== f && (t += (l ?? "") + n[a + 1]), this._$AH[a] = l;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class he extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class de extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class pe extends ot {
  constructor(t, e, s, o, n) {
    super(t, e, s, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? f) === D) return;
    const s = this._$AH, o = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== f && (s === f || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ue {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const ht = W.litHtmlPolyfillSupport;
ht == null || ht(G, Z), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.2");
const fe = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = o = new Z(t.insertBefore(V(), n), n, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis;
class U extends L {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = fe(e, this.renderRoot, this.renderOptions);
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
    return D;
  }
}
var Ut;
U._$litElement$ = !0, U.finalized = !0, (Ut = B.litElementHydrateSupport) == null || Ut.call(B, { LitElement: U });
const dt = B.litElementPolyfillSupport;
dt == null || dt({ LitElement: U });
(B.litElementVersions ?? (B.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: ft }, _e = (i = $e, t, e) => {
  const { kind: s, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: r } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, i, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, i, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function _t(i) {
  return (t, e) => typeof e == "object" ? _e(i, t, e) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function qt(i) {
  return _t({ ...i, state: !0, attribute: !1 });
}
const Lt = {
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
var me = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, mt = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? ye(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && me(t, e, o), o;
};
let et = class extends U {
  setConfig(i) {
    this._config = i;
  }
  render() {
    if (!this.hass || !this._config)
      return S``;
    const i = [
      { label: "Blue (#2196F3)", value: "#2196F3" },
      { label: "Green (#4CAF50)", value: "#4CAF50" },
      { label: "Amber (#FFB300)", value: "#FFB300" },
      { label: "Red (#F44336)", value: "#F44336" },
      { label: "Grey (#9E9E9E)", value: "#9E9E9E" },
      { label: "Black (#000000)", value: "#000000" },
      { label: "White (#FFFFFF)", value: "#FFFFFF" }
    ];
    return this._ensureColorOption("color_outdoor", i), this._ensureColorOption("color_supply", i), this._ensureColorOption("color_extract", i), this._ensureColorOption("color_exhaust", i), this._ensureColorOption("base_color_supply", i), this._ensureColorOption("base_color_exhaust", i), this._ensureColorOption("color_hot", i), this._ensureColorOption("color_cold", i), S`
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
                ${this.renderSelector("color_mode", "Color Mode", {
      select: {
        mode: "dropdown",
        options: [
          { label: "Static (Fixed)", value: "static" },
          { label: "Dynamic (Temperature based)", value: "dynamic_temp" }
        ]
      }
    })}

                ${this._config.color_mode === "dynamic_temp" ? S`
                    <div class="dynamic-config">
                        <h4>Base Colors (at Neutral Temp)</h4>
                        ${this.renderSelector("base_color_supply", "Base Color Supply/Outdoor", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                        ${this.renderSelector("base_color_exhaust", "Base Color Extract/Exhaust", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                        
                        <h4>Temperature Limits</h4>
                        ${this.renderSelector("temp_neutral", "Neutral Point (Default: 10°C)", { number: { mode: "box", step: 0.5 } })}
                        ${this.renderSelector("temp_min", "Min (Max Blue) (Default: -2.5°C)", { number: { mode: "box", step: 0.5 } })}
                        ${this.renderSelector("temp_max", "Max (Max Red) (Default: 32.5°C)", { number: { mode: "box", step: 0.5 } })}
                        
                        <h4>Mixing Colors</h4>
                        ${this.renderSelector("color_hot", "Hot Color (Default: Red)", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                        ${this.renderSelector("color_cold", "Cold Color (Default: Blue)", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                    </div>
                ` : S`
                    <div class="static-config">
                        ${this.renderSelector("color_outdoor", "Outdoor Color", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                        ${this.renderSelector("color_supply", "Supply Color", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                        ${this.renderSelector("color_extract", "Extract Color", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                        ${this.renderSelector("color_exhaust", "Exhaust Color", { select: { mode: "dropdown", options: i, custom_value: !0 } })}
                    </div>
                `}

                <h3>Other</h3>
                ${this.renderSelector("efficiency_calculation_dynamic", "Enable dynamic calculation from temperatures", { boolean: {} })}
            </div>
        `;
  }
  _ensureColorOption(i, t) {
    const e = this._config[i];
    e && !t.some((s) => s.value === e) && t.push({ label: e, value: e });
  }
  renderSelector(i, t, e) {
    return S`
            <div class="option">
                <ha-selector
                    .hass=${this.hass}
                    .selector=${e}
                    .value=${this._config[i]}
                    .label=${t}
                    @value-changed=${(s) => this._updateConfig(i, s.detail.value)}
                ></ha-selector>
            </div>
        `;
  }
  _updateConfig(i, t) {
    if (!this._config) return;
    const e = { ...this._config, [i]: t };
    this._config = e, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: e },
      bubbles: !0,
      composed: !0
    }));
  }
  static get styles() {
    return Ht`
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
                text-transform: uppercase;
                color: var(--secondary-text-color);
            }
            h4 {
                font-size: 13px;
                margin: 15px 0 5px 0;
                color: var(--primary-text-color);
            }
            .dynamic-config, .static-config {
                padding-left: 8px;
                border-left: 2px solid var(--divider-color);
                margin-left: 4px;
            }
        `;
  }
};
mt([
  _t({ attribute: !1 })
], et.prototype, "hass", 2);
mt([
  qt()
], et.prototype, "_config", 2);
et = mt([
  Vt("airflow-card-editor")
], et);
var ge = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, yt = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? xe(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && ge(t, e, o), o;
};
let st = class extends U {
  setConfig(i) {
    !i.entity_temp_supply || i.entity_temp_extract, this.config = i;
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
  shouldUpdate(i) {
    return !0;
  }
  render() {
    return !this.config || !this.hass ? S`` : S`
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
    var J, Q, gt, xt, vt, bt;
    let o = this.config.color_supply || "#4CAF50", n = this.config.color_extract || "#FFB300", r = this.config.color_exhaust || "#F44336", c = this.config.color_outdoor || "#2196F3";
    if (this.config.color_mode === "dynamic_temp") {
      const Gt = parseFloat(((J = this.hass.states[this.config.entity_temp_supply]) == null ? void 0 : J.state) || "15"), Zt = parseFloat(((Q = this.hass.states[this.config.entity_temp_extract]) == null ? void 0 : Q.state) || "15"), Kt = parseFloat(((gt = this.hass.states[this.config.entity_temp_exhaust]) == null ? void 0 : gt.state) || "15"), Jt = parseFloat(((xt = this.hass.states[this.config.entity_temp_outdoor]) == null ? void 0 : xt.state) || "15"), At = this.config.base_color_supply || "#4CAF50", wt = this.config.base_color_exhaust || "#FFB300";
      o = this._modulateColorByTemp(At, Gt), c = this._modulateColorByTemp(At, Jt), n = this._modulateColorByTemp(wt, Zt), r = this._modulateColorByTemp(wt, Kt);
    }
    const a = this.config.entity_bypass, l = a ? (vt = this.hass.states[a]) == null ? void 0 : vt.state : "off", h = l === "on" || l === "open" || l === "active", d = h && this.config.color_mode !== "dynamic_temp" ? this._blendColors(c, o, 0.4) : o, p = h && this.config.color_mode !== "dynamic_temp" ? this._blendColors(n, r, 0.4) : r, u = this.config.entity_level, _ = u ? parseFloat(((bt = this.hass.states[u]) == null ? void 0 : bt.state) ?? "1") : 1, E = isNaN(_) ? 1 : _, R = this.config.level_min ?? 0, x = (this.config.level_max ?? 4) - R, O = x > 0 ? Math.max(0, Math.min(1, (E - R) / x)) : 0.5, k = E > 0 ? (3 - O * 2.6).toFixed(2) : "0", v = E > 0 ? (2 - O * 1.8).toFixed(2) : "0";
    let C = this.config.language;
    (!C || C === "auto") && (C = this.hass.language === "de" ? "de" : "en");
    const b = Lt[C] || Lt.en, K = this.config.card_background_mode || "auto", m = K === "light", $ = K === "auto", y = $ ? "var(--ha-card-background, var(--card-background-color, var(--paper-card-background-color, white)))" : m ? "white" : "#1c1c1c", A = $ ? "var(--primary-text-color, var(--primary-text-color, #333))" : m ? "#333" : "#e1e1e1", rt = $ ? "var(--secondary-text-color, var(--secondary-text-color, #444))" : m ? "#444" : "#b0b0b0", w = $ ? "var(--divider-color, var(--divider-color, #ccc))" : m ? "#ccc" : "#444", nt = $ ? "var(--divider-color, var(--primary-text-color, #333))" : m ? "#333" : "#444", at = $ ? "var(--primary-background-color, var(--primary-background-color, #fdfdfd))" : m ? "#fdfdfd" : "#2c2c2c", z = $ ? "var(--secondary-background-color, var(--secondary-background-color, #f0f0f0))" : m ? "#f0f0f0" : "#333";
    return g`
       <svg viewBox="40 35 520 380" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${k}s; --flow-speed: ${v}s; --flow-display: ${v === "0" ? "none" : "block"};">
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
                <stop offset="100%" stop-color="${o}" />
            </linearGradient>

            <linearGradient id="gradExtractExhaust" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${n}" />
                <stop offset="100%" stop-color="${r}" />
            </linearGradient>
         </defs>

         <!-- Main Unit Box (Now large enough to contain everything) -->
         <rect x="${50}" y="${45}" width="500" height="360" rx="15" fill="${y}" stroke="${nt}" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <rect x="${300 - 56.5}" y="${225 - 56.5}" width="113" height="113" transform="rotate(45 ${300} ${225})" fill="${at}" stroke="${w}" stroke-width="1" />
         
         <!-- Background Ducts (Static) -->
         <!-- Path 1: Outdoor -> Supply -->
         <path d="M ${50} ${165} L ${240} ${165} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${z}" stroke-width="12" stroke-linecap="round"/>
         <!-- Bypass Duct Background (if active) -->
         ${h ? g`<path d="M ${240} ${165} L ${260} ${185} L ${220} ${225} L ${300} ${305} L ${340} ${265} L ${360} ${285}" fill="none" stroke="${z}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>` : ""}
         <!-- Path 2: Extract -> Exhaust -->
         <path d="M ${550} ${165} L ${360} ${165} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${z}" stroke-width="12" stroke-linecap="round"/>

         <!-- Animated Airflow Lines -->
         <!-- Path 1: Outdoor (Left Top) -> Supply (Right Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${50} ${165} L ${240} ${165} L ${260} ${185}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing Stream 1 (Outdoor -> Supply) -->
         ${this.renderParticleStream(260, 185, 340, 265, c, d, v, h, 300, 225)}
         <!-- Exit -->
         <path class="flow-line" d="M ${340} ${265} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${d}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${550} ${165} L ${360} ${165} L ${340} ${185}" fill="none" stroke="${n}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing Stream 2 (Extract -> Exhaust) -->
         ${this.renderParticleStream(340, 185, 260, 265, n, p, v, !1, 300, 225)}
         <!-- Exit -->
         <path class="flow-line" d="M ${260} ${265} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${p}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(70, 65, b.outdoor, this.config.entity_temp_outdoor, c, y, w, A)}
         ${this.renderEfficiency(255, 65, b.efficiency, y, w, rt, A)}
         ${this.renderPortBox(440, 65, b.extract, this.config.entity_temp_extract, n, y, w, A)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(70, 330, b.exhaust, this.config.entity_temp_exhaust, p, y, w, A)}
         ${this.renderPortBox(255, 330, b.level, this.config.entity_level, m ? "#444" : A, y, w, A)}
         ${this.renderPortBox(440, 330, b.supply, this.config.entity_temp_supply, d, y, w, A)}

         <!-- Fans -->
         ${this.renderFan(450, 285, this.config.entity_fan_supply, d, k, y)}
         ${this.renderFan(150, 285, this.config.entity_fan_extract, p, k, y)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(300, 225)}

       </svg>
     `;
  }
  renderPortBox(i, t, e, s, o, n, r, c) {
    var p, u;
    const a = s ? ((p = this.hass.states[s]) == null ? void 0 : p.state) ?? "N/A" : "-", l = s ? ((u = this.hass.states[s]) == null ? void 0 : u.attributes.unit_of_measurement) ?? "" : "", h = 90;
    return g`
            <g transform="translate(${i}, ${t})">
                <rect x="0" y="0" width="${h}" height="${55}" rx="10" fill="${n}" stroke="${r}" stroke-width="1" />
                <text x="${h / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${o}">${e}</text>
                <text x="${h / 2}" y="42" font-size="14" text-anchor="middle" fill="${c}">${a}${l}</text>
            </g>
        `;
  }
  _blendColors(i, t, e) {
    const s = (r) => {
      if (r.startsWith("#")) {
        let c = r.slice(1);
        if (c.length === 3 && (c = c.split("").map((a) => a + a).join("")), c.length === 6)
          return {
            r: parseInt(c.substring(0, 2), 16) || 0,
            g: parseInt(c.substring(2, 4), 16) || 0,
            b: parseInt(c.substring(4, 6), 16) || 0
          };
      }
      return null;
    }, o = s(i), n = s(t);
    if (o && n) {
      const r = Math.round(o.r + (n.r - o.r) * e), c = Math.round(o.g + (n.g - o.g) * e), a = Math.round(o.b + (n.b - o.b) * e);
      return `rgb(${r}, ${c}, ${a})`;
    }
    return `color-mix(in srgb, ${t} ${e * 100}%, ${i})`;
  }
  _modulateColorByTemp(i, t) {
    const e = this.config.temp_neutral ?? 10, s = this.config.temp_max ?? 32.5, o = this.config.temp_min ?? -2.5, n = this.config.color_hot || "#FF0000", r = this.config.color_cold || "#00BFFF";
    let c = i, a = 0, l = 1;
    t > e ? (c = n, a = t - e, l = s - e) : t < e && (c = r, a = e - t, l = e - o);
    let h = a / l;
    return h = Math.max(0, Math.min(1, h)), this._blendColors(c, i, 1 - h);
  }
  renderBypass(i, t) {
    return g``;
  }
  renderEfficiency(i, t, e, s, o, n, r) {
    var h;
    let c = "-";
    if (this.config.efficiency_calculation_dynamic) {
      const d = this._getNumericState(this.config.entity_temp_supply), p = this._getNumericState(this.config.entity_temp_extract), u = this._getNumericState(this.config.entity_temp_outdoor);
      if (d !== void 0 && p !== void 0 && u !== void 0) {
        const _ = p - u;
        if (Math.abs(_) > 0.1) {
          const E = (d - u) / _ * 100;
          c = Math.max(0, Math.min(100, Math.round(E))).toString();
        }
      }
    } else if (this.config.entity_efficiency)
      c = ((h = this.hass.states[this.config.entity_efficiency]) == null ? void 0 : h.state) ?? "-";
    else
      return g``;
    const a = 90;
    return g`
            <g transform="translate(${i}, ${t})">
                <rect x="0" y="0" width="${a}" height="${55}" rx="10" fill="${s}" stroke="${o}" stroke-width="1" />
                <text x="${a / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${n}">${e}</text>
                <text x="${a / 2}" y="42" font-size="14" text-anchor="middle" fill="${r}">${c}%</text>
            </g>
        `;
  }
  renderParticleStream(i, t, e, s, o, n, r, c, a, l) {
    if (r === "0") return S``;
    const h = parseFloat(r);
    if (isNaN(h) || h <= 0) return S``;
    const d = [], p = 7, u = e - i, _ = s - t, E = Math.sqrt(u * u + _ * _), R = -_ / E, it = u / E;
    for (let x = 0; x < p; x++) {
      const O = (x - (p - 1) / 2) * 4.5;
      let k = "", v = h, C = 4;
      if (c) {
        const $ = (x - (p - 1) / 2) * 2, y = 1.4142, A = a - 40 - 0.7071 * $, rt = l - 40 - 0.7071 * $, w = a - 80 - $ * y, nt = l, at = a, z = l + 80 + $ * y, J = a + 40 + 0.7071 * $, Q = l + 40 + 0.7071 * $;
        k = `M ${A} ${rt} L ${w} ${nt} L ${at} ${z} L ${J} ${Q}`, v = h * 2, C = 8;
      } else
        k = `M ${i + R * O} ${t + it * O} L ${e + R * O} ${s + it * O}`;
      const b = v / C, K = Math.abs(x - (p - 1) / 2) * (b / p) + x % 2 * 0.1;
      for (let m = 0; m < C; m++) {
        const $ = -(b * m + K).toFixed(2);
        d.push(g`
                    <circle cx="0" cy="0" r="2.5" fill="${o}" opacity="0.8">
                        <animateMotion 
                            path="${k}" 
                            calcMode="paced"
                            dur="${v.toFixed(2)}s" 
                            begin="${$}s" 
                            repeatCount="indefinite" />
                        ${o !== n ? g`
                        <animate 
                            attributeName="fill" 
                            values="${o};${n}" 
                            dur="${v.toFixed(2)}s" 
                            begin="${$}s" 
                            repeatCount="indefinite" />
                        ` : ""}
                    </circle>
                `);
      }
    }
    return d;
  }
  _getNumericState(i) {
    var s;
    if (!i) return;
    const t = (s = this.hass.states[i]) == null ? void 0 : s.state;
    if (t === void 0) return;
    const e = parseFloat(t);
    return isNaN(e) ? void 0 : e;
  }
  renderFan(i, t, e, s, o, n) {
    const r = e ? this.hass.states[e] : void 0, c = (r == null ? void 0 : r.state) ?? "0";
    r == null || r.attributes.unit_of_measurement;
    const a = parseFloat(c), l = c === "on" || !isNaN(a) && a > 0 || o !== "0", h = !isNaN(a) && a > 0;
    return g`
            <g transform="translate(${i}, ${t})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${h ? g`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${s}" font-weight="bold">${c} RPM</text>
                ` : ""}
                
                <g>
                    ${l && o !== "0" ? g`
                        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="${o}s" repeatCount="indefinite"/>
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
    return Ht`
      .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
      }
      .drawing-container {
        width: 100%;
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
yt([
  _t({ attribute: !1 })
], st.prototype, "hass", 2);
yt([
  qt()
], st.prototype, "config", 2);
st = yt([
  Vt("airflow-card")
], st);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "airflow-card",
  name: "Airflow Card",
  preview: !0,
  description: "A card to visualize airflow and efficiency for ventilation systems."
});
export {
  st as AirflowCard
};
