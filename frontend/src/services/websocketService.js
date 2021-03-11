import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createStompClient = (endpoint, subscribeTo, messageCallback, connectCallback) => {
  const socket = new SockJS(endpoint);
  const stompClient = Stomp.over(socket);

  try {
    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      stompClient.subscribe(subscribeTo, messageCallback);
      connectCallback()
    });
    return stompClient;
  } catch (error) {
    throw new Error("Could not connect to the websocket");
  }
};

export const sendWebsocketMessage = (
  stompClient,
  endpoint,
  message,
  headers = {}
) => {
  stompClient.send(endpoint, headers, JSON.stringify(message));
};
