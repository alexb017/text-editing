import Link from 'next/link';

export default function Nav({
  title,
  backgroundColor,
}: {
  title: string;
  backgroundColor: string;
}) {
  let textColor = 'text-gray-500';
  if (backgroundColor === 'bg-red-500') {
    textColor = 'text-gray-200';
  } else if (backgroundColor === 'bg-orange-500') {
    textColor = 'text-gray-200';
  }

  return (
    <nav className="absolute top-4 w-full">
      <div className="max-w-2xl my-0 mx-auto">
        <div className="flex items-center">
          <Link
            href={`/`}
            className={`mr-1 ${textColor} rounded p-1 hover:bg-gray-100 hover:text-gray-500`}
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
            >
              <path d="M165.66 202.34a8 8 0 0 1-11.32 11.32l-80-80a8 8 0 0 1 0-11.32l80-80a8 8 0 0 1 11.32 11.32L91.31 128Z" />
            </svg>
          </Link>
          <p className={`text-sm ${textColor} font-medium`}>/ {title}</p>
        </div>
      </div>
    </nav>
  );
}
