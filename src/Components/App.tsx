import React, {
  useEffect,
  useState,
} from 'react';
import { search } from './API';
import { AppContainer } from './styles';
import Search from './Search';
import VocabTable, { DataType } from './VocabTable';
import SubmitModal from './SubmitModal';
import socket from './API/socket';

const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [searching, setSearching] = useState('');

  useEffect(() => {
    document.getElementById('loading').remove();
    socket.on('insertResult').then((d) => {
      setData(d as DataType[]);
      setSearching((d as DataType[])[0].vocabulary);
    });
  }, []);

  const handleSearch = (keyword: string) => {
    if (keyword === '') return setData([]);
    setSearching(keyword);
    search(keyword).then((d) => setData(d as DataType[]));
  };

  return (
    <AppContainer>
      <Search
        searching={searching}
        setSearching={(keyword) => setSearching(keyword)}
        search={handleSearch}
      />
      <SubmitModal initialTibetan={searching}/>
      <VocabTable
        data={data}
      />
    </AppContainer>
  );
}

export default App;
