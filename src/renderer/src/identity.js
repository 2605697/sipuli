import kaikkisanat from "./mock_data/kaikkisanat.txt?raw";

let words = kaikkisanat.split("\n");

/**
 * Get the public identity name from a secret identity code.
 * @param {string} code - Secret identity code.
 * @return {string} Public identity name.
 */
export function getIdentity(code) {
  let bytes = new TextEncoder().encode(code);
  // 32 bit FNV-1a hash
  let hash = 0x811c9dc5;
  for (let b of bytes)
    hash = Math.imul(hash ^ b, 0x01000193) >>> 0;
  return `${words[hash % words.length]} ${words[(hash>>>16) % words.length]}`;
}
