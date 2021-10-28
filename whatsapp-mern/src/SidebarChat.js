import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
function SidebarChat() {
  return (
    <div className="sidebarchat">
      <Avatar />
      <div className="sidebarchat__info">
        <h2>Title</h2>
        <p> Last Message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
