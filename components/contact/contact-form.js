import React, { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
import { ERROR_CODE, STATUS } from "@/constants/common";

const showErrorMessageHandler = (code) => {
  switch (code) {
    case ERROR_CODE.invalid_input:
      return "Invalid input";
    case ERROR_CODE.store_message_failed:
      return "Storing message failed";
    case ERROR_CODE.not_connect_database:
      return "Could not connect to database";
  }
};

export default function ContactForm() {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messageInputRef = useRef();
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      email: emailInputRef.current.value,
      name: nameInputRef.current.value,
      message: messageInputRef.current.value,
    };

    // Call api
    setRequestStatus(STATUS.PENDING);

    // const res = await axios.post("/api/contact", message);

    // if (res.data.ok) {
    //   setRequestStatus("success");

    //   emailInputRef.current.value = "";
    //   nameInputRef.current.value = "";
    //   messageInputRef.current.value = "";
    // } else {
    //   let message = showErrorMessageHandler(res.data.code);

    //   setRequestError(message);
    //   setRequestStatus("error");
    // }

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setRequestStatus(STATUS.SUCCESS);

          emailInputRef.current.value = "";
          nameInputRef.current.value = "";
          messageInputRef.current.value = "";
        } else {
          let message = showErrorMessageHandler(data.code);

          setRequestError(message);
          setRequestStatus(STATUS.ERROR);
        }
      })
      .catch((err) => {
        let message = showErrorMessageHandler(err.code);

        setRequestError(message);
        setRequestStatus(STATUS.ERROR);
      });
  };

  useEffect(() => {
    if (requestStatus === STATUS.SUCCESS || requestStatus === STATUS.ERROR) {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === STATUS.SUCCESS) {
    notification = {
      status: STATUS.SUCCESS,
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === STATUS.ERROR) {
    notification = {
      status: STATUS.ERROR,
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            ref={messageInputRef}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
