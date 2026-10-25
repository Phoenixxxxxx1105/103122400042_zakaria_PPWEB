/**
 * Kumpulan ikon inline (tanpa library/CDN) agar tampilan konsisten
 * dan tidak bergantung pada aset eksternal.
 */
function Svg({ children, size = 18, className = '', viewBox = '0 0 24 24', filled = false, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);

export const CloseIcon = (props) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const HeartIcon = ({ filled = false, ...props }) => (
  <Svg filled={filled} {...props}>
    <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20z" />
  </Svg>
);

export const ArrowRightIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const ArrowLeftIcon = (props) => (
  <Svg {...props}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Svg>
);

export const ArrowUpIcon = (props) => (
  <Svg {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);

export const StarIcon = ({ filled = true, ...props }) => (
  <Svg filled={filled} {...props}>
    <path d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L12 16.9l-5.25 2.77 1-5.87L3.5 9.66l5.9-.86z" />
  </Svg>
);

export const UserIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Svg>
);

export const DownloadIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3v12M7 11l5 5 5-5" />
    <path d="M4 20h16" />
  </Svg>
);

export const FilterIcon = (props) => (
  <Svg {...props}>
    <path d="M3 5h18M6 12h12M10 19h4" />
  </Svg>
);

export const CheckIcon = (props) => (
  <Svg {...props}>
    <path d="m5 13 4 4L19 7" />
  </Svg>
);

export const ImageIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="m21 16-4.5-4.5L6 20" />
  </Svg>
);

export const GamepadIcon = (props) => (
  <Svg {...props}>
    <path d="M7 8h10a5 5 0 0 1 4.9 6l-1 4a3 3 0 0 1-5.1 1.4L14 17h-4l-1.8 2.4A3 3 0 0 1 3.1 18l-1-4A5 5 0 0 1 7 8z" />
    <path d="M7 11v4M5 13h4M16 12h.01M18 14h.01" />
  </Svg>
);

export const MenuIcon = (props) => (
  <Svg {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const InfoIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
);
