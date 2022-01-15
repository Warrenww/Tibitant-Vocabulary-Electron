import React, { useRef, useState, useEffect } from 'react';
import {
  Input,
  Button,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Container } from './styles';
import Tibetan from '../Tibetan';
import {
  setSearching,
  searchFx,
  onlineSearchFx,
} from '../effector';

const Search = () => {
  const [value, setValue] = useState('');
  const searchTimeOut = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const inputRef = document.getElementById('searchInput');
    if (inputRef) inputRef.classList.add('mousetrap');
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const keyword = e.target.value;
    setValue(keyword);

    if (searchTimeOut.current !== undefined) {
      clearTimeout(searchTimeOut.current);
    }
    searchTimeOut.current = setTimeout(() => {
      if (keyword) searchFx(keyword);
      setSearching(keyword);
    }, 350);

  };

  return (
    <Container>
      <Input
        value={value}
        onChange={handleChange}
        prefix={<SearchOutlined />}
        suffix={<Tibetan source={value} preview small/>}
        allowClear
        id="searchInput"
      />
      <Button
        onClick={() => onlineSearchFx(value)}
      >
        Search Online
      </Button>
    </Container>
  );
};

export default Search;
