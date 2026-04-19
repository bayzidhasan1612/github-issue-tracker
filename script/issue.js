let currentTab = "all";

const switchTab = (btn) => {
  console.log(btn);

  const allBtn = ["all", "open", "closed"];

  for (const btn of allBtn) {
    const btnName = document.getElementById(btn + "-btn");

    if (btn === allBtn) {
        btnName.classList.add("active")
    }
  }
};

const loadIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllIssue(data.data));
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

const displayAllIssue = (issues) => {
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
          <div class="shadow-sm rounded-md px-5 py-4">
            <div class="flex justify-between items-center mb-4">
              <div>
                <img src="./assets/Open-Status.png" alt="" />
              </div>
              <button
                class="border-[#FECACA] rounded-full px-10 py-1 bg-[#FEECEC] text-[#EF4444]"
              >
                HIGH
              </button>
            </div>
            <h2 class="font-semibold text-xl">
              ${issue.title}
            </h2>
            <p class="text-gray-500 my-3">
              ${issue.description}
            </p>

            <div class="flex justify-start items-start gap-2">
              <a
                class="border-2 border-[#FECACA] rounded-full px-3 py-1 bg-[#FEECEC]"
                ><span class="text-[#EF4444]"
                  ><i class="fa-solid fa-bug"></i
                ></span>
                <span class="text-[#EF4444] font-semibold">BUG</span>
              </a>
              <a
                class="border-2 border-[#FDE68A] rounded-full px-3 py-1 bg-[#FFF8DB]"
                ><span class="text-[#D97706]"
                  ><i class="fa-solid fa-life-ring"></i
                ></span>
                <span class="text-[#D97706] font-semibold">HELP WANTED</span>
              </a>
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

loadIssue();
