let currentTab = "all";
const active = ["btn", "btn-primary"];
const inActive = ["btn", "btn-soft", "btn-primary"];

const switchTab = (tab) => {
  const allTab = ["all", "open", "closed"];

  for (const tabs of allTab) {
    const tabName = document.getElementById(tabs + "-btn");

    if (tabs === tab) {
      tabName.classList.remove(...inActive);
      tabName.classList.add(...active);
    } else {
      tabName.classList.remove(...active);
      tabName.classList.add(...inActive);
    }
  }
};

switchTab(currentTab);

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("all-issues").classList.add("hidden");
    document.getElementById("issue-info").classList.add("hidden");
  } else {
    document.getElementById("all-issues").classList.remove("hidden");
    document.getElementById("issue-info").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const allBtnClicked = () => {
  switchTab("all");
  loadAllIssue();
};

const openBtnClicked = () => {
  switchTab("open");
  openIssues();
};

const closedBtnClick = () => {
  switchTab("closed");
  closedIssues();
};

const loadAllIssue = () => {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};

const getPriorityClass = (priority) => {
  if (priority === "high") {
    return "bg-[#FEECEC] border-[#FECACA] text-[#EF4444]";
  } else if (priority === "medium") {
    return "bg-[#FDE0A0] border-[#FDE0A0] text-[#F59E0B]";
  } else {
    return "bg-[#DADCE1] border-[#DADCE1] text-[#9CA3AF]";
  }
};

const displayIssues = (issues) => {
  numberOfIssues(issues);
  // 1.get the container and empty it
  const allIssueContainer = document.getElementById("all-issue-container");
  allIssueContainer.innerHTML = "";
  // 2. get into every issues
  for (let issue of issues) {
    // 3. create element
    const btnAll = document.createElement("div");
    btnAll.innerHTML = `
            <div onclick="loadIssueDetails(${issue.id})">
          <div  class="shadow-sm ${issue.status === "closed" ? "border-purple-500 border-t-4" : "border-green-500 border-t-4"} rounded-md px-5 py-4">
            <div class="flex justify-between items-center mb-4">
              <div>
                <img src="${issue.status === "closed" ? "./assets/Closed-Status.png" : "./assets/Open-Status.png"}" alt="" />
              </div>
              <button
                class="uppercase rounded-full px-5 py-1  ${getPriorityClass(issue.priority)}"
              >
                ${issue.priority}
              </button>
            </div>
            <h2 class="font-semibold text-xl">
              ${issue.title}
            </h2>
            <p class="text-gray-500 my-3">
              ${issue.description}
            </p>

            <div class="flex justify-start items-start gap-2">
              <button
                class="border-2 border-[#FECACA] rounded-full px-1  bg-[#FEECEC]"
                >
                <span class="text-[#EF4444] ">${issue.labels[0]}</span>
              </button>
              <button
                class="border-2 border-[#FDE68A] rounded-full px-1  bg-[#FFF8DB]"
                >
                <span class="text-[#D97706]">${issue.labels[1]}</span>
              </button>
            </div>
          </div>
          <div class="shadow-sm rounded-md px-5 py-2 text-[#64748B]">
            <p class="mb-2">${issue.author}</p>
            <p> ${issue.createdAt} </p>
          </div>
        </div>
        `;
    // 4. append it to the container
    allIssueContainer.append(btnAll);
  }
  manageSpinner(false);
};

const numberOfIssues = (issues) => {
  document.getElementById("issue-number").innerText = issues.length + " Issues";
};

const loadIssueDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayIssueDetails(details.data);
};

const displayIssueDetails = (issue) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <h2 class="font-bold text-2xl mb-4">${issue.title}</h2>
          <div class="flex gap-5 items-center mb-4">
            <p class="rounded-full px-2 text-white ${issue.status === "closed" ? "bg-purple-500" : "bg-green-500"}">${issue.status}</p>
            <p class="font-light text-[12px] text-gray-500">
              Opened by <span class="font-semibold text-black">${issue.author}</span>
            </p>
            <p class="font-light text-[12px] text-gray-500">${issue.createdAt}</p>
          </div>
          <div class="flex justify-start items-start gap-2 mb-4">
            <div>
              <p
                class="border-2 border-[#FECACA] rounded-full px-3 py-1 bg-[#FEECEC]"
              >
                
                <span class="text-[#EF4444]">${issue.labels[0]}</span>
              </p>
            </div>
            <div>
              <p
                class="border-2 border-[#FDE68A] rounded-full px-3 py-1 bg-[#FFF8DB]"
              >
            
                <span class="text-[#D97706]">${issue.labels[1]}</span>
              </p>
            </div>
          </div>

          <p class="text-gray-500 font-light mb-4">
            ${issue.description}
          </p>

          <div
            class="flex justify-start gap-20 bg-base-200 rounded-md px-10 py-4"
          >
            <div class="">
              <p class="text-gray-500 font-light">Assignee:</p>
              <h2 class="font-semibold">${issue.assignee}</h2>
            </div>

            <div class="">
              <p class="text-gray-500 font-light">Priority:</p>
              <a class="rounded-full px-4 py-1  ${getPriorityClass(issue.priority)}">${issue.priority}</a>
            </div>
          </div>
    `;

  document.getElementById("issue_modal").showModal();
};

const openIssues = () => {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const issue = data.data;

      // filter open issues
      const openIssues = issue.filter((issue) => issue.status === "open");
      displayOpenIssues(openIssues);
      numberOfIssues(openIssues);
    });
};

const displayOpenIssues = (openIssues) => {
  const openIssuesContainer = document.getElementById("all-issue-container");
  openIssuesContainer.innerHTML = "";

  for (let issue of openIssues) {
    // 3. create element
    const btnOpen = document.createElement("div");
    btnOpen.innerHTML = `
     <div onclick="loadIssueDetails(${issue.id})">
          <div class="shadow-sm ${"border-green-500 border-t-4"} rounded-md px-5 py-4">
            <div class="flex justify-between items-center mb-4">
              <div>
                <img src="${"./assets/Open-Status.png"}" alt="" />
              </div>
              <button
                class="uppercase rounded-full px-5 py-1  ${getPriorityClass(issue.priority)}"
              >
                ${issue.priority}
              </button>
            </div>
            <h2 class="font-semibold text-xl">
              ${issue.title}
            </h2>
            <p class="text-gray-500 my-3">
              ${issue.description}
            </p>

            <div class="flex justify-start items-start gap-2">
              <button
                class="border-2 border-[#FECACA] rounded-full px-1 bg-[#FEECEC]"
                >
                <span class="text-[#EF4444]">${issue.labels[0]}</span>
              </button>
              <button
                class="border-2 border-[#FDE68A] rounded-full px-1 bg-[#FFF8DB]"
                >
                <span class="text-[#D97706] ">${issue.labels[1]}</span>
              </button>
            </div>
          </div>
          <div class="shadow-sm rounded-md px-5 py-2 text-[#64748B]">
            <p class="mb-2">${issue.author}</p>
            <p> ${issue.createdAt} </p>
          </div>
        </div>
    `;
    // append it
    openIssuesContainer.append(btnOpen);
  }
  manageSpinner(false);
};

const closedIssues = () => {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const issue = data.data;
      //   console.log(issue);

      // filter open issues
      const closedIssues = issue.filter((issue) => issue.status === "closed");

      displayClosedIssues(closedIssues);
      numberOfIssues(closedIssues);
    });
};

const displayClosedIssues = (closedIssues) => {
  const closedIssuesContainer = document.getElementById("all-issue-container");
  closedIssuesContainer.innerHTML = "";

  for (let issue of closedIssues) {
    // 3. create element
    const btnClosed = document.createElement("div");
    btnClosed.innerHTML = `
     <div onclick="loadIssueDetails(${issue.id})">
          <div  class="shadow-sm ${"border-purple-500 border-t-4"} rounded-md px-5 py-4">
            <div class="flex justify-between items-center mb-4">
              <div>
                <img src="${"./assets/Closed-Status.png"}" alt="" />
              </div>
              <button
                class="uppercase rounded-full px-5 py-1  ${getPriorityClass(issue.priority)}"
              >
                ${issue.priority}
              </button>
            </div>
            <h2 class="font-semibold text-xl">
              ${issue.title}
            </h2>
            <p class="text-gray-500 my-3">
              ${issue.description}
            </p>

            <div class="flex justify-start items-start gap-2">
              <button
                class="border-2 border-[#FECACA] rounded-full px-1 bg-[#FEECEC]"
                >
                <span class="text-[#EF4444] ">${issue.labels[0]}</span>
              </button>
              <button
                class="border-2 border-[#FDE68A] rounded-full px-1 bg-[#FFF8DB]"
                >
                <span class="text-[#D97706]">${issue.labels[1]}</span>
              </button>
            </div>
          </div>
          <div class="shadow-sm rounded-md px-5 py-2 text-[#64748B]">
            <p class="mb-2">${issue.author}</p>
            <p> ${issue.createdAt} </p>
          </div>
        </div>
    `;
    // append it
    closedIssuesContainer.append(btnClosed);
  }
  manageSpinner(false);
};

loadAllIssue();

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("search-input");
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const allIssue = data.data;
      const filterIssue = allIssue.filter((issue) =>
        issue.title.toLowerCase().includes(searchValue),
      );
      displayIssues(filterIssue);
    });
});
