import { User } from "#root/src/api/user";
import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { circle, hstack, vstack } from "#root/styled-system/patterns";

interface ProfileCardProps {
  user: User;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card css={{ backgroundColor: "gray", w: "100%", p: "1rem" }}>
      <div className={hstack({ maxH: "10rem", gap: "2rem" })}>
        <img
          className={circle({
            border: "2px solid black",
            w: "6rem",
            h: "6rem",
            objectFit: "cover",
          })}
          src={
            import.meta.env.VITE_API_URL.slice(0, -1) +
            "/uploads/avatars/" +
            user?.avatar
          }
          alt="avatar"
        />
        <div
          className={vstack({ textStyle: "body", alignItems: "start", gap: 0 })}
        >
          <p className={css({ textStyle: "subtitle" })}>
            {user.firstName} {user.lastName}
          </p>
          <span className={css({ color: "purple" })}>@{user.username}</span>
        </div>
      </div>
    </Card>
  );
};
