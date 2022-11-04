import { Button, Col, Form, Input, Row, Space, Upload } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
type RequiredMark = boolean | 'optional';
const { TextArea } = Input;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  Pagestep: string;
};

export const CreateStepOne: React.FC<Props> = ({
  children,
  extra,
  Pagestep,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>('optional');
  const [fileList, setFileList] = useState<any>([]);
  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  const onclickBack = () => {
    navigate(`agendas`);
  };
  const [test, settest] = useState<any>([]);
  const onclickNext = () => {
    form.validateFields().then(values => {
      settest([...test, values]);
      console.log(test);
    });

    navigate(`agendasfood`);
  };
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };
  return (
    <>
      <Row>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: '100%' }}
          form={form}
          // layout="vertical"
          // initialValues={{ requiredMarkValue: requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
        >
          <Form.Item
            label={`ระเบียบวาระที่ ${Pagestep}`}
            required
            tooltip="This is a required field"
            name="agendas"
          >
            <Input placeholder="เรื่องประธานแจ้งที่ประชุมทราบ" />
          </Form.Item>
          <Form.Item
            label="รายละเอียดการประชุม"
            tooltip={{
              title: 'Tooltip with customize icon',
              icon: <InfoCircleOutlined />,
            }}
            name="detail"
          >
            <TextArea />
          </Form.Item>
          <Row>
            <Col span={2}>เรื่องที่</Col>
            <Col span={18}>รายละเอียด</Col>
            <Col offset={1} span={3}></Col>
          </Row>
          <Form.List
            name="detailagendes"
            initialValue={[{ key: 0, name: 0, isListField: true, fieldKey: 0 }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <Row key={key}>
                      <Col span={2}>
                        <Form.Item>{`${Pagestep}.${name + 1}`}</Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item
                          {...restField}
                          name={[name, 'detail']}
                          rules={[
                            { required: true, message: 'Missing detail' },
                          ]}
                        >
                          <Input placeholder="detail" />
                        </Form.Item>
                      </Col>

                      <Col offset={1} span={3}>
                        <DeleteOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  );
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    เพิ่มเรื่อง
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Upload {...props}>
                <Button
                  disabled={fileList.length === 1}
                  icon={<UploadOutlined />}
                >
                  Select File
                </Button>
              </Upload>
            </Col>
          </Row>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space>
            <Button onClick={onclickBack}>Back</Button>
            <Button
              style={{ color: 'white', background: '#1E6541' }}
              onClick={onclickNext}
            >
              Next
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};
