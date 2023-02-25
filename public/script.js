const url = "http://localhost:3000/users";
const app = document.querySelector(".app");
const registerBtn = document.querySelector(".register-btn");

// Updating User Interface
const updateUser = (userInfo) => {
  const usersDiv = document.createElement("div");
  usersDiv.classList.toggle("usersDiv");
  userInfo.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.toggle("userDiv");
    userDiv.innerHTML += `
        <div class="btn-container">
          <div class="user-name">${user.name}</div>
          <div class="btn-box">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
            id="${user.id}"
            onclick="updateBtn(event)"
          >
            updateUserInfo
          </button>
          <button type="button" class="btn btn-danger" id="${user.id}" onclick="deleteUser(event)">delete</button>
          </div>
        </div>
      `;
    usersDiv.append(userDiv);
  });
  app.append(usersDiv);
};

// Register User
registerBtn.addEventListener("click", async () => {
  const userName = document.querySelector("#name").value;
  const userEmail = document.querySelector("#email").value;
  const userAge = document.querySelector("#age").value;
  const newUser = { name: userName, email: userEmail, age: userAge };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#age").value = "";
  app.innerHTML = "";
  updateUser(data);
});

// Deleting User
const deleteUser = async (event) => {
  const id = event.target.id;
  const url = `http://localhost:3000/users/${id}`;
  const selectedId = { id: id };
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedId),
  });
  const data = await response.json();
  app.innerHTML = "";
  updateUser(data);
};

// updateBtn
let checkId;
const updateBtn = (event) => {
  checkId = event.target.id;
};

// updateUserInfo
const updateUserInfo = async () => {
  const name = document.querySelector(".userName").value;
  const email = document.querySelector(".userEmail").value;
  const age = document.querySelector(".userAge").value;
  const newUser = { name, email, age, id: checkId };
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  document.querySelector(".userName").value = "";
  document.querySelector(".userEmail").value = "";
  document.querySelector(".userAge").value = "";
  app.innerHTML = "";
  updateUser(data);
};

// Fetching Data From Server;
const fetchUser = async () => {
  const response = await fetch(url);
  const data = await response.json();
  updateUser(data);
};

fetchUser();
