import React, {
  useState,
  useEffect,
} from 'react';
import {
  Form,
  Input,
} from 'antd';
import Tibetan from '../Tibetan';

const FormInputWithPreview = ({
  label,
  name,
  required,
  tibetanValue,
}:{
  label?: React.ReactNode;
  name: string | string[];
  required?: boolean;
  tibetanValue?: string;
}) => {
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(tibetanValue);
  }, [tibetanValue]);

  return (
    <>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: required ?? false }]}
        help={(
          <Tibetan
            source={value ?? ''}
            preview
            small
            marginHorizental={10}
            marginVertical={10}
          />
        )}
      >
        <Input
          onChange={handleChange}
          allowClear
        />
      </Form.Item>
    </>
  );
};

export default FormInputWithPreview;
