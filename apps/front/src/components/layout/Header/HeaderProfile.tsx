import { useQuery } from "@tanstack/react-query";
import { css } from "../../../../styled-system/css";
import { circle, hstack } from "../../../../styled-system/patterns";
import { getProfileById } from "../../../api/profile";
import { User } from "../../../api/user";
import { useEffect } from "react";
import { useSnackbarStore } from "../Snackbar/Snackbar.store";

interface HeaderProfileProps {
  user: User;
}

const HeaderProfile = ({ user }: HeaderProfileProps): JSX.Element => {
  const {
    status,
    data: profile,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      if (user) return getProfileById(user?.id);
    },
    enabled: !!user,
  });

  const addItem = useSnackbarStore(({ addItem }) => addItem);

  useEffect(() => {
    console.log(status);
    if (status === "error") {
      console.log("error");
      addItem({ type: "danger", message: error.message });
    }
  }, [status]);

  return (
    <div
      className={hstack({
        border: "2px solid black",
        rounded: "10px",
        padding: ".5rem",
        backgroundColor: "gray",
      })}
    >
      <img
        className={circle({
          w: "35px",
          h: "35px",
          objectFit: "cover",
          border: "solid 2px black",
        })}
        src={profile?.avatar.url}
        alt="avatar"
        loading="lazy"
      />
      <p
        className={css({
          textStyle: "body",
          textTransform: "capitalize",
          mr: 4,
        })}
      >
        Bonjour{" "}
        <span
          className={css({
            fontWeight: "bold",
          })}
        >
          {profile?.firstName} {profile?.lastName}
        </span>
      </p>
    </div>
  );
};

export default HeaderProfile;
