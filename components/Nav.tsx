import Link from 'next/link';

export default function Nav({
  title,
  backgroundCover,
}: {
  title: string;
  backgroundCover: string;
}) {
  let textColor;

  switch (backgroundCover) {
    case 'bg-gray-500':
      textColor = 'text-gray-200';
      break;
    case 'bg-red-500':
      textColor = 'text-gray-200';
      break;
    case 'bg-orange-500':
      textColor = 'text-gray-200';
      break;
    case 'bg-blue-500':
      textColor = 'text-gray-200';
      break;
    case 'bg-purple-500':
      textColor = 'text-gray-200';
      break;
    default:
      textColor = 'text-gray-500';
  }

  return (
    <nav className="fixed top-4 w-full z-10">
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
