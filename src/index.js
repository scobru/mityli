/**
 * @file minimal_typing_lib.js
 * @description Libreria minima per runtime type-checking in JavaScript usando Valibot.
 */
import {
    object,
    string,
    number,
    boolean,
    array,
    any,
    parse as valiParse
  } from "valibot";
  
  /**
   * Definisce uno schema Valibot a partire da un oggetto di proprietà -> validatore.
   * @param {{ [key: string]: any }} shape
   * @returns {any}
   */
  export function defineSchema(shape) {
    return object(shape);
  }
  
  /**
   * Valida i dati secondo lo schema e ritorna l'oggetto tipizzato.
   * @param {any} schema
   * @param {unknown} data
   * @returns {any}
   * @throws Error Se la validazione fallisce
   */
  export function validate(schema, data) {
    return valiParse(schema, data);
  }
  
  /**
   * Infers a Valibot schema from a JavaScript value.
   * Supporta tipi primitivi, array (omogenei -> array(), eterogenei -> any()) e oggetti.
   * Tratta null e undefined come any().
   * @param {*} value
   * @returns {any}
   */
  export function inferSchema(value) {
    if (value === null || value === undefined) {
      return any();
    }
  
    const type = typeof value;
    if (type === "string") return string();
    if (type === "number") return number();
    if (type === "boolean") return boolean();
  
    if (type === "object") {
      if (Array.isArray(value)) {
        // Array omogeneo vs eterogeneo
        if (value.length === 0) {
          return array(any());
        }
        const firstType = typeof value[0];
        if (value.every((el) => typeof el === firstType)) {
          // Tutti omogenei: schema di array
          const elemSchema = inferSchema(value[0]);
          return array(elemSchema);
        }
        // Eterogeneo: fallback a any
        return any();
      }
      // Oggetto plain
      const shape = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          shape[key] = inferSchema(value[key]);
        }
      }
      return object(shape);
    }
  
    // Fallback generico per altri tipi (function, symbol, bigint, ecc.)
    return any();
  }
  
  /**
   * Converte e valida un valore JavaScript in base allo schema inferito.
   * @param {*} value
   * @returns {any} valore validato e tipizzato
   * @throws Error Se la validazione fallisce
   */
  export function parse(value) {
    const schema = inferSchema(value);
    return valiParse(schema, value);
  }
  
  /**
   * Esempio di utilizzo:
   *
   * // Creo uno schema a runtime dal primo array
   * const raw1 = [1, "string", { name: "ciao" }];
   * const schema = inferSchema(raw1);
   *
   * // Valido il primo array (pass)
   * const typed1 = validate(schema, raw1);
   * console.log(typed1[2].name); // "ciao"
   *
   * // Provo a validare un secondo array con schema precedentemente inferito
   * const raw2 = [1, 2, { name: "ciao" }];
   * try {
   *   const typed2 = validate(schema, raw2);
   *   console.log(typed2);
   * } catch (e) {
   *   console.error("Secondo array non valido (schema da raw1):", e);
   * }
   */
  