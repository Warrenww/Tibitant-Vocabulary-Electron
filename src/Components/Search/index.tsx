import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Container } from './styles';
import Tibetan from '../Tibetan';
import { useStore } from 'effector-react';
import { $store, setSearching, searchFx } from '../effector';

const Search = () => {
  const { searching } = useStore($store);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const keyword = e.target.value;
    setSearching(keyword);
    if(keyword) searchFx(keyword);
  };

  return (
    <Container>
      <Input
        value={searching}
        onChange={handleChange}
        prefix={<SearchOutlined />}
        suffix={<Tibetan source={searching} preview small/>}
        allowClear
      />
    </Container>
  );
};

export default Search;
