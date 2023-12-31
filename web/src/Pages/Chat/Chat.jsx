import React, { useRef, useEffect, useState } from "react";
import "./Chat.css";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = process.env.REACT_APP_BASE_URL;

export const Chat = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [update, setUpdate] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setChat(null);
  }, [id, update]);

  useEffect(() => {
    axios(`${url}/get/chat/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setChat(res.data);
        localStorage.setItem(id, JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, update]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const option = {
      text: e.target.text.value,
      to: id,
    };

    const config = {
      method: "post",
      url: `${url}/send/message`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(option),
    };

    axios(config)
      .then((res) => {
        console.log(res?.data);
        setUpdate(!update);
        e.target.reset();
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header__info">
          <h1>{chat?.user?.fullname || "Loading..."}</h1>
          <span style={!chat ? { display: "none" } : {}}>
            last seen at {new Date(chat?.user?.lastActive).toLocaleTimeString()}
          </span>

          <span style={chat ? { display: "none" } : {}}>
            last seen at 00:00:00
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
              style={!chat ? { display: "none" } : {}}
              key={message._id}
              ref={messagesEndRef}
              className={
                message.to !== id ? "chat_msg_box left" : "chat_msg_box right"
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
