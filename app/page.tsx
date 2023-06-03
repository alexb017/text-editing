import AddPage from './AddPage';
import PageTitle from '../components/PageTitle';

async function getList() {
  const res = await fetch(
    'https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json',
    {
      cache: 'no-store',
    }
  );
  const data = await res.json();
  return data as any[];
}

export default async function TextList() {
  const textList = await getList();

  return (
    <div className="max-w-2xl my-0 mx-auto">
      <h1 className="text-3xl font-bold my-4">Reading List</h1>
      <AddPage data={textList} />
      <div className="flex flex-col my-8">
        {textList.map((note) => {
          return <PageTitle key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
