// engine/processingEngine.js

const fs = require("fs");
const path = require("path");

const classifyProcessing =
  require("../ai/processingAI");

const generateHash =
  require("./hashGenerator");



const processingDBPath =
  path.join(
    __dirname,
    "../data/processingDB.json"
  );



function loadDB() {

  try {

    const data =
      fs.readFileSync(
        processingDBPath,
        "utf8"
      );

    return JSON.parse(data);

  }

  catch {

    return [];

  }

}



function saveDB(db) {

  fs.writeFileSync(

    processingDBPath,

    JSON.stringify(
      db,
      null,
      2
    )

  );

}



function findByHash(hash, db) {

  return db.find(
    item =>
      item.hash === hash
  );

}



async function getProcessingData(
  ingredientList
) {

  if (!Array.isArray(ingredientList)) {

    ingredientList =
      [ingredientList];

  }



  const hash =
    generateHash(
      ingredientList
    );



  let db =
    loadDB();



  const existing =
    findByHash(
      hash,
      db
    );



  if (existing) {

    console.log(
      "♻️ Processing reused"
    );

    return existing;

  }



  console.log(
    "🧠 Calling Processing AI"
  );



  const result =
    await classifyProcessing(
      ingredientList
    );



  const newEntry = {

    hash,

    ingredients:
      ingredientList,

    processing_types:
      result.processing_types || [],

    processing_level:
      result.processing_level || "moderate",

    created_at:
      new Date()

  };



  db.push(newEntry);

  saveDB(db);



  return newEntry;

}



module.exports =
  getProcessingData;