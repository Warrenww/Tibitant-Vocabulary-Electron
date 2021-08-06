import React, {
  useEffect,
} from 'react';
import { AppContainer } from './styles';
import Search from './Search';
import VocabTable from './VocabTable';
import SubmitModal from './SubmitModal';
import BookMark from './BookMark';
import { DataType } from './effector';
import socket from './API/socket';
import { setSearching } from './effector';


const App = () => {
  useEffect(() => {
    document.getElementById('loading').remove();
    socket.on('insertResult').then((d) => {
      setSearching((d as DataType[])[0].vocabulary);
    });
  }, []);

  return (
    <AppContainer>
      <Search/>
      <SubmitModal />
      <VocabTable />
      <BookMark />
    </AppContainer>
  );
}

export default App;
