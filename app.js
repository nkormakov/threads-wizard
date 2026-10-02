(function () {
  const tbody = document.querySelector("#threads tbody");
  const compareBtn = document.getElementById("compare");
  const clearBtn = document.getElementById("clear");
  const countEl = document.getElementById("count");
  const fmt = (n) => (Math.round(n * 1000) / 1000).toString();

  const rows = THREADS.map(([d, p, series], i) => {
    const id = `M${d}x${p}`;
    const label = series === "coarse" ? `M${d}` : `M${d} × ${p}`;
    const tr = document.createElement("tr");
    tr.dataset.series = series;
    tr.dataset.id = id;
    tr.innerHTML = `
      <td><input type="checkbox" aria-label="Select ${label}"></td>
      <th scope="row">${label}${series === "coarse" ? ' <small>coarse</small>' : ""}</th>
      <td class="num">${fmt(p)}</td>
      <td class="num">${fmt(d)}</td>
      <td class="num">${fmt(d - 1.22687 * p)}</td>
      <td class="num">${fmt(d - 1.08253 * p)}</td>`;
    tbody.appendChild(tr);
    return tr;
  });

  let comparing = false;
  let series = "all";

  function selected() {
    return rows.filter((r) => r.querySelector("input").checked);
  }

  function render() {
    const sel = selected();
    rows.forEach((r) => {
      const matchSeries = series === "all" || r.dataset.series === series;
      const isSel = r.querySelector("input").checked;
      r.hidden = comparing ? !isSel : !matchSeries;
      r.classList.toggle("selected", isSel);
    });
    countEl.textContent = `${sel.length} selected`;
    clearBtn.disabled = sel.length === 0 || comparing;
    compareBtn.disabled = !comparing && sel.length < 2;
    compareBtn.textContent = comparing ? "Show all again" : "Compare selected";
    document.querySelectorAll(".filters input").forEach((i) => (i.disabled = comparing));
    document.querySelectorAll("tbody input").forEach((i) => (i.disabled = comparing));
  }

  tbody.addEventListener("change", render);
  tbody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr || comparing || e.target.tagName === "INPUT") return;
    const cb = tr.querySelector("input");
    cb.checked = !cb.checked;
    render();
  });
  compareBtn.addEventListener("click", () => { comparing = !comparing; render(); });
  clearBtn.addEventListener("click", () => { rows.forEach((r) => (r.querySelector("input").checked = false)); render(); });
  document.querySelectorAll(".filters input").forEach((i) =>
    i.addEventListener("change", () => { series = i.value; render(); })
  );

  render();
})();
