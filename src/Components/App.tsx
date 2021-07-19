import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { getData } from './API';
import { AppContainer } from './styles';
import VocabTable, { DataType } from './VocabTable';


const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    document.getElementById('loading').remove();
    loadMore();
  }, []);

  const loadMore = () => {
    getData(page).then((d) => {
      const tmp = [...data];
      setData(tmp.concat(d as DataType));
      setPage(page + 1);
    });
  }

  return (
    <AppContainer>
      <Button onClick={loadMore}>
        Load More
      </Button>
      <VocabTable
        data={data}
      />
    </AppContainer>
  );
}

export default App;
