import React, { useEffect } from 'react';
import { Button } from 'antd';
import { getData } from './API';
import { AppContainer } from './styles';
import VocabTable from './VocabTable';
import Tibetan from '../Utils/Tibetan';

const App = () => {
  useEffect(() => {
    document.getElementById('loading').remove();
    getData(0);
    console.log(new Tibetan('sa').toString());
  }, []);

  return (
    <AppContainer>
      <Button>
        Click
      </Button>
      <VocabTable />
    </AppContainer>
  );
}

export default App;
