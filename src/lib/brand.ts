/** Which site this is: the JapanOne consumer site (japanone.* domain, or VITE_BRAND=japanone
 *  locally) or the Muthamil Technologies company site. Same code, different home and header. */
export const BRAND: "japanone" | "muthamil" =
  import.meta.env.VITE_BRAND === "japanone" || (typeof location !== "undefined" && location.hostname.includes("japanone"))
    ? "japanone"
    : "muthamil";

export const isJapanOne = BRAND === "japanone";
export const SITE_NAME = isJapanOne ? "JapanOne" : "Muthamil Technologies";

export const social = {
  instagram: "https://www.instagram.com/japanone_app/",
  tiktok: "https://www.tiktok.com/@japanone_app",
  youtube: "https://www.youtube.com/channel/UCkrDY_FR9c3NKCCGbdV8bqw",
  facebook: "https://www.facebook.com/profile.php?id=61595200264737",
};
