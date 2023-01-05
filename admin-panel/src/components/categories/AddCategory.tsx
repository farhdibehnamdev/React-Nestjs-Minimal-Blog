import AddEditCategory from "./AddEditCategory";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["فهرست", "افزودن فهرست"],
};
const AddCategory = function () {
  return (
    <>
      <h1>افزودن فهرست</h1>
      <Breadcrumbs {...breadcrumbTitles} />
      <AddEditCategory />
    </>
  );
};

export default AddCategory;
