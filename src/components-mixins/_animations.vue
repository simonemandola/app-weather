<template>
  <div style="display: none"></div>
</template>
<script>
export default {
  name: "Animations",
  mounted() {
    // Fade Up Animation
    if (document.querySelector(".fade-up")) {
      // Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            entry.target.classList.add("fade-up-active");
          }
        });
      });
      const elements = document.querySelectorAll(".fade-up");
      elements.forEach((el) => {
        observer.observe(el);
      });
    }
    // Fade Right Animation
    if (document.querySelector(".fade-right")) {
      // Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            entry.target.classList.add("fade-right-active");
          }
        });
      });
      const elements = document.querySelectorAll(".fade-right");
      elements.forEach((el) => {
        observer.observe(el);
      });
    }
  },
};
</script>
