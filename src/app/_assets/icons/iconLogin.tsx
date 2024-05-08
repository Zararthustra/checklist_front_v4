"use client";

import type { IIcon } from "~/app/_interfaces";

export function IconLogin({
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
      viewBox="0 0 1024 1024"
      stroke="currentColor"
    >
      <path
        fill="currentColor"
        d="M522 82c-153 0-287 79-364 198-3 5 1 12 7 12h70c5 0 10-2 13-6 7-8 14-17 22-24a354 354 0 1 1 389 576 353 353 0 0 1-138 28c-48 0-95-9-138-28a354 354 0 0 1-113-76l-22-24c-3-4-8-6-13-6h-70c-6 0-10 7-7 12A430 430 0 1 0 522 82zM395 624v-76H81c-4 0-8-4-8-8v-56c0-4 4-8 8-8h314v-76c0-7 8-10 13-6l142 112a8 8 0 0 1 0 12L408 630c-5 4-13 1-13-6z"
      />
    </svg>
  );
}
