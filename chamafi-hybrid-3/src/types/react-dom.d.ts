declare module 'react-dom/client' {
  import { ReactNode } from 'react';
  
  interface Root {
    render(element: ReactNode): void;
    unmount(): void;
  }
  
  interface CreateRootOptions {
    identifierPrefix?: string;
    onRecoverableError?: (error: unknown) => void;
  }
  
  export function createRoot(
    container: Element | DocumentFragment,
    options?: CreateRootOptions
  ): Root;
  
  export function hydrateRoot(
    container: Element | DocumentFragment,
    initialChildren: ReactNode,
    options?: CreateRootOptions
  ): Root;
}
