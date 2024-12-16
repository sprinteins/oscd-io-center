var Mt = Object.defineProperty;
var qt = (t, n, r) => n in t ? Mt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[n] = r;
var K = (t, n, r) => qt(t, typeof n != "symbol" ? n + "" : n, r);
const Bt = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Bt);
const Ut = 1, Vt = 2, Ht = Symbol(), Yt = ["touchstart", "touchmove"];
function $t(t) {
  return Yt.includes(t);
}
const jt = !1;
var Wt = Array.isArray, Gt = Array.from, Kt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor;
const U = 2, ht = 4, tt = 8, pt = 16, C = 32, V = 64, Z = 128, H = 256, M = 512, m = 1024, nt = 2048, Y = 4096, b = 8192, O = 16384, Zt = 32768, rt = 65536, zt = 1 << 19, Jt = 1 << 20;
function Qt() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
var it, dt, Et;
function Xt() {
  if (it === void 0) {
    it = window;
    var t = Element.prototype, n = Node.prototype;
    dt = ut(n, "firstChild").get, Et = ut(n, "nextSibling").get, t.__click = void 0, t.__className = "", t.__attributes = null, t.__styles = null, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function tn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function z(t) {
  return dt.call(t);
}
// @__NO_SIDE_EFFECTS__
function et(t) {
  return Et.call(t);
}
function nn(t, n) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ z(
        /** @type {Node} */
        t
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ et(r) : r;
  }
}
function ot(t, n = 1, r = !1) {
  let e = t;
  for (; n--; )
    e = /** @type {TemplateNode} */
    /* @__PURE__ */ et(e);
  return e;
}
function gt(t) {
  var n = t.children;
  if (n !== null) {
    t.children = null;
    for (var r = 0; r < n.length; r += 1) {
      var e = n[r];
      e.f & U ? mt(
        /** @type {Derived} */
        e
      ) : T(
        /** @type {Effect} */
        e
      );
    }
  }
}
function rn(t) {
  for (var n = t.parent; n !== null; ) {
    if (!(n.f & U))
      return (
        /** @type {Effect} */
        n
      );
    n = n.parent;
  }
  return null;
}
function en(t) {
  var n, r = p;
  R(rn(t));
  try {
    gt(t), n = kt(t);
  } finally {
    R(r);
  }
  return n;
}
function ln(t) {
  var n = en(t), r = (y || t.f & H) && t.deps !== null ? Y : m;
  F(t, r), t.equals(n) || (t.v = n, t.version = _n());
}
function mt(t) {
  gt(t), D(t, 0), F(t, O), t.v = t.children = t.deps = t.ctx = t.reactions = null;
}
function un(t, n) {
  var r = n.last;
  r === null ? n.last = n.first = t : (r.next = t, t.prev = r, n.last = t);
}
function $(t, n, r, e = !0) {
  var l = (t & V) !== 0, u = p, i = {
    ctx: g,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: t | nt,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: l ? null : u,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (r) {
    var a = S;
    try {
      st(!0), G(i), i.f |= Zt;
    } catch (_) {
      throw T(i), _;
    } finally {
      st(a);
    }
  } else n !== null && wn(i);
  var o = r && i.deps === null && i.first === null && i.nodes_start === null && i.teardown === null && (i.f & Jt) === 0;
  if (!o && !l && e && (u !== null && un(i, u), E !== null && E.f & U)) {
    var s = (
      /** @type {Derived} */
      E
    );
    (s.children ?? (s.children = [])).push(i);
  }
  return i;
}
function on(t) {
  const n = $(V, t, !0);
  return (r = {}) => new Promise((e) => {
    r.outro ? Q(n, () => {
      T(n), e(void 0);
    }) : (T(n), e(void 0));
  });
}
function an(t) {
  return $(ht, t, !1);
}
function sn(t) {
  return wt(t);
}
function wt(t, n = 0) {
  return $(tt | pt | n, t, !0);
}
function J(t, n = !0) {
  return $(tt | C, t, !0, n);
}
function xt(t) {
  var n = t.teardown;
  if (n !== null) {
    const r = E;
    k(null);
    try {
      n.call(null);
    } finally {
      k(r);
    }
  }
}
function yt(t) {
  var n = t.deriveds;
  if (n !== null) {
    t.deriveds = null;
    for (var r = 0; r < n.length; r += 1)
      mt(n[r]);
  }
}
function Tt(t, n = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    var e = r.next;
    T(r, n), r = e;
  }
}
function fn(t) {
  for (var n = t.first; n !== null; ) {
    var r = n.next;
    n.f & C || T(n), n = r;
  }
}
function T(t, n = !0) {
  var r = !1;
  if ((n || t.f & zt) && t.nodes_start !== null) {
    for (var e = t.nodes_start, l = t.nodes_end; e !== null; ) {
      var u = e === l ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ et(e)
      );
      e.remove(), e = u;
    }
    r = !0;
  }
  Tt(t, n && !r), yt(t), D(t, 0), F(t, O);
  var i = t.transitions;
  if (i !== null)
    for (const o of i)
      o.stop();
  xt(t);
  var a = t.parent;
  a !== null && a.first !== null && Ct(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function Ct(t) {
  var n = t.parent, r = t.prev, e = t.next;
  r !== null && (r.next = e), e !== null && (e.prev = r), n !== null && (n.first === t && (n.first = e), n.last === t && (n.last = r));
}
function Q(t, n) {
  var r = [];
  Nt(t, r, !0), cn(r, () => {
    T(t), n && n();
  });
}
function cn(t, n) {
  var r = t.length;
  if (r > 0) {
    var e = () => --r || n();
    for (var l of t)
      l.out(e);
  } else
    n();
}
function Nt(t, n, r) {
  if (!(t.f & b)) {
    if (t.f ^= b, t.transitions !== null)
      for (const i of t.transitions)
        (i.is_global || r) && n.push(i);
    for (var e = t.first; e !== null; ) {
      var l = e.next, u = (e.f & rt) !== 0 || (e.f & C) !== 0;
      Nt(e, n, u ? r : !1), e = l;
    }
  }
}
function at(t) {
  St(t, !0);
}
function St(t, n) {
  if (t.f & b) {
    j(t) && G(t), t.f ^= b;
    for (var r = t.first; r !== null; ) {
      var e = r.next, l = (r.f & rt) !== 0 || (r.f & C) !== 0;
      St(r, l ? n : !1), r = e;
    }
    if (t.transitions !== null)
      for (const u of t.transitions)
        (u.is_global || n) && u.in();
  }
}
let L = !1, q = !1, B = null, S = !1;
function st(t) {
  S = t;
}
let X = [], A = 0;
let E = null;
function k(t) {
  E = t;
}
let p = null;
function R(t) {
  p = t;
}
let d = null, h = 0, bt = 0, y = !1, g = null;
function _n() {
  return ++bt;
}
function j(t) {
  var i, a;
  var n = t.f;
  if (n & nt)
    return !0;
  if (n & Y) {
    var r = t.deps, e = (n & H) !== 0;
    if (r !== null) {
      var l;
      if (n & M) {
        for (l = 0; l < r.length; l++)
          ((i = r[l]).reactions ?? (i.reactions = [])).push(t);
        t.f ^= M;
      }
      for (l = 0; l < r.length; l++) {
        var u = r[l];
        if (j(
          /** @type {Derived} */
          u
        ) && ln(
          /** @type {Derived} */
          u
        ), e && p !== null && !y && !((a = u == null ? void 0 : u.reactions) != null && a.includes(t)) && (u.reactions ?? (u.reactions = [])).push(t), u.version > t.version)
          return !0;
      }
    }
    (!e || p !== null && !y) && F(t, m);
  }
  return !1;
}
function vn(t, n) {
  for (var r = n; r !== null; ) {
    if (r.f & Z)
      try {
        r.fn(t);
        return;
      } catch {
        r.f ^= Z;
      }
    r = r.parent;
  }
  throw L = !1, t;
}
function hn(t) {
  return (t.f & O) === 0 && (t.parent === null || (t.parent.f & Z) === 0);
}
function W(t, n, r, e) {
  if (L) {
    if (r === null && (L = !1), hn(n))
      throw t;
    return;
  }
  r !== null && (L = !0);
  {
    vn(t, n);
    return;
  }
}
function kt(t) {
  var _;
  var n = d, r = h, e = E, l = y, u = g, i = t.f;
  d = /** @type {null | Value[]} */
  null, h = 0, E = i & (C | V) ? null : t, y = !S && (i & H) !== 0, g = t.ctx;
  try {
    var a = (
      /** @type {Function} */
      (0, t.fn)()
    ), o = t.deps;
    if (d !== null) {
      var s;
      if (D(t, h), o !== null && h > 0)
        for (o.length = h + d.length, s = 0; s < d.length; s++)
          o[h + s] = d[s];
      else
        t.deps = o = d;
      if (!y)
        for (s = h; s < o.length; s++)
          ((_ = o[s]).reactions ?? (_.reactions = [])).push(t);
    } else o !== null && h < o.length && (D(t, h), o.length = h);
    return a;
  } finally {
    d = n, h = r, E = e, y = l, g = u;
  }
}
function pn(t, n) {
  let r = n.reactions;
  if (r !== null) {
    var e = r.indexOf(t);
    if (e !== -1) {
      var l = r.length - 1;
      l === 0 ? r = n.reactions = null : (r[e] = r[l], r.pop());
    }
  }
  r === null && n.f & U && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (d === null || !d.includes(n)) && (F(n, Y), n.f & (H | M) || (n.f ^= M), D(
    /** @type {Derived} **/
    n,
    0
  ));
}
function D(t, n) {
  var r = t.deps;
  if (r !== null)
    for (var e = n; e < r.length; e++)
      pn(t, r[e]);
}
function G(t) {
  var n = t.f;
  if (!(n & O)) {
    F(t, m);
    var r = p, e = g;
    p = t;
    try {
      n & pt ? fn(t) : Tt(t), yt(t), xt(t);
      var l = kt(t);
      t.teardown = typeof l == "function" ? l : null, t.version = bt;
    } catch (u) {
      W(u, t, r, e || t.ctx);
    } finally {
      p = r;
    }
  }
}
function dn() {
  if (A > 1e3) {
    A = 0;
    try {
      Qt();
    } catch (t) {
      if (B !== null)
        W(t, B, null);
      else
        throw t;
    }
  }
  A++;
}
function En(t) {
  var n = t.length;
  if (n !== 0) {
    dn();
    var r = S;
    S = !0;
    try {
      for (var e = 0; e < n; e++) {
        var l = t[e];
        l.f & m || (l.f ^= m);
        var u = [];
        Rt(l, u), gn(u);
      }
    } finally {
      S = r;
    }
  }
}
function gn(t) {
  var n = t.length;
  if (n !== 0)
    for (var r = 0; r < n; r++) {
      var e = t[r];
      if (!(e.f & (O | b)))
        try {
          j(e) && (G(e), e.deps === null && e.first === null && e.nodes_start === null && (e.teardown === null ? Ct(e) : e.fn = null));
        } catch (l) {
          W(l, e, null, e.ctx);
        }
    }
}
function mn() {
  if (q = !1, A > 1001)
    return;
  const t = X;
  X = [], En(t), q || (A = 0, B = null);
}
function wn(t) {
  q || (q = !0, queueMicrotask(mn)), B = t;
  for (var n = t; n.parent !== null; ) {
    n = n.parent;
    var r = n.f;
    if (r & (V | C)) {
      if (!(r & m)) return;
      n.f ^= m;
    }
  }
  X.push(n);
}
function Rt(t, n) {
  var r = t.first, e = [];
  t: for (; r !== null; ) {
    var l = r.f, u = (l & C) !== 0, i = u && (l & m) !== 0, a = r.next;
    if (!i && !(l & b))
      if (l & tt) {
        if (u)
          r.f ^= m;
        else
          try {
            j(r) && G(r);
          } catch (c) {
            W(c, r, null, r.ctx);
          }
        var o = r.first;
        if (o !== null) {
          r = o;
          continue;
        }
      } else l & ht && e.push(r);
    if (a === null) {
      let c = r.parent;
      for (; c !== null; ) {
        if (t === c)
          break t;
        var s = c.next;
        if (s !== null) {
          r = s;
          continue t;
        }
        c = c.parent;
      }
    }
    r = a;
  }
  for (var _ = 0; _ < e.length; _++)
    o = e[_], n.push(o), Rt(o, n);
}
const xn = ~(nt | Y | m);
function F(t, n) {
  t.f = t.f & xn | n;
}
function Ft(t, n = !1, r) {
  g = {
    p: g,
    c: null,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  };
}
function At(t) {
  const n = g;
  if (n !== null) {
    const i = n.e;
    if (i !== null) {
      var r = p, e = E;
      n.e = null;
      try {
        for (var l = 0; l < i.length; l++) {
          var u = i[l];
          R(u.effect), k(u.reaction), an(u.fn);
        }
      } finally {
        R(r), k(e);
      }
    }
    g = n.p, n.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
const yn = /* @__PURE__ */ new Set(), ft = /* @__PURE__ */ new Set();
function I(t) {
  var lt;
  var n = this, r = (
    /** @type {Node} */
    n.ownerDocument
  ), e = t.type, l = ((lt = t.composedPath) == null ? void 0 : lt.call(t)) || [], u = (
    /** @type {null | Element} */
    l[0] || t.target
  ), i = 0, a = t.__root;
  if (a) {
    var o = l.indexOf(a);
    if (o !== -1 && (n === document || n === /** @type {any} */
    window)) {
      t.__root = n;
      return;
    }
    var s = l.indexOf(n);
    if (s === -1)
      return;
    o <= s && (i = o);
  }
  if (u = /** @type {Element} */
  l[i] || t.target, u !== n) {
    Kt(t, "currentTarget", {
      configurable: !0,
      get() {
        return u || r;
      }
    });
    var _ = E, c = p;
    k(null), R(null);
    try {
      for (var f, v = []; u !== null; ) {
        var w = u.assignedSlot || u.parentNode || /** @type {any} */
        u.host || null;
        try {
          var x = u["__" + e];
          if (x !== void 0 && !/** @type {any} */
          u.disabled)
            if (Wt(x)) {
              var [It, ...Lt] = x;
              It.apply(u, [t, ...Lt]);
            } else
              x.call(u, t);
        } catch (P) {
          f ? v.push(P) : f = P;
        }
        if (t.cancelBubble || w === n || w === null)
          break;
        u = w;
      }
      if (f) {
        for (let P of v)
          queueMicrotask(() => {
            throw P;
          });
        throw f;
      }
    } finally {
      t.__root = n, delete t.currentTarget, k(_), R(c);
    }
  }
}
function Tn(t) {
  var n = document.createElement("template");
  return n.innerHTML = t, n.content;
}
function ct(t, n) {
  var r = (
    /** @type {Effect} */
    p
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function Dt(t, n) {
  var r = (n & Ut) !== 0, e = (n & Vt) !== 0, l, u = !t.startsWith("<!>");
  return () => {
    l === void 0 && (l = Tn(u ? t : "<!>" + t), r || (l = /** @type {Node} */
    /* @__PURE__ */ z(l)));
    var i = (
      /** @type {TemplateNode} */
      e ? document.importNode(l, !0) : l.cloneNode(!0)
    );
    if (r) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ z(i)
      ), o = (
        /** @type {TemplateNode} */
        i.lastChild
      );
      ct(a, o);
    } else
      ct(i, i);
    return i;
  };
}
function _t(t, n) {
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
function Cn(t, n) {
  return Nn(t, n);
}
const N = /* @__PURE__ */ new Map();
function Nn(t, { target: n, anchor: r, props: e = {}, events: l, context: u, intro: i = !0 }) {
  Xt();
  var a = /* @__PURE__ */ new Set(), o = (c) => {
    for (var f = 0; f < c.length; f++) {
      var v = c[f];
      if (!a.has(v)) {
        a.add(v);
        var w = $t(v);
        n.addEventListener(v, I, { passive: w });
        var x = N.get(v);
        x === void 0 ? (document.addEventListener(v, I, { passive: w }), N.set(v, 1)) : N.set(v, x + 1);
      }
    }
  };
  o(Gt(yn)), ft.add(o);
  var s = void 0, _ = on(() => {
    var c = r ?? n.appendChild(tn());
    return J(() => {
      if (u) {
        Ft({});
        var f = (
          /** @type {ComponentContext} */
          g
        );
        f.c = u;
      }
      l && (e.$$events = l), s = t(c, e) || {}, u && At();
    }), () => {
      var w;
      for (var f of a) {
        n.removeEventListener(f, I);
        var v = (
          /** @type {number} */
          N.get(f)
        );
        --v === 0 ? (document.removeEventListener(f, I), N.delete(f)) : N.set(f, v);
      }
      ft.delete(o), c !== r && ((w = c.parentNode) == null || w.removeChild(c));
    };
  });
  return Sn.set(s, _), s;
}
let Sn = /* @__PURE__ */ new WeakMap();
function bn(t, n, r = !1) {
  var e = t, l = null, u = null, i = Ht, a = r ? rt : 0, o = !1;
  const s = (c, f = !0) => {
    o = !0, _(f, c);
  }, _ = (c, f) => {
    i !== (i = c) && (i ? (l ? at(l) : f && (l = J(() => f(e))), u && Q(u, () => {
      u = null;
    })) : (u ? at(u) : f && (u = J(() => f(e))), l && Q(l, () => {
      l = null;
    })));
  };
  wt(() => {
    o = !1, n(s), o || _(null, null);
  }, a);
}
function vt(t, n) {
  var r = t.__attributes ?? (t.__attributes = {});
  r.value === (r.value = // treat null and undefined the same for the initial value
  n ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when its `0`
  t.value === n && (n !== 0 || t.nodeName !== "PROGRESS") || (t.value = n);
}
const Ot = "new-oscd-plugin", Pt = "0.0.1";
var kn = /* @__PURE__ */ Dt("<h2>Welcome to new-oscd-plugin</h2>"), Rn = /* @__PURE__ */ Dt('<!> <input type="hidden" name="package-name"> <input type="hidden" name="package-version">', 1);
function Fn(t, n) {
  Ft(n, !0);
  var r = Rn(), e = nn(r);
  {
    var l = (a) => {
      var o = kn();
      _t(a, o);
    };
    bn(e, (a) => {
      n.doc && a(l);
    });
  }
  var u = ot(e, 2), i = ot(u, 2);
  sn(() => {
    vt(u, Ot), vt(i, Pt);
  }), _t(t, r), At();
}
class Pn extends HTMLElement {
  constructor() {
    super(...arguments);
    K(this, "plugin");
    K(this, "_doc");
  }
  connectedCallback() {
    var e;
    this.attachShadow({ mode: "open" }), this.plugin = Cn(Fn, {
      target: this.shadowRoot,
      props: {
        doc: this._doc,
        editCount: -1
      }
    });
    const r = An();
    (e = this.shadowRoot) == null || e.appendChild(r);
  }
  set doc(r) {
    this._doc = r, this.plugin && this.plugin.$set({ doc: r });
  }
  set editCount(r) {
    this.plugin && this.plugin.$set({ editCount: r });
  }
}
function An() {
  const t = `${Ot}-v${Pt}-style`, n = Dn(), r = document.createElement("link");
  return r.rel = "stylesheet", r.type = "text/css", r.href = n, r.id = t, r;
}
function Dn() {
  const t = new URL(import.meta.url), n = t.origin, r = t.pathname.split("/").slice(0, -1).filter(Boolean).join("/");
  return [n, r, "style.css"].filter(Boolean).join("/");
}
export {
  Pn as default
};
