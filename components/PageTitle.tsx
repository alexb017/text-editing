'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, MouseEvent } from 'react';
import ModalOptions from './DropdownOptions';

export default function PageTitle({ note }: any): JSX.Element {
  const [textColor, setTextColor] = useState(note.textColor);
  const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor);
  const { id, title } = note;
  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownRef = useRef<HTMLDivElement>(null);
  const btnDropdownRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: any): void {
      if (
        showDropdown &&
        showDropdownRef.current &&
        !showDropdownRef.current.contains(event.target) &&
        !btnDropdownRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
        setBackgroundColor(note.backgroundColor);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDropdown, showDropdownRef, btnDropdownRef, backgroundColor]);

  function toggleShowOptionsClick(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
    setShowDropdown(!showDropdown);

    if (backgroundColor === 'bg-white') {
      setBackgroundColor('bg-gray-100');
    }
  }

  return (
    <div className="relative">
      <Link
        href={`/${id}`}
        className={`${textColor} ${backgroundColor} flex items-center rounded font-medium underline decoration-gray-300 hover:bg-gray-100 relative`}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <svg
          className="mr-1 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 256 256"
        >
          <path d="m213.66 82.34l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66ZM160 51.31L188.69 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48v120Zm-32-80a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm0 32a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Z" />
        </svg>
        {title}
        {showOptions && (
          <button
            type="button"
            className="p-1 rounded hover:bg-gray-200 absolute right-1 z-10 text-gray-500"
            onClick={toggleShowOptionsClick}
            ref={btnDropdownRef}
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
            >
              <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm56-12a12 12 0 1 0 12 12a12 12 0 0 0-12-12Zm-136 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12Z" />
            </svg>
          </button>
        )}
      </Link>
      {showDropdown && (
        <ModalOptions
          onShowDropdownRef={showDropdownRef}
          onTextColorChange={setTextColor}
          onBackgroundColorChange={setBackgroundColor}
          note={note}
        />
      )}
    </div>
  );
}
