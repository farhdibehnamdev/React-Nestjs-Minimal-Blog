import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = function ({ handleChange, desc }: any) {
  const onChange = function (e: any) {
    handleChange(e);
  };
  const parseEditorData = function (content: any, editor: any) {
    const removedHtmlTags = content.replace(/<[^>]+>/g, "");
    const { targetElm } = editor;
    const { name } = targetElm;
    return {
      target: {
        name,
        value: removedHtmlTags,
      },
    };
  };
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
        onEditorChange={(content: any, editor) =>
          onChange(parseEditorData(content, editor))
        }
        textareaName={desc}
      />
    </>
  );
};

export default RichTextEditor;
