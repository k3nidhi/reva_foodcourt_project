window.addEventListener("scroll", () => {
    const scrollers = document.querySelectorAll(".scroll-animate");
    scrollers.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("opacity-100", "translate-y-0");
      }
    });
  });
  