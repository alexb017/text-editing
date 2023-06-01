export default function ModalColor({
  onShowDropdownRef,
  onTextColorChange,
  onBackgroundColorChange,
  note,
}: any) {
  async function handleTextColorClick(color: string, noteId: string) {
    const res = await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json`,
      {
        cache: 'no-store',
      }
    );
    const data = await res.json();

    const exisitingNote = data.find((note: any) => note.id === noteId);

    if (exisitingNote) {
      const updateNote = data.map((note: any) => {
        if (note.id === noteId) {
          return { ...note, textColor: color };
        }
        return note;
      });

      await fetch(
        `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateNote),
        }
      );
    }

    onTextColorChange(color);
  }

  async function handleBackgroundColorClick(color: string, noteId: string) {
    const res = await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json`,
      {
        cache: 'no-store',
      }
    );
    const data = await res.json();

    const exisitingNote = data.find((note: any) => note.id === noteId);

    if (exisitingNote) {
      const updateNote = data.map((note: any) => {
        if (note.id === noteId) {
          return { ...note, backgroundColor: color };
        }
        return note;
      });

      await fetch(
        `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateNote),
        }
      );
    }

    onBackgroundColorChange(color);
  }

  return (
    <div
      className="absolute top-0 -right-56 bg-white rounded shadow-md w-60 z-20"
      ref={onShowDropdownRef}
    >
      <div className="flex flex-col">
        <p className="px-3 py-1 m-1 text-sm font-medium text-gray-500">Color</p>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 mt-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-gray-600', note.id)}
        >
          <div className="text-gray-600 block mr-3 font-bold">Aa</div>
          Default
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-gray-500', note.id)}
        >
          <div className="text-gray-500  block mr-3 font-bold">Aa</div>
          Gray
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-red-500', note.id)}
        >
          <div className="text-red-500  block mr-3 font-bold">Aa</div>
          Red
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-orange-500', note.id)}
        >
          <div className="text-orange-500 block mr-3 font-bold">Aa</div>
          Orange
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-yellow-500', note.id)}
        >
          <div className="text-yellow-500 block mr-3 font-bold">Aa</div>
          Yellow
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-green-500', note.id)}
        >
          <div className="text-green-500 block mr-3 font-bold">Aa</div>
          Green
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-blue-500', note.id)}
        >
          <div className="text-blue-500 block mr-3 font-bold">Aa</div>
          Blue
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-purple-500', note.id)}
        >
          <div className="text-purple-500 block mr-3 font-bold">Aa</div>
          Purple
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 mb-1 rounded hover:bg-gray-100"
          onClick={() => handleTextColorClick('text-pink-500', note.id)}
        >
          <div className="text-pink-500 block mr-3 font-bold">Aa</div>
          Pink
        </button>
        <div className="h-px bg-gray-200 block"></div>
        <p className="px-3 py-1 m-1 text-sm font-medium text-gray-500">
          Background
        </p>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 mt-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-white', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-white text-gray-500">
            Aa
          </div>
          Default background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-gray-200', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-gray-200 text-gray-500">
            Aa
          </div>
          Gray background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-red-100', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-red-100 text-gray-500">
            Aa
          </div>
          Red background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-orange-100', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-orange-100 text-gray-500">
            Aa
          </div>
          Orange background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-yellow-100', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-yellow-100 text-gray-500">
            Aa
          </div>
          Yellow background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-green-100', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-green-100 text-gray-500">
            Aa
          </div>
          Green background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-blue-100', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-blue-100 text-gray-500">
            Aa
          </div>
          Blue background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-purple-100', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-purple-100 text-gray-500">
            Aa
          </div>
          Purple background
        </button>
        <button
          type="button"
          className="flex items-center text-sm font-medium px-3 py-1 mx-1 mb-1 rounded hover:bg-gray-100"
          onClick={() => handleBackgroundColorClick('bg-pink-100', note.id)}
        >
          <div className="block mr-3 font-bold px-1 rounded bg-pink-100 text-gray-500">
            Aa
          </div>
          Pink background
        </button>
      </div>
    </div>
  );
}
