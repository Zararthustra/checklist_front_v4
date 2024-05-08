import type { IIcon } from "~/app/_interfaces";

export function IconLoader({
  width = 24,
  height = 24,
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
      className={"animate-spin " + className}
      style={style}
      viewBox={"0 0 24 24"}
      fill="none"
    >
      <path
        fill="none"
        stroke={color ? color : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3a9 9 0 1 0 9 9"
      />
    </svg>
  );
}
