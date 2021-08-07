import React, {
  useState,
  useEffect,
} from 'react';
import {
  Table,
  Form,
} from 'antd';
import createColumns from './createColumns';
import { DataType } from '../effector';
import { useStore } from 'effector-react';
import { $store, editFx } from '../effector';

const VocabTable = () => {
  const { searchResults } = useStore($store);
  const [editingKey, setEditingKey] = useState(0);
  const [form] = Form.useForm();

  const handleSubmitEdit = async () => {
    const rows = await form.validateFields();
    const { id, vocabulary_id } = searchResults.find((x) => x.id === editingKey);
    if (!id || !vocabulary_id) {
      return;
    }
    await editFx({
      ...rows,
      id,
      vocabulary_id,
    });
    setEditingKey(null);
  }

  const columns = createColumns({
    editingKey,
    setEditingKey: (id) => setEditingKey(id),
    submitEdit: handleSubmitEdit,
  });

  useEffect(() => {
    const found = searchResults.find((x) => x.id === editingKey);
    form.setFieldsValue(found);
  }, [editingKey]);

  return (
    <Form form={form}>
      <Table
        columns={columns}
        dataSource={searchResults.filter((x) => !x.hidden)}
        rowKey={(record: DataType) => record.id}
        onRow={(record) => {
         return {
           onDoubleClick: () => {
             if (!editingKey) setEditingKey(record.id);
           },
         };
        }}
        expandable={{
          rowExpandable: (record) => !!(record.future || record.imperative || record.past),
          expandedRowRender: (record) => {
            const { future, past, imperative } = record;

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
    </Form>
  );
};

export default VocabTable;
