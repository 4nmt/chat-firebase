import React from "react";
// import "./ChatHeader.scss";
import "../index.scss";

const ChatHeader = ({ auth, users, stars, yourUID, starUsers }) => {
  const user = users.find(user => user.key === yourUID);
  const userIsStared = stars.find(star => star.key === yourUID);
  let userStar;
  if (userIsStared) {
    userStar = Object.values(userIsStared.value).find(
      val => val.from === auth.uid
    );
  }
  if (!userStar) userStar = { iconStatus: false };
  return (
    <div className="chat-header clearfix">
      <img src={user.value.avatarUrl} alt="avatar" />
      <div className="chat-about">
        <div className="chat-with">Chat with {user.value.displayName}</div>
      </div>
      <i
        className={`fa fa-star ${
          userStar.iconStatus ? "fa-star-is-clicked fa-spin" : ""
        } `}
        onClick={() => starUsers(!userStar.iconStatus, yourUID)}
      />
    </div>
  );
};

export default ChatHeader;
