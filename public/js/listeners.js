const focusOnFirestInputBtn = document.querySelector("[data-focus-btn]");
// Focus on the first input when clicking on 'Try it now 👇` Button
focusOnFirestInputBtn.addEventListener("click", () => {
  const input = document.querySelector("input[type='text']");
  if (input) {
    input.focus();
    input.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

// Range input
const rangeInput = document.querySelector("[data-input='range']");
const rangeValue = document.querySelector("[data-range-value]");
// Display new range value on changes
rangeInput.addEventListener("input", e => {
  const { value, min } = e.target;

  rangeValue.textContent = value === min ? "Default" : value;
});

// Set listener to update fields value length
export const formInputs = document.querySelectorAll("[data-input]");
formInputs.forEach(input => {
  if (input.type === "range") return;
  input.addEventListener("input", e => {
    const inputLengthElement = document.querySelector(
      `[data-maxlength-name="${input.name}"]`
    );
    inputLengthElement.textContent = `${input.value.length} / ${inputLengthElement.dataset.maxlength}`;
  });
});

// Show and hide optional fields
const optionalTrigger = document.querySelector("[data-optional-trigger]");
const optionalInputs = document.querySelectorAll("[data-optional-input]");
optionalTrigger.addEventListener("click", e => {
  e.target.dataset.optionalTrigger =
    e.target.dataset.optionalTrigger === "true" ? "false" : "true";
  e.target.textContent = `${
    e.target.dataset.optionalTrigger === "true" ? "Hide" : "Show"
  } Optional Inputs`;
  optionalInputs.forEach(input => input.classList.toggle("show"));
});

// Copy generated Text, only if the response is finished
export const generatedText = document.querySelector("[data-generated-text]");
generatedText.addEventListener("click", e => {
  if (loading) return;
  navigator.clipboard.writeText(e.currentTarget.textContent);
});
