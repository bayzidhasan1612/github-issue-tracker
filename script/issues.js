let currentTab = "all";
const active = ["btn", "btn-primary"];
const inActive = ["btn", "btn-soft", "btn-primary"];

const switchTab = (tab) => {
  // console.log(tab);

  const allTab = ["all", "open", "closed"];

  for (const tabs of allTab) {
    const tabName = document.getElementById(tabs + "-btn");
    // console.log(tabName);

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
};

const loadAllIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};

// {
//     "id": 30,
//     "title": "Fix timezone display issues",
//     "description": "Timestamps are showing in UTC instead of user's local timezone. Need to add timezone conversion.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "good first issue"
//     ],
//     "priority": "low",
//     "author": "time_tony",
//     "assignee": "",
//     "createdAt": "2024-01-17T16:00:00Z",
//     "updatedAt": "2024-01-17T16:00:00Z"
// }
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
  //   console.log(issues);
  // 1.get the container and empty it
  const allIssueContainer = document.getElementById("all-issue-container");
  allIssueContainer.innerHTML = "";
  // 2. get into every issues
  for (let issue of issues) {
    // 3. create element
    const btnAll = document.createElement("div");
    btnAll.innerHTML = `
            <div>
          <div class="shadow-sm ${issue.status === "closed" ? "border-purple-500 border-t-4" : "border-green-500 border-t-4"} rounded-md px-5 py-4">
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
                class="border-2 border-[#FECACA] rounded-full px-3 py-1 bg-[#FEECEC]"
                ><span class="text-[#EF4444]"
                  ><i class="fa-solid fa-bug"></i
                ></span>
                <span class="text-[#EF4444] font-semibold">BUG</span>
              </button>
              <button
                class="border-2 border-[#FDE68A] rounded-full px-3 py-1 bg-[#FFF8DB]"
                ><span class="text-[#D97706]"
                  ><i class="fa-solid fa-life-ring"></i
                ></span>
                <span class="text-[#D97706] font-semibold">HELP WANTED</span>
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
};

const openIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const issue = data.data;
      console.log(issue);

      // filter open issues
      const openIssues = issue.filter((issue) => issue.status === "open");
      displayOpenIssues(openIssues);
    });
};

const displayOpenIssues = (openIssues) => {
  console.log(openIssues);

  const openIssuesContainer = document.getElementById("all-issue-container");
  openIssuesContainer.innerHTML = "";

  for (let issue of openIssues) {
    // 3. create element
    const btnOpen = document.createElement("div");
    btnOpen.innerHTML = `
     <div>
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
                class="border-2 border-[#FECACA] rounded-full px-3 py-1 bg-[#FEECEC]"
                ><span class="text-[#EF4444]"
                  ><i class="fa-solid fa-bug"></i
                ></span>
                <span class="text-[#EF4444] font-semibold">BUG</span>
              </button>
              <button
                class="border-2 border-[#FDE68A] rounded-full px-3 py-1 bg-[#FFF8DB]"
                ><span class="text-[#D97706]"
                  ><i class="fa-solid fa-life-ring"></i
                ></span>
                <span class="text-[#D97706] font-semibold">HELP WANTED</span>
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
};

loadAllIssue();
