import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  // List,
  // Skeleton,
  Button,
  // Avatar,
  // Input,
  Col,
  Popover,
  // DatePicker,
  Space,
  // Select,
  Table,
  Tag,
  Badge,
  // Divider,
} from 'antd';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  EditFilled,
  EllipsisOutlined,
  LeftCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { DatamanagementService } from '../../stores/meeting-store';

export const CheckList: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const { state } = useLocation();
  const [dataIntable, setDataIntable] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [Count, setCount] = useState<any>(0);
  const [CountPlus, setCountPlus] = useState<any>(0);
  const [CountDel, setCountDel] = useState<any>(0);

  // console.log(dataUser);

  const navigate = useNavigate();
  // const [positionName, setPositionName] = useState<
  //   [{ id: string; uuid: string; nameposition: string; createdate: string }]
  // >([{ id: '', uuid: '', nameposition: '', createdate: '' }]);

  const [positionName, setPositionName] = useState<any>([]);
  const [UsernameFilter, setUsernameFilter] = useState<any>([]);
  const [PositionFilter, setPositionFilter] = useState<any>([]);
  const [CheckinFilter, setCheckinFilter] = useState<any>([]);
  const [MeetingFilter, setMeetFilter] = useState<any>([]);

  useEffect(() => {
    getListmeeting();
  }, []);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getMeetingByid(state)
      .then(data => {
        setDataIntable(data);
      });

    await DatamanagementService()
      .getuserInroom(String(state))
      .then(async (data: any) => {
        const PositionAll = await DatamanagementService().getPositionall();
        setPositionName(PositionAll);
        // data meeting
        const newData = await data.map((e: any, i: number) => {
          setCount(i + 1);
          return {
            id: i + 1,
            uuidprofile: e.uuidprofile,
            uuidroom: e.uuid,
            username: e.username,
            statuscheckin: e.checkin,
            position: e.position,
            statusconfirm: e.confirm,
          };
        });
        let plus = 0;
        let del = 0;
        newData.map((e: any) => {
          if (e.statuscheckin === false) {
            del += 1;
          } else {
            plus += 1;
          }
        });
        setCountDel(del);
        setCountPlus(plus);
        setDataUser(newData);

        // filter username
        let Username = data.filter(
          (ele: any, ind: any) =>
            ind ===
            data.findIndex((elem: any) => elem.username === ele.username),
        );
        let UsernameArray: any = [];
        Username.map((data: any) => {
          UsernameArray.push({
            text: data.username != null ? data.username : '-',
            value: data.username,
          });
        });
        await setUsernameFilter(UsernameArray);

        // filter position
        let Position = data.filter(
          (ele: any, ind: any) =>
            ind ===
            data.findIndex((elem: any) => elem.position === ele.position),
        );
        let PositionArray: any = [];
        Position.map((event: any) => {
          event.position.map((e: any) => {
            PositionAll.map((x: any) => {
              if (x.uuid === e) {
                PositionArray.push({
                  text: x.nameposition != null ? x.nameposition : '-',
                  value: x.uuid,
                });
              }
            });
          });
        });
        // console.log(PositionArray);
        setPositionFilter(PositionArray);

        // meet confirm
        let conmeet = data.filter(
          (ele: any, ind: any) =>
            ind === data.findIndex((elem: any) => elem.confirm === ele.confirm),
        );

        let ConMeetArray: any = [];
        conmeet.map((data: any) => {
          ConMeetArray.push({
            text:
              data.confirm === true ? (
                <Space>
                  <Badge status="success" text="เข้าร่วม" />
                </Space>
              ) : (
                <Space>
                  <Badge status="error" text="ไม่เข้าร่วม" />
                </Space>
              ),
            value: data.confirm,
          });
        });
        await setMeetFilter(ConMeetArray);

        // meet confirm
        let checkin = data.filter(
          (ele: any, ind: any) =>
            ind === data.findIndex((elem: any) => elem.checkin === ele.checkin),
        );
        let CheckinArray: any = [];
        checkin.map((data: any) => {
          CheckinArray.push({
            text:
              data.checkin === true ? (
                <Space>
                  <Badge status="success" text="เช็คอิน" />
                </Space>
              ) : (
                <Space>
                  <Badge status="error" text="ไม่ได้เช็คอิน" />
                </Space>
              ),
            value: data.checkin,
          });
        });
        await setCheckinFilter(CheckinArray);
      });
  };

  const columns: any = [
    {
      title: 'ลำดับ',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      fixed: 'left',
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
      filters: UsernameFilter,
      onFilter: (value: any, record: any) => record.username?.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'position',
      key: 'position',
      width: '30%',
      filters: PositionFilter,
      onFilter: (value: any, record: any) => {
        let dataSet: any = '';
        record.position.map((e: any) => {
          dataSet = e;
        });
        return dataSet.startsWith(value);
      },
      filterSearch: true,
      render: (data: any, row: any) => {
        let datas: any = '';
        positionName.map((event: any) => {
          if (data.length === 1) {
            if (data[0] === event.uuid) {
              datas = event.nameposition;
            }
          } else {
            let nameposition: string = '';
            let splittt = nameposition;
            return (
              <>
                <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
              </>
            );
          }
        });
        return datas;
      },
    },
    {
      title: 'หลักสูตร',
      dataIndex: '',
      key: '',
      width: '10%',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: '',
      key: '',
      width: '10%',
    },
    {
      title: 'อีเมล',
      dataIndex: '',
      key: '',
      width: '20%',
    },
    {
      title: 'Link',
      dataIndex: 'uuidprofile',
      key: 'uuidprofile',
      width: '5%',
      render: (data: any) => {
        return (
          <Popover
            content={`${window.origin}/detail/detailalready/${state}/${data}`}
          >
            <a
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.origin}/detail/detailalready/${state}/${data}`,
                )
              }
            >
              Link
            </a>
          </Popover>
        );
      },
    },
    {
      title: 'สถานะการลงทะเบียน',
      dataIndex: 'statusconfirm',
      key: 'statusconfirm',
      width: '10%',
      filters: MeetingFilter,
      onFilter: (value: any, record: any) => {
        return record.statusconfirm === value;
      },
      render: (text: any) => {
        return text === true ? (
          <Space>
            <Badge status="success" text="เข้าร่วม" />
          </Space>
        ) : (
          <Space>
            <Badge status="error" text="ไม่เข้าร่วม" />
          </Space>
        );
      },
    },
    {
      title: 'สถานะเข้าร่วมประชุม',
      dataIndex: 'statuscheckin',
      key: 'statuscheckin',
      width: '10%',
      filters: CheckinFilter,
      onFilter: (value: any, record: any) => {
        return record.statuscheckin === value;
      },
      render: (text: any) => {
        return text === true ? (
          <Tag color="lime">
            <Space>
              <Icon icon="emojione:white-heavy-check-mark" />
              {'เช็คอิน'}
            </Space>
          </Tag>
        ) : (
          <Tag>
            <Space>
              <Icon icon="emojione-v1:cross-mark" />
              {'ไม่ได้เช็คอิน'}
            </Space>
          </Tag>
        );
      },
    },
    {
      title: 'สถานะอาหารว่าง',
      dataIndex: '',
      key: '',
      width: '10%',
      render: (text: any) => {
        return text === true ? (
          <Tag color="lime">
            <Space>
              <Icon icon="emojione:white-heavy-check-mark" />
              {'รับ'}
            </Space>
          </Tag>
        ) : (
          <Tag color="orange">
            <Space>
              <Icon icon="emojione-v1:cross-mark" />
              {'ไม่รับ'}
            </Space>
          </Tag>
        );
      },
    },
    {
      title: 'สถานะรับของที่ระลึก',
      dataIndex: '',
      key: '',
      width: '10%',
      render: (text: any) => {
        return text === true ? (
          <Tag color="lime">
            <Space>
              <Icon icon="emojione:white-heavy-check-mark" />
              {'ได้รับ'}
            </Space>
          </Tag>
        ) : (
          <Tag color="volcano">
            <Space>
              <Icon icon="emojione-v1:cross-mark" />
              {'ยังไม่ได้รับ'}
            </Space>
          </Tag>
        );
      },
    },
  ];
  return (
    <>
      <Row
        gutter={[
          { xs: 8, sm: 16 },
          { xs: 8, sm: 16 },
        ]}
      >
        <Card style={{ width: '100%', textAlign: 'left' }}>
          <Row gutter={16}>
            <Col style={{ textAlign: 'left' }}>
              <Button
                style={{
                  border: 'none',
                  width: 'auto',
                  textAlign: 'left',
                }}
                onClick={() => navigate(-1)}
              >
                <LeftCircleOutlined
                  style={{
                    color: '#1E6541',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                />
              </Button>
            </Col>
            <Col>
              <Title
                style={{
                  color: 'black',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                CHECK IN LISTS
              </Title>
            </Col>
          </Row>
          <Typography
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
            }}
          >
            {dataIntable[0]?.title}
          </Typography>
          <Row gutter={16}>
            <Col>
              <Typography
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: 'grey',
                }}
              >
                {`ลิ้งค์ห้องประชุม ${window.origin}/detail/${state}`}
              </Typography>
            </Col>
            <Col>
              <a
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.origin}/detail/${state}`,
                  )
                }
              >
                Link
              </a>
            </Col>
          </Row>
        </Card>
        <Card
          style={{
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
            padding: '0',
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Card style={{ width: '100%' }}>
                <Row>
                  <Col span={24}>
                    <Typography
                      style={{
                        textAlign: 'left',
                        fontWeight: 'bold',
                        color: 'grey',
                        fontSize: '20px',
                      }}
                    >
                      รายชื่อที่เข้าร่วมการประชุมทั้งหมด
                    </Typography>
                  </Col>
                  <Col span={24}>
                    <Typography style={{ fontSize: '32px' }}>
                      {Count}
                    </Typography>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%' }}>
                <Col span={24}>
                  <Typography
                    style={{
                      fontSize: '20px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: 'grey',
                    }}
                  >
                    เช็คอินแล้ว
                  </Typography>
                </Col>
                <Row gutter={16}>
                  <Col span={4}>
                    <CheckCircleFilled
                      style={{
                        fontSize: '32px',
                        marginTop: '8px',
                        color: 'green',
                      }}
                    />
                  </Col>
                  <Col span={20}>
                    <Typography style={{ fontSize: '32px' }}>
                      {CountPlus}
                    </Typography>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%' }}>
                <Col span={24}>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: 'grey',
                      fontSize: '20px',
                    }}
                  >
                    ยังไม่ได้เช็คอิน
                  </Typography>
                </Col>
                <Row gutter={16}>
                  <Col span={4}>
                    <CloseCircleFilled
                      style={{
                        fontSize: '32px',
                        marginTop: '8px',
                        color: 'red',
                      }}
                    />
                  </Col>
                  <Col span={20}>
                    <Typography style={{ fontSize: '32px' }}>
                      {CountDel}
                    </Typography>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
          title={
            <>
              <Typography
                style={{
                  textAlign: 'left',
                  // fontSize: '30px',
                  fontWeight: 'bold',
                  // color: 'grey',
                }}
              >
                Check-in Lists
              </Typography>
            </>
          }
        >
          <Table
            columns={columns}
            dataSource={dataUser}
            rowKey={'uuid'}
            scroll={{ x: 'calc(1500px + 50%)' }}
          />
        </Card>
      </Row>
    </>
  );
};
