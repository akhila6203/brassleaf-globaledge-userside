export const STUDENT_CLASSES = [
  "Nursery",
  "LKG",
  "UKG",
  "1st Class",
  "2nd Class",
  "3rd Class",
  "4th Class",
  "5th Class",
  "6th Class",
  "7th Class",
  "8th Class",
  "9th Class",
  "10th Class",
  "11th Class",
  "12th Class",
];

export const EMPTY_ADDRESS = {
  id: "",
  firstName: "",
  lastName: "",
  studentClass: "Nursery",
  country: "India",
  address: "",
  address2: "",
  city: "",
  state: "Telangana",
  pincode: "",
  phone: "",
  email: "",
  admissionNo: "",
  parentName: "",
  isDefault: true,
};

export function readSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key) || sessionStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function saveBoth(key, value) {
  const serialized = JSON.stringify(value);
  localStorage.setItem(key, serialized);
  sessionStorage.setItem(key, serialized);
}

export function getDefaultAddress() {
  const addresses = readSaved("uniforms_addresses", []);
  return addresses.find((item) => item.isDefault) || addresses[0] || null;
}

export function saveSharedAddress(address) {
  const addresses = readSaved("uniforms_addresses", []);
  const item = {
    ...EMPTY_ADDRESS,
    ...address,
    id: address.id || addresses[0]?.id || Date.now().toString(),
    name: `${address.firstName || ""} ${address.lastName || ""}`.trim(),
    country: address.country || "India",
    state: address.state || "Telangana",
    isDefault: true,
  };

  const remaining = addresses
    .filter((existing) => existing.id !== item.id)
    .map((existing) => ({ ...existing, isDefault: false }));

  saveBoth("uniforms_addresses", [item, ...remaining]);
  saveBoth("uniforms_cart_shipping", {
    country: item.country,
    state: item.state,
    city: item.city,
    pincode: item.pincode,
  });

  return item;
}
