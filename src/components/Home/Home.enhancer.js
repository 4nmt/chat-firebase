import { withHandlers, withStateHandlers, pure, compose } from "recompose";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { spinnerWhileLoading } from "../../utils/component";

export default compose(
  firebaseConnect(["users", "messages"]),
  connect(({ firebase: { auth, ordered } }) => ({
    users: ordered.users,
    messages: ordered.messages,
    auth
  })),
  spinnerWhileLoading(["users", "messages", "auth"]),
  withStateHandlers(
    // Setup initial state
    ({ initYourUID = "ZlA4zHLl62Ud2EgtxsTJffNZTkt1" }) => ({
      yourUID: initYourUID
    }),
    {
      startChat: ({ yourUID }) => value => ({
        yourUID: value
      })
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

    setOnlineStatus: props => () => {
      console.log(props);
      let currentTime = new Date();

      const miliSecondOfDay = 24 * 60 * 60 * 1000;
      const miliSecondOfHour = 60 * 60 * 1000;
      const miliSecondOfMinute = 60 * 1000;

      props.users.forEach(user => {
        let leftStatus = "";

        if (user.key === props.auth.uid) {
          props.firebase.set(`/users/${props.auth.uid}/online`, "online");
        } else {
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
        }
      });
    }
  })
);
