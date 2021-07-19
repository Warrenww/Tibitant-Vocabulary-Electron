import socket from './socket';

export const getData = async (page: number) => {
  socket.send('getData', { page });
  const data = await socket.on('getData');
  return data;
};

export const search = async (keyword: string) => {
  socket.send('search', { keyword });
  const data = await socket.on('searchResult');
  return data;
}
