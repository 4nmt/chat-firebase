import React, { Component } from "react";
import "./PeopleList.scss";

const PeopleList = ({ auth, startChat, users }) => {
  users = users.filter(user => user.key !== auth.uid);
  console.log(users);

  users = users.sort(
    (a, b) => b.value.closestChatTime - a.value.closestChatTime
  );

  return (
    <div className="people-list" id="people-list">
      <div className="search">
        <input type="text" placeholder="search" />
        <i className="fa fa-search" />
      </div>
      <ul className="list">
        {users.map((data, i) => {
          return (
            <li
              className="clearfix"
              key={i}
              onClick={() => startChat(data.key)}
            >
              <img src={data.value.avatarUrl} alt="avatar" />
              <div className="about" style={{ marin: "0px" }}>
                <div className="name">{data.value.displayName}</div>
                <div className="status">
                  <i className="fa fa-circle online" /> {data.value.online}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PeopleList;
