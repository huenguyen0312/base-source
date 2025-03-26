import { Tabs } from "./_module/Tabs";

function init() {
  const selectObserver = new SelectObserver();
  selectObserver.start();

  window.addEventListener("DOMContentLoaded", () => {
    const tabs = new Tabs();
  });
}

init();
