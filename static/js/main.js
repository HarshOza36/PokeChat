const socket = io(); //Calling io method of Socketio
const chatMessages = document.querySelector(".chat-messages");
const chatForm = document.getElementById("chat-form");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//Use URl to get username and Chat room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//Join the chatroom
socket.emit("joinRoom", { username, room });

//Get all users in the room
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//Catch the emit from server
socket.on("msg", (message) => {
  // console.log(message);
  showMsg(message);

  //Automatic Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//When message Submits
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  //Send(emit) a message to server
  socket.emit("chatMsg", msg);

  //To clear the input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//DOM manipulation to output the message
function showMsg(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

//Add room name and users to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join("")}
   `;
}
