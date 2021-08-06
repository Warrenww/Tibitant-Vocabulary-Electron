import React, {
  useMemo,
} from 'react';
import {
  Tooltip,
  Button,
} from 'antd';
import {
  TagFilled,
  TagOutlined,
} from '@ant-design/icons';
import { useStore } from 'effector-react';
import {
  $store,
  DataType,
  addToBookMark,
  removeFromBookMark,
} from '../effector';

export default function ActionArea ({
  vocab,
}: {
  vocab: DataType;
}) {
  const { bookmarks } = useStore($store);

  const exist = useMemo(() => bookmarks.find((x) => x.vocabulary_id === vocab.vocabulary_id), [bookmarks]);



  return (
    <Tooltip title={`${exist ? 'Remove from' : 'Add to'} bookmark`}>
      <Button
        onClick={() => {exist ? removeFromBookMark(vocab.vocabulary_id) : addToBookMark(vocab)}}
        type={exist ? 'primary' : 'default'}
        shape="circle"
      >
        {exist ? <TagFilled /> : <TagOutlined />}
      </Button>
    </Tooltip>
  )
}
