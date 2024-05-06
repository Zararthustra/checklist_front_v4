import { HTMLAttributes } from 'react';

export type { IIcon };

interface IIcon extends HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: object;
  strokeWidth?: number;
  noColor?: boolean;
  color?: string;
  onClick?: () => void;
}
