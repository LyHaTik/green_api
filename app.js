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
  const body = {
    chatId: "79268205228@c.us", // Replace with the actual chat ID
    message: "Hello from GREEN-API!",
  };
  callApi("sendMessage", "POST", body);
}

function sendFileByUrl() {
  const body = {
    chatId: "79268205228@c.us", // Replace with the actual chat ID
    urlFile: "https://example.com/file.pdf", // Replace with the file URL
    fileName: "file.pdf",
    caption: "Check out this file!",
  };
  callApi("sendFileByUrl", "POST", body);
}
