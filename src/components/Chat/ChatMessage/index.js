import React, { Component } from "react";

import "./ChatMessage.scss";

class ChatMessage extends Component {
  render() {
    return (
      <div className="chat-message clearfix">
        <textarea
          name="message-to-send"
          id="message-to-send"
          placeholder="Type your message"
          rows="3"
        />
        <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o" />
        <button>Send</button>
      </div>
    );
  }
}

export default ChatMessage;
