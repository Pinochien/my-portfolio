// Smooth scroll for nav links and home icon
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      } else if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
});

// Toast / popup utility
function showToast(message, type = "success", duration = 2000) {
  // create container if not exists
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    Object.assign(container.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      maxWidth: "320px",
    });
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.classList.add("toast");
  Object.assign(toast.style, {
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    background: type === "error" ? "#ffdddd" : "#1f513a",
    color: type === "error" ? "#a00" : "#fff",
    fontSize: "0.95rem",
    position: "relative",
    overflow: "hidden",
    opacity: "0",
    transition: "opacity .25s ease",
  });

  toast.textContent = message;

  // close button
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "×";
  Object.assign(closeBtn.style, {
    position: "absolute",
    right: "8px",
    top: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1.1rem",
    lineHeight: "1",
  });
  closeBtn.addEventListener("click", () => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  });
  toast.appendChild(closeBtn);

  container.appendChild(toast);

  // force reflow to trigger transition
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  // auto-dismiss
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) container.remove();
    }, 300);
  }, duration);
}

// Task 7: addRecommendation invoked by button
function addRecommendation() {
  const textarea = document.getElementById("new-recommendation-text");
  const text = textarea.value.trim();
  if (!text) {
    showToast("Vui lòng nhập nội dung recommendation.", "error");
    return;
  }

  // Create new recommendation card
  const card = document.createElement("div");
  card.classList.add("rec-card");

  const p = document.createElement("p");
  p.classList.add("quote");
  p.textContent = `“${text}”`;

  card.appendChild(p);

  const list = document.getElementById("rec-list");
  list.appendChild(card);

  // Clear text
  textarea.value = "";

  // Show success popup / toast
  showToast("Thank you for your recommendation!"); // screenshot target popup

  // (Optional) focus back to textarea
  textarea.focus();
}
