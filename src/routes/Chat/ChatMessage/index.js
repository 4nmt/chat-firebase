import React, { Component } from "react";

import "../index.scss";

const ChatMessage = ({ sendMessages }) => {
  let input = "";
  return (
    <div className="chat-message clearfix">
      <textarea
        name="message-to-send"
        id="message-to-send"
        placeholder="Type your message"
        rows="3"
        ref={node => (input = node)}
      />
      <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
      <i className="fa fa-file-image-o" />
      <button
        onClick={() => {
          sendMessages(input.value);
          input.value = "";
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatMessage;
