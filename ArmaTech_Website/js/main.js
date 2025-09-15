document.addEventListener("DOMContentLoaded", () => {
  setYear();
  attachAuthValidation();
  initSlider();
});

// Auto-update year in footer
function setYear() {
  document.querySelectorAll('[id^="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

// Auth (login + signup)
function attachAuthValidation() {
  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!loginForm.checkValidity()) {
        loginForm.classList.add("was-validated");
        return;
      }
      // Redirect after successful login
      window.location.href = "index.html";
    });
  }

  // Signup
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("confirmPassword").value;

      if (!signupForm.checkValidity() || pass !== confirm) {
        signupForm.classList.add("was-validated");
        return;
      }
      // Redirect after successful signup
      window.location.href = "index.html";
    });
  }
}

// WowSlider
function initSlider() {
  const slider = document.getElementById("wowSlider");
  if (!slider) return;

  let index = 0;
  const slides = slider.querySelector(".slides");
  const items = slides.children;
  const dots = document.getElementById("wowDots");

  // create dots
  [...items].forEach((_, i) => {
    const dot = document.createElement("button");
    dot.addEventListener("click", () => {
      index = i;
      update();
    });
    dots.appendChild(dot);
  });

  function update() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.childNodes.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function next() {
    index = (index + 1) % items.length;
    update();
  }

  function prev() {
    index = (index - 1 + items.length) % items.length;
    update();
  }

  document.querySelector(".wow-next")?.addEventListener("click", next);
  document.querySelector(".wow-prev")?.addEventListener("click", prev);

  setInterval(next, 4000);
  update();
}


