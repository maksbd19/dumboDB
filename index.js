const DB = require("./db");

DB.set("one", { a: 1, b: 1 });
DB.set("one", { c: 1, d: 1 });

console.log(DB.get("one"));
