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

export default function ChatPage(): JSX.Element {
  const { user } = useAuth();

  const [users, setUsers] = useState<SocketUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const selectedUser = users.find(({ userID }) => userID === selectedUserId);

  const { register: registerMessage, handleSubmit: handleSubmitMessage } =
    useForm<FieldValues>();

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

    return () => {
      socket.off();
    };
  }, [user]);

  // useEffect(() => {}, [selectedUser]);

  const onSubmitMessage: SubmitHandler<FieldValues> = ({ message }) => {
    if (selectedUser) {
      socket.emit("private message", { message, to: selectedUserId });
      // setSelectedUser(selectedUser => {
      //   ...selectedUser,
      //   messages: [

      //   ]
      // })
    }
  };

  return (
    <>
      <Card>
        <div className={vstack({ gap: 4, alignItems: "left" })}>
          <h2 className={css({ textStyle: "title" })}>Chat</h2>
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
                    className={css({ textStyle: "body", cursor: "pointer" })}
                    key={userID}
                  >
                    {userID} : {username} {self && <span>(moi)</span>}
                  </li>
                );
              })}
            </ul>
          )}
          <form
            onSubmit={handleSubmitMessage(onSubmitMessage)}
            className={hstack({ alignItems: "end" })}
          >
            <Input label="message" register={registerMessage} />
            <Button type="submit">Envoyer</Button>
          </form>
        </div>
      </Card>
    </>
  );
}
