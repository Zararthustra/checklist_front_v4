import type { IIcon } from "~/app/_interfaces";

export function IconTrash({
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
    >
      <path d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z" />
    </svg>
  );
}
