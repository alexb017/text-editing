import EditText from './EditText';
import WrapCover from './WrapCover';

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

  return (
    <div className="relative">
      <WrapCover note={details} />
      <div className="max-w-2xl my-0 mx-auto">
        <EditText note={details} />
      </div>
    </div>
  );
}
