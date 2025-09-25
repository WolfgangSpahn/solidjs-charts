import { createRenderEffect as g, untrack as N, sharedConfig as S, mergeProps as B, createEffect as D, onCleanup as v, createComponent as M, Show as P } from "solid-js";
function O(i, t, e) {
  let r = e.length, o = t.length, s = r, l = 0, n = 0, f = t[o - 1].nextSibling, a = null;
  for (; l < o || n < s; ) {
    if (t[l] === e[n]) {
      l++, n++;
      continue;
    }
    for (; t[o - 1] === e[s - 1]; )
      o--, s--;
    if (o === l) {
      const d = s < r ? n ? e[n - 1].nextSibling : e[s - n] : f;
      for (; n < s; ) i.insertBefore(e[n++], d);
    } else if (s === n)
      for (; l < o; )
        (!a || !a.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === e[s - 1] && e[n] === t[o - 1]) {
      const d = t[--o].nextSibling;
      i.insertBefore(e[n++], t[l++].nextSibling), i.insertBefore(e[--s], d), t[o] = e[s];
    } else {
      if (!a) {
        a = /* @__PURE__ */ new Map();
        let c = n;
        for (; c < s; ) a.set(e[c], c++);
      }
      const d = a.get(t[l]);
      if (d != null)
        if (n < d && d < s) {
          let c = l, h = 1, u;
          for (; ++c < o && c < s && !((u = a.get(t[c])) == null || u !== d + h); )
            h++;
          if (h > d - n) {
            const I = t[l];
            for (; n < d; ) i.insertBefore(e[n++], I);
          } else i.replaceChild(e[n++], t[l++]);
        } else l++;
      else t[l++].remove();
    }
  }
}
function w(i, t, e, r) {
  let o;
  const s = () => {
    const n = document.createElement("template");
    return n.innerHTML = i, n.content.firstChild;
  }, l = () => (o || (o = s())).cloneNode(!0);
  return l.cloneNode = l, l;
}
function C(i, t, e) {
  A(i) || (e == null ? i.removeAttribute(t) : i.setAttribute(t, e));
}
function _(i, t) {
  A(i) || (t == null ? i.removeAttribute("class") : i.className = t);
}
function b(i, t, e) {
  if (!t) return e ? C(i, "style") : t;
  const r = i.style;
  if (typeof t == "string") return r.cssText = t;
  typeof e == "string" && (r.cssText = e = void 0), e || (e = {}), t || (t = {});
  let o, s;
  for (s in e)
    t[s] == null && r.removeProperty(s), delete e[s];
  for (s in t)
    o = t[s], o !== e[s] && (r.setProperty(s, o), e[s] = o);
  return e;
}
function F(i, t, e) {
  return N(() => i(t, e));
}
function E(i, t, e, r) {
  if (typeof t != "function") return p(i, t, r, e);
  g((o) => p(i, t(), o, e), r);
}
function A(i) {
  return !!S.context && !S.done && (!i || i.isConnected);
}
function p(i, t, e, r, o) {
  const s = A(i);
  if (s) {
    !e && (e = [...i.childNodes]);
    let n = [];
    for (let f = 0; f < e.length; f++) {
      const a = e[f];
      a.nodeType === 8 && a.data.slice(0, 2) === "!$" ? a.remove() : n.push(a);
    }
    e = n;
  }
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const l = typeof t;
  if (i = i, l === "string" || l === "number") {
    if (s || l === "number" && (t = t.toString(), t === e))
      return e;
    e !== "" && typeof e == "string" ? e = i.firstChild.data = t : e = i.textContent = t;
  } else if (t == null || l === "boolean") {
    if (s) return e;
    e = y(i, e, r);
  } else {
    if (l === "function")
      return g(() => {
        let n = t();
        for (; typeof n == "function"; ) n = n();
        e = p(i, n, e, r);
      }), () => e;
    if (Array.isArray(t)) {
      const n = [], f = e && Array.isArray(e);
      if (x(n, t, e, o))
        return g(() => e = p(i, n, e, r, !0)), () => e;
      if (s)
        return n.length ? e = [...i.childNodes] : e;
      n.length === 0 ? e = y(i, e, r) : f ? e.length === 0 ? $(i, n, r) : O(i, e, n) : (e && y(i), $(i, n)), e = n;
    } else if (t.nodeType) {
      if (s && t.parentNode) return e = t;
      Array.isArray(e) ? y(i, e, null, t) : e == null || e === "" || !i.firstChild ? i.appendChild(t) : i.replaceChild(t, i.firstChild), e = t;
    }
  }
  return e;
}
function x(i, t, e, r) {
  let o = !1;
  for (let s = 0, l = t.length; s < l; s++) {
    let n = t[s], f = e && e[i.length], a;
    if (!(n == null || n === !0 || n === !1)) if ((a = typeof n) == "object" && n.nodeType)
      i.push(n);
    else if (Array.isArray(n))
      o = x(i, n, f) || o;
    else if (a === "function")
      if (r) {
        for (; typeof n == "function"; ) n = n();
        o = x(i, Array.isArray(n) ? n : [n], Array.isArray(f) ? f : [f]) || o;
      } else
        i.push(n), o = !0;
    else {
      const d = String(n);
      f && f.nodeType === 3 && f.data === d ? i.push(f) : i.push(document.createTextNode(d));
    }
  }
  return o;
}
function $(i, t, e = null) {
  for (let r = 0, o = t.length; r < o; r++) i.insertBefore(t[r], e);
}
function y(i, t, e, r) {
  if (e === void 0) return i.textContent = "";
  const o = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const n = t[l];
      if (o !== n) {
        const f = n.parentNode === i;
        !s && !l ? f ? i.replaceChild(o, n) : i.insertBefore(o, e) : f && n.remove();
      } else s = !0;
    }
  } else i.insertBefore(o, e);
  return [o];
}
const V = {
  responsive: !0,
  maintainAspectRatio: !1,
  animation: {
    duration: 300
    // Faster animations for better UX
  },
  scales: {
    x: {
      grid: {
        display: !0
      }
    },
    y: {
      grid: {
        display: !0
      },
      beginAtZero: !0
    }
  },
  plugins: {
    legend: {
      display: !0,
      position: "top"
    },
    tooltip: {
      enabled: !0,
      mode: "index",
      intersect: !1
    }
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: !1
  }
}, H = {
  line: {
    elements: {
      line: {
        tension: 0.1
        // Slight curve for line charts
      }
    }
  },
  bar: {
    scales: {
      x: {
        grid: {
          display: !1
          // Clean look for bar charts
        }
      }
    }
  },
  pie: {
    scales: {},
    // No scales for pie charts
    plugins: {
      legend: {
        position: "right"
      }
    }
  },
  doughnut: {
    scales: {},
    // No scales for doughnut charts
    plugins: {
      legend: {
        position: "right"
      }
    }
    // Note: cutout is a dataset property, not a chart option
    // It should be set on individual datasets when creating the chart
  },
  scatter: {
    plugins: {
      legend: {
        display: !1
        // Usually not needed for scatter plots
      }
    }
  },
  bubble: {
    plugins: {
      legend: {
        display: !1
        // Usually not needed for bubble charts
      }
    }
  },
  radar: {
    scales: {
      r: {
        beginAtZero: !0,
        grid: {
          display: !0
        }
      }
    }
  }
};
function T(i, t) {
  const e = [];
  return i ? (!["scatter", "bubble"].includes(t) && !Array.isArray(i.labels) && e.push("Chart data must include labels array"), !Array.isArray(i.datasets) || i.datasets.length === 0 ? e.push("Chart data must include at least one dataset") : i.datasets.forEach((r, o) => {
    if (r.label || e.push(`Dataset at index ${o} must have a label`), !Array.isArray(r.data))
      e.push(`Dataset at index ${o} must have a data array`);
    else
      switch (t) {
        case "bubble":
          r.data.every(
            (s) => typeof s == "object" && s !== null && "x" in s && "y" in s && "r" in s
          ) || e.push(`Dataset at index ${o} for bubble chart must contain objects with x, y, r properties`);
          break;
        case "scatter":
          r.data.every(
            (s) => typeof s == "object" && s !== null && "x" in s && "y" in s
          ) || e.push(`Dataset at index ${o} for scatter chart must contain objects with x, y properties`);
          break;
        default:
          r.data.every((s) => typeof s == "number") || e.push(`Dataset at index ${o} for ${t} chart must contain numbers`);
      }
  }), {
    isValid: e.length === 0,
    errors: e
  }) : (e.push("Chart data is required"), { isValid: !1, errors: e });
}
function j(i, t, e = {}) {
  const r = H[i] || {}, o = {
    ...V,
    ...r,
    ...e,
    // Ensure these are always set for SolidJS
    responsive: !0,
    maintainAspectRatio: !1
  };
  return {
    type: i,
    data: t,
    options: o
  };
}
function J() {
  return `solidjs-chart-${Math.random().toString(36).substr(2, 9)}`;
}
function m(i) {
  try {
    i && typeof i.destroy == "function" && i.destroy();
  } catch (t) {
    console.warn("Error destroying chart:", t);
  }
}
function U() {
  try {
    return typeof window < "u" && "Chart" in window;
  } catch {
    return !1;
  }
}
var L = /* @__PURE__ */ w("<canvas>"), R = /* @__PURE__ */ w("<div>"), k = /* @__PURE__ */ w("<div class=chart-error-message><div><div style=font-weight:600;margin-bottom:8px>Chart Error</div><div>");
const Z = (i) => {
  const t = B({
    width: 400,
    height: 200,
    options: {}
  }, i), e = () => T(t.data, t.type), r = () => e().isValid;
  let o, s = null, l;
  const n = async () => {
    if (!(!o || !r()))
      if (s && l !== t.type && (m(s), s = null), s)
        s.data = t.data, t.options && Object.assign(s.options, t.options), s.update("none");
      else
        try {
          const {
            Chart: f,
            registerables: a
          } = await import("chart.js");
          f.register(...a);
          const d = j(t.type, t.data, t.options);
          s = new f(o, d), l = t.type, t.onChartClick && (o.onclick = (c) => {
            if (!s) return;
            const h = s.getElementsAtEventForMode(c, "nearest", {
              intersect: !0
            }, !1);
            t.onChartClick({
              event: c,
              elements: h,
              chart: s
            });
          }), t.onChartHover && (o.onmousemove = (c) => {
            if (!s) return;
            const h = s.getElementsAtEventForMode(c, "nearest", {
              intersect: !1
            }, !1);
            t.onChartHover({
              event: c,
              elements: h,
              chart: s
            });
          });
        } catch (f) {
          console.error("Failed to initialize chart:", f);
        }
  };
  return D(() => {
    t.type, t.data, t.options, n();
  }), v(() => {
    s && (m(s), s = null);
  }), (() => {
    var f = R();
    return E(f, M(P, {
      get when() {
        return r();
      },
      get fallback() {
        return (() => {
          var a = k(), d = a.firstChild, c = d.firstChild, h = c.nextSibling;
          return E(h, () => e().errors.join(", ")), g((u) => b(a, `
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${t.width}px;
            height: ${t.height}px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            color: #dc3545;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            text-align: center;
            padding: 20px;
          `, u)), a;
        })();
      },
      get children() {
        var a = L();
        return F((d) => {
          o = d, d && n();
        }, a), g((d) => {
          var c = t.width, h = t.height, u = `
            display: block;
            box-sizing: border-box;
            width: ${t.width}px;
            height: ${t.height}px;
          `;
          return c !== d.e && C(a, "width", d.e = c), h !== d.t && C(a, "height", d.t = h), d.a = b(a, u, d.a), d;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), a;
      }
    })), g((a) => {
      var d = `solidjs-chart-container ${t.class || ""}`, c = typeof t.style == "string" ? t.style : void 0, h = !r();
      return d !== a.e && _(f, a.e = d), a.t = b(f, c, a.t), h !== a.a && f.classList.toggle("chart-error", a.a = h), a;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), f;
  })();
};
function G() {
  let i = null;
  const t = async (r, o, s, l) => {
    i && (m(i), i = null);
    const n = T(s, o);
    if (!n.isValid)
      throw new Error(`Invalid chart data: ${n.errors.join(", ")}`);
    const { Chart: f, registerables: a } = await import("chart.js");
    f.register(...a);
    const d = j(o, s, l);
    return i = new f(r, d), i;
  }, e = () => {
    i && (m(i), i = null);
  };
  return v(() => {
    e();
  }), {
    createChart: t,
    destroyChart: e
  };
}
export {
  Z as Chart,
  V as DEFAULT_CHART_OPTIONS,
  H as TYPE_SPECIFIC_OPTIONS,
  j as createChartConfig,
  Z as default,
  J as generateChartId,
  U as isChartJSAvailable,
  m as safeDestroyChart,
  G as useChart,
  T as validateChartData
};
