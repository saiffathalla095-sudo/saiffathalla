const { getFallbackData } = window.SecureShareData;
const {
  destroyCharts,
  renderAnalyticsCharts,
  renderDashboardCharts,
  renderRequirementsCharts
} = window.SecureShareCharts;

const store = getFallbackData();
const app = document.getElementById("app");
let particles = [];
let bgInitialized = false;

const ICONS = {
  shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  file: `<svg viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,
  upload: `<svg viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  activity: `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  link: `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  lock: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  trash: `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  download: `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  copy: `<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  eye: `<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  x: `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  plus: `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  git: `<svg viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>`,
  map: `<svg viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  warning: `<svg viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  logout: `<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  credit: `<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  mail: `<svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>`,
  send: `<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`
};

function notify(message, type = "success") {
  const element = document.createElement("div");
  element.className = "notif";
  element.innerHTML = `${ICONS[type === "success" ? "check" : "warning"]}<span>${message}</span>`;
  document.body.appendChild(element);
  window.setTimeout(() => element.remove(), 3000);
}

function initBackground() {
  if (bgInitialized) return;
  bgInitialized = true;

  const canvas = document.getElementById("bg-canvas");
  const context = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  particles = Array.from({ length: 42 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 18 + 8,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    o: Math.random() * 0.16 + 0.05
  }));

  function drawBackground() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "rgba(26,108,246,0.05)";
    context.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 60) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }

    for (let y = 0; y < canvas.height; y += 60) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }

    const glowOne = context.createRadialGradient(canvas.width * 0.2, canvas.height * 0.3, 0, canvas.width * 0.2, canvas.height * 0.3, 400);
    glowOne.addColorStop(0, "rgba(26,108,246,0.12)");
    glowOne.addColorStop(1, "transparent");
    context.fillStyle = glowOne;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const glowTwo = context.createRadialGradient(canvas.width * 0.8, canvas.height * 0.7, 0, canvas.width * 0.8, canvas.height * 0.7, 300);
    glowTwo.addColorStop(0, "rgba(0,198,255,0.08)");
    glowTwo.addColorStop(1, "transparent");
    context.fillStyle = glowTwo;
    context.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fillStyle = `rgba(26,108,246,${particle.o})`;
      context.shadowBlur = 28;
      context.shadowColor = "rgba(0,198,255,0.35)";
      context.fill();
      context.shadowBlur = 0;
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          context.beginPath();
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
          context.strokeStyle = `rgba(26,108,246,${0.1 * (1 - distance / 100)})`;
          context.lineWidth = 0.5;
          context.stroke();
        }
      }
    }

    window.requestAnimationFrame(drawBackground);
  }

  drawBackground();
}

async function loadBootstrap() {
  const isLocalFile = window.location.protocol === "file:";
  if (isLocalFile) return;

  try {
    const response = await fetch("./api/bootstrap");
    if (!response.ok) return;
    const data = await response.json();
    Object.assign(store, data);
  } catch (error) {
    console.warn("SecureShare bootstrap fallback in use.", error);
  }
}

function navItem(page, icon, label, badge = "") {
  return `<div class="nav-item ${store.page === page ? "active" : ""}" data-page="${page}">
    ${ICONS[icon]}<span>${label}</span>${badge ? `<span class="nav-badge">${badge}</span>` : ""}
  </div>`;
}

function fileRow(file) {
  const typeClassMap = {
    pdf: "pdf",
    docx: "doc",
    doc: "doc",
    jpg: "img",
    jpeg: "img",
    png: "img",
    img: "img",
    zip: "zip",
    txt: "txt"
  };

  const typeClass = typeClassMap[file.type] || "txt";
  const extension = String(file.type).toUpperCase();

  return `<tr>
    <td>
      <div class="file-name">
        <div class="file-icon ${typeClass}">${extension}</div>
        <div>
          <div class="fname">${file.name}</div>
          <div class="fsize">${file.size}</div>
        </div>
      </div>
    </td>
    <td>${file.owner}</td>
    <td><span class="badge ${file.status}">${file.status}</span></td>
    <td>${file.encrypted ? `<span class="enc-badge">${ICONS.lock} AES-256</span>` : `<span class="fsize">None</span>`}</td>
    <td style="font-family:var(--mono)">${file.downloads}</td>
    <td><span class="expiry">${file.expiry}</span></td>
    <td>
      <div class="action-btns">
        <button class="btn btn-ghost btn-sm file-action" data-action="share" data-id="${file.id}">${ICONS.link}</button>
        <button class="btn btn-ghost btn-sm file-action" data-action="view" data-id="${file.id}">${ICONS.download}</button>
        <button class="btn btn-danger btn-sm file-action" data-action="delete" data-id="${file.id}">${ICONS.trash}</button>
      </div>
    </td>
  </tr>`;
}

function renderAuth() {
  app.innerHTML = `
    <div class="auth-screen">
      <div class="auth-card">
        <div class="auth-logo">
          <div class="logo-icon">${ICONS.shield}</div>
          <span>Secure<em>Share</em></span>
        </div>
        <h1 class="auth-title">${store.authMode === "login" ? "Welcome back" : "Create account"}</h1>
        <p class="auth-sub">${store.authMode === "login" ? "Sign in to your secure workspace" : "Join the secure file sharing platform"}</p>
        ${store.authMode === "register" ? `<div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="auth-name" placeholder="Layla Hassan"></div>` : ""}
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="auth-email" placeholder="you@example.com" value="${store.authMode === "login" ? "admin@secureshare.io" : ""}"></div>
        <div class="form-group"><label class="form-label">Password</label><input class="form-input" id="auth-pass" type="password" value="${store.authMode === "login" ? "password" : ""}"></div>
        <button class="btn-primary" id="auth-btn">${store.authMode === "login" ? "Sign In Securely" : "Create Account"}</button>
        <div class="auth-toggle">
          ${store.authMode === "login" ? `Don't have an account? <a id="auth-switch">Create one</a>` : `Already have an account? <a id="auth-switch">Sign in</a>`}
        </div>
        <div style="margin-top:1.5rem;padding:1rem;background:rgba(26,108,246,.08);border:1px solid rgba(26,108,246,.2);border-radius:10px;font-size:12px;color:var(--white60);text-align:center">
          Frontend: <code>frontend/</code> | Backend: <code>backend/</code> | Diagrams: <code>docs/diagrams/</code>
        </div>
      </div>
    </div>
  `;

  document.getElementById("auth-btn").onclick = doAuth;
  document.getElementById("auth-switch").onclick = () => {
    store.authMode = store.authMode === "login" ? "register" : "login";
    render();
  };
}

function renderAppShell() {
  app.innerHTML = `
    <nav class="sidebar">
      <div class="sidebar-logo">
        <div class="s-logo-icon">${ICONS.shield}</div>
        <span>Secure<em>Share</em></span>
      </div>
      <div class="sidebar-nav">
        <div class="nav-section">Main</div>
        ${navItem("dashboard", "home", "Dashboard")}
        ${navItem("files", "file", "My Files", String(store.files.length))}
        ${navItem("upload", "upload", "Upload File")}
        ${navItem("subscriptions", "credit", "Subscriptions")}
        ${navItem("contact", "mail", "Contact")}
        <div class="nav-section">Management</div>
        ${navItem("admin", "users", "User Management")}
        ${navItem("config", "settings", "Configuration")}
        ${navItem("requirements", "map", "Requirements Map")}
        <div class="nav-section">Analytics</div>
        ${navItem("analytics", "activity", "KPIs & Analytics")}
      </div>
      <div class="sidebar-footer">
        <div class="user-chip">
          <div class="user-avatar">${store.user.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</div>
          <div class="user-info">
            <div class="user-name">${store.user.name}</div>
            <div class="user-role"><span class="online-dot"></span>${store.user.role}</div>
          </div>
          <div class="logout-btn" id="logout-btn">${ICONS.logout}</div>
        </div>
      </div>
    </nav>
    <main class="main" id="main-content"></main>
    ${store.modal ? renderModal() : ""}
  `;

  document.getElementById("logout-btn").onclick = () => {
    store.user = null;
    store.page = "auth";
    render();
  };

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.onclick = () => {
      store.page = item.dataset.page;
      render();
    };
  });

  const mainContent = document.getElementById("main-content");
  if (store.page === "dashboard") renderDashboard(mainContent);
  if (store.page === "files") renderFiles(mainContent);
  if (store.page === "upload") renderUpload(mainContent);
  if (store.page === "subscriptions") renderSubscriptions(mainContent);
  if (store.page === "contact") renderContact(mainContent);
  if (store.page === "admin") renderAdmin(mainContent);
  if (store.page === "config") renderConfig(mainContent);
  if (store.page === "requirements") renderRequirements(mainContent);
  if (store.page === "analytics") renderAnalytics(mainContent);

  if (store.modal) wireModal();
}

function renderDashboard(target) {
  target.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Dashboard</div>
        <div class="page-sub">SecureShare overview across files, access, and team activity</div>
      </div>
      <div class="header-actions">
        <span class="enc-badge">${ICONS.lock} AES-256 Active</span>
        <button class="btn btn-blue" id="go-upload">${ICONS.upload} Upload File</button>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card blue"><div class="kpi-icon">${ICONS.file}</div><div class="kpi-label">Total Files</div><div class="kpi-value">2,481</div><div class="kpi-change up">+ 12.4% this month</div></div>
      <div class="kpi-card green"><div class="kpi-icon">${ICONS.users}</div><div class="kpi-label">Active Users</div><div class="kpi-value">348</div><div class="kpi-change up">+ 8.1% this week</div></div>
      <div class="kpi-card yellow"><div class="kpi-icon">${ICONS.activity}</div><div class="kpi-label">Storage Used</div><div class="kpi-value">84.2 GB</div><div class="kpi-change up">+ 3.8 GB since last week</div></div>
      <div class="kpi-card red"><div class="kpi-icon">${ICONS.download}</div><div class="kpi-label">Downloads Today</div><div class="kpi-value">1,039</div><div class="kpi-change down">- 2.1% vs yesterday</div></div>
    </div>

    <div class="charts-grid">
      <div class="chart-card wide"><div class="chart-title">File Upload Activity <span class="chart-sub">Last 30 days</span></div><div class="chart-wrap"><canvas id="c-activity"></canvas></div></div>
      <div class="chart-card"><div class="chart-title">Storage by Type <span class="chart-sub">Current breakdown</span></div><div class="chart-wrap"><canvas id="c-storage"></canvas></div></div>
      <div class="chart-card"><div class="chart-title">Security Events <span class="chart-sub">This week</span></div><div class="chart-wrap"><canvas id="c-security"></canvas></div></div>
    </div>

    <div class="sub-grid">
      <div class="table-card sub-summary">
        <div class="sub-copy">
          <div class="page-title" style="font-size:22px">Current Subscription</div>
          <h2>${store.subscriptions.currentPlan}</h2>
          <p>Your team is currently on the ${store.subscriptions.currentPlan} plan with ${store.subscriptions.seatsUsed}/${store.subscriptions.seatsTotal} seats in use and renewal on ${store.subscriptions.renewalDate}.</p>
          <div class="sub-badges">
            <span class="badge active">${store.subscriptions.status}</span>
            <span class="enc-badge">${ICONS.credit} ${store.subscriptions.monthlyCost}/month</span>
            <span class="enc-badge">${ICONS.lock} Secure billing</span>
          </div>
        </div>
        <div class="sub-metric">
          <div class="sub-metric-card"><strong>${store.subscriptions.seatsUsed}</strong><span>Seats Used</span></div>
          <div class="sub-metric-card"><strong>${store.subscriptions.storageUsed}</strong><span>Storage Used</span></div>
          <div class="sub-metric-card"><strong>${store.subscriptions.monthlyCost}</strong><span>Monthly Bill</span></div>
          <div class="sub-metric-card"><strong>${store.subscriptions.renewalDate}</strong><span>Renewal Date</span></div>
        </div>
      </div>
      <div class="table-card" style="padding:1.5rem">
        <div class="config-section-title">${ICONS.git} Project Structure</div>
        <div class="code-card">
          /frontend<br>
          &nbsp;&nbsp;/css/styles.css<br>
          &nbsp;&nbsp;/js/app.js<br>
          &nbsp;&nbsp;/js/charts.js<br>
          &nbsp;&nbsp;/js/data.js<br><br>
          /backend/server.js<br>
          /docs/diagrams/architecture.md
        </div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="table-title">Recent Files</div>
        <button class="btn btn-ghost btn-sm" id="goto-files">${ICONS.file} View All Files</button>
      </div>
      <table>
        <thead><tr><th>File</th><th>Owner</th><th>Status</th><th>Encrypted</th><th>Downloads</th><th>Expiry</th><th>Actions</th></tr></thead>
        <tbody>${store.files.slice(0, 4).map(fileRow).join("")}</tbody>
      </table>
    </div>
  `;

  document.getElementById("go-upload").onclick = () => {
    store.page = "upload";
    render();
  };

  document.getElementById("goto-files").onclick = () => {
    store.page = "files";
    render();
  };

  wireFileActions();
  renderDashboardCharts();
}

function renderFiles(target) {
  const query = store.searchQ.toLowerCase();
  const filtered = store.files.filter((file) => {
    const matchesQuery = file.name.toLowerCase().includes(query) || file.owner.toLowerCase().includes(query);
    const matchesStatus = !store.statusFilter || file.status === store.statusFilter;
    return matchesQuery && matchesStatus;
  });

  target.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">My Files</div>
        <div class="page-sub">${store.files.length} files | ${store.files.filter((file) => file.encrypted).length} encrypted</div>
      </div>
      <div class="header-actions">
        <button class="btn btn-blue" id="go-upload">${ICONS.upload} Upload New</button>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="table-title">All Files</div>
        <div class="header-actions">
          <input class="search-input" placeholder="Search files..." id="file-search" value="${store.searchQ}">
          <select id="status-filter">
            <option value="">All Status</option>
            <option value="active" ${store.statusFilter === "active" ? "selected" : ""}>active</option>
            <option value="shared" ${store.statusFilter === "shared" ? "selected" : ""}>shared</option>
            <option value="expired" ${store.statusFilter === "expired" ? "selected" : ""}>expired</option>
          </select>
        </div>
      </div>
      <table>
        <thead><tr><th>File</th><th>Owner</th><th>Status</th><th>Encrypted</th><th>Downloads</th><th>Expiry</th><th>Actions</th></tr></thead>
        <tbody>${filtered.map(fileRow).join("")}</tbody>
      </table>
      ${filtered.length === 0 ? `<div style="padding:3rem;text-align:center;color:var(--white40)">No files match your filters.</div>` : ""}
    </div>
  `;

  document.getElementById("go-upload").onclick = () => {
    store.page = "upload";
    render();
  };

  document.getElementById("file-search").oninput = (event) => {
    store.searchQ = event.target.value;
    renderFiles(target);
  };

  document.getElementById("status-filter").onchange = (event) => {
    store.statusFilter = event.target.value;
    renderFiles(target);
  };

  wireFileActions();
}

function renderUpload(target) {
  target.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Upload File</div>
        <div class="page-sub">Files are encrypted with AES-256 before storage</div>
      </div>
    </div>

    <div class="config-grid">
      <div>
        <div class="table-card" style="padding:1.5rem;margin-bottom:1.25rem">
          <div class="config-section-title">${ICONS.upload} Drop Zone</div>
          <div class="upload-zone" id="upload-zone">
            <input class="upload-input" type="file" id="file-input" multiple>
            <div class="upload-icon">${ICONS.upload}</div>
            <div class="upload-title">Drag and drop files here</div>
            <div class="upload-desc">or click to browse | max 100 MB per file</div>
          </div>
          ${store.uploading ? `<div style="margin-top:1.25rem"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:.5rem"><span>Uploading and encrypting...</span><span>${Math.round(store.uploadProgress)}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${store.uploadProgress}%"></div></div></div>` : ""}
        </div>

        <div class="table-card" style="padding:1.5rem">
          <div class="config-section-title">${ICONS.settings} Upload Settings</div>
          <div class="config-row"><div><div class="config-key">Enable Encryption</div><div class="config-desc">AES-256 end-to-end encryption</div></div><div class="toggle on" id="enc-toggle"></div></div>
          <div class="config-row"><div class="config-key">Set Expiry Date</div><input class="form-input" type="date" style="width:180px" value="2026-12-31"></div>
          <div class="config-row"><div class="config-key">Access Control</div><select style="width:180px"><option>Private</option><option>Link Only</option><option>Specific Users</option><option>Public</option></select></div>
        </div>
      </div>

      <div>
        <div class="table-card" style="padding:1.5rem;margin-bottom:1.25rem">
          <div class="config-section-title">${ICONS.lock} Security Info</div>
          <div style="display:grid;gap:.75rem">
            ${[
              ["AES-256 Encryption", "Files encrypted at rest and in transit"],
              ["Zero-Knowledge", "Server cannot read your file contents"],
              ["Secure Links", "Time-limited access tokens"],
              ["Audit Log", "All access events logged"]
            ].map(([title, description]) => `<div class="feature-mini"><h4>${title}</h4><p class="config-desc">${description}</p></div>`).join("")}
          </div>
        </div>

        <div class="table-card" style="padding:1.5rem">
          <div class="config-section-title">${ICONS.credit} Subscription Impact</div>
          <div class="sub-feature">${ICONS.check}<span>Current plan: ${store.subscriptions.currentPlan}</span></div>
          <div class="sub-feature" style="margin-top:.75rem">${ICONS.check}<span>Storage allowance: ${store.subscriptions.storageLimit}</span></div>
          <div class="sub-feature" style="margin-top:.75rem">${ICONS.check}<span>Seat usage: ${store.subscriptions.seatsUsed}/${store.subscriptions.seatsTotal}</span></div>
        </div>
      </div>
    </div>
  `;

  const zone = document.getElementById("upload-zone");
  zone.ondragover = (event) => {
    event.preventDefault();
    zone.classList.add("drag");
  };
  zone.ondragleave = () => zone.classList.remove("drag");
  zone.ondrop = (event) => {
    event.preventDefault();
    zone.classList.remove("drag");
    handleUpload(event.dataTransfer.files[0]);
  };

  document.getElementById("file-input").onchange = (event) => handleUpload(event.target.files[0]);
  document.getElementById("enc-toggle").onclick = (event) => event.currentTarget.classList.toggle("on");
}

function renderSubscriptions(target) {
  const { subscriptions } = store;

  target.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Subscriptions</div>
        <div class="page-sub">Billing plans, storage limits, and seat management</div>
      </div>
      <div class="header-actions">
        <button class="btn btn-blue" id="manage-plan">${ICONS.credit} Manage Billing</button>
      </div>
    </div>

    <div class="sub-grid">
      <div class="table-card sub-summary">
        <div class="sub-copy">
          <span class="badge active">${subscriptions.status}</span>
          <h2>${subscriptions.currentPlan} Plan</h2>
          <p>Renews on ${subscriptions.renewalDate}. This section now lives in its own frontend screen so your subscription and pricing logic is easy to find and extend.</p>
          <div class="sub-badges">
            <span class="enc-badge">${ICONS.credit} ${subscriptions.monthlyCost}/month</span>
            <span class="enc-badge">${ICONS.users} ${subscriptions.seatsUsed}/${subscriptions.seatsTotal} seats</span>
            <span class="enc-badge">${ICONS.activity} ${subscriptions.storageUsed} used</span>
          </div>
        </div>
        <div class="sub-metric">
          <div class="sub-metric-card"><strong>${subscriptions.seatsTotal}</strong><span>Total Seats</span></div>
          <div class="sub-metric-card"><strong>${subscriptions.storageLimit}</strong><span>Storage Limit</span></div>
          <div class="sub-metric-card"><strong>99.9%</strong><span>SLA Uptime</span></div>
          <div class="sub-metric-card"><strong>24/7</strong><span>Support Window</span></div>
        </div>
      </div>

      <div class="table-card" style="padding:1.5rem">
        <div class="config-section-title">${ICONS.map} Connected Layers</div>
        <div class="code-card">
          Frontend screen: <code>frontend/js/app.js</code><br>
          Frontend data: <code>frontend/js/data.js</code><br>
          Backend endpoint: <code>/api/subscriptions</code><br>
          Diagram docs: <code>docs/diagrams/architecture.md</code>
        </div>
      </div>
    </div>

    <div class="sub-plans">
      ${subscriptions.plans.map((plan) => `
        <article class="plan-card ${plan.featured ? "featured" : ""}">
          <div class="plan-name">${plan.name}</div>
          <div class="plan-price-row">
            <div><div class="plan-price">${plan.price}</div><div class="plan-cycle">${plan.cycle}</div></div>
            ${plan.featured ? `<span class="badge shared">Recommended</span>` : ""}
          </div>
          <p class="config-desc" style="font-size:13px;line-height:1.7">${plan.description}</p>
          <ul>
            ${plan.features.map((feature) => `<li class="sub-feature">${ICONS.check}<span>${feature}</span></li>`).join("")}
          </ul>
          <button class="btn ${plan.featured ? "btn-blue" : "btn-ghost"} subscription-action" data-plan="${plan.name}">${plan.cta}</button>
        </article>
      `).join("")}
    </div>

    <div class="sub-features-grid">
      <div class="feature-mini"><h4>Plan-aware uploads</h4><p class="config-desc">Users can see how storage and seats relate to the active subscription before uploading.</p></div>
      <div class="feature-mini"><h4>Billing visibility</h4><p class="config-desc">Renewal date and monthly cost are easy to find from the sidebar flow.</p></div>
      <div class="feature-mini"><h4>Backend ready</h4><p class="config-desc">The structure already includes a matching API route for future real billing integration.</p></div>
      <div class="feature-mini"><h4>Documentation ready</h4><p class="config-desc">The architecture diagram explains where subscription data belongs.</p></div>
    </div>
  `;

  document.getElementById("manage-plan").onclick = () => notify("Billing portal integration can be connected in backend/server.js");
  document.querySelectorAll(".subscription-action").forEach((button) => {
    button.onclick = () => notify(`Selected ${button.dataset.plan} plan`);
  });
}

function renderContact(target) {
  target.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Contact</div>
        <div class="page-sub">Talk with the SecureShare team about deployment, security, or support</div>
      </div>
      <div class="header-actions">
        <span class="enc-badge">${ICONS.lock} Secure channel</span>
      </div>
    </div>

    <section class="contact-layout">
      <aside class="contact-info">
        <span class="badge shared">Startup support desk</span>
        <h3>Let us help you launch with confidence.</h3>
        <p>Share your workspace goals, security requirements, or integration questions and our team will route your request to the right specialist.</p>

        <div class="contact-points">
          <div class="contact-point">
            <div class="contact-icon">${ICONS.mail}</div>
            <div>
              <strong>Email</strong>
              <span><a href="mailto:support@secureshare.io">support@secureshare.io</a></span>
            </div>
          </div>
          <div class="contact-point">
            <div class="contact-icon">${ICONS.users}</div>
            <div>
              <strong>Sales</strong>
              <span>Enterprise demos and team onboarding</span>
            </div>
          </div>
          <div class="contact-point">
            <div class="contact-icon">${ICONS.lock}</div>
            <div>
              <strong>Security</strong>
              <span>Encryption, compliance, and access policies</span>
            </div>
          </div>
        </div>
      </aside>

      <form class="contact-card" id="contact-form">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input class="form-input" id="contact-name" placeholder="Your name" value="${store.user.name}">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" id="contact-email" placeholder="you@company.com" value="${store.user.email}">
        </div>
        <div class="form-group">
          <label class="form-label">Topic</label>
          <select id="contact-topic">
            <option>Security consultation</option>
            <option>Billing and subscriptions</option>
            <option>Deployment support</option>
            <option>Product feedback</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Message</label>
          <textarea class="form-input contact-message" id="contact-message" placeholder="How can we help?"></textarea>
        </div>
        <button class="btn btn-blue contact-submit" type="submit">${ICONS.send} Send Message</button>
      </form>
    </section>
  `;

  document.getElementById("contact-form").onsubmit = (event) => {
    event.preventDefault();
    notify("Message sent to SecureShare support");
  };
}

function renderAdmin(target) {
  target.innerHTML = `
    <div class="page-header">
      <div><div class="page-title">User Management</div><div class="page-sub">Manage users, roles, and access permissions</div></div>
      <div class="header-actions"><button class="btn btn-blue" id="add-user">${ICONS.plus} Add User</button></div>
    </div>

    <div class="admin-stats">
      <div class="stat-card"><div class="stat-icon blue">${ICONS.users}</div><div><div class="stat-num">${store.users.length}</div><div class="stat-lbl">Total Users</div></div></div>
      <div class="stat-card"><div class="stat-icon green">${ICONS.check}</div><div><div class="stat-num">${store.users.filter((user) => user.status === "active").length}</div><div class="stat-lbl">Active</div></div></div>
      <div class="stat-card"><div class="stat-icon orange">${ICONS.warning}</div><div><div class="stat-num">${store.users.filter((user) => user.status === "suspended").length}</div><div class="stat-lbl">Suspended</div></div></div>
    </div>

    <div class="table-card">
      <div class="table-header"><div class="table-title">All Users</div><input class="search-input" id="user-search" placeholder="Search users..."></div>
      <table>
        <thead><tr><th>User</th><th>Role</th><th>Files</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
        <tbody>
          ${store.users.map((user) => `
            <tr>
              <td><div class="file-name"><div class="user-avatar">${user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div><div class="fname">${user.name}</div><div class="fsize">${user.email}</div></div></div></td>
              <td><span class="badge ${user.role === "Admin" ? "shared" : user.role === "Manager" ? "pending" : "active"}">${user.role}</span></td>
              <td style="font-family:var(--mono)">${user.files}</td>
              <td><span class="badge ${user.status === "active" ? "active" : "expired"}">${user.status}</span></td>
              <td class="fsize">${user.joined}</td>
              <td><div class="action-btns"><button class="btn btn-ghost btn-sm user-edit" data-id="${user.id}">${ICONS.eye} Edit</button><button class="btn btn-danger btn-sm user-del" data-id="${user.id}" ${user.id === 1 ? "disabled" : ""}>${ICONS.trash}</button></div></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById("add-user").onclick = () => {
    store.modal = { type: "adduser" };
    render();
  };

  document.querySelectorAll(".user-del").forEach((button) => {
    button.onclick = () => {
      const id = Number(button.dataset.id);
      store.users = store.users.filter((user) => user.id !== id);
      notify("User removed");
      render();
    };
  });

  document.querySelectorAll(".user-edit").forEach((button) => {
    button.onclick = () => notify(`Editor placeholder for user #${button.dataset.id}`);
  });

  document.getElementById("user-search").oninput = (event) => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  };
}

function renderConfig(target) {
  const versions = [
    { v: "v2.4.1", current: true, date: "2026-04-20", changes: "AES-256 upgrade, rate limiting improvements" },
    { v: "v2.3.0", current: false, date: "2026-03-15", changes: "Two-factor auth and expiring link UI" },
    { v: "v2.2.1", current: false, date: "2026-02-01", changes: "Bug fixes and performance optimizations" }
  ];

  target.innerHTML = `
    <div class="page-header">
      <div><div class="page-title">Configuration & Version Control</div><div class="page-sub">System settings, security policies, and release history</div></div>
      <div class="header-actions"><button class="btn btn-blue" id="save-config">${ICONS.check} Save Changes</button></div>
    </div>

    <div class="config-grid">
      <div style="display:grid;gap:1.25rem">
        <div class="config-card">
          <div class="config-section-title">${ICONS.lock} Security Settings</div>
          ${Object.entries({
            encryption: "End-to-End Encryption",
            twoFactor: "Two-Factor Authentication",
            autoExpire: "Auto-Expire Shared Links",
            rateLimiting: "API Rate Limiting",
            geoBlocking: "Geo-Blocking"
          }).map(([key, label]) => `<div class="config-row"><div class="config-key">${label}</div><div class="toggle ${store.configs[key] ? "on" : ""}" data-cfg="${key}"></div></div>`).join("")}
        </div>

        <div class="config-card">
          <div class="config-section-title">${ICONS.settings} System Settings</div>
          ${Object.entries({
            emailNotify: "Email Notifications",
            logging: "Audit Logging",
            backups: "Automatic Backups"
          }).map(([key, label]) => `<div class="config-row"><div class="config-key">${label}</div><div class="toggle ${store.configs[key] ? "on" : ""}" data-cfg="${key}"></div></div>`).join("")}
        </div>
      </div>

      <div>
        <div class="config-card">
          <div class="config-section-title">${ICONS.git} Version Control History</div>
          <div class="version-timeline">
            ${versions.map((version) => `<div class="version-item"><div class="v-dot ${version.current ? "current" : ""}"></div><div><div class="v-label">${version.v}</div><div class="v-date">${version.date}</div><div class="v-changes">${version.changes}</div></div></div>`).join("")}
          </div>
        </div>

        <div class="config-card" style="margin-top:1.25rem">
          <div class="config-section-title">${ICONS.map} Project Separation</div>
          <div class="sub-feature">${ICONS.check}<span>Frontend UI modules in <code>frontend/js/</code></span></div>
          <div class="sub-feature" style="margin-top:.75rem">${ICONS.check}<span>Styles isolated in <code>frontend/css/styles.css</code></span></div>
          <div class="sub-feature" style="margin-top:.75rem">${ICONS.check}<span>Backend mock API in <code>backend/server.js</code></span></div>
          <div class="sub-feature" style="margin-top:.75rem">${ICONS.check}<span>Diagrams documented in <code>docs/diagrams/architecture.md</code></span></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("save-config").onclick = () => notify("Settings saved");
  document.querySelectorAll(".toggle[data-cfg]").forEach((toggle) => {
    toggle.onclick = () => {
      const key = toggle.dataset.cfg;
      store.configs[key] = !store.configs[key];
      toggle.classList.toggle("on", store.configs[key]);
    };
  });
}

function renderRequirements(target) {
  const requirements = [
    { id: "REQ-001", title: "User Authentication", progress: 100, status: "done", priority: "Critical", sprint: "Sprint 1" },
    { id: "REQ-002", title: "AES-256 File Encryption", progress: 100, status: "done", priority: "Critical", sprint: "Sprint 1" },
    { id: "REQ-003", title: "File Upload/Download", progress: 100, status: "done", priority: "High", sprint: "Sprint 2" },
    { id: "REQ-004", title: "Access Control", progress: 85, status: "partial", priority: "High", sprint: "Sprint 2" },
    { id: "REQ-005", title: "Expiring Share Links", progress: 90, status: "partial", priority: "Medium", sprint: "Sprint 3" },
    { id: "REQ-006", title: "Subscription Management", progress: 95, status: "partial", priority: "High", sprint: "Sprint 3" }
  ];

  target.innerHTML = `
    <div class="page-header">
      <div><div class="page-title">Requirements Map & Monitoring</div><div class="page-sub">Track delivery areas and see where frontend, backend, and docs are separated</div></div>
      <div class="header-actions">
        <span style="color:var(--success)">Complete</span>
        <span style="color:var(--warning)">In Progress</span>
        <span style="color:var(--danger)">Planned</span>
      </div>
    </div>

    <div class="req-grid">
      ${requirements.map((item) => `<div class="req-card"><div class="req-id">${item.id} | ${item.sprint}</div><div class="req-title">${item.title}</div><div class="req-status-bar"><div class="req-fill ${item.status === "done" ? "fill-done" : "fill-partial"}" style="width:${item.progress}%"></div></div><div class="req-meta"><span class="badge ${item.status === "done" ? "active" : "pending"}">${item.status === "done" ? "Complete" : "In Progress"}</span><span>${item.priority}</span><span>${item.progress}%</span></div></div>`).join("")}
    </div>

    <div class="charts-grid">
      <div class="chart-card"><div class="chart-title">Requirements by Priority</div><div class="chart-wrap"><canvas id="c-req-priority"></canvas></div></div>
      <div class="chart-card"><div class="chart-title">Sprint Progress Overview</div><div class="chart-wrap"><canvas id="c-sprint"></canvas></div></div>
    </div>
  `;

  renderRequirementsCharts();
}

function renderAnalytics(target) {
  target.innerHTML = `
    <div class="page-header">
      <div><div class="page-title">KPIs, Burn Down & Velocity</div><div class="page-sub">Automated dashboards and project health metrics</div></div>
      <div class="header-actions"><button class="btn btn-ghost" id="export-pdf">${ICONS.download} Export PDF</button></div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card blue"><div class="kpi-icon">${ICONS.file}</div><div class="kpi-label">Total Uploads</div><div class="kpi-value">2,481</div><div class="kpi-change up">Target: 2,000</div></div>
      <div class="kpi-card green"><div class="kpi-icon">${ICONS.users}</div><div class="kpi-label">Daily Active Users</div><div class="kpi-value">348</div><div class="kpi-change up">89% retention</div></div>
      <div class="kpi-card yellow"><div class="kpi-icon">${ICONS.activity}</div><div class="kpi-label">Avg Sprint Velocity</div><div class="kpi-value">42 pts</div><div class="kpi-change up">Sprint 4 record</div></div>
      <div class="kpi-card red"><div class="kpi-icon">${ICONS.warning}</div><div class="kpi-label">Security Incidents</div><div class="kpi-value">0</div><div class="kpi-change up">Clean record</div></div>
    </div>

    <div class="charts-grid">
      <div class="chart-card wide"><div class="chart-title">Burn Down Chart <span class="chart-sub">Ideal vs actual</span></div><div class="bd-legend"><div class="bd-leg-item"><div class="bd-leg-dot" style="background:#00c6ff"></div>Ideal Burn</div><div class="bd-leg-item"><div class="bd-leg-dot" style="background:#f59e0b"></div>Actual Burn</div></div><div class="chart-wrap tall"><canvas id="c-burndown"></canvas></div></div>
      <div class="chart-card"><div class="chart-title">Velocity Chart</div><div class="chart-wrap tall"><canvas id="c-velocity"></canvas></div></div>
      <div class="chart-card"><div class="chart-title">User Growth</div><div class="chart-wrap tall"><canvas id="c-users"></canvas></div></div>
    </div>

    <div class="charts-grid">
      <div class="chart-card"><div class="chart-title">Download Trends</div><div class="chart-wrap"><canvas id="c-dl"></canvas></div></div>
      <div class="chart-card"><div class="chart-title">Storage Growth</div><div class="chart-wrap"><canvas id="c-stor-growth"></canvas></div></div>
    </div>
  `;

  document.getElementById("export-pdf").onclick = () => notify("PDF export can be added from analytics backend later");
  renderAnalyticsCharts();
}

function renderModal() {
  const modal = store.modal;

  if (modal.type === "share") {
    return `<div class="modal-overlay" id="modal-overlay"><div class="modal"><div class="modal-header"><div class="modal-title">Share File</div><button class="modal-close" id="modal-close">${ICONS.x}</button></div><div class="modal-body"><div class="config-key" style="margin-bottom:.5rem">Secure Share Link</div><div class="link-box">${modal.file.link}<button class="btn btn-ghost btn-sm" id="copy-link">${ICONS.copy}</button></div></div><div class="modal-footer"><button class="btn btn-ghost" id="modal-close2">Cancel</button><button class="btn btn-blue" id="send-link">Send Link</button></div></div></div>`;
  }

  if (modal.type === "adduser") {
    return `<div class="modal-overlay" id="modal-overlay"><div class="modal"><div class="modal-header"><div class="modal-title">Add New User</div><button class="modal-close" id="modal-close">${ICONS.x}</button></div><div class="modal-body"><div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="new-name" placeholder="Full name"></div><div class="form-group"><label class="form-label">Email</label><input class="form-input" id="new-email" placeholder="user@company.com"></div><div class="form-group"><label class="form-label">Role</label><select id="new-role"><option>User</option><option>Manager</option><option>Admin</option></select></div></div><div class="modal-footer"><button class="btn btn-ghost" id="modal-close2">Cancel</button><button class="btn btn-blue" id="save-user">Add User</button></div></div></div>`;
  }

  return "";
}

function wireModal() {
  ["modal-close", "modal-close2", "modal-overlay"].forEach((id) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.onclick = (event) => {
      if (id !== "modal-overlay" || event.target === element) {
        store.modal = null;
        render();
      }
    };
  });

  const copyButton = document.getElementById("copy-link");
  if (copyButton) copyButton.onclick = () => notify("Link copied to clipboard");

  const sendButton = document.getElementById("send-link");
  if (sendButton) {
    sendButton.onclick = () => {
      store.modal = null;
      notify("Secure link sent");
      render();
    };
  }

  const saveUser = document.getElementById("save-user");
  if (saveUser) {
    saveUser.onclick = () => {
      const name = document.getElementById("new-name").value || "New User";
      const email = document.getElementById("new-email").value || "user@secureshare.io";
      const role = document.getElementById("new-role").value;

      store.users.push({
        id: Date.now(),
        name,
        email,
        role,
        status: "active",
        files: 0,
        joined: new Date().toISOString().slice(0, 10)
      });

      store.modal = null;
      notify("User added successfully");
      render();
    };
  }
}

function wireFileActions() {
  document.querySelectorAll(".file-action").forEach((button) => {
    button.onclick = () => {
      const id = Number(button.dataset.id);
      const action = button.dataset.action;
      const file = store.files.find((item) => item.id === id);

      if (!file) return;

      if (action === "delete") {
        store.files = store.files.filter((item) => item.id !== id);
        notify("File deleted");
        render();
      }

      if (action === "share") {
        store.modal = { type: "share", file };
        render();
      }

      if (action === "view") {
        file.downloads += 1;
        notify(`Downloading ${file.name}...`);
        render();
      }
    };
  });
}

function handleUpload(file) {
  if (!file) return;

  store.uploading = true;
  store.uploadProgress = 0;
  render();

  let progress = 0;
  const timer = window.setInterval(() => {
    progress += Math.random() * 8 + 3;

    if (progress >= 100) {
      window.clearInterval(timer);
      store.uploading = false;

      const extension = file.name.split(".").pop() || "txt";
      const fileSize = file.size ? (file.size / 1048576).toFixed(1) : "0.2";

      store.files.unshift({
        id: Date.now(),
        name: file.name,
        type: extension,
        size: `${fileSize} MB`,
        owner: store.user.name,
        status: "active",
        encrypted: true,
        downloads: 0,
        expiry: "2026-12-31",
        uploadedAt: new Date().toISOString().slice(0, 10),
        link: `https://ss.io/s/${Math.random().toString(36).slice(2, 9)}`
      });

      notify(`${file.name} uploaded and encrypted`);
      store.page = "files";
      render();
      return;
    }

    store.uploadProgress = Math.min(progress, 99);
    const fill = document.querySelector(".progress-fill");
    if (fill) fill.style.width = `${store.uploadProgress}%`;
  }, 80);
}

function doAuth() {
  const email = document.getElementById("auth-email")?.value || "";
  const name = document.getElementById("auth-name")?.value || "Layla Hassan";

  if (!email) {
    notify("Please enter your email", "warning");
    return;
  }

  store.user = {
    id: 1,
    name: store.authMode === "register" ? name : "Layla Hassan",
    email,
    role: "Admin"
  };

  store.page = "dashboard";
  render();
  notify(`Welcome back, ${store.user.name}`);
}

function render() {
  destroyCharts();

  if (!store.user) {
    renderAuth();
    return;
  }

  renderAppShell();
}

initBackground();
loadBootstrap().finally(() => {
  render();
});
