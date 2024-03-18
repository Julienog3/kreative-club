import Card from "../../../components/utils/Card/Card";
import { vstack } from "../../../../styled-system/patterns";
import { css } from "../../../../styled-system/css";
import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { usePageContext } from "vike-react/usePageContext";
import { ProfileCard } from "./ProfileCard";
import { useUserQuery } from "#root/src/api/user/getUser";
import { ProfileForm } from "./components/CreativeProfileForm";
import Button from "#root/src/components/utils/Button/Button";
import { useEnablePortfolioQuery } from "#root/src/api/user/enablePortfolio";

export { Page };

function Page(): JSX.Element {
  const { user, userToken } = usePageContext();
  const { data: profile } = useUserQuery(user.id);

  console.log(user);

  const enablePortfolio = useEnablePortfolioQuery(userToken);

  return (
    <>
      <PreferencesLayout>
        <Card css={{ width: "100%", height: "100%", p: ".5rem" }}>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <h2 className={css({ textStyle: "title" })}>Profil créatif</h2>
            <ProfileCard user={user} />
            <Button
              onClick={() => enablePortfolio.mutate(!user.portfolioEnabled)}
            >
              {user.portfolioEnabled
                ? "Désactiver mon portfolio"
                : "Activer mon portfolio"}
            </Button>
            {/* {profile && <ProfileForm user={profile} />} */}
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
