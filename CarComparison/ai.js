document.addEventListener("DOMContentLoaded", () => {
    let messageContainer = document.getElementById("message-container");
    let sendBtn = document.getElementById("send");
    let userInput = document.getElementById("user-input");

    sendBtn.addEventListener("click", async () => {
        const message = userInput.value;
        if (!message) {
            return;
        }

        addMessage(message, "User");
        message = "";
        loadingScreen();
        await sendMessage(message);
    })
})


async function sendMessage(myMessage) {
    try {
        const response = await fetch("http://localhost:3000/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: myMessage })
            })
        if (!response.ok) {
            throw new Error()
        }
        removeLoading();
        const data = await response.json();
        addMessage(data.response, "AI")
    }
    catch (error) {
        addMessage("Sorry, something went wrong!", "AI");
    }
}

async function addMessage(message, sender) {
    const messageBox = document.createElement("div");
    if (sender === "AI") {
        messageBox.className = "bot-message";
    }
    else {
        messageBox.className = "user-message"
    }
    messageBox.innerHTML = `<strong>${sender}</strong>${message}</h3>`
    messageContainer.appendChild(messageBox);
}

function loadingScreen() {
    const loading = document.createElement("div");
    loading.id = "loading";
    loading.innerHTML = `<strong>AI: </strong>Thinking, please wait....</h3>`;
    messageContainer.appendChild(loading);
}

function removeLoading() {
    const loading = document.getElementById("loading");
    loading.remove();
}
