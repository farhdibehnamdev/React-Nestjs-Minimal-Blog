import AddEditCategory from "./AddEditCategory";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["فهرست", "ویرایش فهرست"],
};
const EditCategory = function () {
  return (
    <>
      <h1>ویرایش فهرست</h1>
      <Breadcrumbs {...breadcrumbTitles} />
      <AddEditCategory />
    </>
  );
};

export default EditCategory;
