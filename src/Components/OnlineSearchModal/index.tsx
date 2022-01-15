import React, { useMemo } from 'react';
import {
  Modal,
  Table,
} from 'antd';
import { useStoreMap } from 'effector-react';
import Tibetan from '../Tibetan';
import {
  $store,
  hideOnlineSearchingModal
} from '../effector';

const OnlineSearchModal = () => {
  const visible = useStoreMap($store, ({ onlineSearching }) => onlineSearching.visible);
  const contents = useStoreMap($store, ({ onlineSearching }) => onlineSearching.results);
  const tibetan = useStoreMap($store, ({ onlineSearching }) => onlineSearching.searchWord);

  const data = useMemo(() => Object.keys(contents).map((key, idx) => ({
    dictionary: key,
    content: Object.values(contents)[idx],
  })), [contents]);

  return (
    <Modal
      visible={visible}
      onCancel={() => hideOnlineSearchingModal()}
      closeIcon={null}
      footer={null}
      title={<Tibetan source={tibetan}/>}
    >
      <Table
        dataSource={data}
        columns={[
          {
            title: 'Dictionary',
            dataIndex: 'dictionary',
            key: 'dictionary',
          },
          {
            title: 'Explanation',
            dataIndex: 'content',
            key: 'content',
          },
        ]}
      />
    </Modal>
  );
};

export default OnlineSearchModal;
