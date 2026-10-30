(function () {
  const MM_PER_IN = 25.4;
  const tbody = document.querySelector("#threads tbody");
  const compareBtn = document.getElementById("compare");
  const clearBtn = document.getElementById("clear");
  const rareBtn = document.getElementById("rare");
  const retapBtn = document.getElementById("retap");
  const retapInfo = document.getElementById("retap-info");
  const countEl = document.getElementById("count");
  const toolbar = document.querySelector(".toolbar");
  // The table header sticks right below the (variable-height) sticky toolbar.
  new ResizeObserver(() =>
    document.documentElement.style.setProperty("--toolbar-h", `${toolbar.offsetHeight}px`)
  ).observe(toolbar);
  const round = (n, places) => (Math.round(n * 10 ** places) / 10 ** places).toString();
  const unit = (value, u) => `${value}<span class="u">${u}</span>`;

  // Every thread is stored in mm internally; d = major diameter, p = pitch.
  const threads = [
    ...METRIC.map(([d, p, series, freq]) => ({
      system: "metric", series, freq, d, p,
      label: series === "coarse" ? `M${d}` : `M${d} × ${p}`,
      tag: series
    })),
    ...INCH.map(([size, dIn, tpi, series, freq]) => ({
      system: "inch", series, freq, d: dIn * MM_PER_IN, p: MM_PER_IN / tpi, tpi,
      label: `${size}-${tpi}`,
      tag: series === "coarse" ? "UNC" : "UNF"
    }))
  ].sort((a, b) => a.d - b.d || b.p - a.p);
  threads.forEach((t) => {
    t.boltPeak = t.d;
    t.boltValley = t.d - 1.22687 * t.p;
    t.nutPeak = t.d - 1.08253 * t.p;
    t.nutValley = t.d;
  });

  const rows = threads.map((t) => {
    const tr = document.createElement("tr");
    const tags = [t.tag, t.freq === "rare" ? "rare" : ""].filter(Boolean);
    tr.innerHTML = `
      <td><input type="checkbox" aria-label="Select ${t.label}"></td>
      <th scope="row">${t.label}${tags.map((s) => ` <small>${s}</small>`).join("")}</th>
      <td class="num"></td><td class="num"></td><td class="num"></td><td class="num"></td><td class="num"></td>`;
    tbody.appendChild(tr);
    tr.thread = t;
    return tr;
  });

  // units: "native" (each thread in its own system), "mm" or "in"
  function cells(t, units) {
    const diameters = [t.boltPeak, t.boltValley, t.nutPeak, t.nutValley];
    if (units === "mm" || (units === "native" && t.system === "metric")) {
      return [unit(round(t.p, 3), "mm"), ...diameters.map((v) => unit(round(v, 3), "mm"))];
    }
    return [unit(round(t.tpi || MM_PER_IN / t.p, 2), "TPI"),
      ...diameters.map((v) => unit(round(v / MM_PER_IN, 4), "in"))];
  }

  const state = { comparing: false, system: "metric", series: "all", units: "native", showRare: false, retap: false };
  const checkbox = (r) => r.querySelector("input");

  function render() {
    const sel = rows.filter((r) => checkbox(r).checked);
    let hiddenRare = 0;
    // Re-tap check: the smallest selected thread is the existing hole; a new thread whose bore (nut peak)
    // is smaller than that hole's nut valley would leave the old grooves in place.
    const base = state.retap && sel.length
      ? sel.reduce((a, b) => (b.thread.d < a.thread.d ? b : a)) : null;
    rows.forEach((r) => {
      const t = r.thread;
      const matchFilters = (state.system === "both" || t.system === state.system) &&
        (state.series === "all" || t.series === state.series);
      const isRareHidden = t.freq === "rare" && !state.showRare;
      if (matchFilters && t.freq === "rare") hiddenRare++;
      const isSel = checkbox(r).checked;
      r.hidden = state.comparing ? !isSel : !matchFilters || isRareHidden;
      r.classList.toggle("selected", isSel);
      r.classList.toggle("retap-base", r === base);
      r.classList.toggle("retap-bad", !!base && r !== base && t.nutPeak < base.thread.nutValley - 1e-9);
      cells(t, state.units).forEach((html, i) => (r.cells[i + 2].innerHTML = html));
    });
    countEl.textContent = `${sel.length} selected`;
    clearBtn.disabled = sel.length === 0 || state.comparing;
    compareBtn.disabled = !state.comparing && sel.length < 2;
    compareBtn.textContent = state.comparing ? "Show all again" : "Compare selected";
    rareBtn.textContent = state.showRare ? "Hide rare sizes" : `Show rare sizes (${hiddenRare})`;
    rareBtn.setAttribute("aria-pressed", state.showRare);
    rareBtn.disabled = state.comparing;
    retapBtn.setAttribute("aria-pressed", state.retap);
    retapInfo.hidden = !state.retap;
    retapInfo.innerHTML = !base ? "Select a thread to use as the existing hole."
      : `Red threads can't be cleanly tapped over <strong>${base.thread.label}</strong>: ` +
        `their nut peak Ø is below its nut valley Ø (${cells(base.thread, state.units)[4]}).`;
    document.querySelectorAll('[name="system"], [name="series"], tbody input')
      .forEach((i) => (i.disabled = state.comparing));
  }

  tbody.addEventListener("change", render);
  tbody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr || state.comparing || e.target.tagName === "INPUT") return;
    const cb = checkbox(tr);
    cb.checked = !cb.checked;
    render();
  });
  compareBtn.addEventListener("click", () => { state.comparing = !state.comparing; render(); });
  clearBtn.addEventListener("click", () => { rows.forEach((r) => (checkbox(r).checked = false)); render(); });
  rareBtn.addEventListener("click", () => { state.showRare = !state.showRare; render(); });
  retapBtn.addEventListener("click", () => { state.retap = !state.retap; render(); });
  document.querySelectorAll('[name="system"], [name="series"], [name="units"]').forEach((i) =>
    i.addEventListener("change", () => { state[i.name] = i.value; render(); })
  );

  render();
})();
