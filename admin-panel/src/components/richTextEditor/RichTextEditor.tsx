import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = function () {
  return (
    <>
      <Editor
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
      />
    </>
  );
};

export default RichTextEditor;
