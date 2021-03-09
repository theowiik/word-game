const webSocket = new WebSocket(
  process.env.NODE_ENV == "production"
    ? "ws:///ws/players"
    : "ws://localhost:8080/ws/players"
);

webSocket.onerror = function (event) {
  onError(event);
};

webSocket.onopen = function (event) {
  onOpen(event);
};

webSocket.onmessage = function (event) {
  onMessage(event);
};

function onMessage(event) {
  const eventPayload = JSON.parse(event.data);
  console.log(eventPayload);
}

function onOpen(event) {
  console.log("Established connection");
}

function onError(event) {
  alert("An error occurred:" + event.data);
}

export function send() {
  const payload = {
    name: "Spelare 1",
    color: "peach",
  };

  webSocket.send(JSON.stringify(payload));
}
