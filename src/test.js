import { parse, validate, inferSchema } from "./index.js";

// Let's validate some silly data! 🎪
const raw = 42; // The answer to everything!
let typed = parse(raw);
let schema = inferSchema(raw);

// Time for some type-checking shenanigans! 🎭
try {;
    validate(schema, typed);
    console.log("Wow, that actually worked! 🦄");
  } catch (e) {
    console.log("Oops! The type checker is not amused 😅");
  }


// Let's try something really wild...
try {
  typed = ["pizza", 3.14, "unicorn"];
  validate(schema, typed);
  console.log("Wow, that actually worked! 🦄");
} catch (e) {
  console.log("Oops! The type checker is not amused 😅");
}
