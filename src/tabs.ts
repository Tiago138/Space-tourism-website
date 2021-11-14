const tabList = document.querySelector('[role="tablist"]') as HTMLElement;
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach(tab => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e: KeyboardEvent) {
  const keydownLeft = "ArrowLeft";
  const keydownRight = "ArrowRight";

  if (e.code === keydownLeft || e.code === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", "-1");

    if (e.code === keydownRight) {
      tabFocus++;

      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.code === keydownLeft) {
      tabFocus--;

      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute("tabindex", "0");
    (tabs[tabFocus] as HTMLElement).focus();
  }
}

function changeTabPanel(e: Event) {
  const targetTab = e.target;
  const targetPanel = (targetTab as HTMLElement).getAttribute("aria-controls");
  const targetImage = (targetTab as HTMLElement).getAttribute("data-image");

  const tabContainer = (targetTab as HTMLElement).parentNode;
  const mainContainer = (tabContainer as HTMLElement).parentNode;

  tabContainer
    ?.querySelector('[aria-selected="true"]')
    ?.setAttribute("aria-selected", "false");

  (targetTab as HTMLElement).setAttribute("aria-selected", "true");

  hideContent(mainContainer as HTMLElement, "[role='tabpanel']");
  showContent(mainContainer as HTMLElement, `#${targetPanel}`);

  hideContent(mainContainer as HTMLElement, "picture");
  showContent(mainContainer as HTMLElement, `#${targetImage}`);
}

function hideContent(parent: HTMLElement, content: string) {
  parent
    .querySelectorAll(content)
    .forEach(item => item.setAttribute("hidden", "true"));
}

function showContent(parent: HTMLElement, content: string) {
  parent.querySelector(content)?.removeAttribute("hidden");
}
