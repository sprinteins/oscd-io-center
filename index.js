var Et = (t) => {
  throw TypeError(t);
};
var un = (t, n, e) => n.has(t) || Et("Cannot " + e);
var ft = (t, n, e) => (un(t, n, "read from private field"), e ? e.call(t) : n.get(t)), mt = (t, n, e) => n.has(t) ? Et("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, e);
const g = Symbol(), on = ["touchstart", "touchmove"];
function sn(t) {
  return on.includes(t);
}
const fn = !1;
var Rt = Array.isArray, an = Array.from, cn = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, _n = Object.getOwnPropertyDescriptors, vn = Object.prototype, dn = Array.prototype, At = Object.getPrototypeOf;
function hn(t) {
  return t();
}
function bt(t) {
  for (var n = 0; n < t.length; n++)
    t[n]();
}
const x = 2, Ft = 4, lt = 8, vt = 16, O = 32, it = 64, at = 128, L = 256, tt = 512, m = 1024, D = 2048, Z = 4096, nt = 8192, Y = 16384, pn = 32768, yn = 65536, wn = 1 << 19, It = 1 << 20, H = Symbol("$state");
function Lt(t) {
  return t === this.v;
}
function gn(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function En() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function mn(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function bn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function xn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Tn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function kn() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function Nn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let dt = !1;
function On() {
  dt = !0;
}
function T(t, n) {
  var e = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Lt,
    version: 0
  };
  return e;
}
function Sn(t) {
  return /* @__PURE__ */ Cn(T(t));
}
// @__NO_SIDE_EFFECTS__
function Cn(t) {
  return h !== null && h.f & x && (k === null ? Kn([t]) : k.push(t)), t;
}
function N(t, n) {
  return h !== null && wt() && h.f & (x | vt) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (k === null || !k.includes(t)) && Nn(), Dn(t, n);
}
function Dn(t, n) {
  return t.equals(n) || (t.v = n, t.version = Qt(), Mt(t, D), wt() && d !== null && d.f & m && !(d.f & O) && (w !== null && w.includes(t) ? (S(d, D), st(d)) : C === null ? Wn([t]) : C.push(t))), n;
}
function Mt(t, n) {
  var e = t.reactions;
  if (e !== null)
    for (var r = wt(), l = e.length, i = 0; i < l; i++) {
      var s = e[i], _ = s.f;
      _ & D || !r && s === d || (S(s, n), _ & (m | L) && (_ & x ? Mt(
        /** @type {Derived} */
        s,
        Z
      ) : st(
        /** @type {Effect} */
        s
      )));
    }
}
function R(t, n = null, e) {
  if (typeof t != "object" || t === null || H in t)
    return t;
  const r = At(t);
  if (r !== vn && r !== dn)
    return t;
  var l = /* @__PURE__ */ new Map(), i = Rt(t), s = T(0);
  i && l.set("length", T(
    /** @type {any[]} */
    t.length
  ));
  var _;
  return new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(a, u, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && xn();
        var f = l.get(u);
        return f === void 0 ? (f = T(o.value), l.set(u, f)) : N(f, R(o.value, _)), !0;
      },
      deleteProperty(a, u) {
        var o = l.get(u);
        if (o === void 0)
          u in a && l.set(u, T(g));
        else {
          if (i && typeof u == "string") {
            var f = (
              /** @type {Source<number>} */
              l.get("length")
            ), c = Number(u);
            Number.isInteger(c) && c < f.v && N(f, c);
          }
          N(o, g), xt(s);
        }
        return !0;
      },
      get(a, u, o) {
        var p;
        if (u === H)
          return t;
        var f = l.get(u), c = u in a;
        if (f === void 0 && (!c || (p = $(a, u)) != null && p.writable) && (f = T(R(c ? a[u] : g, _)), l.set(u, f)), f !== void 0) {
          var v = F(f);
          return v === g ? void 0 : v;
        }
        return Reflect.get(a, u, o);
      },
      getOwnPropertyDescriptor(a, u) {
        var o = Reflect.getOwnPropertyDescriptor(a, u);
        if (o && "value" in o) {
          var f = l.get(u);
          f && (o.value = F(f));
        } else if (o === void 0) {
          var c = l.get(u), v = c == null ? void 0 : c.v;
          if (c !== void 0 && v !== g)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return o;
      },
      has(a, u) {
        var v;
        if (u === H)
          return !0;
        var o = l.get(u), f = o !== void 0 && o.v !== g || Reflect.has(a, u);
        if (o !== void 0 || d !== null && (!f || (v = $(a, u)) != null && v.writable)) {
          o === void 0 && (o = T(f ? R(a[u], _) : g), l.set(u, o));
          var c = F(o);
          if (c === g)
            return !1;
        }
        return f;
      },
      set(a, u, o, f) {
        var P;
        var c = l.get(u), v = u in a;
        if (i && u === "length")
          for (var p = o; p < /** @type {Source<number>} */
          c.v; p += 1) {
            var b = l.get(p + "");
            b !== void 0 ? N(b, g) : p in a && (b = T(g), l.set(p + "", b));
          }
        c === void 0 ? (!v || (P = $(a, u)) != null && P.writable) && (c = T(void 0), N(c, R(o, _)), l.set(u, c)) : (v = c.v !== g, N(c, R(o, _)));
        var M = Reflect.getOwnPropertyDescriptor(a, u);
        if (M != null && M.set && M.set.call(f, o), !v) {
          if (i && typeof u == "string") {
            var J = (
              /** @type {Source<number>} */
              l.get("length")
            ), j = Number(u);
            Number.isInteger(j) && j >= J.v && N(J, j + 1);
          }
          xt(s);
        }
        return !0;
      },
      ownKeys(a) {
        F(s);
        var u = Reflect.ownKeys(a).filter((c) => {
          var v = l.get(c);
          return v === void 0 || v.v !== g;
        });
        for (var [o, f] of l)
          f.v !== g && !(o in a) && u.push(o);
        return u;
      },
      setPrototypeOf() {
        Tn();
      }
    }
  );
}
function xt(t, n = 1) {
  N(t, t.v + n);
}
var Tt, jt, qt;
function Pn() {
  if (Tt === void 0) {
    Tt = window;
    var t = Element.prototype, n = Node.prototype;
    jt = $(n, "firstChild").get, qt = $(n, "nextSibling").get, t.__click = void 0, t.__className = "", t.__attributes = null, t.__styles = null, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function Rn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Bt(t) {
  return jt.call(t);
}
// @__NO_SIDE_EFFECTS__
function ht(t) {
  return qt.call(t);
}
function An(t, n) {
  {
    var e = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Bt(
        /** @type {Node} */
        t
      )
    );
    return e instanceof Comment && e.data === "" ? /* @__PURE__ */ ht(e) : e;
  }
}
function kt(t, n = 1, e = !1) {
  let r = t;
  for (; n--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ ht(r);
  return r;
}
// @__NO_SIDE_EFFECTS__
function Fn(t) {
  var n = x | D;
  d === null ? n |= L : d.f |= It;
  var e = h !== null && h.f & x ? (
    /** @type {Derived} */
    h
  ) : null;
  const r = {
    children: null,
    ctx: y,
    deps: null,
    equals: Lt,
    f: n,
    fn: t,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0,
    parent: e ?? d
  };
  return e !== null && (e.children ?? (e.children = [])).push(r), r;
}
function Ut(t) {
  var n = t.children;
  if (n !== null) {
    t.children = null;
    for (var e = 0; e < n.length; e += 1) {
      var r = n[e];
      r.f & x ? pt(
        /** @type {Derived} */
        r
      ) : I(
        /** @type {Effect} */
        r
      );
    }
  }
}
function In(t) {
  for (var n = t.parent; n !== null; ) {
    if (!(n.f & x))
      return (
        /** @type {Effect} */
        n
      );
    n = n.parent;
  }
  return null;
}
function Vt(t) {
  var n, e = d;
  V(In(t));
  try {
    Ut(t), n = Xt(t);
  } finally {
    V(e);
  }
  return n;
}
function Yt(t) {
  var n = Vt(t), e = (A || t.f & L) && t.deps !== null ? Z : m;
  S(t, e), t.equals(n) || (t.v = n, t.version = Qt());
}
function pt(t) {
  Ut(t), W(t, 0), S(t, Y), t.v = t.children = t.deps = t.ctx = t.reactions = null;
}
function $t(t) {
  d === null && h === null && mn(), h !== null && h.f & L && En(), yt && gn();
}
function Ln(t, n) {
  var e = n.last;
  e === null ? n.last = n.first = t : (e.next = t, t.prev = e, n.last = t);
}
function z(t, n, e, r = !0) {
  var l = (t & it) !== 0, i = d, s = {
    ctx: y,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: t | D,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: l ? null : i,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (e) {
    var _ = B;
    try {
      Ot(!0), gt(s), s.f |= pn;
    } catch (o) {
      throw I(s), o;
    } finally {
      Ot(_);
    }
  } else n !== null && st(s);
  var a = e && s.deps === null && s.first === null && s.nodes_start === null && s.teardown === null && (s.f & It) === 0;
  if (!a && !l && r && (i !== null && Ln(s, i), h !== null && h.f & x)) {
    var u = (
      /** @type {Derived} */
      h
    );
    (u.children ?? (u.children = [])).push(s);
  }
  return s;
}
function Nt(t) {
  $t();
  var n = d !== null && (d.f & O) !== 0 && y !== null && !y.m;
  if (n) {
    var e = (
      /** @type {ComponentContext} */
      y
    );
    (e.e ?? (e.e = [])).push({
      fn: t,
      effect: d,
      reaction: h
    });
  } else {
    var r = Ht(t);
    return r;
  }
}
function Mn(t) {
  return $t(), qn(t);
}
function jn(t) {
  const n = z(it, t, !0);
  return (e = {}) => new Promise((r) => {
    e.outro ? $n(n, () => {
      I(n), r(void 0);
    }) : (I(n), r(void 0));
  });
}
function Ht(t) {
  return z(Ft, t, !1);
}
function qn(t) {
  return z(lt, t, !0);
}
function Bn(t) {
  return Un(t);
}
function Un(t, n = 0) {
  return z(lt | vt | n, t, !0);
}
function Vn(t, n = !0) {
  return z(lt | O, t, !0, n);
}
function Kt(t) {
  var n = t.teardown;
  if (n !== null) {
    const e = yt, r = h;
    St(!0), U(null);
    try {
      n.call(null);
    } finally {
      St(e), U(r);
    }
  }
}
function Wt(t) {
  var n = t.deriveds;
  if (n !== null) {
    t.deriveds = null;
    for (var e = 0; e < n.length; e += 1)
      pt(n[e]);
  }
}
function Gt(t, n = !1) {
  var e = t.first;
  for (t.first = t.last = null; e !== null; ) {
    var r = e.next;
    I(e, n), e = r;
  }
}
function Yn(t) {
  for (var n = t.first; n !== null; ) {
    var e = n.next;
    n.f & O || I(n), n = e;
  }
}
function I(t, n = !0) {
  var e = !1;
  if ((n || t.f & wn) && t.nodes_start !== null) {
    for (var r = t.nodes_start, l = t.nodes_end; r !== null; ) {
      var i = r === l ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ht(r)
      );
      r.remove(), r = i;
    }
    e = !0;
  }
  Gt(t, n && !e), Wt(t), W(t, 0), S(t, Y);
  var s = t.transitions;
  if (s !== null)
    for (const a of s)
      a.stop();
  Kt(t);
  var _ = t.parent;
  _ !== null && _.first !== null && Zt(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function Zt(t) {
  var n = t.parent, e = t.prev, r = t.next;
  e !== null && (e.next = r), r !== null && (r.prev = e), n !== null && (n.first === t && (n.first = r), n.last === t && (n.last = e));
}
function $n(t, n) {
  var e = [];
  zt(t, e, !0), Hn(e, () => {
    I(t), n && n();
  });
}
function Hn(t, n) {
  var e = t.length;
  if (e > 0) {
    var r = () => --e || n();
    for (var l of t)
      l.out(r);
  } else
    n();
}
function zt(t, n, e) {
  if (!(t.f & nt)) {
    if (t.f ^= nt, t.transitions !== null)
      for (const s of t.transitions)
        (s.is_global || e) && n.push(s);
    for (var r = t.first; r !== null; ) {
      var l = r.next, i = (r.f & yn) !== 0 || (r.f & O) !== 0;
      zt(r, n, i ? e : !1), r = l;
    }
  }
}
let X = !1, et = !1, rt = null, B = !1, yt = !1;
function Ot(t) {
  B = t;
}
function St(t) {
  yt = t;
}
let ct = [], K = 0;
let h = null;
function U(t) {
  h = t;
}
let d = null;
function V(t) {
  d = t;
}
let k = null;
function Kn(t) {
  k = t;
}
let w = null, E = 0, C = null;
function Wn(t) {
  C = t;
}
let Jt = 0, A = !1, y = null;
function Qt() {
  return ++Jt;
}
function wt() {
  return !dt || y !== null && y.l === null;
}
function ut(t) {
  var s, _;
  var n = t.f;
  if (n & D)
    return !0;
  if (n & Z) {
    var e = t.deps, r = (n & L) !== 0;
    if (e !== null) {
      var l;
      if (n & tt) {
        for (l = 0; l < e.length; l++)
          ((s = e[l]).reactions ?? (s.reactions = [])).push(t);
        t.f ^= tt;
      }
      for (l = 0; l < e.length; l++) {
        var i = e[l];
        if (ut(
          /** @type {Derived} */
          i
        ) && Yt(
          /** @type {Derived} */
          i
        ), r && d !== null && !A && !((_ = i == null ? void 0 : i.reactions) != null && _.includes(t)) && (i.reactions ?? (i.reactions = [])).push(t), i.version > t.version)
          return !0;
      }
    }
    (!r || d !== null && !A) && S(t, m);
  }
  return !1;
}
function Gn(t, n) {
  for (var e = n; e !== null; ) {
    if (e.f & at)
      try {
        e.fn(t);
        return;
      } catch {
        e.f ^= at;
      }
    e = e.parent;
  }
  throw X = !1, t;
}
function Zn(t) {
  return (t.f & Y) === 0 && (t.parent === null || (t.parent.f & at) === 0);
}
function ot(t, n, e, r) {
  if (X) {
    if (e === null && (X = !1), Zn(n))
      throw t;
    return;
  }
  e !== null && (X = !0);
  {
    Gn(t, n);
    return;
  }
}
function Xt(t) {
  var c;
  var n = w, e = E, r = C, l = h, i = A, s = k, _ = y, a = t.f;
  w = /** @type {null | Value[]} */
  null, E = 0, C = null, h = a & (O | it) ? null : t, A = !B && (a & L) !== 0, k = null, y = t.ctx;
  try {
    var u = (
      /** @type {Function} */
      (0, t.fn)()
    ), o = t.deps;
    if (w !== null) {
      var f;
      if (W(t, E), o !== null && E > 0)
        for (o.length = E + w.length, f = 0; f < w.length; f++)
          o[E + f] = w[f];
      else
        t.deps = o = w;
      if (!A)
        for (f = E; f < o.length; f++)
          ((c = o[f]).reactions ?? (c.reactions = [])).push(t);
    } else o !== null && E < o.length && (W(t, E), o.length = E);
    return u;
  } finally {
    w = n, E = e, C = r, h = l, A = i, k = s, y = _;
  }
}
function zn(t, n) {
  let e = n.reactions;
  if (e !== null) {
    var r = e.indexOf(t);
    if (r !== -1) {
      var l = e.length - 1;
      l === 0 ? e = n.reactions = null : (e[r] = e[l], e.pop());
    }
  }
  e === null && n.f & x && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (w === null || !w.includes(n)) && (S(n, Z), n.f & (L | tt) || (n.f ^= tt), W(
    /** @type {Derived} **/
    n,
    0
  ));
}
function W(t, n) {
  var e = t.deps;
  if (e !== null)
    for (var r = n; r < e.length; r++)
      zn(t, e[r]);
}
function gt(t) {
  var n = t.f;
  if (!(n & Y)) {
    S(t, m);
    var e = d, r = y;
    d = t;
    try {
      n & vt ? Yn(t) : Gt(t), Wt(t), Kt(t);
      var l = Xt(t);
      t.teardown = typeof l == "function" ? l : null, t.version = Jt;
    } catch (i) {
      ot(i, t, e, r || t.ctx);
    } finally {
      d = e;
    }
  }
}
function Jn() {
  if (K > 1e3) {
    K = 0;
    try {
      bn();
    } catch (t) {
      if (rt !== null)
        ot(t, rt, null);
      else
        throw t;
    }
  }
  K++;
}
function Qn(t) {
  var n = t.length;
  if (n !== 0) {
    Jn();
    var e = B;
    B = !0;
    try {
      for (var r = 0; r < n; r++) {
        var l = t[r];
        l.f & m || (l.f ^= m);
        var i = [];
        tn(l, i), Xn(i);
      }
    } finally {
      B = e;
    }
  }
}
function Xn(t) {
  var n = t.length;
  if (n !== 0)
    for (var e = 0; e < n; e++) {
      var r = t[e];
      if (!(r.f & (Y | nt)))
        try {
          ut(r) && (gt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Zt(r) : r.fn = null));
        } catch (l) {
          ot(l, r, null, r.ctx);
        }
    }
}
function te() {
  if (et = !1, K > 1001)
    return;
  const t = ct;
  ct = [], Qn(t), et || (K = 0, rt = null);
}
function st(t) {
  et || (et = !0, queueMicrotask(te)), rt = t;
  for (var n = t; n.parent !== null; ) {
    n = n.parent;
    var e = n.f;
    if (e & (it | O)) {
      if (!(e & m)) return;
      n.f ^= m;
    }
  }
  ct.push(n);
}
function tn(t, n) {
  var e = t.first, r = [];
  t: for (; e !== null; ) {
    var l = e.f, i = (l & O) !== 0, s = i && (l & m) !== 0, _ = e.next;
    if (!s && !(l & nt))
      if (l & lt) {
        if (i)
          e.f ^= m;
        else
          try {
            ut(e) && gt(e);
          } catch (f) {
            ot(f, e, null, e.ctx);
          }
        var a = e.first;
        if (a !== null) {
          e = a;
          continue;
        }
      } else l & Ft && r.push(e);
    if (_ === null) {
      let f = e.parent;
      for (; f !== null; ) {
        if (t === f)
          break t;
        var u = f.next;
        if (u !== null) {
          e = u;
          continue t;
        }
        f = f.parent;
      }
    }
    e = _;
  }
  for (var o = 0; o < r.length; o++)
    a = r[o], n.push(a), tn(a, n);
}
function F(t) {
  var o;
  var n = t.f, e = (n & x) !== 0;
  if (e && n & Y) {
    var r = Vt(
      /** @type {Derived} */
      t
    );
    return pt(
      /** @type {Derived} */
      t
    ), r;
  }
  if (h !== null) {
    k !== null && k.includes(t) && kn();
    var l = h.deps;
    w === null && l !== null && l[E] === t ? E++ : w === null ? w = [t] : w.push(t), C !== null && d !== null && d.f & m && !(d.f & O) && C.includes(t) && (S(d, D), st(d));
  } else if (e && /** @type {Derived} */
  t.deps === null)
    for (var i = (
      /** @type {Derived} */
      t
    ), s = i.parent, _ = i; s !== null; )
      if (s.f & x) {
        var a = (
          /** @type {Derived} */
          s
        );
        _ = a, s = a.parent;
      } else {
        var u = (
          /** @type {Effect} */
          s
        );
        (o = u.deriveds) != null && o.includes(_) || (u.deriveds ?? (u.deriveds = [])).push(_);
        break;
      }
  return e && (i = /** @type {Derived} */
  t, ut(i) && Yt(i)), t.v;
}
function ne(t) {
  const n = h;
  try {
    return h = null, t();
  } finally {
    h = n;
  }
}
const ee = ~(D | Z | m);
function S(t, n) {
  t.f = t.f & ee | n;
}
function nn(t, n = !1, e) {
  y = {
    p: y,
    c: null,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  }, dt && !n && (y.l = {
    s: null,
    u: null,
    r1: [],
    r2: T(!1)
  });
}
function en(t) {
  const n = y;
  if (n !== null) {
    const s = n.e;
    if (s !== null) {
      var e = d, r = h;
      n.e = null;
      try {
        for (var l = 0; l < s.length; l++) {
          var i = s[l];
          V(i.effect), U(i.reaction), Ht(i.fn);
        }
      } finally {
        V(e), U(r);
      }
    }
    y = n.p, n.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function re(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (H in t)
      _t(t);
    else if (!Array.isArray(t))
      for (let n in t) {
        const e = t[n];
        typeof e == "object" && e && H in e && _t(e);
      }
  }
}
function _t(t, n = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && // We don't want to traverse DOM elements
  !(t instanceof EventTarget) && !n.has(t)) {
    n.add(t), t instanceof Date && t.getTime();
    for (let r in t)
      try {
        _t(t[r], n);
      } catch {
      }
    const e = At(t);
    if (e !== Object.prototype && e !== Array.prototype && e !== Map.prototype && e !== Set.prototype && e !== Date.prototype) {
      const r = _n(e);
      for (let l in r) {
        const i = r[l].get;
        if (i)
          try {
            i.call(t);
          } catch {
          }
      }
    }
  }
}
const le = /* @__PURE__ */ new Set(), Ct = /* @__PURE__ */ new Set();
function Q(t) {
  var j;
  var n = this, e = (
    /** @type {Node} */
    n.ownerDocument
  ), r = t.type, l = ((j = t.composedPath) == null ? void 0 : j.call(t)) || [], i = (
    /** @type {null | Element} */
    l[0] || t.target
  ), s = 0, _ = t.__root;
  if (_) {
    var a = l.indexOf(_);
    if (a !== -1 && (n === document || n === /** @type {any} */
    window)) {
      t.__root = n;
      return;
    }
    var u = l.indexOf(n);
    if (u === -1)
      return;
    a <= u && (s = a);
  }
  if (i = /** @type {Element} */
  l[s] || t.target, i !== n) {
    cn(t, "currentTarget", {
      configurable: !0,
      get() {
        return i || e;
      }
    });
    var o = h, f = d;
    U(null), V(null);
    try {
      for (var c, v = []; i !== null; ) {
        var p = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var b = i["__" + r];
          if (b !== void 0 && !/** @type {any} */
          i.disabled)
            if (Rt(b)) {
              var [M, ...J] = b;
              M.apply(i, [t, ...J]);
            } else
              b.call(i, t);
        } catch (P) {
          c ? v.push(P) : c = P;
        }
        if (t.cancelBubble || p === n || p === null)
          break;
        i = p;
      }
      if (c) {
        for (let P of v)
          queueMicrotask(() => {
            throw P;
          });
        throw c;
      }
    } finally {
      t.__root = n, delete t.currentTarget, U(o), V(f);
    }
  }
}
function ie(t) {
  var n = document.createElement("template");
  return n.innerHTML = t, n.content;
}
function ue(t, n) {
  var e = (
    /** @type {Effect} */
    d
  );
  e.nodes_start === null && (e.nodes_start = t, e.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function oe(t, n) {
  var e = (n & 2) !== 0, r, l = !t.startsWith("<!>");
  return () => {
    r === void 0 && (r = ie(l ? t : "<!>" + t));
    var i = (
      /** @type {TemplateNode} */
      e ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Bt(i)
      ), _ = (
        /** @type {TemplateNode} */
        i.lastChild
      );
      ue(s, _);
    }
    return i;
  };
}
function se(t, n) {
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
function fe(t, n) {
  return ae(t, n);
}
const q = /* @__PURE__ */ new Map();
function ae(t, { target: n, anchor: e, props: r = {}, events: l, context: i, intro: s = !0 }) {
  Pn();
  var _ = /* @__PURE__ */ new Set(), a = (f) => {
    for (var c = 0; c < f.length; c++) {
      var v = f[c];
      if (!_.has(v)) {
        _.add(v);
        var p = sn(v);
        n.addEventListener(v, Q, { passive: p });
        var b = q.get(v);
        b === void 0 ? (document.addEventListener(v, Q, { passive: p }), q.set(v, 1)) : q.set(v, b + 1);
      }
    }
  };
  a(an(le)), Ct.add(a);
  var u = void 0, o = jn(() => {
    var f = e ?? n.appendChild(Rn());
    return Vn(() => {
      if (i) {
        nn({});
        var c = (
          /** @type {ComponentContext} */
          y
        );
        c.c = i;
      }
      l && (r.$$events = l), u = t(f, r) || {}, i && en();
    }), () => {
      var p;
      for (var c of _) {
        n.removeEventListener(c, Q);
        var v = (
          /** @type {number} */
          q.get(c)
        );
        --v === 0 ? (document.removeEventListener(c, Q), q.delete(c)) : q.set(c, v);
      }
      Ct.delete(a), f !== e && ((p = f.parentNode) == null || p.removeChild(f));
    };
  });
  return ce.set(u, o), u;
}
let ce = /* @__PURE__ */ new WeakMap();
function Dt(t, n) {
  var e = t.__attributes ?? (t.__attributes = {});
  e.value === (e.value = // treat null and undefined the same for the initial value
  n ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when its `0`
  t.value === n && (n !== 0 || t.nodeName !== "PROGRESS") || (t.value = n);
}
function _e(t = !1) {
  const n = (
    /** @type {ComponentContextLegacy} */
    y
  ), e = n.l.u;
  if (!e) return;
  let r = () => re(n.s);
  if (t) {
    let l = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const s = /* @__PURE__ */ Fn(() => {
      let _ = !1;
      const a = n.s;
      for (const u in a)
        a[u] !== i[u] && (i[u] = a[u], _ = !0);
      return _ && l++, l;
    });
    r = () => F(s);
  }
  e.b.length && Mn(() => {
    Pt(n, r), bt(e.b);
  }), Nt(() => {
    const l = ne(() => e.m.map(hn));
    return () => {
      for (const i of l)
        typeof i == "function" && i();
    };
  }), e.a.length && Nt(() => {
    Pt(n, r), bt(e.a);
  });
}
function Pt(t, n) {
  if (t.l.s)
    for (const e of t.l.s) F(e);
  n();
}
const ve = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(ve);
On();
const rn = "oscd-io-centern", ln = "0.0.1";
var de = /* @__PURE__ */ oe('<h2>Welcome to oscd-io-centern</h2> <input type="hidden" name="package-name"> <input type="hidden" name="package-version">', 1);
function he(t, n) {
  nn(n, !1), _e();
  var e = de(), r = kt(An(e), 2), l = kt(r, 2);
  Bn(() => {
    Dt(r, rn), Dt(l, ln);
  }), se(t, e), en();
}
var G;
class ge extends HTMLElement {
  constructor() {
    super(...arguments);
    mt(this, G, Sn(R({ doc: void 0, editCount: -1 })));
  }
  get props() {
    return F(ft(this, G));
  }
  set props(e) {
    N(ft(this, G), R(e));
  }
  connectedCallback() {
    var r;
    this.attachShadow({ mode: "open" }), fe(he, {
      target: this.shadowRoot
      // props: this.props,
    });
    const e = pe();
    (r = this.shadowRoot) == null || r.appendChild(e);
  }
  set doc(e) {
    this.props.doc = e;
  }
  set editCount(e) {
    this.props.editCount = e;
  }
}
G = new WeakMap();
function pe() {
  const t = `${rn}-v${ln}-style`, n = ye(), e = document.createElement("link");
  return e.rel = "stylesheet", e.type = "text/css", e.href = n, e.id = t, e;
}
function ye() {
  const t = new URL(import.meta.url), n = t.origin, e = t.pathname.split("/").slice(0, -1).filter(Boolean).join("/");
  return [n, e, "style.css"].filter(Boolean).join("/");
}
export {
  ge as default
};
