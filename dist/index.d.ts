/**
 * Definisce uno schema Valibot a partire da un oggetto di proprietà -> validatore.
 * @param {{ [key: string]: any }} shape
 * @returns {any}
 */
export function defineSchema(shape: {
    [key: string]: any;
}): any;
/**
 * Valida i dati secondo lo schema e ritorna l'oggetto tipizzato.
 * @param {any} schema
 * @param {unknown} data
 * @returns {any}
 * @throws Error Se la validazione fallisce
 */
export function validate(schema: any, data: unknown): any;
/**
 * Infers a Valibot schema from a JavaScript value.
 * Supporta tipi primitivi, array (omogenei -> array(), eterogenei -> any()) e oggetti.
 * Tratta null e undefined come any().
 * @param {*} value
 * @returns {any}
 */
export function inferSchema(value: any): any;
/**
 * Converte e valida un valore JavaScript in base allo schema inferito.
 * @param {*} value
 * @returns {any} valore validato e tipizzato
 * @throws Error Se la validazione fallisce
 */
export function parse(value: any): any;
