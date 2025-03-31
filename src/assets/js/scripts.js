import { Menu } from "./_module/Menu";
import { Tabs } from "./_module/Tabs";

function init() {
  window.addEventListener("DOMContentLoaded", () => {
    const tabs = new Tabs();
    const menu = new Menu();
  });
}

init();
