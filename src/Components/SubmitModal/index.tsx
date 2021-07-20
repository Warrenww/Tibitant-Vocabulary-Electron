import React, {
  useState,
  useEffect,
} from 'react';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Radio,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TriggerButton } from './styles';
import Tibetan from '../Tibetan';
import PosSelect from './PosSelect';
import FormInputWithPreview from './FormInputWithPreview';
import { createVocab } from '../API';
import { CreateVocabDto } from '../../Utils/interface';

const SubmitModal = ({
  initialTibetan,
}: {
  initialTibetan?: string;
}) => {
  const [form] = Form.useForm<CreateVocabDto>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (initialTibetan) {
      form.setFieldsValue({
        tibetan: initialTibetan,
      });
    }
  }, [initialTibetan]);

  const toggleVisible = () => setVisible(!visible);

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleSubmit = async () => {
    const rows = await form.validateFields();
    console.log(rows);
    createVocab(rows);
    setVisible(false);
  };

  return (
    <>
      <TriggerButton
        icon={<PlusOutlined size={30}/>}
        type="primary"
        shape="circle"
        onClick={toggleVisible}
      />
      <Modal
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        closable={false}
        forceRender
        width={600}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          onFinish={handleSubmit}
        >
          <FormInputWithPreview
            label="Tibetan"
            name="tibetan"
            tibetanValue={initialTibetan}
            required
          />
          <Form.Item
            label="Chinese"
            name="translation"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Page"
            name="page"
          >
            <InputNumber />
          </Form.Item>
          <PosSelect />
          <Form.Item shouldUpdate noStyle>
          {
            () => form.getFieldValue('part_of_speech_id') === 1 && (
              <>
                <Form.Item
                  label="Transitive"
                  name="transitive"
                >
                  <Radio.Group>
                    <Radio value={true}><Tibetan small source={'tha dad pa'} /></Radio>
                    <Radio value={false}><Tibetan small source={'tha mi dad pa'} /></Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label={<Tibetan small source={'\'.das pa'} />}
                  tooltip="Past, 過去式"
                >
                  <Input.Group compact>
                    <Form.Item name={['past', 'page']}>
                      <InputNumber placeholder="page"/>
                    </Form.Item>
                    <FormInputWithPreview name={['past', 'vocabulary']}/>
                  </Input.Group>
                </Form.Item>
                <Form.Item
                  label={<Tibetan small source={'ma \'ongs pa'} />}
                  tooltip="Future, 未來式"
                >
                  <Input.Group compact>
                    <Form.Item name={['future', 'page']}>
                      <InputNumber placeholder="page"/>
                    </Form.Item>
                    <FormInputWithPreview name={['future', 'vocabulary']}/>
                  </Input.Group>
                </Form.Item>
                <Form.Item
                  label="Imperative"
                  tooltip="命令式"
                >
                  <Input.Group compact>
                    <Form.Item name={['imperative', 'page']}>
                      <InputNumber placeholder="page"/>
                    </Form.Item>
                    <FormInputWithPreview name={['imperative', 'vocabulary']}/>
                  </Input.Group>
                </Form.Item>
              </>
            )
          }
        </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SubmitModal;
