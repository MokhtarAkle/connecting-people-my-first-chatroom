var socket = io({ autoConnect: false });

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  let userDisplay = document.querySelector("#user-container")
  let usernameAlreadySelected = false;
  let chatDisplay = document.querySelector("#chat-container")

  function hideScreen(){
    if(usernameAlreadySelected){
      chatDisplay.style.display = "flex";
    }
    else{
      chatDisplay.style.display = "none";
    }
  }

  hideScreen();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

  });

  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
      initReactiveProperties(user);
    });
    // put the current user first, and then sort by username
    this.users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
  });
  
  function onUsernameSelection(username) {
    this.usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
  }