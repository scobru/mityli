import { parse, validate, inferSchema } from "./index.js";

const raw =  1
let typed = parse(raw);
let schema = inferSchema(raw);

// typed è [1, "string", { name: "ciao" }], e typed[2].name è accessibile senza errori.

typed =  ["ciao", "ciao", "ciao"];
const result = validate(schema, typed);


