let chartRefs = [];

function makeTextColor() {
  return "rgba(255,255,255,.4)";
}

function destroyCharts() {
  chartRefs.forEach((chart) => chart.destroy());
  chartRefs = [];
}

function register(chart) {
  chartRefs.push(chart);
}

function renderDashboardCharts() {
  const activity = document.getElementById("c-activity");
  const storage = document.getElementById("c-storage");
  const security = document.getElementById("c-security");
  if (!activity || !window.Chart) return;

  const labels = [];
  for (let i = 29; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString("en", { month: "short", day: "numeric" }));
  }

  register(new Chart(activity, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Uploads", data: labels.map(() => Math.floor(Math.random() * 80 + 20)), borderColor: "#1a6cf6", backgroundColor: "rgba(26,108,246,.1)", tension: 0.4, fill: true, pointRadius: 0 },
        { label: "Downloads", data: labels.map(() => Math.floor(Math.random() * 120 + 40)), borderColor: "#00c6ff", backgroundColor: "rgba(0,198,255,.06)", tension: 0.4, fill: true, pointRadius: 0 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor(), maxTicksLimit: 7 } },
        y: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));

  register(new Chart(storage, {
    type: "doughnut",
    data: {
      labels: ["Documents", "Images", "Videos", "Archives", "Other"],
      datasets: [{ data: [38, 24, 18, 12, 8], backgroundColor: ["#1a6cf6", "#10d48e", "#f59e0b", "#f43f5e", "#8b5cf6"], borderWidth: 0 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: { legend: { position: "right", labels: { color: "rgba(255,255,255,.7)", boxWidth: 10 } } }
    }
  }));

  register(new Chart(security, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        { label: "Blocked", data: [12, 8, 15, 6, 20, 3, 9], backgroundColor: "rgba(244,63,94,.7)", borderRadius: 4 },
        { label: "Warnings", data: [5, 12, 8, 14, 7, 2, 11], backgroundColor: "rgba(245,158,11,.7)", borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "rgba(255,255,255,.6)", boxWidth: 10 } } },
      scales: {
        x: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } },
        y: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));
}

function renderRequirementsCharts() {
  const priority = document.getElementById("c-req-priority");
  const sprint = document.getElementById("c-sprint");
  if (!priority || !window.Chart) return;

  register(new Chart(priority, {
    type: "doughnut",
    data: {
      labels: ["Critical", "High", "Medium", "Low"],
      datasets: [{ data: [3, 4, 4, 1], backgroundColor: ["#f43f5e", "#f59e0b", "#1a6cf6", "#10d48e"], borderWidth: 0 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: { legend: { labels: { color: "rgba(255,255,255,.7)", boxWidth: 10 } } }
    }
  }));

  register(new Chart(sprint, {
    type: "bar",
    data: {
      labels: ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4", "Sprint 5", "Sprint 6"],
      datasets: [
        { label: "Completed", data: [100, 92, 82, 50, 0, 0], backgroundColor: "rgba(16,212,142,.7)", borderRadius: 4 },
        { label: "Remaining", data: [0, 8, 18, 50, 100, 100], backgroundColor: "rgba(255,255,255,.1)", borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "rgba(255,255,255,.6)", boxWidth: 10 } } },
      scales: {
        x: { stacked: true, grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } },
        y: { stacked: true, grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));
}

function renderAnalyticsCharts() {
  const burn = document.getElementById("c-burndown");
  const velocity = document.getElementById("c-velocity");
  const users = document.getElementById("c-users");
  const downloads = document.getElementById("c-dl");
  const storage = document.getElementById("c-stor-growth");
  if (!burn || !window.Chart) return;

  register(new Chart(burn, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 5", "Day 10", "Day 15", "Day 20", "Day 25", "Day 30", "Day 35", "Day 40"],
      datasets: [
        { label: "Ideal", data: [200, 178, 156, 133, 111, 89, 67, 44, 22], borderColor: "#00c6ff", tension: 0.4, borderDash: [6, 3], pointRadius: 0 },
        { label: "Actual", data: [200, 185, 162, 148, 120, 95, 72, 55, 38], borderColor: "#f59e0b", backgroundColor: "rgba(245,158,11,.08)", tension: 0.4, fill: true, pointRadius: 3 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } },
        y: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));

  const velocityData = [28, 35, 42, 38, 46, 40, 44, 42];
  const avg = Math.round(velocityData.reduce((sum, value) => sum + value, 0) / velocityData.length);
  register(new Chart(velocity, {
    type: "bar",
    data: {
      labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
      datasets: [
        { label: "Velocity", data: velocityData, backgroundColor: velocityData.map((value) => value === 46 ? "#1a6cf6" : "rgba(26,108,246,.5)"), borderRadius: 6 },
        { label: "Average", data: velocityData.map(() => avg), type: "line", borderColor: "#f59e0b", borderDash: [4, 2], pointRadius: 0 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "rgba(255,255,255,.6)", boxWidth: 10 } } },
      scales: {
        x: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } },
        y: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));

  register(new Chart(users, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [80, 145, 212, 280, 320, 348], borderColor: "#10d48e", backgroundColor: "rgba(16,212,142,.1)", tension: 0.4, fill: true, pointRadius: 4 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } },
        y: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));

  register(new Chart(downloads, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{ data: [820, 1039, 950, 1200, 880, 340, 210], backgroundColor: "rgba(26,108,246,.6)", borderRadius: 4 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: makeTextColor() } },
        y: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));

  register(new Chart(storage, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [12, 24, 41, 58, 71, 84], borderColor: "#f59e0b", backgroundColor: "rgba(245,158,11,.08)", tension: 0.4, fill: true, pointRadius: 3 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: makeTextColor() } },
        y: { grid: { color: "rgba(255,255,255,.05)" }, ticks: { color: makeTextColor() } }
      }
    }
  }));
}

window.SecureShareCharts = {
  destroyCharts,
  renderDashboardCharts,
  renderRequirementsCharts,
  renderAnalyticsCharts
};
