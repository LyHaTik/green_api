const apiBase = "https://api.green-api.com";

async function callApi(endpoint, method = "GET", body = null) {
  const idInstance = document.getElementById("idInstance").value;
  const apiToken = document.getElementById("apiToken").value;

  if (!idInstance || !apiToken) {
    alert("Please provide idInstance and ApiTokenInstance!");
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

function sendMessage() {
  const chatId = document.getElementById("chatId").value;
  const textMessage = document.getElementById("textmessage").value;
  if (!chatId) {
    alert("Please provide Chat ID!");
    return;
  }
  if (!textMessage) {
    alert("Введите сообщение!");
    return;
  }
  const body = {
    chatId,
    textMessage,
  };
  callApi("sendMessage", "POST", body);
}

function sendFileByUrl() {
  const chatId = document.getElementById("chatId").value;
  const urlFile = document.getElementById("fileUrl").value;
  if (!chatId || !urlFile) {
    alert("Please provide Chat ID and File URL!");
    return;
  }
  if (!urlFile) {
    alert("Добавьте ссылку!");
    return;
  }
  const body = {
    chatId,
    urlFile,
    fileName: "file.pdf",
    caption: "Check out this file!",
  };
  callApi("sendFileByUrl", "POST", body);
}
