export const getPrimaryCategory = (p: any) =>
  p["Primary Category"] ||
  p.primaryCategory ||
  p.category ||
  "";

export const getSubCategory = (p: any) =>
  p["Sub-Category"] ||
  p.subCategory ||
  p.subcategory ||
  "";

export const getImage = (p: any) =>
  p["Main Image URL"] ||
  p["Image URL"] ||
  p.image ||
  p.imageUrl ||
  "";

export const getName = (p: any) =>
  p["Name of Product"] ||
  p.name ||
  "";

export const slugify = (text: string) =>
  text
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");