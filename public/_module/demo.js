function DocsColorSelect() {
  const docsColorSelect = document.querySelector(
    '[data-demo="docs-color-select"]',
  );

  if (!docsColorSelect) return;

  const colors = ["white", "whitesmoke", "lightgray"];

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("data-demo-docs-select-color", color);
    button.setAttribute("aria-label", color);
    button.setAttribute("title", color);
    button.style.color = color;
    button.style.backgroundColor = color;
    docsColorSelect.appendChild(button);
  });

  const colorButtons = docsColorSelect.querySelectorAll("button");

  function setDocsColor(color) {
    const selectColor = "--demo-docs-select-color";
    let bgColor = "white";

    if (localStorage.getItem("DEMO_DOC_BACKGROUND")) {
      bgColor = localStorage.getItem("DEMO_DOC_BACKGROUND");
    } else {
      bgColor = color;
    }

    document.documentElement.style.setProperty(selectColor, bgColor);

    colorButtons.forEach((button) => {
      if (button.getAttribute("data-demo-docs-select-color") === bgColor) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  setDocsColor();

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const select = button.getAttribute("data-demo-docs-select-color");
      localStorage.setItem("DEMO_DOC_BACKGROUND", select);
      setDocsColor(select);
    });
  });
}

function HeaderMenu() {
  const headerMenu = document.querySelector('[data-demo="header-menu"]');

  if (!headerMenu) return;

  const menus = [
    { key: "_module/default", href: "./default.html", label: "default" },
    {
      key: "_module/basic-parts",
      href: "./basic-parts.html",
      label: "BasicParts",
    },
    {
      key: "_module/custom-parts",
      href: "./custom-parts.html",
      label: "CustomParts",
    },
    { key: "_module/other", href: "./other.html", label: "Other" },
    { key: "_module/form", href: "./form.html", label: "Form" },
    { key: "_module/search", href: "./search.html", label: "Search" },
  ];

  menus.forEach((menu) => {
    const link = document.createElement("a");
    link.href = menu.href;
    link.innerHTML = menu.label;
    headerMenu.appendChild(link);
  });

  const currentPath = location.pathname;
  headerMenu.querySelectorAll("a").forEach((menu, index) => {
    if (currentPath.includes(menus[index].key)) {
      menu.setAttribute("aria-current", "true");
    }
  });
}

function ScrollHidingNavBar() {
  const navbar = document.querySelector('[data-demo="navbar"]');

  if (!navbar) return;

  let prevScrollTop = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;
  
    if (currentScrollTop > prevScrollTop) {
      navbar.setAttribute('data-scroll', 'hidden');
    } else {
      navbar.removeAttribute('data-scroll');
    }
  
    prevScrollTop = currentScrollTop;
  });
}

function SectionAnchorNavigation() {
  const navbarMenu = document.querySelector('[data-demo="navbar-menu"]');

  if (!navbarMenu) return;

  document
    .querySelectorAll(':is([data-demo="section-container"],[data-demo="section-container-fluid"])')
    .forEach(function (a) {
      const id = a.getAttribute("id");
      const label = id.replace(/^m-/, "");
      const link = document.createElement("a");
      link.href = "#" + id;
      link.innerHTML = label;
      navbarMenu.appendChild(link);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  DocsColorSelect();
  HeaderMenu();
  SectionAnchorNavigation();
  ScrollHidingNavBar();
});
