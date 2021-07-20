import React, { useEffect, useState } from 'react';
import { getData, search } from './API';
import { AppContainer } from './styles';
import Search from './Search';
import VocabTable, { DataType } from './VocabTable';
import SubmitModal from './SubmitModal';
import socket from './API/socket';

const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(0);
  const [searching, setSearching] = useState('');
  useEffect(() => {
    document.getElementById('loading').remove();
    // loadMore();
    socket.on('searchResult').then((d) => {
      console.log(d);
      setData(d as DataType[]);
    });
  }, []);

  const loadMore = () => {
    getData(page).then((d) => {
      const tmp = [...data];
      setData(tmp.concat(d as DataType));
      setPage(page + 1);
    });
  };

  const handleSearch = (keyword: string) => {
    if (keyword === '') return setData([]);
    setSearching(keyword);
    search(keyword);
  };

  return (
    <AppContainer>
      <Search search={handleSearch}/>
      <SubmitModal initialTibetan={searching}/>
      <VocabTable
        data={data}
      />
    </AppContainer>
  );
}

export default App;
