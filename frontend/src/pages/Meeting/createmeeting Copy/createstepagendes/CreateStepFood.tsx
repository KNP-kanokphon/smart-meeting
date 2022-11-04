import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Steps,
  Card,
  Select,
  Space,
  Typography,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/style.css'
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
const { Step } = Steps;
const { TextArea } = Input;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

export const CreateStepFood: React.FC<Props> = ({ children, extra }) => {
  const { Option } = Select;
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
  const onclickBlack = () => {
    navigate(`/meeting/agendas`);
  };
  const onclickSubmit = () => {
    console.log('1');
  };
  return (
    <>
      <Card title="Create Meeting" style={{ width: '100%' }}>
        <Row>
          <Steps size="small" current={2}>
            <Step title="Finished" />
            <Step title="Finished" />
            <Step title="In Progress" />
          </Steps>
        </Row>
        <Form
          style={{ width: '100%' }}
          form={form}
          layout="vertical"
          initialValues={{ requiredMarkValue: requiredMark }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  marginBottom: '20px',
                  marginTop: '20px',
                }}
              >
                รายการอาหารและเครื่องดื่ม
              </Typography>
            </Col>
            <Col span={2}>ประเภท</Col>
            <Col span={22}>ชื่อรายการอาหารและเครื่องดื่ม</Col>
          </Row>
          <Form.List
            name="users"
            initialValue={[{ key: 0, name: 0, isListField: true, fieldKey: 0 }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <Row key={key} gutter={16}>
                      <Col span={2}>
                        <Form.Item
                          {...restField}
                          name={[name, 'first']}
                          rules={[
                            { required: true, message: 'Missing first name' },
                          ]}
                        >
                          <Select placeholder={'Please Select'} allowClear>
                            <Option key={'1'} value={'food'}>
                              อาหาร
                            </Option>
                            <Option key={'2'} value={'snack'}>
                              ของว่าง
                            </Option>
                            <Option key={'3'} value={'drink'}>
                              เครื่องดื่ม
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={21}>
                        <Form.Item
                          {...restField}
                          name={[name, 'last']}
                          rules={[
                            { required: true, message: 'Missing last name' },
                          ]}
                        >
                          <Input placeholder="Text" />
                        </Form.Item>
                      </Col>

                      <Col span={1}>
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
          {/* <Row>
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
          </Row> */}
          {/* <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item> */}
        </Form>
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Space>
              <Button onClick={onclickBlack}>Back</Button>

              <Button
                style={{ color: 'white', background: '#1E6541' }}
                onClick={onclickSubmit}
              >
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  );
};
