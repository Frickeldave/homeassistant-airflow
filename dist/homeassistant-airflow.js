/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, ut = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pt = Symbol(), gt = /* @__PURE__ */ new WeakMap();
let Ft = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== pt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ut && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = gt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const zt = (o) => new Ft(typeof o == "string" ? o : o + "", void 0, pt), Nt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new Ft(e, o, pt);
}, jt = (o, t) => {
  if (ut) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = Y.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, vt = ut ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return zt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: It, defineProperty: Wt, getOwnPropertyDescriptor: Vt, getOwnPropertyNames: qt, getOwnPropertySymbols: Gt, getPrototypeOf: Zt } = Object, P = globalThis, xt = P.trustedTypes, Kt = xt ? xt.emptyScript : "", ct = P.reactiveElementPolyfillSupport, j = (o, t) => o, X = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Kt : null;
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
} }, ft = (o, t) => !It(o, t), bt = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), P.litPropertyMetadata ?? (P.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = bt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Wt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Vt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties"))) return;
    const t = Zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const e = this.properties, s = [...qt(e), ...Gt(e)];
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
      for (const i of s) e.unshift(vt(i));
    } else t !== void 0 && e.push(vt(t));
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
    return jt(t, this.constructor.elementStyles), t;
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
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : X).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : X;
      this._$Em = i;
      const h = a.fromAttribute(e, c.type);
      this[i] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? ft)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[j("elementProperties")] = /* @__PURE__ */ new Map(), U[j("finalized")] = /* @__PURE__ */ new Map(), ct == null || ct({ ReactiveElement: U }), (P.reactiveElementVersions ?? (P.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, At = (o) => o, tt = I.trustedTypes, wt = tt ? tt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Tt = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Lt = "?" + C, Jt = `<${Lt}>`, L = document, W = () => L.createComment(""), V = (o) => o === null || typeof o != "object" && typeof o != "function", $t = Array.isArray, Qt = (o) => $t(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", lt = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Et = /-->/g, St = />/g, k = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ct = /'/g, Pt = /"/g, Ut = /^(?:script|style|textarea|title)$/i, Bt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), F = Bt(1), g = Bt(2), H = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Mt = /* @__PURE__ */ new WeakMap(), N = L.createTreeWalker(L, 129);
function Ht(o, t) {
  if (!$t(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wt !== void 0 ? wt.createHTML(t) : t;
}
const Yt = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = z;
  for (let c = 0; c < e; c++) {
    const a = o[c];
    let h, d, l = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, d = r.exec(a), d !== null); ) u = r.lastIndex, r === z ? d[1] === "!--" ? r = Et : d[1] !== void 0 ? r = St : d[2] !== void 0 ? (Ut.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = k) : d[3] !== void 0 && (r = k) : r === k ? d[0] === ">" ? (r = i ?? z, l = -1) : d[1] === void 0 ? l = -2 : (l = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? k : d[3] === '"' ? Pt : Ct) : r === Pt || r === Ct ? r = k : r === Et || r === St ? r = z : (r = k, i = void 0);
    const p = r === k && o[c + 1].startsWith("/>") ? " " : "";
    n += r === z ? a + Jt : l >= 0 ? (s.push(h), a.slice(0, l) + Tt + a.slice(l) + C + p) : a + C + (l === -2 ? c : p);
  }
  return [Ht(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class q {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [h, d] = Yt(t, e);
    if (this.el = q.createElement(h, s), N.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = N.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(Tt)) {
          const u = d[r++], p = i.getAttribute(l).split(C), y = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: y[2], strings: p, ctor: y[1] === "." ? te : y[1] === "?" ? ee : y[1] === "@" ? se : it }), i.removeAttribute(l);
        } else l.startsWith(C) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (Ut.test(i.tagName)) {
          const l = i.textContent.split(C), u = l.length - 1;
          if (u > 0) {
            i.textContent = tt ? tt.emptyScript : "";
            for (let p = 0; p < u; p++) i.append(l[p], W()), N.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[u], W());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Lt) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(C, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += C.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = L.createElement("template");
    return s.innerHTML = t, s;
  }
}
function D(o, t, e = o, s) {
  var r, c;
  if (t === H) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = V(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = D(o, i._$AS(o, t.values), i, s)), t;
}
class Xt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? L).importNode(e, !0);
    N.currentNode = i;
    let n = N.nextNode(), r = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new G(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new ie(n, this, t)), this._$AV.push(h), a = s[++c];
      }
      r !== (a == null ? void 0 : a.index) && (n = N.nextNode(), r++);
    }
    return N.currentNode = L, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class G {
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
    t = D(this, t, e), V(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(L.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = q.createElement(Ht(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new Xt(i, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Mt.get(t.strings);
    return e === void 0 && Mt.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new G(this.O(W()), this.O(W()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = At(t).nextSibling;
      At(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class it {
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
    if (n === void 0) t = D(this, t, e, 0), r = !V(t) || t !== this._$AH && t !== H, r && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = D(this, c[s + a], e, a), h === H && (h = this._$AH[a]), r || (r = !V(h) || h !== this._$AH[a]), h === f ? t = f : t !== f && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ee extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class se extends it {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = D(this, t, e, 0) ?? f) === H) return;
    const s = this._$AH, i = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== f && (s === f || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ie {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    D(this, t);
  }
}
const ht = I.litHtmlPolyfillSupport;
ht == null || ht(q, G), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.2");
const oe = (o, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new G(t.insertBefore(W(), n), n, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis;
class B extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oe(e, this.renderRoot, this.renderOptions);
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
    return H;
  }
}
var kt;
B._$litElement$ = !0, B.finalized = !0, (kt = T.litElementHydrateSupport) == null || kt.call(T, { LitElement: B });
const dt = T.litElementPolyfillSupport;
dt == null || dt({ LitElement: B });
(T.litElementVersions ?? (T.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: ft }, ne = (o = re, t, e) => {
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
function yt(o) {
  return (t, e) => typeof e == "object" ? ne(o, t, e) : ((s, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Rt(o) {
  return yt({ ...o, state: !0, attribute: !1 });
}
const Ot = {
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
var ae = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, _t = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ce(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && ae(t, e, i), i;
};
let et = class extends B {
  setConfig(o) {
    this._config = o;
  }
  render() {
    if (!this.hass || !this._config)
      return F``;
    const o = [
      { label: "Blue (#2196F3)", value: "#2196F3" },
      { label: "Green (#4CAF50)", value: "#4CAF50" },
      { label: "Amber (#FFB300)", value: "#FFB300" },
      { label: "Red (#F44336)", value: "#F44336" },
      { label: "Grey (#9E9E9E)", value: "#9E9E9E" },
      { label: "Black (#000000)", value: "#000000" },
      { label: "White (#FFFFFF)", value: "#FFFFFF" }
    ];
    return this._ensureColorOption("color_outdoor", o), this._ensureColorOption("color_supply", o), this._ensureColorOption("color_extract", o), this._ensureColorOption("color_exhaust", o), F`
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
    return F`
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
    return Nt`
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
_t([
  yt({ attribute: !1 })
], et.prototype, "hass", 2);
_t([
  Rt()
], et.prototype, "_config", 2);
et = _t([
  Dt("airflow-card-editor")
], et);
var le = Object.defineProperty, he = Object.getOwnPropertyDescriptor, mt = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? he(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && le(t, e, i), i;
};
let st = class extends B {
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
    return !this.config || !this.hass ? F`` : F`
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
    var J, Q;
    const i = this.config.color_supply || "#4CAF50", n = this.config.color_extract || "#FFB300", r = this.config.color_exhaust || "#F44336", c = this.config.color_outdoor || "#2196F3", a = this.config.entity_bypass, h = a ? (J = this.hass.states[a]) == null ? void 0 : J.state : "off", d = h === "on" || h === "open" || h === "active", l = d ? this._blendColors(c, i, 0.4) : i, u = d ? this._blendColors(n, r, 0.4) : r, p = this.config.entity_level, y = p ? parseFloat(((Q = this.hass.states[p]) == null ? void 0 : Q.state) ?? "1") : 1, E = isNaN(y) ? 1 : y, R = this.config.level_min ?? 0, v = (this.config.level_max ?? 4) - R, M = v > 0 ? Math.max(0, Math.min(1, (E - R) / v)) : 0.5, O = E > 0 ? (3 - M * 2.6).toFixed(2) : "0", x = E > 0 ? (2 - M * 1.8).toFixed(2) : "0";
    let S = this.config.language;
    (!S || S === "auto") && (S = this.hass.language === "de" ? "de" : "en");
    const b = Ot[S] || Ot.en, Z = this.config.card_background_mode || "auto", _ = Z === "light", $ = Z === "auto", m = $ ? "var(--ha-card-background, var(--card-background-color, var(--paper-card-background-color, white)))" : _ ? "white" : "#1c1c1c", A = $ ? "var(--primary-text-color, var(--primary-text-color, #333))" : _ ? "#333" : "#e1e1e1", rt = $ ? "var(--secondary-text-color, var(--secondary-text-color, #444))" : _ ? "#444" : "#b0b0b0", w = $ ? "var(--divider-color, var(--divider-color, #ccc))" : _ ? "#ccc" : "#444", nt = $ ? "var(--divider-color, var(--primary-text-color, #333))" : _ ? "#333" : "#444", at = $ ? "var(--primary-background-color, var(--primary-background-color, #fdfdfd))" : _ ? "#fdfdfd" : "#2c2c2c", K = $ ? "var(--secondary-background-color, var(--secondary-background-color, #f0f0f0))" : _ ? "#f0f0f0" : "#333";
    return g`
       <svg viewBox="40 35 520 380" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${O}s; --flow-speed: ${x}s; --flow-display: ${x === "0" ? "none" : "block"};">
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
         <rect x="${50}" y="${45}" width="500" height="360" rx="15" fill="${m}" stroke="${nt}" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <rect x="${300 - 56.5}" y="${225 - 56.5}" width="113" height="113" transform="rotate(45 ${300} ${225})" fill="${at}" stroke="${w}" stroke-width="1" />
         
         <!-- Background Ducts (Static) -->
         <!-- Path 1: Outdoor -> Supply -->
         <path d="M ${50} ${165} L ${240} ${165} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/>
         <!-- Path 2: Extract -> Exhaust -->
         <path d="M ${550} ${165} L ${360} ${165} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${K}" stroke-width="12" stroke-linecap="round"/>

         <!-- Animated Airflow Lines -->
         <!-- Path 1: Outdoor (Left Top) -> Supply (Right Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${50} ${165} L ${240} ${165} L ${260} ${185}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing Stream 1 (Outdoor -> Supply) -->
         ${this.renderParticleStream(260, 185, 340, 265, c, l, x, d, 300, 225)}
         <!-- Exit -->
         <path class="flow-line" d="M ${340} ${265} L ${360} ${285} L ${550} ${285}" fill="none" stroke="${l}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${550} ${165} L ${360} ${165} L ${340} ${185}" fill="none" stroke="${n}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing Stream 2 (Extract -> Exhaust) -->
         ${this.renderParticleStream(340, 185, 260, 265, n, u, x, !1, 300, 225)}
         <!-- Exit -->
         <path class="flow-line" d="M ${260} ${265} L ${240} ${285} L ${50} ${285}" fill="none" stroke="${u}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(70, 65, b.outdoor, this.config.entity_temp_outdoor, c, m, w, A)}
         ${this.renderEfficiency(255, 65, b.efficiency, m, w, rt, A)}
         ${this.renderPortBox(440, 65, b.extract, this.config.entity_temp_extract, n, m, w, A)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(70, 330, b.exhaust, this.config.entity_temp_exhaust, u, m, w, A)}
         ${this.renderPortBox(255, 330, b.level, this.config.entity_level, _ ? "#444" : A, m, w, A)}
         ${this.renderPortBox(440, 330, b.supply, this.config.entity_temp_supply, l, m, w, A)}

         <!-- Fans -->
         ${this.renderFan(450, 285, this.config.entity_fan_supply, l, O, m)}
         ${this.renderFan(150, 285, this.config.entity_fan_extract, u, O, m)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(300, 225)}

       </svg>
     `;
  }
  renderPortBox(o, t, e, s, i, n, r, c) {
    var u, p;
    const a = s ? ((u = this.hass.states[s]) == null ? void 0 : u.state) ?? "N/A" : "-", h = s ? ((p = this.hass.states[s]) == null ? void 0 : p.attributes.unit_of_measurement) ?? "" : "", d = 90;
    return g`
            <g transform="translate(${o}, ${t})">
                <rect x="0" y="0" width="${d}" height="${55}" rx="10" fill="${n}" stroke="${r}" stroke-width="1" />
                <text x="${d / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${i}">${e}</text>
                <text x="${d / 2}" y="42" font-size="14" text-anchor="middle" fill="${c}">${a}${h}</text>
            </g>
        `;
  }
  _blendColors(o, t, e) {
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
    }, i = s(o), n = s(t);
    if (i && n) {
      const r = Math.round(i.r + (n.r - i.r) * e), c = Math.round(i.g + (n.g - i.g) * e), a = Math.round(i.b + (n.b - i.b) * e);
      return `rgb(${r}, ${c}, ${a})`;
    }
    return `color-mix(in srgb, ${t} ${e * 100}%, ${o})`;
  }
  renderBypass(o, t) {
    const e = this.config.entity_bypass;
    if (!e) return g``;
    const s = this.hass.states[e], i = s == null ? void 0 : s.state;
    return i === "on" || i === "open" || i === "active" ? g`` : g``;
  }
  renderEfficiency(o, t, e, s, i, n, r) {
    var d;
    let c = "-";
    if (this.config.efficiency_calculation_dynamic) {
      const l = this._getNumericState(this.config.entity_temp_supply), u = this._getNumericState(this.config.entity_temp_extract), p = this._getNumericState(this.config.entity_temp_outdoor);
      if (l !== void 0 && u !== void 0 && p !== void 0) {
        const y = u - p;
        if (Math.abs(y) > 0.1) {
          const E = (l - p) / y * 100;
          c = Math.max(0, Math.min(100, Math.round(E))).toString();
        }
      }
    } else if (this.config.entity_efficiency)
      c = ((d = this.hass.states[this.config.entity_efficiency]) == null ? void 0 : d.state) ?? "-";
    else
      return g``;
    const a = 90;
    return g`
            <g transform="translate(${o}, ${t})">
                <rect x="0" y="0" width="${a}" height="${55}" rx="10" fill="${s}" stroke="${i}" stroke-width="1" />
                <text x="${a / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${n}">${e}</text>
                <text x="${a / 2}" y="42" font-size="14" text-anchor="middle" fill="${r}">${c}%</text>
            </g>
        `;
  }
  renderParticleStream(o, t, e, s, i, n, r, c, a, h) {
    if (r === "0") return F``;
    const d = parseFloat(r);
    if (isNaN(d) || d <= 0) return F``;
    const l = [], u = 7, p = e - o, y = s - t, E = Math.sqrt(p * p + y * y), R = -y / E, ot = p / E;
    for (let v = 0; v < u; v++) {
      const M = (v - (u - 1) / 2) * 4.5;
      let O = "", x = d, S = 4;
      if (c) {
        const $ = (v - (u - 1) / 2) * 2, m = 1.4142, A = a - 40 - 0.7071 * $, rt = h - 40 - 0.7071 * $, w = a - 80 - $ * m, nt = h, at = a, K = h + 80 + $ * m, J = a + 40 + 0.7071 * $, Q = h + 40 + 0.7071 * $;
        O = `M ${A} ${rt} L ${w} ${nt} L ${at} ${K} L ${J} ${Q}`, x = d * 2, S = 8;
      } else
        O = `M ${o + R * M} ${t + ot * M} L ${e + R * M} ${s + ot * M}`;
      const b = x / S, Z = Math.abs(v - (u - 1) / 2) * (b / u) + v % 2 * 0.1;
      for (let _ = 0; _ < S; _++) {
        const $ = -(b * _ + Z).toFixed(2);
        l.push(g`
                    <circle cx="0" cy="0" r="2.5" fill="${i}" opacity="0.8">
                        <animateMotion 
                            path="${O}" 
                            calcMode="paced"
                            dur="${x.toFixed(2)}s" 
                            begin="${$}s" 
                            repeatCount="indefinite" />
                        ${i !== n ? g`
                        <animate 
                            attributeName="fill" 
                            values="${i};${n}" 
                            dur="${x.toFixed(2)}s" 
                            begin="${$}s" 
                            repeatCount="indefinite" />
                        ` : ""}
                    </circle>
                `);
      }
    }
    return l;
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
    const a = parseFloat(c), h = c === "on" || !isNaN(a) && a > 0 || i !== "0", d = !isNaN(a) && a > 0;
    return g`
            <g transform="translate(${o}, ${t})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${d ? g`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${s}" font-weight="bold">${c} RPM</text>
                ` : ""}
                
                <g>
                    ${h && i !== "0" ? g`
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
    return Nt`
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
mt([
  yt({ attribute: !1 })
], st.prototype, "hass", 2);
mt([
  Rt()
], st.prototype, "config", 2);
st = mt([
  Dt("airflow-card")
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
