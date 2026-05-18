const http = require("http");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const port = process.env.PORT || 3000;

const bootstrapData = {
  user: null,
  page: "auth",
  authMode: "login",
  modal: null,
  searchQ: "",
  statusFilter: "",
  uploading: false,
  uploadProgress: 0,
  users: [
    { id: 1, name: "Layla Hassan", email: "layla@secureshare.io", role: "Admin", status: "active", files: 24, joined: "2024-01-10" },
    { id: 2, name: "Omar Khalid", email: "omar@secureshare.io", role: "User", status: "active", files: 12, joined: "2024-02-14" }
  ],
  files: [
    { id: 1, name: "Q4_Financial_Report.pdf", type: "pdf", size: "4.2 MB", owner: "Layla Hassan", status: "shared", encrypted: true, downloads: 14, expiry: "2026-12-31", uploadedAt: "2026-04-10", link: "https://ss.io/s/7f3k91a" },
    { id: 2, name: "Product_Roadmap_2026.docx", type: "doc", size: "1.8 MB", owner: "Ahmed Tamer", status: "active", encrypted: true, downloads: 7, expiry: "2026-09-01", uploadedAt: "2026-04-12", link: "https://ss.io/s/2mx4r7b" }
  ],
  subscriptions: {
    currentPlan: "Business",
    status: "Active",
    renewalDate: "2026-05-30",
    monthlyCost: "$79",
    seatsUsed: 38,
    seatsTotal: 50,
    storageUsed: "84.2 GB",
    storageLimit: "250 GB",
    plans: [
      { id: "starter", name: "Starter", price: "$0", cycle: "/month", description: "For small personal sharing needs.", features: ["5 GB secure storage", "Basic file sharing", "Email support"], cta: "Start Free" },
      { id: "pro", name: "Pro", price: "$19", cycle: "/month", description: "For professionals working with protected files daily.", features: ["100 GB secure storage", "Encrypted share links", "Priority support"], cta: "Upgrade to Pro" },
      { id: "business", name: "Business", price: "$79", cycle: "/month", description: "For teams that need policy control and oversight.", features: ["250 GB storage", "50 managed seats", "Admin analytics and audit logs"], cta: "Current Plan", featured: true }
    ]
  },
  configs: {
    encryption: true,
    twoFactor: true,
    autoExpire: true,
    emailNotify: false,
    logging: true,
    backups: true,
    rateLimiting: true,
    geoBlocking: false
  }
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".md": "text/markdown; charset=utf-8"
};

function sendJson(response, payload) {
  response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function serveFile(filePath, response) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, { "Content-Type": mimeTypes[extension] || "application/octet-stream" });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (requestUrl.pathname === "/api/bootstrap") {
    sendJson(response, bootstrapData);
    return;
  }

  if (requestUrl.pathname === "/api/subscriptions") {
    sendJson(response, bootstrapData.subscriptions);
    return;
  }

  const normalizedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = path.join(rootDir, normalizedPath);

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  serveFile(filePath, response);
});

server.listen(port, () => {
  console.log(`SecureShare server running at http://localhost:${port}`);
});
