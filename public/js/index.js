import { formInputs } from "./listeners.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", e => {
  e.preventDefault();

  const inputsValue = Array.from(formInputs).map(input => ({
    [input.name]: input.value,
  }));
  const userInfo = Object.assign({}, ...inputsValue);
  userInfo.tempreture = Number(userInfo.tempreture || 5) / 10;
});
