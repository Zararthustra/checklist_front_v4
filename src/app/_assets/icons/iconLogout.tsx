"use client";

import { IIcon } from "~/app/_interfaces";

export function IconLogout({
  width = 18,
  height = 18,
  className = "",
  style,
  color,
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
      fill={color ?? "currentColor"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13 3a1 1 0 1 0-2 0v9a1 1 0 1 0 2 0V3ZM8.61 5.874a1 1 0 0 0-.971-1.748 9 9 0 1 0 8.862.079 1 1 0 1 0-1.002 1.73 7 7 0 1 1-6.89-.061Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
