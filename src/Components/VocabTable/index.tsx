import React, { useState } from 'react';
import {
  Table,
} from 'antd';
import createColumns from './createColumns';

export interface DataType {
  future: number | null;
  id: number;
  imperative: boolean | null;
  link: number | null;
  page: number | null;
  part_of_speech_id: number;
  past: number | null;
  transitive: boolean | null;
  translation: string;
  vocabulary: string;
  vocabulary_id: string;
}

const VocabTable = ({
  data,
}: {
  data: DataType[];
}) => {
  const [editingKey, setEditingKey] = useState(0);

  const columns = createColumns({ editingKey });

  return (
    <Table
      columns={columns}
      dataSource={data}
    />
  );
};

export default VocabTable;
