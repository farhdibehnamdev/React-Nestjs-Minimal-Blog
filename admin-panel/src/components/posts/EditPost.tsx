import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditPost from "./AddEditPost";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["پست", "ویرایش پست"],
};
const EditPost = function () {
  return (
    <>
      <Breadcrumbs {...breadcrumbTitles} />
      <AddEditPost />;
    </>
  );
};

export default EditPost;
