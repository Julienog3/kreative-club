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
}

export default function ChatPage(): JSX.Element {
  const { user } = useAuth();

  const [users, setUsers] = useState<SocketUser[]>([]);

  const { register: registerMessage, handleSubmit: handleSubmitMessage } =
    useForm<FieldValues>();

  useEffect(() => {
    if (user) {
      socket.auth = { username: user.username };
      socket.connect();
    }

    socket.on("users", (data) => {
      console.log("users", data);
      setUsers(data);
    });

    socket.on("user connected", (user) => {
      console.log("user", user);
      setUsers([...users, user]);
    });

    return () => {
      socket.off();
    };
  }, []);

  const onSubmitMessage: SubmitHandler<FieldValues> = ({ message }) => {
    socket.emit("chat", { message });
  };

  return (
    <>
      <Card>
        <div className={vstack({ gap: 4, alignItems: "left" })}>
          <h2 className={css({ textStyle: "title" })}>Chat</h2>
          {users && (
            <ul>
              {users.map((user) => {
                return (
                  <li className={css({ textStyle: "body" })} key={user.userID}>
                    {user.userID} : {user.username}
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
