const loadIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllIssue(data.data));
};

const displayAllIssue = (issues) => {
    console.log(issues);
    // 1.get the container and empty it
    const allIssueContainer = document.getElementById("all-issue-container");
    // allIssueContainer.innerHTML= "";
    // 2. get into every issues
    for(let issue of issues){

    }

    

    // 3. create element
    // 4. append it to the container
};


loadIssue();
