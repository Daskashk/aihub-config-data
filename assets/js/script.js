(function () {
  const grid = document.getElementById("servicesGrid");
  const emptyMsg = document.getElementById("emptyMessage");
  const searchInput = document.getElementById("searchInput");
  const pricingSelect = document.getElementById("pricingSelect");
  const privacySelect = document.getElementById("privacySelect");
  const countLine = document.getElementById("countLine");
  const versionDisplay = document.getElementById("versionDisplay");

  let allServices = [];

  async function loadData() {
    try {
      const res = await fetch("ai_services_list.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      allServices = data.ai_services || [];
      versionDisplay.textContent = `Version ${data.version || "unknown"}`;
      applyAllFilters();
    } catch (err) {
      grid.innerHTML = `<div class="empty-message">⚠️ Couldn't load services. ${err.message}</div>`;
    }
  }

  function getFilteredServices() {
    const query = searchInput.value.trim().toLowerCase();
    const pricing = pricingSelect.value;
    const privacy = privacySelect.value;

    let services = allServices;

    if (pricing !== "all") {
      services = services.filter((s) => s[2] === pricing);
    }
    if (privacy !== "all") {
      services = services.filter((s) => s[3] === privacy);
    }
    if (query) {
      services = services.filter((s) => s[0].toLowerCase().includes(query));
    }
    return services;
  }

  function render(services) {
    if (!services.length) {
      grid.innerHTML = "";
      emptyMsg.style.display = "block";
      countLine.textContent = "No AIs match the current filters.";
    } else {
      emptyMsg.style.display = "none";
      grid.innerHTML = services.map((s) => createCard(s)).join("");
      const plural = services.length === 1 ? "" : "s";
      countLine.innerHTML = `Showing <span class="count-number">${services.length}</span> AI${plural}`;
    }
  }

  function createCard([name, url, pricing, privacy, color]) {
    const safeColor =
      color && /^[0-9A-Fa-f]{6}$/.test(color) ? `#${color}` : "#7f8cff";
    const pricingClass = pricing.toLowerCase().replace(" ", "-");
    let privacyClass = "not";
    if (privacy === "Privacy focused") privacyClass = "focused";
    else if (privacy === "Privacy friendly") privacyClass = "friendly";

    return `
          <div class="card" style="--accent: ${safeColor}">
            <div class="card-name">
              <a href="${esc(url)}" target="_blank" rel="noopener noreferrer" title="Visit ${esc(name)}">${esc(name)}</a>
            </div>
            <div class="badges">
              <span class="badge badge-${pricingClass}">${esc(pricing)}</span>
              <span class="badge badge-${privacyClass}">${esc(privacy)}</span>
            </div>
          </div>
        `;
  }

  function esc(str) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return String(str).replace(/[&<>"']/g, (c) => map[c]);
  }

  function applyAllFilters() {
    const filtered = getFilteredServices();
    render(filtered);
  }

  pricingSelect.addEventListener("change", applyAllFilters);
  privacySelect.addEventListener("change", applyAllFilters);
  searchInput.addEventListener("input", applyAllFilters);
  loadData();
})();
