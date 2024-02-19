export { Page };

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/user";
import Card from "../../components/utils/Card/Card";
import { hstack, vstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import ButtonWithLink from "../../components/utils/ButtonWithLink/ButtonWithLink";
import { useEffect } from "react";
import { useSnackbarStore } from "../../components/layout/Snackbar/Snackbar.store";

function Page(): JSX.Element {
  const addItem = useSnackbarStore(({ addItem }) => addItem);
  const { data: users, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (error) {
      addItem({
        type: "danger",
        message: error.message,
      });
    }
  }, [error]);

  return (
    <>
      <Card>
        <div className={vstack({ gap: 4, alignItems: "left" })}>
          <h2 className={css({ textStyle: "title" })}>Utilisateurs</h2>
          {users && users?.length > 0 && (
            <ul className={vstack({ gap: "1rem", alignItems: "left" })}>
              {users.map((user) => {
                return (
                  <li
                    className={hstack({
                      textStyle: "body",
                      gap: "1rem",
                      alignItems: "center",
                    })}
                    key={user.id}
                  >
                    {user.email}
                  </li>
                );
              })}
            </ul>
          )}
          <div className={hstack()}>
            <ButtonWithLink to="/">Home</ButtonWithLink>
          </div>
        </div>
      </Card>
    </>
  );
}
