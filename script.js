const clearBtn = document.getElementById("clear-btn");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

function displayMessages() {
    chatBox.innerHTML = "";
    messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message";
        div.textContent = msg;
        chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {
    const message = input.value.trim();
    if(message) {
        messages.push(message);
        localStorage.setItem("chatMessages", JSON.stringify(messages));
        input.value = "";
        displayMessages();
    }
});

// Press Enter to send
input.addEventListener("keypress", e => {
    if(e.key === "Enter") sendBtn.click();
});

displayMessages();
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("chatMessages");
    messages = [];
    displayMessages();
});
