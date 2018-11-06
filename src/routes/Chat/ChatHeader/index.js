import React, { Component } from "react";
import "./ChatHeader.scss";
import { userInfo } from "os";

const ChatHeader = ({ users, yourUID }) => {
  const user = users.find(user => user.key === yourUID);
  return (
    <div className="chat-header clearfix">
      <img src={user.value.avatarUrl} alt="avatar" />
      <div className="chat-about">
        <div className="chat-with">Chat with {user.value.displayName}</div>
      </div>
      <i className="fa fa-star" />
    </div>
  );
};

export default ChatHeader;
