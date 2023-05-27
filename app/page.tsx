import Link from 'next/link';

async function getList() {
  const res = await fetch(
    'https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json',
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data as any[];
}

export default async function TextList() {
  const textList = await getList();

  return (
    <div className="max-w-3xl my-0 mx-auto">
      <h1 className="text-3xl font-bold my-4">Reading List</h1>
      <button
        type="button"
        className="flex items-center py-2 px-3 rounded-lg font-bold bg-slate-100 hover:bg-slate-200 transition-colors duration-200 text-sm"
      >
        <svg
          className="mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 256 256"
        >
          <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z" />
        </svg>
        Add a page
      </button>
      <div className="my-4 flex flex-col">
        {textList.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const { id, title } = note;

  return (
    <Link
      href={`/${id}`}
      className="flex items-center text-slate-600 leading-7 underline decoration-slate-300 hover:bg-slate-100"
    >
      <svg
        className="mr-1 text-slate-600"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 256 256"
      >
        <path d="m213.66 82.34l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66ZM160 51.31L188.69 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48v120Zm-32-80a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm0 32a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Z" />
      </svg>
      {title}
    </Link>
  );
}
