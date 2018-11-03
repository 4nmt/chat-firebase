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
    console.log(users);

    return (
      <div>
        <div className="container clearfix">
          <PeopleList {...this.props[0]} />
          <div className="chat">
            <ChatHeader />
            <ChatHistory />
            <ChatMessage />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
