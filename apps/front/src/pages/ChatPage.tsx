import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { css } from "../../styled-system/css";
import { hstack, vstack } from "../../styled-system/patterns";
import Card from "../components/utils/Card/Card";
import Input from "../components/utils/Input/Input";
import Button from "../components/utils/Button/Button";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface SocketUser {
  userID: string;
  username: string;
  self?: boolean;
  messages?: string[];
}

type Message = {
  content: string;
  from?: string;
};

export default function ChatPage(): JSX.Element {
  const { user } = useAuth();

  const [users, setUsers] = useState<SocketUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const selectedUser = users.find(({ userID }) => userID === selectedUserId);

  const [messages, setMessages] = useState<Message[]>([]);

  const {
    register: registerMessage,
    handleSubmit: handleSubmitMessage,
    control,
  } = useForm<FieldValues>();

  useEffect(() => {
    if (user) {
      socket.auth = { username: user.username };
      socket.connect();
    }

    socket.on("users", (data: SocketUser[]) => {
      const newUsers = data.map((user) => ({
        ...user,
        self: user.userID === socket.id,
      }));
      setUsers(newUsers);
    });

    socket.on("user connected", (user) => {
      setUsers((users) => [...users, user]);
    });

    console.log(users);

    socket.on("private message", ({ content, from }) => {
      setMessages((messages) => [...messages, { content, from }]);
    });

    return () => {
      socket.off();
    };
  }, [user]);

  useEffect(() => {
    setMessages([]);
  }, [selectedUserId]);

  const onSubmitMessage: SubmitHandler<FieldValues> = ({ message }) => {
    if (selectedUser) {
      console.log("send", selectedUser, message);
      socket.emit("private message", {
        content: message,
        to: selectedUser.userID,
      });

      setMessages((messages) => [...messages, { content: message }]);
    }
  };

  return (
    <>
      <div className={vstack({ alignItems: "left" })}>
        <h2 className={css({ textStyle: "title" })}>Chat</h2>
        <div className={hstack({ gap: "2rem" })}>
          <Card>
            <h2 className={css({ textStyle: "title" })}>Participants</h2>
            <div className={vstack({ gap: 4, alignItems: "left" })}>
              {selectedUser && (
                <p className={css({ textStyle: "body" })}>
                  {selectedUser.username}
                </p>
              )}
              {users && (
                <ul>
                  {users.map(({ userID, username, self }) => {
                    return (
                      <li
                        onClick={(): void => setSelectedUserId(userID)}
                        className={css({
                          textStyle: "body",
                          cursor: "pointer",
                        })}
                        key={userID}
                      >
                        {userID} : {username} {self && <span>(moi)</span>}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Card>
          <Card>
            <div className={vstack({ alignItems: "start" })}>
              <h2 className={css({ textStyle: "title" })}>Messages</h2>
              {messages && (
                <ul>
                  {messages.map((message, index) => {
                    const otherUser = users.find(
                      (user) => message.from === user.userID,
                    );

                    return (
                      <li
                        className={vstack({
                          textStyle: "body",
                          alignItems: "start",
                          gap: "0",
                        })}
                        key={index}
                      >
                        <span className={css({ fontWeight: "bold" })}>
                          {otherUser ? otherUser.username : user?.username}
                        </span>
                        <p>{message.content}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
              <form
                onSubmit={handleSubmitMessage(onSubmitMessage)}
                className={hstack({ alignItems: "end" })}
              >
                <Input
                  label="message"
                  register={registerMessage}
                  control={control}
                />
                <Button type="submit">Envoyer</Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
