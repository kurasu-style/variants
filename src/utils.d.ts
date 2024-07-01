export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | Record<string, boolean>;

export declare function cn(...inputs: ClassValue[]): string;
