import Cover from './Cover';
import Nav from './Nav';

async function getTextListDetails(noteId: string) {
  const res = await fetch(
    `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${noteId}.json`,
    {
      next: { revalidate: 5 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const details = await getTextListDetails(params.id);

  const contentDecoded = decodeURIComponent(details.content);

  const text = '';

  return (
    <div className="relative">
      <Nav title={details.title} backgroundColor={details.backgroundColor} />
      {details.backgroundColor && (
        <Cover backgroundColor={details.backgroundColor} />
      )}
      <div className="max-w-2xl my-0 mx-auto">
        <div className={`mb-4 ${details.backgroundColor ? 'pt-4' : 'pt-32'}`}>
          <div className="mb-2">
            <button
              type="button"
              className="flex items-center text-xs py-2 px-3 rounded hover:bg-gray-200"
            >
              <svg
                className="mr-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 256 256"
              >
                <path d="M128 24a104 104 0 1 0 104 104A104.13 104.13 0 0 0 128 24Zm40 112h-32v32a8 8 0 0 1-16 0v-32H88a8 8 0 0 1 0-16h32V88a8 8 0 0 1 16 0v32h32a8 8 0 0 1 0 16Z" />
              </svg>
              Add Cover
            </button>
          </div>
          <h1 className="text-3xl font-bold">{details.title}</h1>
          <div
            className="outline-none focus:outline-none"
            contentEditable
            dangerouslySetInnerHTML={{ __html: contentDecoded }}
          />
          <div
            className="outline-none focus:outline-none"
            contentEditable
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </div>
  );
}
