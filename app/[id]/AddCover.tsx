import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCover({ onBgCover, note }: any) {
  const [showBtn, setShowBtn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownRef = useRef<HTMLDivElement>(null);
  const btnDropdownRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleOutsideClick(event: any): void {
      if (
        showDropdown &&
        showDropdownRef.current &&
        !showDropdownRef.current.contains(event.target) &&
        !btnDropdownRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDropdown, showDropdownRef, btnDropdownRef]);

  async function handleBackgroundCoverClick(color: string, noteId: string) {
    // const res = await fetch(
    //   `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${noteId}.json`
    // );
    // const data = await res.json();

    await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${noteId}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...note, backgroundCover: color }),
      }
    );

    onBgCover(color);
    router.refresh();
  }

  return (
    <div
      className="mb-2 mt-16 h-8 max-w-2xl my-0 mx-auto relative"
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
    >
      {showBtn && (
        <button
          type="button"
          className={`flex items-center text-xs py-2 px-3 rounded hover:bg-gray-200 ${
            showDropdown ? 'bg-gray-200' : ''
          }`}
          onClick={() => setShowDropdown(!showDropdown)}
          ref={btnDropdownRef}
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
      )}
      {showDropdown && (
        <div
          className="absolute -bottom-48 left-0 bg-white rounded shadow-md w-60 z-10"
          ref={showDropdownRef}
        >
          <div className="flex flex-col relative">
            <p className="px-3 py-1 m-1 text-sm font-medium text-gray-500">
              Background
            </p>
            <div className="h-px bg-gray-200 block"></div>
            <button
              type="button"
              className="flex items-center text-sm font-medium px-3 py-1 mx-1 mt-1 rounded hover:bg-gray-100"
              onClick={() => handleBackgroundCoverClick('bg-gray-500', note.id)}
            >
              <div className="block mr-3 font-bold px-1 rounded bg-gray-500 w-5 h-5"></div>
              Gray background
            </button>
            <button
              type="button"
              className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
              onClick={() => handleBackgroundCoverClick('bg-red-500', note.id)}
            >
              <div className="block mr-3 font-bold px-1 rounded bg-red-500 w-5 h-5"></div>
              Red background
            </button>
            <button
              type="button"
              className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
              onClick={() =>
                handleBackgroundCoverClick('bg-orange-500', note.id)
              }
            >
              <div className="block mr-3 font-bold px-1 rounded bg-orange-500 w-5 h-5"></div>
              Orange background
            </button>
            <button
              type="button"
              className="flex items-center text-sm font-medium px-3 py-1 mx-1 mb-1 rounded hover:bg-gray-100"
              onClick={() => handleBackgroundCoverClick('bg-blue-500', note.id)}
            >
              <div className="block mr-3 font-bold px-1 rounded bg-blue-500 w-5 h-5"></div>
              Blue background
            </button>
            <button
              type="button"
              className="flex items-center text-sm font-medium px-3 py-1 mx-1 mb-1 rounded hover:bg-gray-100"
              onClick={() =>
                handleBackgroundCoverClick('bg-purple-500', note.id)
              }
            >
              <div className="block mr-3 font-bold px-1 rounded bg-purple-500 w-5 h-5"></div>
              Purple background
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
