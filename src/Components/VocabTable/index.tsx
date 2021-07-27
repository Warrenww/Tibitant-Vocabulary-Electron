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

  React.useEffect(() => console.log(searchResults), [searchResults]);

  return (
    <Table
      columns={columns}
      dataSource={searchResults.filter((x) => !x.hidden)}
      rowKey={(record: DataType) => record.id}
      expandable={{
            rowExpandable: (record) => !!(record.future || record.imperative || record.past),
            expandedRowRender: (record) => {
              const { future, past, imperative } = record;
              console.log(record);
              const displayColumn = ['vocabulary', 'page']
                .map(x => columns.find(c => c.key === x))
                .concat([
                  {
                    title: 'Tense',
                    dataIndex: 'tense',
                    key: 'tense',
                    width: 100,
                    render: (value: string) => <>{value}</>,
                  },
                ]);
              const displayRow = [past, future, imperative]
                .filter(x => x)
                .map((x, i) => ({
                  ...searchResults.find(d => Number(d.vocabulary_id) === x),
                  tense: ['過去', '未來', '命令'][i],
                }));
              return (
                <>
                  <Table
                    columns={displayColumn}
                    dataSource={displayRow}
                    pagination={false}
                    rowKey={(record: DataType) => record.id}
                  />
                </>
              );
            }
          }}
    />
  );
};

export default VocabTable;
