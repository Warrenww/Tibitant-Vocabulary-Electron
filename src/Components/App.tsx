import React, { useEffect } from 'react';
import { Button } from 'antd';
import { getData } from './API';
import { AppContainer } from './styles';
import VocabTable from './VocabTable';
import Tibetan from './Tibetan';

const App = () => {
  useEffect(() => {
    document.getElementById('loading').remove();
    getData(0);
  }, []);

  return (
    <AppContainer>
      <Button>
        Click
      </Button>
      <VocabTable />
      <Tibetan source={'sa'}/>
    </AppContainer>
  );
}

export default App;
