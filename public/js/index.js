import { formInputs, generatedText } from "./listeners.js";
import { getApiKey, apiKey } from "./getApiKey.js";
import { toast } from "./toast.js";

const form = document.querySelector("[data-form]");
const submitBtn = form.querySelector("[data-submit-btn]");
const generatedSection = document.querySelector("[data-generated]");

getApiKey();
form.addEventListener("submit", generate);

// Global state
export let loading = false;
let generatedCoverLetter = "";

async function generate(e) {
  e.preventDefault();
  generatedSection.hidden = true;

  if (!apiKey) {
    return toast.add("You forgot to add your API key", "😉");
  }

  loading = true;
  generatedCoverLetter = "";
  submitBtn.textContent = "Generating...";

  const inputsValue = Array.from(formInputs).map(input => ({
    [input.name]: input.value,
  }));
  const userInfo = Object.assign({}, ...inputsValue);
  userInfo.tempreture = Number(userInfo.tempreture || 5) / 10;

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInfo, apiKey }),
    });

    if (response.status !== 200 || !response.body) {
      throw new Error("Failed to generate");
    }

    generatedSection.hidden = false;

    const reader = response.body.getReader();
    // const parser = createParser(onParse)
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      generatedCoverLetter += decoder.decode(value);
      updateGeneratedText();
    }
  } catch (err) {
    console.log(err);
  }

  // Reset
  loading = false;
  submitBtn.textContent = "Generate";
}

const generatedTextBottom = document.querySelector(
  "[data-generated-text-bottom]"
);
function updateGeneratedText() {
  const cleanedText = generatedCoverLetter.replace(/\n\n/g, "\n");

  generatedText.innerHTML = `<p>${cleanedText.replace(
    /\n/g,
    "</p><br /><p>"
  )}</p>`;

  generatedTextBottom.scrollIntoView({ behavior: "smooth" });
}
