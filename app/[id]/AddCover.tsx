'use client';
import { useState } from 'react';

export default function AddCover() {
  const [showBtn, setShowBtn] = useState(false);

  return (
    <div
      className="mb-2 h-8"
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
    >
      {showBtn && (
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
      )}
    </div>
  );
}
