import React from 'react';
import {
  Form,
  Tag,
  Input,
  InputNumber,
  Button,
} from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { TibetanText } from '../Tibetan/styles';
import { parser } from '../../Utils/Tibetan';
import { PosSelect } from '../SubmitModal';
import Tibetan from '../Tibetan';
import { DataType } from '.';

const createColumns = ({
  editingKey,
}: {
  editingKey: number;
}) => {
  const isEditing = (record: DataType) => record.id === editingKey;

  return [
      {
        title: 'Tibetan',
        dataIndex: 'vocabulary',
        key: 'vocabulary',
        render: (text: string) => <TibetanText>{parser(text)}</TibetanText>,
        width: 250,
      },
      {
        title: 'POS',
        dataIndex: 'part_of_speech_id',
        key: 'part_of_speech_id',
        render: (idx: number, record: DataType) => isEditing(record) ? (
          <Form.Item name="part_of_speech_id">
            <PosSelect />
          </Form.Item>
        ) : (
          <>
            {['-', 'V.', 'N.', 'Adj.', 'Adv.'][idx] || '-'}
            {' '}
            {
              idx === 1 && record.transitive !== null ? (
                <Tag>
                  {
                    record.transitive ?
                      <Tibetan small source={'tha dad pa'} /> :
                      <Tibetan small source={'tha mi dad pa'} />
                  }
                </Tag>
              ) : (
                <></>
              )
            }
          </>
        ),
        width: 150,
      },
      {
        title: 'Chinese',
        dataIndex: 'translation',
        key: 'translation',
        render: (text: string, record: DataType) => isEditing(record) ? (
          <Form.Item
            name="translation"
            rules={[{required: true}]}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            {text}
            {record.link ?
              <Button
                type="text"
                shape="circle"
                onClick={() => {
                  // setDisplayDataType(data.filter(x => x.vocabulary_id === record.link));
                  // setShowBookmark(true);
                }}
              >
                <LinkOutlined />
              </Button> :
              <></>
            }
          </>
        ),
        width: 300,
      },
      {
        title: 'Page',
        dataIndex: 'page',
        key: 'page',
        render: (page: number, record: DataType) =>  isEditing(record) ? (
            <Form.Item name="page">
              <InputNumber />
            </Form.Item>
          )
          : (page || '-'),
        width: 120,
      },
      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (text, record) => (
      //     <ActionArea
      //       text={text}
      //       record={record}
      //       storage={storage}
      //       setStorage={setStorage}
      //       onDelete={onDelete}
      //       editingKey={editingKey}
      //       setEditingKey={setEditingKey}
      //       form={form}
      //       onUpdate={onUpdate}
      //     />
      //   ),
      //   width: 200,
      // },
    ];
};

export default createColumns;
