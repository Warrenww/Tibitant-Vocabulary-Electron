import React, { useState } from 'react';
import {
  Table,
} from 'antd';
import createColumns from './createColumns';
import { DataType } from '../effector';
import { useStore } from 'effector-react';
import { $store } from '../effector';

const VocabTable = () => {
  const { searchResults } = useStore($store);
  const [editingKey, setEditingKey] = useState(0);

  const columns = createColumns({ editingKey });

  return (
    <Table
      columns={columns}
      dataSource={searchResults}
      rowKey={(record: DataType) => record.id}
    />
  );
};

export default VocabTable;
