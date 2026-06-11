require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");
const XLSX = require("xlsx");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const app = express();

const analyzeFood =
require("./routes/food/analyzeFood");



const analyzeFaceWashRoute =
require("./routes/analyzeFaceWash");
const analyzeMoisturizer =
require("./routes/analyzeMoisturizer");
const analyzeSunscreen =
require("./routes/analyzeSunscreen");
const analyzeToner =
require("./routes/analyzeToner");
const analyzeSerum =
require("./routes/analyzeSerum");
const analyzeDayCream =
require("./routes/analyzeDayCream");
const analyzeNightCream =
require("./routes/analyzeNightCream");
const analyzeEyeCream =
require("./routes/analyzeEyeCream");
const analyzeLipBalm =
require("./routes/analyzeLipBalm");
const analyzeFaceMask =
require("./routes/analyzeFaceMask");
const shampooRoutes =
require("./routes/shampooRoutes");
const conditionerRoutes =
require("./routes/conditionerRoutes");


const hairColorDyeRoutes =
require("./routes/hairColorDyeRoutes");
const hairStylingProductRoutes =
require("./routes/hairStylingProductRoutes");
const hairOilRoutes =
require("./routes/hairOilRoutes");
const hairMaskRoutes =
require("./routes/hairMaskRoutes");
const beardGrowthSerumRoutes =
require("./routes/beardGrowthSerumRoutes");
const soapBodyWashRoutes =
require("./routes/soapBodyWashRoutes");
const bodyLotionRoutes =
require("./routes/bodyLotionRoutes");
const hairSerumRoutes = require("./routes/hairSerumRoutes");
const bodyScrubRoutes = require("./routes/bodyScrubRoutes");
const bodyPowderRoutes = require("./routes/bodyPowderRoutes");
const deodorantAntiperspirantRoutes = require("./routes/deodorantAntiperspirantRoutes");
const toothpasteToothPowderRoutes = require("./routes/toothpasteToothPowderRoutes");
const mouthwashRoutes = require("./routes/mouthwashRoutes");
const teethWhiteningProductRoutes = require("./routes/teethWhiteningProductRoutes");
const gumCareProductRoutes = require("./routes/gumCareProductRoutes");
const handWashRoutes = require("./routes/handWashRoutes");
const handSanitizerRoutes = require("./routes/handSanitizerRoutes");
const intimateWashRoutes = require("./routes/intimateWashRoutes");
const footCareRoutes = require("./routes/footCareRoutes");
const antisepticLiquidRoutes = require("./routes/antisepticLiquidRoutes");
const hygieneWipesRoutes = require("./routes/hygieneWipesRoutes");
const babyWashSoapRoutes = require("./routes/babyWashSoapRoutes");
const babyShampooRoutes = require("./routes/babyShampooRoutes");
const babyLotionRoutes = require("./routes/babyLotionRoutes");
const babyOilRoutes = require("./routes/babyOilRoutes");
const babyPowderRoutes = require("./routes/babyPowderRoutes");
const babySunscreenRoutes = require("./routes/babySunscreenRoutes");
const babyWipesRoutes = require("./routes/babyWipesRoutes");
const dishwashCleanerRoutes = require("./routes/dishwashCleanerRoutes");
const laundrySoapRoutes = require("./routes/laundrySoapRoutes");
const laundryLiquidPowderRoutes = require("./routes/laundryLiquidPowderRoutes");
const floorCleanerRoutes = require("./routes/floorCleanerRoutes");
const bathroomToiletCleanerRoutes = require("./routes/bathroomToiletCleanerRoutes");
const mosquitoRepellentRoutes = require("./routes/mosquitoRepellentRoutes");
const insectSprayRoutes = require("./routes/insectSprayRoutes");
const airFreshenerRoutes = require("./routes/airFreshenerRoutes");
const petShampooRoutes = require("./routes/petShampooRoutes");
const petSoapRoutes = require("./routes/petSoapRoutes");
const petDentalGelRoutes = require("./routes/petDentalGelRoutes");
const tickFleaTreatmentRoutes = require("./routes/tickFleaTreatmentRoutes");
const petDeodorantRoutes = require("./routes/petDeodorantRoutes");
const petGroomingSprayRoutes = require("./routes/petGroomingSprayRoutes");
























app.use(cors());

app.use(express.json({
  limit: "50mb"
}));

app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));


app.use(
  "/api",
  analyzeFaceWashRoute
);
app.use(
  "/api",
  analyzeMoisturizer
);
app.use(
  "/api",
  analyzeSunscreen
);
app.use(
  "/api",
  analyzeToner
);
app.use(
  "/api",
  analyzeSerum
);
app.use(
"/api",
analyzeDayCream
);
app.use(
"/api",
analyzeNightCream
);
app.use(
"/api",
analyzeEyeCream
);
app.use(
"/api",
analyzeLipBalm
);
app.use(
"/api",
analyzeFaceMask
);
app.use("/api",
analyzeFood);
app.use(
  "/api",
  shampooRoutes
);
app.use(
  "/api",
  conditionerRoutes
);



app.use(
  "/api",
  hairColorDyeRoutes
);
app.use(
  "/api",
  hairStylingProductRoutes
);

app.use(
  "/api",
  hairOilRoutes
);

app.use(
  "/api",
  hairMaskRoutes
);
app.use(
  "/api",
  beardGrowthSerumRoutes
);

app.use(
  "/api",
  soapBodyWashRoutes
);
app.use(
  "/api",
  bodyLotionRoutes
);  
app.use("/api", hairSerumRoutes);
app.use("/api", bodyScrubRoutes);
app.use("/api", bodyPowderRoutes);
app.use("/api", deodorantAntiperspirantRoutes);
app.use("/api", toothpasteToothPowderRoutes);
app.use("/api", mouthwashRoutes);
app.use("/api", teethWhiteningProductRoutes);
app.use("/api", gumCareProductRoutes);
app.use("/api", handWashRoutes);
app.use("/api", handSanitizerRoutes);
app.use("/api", intimateWashRoutes);
app.use("/api", footCareRoutes);
app.use("/api", antisepticLiquidRoutes);
app.use("/api", hygieneWipesRoutes);
app.use("/api", babyWashSoapRoutes);
app.use("/api", babyShampooRoutes);
app.use("/api", babyLotionRoutes);
app.use("/api", babyOilRoutes);
app.use("/api", babyPowderRoutes);
app.use("/api", babySunscreenRoutes);
app.use("/api", babyWipesRoutes);
app.use("/api", dishwashCleanerRoutes);
app.use("/api", laundrySoapRoutes);
app.use("/api", laundryLiquidPowderRoutes);
app.use("/api", floorCleanerRoutes);
app.use("/api", bathroomToiletCleanerRoutes);
app.use("/api", mosquitoRepellentRoutes);
app.use("/api", insectSprayRoutes);
app.use("/api", airFreshenerRoutes);
app.use("/api", petShampooRoutes);
app.use("/api", petSoapRoutes);
app.use("/api", petDentalGelRoutes);
app.use("/api", tickFleaTreatmentRoutes);
app.use("/api", petDeodorantRoutes);
app.use("/api", petGroomingSprayRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

/* =========================
   EXISTING CODE CONTINUES
========================= */

const upload = multer({ dest: "uploads/" });
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "data", "products.json");
console.log("Using DATA_FILE:", DATA_FILE);

/* =========================
   HELPERS
========================= */
/* ============================================================
   🧠 PRODUCT ANALYSIS (HASH BASED)
============================================================ */

const ANALYSIS_FILE = path.join(
  __dirname,
  "data",
  "productAnalysisDB.json"
);

/* READ ANALYSIS */

function readAnalysis() {
  try {
    if (!fs.existsSync(ANALYSIS_FILE)) return [];

    const raw = fs.readFileSync(
      ANALYSIS_FILE,
      "utf8"
    );

    return raw ? JSON.parse(raw) : [];

  } catch (err) {

    console.error(
      "Error reading productAnalysisDB:",
      err
    );

    return [];
  }
}

/* WRITE ANALYSIS */

function writeAnalysis(data) {

  fs.writeFileSync(
    ANALYSIS_FILE,
    JSON.stringify(data, null, 2),
    "utf8"
  );

}

/* ============================================================
   GET ALL ANALYSIS
============================================================ */

app.get("/api/product-analysis", (req, res) => {

  res.json(readAnalysis());

});

/* ============================================================
   GET BY HASH
============================================================ */

app.get(
  "/api/product-analysis/hash/:hash",
  (req, res) => {

    const { hash } = req.params;

    const analysis = readAnalysis();

    const result = analysis.find(
      (a) =>
        cleanString(a.ingredient_hash) ===
        cleanString(hash)
    );

    if (!result) {

      return res
        .status(404)
        .json({
          message:
            "Analysis not found",
        });

    }

    res.json(result);

  }
);

/* ============================================================
   ADD NEW ANALYSIS
============================================================ */

app.post(
  "/api/product-analysis",
  (req, res) => {

    const newAnalysis = req.body;

    if (!newAnalysis.ingredient_hash) {

      return res
        .status(400)
        .json({
          message:
            "ingredient_hash required",
        });

    }

    const analysis = readAnalysis();

    const exists = analysis.find(
      (a) =>
        cleanString(
          a.ingredient_hash
        ) ===
        cleanString(
          newAnalysis.ingredient_hash
        )
    );

    if (exists) {

      return res
        .status(400)
        .json({
          message:
            "Hash already exists",
        });

    }

    analysis.push(newAnalysis);

    writeAnalysis(analysis);

    res.json({
      success: true,
    });

  }
);

/* ============================================================
   UPDATE ANALYSIS
============================================================ */

app.put(
  "/api/product-analysis/hash/:hash",
  (req, res) => {

    const { hash } = req.params;

    const updates = req.body;

    const analysis = readAnalysis();

    const index = analysis.findIndex(
      (a) =>
        cleanString(
          a.ingredient_hash
        ) ===
        cleanString(hash)
    );

    if (index === -1) {

      return res
        .status(404)
        .json({
          message:
            "Analysis not found",
        });

    }

    analysis[index] = {
      ...analysis[index],
      ...updates,
    };

    writeAnalysis(analysis);

    res.json({
      success: true,
    });

  }
);

/* ============================================================
   DELETE ANALYSIS
============================================================ */

app.delete(
  "/api/product-analysis/hash/:hash",
  (req, res) => {

    const { hash } = req.params;

    const analysis = readAnalysis();

    const remaining = analysis.filter(
      (a) =>
        cleanString(
          a.ingredient_hash
        ) !==
        cleanString(hash)
    );

    writeAnalysis(remaining);

    res.json({
      success: true,
    });

  }
);
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
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(products, null, 2),
    "utf8"
  );
}

/* ============================================================
   SYNC JSON → MONGO
============================================================ */

async function syncProductsToMongo() {

  try {

    const products = readProducts();

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(
      "✅ Mongo synced successfully"
    );

  } catch (err) {

    console.error(
      "❌ Mongo sync failed:",
      err
    );

  }
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
app.get("/products", async (req, res) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 12;

    const data =
      await Product.find();

    /* =========================
       FILTER VISIBLE PRODUCTS
    ========================= */

   const visibleProducts = data;

    /* =========================
       GROUP VARIANTS
    ========================= */

    const groupedMap = {};

    visibleProducts.forEach((product) => {

      const groupId =
        cleanString(
          product["Variant Group ID"]
        ) ||
        cleanString(product.id);

      if (!groupedMap[groupId]) {

        groupedMap[groupId] = {
          groupId,
          displayProduct: product,
          variants: [],
        };
      }

      groupedMap[groupId]
        .variants
        .push(product);
    });

    const groupedProducts =
      Object.values(groupedMap);

    /* =========================
       PAGINATION
    ========================= */

    const start =
      (page - 1) * limit;

    const end =
      start + limit;

    const paginated =
      groupedProducts.slice(start, end);

    const flattened =
  groupedProducts.flatMap(
    (group) => group.variants
  );

res.json(flattened);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});

/* ============================================================
   📱 MOBILE PRODUCTS API
============================================================ */

app.get("/mobile/products", async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 12;

    const data =
      await Product.find();

    /* =========================
       FILTER
    ========================= */

    const visibleProducts =
      data.filter((p) => {

        const isLive =
          cleanString(p.Status)
            .toLowerCase() === "live";

        const isInDiscover =
          p.isNewLaunch ||
          p.isBestForDailyUse ||
          p.isTrending ||
          p.isUnderrated;

        return isLive || isInDiscover;
      });

    /* =========================
       GROUP VARIANTS
    ========================= */

    const groupedMap = {};

    visibleProducts.forEach((product) => {

      const groupId =
        cleanString(
          product["Variant Group ID"]
        ) ||
        cleanString(product.id);

      if (!groupedMap[groupId]) {

        groupedMap[groupId] = {
          groupId,
          displayProduct: product,
          variants: [],
        };
      }

      groupedMap[groupId]
        .variants
        .push(product);
    });

    const groupedProducts =
      Object.values(groupedMap);

    /* =========================
       PAGINATION
    ========================= */

    const start =
      (page - 1) * limit;

    const end =
      start + limit;

    const paginated =
      groupedProducts.slice(start, end);

    const flattened =
  paginated.flatMap(
    (group) => group.variants
  );

res.json(flattened);
  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});
/* ============================================================
   📱 MOBILE GROUPED PRODUCTS API
============================================================ */

app.get("/mobile/grouped-products", async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 12;

    const data =
      await Product.find();

    /* =========================
       FILTER
    ========================= */

    const visibleProducts =
      data.filter((p) => {

        const isLive =
          cleanString(p.Status)
            .toLowerCase() === "live";

        const isInDiscover =
          p.isNewLaunch ||
          p.isBestForDailyUse ||
          p.isTrending ||
          p.isUnderrated;

        return isLive || isInDiscover;
      });
      

    /* =========================
       GROUP VARIANTS
    ========================= */

    const groupedMap = {};

    visibleProducts.forEach((product) => {

      const groupId =
        cleanString(
          product["Variant Group ID"]
        ) ||
        cleanString(product.id);

      if (!groupedMap[groupId]) {

        groupedMap[groupId] = {
          groupId,
          displayProduct: product,
          variants: [],
        };
      }

      groupedMap[groupId]
        .variants
        .push(product);
    });

    const groupedProducts =
      Object.values(groupedMap);

    /* =========================
       PAGINATION
    ========================= */

    const start =
      (page - 1) * limit;

    const end =
      start + limit;

    const paginated =
      groupedProducts.slice(start, end);

    /* =========================
       REAL GROUPED RESPONSE
    ========================= */

    res.json(paginated);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});
/* ============================================================
   📱 MOBILE GROUPED PRODUCTS BY SUBCATEGORY
============================================================ */

app.get(
  "/mobile/grouped-products/subcategory/:subcategory",
  async (req, res) => {

    try {

      const { subcategory } =
        req.params;

      const data =
        await Product.find().lean();

      /*
        FILTER
      */

      const visibleProducts =
        data.filter((p) => {

          const isLive =
            cleanString(p.Status)
              .toLowerCase() === "live";

          const isInDiscover =
            p.isNewLaunch ||
            p.isBestForDailyUse ||
            p.isTrending ||
            p.isUnderrated;

          const matchesSubcategory =
            cleanString(
              p["Sub-Category"]
            )
              .toLowerCase() ===
            cleanString(
              subcategory
            )
              .toLowerCase();

          return (
            (isLive || isInDiscover) &&
            matchesSubcategory
          );
        });

      /*
        SORT IDS
      */

      visibleProducts.sort((a, b) => {

        const idA =
          String(a.id || "");

        const idB =
          String(b.id || "");

        return idA.localeCompare(
          idB,
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          }
        );
      });

      /*
        GROUP VARIANTS
      */

      const groupedMap = {};

      visibleProducts.forEach(
        (product) => {

          const groupId =
            cleanString(
              product[
                "Variant Group ID"
              ]
            ) ||
            cleanString(product.id);

          if (!groupedMap[groupId]) {

            groupedMap[groupId] = {
              groupId,
              displayProduct:
                product,
              variants: [],
            };
          }

          groupedMap[groupId]
            .variants
            .push(product);
        }
      );

      const groupedProducts =
        Object.values(groupedMap);

      res.json(groupedProducts);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Server Error",
      });

    }
  }
);
/* ============================================================
   📱 MOBILE CATEGORIES API
============================================================ */

app.get(
  "/mobile/categories",
  async (req, res) => {

    try {

      const data =
  await Product.find().lean();

      /*
        FILTER VISIBLE PRODUCTS
      */

      const visibleProducts =
        data.filter((p) => {

          const isLive =
            cleanString(p.Status)
              .toLowerCase() === "live";

          const isInDiscover =
            p.isNewLaunch ||
            p.isBestForDailyUse ||
            p.isTrending ||
            p.isUnderrated;

          return isLive || isInDiscover;
        });

      /*
        BUILD CATEGORY MAP
      */

      const categoryMap = {};

      visibleProducts.forEach((product) => {

        const category =
          cleanString(
            product["Primary Category"]
          );

        const subcategory =
          cleanString(
            product["Sub-Category"]
          );

        if (!category || !subcategory) {
          return;
        }

        if (!categoryMap[category]) {

          categoryMap[category] = new Set();

        }

        categoryMap[category]
          .add(subcategory);

      });

      /*
        FINAL RESPONSE
      */

      const result =
        Object.entries(categoryMap)
          .map(
            ([category, subcategories]) => ({

              category,

              subcategories:
                Array.from(subcategories)
                  .sort(),

            })
          );

      res.json(result);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Server Error",
      });

    }
  }
);

/* ============================================================
   🟢 ADMIN API → ALL PRODUCTS
============================================================ */
app.get("/admin/products", (req, res) => {
  res.json(readProducts());
});

/* ============================================================
   🔁 UPLOAD EXCEL (STRICT + SAFE)
============================================================ */
app.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
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

    /* =========================
   SAVE JSON
========================= */

const finalProducts =
  Object.values(map);

writeProducts(finalProducts);

/* =========================
   SYNC TO MONGO
========================= */

await Product.deleteMany({});

await Product.insertMany(
  finalProducts
);

console.log(
  "Mongo synced after upload"
);

/* =========================
   CLEANUP
========================= */

fs.unlinkSync(req.file.path);

/* =========================
   RESPONSE
========================= */

res.json({
  success: true,
  added: addedCount,
  totalProducts:
    finalProducts.length,
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
app.post("/products/:id/update-home-section", async (req, res) => {
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
  await syncProductsToMongo();
  res.json({ success: true });
});

/* ============================================================
   UPDATE SINGLE PRODUCT
============================================================ */
app.post("/products/:id/update", async (req, res) => {
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
  await syncProductsToMongo();
  res.json({ success: true });
});

/* ============================================================
   BULK UPDATE
============================================================ */
app.post("/products/bulk-update", async (req, res) => {
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
  await syncProductsToMongo();
  res.json({ success: true });
});

/* ============================================================
   DELETE SINGLE
============================================================ */
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  const products = readProducts();
  const remaining = products.filter(
    (p) => cleanString(p.id) !== cleanString(id)
  );

  writeProducts(remaining);
  await syncProductsToMongo();
  res.json({ success: true });
});

/* ============================================================
   BULK DELETE
============================================================ */
app.post("/products/bulk-delete", async (req, res) => {
  const ids = (req.body.ids || []).map(cleanString);

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "ids array required" });
  }

  const products = readProducts();
  const remaining = products.filter(
    (p) => !ids.includes(cleanString(p.id))
  );

  writeProducts(remaining);
  await syncProductsToMongo();

  res.json({
    success: true,
    deletedCount: products.length - remaining.length,
  });
});
/* =========================
   START SERVER
========================= */
app.get("/force-sync", async (req, res) => {

  try {

    await syncProductsToMongo();

    res.json({
      success: true,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

});
app.get("/debug-first-product", async (req, res) => {

  try {

    const product =
      await Product.findOne().lean();

    res.json(product);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message,
    });

  }

});
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `✅ Backend running at http://localhost:${PORT}`
  );
});