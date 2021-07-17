import React, { useEffect } from 'react';
import { Button } from 'antd';

interface WindowsExtend extends Window {
  api?: {
    send: (channel: string, data: any) => void;
    on: (channel: string) => Promise<unknown>;
  };
};

const App = () => {
  useEffect(() => {
      const api = (window as WindowsExtend).api;
      api.send('request', 'test');
      api.on('response').then((res) => console.log(res));
  }, []);

  return (
    <>
      <Button>
        Click
      </Button>
    </>
  );
}

export default App;
