declare global {
  interface Window {
    chatbase: (action: string, ...args: any[]) => void;
  }
}

export {};
