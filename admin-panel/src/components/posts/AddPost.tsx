import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditPost from "./AddEditPost";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["پست", "افزودن پست"],
};
const AddPost = function () {
  return (
    <>
      <Breadcrumbs {...breadcrumbTitles} />
      <AddEditPost />
    </>
  );
};

export default AddPost;
