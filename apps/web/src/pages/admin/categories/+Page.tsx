import { useCategories } from "#root/src/api/categories/getCategories";
import { AdminLayout } from "#root/src/components/layout/AdminLayout/AdminLayout";
import Button from "#root/src/components/utils/Button/Button";
import Card from "#root/src/components/utils/Card/Card";
import { useStoreModal } from "#root/src/components/utils/Modal/Modal.store";
import { css } from "#root/styled-system/css";
import { vstack } from "#root/styled-system/patterns";
import { CategoriesTable } from "./CategoriesTable";
import { CreateCategoryModal } from "./components/CreateCategoryModal";

export { Page };

function Page() {
  const { data: categories, isSuccess } = useCategories();
  const { isShowed, closeModal, openModal } = useStoreModal((state) => state);

  return (
    <>
      <CreateCategoryModal isShowed={isShowed} closeModal={closeModal} />
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
            <h2 className={css({ textStyle: "subtitle" })}>Catégories</h2>
            {isSuccess && <CategoriesTable data={categories} />}
            <Button variant="success" onClick={() => openModal()}>
              Ajouter une catégorie
            </Button>
          </div>
        </Card>
      </AdminLayout>
    </>
  );
}
