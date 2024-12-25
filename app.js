const apiBase = "https://api.green-api.com";

async function callApi(endpoint, method = "GET", body = null) {
  const idInstance = document.getElementById("idInstance").value;
  const apiToken = document.getElementById("apiToken").value;

  if (!idInstance || !apiToken) {
    alert("Введите idInstance и ApiTokenInstance!");
    return;
  }

  const url = `${apiBase}/waInstance${idInstance}/${endpoint}/${apiToken}`;
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    document.getElementById("response").value = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("response").value = `Error: ${error.message}`;
  }
}

function getSettings() {
  callApi("getSettings");
}

function getStateInstance() {
  callApi("getStateInstance");
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phoneNumber);
}

function sendMessage() {
  const chatId = document.getElementById("chatId").value;
  const chatIdError = document.getElementById("chatIdError");
  const textMessage = document.getElementById("textmessage").value;
  if (!isValidPhoneNumber(chatId)) {
    chatIdError.style.display = "block";
    return;
  } else {
    chatIdError.style.display = "none";
  }
  if (!textMessage) {
    alert("Введите сообщение!");
    return;
  }
  const body = {
    chatId: `${chatId}@c.us`,
    message: textMessage,
  };
  callApi("sendMessage", "POST", body);
}

function sendFileByUrl() {
  const chatId = document.getElementById("chatId").value;
  const urlFile = document.getElementById("fileUrl").value;
  if (!isValidPhoneNumber(chatId)) {
    chatIdError.style.display = "block";
    return;
  } else {
    chatIdError.style.display = "none";
  }
  if (!urlFile) {
    alert("Добавьте ссылку!");
    return;
  }
  const body = {
    chatId: `${chatId}@c.us`,
    urlFile,
    fileName: "file.pdf",
  };
  callApi("sendFileByUrl", "POST", body);
}
