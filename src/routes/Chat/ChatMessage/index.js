import React from "react";
import "../index.scss";
import Dropzone from "react-dropzone";

const ChatMessage = ({ sendMessages, onFilesDrop, file, imagePreviewUrl }) => {
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
        onClick={() => {
          if (imagePreviewUrl !== "") {
            let reader = new FileReader();
            reader.onloadend = () => {
              console.log(reader.result);
              sendMessages(reader.result, "image");
            };

            reader.readAsDataURL(file);
          } else {
            sendMessages(input.value, "text");
            input.value = "";
          }
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatMessage;
