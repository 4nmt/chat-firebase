import React, { Component } from "react";
import PeopleList from "./PeopleList";
import ChatHistory from "./ChatHistory";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import { isLoaded } from "react-redux-firebase";
import "./index.scss";

class Chat extends Component {
  render() {
    const { users } = this.props[0];
    if (!isLoaded(users)) {
      return <div>Loading...</div>;
    }
    console.log(this.props[0]);

    return (
      <div>
        <div className="container clearfix">
          <PeopleList {...this.props[0]} />
          <div className="chat">
            <ChatHeader {...this.props[0]} />
            <ChatHistory {...this.props[0]} />
            <ChatMessage {...this.props[0]} />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
