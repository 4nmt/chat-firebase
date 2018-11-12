import React from "react";
import "../index";

// import "./PeopleList.scss";

const PeopleList = ({ searchUsers, startChat, users, filterUsers }) => {
  let input = "";
  return (
    <div className="people-list" id="people-list">
      <div className="search">
        <input
          type="text"
          placeholder="search"
          ref={node => (input = node)}
          onChange={() => searchUsers(users, input.value)}
        />
        <i className="fa fa-search" />
      </div>
      <ul className="list">
        {filterUsers.map((data, i) => {
          const iconStatus =
            data.value.onClick === "online" ? (
              <i className="fa fa-circle online" />
            ) : (
              <i className="fa fa-circle offline" />
            );
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
                  {iconStatus} {data.value.online}
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
