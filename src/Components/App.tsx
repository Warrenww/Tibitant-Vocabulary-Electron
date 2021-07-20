import React, {
  useEffect,
  useState,
  useRef,
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
  const searchCoolDown = useRef(false);

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
    if (searchCoolDown.current) return;
    searchCoolDown.current = true;
    search(keyword).then((d) => setData(d as DataType[]));
    setTimeout(() => {
      searchCoolDown.current = false;
    }, 300);
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
