import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Image,
  Form,
  Space,
  Divider,
  Input,
  Spin,
  Modal,
  Tabs,
  Radio,
} from 'antd';
import {
  ArrowRightOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/images/KPIS Logo.png';
import './GolfRoute.css';
import { DatamanagementService } from '../../stores/meeting-store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Label } from 'recharts';
export interface Props {
  baseURL: string;
}

interface Idetail {
  id?: number;
  idactivity: string;
  applicationnumber: string;
  phonenumberownergang: string;
  namegang: string;
  schedulematch: string;
  paymentstatus: boolean;
  ownergang: string;
  member1: string;
  phonenumbermember1: string;
  member2: string;
  phonenumbermember2: string;
  member3: string;
  phonenumbermember3: string;
  member4: string;
  phonenumbermember4: string;
  checkinstatus: boolean;
  sendsmsstatus: boolean;
}
export const GolfForm: React.FC<Props> = ({ baseURL }): React.ReactElement => {
  // const location = useLocation();
  const navigate = useNavigate();
  const { idactivity } = useParams<{ idactivity: string }>();
  const { applicationnumber } = useParams<{ applicationnumber: string }>();
  const [loading, setLoading] = useState(true);
  const [dataSource, setdataSource] = useState<Idetail>();
  const [valueActivity, setValueActivity] = useState<any>();
  const [dataTeam, setDataTeam] = useState<any>([]);
  useEffect(() => {
    checkprofile().then(async (data: any) => {
      const datateam = await DatamanagementService().getactivitybyphone(
        data[0].phonenumberownergang,
      );
      setDataTeam(datateam);
      setValueActivity({ detail: datateam });
      setdataSource(data[0]);
      setLoading(false);
    });
  }, []);

  const checkprofile = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(
        await DatamanagementService().getactivitybyid(
          idactivity,
          applicationnumber,
        ),
      );
    });
  };

  const onChangeForm = (values: any, changvalue: any) => {
    setValueActivity(changvalue);
  };

  const submitFrom = async () => {
    Modal.confirm({
      title: 'แก้ใขข้อมูล',
      icon: <ExclamationCircleOutlined />,
      content: 'ยืนยันการแก้ใขข้อมูล',
      okText: 'ตกลง',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        const result = await DatamanagementService().updateactivity(
          valueActivity,
        );
        if (result) {
          navigate(`/golfqrcode/${idactivity}/${applicationnumber}`, {
            state: valueActivity,
          });
        }
      },
    });
  };
  return loading && dataTeam ? (
    <Spin spinning={true}></Spin>
  ) : (
    <>
      <Row className="row">
        <Col xs={24} md={12} lg={12}>
          <Card className="card">
            <Row>
              <Col span={24}>
                <Image src={Logo} width={100} preview={false} />
              </Col>
              <Col span={24}>
                <Typography className="typotwo">กรอกรายละเอียดก๊วน</Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothree">
                  ท่านสามารถมีลูกก๊วนได้ 4 คน เท่านั้น
                </Typography>
              </Col>
            </Row>
            <Form
              name="dynamic_form_nest_item"
              onValuesChange={onChangeForm}
              onFinish={submitFrom}
              layout="vertical"
              autoComplete="off"
              style={{ width: '100%' }}
            >
              <Form.List name="detail" initialValue={dataTeam}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      return (
                        <>
                          <Card className="card" key={key}>
                            <Form.Item
                              label="เลขใบสมัคร"
                              {...restField}
                              rules={[
                                {
                                  required: true,
                                  message: 'กรุณากรอกเรื่อง',
                                },
                              ]}
                              name={[name, 'applicationnumber']}
                            >
                              <Input placeholder="เลขใบสมัคร" disabled />
                            </Form.Item>
                            <Form.Item
                              label="ตารางการแข่งขัน"
                              {...restField}
                              name={[name, 'schedulematch']}
                              hidden
                            >
                              <Input placeholder="รายละเอียด" />
                            </Form.Item>
                            <Form.Item
                              label="ชื่อก๊วน"
                              {...restField}
                              name={[name, 'namegang']}
                            >
                              <Input placeholder="ชื่อก๊วน" />
                            </Form.Item>
                            <Form.Item
                              hidden
                              label="สถานะการจ่ายเงิน"
                              {...restField}
                              name={[name, 'paymentstatus']}
                              rules={[
                                {
                                  required: true,
                                  message: 'กรุณาเลือกสถานะ',
                                },
                              ]}
                            >
                              <Radio.Group>
                                <Space direction="horizontal">
                                  <Radio value={true}>จ่ายแล้ว</Radio>
                                  <Radio value={false}>ยังไม่จ่าย</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                            <Form.Item
                              label="เจ้าของก๊วน"
                              {...restField}
                              rules={[
                                {
                                  required: true,
                                  message: 'กรุณาเลือกสถานะ',
                                },
                              ]}
                              name={[name, 'ownergang']}
                            >
                              <Input placeholder="เจ้าของก๊วน" disabled />
                            </Form.Item>
                            <Form.Item
                              hidden
                              label="เบอร์โทร เจ้าของก๊วน"
                              {...restField}
                              name={[name, 'phonenumberownergang']}
                              rules={[
                                {
                                  required: true,
                                  message: 'กรุณาเลือกสถานะ',
                                },
                              ]}
                            >
                              <Input placeholder="เบอร์โทรเจ้าของก๊วน" />
                            </Form.Item>
                            <Form.Item
                              label="รายชื่อสมาชิก"
                              {...restField}
                              name={[name, 'member1']}
                            >
                              <Input placeholder="รายชื่อคนที่ 1" />
                            </Form.Item>
                            <Form.Item
                              label=" "
                              {...restField}
                              name={[name, 'member2']}
                            >
                              <Input placeholder="รายชื่อคนที่ 2" />
                            </Form.Item>

                            <Form.Item
                              label=" "
                              {...restField}
                              name={[name, 'member3']}
                            >
                              <Input placeholder="รายชื่อคนที่ 3" />
                            </Form.Item>
                            <Form.Item
                              label=" "
                              {...restField}
                              name={[name, 'member4']}
                            >
                              <Input placeholder="รายชื่อคนที่ 4" />
                            </Form.Item>
                            <Col span={4} offset={1} hidden>
                              <Form.Item
                                label=" "
                                {...restField}
                                name={[name, 'idactivity']}
                                // initialValue={state?.idactivity}
                              ></Form.Item>
                            </Col>
                            <Col span={4} offset={1} hidden>
                              <Form.Item
                                label=" "
                                {...restField}
                                name={[name, 'checkinstatus']}
                                initialValue={false}
                              ></Form.Item>
                            </Col>

                            <Col span={1} hidden>
                              <Form.Item
                                {...restField}
                                name={[name, 'sendsmsstatus']}
                                initialValue={false}
                              />
                            </Col>

                            {/* <Row>
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
                            </Row> */}
                          </Card>
                        </>
                      );
                    })}
                    {/* <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        เพิ่มก๊วน
                      </Button>
                    </Form.Item> */}
                  </>
                )}
              </Form.List>

              <Form.Item>
                {/* <Button
                  style={{ backgroundColor: '#1E6541', border: 'none' }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  ยืนยัน
                </Button> */}
                <Button type="primary" className="buttonnext" htmlType="submit">
                  ถัดไป <ArrowRightOutlined />
                </Button>
              </Form.Item>
            </Form>
            {/* <Tabs>
              {dataTeam.map((data: any, index: number) => {
                return (
                  <Tabs.TabPane
                    tab={`${data?.applicationnumber}`}
                    key={`${index}`}
                  >
                    <Card className="cardinRow">
                      <Form
                        name="dynamic_form_nest_item"
                        onValuesChange={onChangeForm}
                        onFinish={submitFrom}
                        layout="vertical"
                        autoComplete="off"
                      >
                        <Form.Item
                          name={'idactivity'}
                          initialValue={idactivity}
                          hidden
                        />
                        <Form.Item
                          name={'applicationnumber'}
                          initialValue={applicationnumber}
                          hidden
                        />
                        <Form.Item
                          label="เลขที่ใบสมัคร"
                          name={'applicationnumber'}
                          initialValue={data?.applicationnumber}
                        >
                          <Input
                            defaultValue={data?.applicationnumber}
                            placeholder="เลขที่ใบสมัคร"
                            disabled
                            style={{ border: 'none' }}
                          />
                        </Form.Item>
                        <Form.Item
                          initialValue={data?.ownergang}
                          label="ชื่อหัวหน้าก๊วน"
                          rules={[
                            { required: true, message: 'กรุณากรอกเรื่อง' },
                          ]}
                          name={'ownergang'}
                        >
                          <Input placeholder="ชื่อหัวหน้าก๊วน" />
                        </Form.Item>
                        <Form.Item
                          initialValue={data?.namegang}
                          label={'ชื่อก๊วนของท่าน'}
                          name={'namegang'}
                        >
                          <Input placeholder="Text" />
                        </Form.Item>
                        <Form.Item
                          initialValue={data?.member1}
                          label={'ชื่อลูกก๊วนคนที่ 1'}
                          name={'member1'}
                        >
                          <Input placeholder="Text" />
                        </Form.Item>
                        <Form.Item
                          initialValue={data?.member2}
                          label={'ชื่อลูกก๊วนคนที่ 2'}
                          name={'member2'}
                        >
                          <Input placeholder="Text" />
                        </Form.Item>
                        <Form.Item
                          initialValue={data?.member3}
                          label={'ชื่อลูกก๊วนคนที่ 3'}
                          name={'member3'}
                        >
                          <Input placeholder="Text" />
                        </Form.Item>
                        <Form.Item
                          initialValue={data?.member4}
                          label={'ชื่อลูกก๊วนคนที่ 4'}
                          name={'member4'}
                        >
                          <Input placeholder="Text" />
                        </Form.Item>
                      </Form>
                    </Card>
                  </Tabs.TabPane>
                );
              })}
            </Tabs> */}
            {/* <Card className="cardinRow">
              <Form
                name="dynamic_form_nest_item"
                onValuesChange={onChangeForm}
                onFinish={submitFrom}
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  name={'idactivity'}
                  initialValue={idactivity}
                  hidden
                />
                <Form.Item
                  name={'applicationnumber'}
                  initialValue={applicationnumber}
                  hidden
                />

                <Form.Item
                  label="เลขที่ใบสมัคร"
                  name={'applicationnumber'}
                  initialValue={dataSource?.applicationnumber}
                >
                  <Input
                    placeholder="ชื่อหัวหน้าก๊วน"
                    disabled
                    style={{ border: 'none' }}
                  />
                </Form.Item>
                <Form.Item
                  initialValue={dataSource?.ownergang}
                  label="ชื่อหัวหน้าก๊วน"
                  rules={[{ required: true, message: 'กรุณากรอกเรื่อง' }]}
                  name={'ownergang'}
                >
                  <Input placeholder="ชื่อหัวหน้าก๊วน" />
                </Form.Item>
                <Form.Item
                  initialValue={dataSource?.namegang}
                  label={'ชื่อก๊วนของท่าน'}
                  name={'namegang'}
                >
                  <Input placeholder="Text" />
                </Form.Item>
                <Form.Item
                  initialValue={dataSource?.member1}
                  label={'ชื่อลูกก๊วนคนที่ 1'}
                  name={'member1'}
                >
                  <Input placeholder="Text" />
                </Form.Item>
                <Form.Item
                  initialValue={dataSource?.member2}
                  label={'ชื่อลูกก๊วนคนที่ 2'}
                  name={'member2'}
                >
                  <Input placeholder="Text" />
                </Form.Item>
                <Form.Item
                  initialValue={dataSource?.member3}
                  label={'ชื่อลูกก๊วนคนที่ 3'}
                  name={'member3'}
                >
                  <Input placeholder="Text" />
                </Form.Item>
                <Form.Item
                  initialValue={dataSource?.member4}
                  label={'ชื่อลูกก๊วนคนที่ 4'}
                  name={'member4'}
                >
                  <Input placeholder="Text" />
                </Form.Item>
                <Button type="primary" className="buttonnext" htmlType="submit">
                  ถัดไป <ArrowRightOutlined />
                </Button>
              </Form>
            </Card> */}
            {/* <Button type="primary" className="buttonnext" htmlType="submit">
              ถัดไป <ArrowRightOutlined />
            </Button> */}
          </Card>
          <Typography className="typofooter">
            ©2022 O S D Company Limited
          </Typography>
        </Col>
      </Row>
    </>
  );
};
