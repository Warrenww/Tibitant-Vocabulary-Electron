import React, { useState } from 'react';
import {
  Drawer,
  List,
  Typography,
  Button,
  Divider,
  Badge,
  Tooltip,
} from 'antd';
import { BookOutlined, DeleteFilled } from '@ant-design/icons';
import { TriggerButton } from '../styles';
import { useStore } from 'effector-react';
import { $store, removeFromBookMark } from '../effector';
import { TibetanText } from '../Tibetan/styles';
import { parser } from '../../Utils/Tibetan';

const { Text } = Typography;

export default function BookMark () {
  const { bookmarks } = useStore($store);
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <>
      <Tooltip title="書籤" placement="left">
        <TriggerButton
          $index={1}
          type="primary"
          shape="circle"
          onClick={toggleShow}
        >
          <Badge count={bookmarks.length}>
            <BookOutlined />
          </Badge>
        </TriggerButton>
      </Tooltip>
      <Drawer
        visible={show}
        onClose={() => setShow(false)}
        closeIcon={<></>}
        width={400}
      >
        <List
          dataSource={bookmarks}
          renderItem={
            (item) => (
              <List.Item
                actions={[
                  <Button
                    icon={<DeleteFilled />}
                    shape="circle"
                    onClick={() => removeFromBookMark(item.vocabulary_id)}
                  />
                ]}
              >
                <List.Item.Meta
                  title={(
                    <>
                      <TibetanText>{parser(item.vocabulary)}</TibetanText>
                      <Divider type="vertical"/>
                      <Text>{['-', 'V.', 'N.', 'Adj.', 'Adv.'][item.part_of_speech_id]}</Text>
                    </>
                  )}
                  description={<Text>{item.translation}</Text>}
                />
                {item.page}
              </List.Item>
            )
          }
        />
      </Drawer>
    </>
  )
}
