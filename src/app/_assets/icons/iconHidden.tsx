import { IIcon } from "~/app/_interfaces";

export function IconHidden({
  width = 24,
  height = 24,
  className = "",
  style,
  onClick,
}: IIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      style={style}
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        d="M3.80957 20C8.64195 26.9848 14.0381 30.4762 20 30.4762C25.962 30.4762 31.3581 26.9848 36.1905 20M8.57147 25.5676L4.76195 29.5238M31.4286 25.5676L35.2381 29.5238M23.8096 30.4762L25.7143 35.2381M16.1905 30.4762L14.2858 35.2381"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
