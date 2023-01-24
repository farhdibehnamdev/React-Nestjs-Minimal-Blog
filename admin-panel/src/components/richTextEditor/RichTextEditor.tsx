import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = function ({ handleChange, control, Controller }: any) {
  const parseEditorData = function (newValue: any) {
    const removedHtmlTags = newValue.replace(/<[^>]+>/g, "");
    return {
      target: {
        name: "description",
        value: removedHtmlTags,
      },
    };
  };
  return (
    <>
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, ...field } }: any) => (
          <Editor
            {...field}
            ref={null}
            id="description"
            apiKey="gzzvye1m3v6mexm536ii0av310tb85vla0tkrun3m7c1y9l8"
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
            textareaName="description"
          />
        )}
      />
    </>
  );
};

export default RichTextEditor;
