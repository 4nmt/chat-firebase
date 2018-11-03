import React, { Component } from "react";
import "./PeopleList.scss";

const PEOPLE_DATA = [
  {
    src:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg",
    name: "Vincent Porter",
    status_icon: "online",
    status_text: "online"
  },
  {
    src:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg",
    name: "Vincent Porter",
    status_icon: "online",
    status_text: "online"
  },
  {
    src:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg",
    name: "Vincent Porter",
    status_icon: "online",
    status_text: "online"
  },
  {
    src:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg",
    name: "Vincent Porter",
    status_icon: "online",
    status_text: "online"
  }
];

const PeopleList = ({ users }) => (
  <div className="people-list" id="people-list">
    <div className="search">
      <input type="text" placeholder="search" />
      <i className="fa fa-search" />
    </div>
    <ul className="list">
      {users.map(data => (
        <li className="clearfix">
          <img src={data.value.avatarUrl} alt="avatar" />
          <div className="about">
            <div className="name">{data.value.displayName}</div>
            <div className="status">
              <i className="fa fa-circle online" /> online
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default PeopleList;
