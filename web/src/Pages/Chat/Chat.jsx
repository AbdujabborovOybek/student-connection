import React, { useRef, useEffect, useState } from "react";
import "./Chat.css";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const Chat = () => {
  const [chat, setChat] = useState(null);
  const [update, setUpdate] = useState(false);
  const { id } = useParams();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [id]);

  useEffect(() => {
    axios(`${url}/get/chat/${id}`)
      .then((res) => {
        console.log(res.data);
        setChat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, update]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("user"));

    const option = {
      text: e.target.text.value,
      from: data._id,
      to: id,
    };

    const config = {
      method: "post",
      url: `${url}/send/message`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(option),
    };

    axios(config)
      .then((res) => {
        console.log(res.data);
        setUpdate(!update);
        e.target.reset();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header__info">
          <h1>{chat?.user?.fullname}</h1>
          <span>
            last seen at {new Date(chat?.user.lastActive).toLocaleTimeString()}
          </span>
        </div>

        <div className="chat_header__action">
          <button>
            <BiSearch />
          </button>
          <button>
            <BsThreeDots />
          </button>
        </div>
      </div>

      <div className="chat_body">
        {chat?.messages?.map((message) => {
          const date = new Date(message.createdAt).toLocaleString();
          const updatedAt = new Date(message.updatedAt).toLocaleString();

          return (
            <div
              ref={messagesEndRef}
              className={
                message.userId === id
                  ? "chat_msg_box left"
                  : "chat_msg_box right"
              }
            >
              <p>
                <span>{message.text}</span>
                <i>{message?.updatedAt ? `updated at: ${updatedAt}` : date}</i>
              </p>
            </div>
          );
        })}
      </div>

      <form className="chat_send" onSubmit={handleSendMessage}>
        <input
          type="text"
          required
          placeholder="Message"
          autoComplete="off"
          autoFocus
          name="text"
        />

        <button>
          <IoSend />
        </button>
      </form>
    </div>
  );
};
