import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const PosSelect = () => (
  <Select>
    <Option value={0}> </Option>
    <Option value={1}> V. </Option>
    <Option value={2}> N. </Option>
    <Option value={3}> Adj. </Option>
    <Option value={4}> Adv. </Option>
  </Select>
);
