declare module 'next/font/local' {
  import { NextFont } from 'next/dist/compiled/@next/font';

  interface LocalFontOptions {
    src:
      | string
      | Array<{
          path: string;
          weight?: string;
          style?: string;
        }>;
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean;
    variable?: string;
    declarations?: Array<{
      prop: string;
      value: string;
    }>;
  }

  function localFont(options: LocalFontOptions): NextFont;
  export default localFont;
}
