import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import React, { useState } from "react";
import "./Chat.css";
import axios from "./axios";
function Chat({ messages }) {
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/api/messages/new", {
      message: InputMessage,
      name: "Rayyan Alam",
      timestamp: new Date().toUTCString(),
      received: true,
    });
    setInputMessage("");
  };
  const [InputMessage, setInputMessage] = useState("");
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Name</h3>
          <p>Last Seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__reciever"}`}
          >
            <span className="chat__name"> {message.name}</span>
            {message.message}
            <span className="chat__timestamp"> {message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            value={InputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;
