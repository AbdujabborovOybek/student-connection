import React, { useRef, useEffect } from "react";
import "./Chat.css";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";

export const Chat = () => {
  const { id } = useParams();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [id]);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header__info">
          <h1>{chat.user.name}</h1>
          <span>
            last seen at {new Date(chat.user.lastActivete).toLocaleTimeString()}
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

      <form className="chat_send">
        <input
          type="text"
          required
          placeholder="Message"
          autoComplete="off"
          autoFocus
        />

        <button>
          <IoSend />
        </button>
      </form>
    </div>
  );
};

const chat = {
  user: {
    _id: "3wedsvg456bgf5",
    name: "Maxliyo Karimova",
    username: "maxliyo_k",
    phone: "+998 99 999 99 99",
    lastActivete: "2023-08-12T08:12:00.000Z",
  },

  messages: [
    {
      _id: "3wd45gf5",
      userId: "3wedsvg456bgf5",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto ullam tempore expedita? Iste totam eaque nemo nulla aliquid ipsam officiis nihil reiciendis,",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },

    {
      _id: "3wd45gf8",
      userId: "3wedsvg456bgf5",
      text: " Iusto ullam tempore expedita? Iste totam eaque nemo nulla aliquid ipsam officiis nihil reiciendis,",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },
    {
      _id: "3wd453245d",
      userId: "3wedsvg456bgf5",
      text: " Iusto ullam tempore expedita? Iste totam eaque nemo nulla aliquid ipsam",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: "2021-08-12T08:16:55.000Z",
    },

    {
      _id: "3wd453245d45fs",
      userId: "3wedsvg456bgf",
      text: "Nimaga bugun kech qoldingiz ?",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },
    {
      _id: "3wd4535d4s",
      userId: "3wedsvg456bgf",
      text: "Keldingizmi ?",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },
    {
      _id: "3wd454rw3245d",
      userId: "3wedsvg456bgf5",
      text: "Mashina bozordaman",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: "2021-08-12T08:16:55.000Z",
    },
    {
      _id: "3wd45gf5",
      userId: "3wedsvg456bgf5",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto ullam tempore expedita? Iste totam eaque nemo nulla aliquid ipsam officiis nihil reiciendis,",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },

    {
      _id: "3wd45gf8",
      userId: "3wedsvg456bgf5",
      text: " Iusto ullam tempore expedita? Iste totam eaque nemo nulla aliquid ipsam officiis nihil reiciendis,",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },
    {
      _id: "3wd453245d",
      userId: "3wedsvg456bgf5",
      text: " Iusto ullam tempore expedita? Iste totam eaque nemo nulla aliquid ipsam",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: "2021-08-12T08:16:55.000Z",
    },

    {
      _id: "3wd453245d45fs",
      userId: "3wedsvg456bgf",
      text: "Nimaga bugun kech qoldingiz ?",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },
    {
      _id: "3wd4535d4s",
      userId: "3wedsvg456bgf",
      text: "Keldingizmi ?",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: null,
    },
    {
      _id: "3wd454rw3245d",
      userId: "3wedsvg456bgf5",
      text: "Mashina bozordaman",
      createdAt: "2021-08-12T08:12:00.000Z",
      updatedAt: "2021-08-12T08:16:55.000Z",
    },
  ],
};
