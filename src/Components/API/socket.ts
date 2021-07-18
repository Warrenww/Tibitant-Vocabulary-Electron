interface WindowsExtend extends Window {
  api?: {
    send: (channel: string, data: any) => void;
    on: (channel: string) => Promise<unknown>;
  };
};

export default (window as WindowsExtend).api; 
