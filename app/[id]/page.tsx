async function getTextListDetails(noteId: string) {
  const res = await fetch(
    `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${noteId}.json`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const textListDetails = await getTextListDetails(params.id);

  const contentDecoded = decodeURIComponent(textListDetails.content);

  return (
    <div className="max-w-3xl my-0 mx-auto">
      <div className="my-4">
        <h1 className="text-3xl font-bold">{textListDetails.title}</h1>
        <div
          className="outline-none focus:outline-none leading-7"
          contentEditable
          dangerouslySetInnerHTML={{ __html: contentDecoded }}
        />
      </div>
    </div>
  );
}
