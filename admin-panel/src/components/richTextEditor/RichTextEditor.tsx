import { Editor } from "@tinymce/tinymce-react";
import { FormHelperText, Alert } from "@mui/material";
const RichTextEditor = function ({
  handleChange,
  control,
  Controller,
  elementName,
  errors,
}: any) {
  const parseEditorData = function (newValue: any) {
    const removedHtmlTags = newValue.replace(/<[^>]+>/g, "");
    return {
      target: {
        name: elementName,
        value: removedHtmlTags,
      },
    };
  };
  return (
    <>
      <Controller
        name={elementName}
        control={control}
        error={
          elementName === "description"
            ? false
            : errors[elementName]
            ? true
            : false
        }
        render={({ field: { onChange, ...field } }: any) => (
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            {...field}
            ref={null}
            id={elementName}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "quickbars",
                "directionality",
              ],
              directionality: "rtl",
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | image | quickimage",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(newValue: string) => {
              onChange(newValue);
              handleChange(parseEditorData(newValue));
            }}
            textareaName={elementName}
          />
        )}
      />
      <br />
      {errors.body && (
        <Alert
          variant="outlined"
          severity="error"
          sx={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FormHelperText error>{errors.body.message}</FormHelperText>
        </Alert>
      )}
    </>
  );
};

export default RichTextEditor;
