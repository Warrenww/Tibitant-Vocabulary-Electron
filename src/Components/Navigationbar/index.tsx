import React, { useState } from 'react';
import {
  Drawer,
  Button,
  List,
} from 'antd';
import {
  MenuOutlined,
  CloseCircleFilled,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import {
  NavBar,
  SystemBar,
  SystemDraggable,
} from './styles';
import {
  systemCall,
} from '../API';
import { VERSION } from '../../Constant/version';

const Navigation = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
    <SystemBar>
      <SystemDraggable>
        藏文工具 v.{VERSION}
      </SystemDraggable>
      <Button
        shape="circle"
        type="ghost"
        onClick={() => systemCall('close')}
        style={{ color: '#d15656' }}
      >
        <CloseCircleFilled />
      </Button>
      <Button
        shape="circle"
        type="ghost"
        onClick={() => systemCall('minimize')}
        style={{ color: '#e9c236' }}
      >
        <MinusCircleFilled />
      </Button>
      <Button
        shape="circle"
        type="ghost"
        onClick={() => systemCall('maximize')}
        style={{ color: '#7cb561' }}
      >
        <PlusCircleFilled />
      </Button>
    </SystemBar>
    <NavBar>
      <Button onClick={() => setDrawerVisible(!drawerVisible)} shape="circle" icon={<MenuOutlined />} />
    </NavBar>
    <Drawer
      title="Tools"
      width={325}
      closable={false}
      onClose={() => setDrawerVisible(false)}
      visible={drawerVisible}
      placement="left"
    >
      <List />
    </Drawer>
    </>
  )
};

export default Navigation;
