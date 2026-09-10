/* =========================================================
   GLOBAL EDGE
   USER SIDE PRODUCT CUSTOM DISPLAY ORDER

   REQUIRED ORDER:
   1. SHIRTS
   2. BOYS TROUSER
   3. GIRLS TROUSER
   4. NICKERS / NECKERS
   5. SKIRT
   6. RED TSHIRT
   7. YELLOW TSHIRT
   8. GREEN TSHIRT
   9. BLUE TSHIRT
   10. TRACK
   11. SPORT SHORT
   12. BELT
   13. SOCKS
   14. JACKET
   15. OTHER PRODUCTS

   FRONTEND DISPLAY ONLY.
   BACKEND / DATABASE / ADMIN ARE NOT CHANGED.
========================================================= */


/* =========================================================
   NORMALIZE
========================================================= */

const normalizeText = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();


/* =========================================================
   BUILD SEARCHABLE PRODUCT TEXT
========================================================= */

const getProductText = (product) => {
  return normalizeText(`
    ${product?.name || ""}
    ${product?.slug || ""}
    ${product?.sku || ""}
    ${product?.category || ""}
    ${product?.categoryName || ""}
  `);
};


/* =========================================================
   PRODUCT PRIORITY
========================================================= */

const getProductPriority = (product) => {
  const text = getProductText(product);


  /* =====================================================
     1. SHIRTS

     Important:
     Plain shirt should come before T-shirts.
  ===================================================== */

  if (
    text.includes("shirt") &&
    !text.includes("tshirt") &&
    !text.includes("t shirt") &&
    !text.includes("tee shirt")
  ) {
    return 1;
  }


  /* =====================================================
     2. BOYS TROUSER
  ===================================================== */

  if (
    text.includes("boys trouser") ||
    text.includes("boy trouser") ||
    text.includes("boys trousers") ||
    text.includes("boy trousers") ||
    text.includes("boys pant") ||
    text.includes("boy pant") ||
    text.includes("boys pants") ||
    text.includes("boy pants")
  ) {
    return 2;
  }


  /* =====================================================
     3. GIRLS TROUSER
  ===================================================== */

  if (
    text.includes("girls trouser") ||
    text.includes("girl trouser") ||
    text.includes("girls trousers") ||
    text.includes("girl trousers") ||
    text.includes("girls pant") ||
    text.includes("girl pant") ||
    text.includes("girls pants") ||
    text.includes("girl pants")
  ) {
    return 3;
  }


  /* =====================================================
     4. NICKERS / NECKERS / KNICKERS
  ===================================================== */

  if (
    text.includes("nicker") ||
    text.includes("nickers") ||
    text.includes("necker") ||
    text.includes("neckers") ||
    text.includes("knicker") ||
    text.includes("knickers")
  ) {
    return 4;
  }


  /* =====================================================
     5. SKIRT
  ===================================================== */

  if (
    text.includes("skirt")
  ) {
    return 5;
  }


  /* =====================================================
     6. RED TSHIRT
  ===================================================== */

  if (
    (
      text.includes("tshirt") ||
      text.includes("t shirt") ||
      text.includes("tee shirt")
    ) &&
    text.includes("red")
  ) {
    return 6;
  }


  /* =====================================================
     7. YELLOW TSHIRT
  ===================================================== */

  if (
    (
      text.includes("tshirt") ||
      text.includes("t shirt") ||
      text.includes("tee shirt")
    ) &&
    text.includes("yellow")
  ) {
    return 7;
  }


  /* =====================================================
     8. GREEN TSHIRT
  ===================================================== */

  if (
    (
      text.includes("tshirt") ||
      text.includes("t shirt") ||
      text.includes("tee shirt")
    ) &&
    text.includes("green")
  ) {
    return 8;
  }


  /* =====================================================
     9. BLUE TSHIRT
  ===================================================== */

  if (
    (
      text.includes("tshirt") ||
      text.includes("t shirt") ||
      text.includes("tee shirt")
    ) &&
    text.includes("blue")
  ) {
    return 9;
  }


  /* =====================================================
     FALLBACK TSHIRT

     Any other T-shirt color comes after Blue T-shirt
     and before Track.
  ===================================================== */

  if (
    text.includes("tshirt") ||
    text.includes("t shirt") ||
    text.includes("tee shirt")
  ) {
    return 9.5;
  }


  /* =====================================================
     10. TRACK

     Sport short is checked separately below.
  ===================================================== */

  if (
    text.includes("track pant") ||
    text.includes("track pants") ||
    text.includes("track trouser") ||
    text.includes("track trousers") ||
    text.includes("track")
  ) {
    return 10;
  }


  /* =====================================================
     11. SPORT SHORT
  ===================================================== */

  if (
    text.includes("sport short") ||
    text.includes("sports short") ||
    text.includes("sport shorts") ||
    text.includes("sports shorts")
  ) {
    return 11;
  }


  /* =====================================================
     12. BELT
  ===================================================== */

  if (
    text.includes("belt")
  ) {
    return 12;
  }


  /* =====================================================
     13. SOCKS
  ===================================================== */

  if (
    text.includes("sock")
  ) {
    return 13;
  }


  /* =====================================================
     14. JACKET
  ===================================================== */

  if (
    text.includes("jacket")
  ) {
    return 14;
  }


  /* =====================================================
     OTHER PRODUCTS
  ===================================================== */

  return 999;
};


/* =========================================================
   SORT PRODUCTS

   Products with same priority keep backend order.
========================================================= */

export const sortProductsByUniformOrder = (products = []) => {
  return [...products]
    .map((product, originalIndex) => ({
      product,
      originalIndex,
      priority: getProductPriority(product),
    }))
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }

      return a.originalIndex - b.originalIndex;
    })
    .map(({ product }) => product);
};