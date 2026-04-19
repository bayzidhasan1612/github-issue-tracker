let currentTab = "all";
const active = ["btn", "btn-primary"];
const inActive = ["btn", "btn-soft", "btn-primary"];

const switchTab = (tab) => {
  // console.log(tab);

  const allTab = ["all", "open", "closed"];

  for (const tabs of allTab) {
    const tabName = document.getElementById(tabs + "-btn");
    console.log(tabName);

    if (tabs === tab) {
      tabName.classList.remove(...inActive);
      tabName.classList.add(...active);
    } else {
        tabName.classList.remove(...active);
        tabName.classList.add(...inActive);
    }
  }
};
