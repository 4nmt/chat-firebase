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
  withProps(({ users, auth, stars }) => {
    const peoplePriority = stars.filter(star => {
      return Object.values(star.value).some(val => {
        return val.from === auth.uid;
      });
    });

    const userPriority = users.filter(user => {
      return peoplePriority.some(val => val.key === user.key);
    });

    let userList = users.filter(user => {
      return !userPriority.includes(user);
    });

    userList = userList
      .filter(user => user.key !== auth.uid)
      .sort((a, b) => b.value.closestChatTime - a.value.closestChatTime);

    return {
      users: [...userPriority, ...userList]
    };
  }),

  withStateHandlers(
    // Setup initial state
    ({
      initYourUID = "",
      users,
      iconStatus = false,
      file,
      imagePreviewUrl = ""
    }) => {
      if (users && users.length > 0 && users[0].key) initYourUID = users[0].key;
      return {
        yourUID: initYourUID,
        filterUsers: users,
        iconStatus: iconStatus,
        imagePreviewUrl: imagePreviewUrl,
        file: file
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
      },

      onFilesDrop: ({ imagePreviewUrl, file }) => files => {
        return {
          file: files[0],
          imagePreviewUrl: URL.createObjectURL(files[0])
        };
      },

      clearImage: ({ imagePreviewUrl, file }) => () => {
        return {
          file: null,
          imagePreviewUrl: ""
        };
      }
    }
  ),
  withHandlers({
    sendMessages: props => async (message, type) => {
      let imageLink;
      if (type === "image" && typeof message !== "string") {
        const storageRef = props.firebase.storage().ref();
        const fileRef = storageRef.child("messages_images/" + message.name);
        const snap = await fileRef.put(message, {
          contentType: message.type
        });

        imageLink = await snap.ref.getDownloadURL();
        console.log(imageLink);
      }

      props.firebase.push(`/messages/${props.auth.uid}/${props.yourUID}`, {
        from: props.auth.uid,
        message: imageLink ? imageLink : message,
        type: type
      });

      props.firebase.push(`/messages/${props.yourUID}/${props.auth.uid}`, {
        from: props.auth.uid,
        message: imageLink ? imageLink : message,
        type: type
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
