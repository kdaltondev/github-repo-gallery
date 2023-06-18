const overview = document.querySelector(".overview");
const gitUserName = "kdaltondev";

const getUserInfo = async function () {
  const info = await fetch(`https://api.github.com/users/${gitUserName}`);
  const data = await info.json();
  console.log(data);
  displayUserInfo(data);
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
