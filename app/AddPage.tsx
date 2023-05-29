'use client';

import { useRouter } from 'next/navigation';

export default function AddPage() {
  const router = useRouter();
  function getRandomAlphanumeric(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  async function createPage() {
    const pageId = getRandomAlphanumeric(20);

    interface NewData {
      id: string;
      title: string;
      textColor: string;
      backgroundColor: string;
    }

    const res = await fetch(
      'https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json'
    );
    const data: NewData[] | null = await res.json();

    // Ensure array exists even if it's initially empty
    const existingData: NewData[] = data || [];

    // Add new object to the existing array
    const newData = {
      id: pageId,
      title: 'Untitled',
      textColor: '',
      backgroundColor: '',
    };
    existingData.push(newData);

    await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textList.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingData),
      }
    );

    await fetch(
      `https://text-editing-6fdb7-default-rtdb.europe-west1.firebasedatabase.app/textListDetails/id${pageId}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: pageId,
          title: 'Untitled',
          textColor: '',
          backgroundColor: '',
          backgroundCover: '',
          content: '',
        }),
      }
    );

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={createPage}
      className="flex items-center py-2 px-3 rounded font-bold bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-sm"
    >
      <svg
        className="mr-1 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 256 256"
      >
        <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z" />
      </svg>
      Add a page
    </button>
  );
}
