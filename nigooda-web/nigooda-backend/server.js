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
const foodRoutes = require("./routes/food/analyzeFood"); 
const drinksRoutes = require("./routes/food/analyzeDrinks");
const recommendationsRoutes =
require("./routes/recommendations");

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
app.use("/api", foodRoutes);

app.use(
  "/api",
  drinksRoutes
);
app.use(
  "/api",
  recommendationsRoutes
);


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
const PORT = process.env.PORT || 5000;
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
   FIX: Skip pointless group-then-flatten — return flat array
   directly from MongoDB. The frontend normalizeProduct()
   already handles everything it needs from the flat shape.
============================================================ */
app.get("/products", async (req, res) => {
  try {
    const data = await Product.find().lean();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
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
   FIX: Read from MongoDB instead of JSON file
============================================================ */
app.get("/admin/products", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error("MongoDB admin read failed, falling back to JSON:", err);
    res.json(readProducts());
  }
});

/* ============================================================
   🔁 UPLOAD EXCEL (STRICT + SAFE)
   Only replace products of the uploaded category
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
        "Buy Link": cleanString(row["Buy Link"]),
        "Referral Code": cleanString(row["Referral Code"]),
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
        analysisEngine: cleanString(row["Analysis Engine"]),
        analysisIngredients: cleanString(row["Analysis Ingredients"]),
        analysisReport: cleanString(row["Analysis Report"]),
      };

      addedCount++;
    });

    /* =========================
       SAVE JSON
    ========================= */

    const finalProducts = Object.values(map);
    writeProducts(finalProducts);

    /* =========================
       SYNC ONLY THIS CATEGORY TO MONGO
    ========================= */

    await Product.deleteMany({ "Primary Category": category });
    const categoryProducts = finalProducts.filter(
      (p) => cleanString(p["Primary Category"]) === cleanString(category)
    );
    if (categoryProducts.length > 0) {
      await Product.insertMany(categoryProducts);
    }

    console.log("Mongo synced after upload (category only)");

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
      totalProducts: finalProducts.length,
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
   Targeted Mongo update with whitelisted fields
============================================================ */

app.post("/products/:id/update", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Whitelist allowed update fields to prevent overwriting critical data
  const ALLOWED_FIELDS = [
    "isNewLaunch", "isBestForDailyUse", "isTrending", "isUnderrated",
    "homeSections", "Status", "Price", "Brand", "Name of Product",
    "Short Description", "Seller Website", "Buy Link", "Referral Code", "Subcategory Sample Rank",
    "Rating",
    "analysisEngine",
    "analysisIngredients",
    "analysisReport",
  ];

  const safeUpdates = {};
  ALLOWED_FIELDS.forEach((field) => {
    if (updates[field] !== undefined) {
      // Coerce boolean fields to actual booleans
      if (["isNewLaunch", "isBestForDailyUse", "isTrending", "isUnderrated"].includes(field)) {
        safeUpdates[field] = Boolean(updates[field]);
      } else {
        safeUpdates[field] = updates[field];
      }
    }
  });

  // Update JSON file
  const products = readProducts();
  const index = products.findIndex(
    (p) => cleanString(p.id) === cleanString(id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index] = { ...products[index], ...safeUpdates };
  writeProducts(products);

  // Targeted findOneAndUpdate instead of deleteMany + insertMany
  try {
    await Product.findOneAndUpdate(
      { id: cleanString(id) },
      { $set: safeUpdates },
      { upsert: false }
    );
  } catch (mongoErr) {
    console.error("Mongo update failed, falling back to full sync:", mongoErr);
    await syncProductsToMongo();
  }

  res.json({ success: true });
});

/* ============================================================
   GENERATE PRODUCT INTELLIGENCE REPORT
   POST /products/:id/generate-report
   Calls existing Nigooda engine → saves result.analysis
   into analysisReport on JSON + MongoDB.
============================================================ */

const ENGINE_ROUTES = {
  "face-wash":                  "/api/analyze-facewash",
  "moisturizer":                "/api/analyze-moisturizer",
  "sunscreen":                  "/api/analyze-sunscreen",
  "toner":                      "/api/analyze-toner",
  "serum":                      "/api/analyze-serum",
  "day-cream":                  "/api/analyze-daycream",
  "night-cream":                "/api/analyze-nightcream",
  "eye-cream":                  "/api/analyze-eyecream",
  "lip-balm":                   "/api/analyze-lipbalm",
  "face-mask":                  "/api/analyze-facemask",
  "shampoo":                    "/api/analyze-shampoo",
  "conditioner":                "/api/analyze-conditioner",
  "hair-color-dye":             "/api/analyze-haircolordye",
  "hair-styling":               "/api/analyze-hairstylingproduct",
  "hair-oil":                   "/api/analyze-hairoil",
  "hair-mask":                  "/api/analyze-hairmask",
  "hair-serum":                 "/api/analyze-hairserum",
  "beard-growth-serum":         "/api/analyze-beardgrowthserum",
  "soap-body-wash":             "/api/analyze-soapbodywash",
  "body-lotion":                "/api/analyze-bodylotion",
  "body-scrub":                 "/api/analyze-bodyscrub",
  "body-powder":                "/api/analyze-bodypowder",
  "deodorant-antiperspirant":   "/api/analyze-deodorantantiperspirant",
  "toothpaste-tooth-powder":    "/api/analyze-toothpastetoothpowder",
  "mouthwash":                  "/api/analyze-mouthwash",
  "teeth-whitening":            "/api/analyze-teethwhiteningproduct",
  "gum-care":                   "/api/analyze-gumcareproduct",
  "hand-wash":                  "/api/analyze-handwash",
  "hand-sanitizer":             "/api/analyze-handsanitizer",
  "intimate-wash":              "/api/analyze-intimatewash",
  "foot-care":                  "/api/analyze-footcare",
  "antiseptic-liquid":          "/api/analyze-antisepticliquid",
  "hygiene-wipes":              "/api/analyze-hygienewipes",
  "food":                       "/api/analyze-foods",
  "drinks":                     "/api/analyze-drinks",
};

app.post("/products/:id/generate-report", async (req, res) => {
  const { id } = req.params;
  const { analysisEngine, analysisIngredients } = req.body;

  /* =========================
     VALIDATE ENGINE
  ========================= */
  if (!analysisEngine) {
    return res.status(400).json({
      message: "analysisEngine is required",
    });
  }

  const enginePath = ENGINE_ROUTES[analysisEngine];

  if (!enginePath) {
    return res.status(400).json({
      message: `Unknown analysisEngine: "${analysisEngine}"`,
    });
  }

  /* =========================
     VALIDATE INGREDIENTS
  ========================= */
  if (
    !analysisIngredients ||
    cleanString(analysisIngredients) === ""
  ) {
    return res.status(400).json({
      message: "analysisIngredients is required",
    });
  }

  /* =========================
     FIND PRODUCT
  ========================= */
  const products = readProducts();
  const index = products.findIndex(
    (p) => cleanString(p.id) === cleanString(id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  /* =========================
     CALL EXISTING ENGINE
  ========================= */
  let analysisReport;

  try {
    const engineUrl = `http://localhost:${PORT}${enginePath}`;

    const engineResponse = await fetch(engineUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pastedIngredients: analysisIngredients,
      }),
    });

    if (!engineResponse.ok) {
      return res.status(502).json({
        message: `Engine responded with status ${engineResponse.status}`,
      });
    }

    const engineData = await engineResponse.json();

    if (
      !engineData.success ||
      !engineData.result ||
      !engineData.result.analysis
    ) {
      return res.status(502).json({
        message: "Engine did not return a valid analysis",
        engineData,
      });
    }

    analysisReport = engineData.result.analysis;

  } catch (engineErr) {
    console.error("Engine call failed:", engineErr);
    return res.status(502).json({
      message: "Engine call failed",
      error: engineErr.message,
    });
  }

  /* =========================
     SAVE TO JSON
  ========================= */
  const reportUpdates = {
    analysisEngine:      cleanString(analysisEngine),
    analysisIngredients: cleanString(analysisIngredients),
    analysisReport,
  };

  products[index] = {
    ...products[index],
    ...reportUpdates,
  };

  writeProducts(products);

  /* =========================
     SAVE TO MONGODB
  ========================= */
  try {
    await Product.findOneAndUpdate(
      { id: cleanString(id) },
      { $set: reportUpdates },
      { upsert: false }
    );
  } catch (mongoErr) {
    console.error(
      "Mongo update failed after report generation, falling back to full sync:",
      mongoErr
    );
    await syncProductsToMongo();
  }

  /* =========================
     RESPOND
  ========================= */
  res.json({
    success: true,
    analysisReport,
  });
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

/* ============================================================
   BULK DISCOVER UPDATE
============================================================ */
app.post("/products/bulk-update-discover", async (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: "updates array required" });
    }

    // Update JSON file in one pass
    const products = readProducts();
    const productMap = {};
    products.forEach((p) => { productMap[cleanString(p.id)] = p; });

    updates.forEach(({ id, isNewLaunch, isBestForDailyUse, isTrending, isUnderrated }) => {
      const cleanId = cleanString(id);
      if (productMap[cleanId]) {
        productMap[cleanId] = {
          ...productMap[cleanId],
          isNewLaunch: Boolean(isNewLaunch),
          isBestForDailyUse: Boolean(isBestForDailyUse),
          isTrending: Boolean(isTrending),
          isUnderrated: Boolean(isUnderrated),
        };
      }
    });

    const finalProducts = Object.values(productMap);
    writeProducts(finalProducts);

    // ONE full sync after all updates (not N syncs)
    await syncProductsToMongo();

    res.json({ success: true, updated: updates.length });

  } catch (err) {
    console.error("Bulk discover update failed:", err);
    res.status(500).json({ message: "Bulk update failed", error: err.message });
  }
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
  console.log(`✅ Backend running on port ${PORT}`);
});