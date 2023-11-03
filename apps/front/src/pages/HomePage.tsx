import { hstack, vstack } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import Card from "../components/utils/Card/Card";
import ButtonWithLink from "../components/utils/ButtonWithLink/ButtonWithLink";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";

function HomePage(): JSX.Element {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  // useEffect(() => {
  //   const user = authenticate();
  //   console.log("user", user);
  // }, []);

  return (
    <>
      <Card>
        <div className={vstack({ gap: 2 })}>
          <h1 className={css({ textStyle: "title" })}>Kreative club</h1>
          <p className={css({ textStyle: "body" })}>
            Plateforme de freelance pour graphiste
            {data && <>{data}</>}
          </p>
          <div className={hstack()}>
            <ButtonWithLink to="/users">Users</ButtonWithLink>
            <ButtonWithLink to="/users/add">Add user</ButtonWithLink>
          </div>
        </div>
      </Card>
    </>
  );
}

export default HomePage;
