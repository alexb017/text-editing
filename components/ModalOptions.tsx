import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ModalColor from './ModalColor';

export default function ModalOptions({
  onShowModalRef,
  onTextColorChange,
  onBackgroundColorChange,
  note,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const showModalRef = useRef<HTMLDivElement>(null);
  const btnModalRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  useEffect(() => {
    function handleOutsideClick(event: any): void {
      if (
        showModal &&
        showModalRef.current &&
        !showModalRef.current.contains(event.target) &&
        !btnModalRef.current?.contains(event.target)
      ) {
        setShowModal(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal, showModalRef, btnModalRef]);

  async function handleDeleteClick(noteId: string) {
    const res = await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json`,
      {
        cache: 'no-store',
      }
    );
    const data = await res.json();

    // delete text
    const updatedList = data.filter((note: any) => note.id !== noteId);

    // update data after text is deleted
    await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedList),
      }
    );

    await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${noteId}.json`,
      {
        method: 'DELETE',
      }
    );

    router.refresh();
  }

  return (
    <div
      ref={onShowModalRef}
      className="absolute top-7 right-0 bg-white rounded shadow-md w-60 z-10"
    >
      <div className="flex flex-col relative">
        <button
          className="flex items-center text-sm font-medium px-3 py-1 m-1 rounded hover:bg-gray-100"
          onClick={() => handleDeleteClick(note.id)}
        >
          <svg
            className="mr-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 256 256"
          >
            <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" />
          </svg>
          Delete
        </button>
        <div className="h-px bg-gray-200 block"></div>
        <button
          className="flex items-center justify-between text-sm font-medium px-3 py-1 m-1 rounded hover:bg-gray-100"
          onClick={() => setShowModal(!showModal)}
          ref={btnModalRef}
        >
          <div className="flex items-center">
            <svg
              className="mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
            >
              <path d="M224 67.3a35.79 35.79 0 0 0-11.26-25.66c-14-13.28-36.72-12.78-50.62 1.13L142.8 62.2a24 24 0 0 0-33.14.77l-9 9a16 16 0 0 0 0 22.64l2 2.06l-51 51a39.75 39.75 0 0 0-10.53 38l-8 18.41A13.68 13.68 0 0 0 36 219.3a15.92 15.92 0 0 0 17.71 3.35L71.23 215a39.89 39.89 0 0 0 37.06-10.75l51-51l2.06 2.06a16 16 0 0 0 22.62 0l9-9a24 24 0 0 0 .74-33.18l19.75-19.87A35.75 35.75 0 0 0 224 67.3ZM97 193a24 24 0 0 1-24 6a8 8 0 0 0-5.55.31l-18.1 7.91L57 189.41a8 8 0 0 0 .25-5.75A23.88 23.88 0 0 1 63 159l51-51l33.94 34ZM202.13 82l-25.37 25.52a8 8 0 0 0 0 11.3l4.89 4.89a8 8 0 0 1 0 11.32l-9 9L112 83.26l9-9a8 8 0 0 1 11.31 0l4.89 4.89a8 8 0 0 0 11.33 0l24.94-25.09c7.81-7.82 20.5-8.18 28.29-.81a20 20 0 0 1 .39 28.7Z" />
            </svg>
            Color
          </div>
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 256 256"
          >
            <path d="m181.66 133.66l-80 80a8 8 0 0 1-11.32-11.32L164.69 128L90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32Z" />
          </svg>
        </button>
        {showModal && (
          <ModalColor
            onShowModalRef={showModalRef}
            onTextColorChange={onTextColorChange}
            onBackgroundColorChange={onBackgroundColorChange}
            note={note}
          />
        )}
      </div>
    </div>
  );
}
