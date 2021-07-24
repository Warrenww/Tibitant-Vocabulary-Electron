import socket from './socket';
import { CreateVocabDto } from '../../Utils/interface';
import { DataType } from '../effector';

export const getData = async (page: number) => {
  socket.send('getData', { page });
  const data = await socket.on('getData');
  return data;
};

export const search = async (keyword: string) => {
  socket.send('search', { keyword });
  const data = await socket.on('searchResult');
  return (data as DataType[]);
}

export const createVocab = async (data: CreateVocabDto) => {
  socket.send('create', { data });
  const result = await socket.on('insertResult');
  return (result as DataType[]);
}
