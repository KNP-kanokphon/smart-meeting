import { Button, Card, Col, Form, Input, Row, Steps, Tabs, Upload } from 'antd';
import './styles.css';
import React, { useEffect, useState } from 'react';
import { DetailListedit } from './components/detailListedit';
import { DatamanagementService } from '../../../stores/meeting-store';
import { DeleteFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { find, result } from 'lodash';
import { numberFormat } from '../../../utils';
import { DetailList } from './components/detailList';
const { TextArea } = Input;
const { Step } = Steps;

type Props = {
  setDataField: (dataField: any) => void;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  data?: any;
  agenda: any;
  nameFileagendes: any;
  id: any;
};

export const DetailPage: React.FC<Props> = ({
  setDataField,
  children,
  extra,
  data,
  agenda,
  nameFileagendes,
  id,
}) => {
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  useEffect(() => {
    setDataField({ agenda: agenda });
  }, [agenda]);
  const onChangeForm = (values: any, changvalue: any) => {
    setDataField(changvalue);
  };

  return (
    <>
      <br></br>
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={onChangeForm}
        autoComplete="off"
      >
        {agenda && nameFileagendes && (
          <Form.List name="agenda" initialValue={agenda}>
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
                          <Upload
                            customRequest={dummyRequest}
                            defaultFileList={nameFileagendes.filter(
                              (x: any) => Number(x.step) === Number(key + 1),
                            )}
                          >
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
        )}
      </Form>
    </>
  );
};
