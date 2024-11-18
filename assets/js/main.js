/*=============== Theme Switching ===============*/

const themeMap = {
  dark: "light",
  light: "dark",
};

const theme = localStorage.getItem("theme") || "dark";
document.body.classList.add(theme);

function toggleTheme() {
  const current = localStorage.getItem("theme");
  const next = themeMap[current] || "dark";

  document.body.classList.replace(current, next);
  localStorage.setItem("theme", next);
}

// Safely add event listener
const themeButton = document.getElementById("themeButton");
if (themeButton) {
  themeButton.onclick = toggleTheme;
}


/*=============== handle chat input ===============*/
// Get references to elements
const sendButton = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const mainBody = document.querySelector(".border"); // Element where messages will be displayed

// Function to create and append a message
function addMessageToBody(message, sender = "user") {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.classList.add("chat-message", sender); // Add classes based on the sender
  mainBody.appendChild(messageElement);

  // Optionally: Scroll to the latest message
  mainBody.scrollTop = mainBody.scrollHeight;
}

// Event listener for sending the message
sendButton.addEventListener("click", function () {
  const message = userInput.value.trim(); // Get input text and remove unnecessary spaces

  if (message) {
    addMessageToBody(message, "user"); // Add user message
    userInput.value = ""; // Clear input field after sending the message

    // Simulate a response
    setTimeout(() => {
      addMessageToBody("This is a sample response!", "response");
    }, 500); // Add a slight delay for realism
  }
});

// Optional: Handle "Enter" keypress for sending
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendButton.click(); // Trigger the click event
    event.preventDefault(); // Prevent form submission if in a form
  }
});


/*=============== Utility Functions ===============*/
/* Add a message with avatar */
function addMessageToBody(message, sender = "user") {
  // Create message container
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("chat-message-container", sender);

  // Create avatar container
  const avatar = document.createElement("div");
  avatar.classList.add("chat-avatar");

  // Check sender and create the appropriate SVG avatar
  const avatarSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  avatarSVG.setAttribute("viewBox", "0 0 512 512");

  if (sender === "user") {
    avatar.classList.add("chat-avatar-user"); // Apply user avatar style
    avatarSVG.innerHTML = `
      <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"/>
    `;
  } else {
    avatar.classList.add("chat-avatar-model"); // Apply model avatar style
    avatarSVG.innerHTML = `
      <path d="M208.5 62.3l28.1-36.9C248.8 9.4 267.8 0 288 0c28.5 0 53.6 18.7 61.8 46l17.8 59.4c10.3 34.4 36.1 62 69.8 74.6l39.8 14.9c20.9 7.9 34.8 27.9 34.8 50.2c0 16.9-7.9 32.8-21.5 42.9l-67.3 50.5c-24.3 18.2-37.2 47.9-33.8 78.1l2.5 22.7c4.3 38.7-26 72.6-65 72.6c-14.8 0-29.3-5.1-40.8-14.3l-55.4-44.3c-4.5-3.6-9.3-6.7-14.5-9.2c-15.8-7.9-33.7-10.4-51-7.3L82.4 451.9C47.8 458.2 16 431.6 16 396.5c0-13.2 4.7-26 13.1-36.2l11.2-13.4c14.6-17.4 22.6-39.4 22.6-62.1c0-18.8-5.5-37.2-15.8-53L8.8 173.5C3.1 164.7 0 154.4 0 143.9c0-33.4 30.1-58.8 63-53.2l51.3 8.7c35.9 6.1 72.2-8.2 94.2-37.1z"/>
    `;
  }

  avatar.appendChild(avatarSVG);

  // Create message bubble
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.classList.add("chat-message");

  // Add avatar and message to the container
  messageContainer.appendChild(avatar);
  messageContainer.appendChild(messageElement);

  // Append message container to the chat body
  mainBody.appendChild(messageContainer);

  // Scroll to the latest message
  mainBody.scrollTop = mainBody.scrollHeight;
}

const inputField = document.querySelector('.chat-input');

// Function to auto-resize the textarea
function autoResizeTextarea() {
  // Reset height to auto to recalculate the height
  inputField.style.height = 'auto';
  
  // Set the height to the scrollHeight to expand the field based on content
  inputField.style.height = inputField.scrollHeight + 'px';
}

// Add event listener to adjust height on input
inputField.addEventListener('input', autoResizeTextarea);

// Set initial height
autoResizeTextarea();
