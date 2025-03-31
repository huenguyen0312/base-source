export class Menu {
  constructor() {
    this.init();
  }

  private init() {
    const mediaQuery = window.matchMedia("(max-width: 980px)");
    this.openMenuMobile();
    this.resizeBrowser(mediaQuery);
    this.addEventHoverOnNavLink(mediaQuery);
  }

  private openMenuMobile() {
    const menuMobile = document.querySelector(".js-menu-button");
    menuMobile.addEventListener("click", () => {
      const ariaExpanded = menuMobile.getAttribute("aria-expanded");
      menuMobile.setAttribute(
        "aria-expanded",
        ariaExpanded === "true" ? "false" : "true",
      );
    });
  }

  private resizeBrowser(mediaQuery) {
    window.addEventListener("resize", () => {
      if (mediaQuery.matches) {
        // console.log('Mobile');
        const navList = document.querySelector(".header-nav-list");
        navList.style.display = "none";

        setTimeout(() => {
          navList.style.display = null;
        }, 300);
      } else {
        // console.log('Desktop');
        const menuMobile = document.querySelector(".js-menu-button");
        menuMobile.setAttribute("aria-expanded", "false");
      }
    });
  }

  private addEventHoverOnNavLink(mediaQuery) {
    const navItems = document.querySelectorAll(".header-nav-item");
    navItems.forEach((navItem) => {
      const submenuList = navItem.querySelector(".header-sub-nav");
      if (submenuList) {
        navItem.addEventListener("mouseover", () => {
          if (!mediaQuery.matches) {
            const navLink = navItem.querySelector(".header-nav-link");
            if (navLink.getAttribute("aria-expanded") === "false") {
              navLink.setAttribute("aria-expanded", "true");
            }
          }
        });
        navItem.addEventListener("mouseout", () => {
          if (!mediaQuery.matches) {
            const navLink = navItem.querySelector(".header-nav-link");
            if (navLink.getAttribute("aria-expanded") === "true") {
              navLink.setAttribute("aria-expanded", "false");
            }
          }
        });
      }
    });
  }
}
