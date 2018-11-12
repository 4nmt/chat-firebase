import { withHandlers, withStateHandlers, compose, withProps } from "recompose";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { spinnerWhileLoading } from "../../utils/component";

export default compose(
  firebaseConnect(["users", "messages", "stars"]),
  connect(({ firebase: { auth, ordered } }) => {
    return {
      users: ordered.users,
      messages: ordered.messages,
      stars: ordered.stars,
      auth
    };
  }),
  spinnerWhileLoading(["users", "messages", "stars", "auth"]),
  withProps(({ users, auth }) => ({
    users: users
      .filter(user => user.key !== auth.uid)
      .sort((a, b) => b.value.closestChatTime - a.value.closestChatTime)
  })),

  withStateHandlers(
    // Setup initial state
    ({ initYourUID = "", users, iconStatus = false }) => {
      if (users[0].key) initYourUID = users[0].key;
      return {
        yourUID: initYourUID,
        filterUsers: users,
        iconStatus: iconStatus
      };
    },
    {
      startChat: ({ yourUID }) => (yourUID, iconStatus) => ({
        yourUID: yourUID,
        iconStatus: iconStatus
      }),
      searchUsers: ({ filterUsers }) => (users, name) => {
        return {
          filterUsers: users.filter(user =>
            user.value.displayName.toLowerCase().includes(name.toLowerCase())
          )
        };
      }
      // starUsers: ({ iconStatus }) => (iconStatus, yourUID) => {
      //   return {
      //     iconStatus: iconStatus
      //   };
      // }
    }
  ),
  withHandlers({
    sendMessages: props => message => {
      props.firebase.push(`/messages/${props.auth.uid}/${props.yourUID}`, {
        from: props.auth.uid,
        message: message
      });

      props.firebase.push(`/messages/${props.yourUID}/${props.auth.uid}`, {
        from: props.auth.uid,
        message: message
      });

      const currentTime = new Date();
      props.firebase.set(
        `/users/${props.yourUID}/closestChatTime`,
        currentTime.getTime()
      );
    },

    starUsers: props => (iconStatus, yourUID) => {
      let isExist = false;
      props.stars.forEach(star => {
        if (star.key === yourUID) {
          Object.keys(star.value).forEach(key => {
            props.firebase.update(`/stars/${yourUID}/${key}/`, {
              from: props.auth.uid,
              iconStatus: iconStatus
            });
          });
          isExist = true;
        }
      });
      if (!isExist) {
        props.firebase.push(`/stars/${yourUID}/`, {
          from: props.auth.uid,
          iconStatus: iconStatus
        });
      }
    },

    setOnlineStatus: props => () => {
      console.log(props);
      let currentTime = new Date();

      const miliSecondOfDay = 24 * 60 * 60 * 1000;
      const miliSecondOfHour = 60 * 60 * 1000;
      const miliSecondOfMinute = 60 * 1000;
      props.firebase.set(`/users/${props.auth.uid}/online`, "online");

      props.users.forEach(user => {
        let leftStatus = "";

        let leftTime = Math.abs(currentTime.getTime() - user.value.leftTime);
        let diffTime = Math.ceil(leftTime / miliSecondOfMinute);

        if (diffTime < 60) {
          leftStatus = `left ${diffTime} minutes ago`;
        } else {
          let diffTime = Math.ceil(leftTime / miliSecondOfHour);
          if (diffTime < 24) {
            leftStatus = `left ${diffTime} hours ago`;
          } else {
            let diffTime = Math.ceil(leftTime / miliSecondOfDay);
            if (diffTime < 30) {
              leftStatus = `left ${diffTime} days ago`;
            } else {
              const leftDay = new Date(props.users[0].value.leftTime);
              leftStatus = `offline since ${leftDay.getMonth()}/${leftDay.getDay()}`;
            }
          }
        }
        props.firebase.set(`/users/${user.key}/online`, leftStatus);
      });
    }
  })
);
