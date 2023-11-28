import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/user";
import Card from "../../components/utils/Card/Card";
import { circle, hstack, vstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import ButtonWithLink from "../../components/utils/ButtonWithLink/ButtonWithLink";
import { useEffect } from "react";
import { useSnackbarStore } from "../../components/layout/Snackbar/Snackbar.store";

export { UsersPage }

function UsersPage(): JSX.Element {
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
              {users.map(({ id, username, profile }) => {
                return (
                  <li
                    className={hstack({
                      textStyle: "body",
                      gap: "1rem",
                      alignItems: "center",
                    })}
                    key={id}
                  >
                    {profile && (
                      <img
                        className={circle({
                          w: "2.5rem",
                          h: "2.5rem",
                          objectFit: "cover",
                          border: "solid 2px black",
                        })}
                        src={
                          profile.avatar
                            ? `${
                                import.meta.env.VITE_API_URL
                              }${profile?.avatar.url.slice(1)}`
                            : ""
                        }
                        alt="avatar"
                      />
                    )}
                    <div className={vstack({ gap: 0, alignItems: "left" })}>
                      {profile && (
                        <span>
                          {profile?.firstName} {profile?.lastName}
                        </span>
                      )}
                      <span
                        className={css({ fontWeight: "bold", fontSize: "sm" })}
                      >
                        @{username}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className={hstack()}>
            {/* <ButtonWithLink to="/">Home</ButtonWithLink>
            <ButtonWithLink to="/users/add">Adding user</ButtonWithLink> */}
          </div>
        </div>
      </Card>
    </>
  );
}
