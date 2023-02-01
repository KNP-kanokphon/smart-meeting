import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Switch,
  Tabs,
  Upload,
} from 'antd';
import { DeleteFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './styles.css';
import React, { useEffect, useImperativeHandle, useState } from 'react';
const { TextArea } = Input;

type Props = {
  setDataField: (dataField: any) => void;
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

export const DetailPage: React.FC<Props> = ({
  setDataField,
  children,
  extra,
}) => {
  const onChangeForm = (values: any, changvalue: any) => {
    setDataField(changvalue);
  };
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={onChangeForm}
        autoComplete="off"
      >
        <Form.List
          name="agenda"
          initialValue={[{ key: 0, name: 0, isListField: true, fieldKey: 0 }]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Card style={{ width: '100%' }} key={key}>
                    <Row style={{ paddingBottom: 16, fontSize: 16 }}>
                      <Col span={6}>
                        <b>ระเบียบวาระที่ {name + 1} </b>
                      </Col>
                      <Col offset={16}>
                        <Button onClick={() => remove(name)} danger>
                          <DeleteFilled style={{ color: '#FF4D4F' }} />
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          rules={[
                            { required: true, message: 'กรุณากรอกเรื่อง' },
                          ]}
                        >
                          <Input placeholder="เรื่อง" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item {...restField} name={[name, 'detail']}>
                          <TextArea rows={4} placeholder="รายละเอียด" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item {...restField} name={[name, 'file']}>
                        <Upload customRequest={dummyRequest}>
                          <Button icon={<UploadOutlined />}>
                            Click To Upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Row>
                  </Card>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  เพิ่มระเบียบวาระ
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};
