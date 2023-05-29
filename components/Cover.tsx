'use client';

import { useState } from 'react';

export default function Cover({
  backgroundCover,
}: {
  backgroundCover: string;
}) {
  const [showBtn, setShowBtn] = useState(false);

  return (
    <div
      className={`${backgroundCover} w-full h-80 p-2`}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
    >
      <div className="max-w-2xl my-0 mx-auto h-full flex items-end justify-end">
        {showBtn && (
          <button
            type="button"
            className="py-2 px-3 text-xs rounded font-bold bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            Change color
          </button>
        )}
      </div>
    </div>
  );
}
