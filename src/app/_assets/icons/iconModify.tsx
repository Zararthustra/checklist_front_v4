"use client";

import { IIcon } from "~/app/_interfaces";

export function IconModify({
  width = 20,
  height = 20,
  className = "",
  color,
  onClick,
  style,
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
      viewBox="0 0 14 14"
    >
      <g
        fill="none"
        stroke={color ?? "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 9l-3 .54L5 6.5L10.73.79a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 0 1 0 1.42Z" />
        <path d="M12 9.5v3a1 1 0 0 1-1 1H1.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" />
      </g>
    </svg>
  );
}
