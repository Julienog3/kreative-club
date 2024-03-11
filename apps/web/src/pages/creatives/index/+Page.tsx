import { useCreativesQuery } from "#root/src/api/user/getCreatives";
import { z } from "zod";
import { css } from "../../../../styled-system/css";
import {
  grid,
  gridItem,
  hstack,
  vstack,
} from "../../../../styled-system/patterns";
import Chip from "../../../components/utils/Chip/Chip";
import CreativeCard from "./components/CreativeCard";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Autocomplete } from "#root/src/components/utils/Autocomplete/Autocomplete";
import { useEffect, useState } from "react";
import { useCategories } from "#root/src/api/categories/getCategories";

export { Page };

const filterCreativesSchema = z.object({
  categories: z.number().array().optional(),
});

function Page(): JSX.Element {
  const form = useForm<z.infer<typeof filterCreativesSchema>>({
    resolver: zodResolver(filterCreativesSchema),
    defaultValues: { categories: [] },
  });

  const [categoriesFiltered, setCategoriesFiltered] = useState<string[]>([]);

  const { data: categories } = useCategories();

  const { handleSubmit, control, watch } = form;
  const { data: creatives, refetch } = useCreativesQuery(categoriesFiltered);

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  useEffect(() => {
    refetch();
  }, [categoriesFiltered]);

  const onSubmit: SubmitHandler<z.infer<typeof filterCreativesSchema>> = (
    filterCreativesData,
  ) => {
    const categoriesUpdated = categories
      ?.filter(({ id }) => {
        return filterCreativesData.categories?.includes(id);
      })
      .map(({ title }) => title);
    setCategoriesFiltered(categoriesUpdated || []);
  };

  return (
    <div
      className={vstack({
        alignItems: "start",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        p: "1rem",
      })}
    >
      <div className={hstack({ mb: "2.5rem" })}>
        <Chip>
          <BiHomeAlt /> Accueil
        </Chip>
        <Chip>Tous les créatifs</Chip>
      </div>
      <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
        Tous les créatifs
      </h2>
      <div className={vstack()}>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={grid({ gap: "1rem", columns: 2, w: "100%" })}
          >
            <div className={gridItem({ colSpan: 2 })}>
              <Controller
                control={control}
                name="categories"
                render={({ field }) => <Autocomplete {...field} />}
              />
            </div>
          </form>
        </FormProvider>
      </div>
      <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
        {creatives &&
          creatives.map((creative) => (
            <li key={creative.id}>
              <CreativeCard {...creative} />
            </li>
          ))}
      </ul>
    </div>
  );
}
