import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import Card from "../components/utils/Card/Card";
import { hstack, vstack } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import ButtonWithLink from "../components/utils/ButtonWithLink/ButtonWithLink";

export default function UsersPage(): JSX.Element {
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  return (
    <>
      <Card>
        <div className={vstack({ gap: 4, alignItems: "left" })}>
          <h2 className={css({ textStyle: "title" })}>Utilisateurs</h2>
          <ul>
            {users &&
              users.map(({ id, username }) => {
                return <li key={id}>{username}</li>;
              })}
          </ul>
          <div className={hstack()}>
            <ButtonWithLink to="/">Home</ButtonWithLink>
            <ButtonWithLink to="/users/add">Adding user</ButtonWithLink>
          </div>
        </div>
      </Card>
    </>
  );
}
