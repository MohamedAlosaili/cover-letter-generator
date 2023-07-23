const modal = document.querySelector("[data-modal]");
const modalForm = document.querySelector("[data-modal-form]");
const apiKeyInput = document.querySelector("[data-api-key]");
const saveToLocalStorage = document.querySelector("[data-save-in-browser]");

export let apiKey;

export function getApiKey() {
  const apiKeyFromLocalStorage = localStorage.getItem("apiKey");
  const apiKeyFromSessionStorage = sessionStorage.getItem("apiKey");

  if (!apiKeyFromLocalStorage && !apiKeyFromSessionStorage) {
    return modalForm.addEventListener("submit", onSubmit);
  }

  if (apiKeyFromLocalStorage) {
    apiKey = apiKeyFromLocalStorage;
  }
  if (apiKeyFromSessionStorage) {
    apiKey = apiKeyFromSessionStorage;
  }

  modalForm.removeEventListener("submit", onSubmit);
  modal.remove();
}

function onSubmit(e) {
  e.preventDefault();
  const apiKey = apiKeyInput.value;

  if (!apiKey.trim()) {
    return;
  }

  const storage = saveToLocalStorage.checked ? localStorage : sessionStorage;
  storage.setItem("apiKey", apiKey);

  getApiKey();
}
