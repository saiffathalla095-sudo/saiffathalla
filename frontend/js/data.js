function getFallbackData() {
  return {
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
      { id: 2, name: "Omar Khalid", email: "omar@secureshare.io", role: "User", status: "active", files: 12, joined: "2024-02-14" },
      { id: 3, name: "Nour El-Din", email: "nour@secureshare.io", role: "User", status: "suspended", files: 5, joined: "2024-03-01" },
      { id: 4, name: "Ahmed Tamer", email: "ahmed@secureshare.io", role: "Manager", status: "active", files: 38, joined: "2024-01-25" }
    ],
    files: [
      { id: 1, name: "Q4_Financial_Report.pdf", type: "pdf", size: "4.2 MB", owner: "Layla Hassan", status: "shared", encrypted: true, downloads: 14, expiry: "2026-12-31", uploadedAt: "2026-04-10", link: "https://ss.io/s/7f3k91a" },
      { id: 2, name: "Product_Roadmap_2026.docx", type: "doc", size: "1.8 MB", owner: "Ahmed Tamer", status: "active", encrypted: true, downloads: 7, expiry: "2026-09-01", uploadedAt: "2026-04-12", link: "https://ss.io/s/2mx4r7b" },
      { id: 3, name: "Team_Photo_2026.jpg", type: "img", size: "8.1 MB", owner: "Omar Khalid", status: "expired", encrypted: false, downloads: 32, expiry: "2026-03-01", uploadedAt: "2026-02-01", link: "https://ss.io/s/expired" },
      { id: 4, name: "Source_Code_v2.zip", type: "zip", size: "22.5 MB", owner: "Layla Hassan", status: "active", encrypted: true, downloads: 3, expiry: "2026-08-15", uploadedAt: "2026-04-18", link: "https://ss.io/s/9nq2z0c" },
      { id: 5, name: "README.txt", type: "txt", size: "12 KB", owner: "Nour El-Din", status: "active", encrypted: false, downloads: 1, expiry: "2026-06-01", uploadedAt: "2026-04-20", link: "https://ss.io/s/readme01" }
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
}

window.SecureShareData = {
  getFallbackData
};
