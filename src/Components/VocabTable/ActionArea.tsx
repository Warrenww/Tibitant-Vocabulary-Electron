import React, {
  useMemo,
} from 'react';
import {
  Tooltip,
  Button,
  Popconfirm,
} from 'antd';
import {
  TagFilled,
  TagOutlined,
  EditFilled,
  SaveOutlined,
  CloseCircleFilled,
  DeleteFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { useStore } from 'effector-react';
import {
  $store,
  DataType,
  addToBookMark,
  removeFromBookMark,
  deleteFx,
  onlineSearchFx,
} from '../effector';
import { Actions } from './styles';

export default function ActionArea ({
  vocab,
  isEditing,
  handleEdit,
  handleCancel,
  submitEdit,
  editingKey,
}: {
  vocab: DataType;
  isEditing: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  submitEdit: () => void;
  editingKey:number;
}) {
  const { bookmarks } = useStore($store);

  const exist = useMemo(() => bookmarks.find((x) => x.vocabulary_id === vocab.vocabulary_id), [bookmarks]);

  return isEditing ? (
    <Actions>
      <Tooltip title="Save">
        <Popconfirm
          title="Are you sure to save the change?"
          onConfirm={submitEdit}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            shape="circle"
            icon={<SaveOutlined />}
          />
        </Popconfirm>
      </Tooltip>
      <Tooltip title="Cancel">
        <Button
          onClick={handleCancel}
          type="default"
          shape="circle"
          icon={<CloseCircleFilled />}
        />
      </Tooltip>
    </Actions>
  ) : (
    <Actions>
      <Tooltip title={`${exist ? 'Remove from' : 'Add to'} bookmark`}>
        <Button
          onClick={() => {exist ? removeFromBookMark(vocab.vocabulary_id) : addToBookMark(vocab)}}
          type={exist ? 'primary' : 'default'}
          shape="circle"
          icon={exist ? <TagFilled /> : <TagOutlined />}
        />
      </Tooltip>
      <Tooltip title="Edit">
        <Button
          onClick={handleEdit}
          type="default"
          shape="circle"
          disabled={editingKey && vocab.id !== editingKey}
          icon={<EditFilled />}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <Popconfirm
          title="Are you sure to delete this term?"
          onConfirm={() => deleteFx(vocab.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="default"
            danger
            shape="circle"
            icon={<DeleteFilled />}
          />
        </Popconfirm>
      </Tooltip>
      <Tooltip title="Search online">
        <Button
          type="default"
          onClick={() => onlineSearchFx(vocab.vocabulary)}
          shape="circle"
          icon={<SearchOutlined />}
        />
      </Tooltip>
    </Actions>
  )
}
