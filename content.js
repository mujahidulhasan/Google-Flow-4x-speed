(async () => {

  const settings = await chrome.storage.local.get(["enabled"]);

  if (settings.enabled === false) {
    return;
  }

  document.documentElement.classList.add("flow-cleaner-enabled");

  function disableVideoAutoplay() {

    document.querySelectorAll("video").forEach(video => {

      try {

        video.pause();

        video.autoplay = false;
        video.loop = false;

        video.removeAttribute("autoplay");

        video.preload = "metadata";

        video.addEventListener("mouseenter", (e) => {
          e.stopImmediatePropagation();
          video.pause();
        }, true);

        video.addEventListener("mouseover", (e) => {
          e.stopImmediatePropagation();
          video.pause();
        }, true);

      } catch (err) {}

    });

  }

  function hidePlayIcons() {

    document
      .querySelectorAll(".material-icons, .google-symbols")
      .forEach(icon => {

        const text = icon.textContent || "";

        if (
          text.includes("play_circle") ||
          text.includes("play_arrow")
        ) {
          icon.style.display = "none";
        }

      });

  }

  function removeInlineAnimations() {

    document.querySelectorAll("*").forEach(el => {

      try {

        el.style.animation = "none";
        el.style.transition = "none";

        if (el.style.transform?.includes("translate")) {
          el.style.transform = "none";
        }

        if (el.style.filter?.includes("blur")) {
          el.style.filter = "none";
        }

        if (el.style.backdropFilter) {
          el.style.backdropFilter = "none";
        }

      } catch (err) {}

    });

  }

  function cleanBannerVideos() {

    document.querySelectorAll("video[autoplay]")
      .forEach(video => {

        try {
          video.pause();
          video.autoplay = false;
        } catch (err) {}

      });

  }

  function runCleaner() {

    disableVideoAutoplay();

    hidePlayIcons();

    removeInlineAnimations();

    cleanBannerVideos();

  }

  runCleaner();

  const observer = new MutationObserver(() => {
    runCleaner();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

})();
