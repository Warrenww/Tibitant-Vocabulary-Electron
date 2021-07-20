import React from 'react';
import {
  Select,
  Form,
} from 'antd';

const { Option } = Select;

const PosSelect = () => (
  <Form.Item
    label="POS"
    name="part_of_speech_id"
    tooltip="Part of Speech (詞性)"
  >
    <Select>
      <Option value={0}> </Option>
      <Option value={1}> V. </Option>
      <Option value={2}> N. </Option>
      <Option value={3}> Adj. </Option>
      <Option value={4}> Adv. </Option>
    </Select>
  </Form.Item>
);

export default PosSelect;
