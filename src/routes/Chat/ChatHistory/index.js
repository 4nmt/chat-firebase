import React, { Component } from "react";
// import "./ChatHistory.scss";
import "../index.scss";

class ChatHistory extends Component {
  render() {
    let { messages, auth, users, yourUID } = this.props;
    if (!messages) return <div>Loading...</div>;
    if (yourUID === "") return <div className="chat-history" />;
    const yourUser = users.find(val => val.key === yourUID);
    const messageAuth = messages.find(val => val.key === auth.uid);
    if (!messageAuth || !messageAuth.value[yourUID])
      return <div className="chat-history" />;

    const messageList = Object.values(messageAuth.value[yourUID]);

    let ChatList = messageList.map((msgDetails, i) => {
      if (msgDetails.from === auth.uid) {
        let image;
        if (msgDetails.type === "image") {
          image = (
            <img
              src={msgDetails.message}
              alt="images"
              style={{ width: "100px" }}
            />
          );
        }

        return (
          <li className="clearfix">
            <div className="message-data align-right">
              <span className="message-data-time">10:10 AM, Today</span> &nbsp;
              &nbsp;
              <span className="message-data-name">{auth.displayName}</span>{" "}
              <i className="fa fa-circle me" />
            </div>

            {image ? (
              image
            ) : (
              <div className="message other-message float-right">
                {" "}
                {msgDetails.message}{" "}
              </div>
            )}
          </li>
        );
      } else {
        return (
          <li>
            <div className="message-data">
              <span className="message-data-name">
                <i className="fa fa-circle online" />{" "}
                {yourUser.value.displayName}
              </span>
              <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message my-message">{msgDetails.message}</div>
          </li>
        );
      }
    });

    return (
      <div className="chat-history">
        <ul>{ChatList}</ul>
      </div>
    );
  }
}

export default ChatHistory;
