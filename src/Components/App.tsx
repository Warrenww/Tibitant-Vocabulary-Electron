import React, { useEffect, useState } from 'react';
import { getData, search } from './API';
import { AppContainer } from './styles';
import Search from './Search';
import VocabTable, { DataType } from './VocabTable';


const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    document.getElementById('loading').remove();
    // loadMore();
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
    search(keyword).then((d) => {
      setData(d as DataType[]);
    });
  };

  return (
    <AppContainer>
      <Search search={handleSearch}/>
      <VocabTable
        data={data}
      />
    </AppContainer>
  );
}

export default App;
