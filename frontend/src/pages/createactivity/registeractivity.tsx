import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Spin,
  Switch,
  Table,
  Typography,
} from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { DatamanagementService } from '../../stores/meeting-store';
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;
export const Registeractivity: React.FC = (): React.ReactElement => {
  const { state } = useLocation() as any;
  const [loading, setLoading] = useState(true);
  const [valueActivity, setValueActivity] = useState<any>([]);
  const [dataSource, setdataSource] = useState<any>([]);
  const onChangeForm = (values: any, changvalue: any) => {
    setValueActivity(changvalue);
  };
  useEffect(() => {
    checkprofile().then((data: any) => {
      setValueActivity({
        detail: data,
      });

      setdataSource(data);
      setLoading(false);
    });
  }, []);
  const checkprofile = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(await DatamanagementService().getactivityall(state?.idactivity));
    });
  };
  const submitFrom = async () => {
    await DatamanagementService().createactivity(
      state?.idactivity,
      valueActivity,
    );
  };
  return loading ? (
    <Spin spinning={true}></Spin>
  ) : (
    <>
      <Row
        gutter={[
          { xs: 8, sm: 16 },
          { xs: 8, sm: 16 },
        ]}
      >
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
        >
          <Title
            style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}
          >
            เพิ่มก๊วน
          </Title>
        </Card>
      </Row>

      <Form
        name="dynamic_form_nest_item"
        onValuesChange={onChangeForm}
        onFinish={submitFrom}
        layout="vertical"
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Form.List name="detail" initialValue={dataSource}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                console.log(dataSource[name]);

                return (
                  <>
                    <Card
                      style={{ width: '100%' }}
                      key={key}
                      title={
                        <>
                          <Text type="secondary">ก๊วนที่ {name + 1}</Text>
                        </>
                      }
                    >
                      <Row>
                        <Col span={4}>
                          <Form.Item
                            label="เลขใบสมัคร"
                            {...restField}
                            rules={[
                              { required: true, message: 'กรุณากรอกเรื่อง' },
                            ]}
                            name={[name, 'applicationnumber']}
                          >
                            <Input placeholder="เลขใบสมัคร" />
                          </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                          <Form.Item
                            label="ชื่อก๊วน"
                            {...restField}
                            name={[name, 'namegang']}
                          >
                            <Input placeholder="ชื่อก๊วน" />
                          </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                          <Form.Item
                            label="ตารางการแข่งขัน"
                            {...restField}
                            name={[name, 'schedulematch']}
                          >
                            <Input placeholder="รายละเอียด" />
                          </Form.Item>
                        </Col>
                        <Col span={6} offset={1}>
                          <Form.Item
                            label="สถานะการจ่ายเงิน"
                            {...restField}
                            name={[name, 'paymentstatus']}
                            rules={[
                              { required: true, message: 'กรุณาเลือกสถานะ' },
                            ]}
                          >
                            <Radio.Group>
                              <Space direction="horizontal">
                                <Radio value={true}>จ่ายแล้ว</Radio>
                                <Radio value={false}>ยังไม่จ่าย</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>
                          <Form.Item
                            label="เจ้าของก๊วน"
                            {...restField}
                            rules={[
                              { required: true, message: 'กรุณาเลือกสถานะ' },
                            ]}
                            name={[name, 'ownergang']}
                          >
                            <Input placeholder="เจ้าของก๊วน" />
                          </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                          <Form.Item
                            label="เบอร์โทร เจ้าของก๊วน"
                            {...restField}
                            name={[name, 'phonenumberownergang']}
                            rules={[
                              { required: true, message: 'กรุณาเลือกสถานะ' },
                            ]}
                          >
                            <Input placeholder="เบอร์โทรเจ้าของก๊วน" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>
                          <Form.Item
                            label="รายชื่อสมาชิค"
                            {...restField}
                            name={[name, 'member1']}
                          >
                            <Input placeholder="รายชื่อคนที่ 1" />
                          </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                          <Form.Item
                            label=" "
                            {...restField}
                            name={[name, 'member2']}
                          >
                            <Input placeholder="รายชื่อคนที่ 2" />
                          </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                          <Form.Item
                            label=" "
                            {...restField}
                            name={[name, 'member3']}
                          >
                            <Input placeholder="รายชื่อคนที่ 3" />
                          </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                          <Form.Item
                            label=" "
                            {...restField}
                            name={[name, 'member4']}
                          >
                            <Input placeholder="รายชื่อคนที่ 4" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Col span={4} offset={1} hidden>
                        <Form.Item
                          label=" "
                          {...restField}
                          name={[name, 'idactivity']}
                          initialValue={state?.idactivity}
                        ></Form.Item>
                      </Col>
                      <Col span={4} offset={1} hidden>
                        <Form.Item
                          label=" "
                          {...restField}
                          name={[name, 'checkinstatus']}
                          initialValue={true}
                        ></Form.Item>
                      </Col>

                      <Col span={1} hidden>
                        <Form.Item
                          {...restField}
                          name={[name, 'sendsmsstatus']}
                          initialValue={false}
                        />
                      </Col>

                      <Row>
                        <Col offset={23}>
                          <Button
                            onClick={() => remove(name)}
                            danger
                            disabled={
                              dataSource[name] === undefined ||
                              dataSource[name].sendsmsstatus === false
                                ? false
                                : true
                            }
                          >
                            <DeleteFilled style={{ color: '#FF4D4F' }} />
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  เพิ่มก๊วน
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            style={{ backgroundColor: '#1E6541', border: 'none' }}
            type="primary"
            htmlType="submit"
            // onClick={() => submitFrom()}
            block
          >
            ยืนยัน
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
