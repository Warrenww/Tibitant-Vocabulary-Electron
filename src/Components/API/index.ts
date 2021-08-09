import socket from './socket';
import {
  CreateVocabDto,
  EditVocabDto,
  SystemCommand,
} from '../../Utils/interface';
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

export const editVocab = async (data: EditVocabDto) => {
  socket.send('edit', { data });
  const result = await socket.on('insertResult');
  return (result as DataType[]);
}

export const getVocabById = async (id: number) => {
  socket.send('search', { id });
  const result = await socket.on('searchResult');
  return (result as DataType[]);
}

export const systemCall = (command: SystemCommand): void => socket.send('SystemCommand', command);
