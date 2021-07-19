import socket from './socket';

export const getData = async (page: number) => {
  socket.send('getData', { page });
  const data = await socket.on('getData');
  return data;
};
