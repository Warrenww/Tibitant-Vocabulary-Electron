import React, {
  useEffect,
  useState,
} from 'react';
import { AppContainer } from './styles';
import Search from './Search';
import VocabTable from './VocabTable';
import { DataType } from './effector';
import SubmitModal from './SubmitModal';
import socket from './API/socket';
import { setSearching } from './effector';


const App = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    document.getElementById('loading').remove();
    socket.on('insertResult').then((d) => {
      setData(d as DataType[]);
      setSearching((d as DataType[])[0].vocabulary);
    });
  }, []);

  return (
    <AppContainer>
      <Search/>
      <SubmitModal />
      <VocabTable />
    </AppContainer>
  );
}

export default App;
