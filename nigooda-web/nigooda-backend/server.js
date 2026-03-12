require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");
const XLSX = require("xlsx");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "data", "products.json");
console.log("Using DATA_FILE:", DATA_FILE);

/* =========================
   HELPERS
========================= */
function readProducts() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading products.json:", err);
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf8");
}

function cleanString(value) {
  return String(value || "").trim();
}

function cleanNumber(value) {
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}

/* ============================================================
   🔵 FRONTEND API → PRODUCTS FOR SITE
============================================================ */
app.get("/products", (req, res) => {
  const data = readProducts();

  const visibleProducts = data.filter((p) => {
    const isLive =
      cleanString(p.Status).toLowerCase() === "live";

    const isInDiscover =
      p.isNewLaunch ||
      p.isBestForDailyUse ||
      p.isTrending ||
      p.isUnderrated;

    return isLive || isInDiscover;
  });

  res.json(visibleProducts);
});

/* ============================================================
   🟢 ADMIN API → ALL PRODUCTS
============================================================ */
app.get("/admin/products", (req, res) => {
  res.json(readProducts());
});

/* ============================================================
   🔁 UPLOAD EXCEL (STRICT + SAFE)
============================================================ */
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const category = cleanString(req.body.category);

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const existing = readProducts();

    const PREFIX_MAP = {
      Food: "f",
      Drinks: "d",
      "Personal Care": "pc",
      Women: "w",
      Men: "m",
      Pets: "pet",
      Kids: "k",
      "Toys & Learning": "t",
      "Baby Care": "b",
      "Fitness & Wellness": "fw",
      "Home, Decor & Kitchen": "h",
      "Electronics & Smart Products": "es",
    };

    const prefix = PREFIX_MAP[category];
    if (!prefix) {
      return res.status(400).json({ error: "Invalid category" });
    }

    let maxIndex = existing
      .filter((p) => cleanString(p.id).startsWith(prefix))
      .map((p) =>
        parseInt(cleanString(p.id).replace(prefix, ""), 10)
      )
      .filter((n) => !isNaN(n))
      .reduce((max, n) => Math.max(max, n), 0);

    const map = {};
    existing.forEach((p) => {
      map[cleanString(p.id)] = p;
    });

    let addedCount = 0;

    rows.forEach((row) => {
      maxIndex += 1;
      const id = `${prefix}${maxIndex}`;

      map[id] = {
        id,
        Brand: cleanString(row.Brand),
        "Name of Product": cleanString(row["Name of Product"]),
        "Main Image URL": cleanString(row["Main Image URL"]),
        "Primary Category": category,
        "Sub-Category": cleanString(row["Sub-Category"]),
        Price: cleanNumber(row.Price) || 0,
        "Weight / Size": cleanString(row["Weight / Size"]),
        "Short Description": cleanString(row["Short Description"]),
        "Seller Website": cleanString(row["Seller Website"]),
        "Variant Group ID": cleanString(row["Variant Group ID"]),
        "Variant Name": cleanString(row["Variant Name"]),
        Tags: cleanString(row.Tags),
        Status: cleanString(row.Status) || "Draft",
        homeSections: [],
        isNewLaunch: false,
        isBestForDailyUse: false,
        isTrending: false,
        isUnderrated: false,
        "Subcategory Sample Rank": cleanNumber(
          row["Subcategory Sample Rank"]
        ),
      };

      addedCount++;
    });

    writeProducts(Object.values(map));

    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      added: addedCount,
      totalProducts: Object.keys(map).length,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "Upload failed" });
  }
});

/* ============================================================
   DOWNLOAD PRODUCTS EXCEL
============================================================ */
app.get("/download-products", (req, res) => {
  try {
    const productsPath = path.join(__dirname, "data", "products.json");
    const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const filePath = path.join(__dirname, "products.xlsx");

    XLSX.writeFile(workbook, filePath);

    res.download(filePath, "products.xlsx");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating Excel file");
  }
});

/* ============================================================
   UPDATE HOME SECTION
============================================================ */
app.post("/products/:id/update-home-section", (req, res) => {
  const { id } = req.params;
  const { sectionKey, action } = req.body;

  const products = readProducts();
  const product = products.find(
    (p) => cleanString(p.id) === cleanString(id)
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!Array.isArray(product.homeSections)) {
    product.homeSections = [];
  }

  if (action === "add" && !product.homeSections.includes(sectionKey)) {
    product.homeSections.push(sectionKey);
  }

  if (action === "remove") {
    product.homeSections = product.homeSections.filter(
      (s) => s !== sectionKey
    );
  }

  product.isNewLaunch = product.homeSections.includes("new-launch");
  product.isBestForDailyUse = product.homeSections.includes("daily-use");
  product.isTrending = product.homeSections.includes("trending");
  product.isUnderrated = product.homeSections.includes("underrated");

  writeProducts(products);
  res.json({ success: true });
});

/* ============================================================
   UPDATE SINGLE PRODUCT
============================================================ */
app.post("/products/:id/update", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const products = readProducts();
  const index = products.findIndex(
    (p) => cleanString(p.id) === cleanString(id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index] = {
    ...products[index],
    ...updates,
  };

  writeProducts(products);
  res.json({ success: true });
});

/* ============================================================
   BULK UPDATE
============================================================ */
app.post("/products/bulk-update", (req, res) => {
  const updatedProducts = req.body;

  if (!Array.isArray(updatedProducts)) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const existing = readProducts();
  const map = {};

  existing.forEach((p) => {
    map[cleanString(p.id)] = p;
  });

  updatedProducts.forEach((incoming) => {
    const id = cleanString(incoming.id);
    if (!map[id]) return;

    map[id] = {
      ...map[id],
      ...incoming,
    };
  });

  writeProducts(Object.values(map));
  res.json({ success: true });
});

/* ============================================================
   DELETE SINGLE
============================================================ */
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const products = readProducts();
  const remaining = products.filter(
    (p) => cleanString(p.id) !== cleanString(id)
  );

  writeProducts(remaining);
  res.json({ success: true });
});

/* ============================================================
   BULK DELETE
============================================================ */
app.post("/products/bulk-delete", (req, res) => {
  const ids = (req.body.ids || []).map(cleanString);

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "ids array required" });
  }

  const products = readProducts();
  const remaining = products.filter(
    (p) => !ids.includes(cleanString(p.id))
  );

  writeProducts(remaining);

  res.json({
    success: true,
    deletedCount: products.length - remaining.length,
  });
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});