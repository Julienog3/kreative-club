import { getUsers } from "#root/src/api/user";
import { AdminLayout } from "#root/src/components/layout/AdminLayout/AdminLayout";
import Card from "#root/src/components/utils/Card/Card";
import { css } from "#root/styled-system/css";
import { hstack, vstack } from "#root/styled-system/patterns";
import { useQuery } from "@tanstack/react-query";

export { Page };

function Page() {
  const { data: users, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <AdminLayout>
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
        </div>
      </Card>
    </AdminLayout>
  );
}
