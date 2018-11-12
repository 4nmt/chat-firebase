import React, { Component } from "react";
// import "./ChatHeader.scss";
import "../index.scss";

const ChatHeader = ({ auth, users, stars, yourUID, starUsers, iconStatus }) => {
  const user = users.find(user => user.key === yourUID);
  console.log(stars);

  const userIsStared = stars.find(star => star.key === yourUID);
  let userStar = { iconStatus: false };
  if (userIsStared) {
    console.log(userIsStared);
    userStar = Object.values(userIsStared.value).find(
      val => val.from === auth.uid
    );
    console.log(userStar);
  }
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
