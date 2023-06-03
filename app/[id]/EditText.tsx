export default function EditText({ note }: any) {
  const contentDecoded = decodeURIComponent(note.content);

  return (
    <>
      <div
        className="text-3xl font-bold outline-none focus:outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: note.title }}
      />
      <div
        className="outline-none focus:outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: contentDecoded }}
      />
    </>
  );
}
