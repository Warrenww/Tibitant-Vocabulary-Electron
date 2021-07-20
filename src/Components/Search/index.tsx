import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Container } from './styles';
import Tibetan from '../Tibetan';

const Search = ({
  search,
  searching,
  setSearching,
}: {
  search:(keyword: string) => void;
  searching: string;
  setSearching: (keyword: string) => void;
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    search(e.target.value);
    setSearching(e.target.value);
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
