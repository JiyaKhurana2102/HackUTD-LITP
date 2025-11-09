// Temporary shims to silence TypeScript in the editor until dependencies are installed.
// Remove this file once `npm install` has completed and proper @types/react is present.

declare module 'react' {
  const React: any;
  export default React;
  export const Fragment: any;

  // Generic useState signature
  export function useState<S>(initialState?: S | (() => S)):
    [S, (value: S | ((prevState: S) => S)) => void];

  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;

  export function useRef<T = any>(initial?: T): { current: T };

  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps?: any[]): T;

  export function useMemo<T>(fn: () => T, deps?: any[]): T;

  export function useContext<T = any>(ctx: any): T;
}

// Minimal react-dom/client shim
declare module 'react-dom/client' {
  export function createRoot(...args: any[]): any;
}

// JSX runtime shim
declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}

// Provide a minimal JSX namespace so JSX works in TSX files.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
