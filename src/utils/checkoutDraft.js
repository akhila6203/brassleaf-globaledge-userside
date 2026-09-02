const CHECKOUT_DRAFT_KEY = "brassleaf_checkout_draft";

export function saveCheckoutDraft(draft) {
  try {
    sessionStorage.setItem(
      CHECKOUT_DRAFT_KEY,
      JSON.stringify({
        ...draft,
        savedAt: Date.now(),
      })
    );
  } catch {
    // Ignore storage errors.
  }
}

export function loadCheckoutDraft() {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCheckoutDraft() {
  try {
    sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
  } catch {
    // Ignore storage errors.
  }
}
