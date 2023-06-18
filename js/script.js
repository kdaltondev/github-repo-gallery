const overview = document.querySelector(".overview");
const gitUserName = "kdaltondev";
const repoList = document.querySelector(".repo-list");

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

const getRepoList = async function(){
    console.log("Get repo list");
    const repoInfo = await fetch(`https://api.github.com/users/${gitUserName}/repos?sort=update&per_page=100`);
  const repoData = await repoInfo.json();
  console.log(repoData);
  displayRepoInfo(repoData);
}

displayRepoInfo = function (repoData){
    for (let i=0; i<repoData.length; i++){
        console.log(`${repoData[i].name}`)
        const li = document.createElement("li");
        li.innerHTML = `<h3 class="repo">${repoData[i].name}<h3>`;
        repoList.append(li);
        console.log(repoList);


    }
}
