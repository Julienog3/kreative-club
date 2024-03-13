import { getUsers } from "#root/src/api/user";
import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { vstack } from "#root/styled-system/patterns";
import { useQuery } from "@tanstack/react-query";
import { UsersTable } from "./UsersTable";

export { Page };

function Page() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <Card css={{ width: "100%", height: "100%" }}>
      <div
        className={vstack({
          w: "100%",
          alignItems: "flex-start",
          p: "1rem",
          height: "100%",
        })}
      >
        <h2 className={css({ textStyle: "subtitle" })}>Utilisateurs</h2>
        {users && <UsersTable data={users} />}
      </div>
    </Card>
  );
}
