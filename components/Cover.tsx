import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Cover({
  bgCover,
  onBgCover,
  note,
}: {
  bgCover: string;
  onBgCover: any;
  note: any;
}) {
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
    const res = await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${noteId}.json`,
      {
        next: { revalidate: 5 },
      }
    );
    const data = await res.json();

    await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${noteId}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, backgroundCover: color }),
      }
    );

    onBgCover(color);
    router.refresh();
  }

  return (
    <div
      className={`${bgCover} w-full h-80 p-2 ${bgCover !== '' ? 'mb-16' : ''}`}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
    >
      <div className="max-w-2xl my-0 mx-auto h-full flex items-end justify-end relative">
        {showBtn && (
          <button
            type="button"
            className="py-2 px-3 text-xs rounded font-bold bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setShowDropdown(!showDropdown)}
            ref={btnDropdownRef}
          >
            Change cover
          </button>
        )}
        {showDropdown && (
          <div
            className="absolute -bottom-48 right-0 bg-white rounded shadow-md w-60 z-10"
            ref={showDropdownRef}
          >
            <div className="flex flex-col relative">
              <button className="flex items-center text-sm font-medium px-3 py-1 m-1 rounded hover:bg-gray-100">
                <svg
                  className="mr-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 256 256"
                >
                  <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" />
                </svg>
                Remove Cover
              </button>
              <div className="h-px bg-gray-200 block"></div>
              <button
                type="button"
                className="flex items-center text-sm font-medium px-3 py-1 mx-1 mt-1 rounded hover:bg-gray-100"
                onClick={() =>
                  handleBackgroundCoverClick('bg-gray-500', note.id)
                }
              >
                <div className="block mr-3 font-bold px-1 rounded bg-gray-500 w-5 h-5"></div>
                Gray background
              </button>
              <button
                type="button"
                className="flex items-center text-sm font-medium px-3 py-1 mx-1 rounded hover:bg-gray-100"
                onClick={() =>
                  handleBackgroundCoverClick('bg-red-500', note.id)
                }
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
                onClick={() =>
                  handleBackgroundCoverClick('bg-blue-500', note.id)
                }
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
    </div>
  );
}
