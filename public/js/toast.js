const toastStack = document.querySelector("[data-toast-stack]");

const defaultOptions = {
  duration: 3000,
  pos: "top center", // "top left" | "top right" | "bottom left" | "bottom right" | "bottom center"
};

// Create new instance with optional config
export const toast = Toast();

function Toast(options = {}) {
  let duration = options.duration ?? defaultOptions.duration;
  let pos = options.pos ?? defaultOptions.pos;

  setToastPosition();
  return { add: createNewToast };

  function createNewToast(msg, icon = "😀") {
    const toast = document.createElement("div");
    toast.className = "toast__item";

    toast.innerHTML = `
                <span>${icon}</span>
                <p class="toast__text">${msg}</p>
        `;

    const where = pos.includes("bottom") ? "beforeend" : "afterbegin";
    toastStack.insertAdjacentElement(where, toast);

    setTimeout(() => toast.classList.add("close"), duration);
    toast.addEventListener("animationend", removeElement);

    function removeElement(e) {
      if (e.animationName === "fade-out") {
        cleanUp();
        toast.remove();
      }
    }

    function cleanUp() {
      toast.removeEventListener("animationend", removeElement);
    }
  }

  function setToastPosition() {
    const position = {
      "--top": "auto",
      "--right": "auto",
      "--bottom": "auto",
      "--left": "auto",
      "--translate-x": 0,
    };

    if (pos.includes("top")) {
      position["--top"] = 0;
    }
    if (pos.includes("bottom")) {
      // flip the stack
      toastStack.style.flexDirection = "column-reverse";
      position["--bottom"] = 0;
    }
    if (pos.includes("center")) {
      position["--left"] = "50%";
      position["--translate-x"] = "-50%";
    }
    if (pos.includes("left")) {
      position["--left"] = 0;
    }
    if (pos.includes("right")) {
      position["--right"] = 0;
    }

    toastStack.style.setProperty("--top", position["--top"]);
    toastStack.style.setProperty("--right", position["--right"]);
    toastStack.style.setProperty("--bottom", position["--bottom"]);
    toastStack.style.setProperty("--left", position["--left"]);
    toastStack.style.setProperty("--translate-x", position["--translate-x"]);
  }
}
