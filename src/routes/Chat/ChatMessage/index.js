import React from "react";
import "../index.scss";
import Dropzone from "react-dropzone";

const ChatMessage = ({
  sendMessages,
  onFilesDrop,
  file,
  imagePreviewUrl,
  clearImage
}) => {
  let input = "";
  return (
    <div className="chat-message clearfix">
      {imagePreviewUrl !== "" ? (
        <img
          src={imagePreviewUrl}
          alt="imageMessage"
          style={{ width: "100px" }}
        />
      ) : (
        <textarea
          name="message-to-send"
          id="message-to-send"
          placeholder="Type your message"
          rows="3"
          ref={node => (input = node)}
        />
      )}
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={onFilesDrop}
        style={{ border: "none", width: "fit-content" }}
      >
        <i className="far fa-file-image fa-lg" />{" "}
      </Dropzone>
      <button
        onClick={async () => {
          if (imagePreviewUrl !== "") {
            sendMessages(file, "image");
            clearImage();
          } else {
            var img = new Image();
            img.onload = () => {
              alert("aa");
              sendMessages(input.value, "image");
            };
            img.onerror = () => {
              alert("aa");

              sendMessages(input.value, "text");
            };
            img.src = input.value;
          }
        }}
      >
        Send
      </button>
    </div>
  );
};

// function checkURL(url) {
//   return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
// }

// function imageExists(image_url) {
//   var http = new XMLHttpRequest();

//   http.open("HEAD", image_url, false);
//   http.send();

//   return http.status !== 404;
// }
// const checkImage = imageSrc => {
//   var img = new Image();
//   img.onload = () => {
//     return true;
//   };
//   img.onerror = () => {
//     return false;
//   };
//   img.src = imageSrc;
// };

export default ChatMessage;
