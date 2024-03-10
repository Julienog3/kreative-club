import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Card from "../../../components/utils/Card/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  grid,
  gridItem,
  hstack,
  vstack,
} from "../../../../styled-system/patterns";
import Button from "../../../components/utils/Button/Button";
import Input from "../../../components/utils/Input/Input";
import { css } from "../../../../styled-system/css";
import { PreferencesLayout } from "../../../components/layout/PreferencesLayout/PreferencesLayout";
import { usePageContext } from "vike-react/usePageContext";
import { ProfileCard } from "./ProfileCard";
import {
  useUpdateUser,
  useUpdateUserAvatar,
} from "#root/src/api/user/updateUser";
import { Dropzone } from "#root/src/components/utils/Dropzone/Dropzone";
import { Autocomplete } from "#root/src/components/utils/Autocomplete/Autocomplete";
import { useUserQuery } from "#root/src/api/user/getUser";
import { useEffect } from "react";
import { ProfileForm } from "./components/ProfileForm";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.any().optional(),
  categories: z.number().array().optional(),
});

export { Page };

function Page(): JSX.Element {
  const { user } = usePageContext();

  const { data: profile } = useUserQuery(user.id);

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
            <h2 className={css({ textStyle: "title" })}>Profil</h2>
            <ProfileCard user={user} />
            {profile && <ProfileForm user={profile} />}
          </div>
        </Card>
      </PreferencesLayout>
    </>
  );
}
