declare global {
  interface Window {
    chatbase: (action: string) => void;
  }
}

export {};
