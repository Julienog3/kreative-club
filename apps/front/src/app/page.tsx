"use server";

import ButtonWithLink from "../components/utils/ButtonWithLink/ButtonWithLink";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default async function Index() {
  return (
    <>
      <ButtonWithLink to="/users">Users</ButtonWithLink>
    </>
  );
}
