import AddCover from './AddCover';
import Cover from '../../components/Cover';
import Nav from '../../components/Nav';

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
      <Nav title={details.title} backgroundCover={details.backgroundCover} />
      {details.backgroundCover && (
        <Cover backgroundCover={details.backgroundCover} />
      )}
      <div className="max-w-2xl my-0 mx-auto">
        <div className={`mb-4 ${details.backgroundCover ? 'pt-4' : 'pt-32'}`}>
          <AddCover />
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
