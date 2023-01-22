import Grid from "@mui/material/Grid";
import { postTagsType } from "src/config/api/tagsApi/tagsApi";
import useThunk from "src/hooks/useThunk";
import { addTag } from "src/store/thunks/tagThunks/addTag";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { BreadcrumbsType } from "../common/BreadcrumbsProps";
import AddEditTag from "./AddEditTag";
const breadcrumbTitles: BreadcrumbsType = {
  titles: ["تگ", "افزودن تگ"],
};
const AddTag = function () {
  const [createTag, isCreatingTag, creatingTagError] = useThunk(addTag);
  const handleTagAdd = function (formData: postTagsType) {
    if (typeof createTag === "function") {
      createTag(formData);
    }
  };
  return (
    <>
      <Grid item mb={5.2}>
        <h1>افزودن تگ</h1>
        <Breadcrumbs {...breadcrumbTitles} />
      </Grid>
      <AddEditTag typeOperation="Add" onAdd={handleTagAdd} />
    </>
  );
};

export default AddTag;
