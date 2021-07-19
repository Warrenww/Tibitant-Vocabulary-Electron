import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Container } from './styles';
import Tibetan from '../Tibetan';

const Search = ({
  search,
}: {
  search: (keyword: string) => void;
}) => {
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    search(e.target.value);
  };

  return (
    <Container>
      <Input
        value={value}
        onChange={handleChange}
        prefix={<SearchOutlined />}
        suffix={<Tibetan source={value} preview small/>}
      />
    </Container>
  );
};

export default Search;
