const overview = document.querySelector(".overview");
const gitUserName = "kdaltondev";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepoBtn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const getUserInfo = async function () {
  const info = await fetch(`https://api.github.com/users/${gitUserName}`);
  const data = await info.json();
  console.log(data);
  displayUserInfo(data);
  /*const repoInfo = await fetch(`https://api.github.com/users/${gitUserName}/repos`);
  const repoData = await repoInfo.json();
  console.log(repoData);*/
  getRepoList();
};

getUserInfo(gitUserName);

displayUserInfo = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerHTML = ` 
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(userInfo);
};

const getRepoList = async function () {
  console.log("Get repo list");
  const repoInfo = await fetch(
    `https://api.github.com/users/${gitUserName}/repos?sort=update&per_page=100`
  );
  const repoData = await repoInfo.json();
  console.log(repoData);
  displayRepoInfo(repoData);
};

displayRepoInfo = function (repoData) {
  filterInput.classList.remove("hide");
  for (let i = 0; i < repoData.length; i++) {
    console.log(`${repoData[i].name}`);
    const li = document.createElement("li");
    li.innerHTML = `<h3 class="repo">${repoData[i].name}<h3>`;
    repoList.append(li);
    console.log(repoList);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    console.log(repoName);
    getSpecificRepoInfo(repoName);
  } else {
    console.log("This is it");
  }
});

getSpecificRepoInfo = async function (repoName) {
  const specificRepoInfo = await fetch(
    `https://api.github.com/repos/${gitUserName}/${repoName}`
  );
  const specificRepoData = await specificRepoInfo.json();
  console.log(specificRepoData);
  const fetchLanguages = await fetch(
    `https://api.github.com/repos/${gitUserName}/${repoName}/languages`
  );
  const languageData = await fetchLanguages.json();
  let languages = [];
  for (let key in languageData) {
    languages.push(key);
  }
  console.log(languages);
  displaySpecificRepoInfo(specificRepoData, languages);
  /*for (i=0; i<specificRepoData.languages.length; i++){
languages.push(specificRepoData.languages[i]);
console.log(languages);
  }*/
};

displaySpecificRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  const displayRepoData = document.createElement("div");
  displayRepoData.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
<p>Description: ${repoInfo.description}</p>
<p>Default Branch: ${repoInfo.default_branch}</p>
<p>Languages: ${languages.join(", ")}</p>
<a class="visit" href="${
    repoInfo.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
  repoData.append(displayRepoData);
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  backToRepoBtn.classList.remove("hide");
};

backToRepoBtn.addEventListener("click", function () {
  repoData.classList.add("hide");
  repos.classList.remove("hide");
  backToRepoBtn.classList.add("hide");
  /*filterInput.value = "";*/
});

filterInput.addEventListener("input", function (e) {
  console.log(e.target.value);
  const reposAll = document.querySelectorAll(".repo");
  console.log(reposAll.length);
  let searchText = e.target.value;
  let searchTextLower = searchText.toLowerCase();
  for (let i = 0; i < reposAll.length; i++) {
    let repoName = reposAll[i].innerText;
    let repoLowerCaseName = repoName.toLowerCase();
    if (repoLowerCaseName.includes(searchTextLower)) {
      reposAll[i].parentElement.classList.remove("hide");
    } else {
      reposAll[i].parentElement.classList.add("hide");
    }
    console.log(repoLowerCaseName);
  }
  console.log(searchTextLower);
});
