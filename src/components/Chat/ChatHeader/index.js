import React, { Component } from "react";
import "./ChatHeader.scss";

class ChatHeader extends Component {
  render() {
    return (
      <div className="chat-header clearfix">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
          alt="avatar"
        />

        <div className="chat-about">
          <div className="chat-with">Chat with Vincent Porter</div>
          <div className="chat-num-messages">already 1 902 messages</div>
        </div>
        <i className="fa fa-star" />
      </div>
    );
  }
}

export default ChatHeader;
