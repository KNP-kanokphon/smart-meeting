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
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  EditFilled,
  EllipsisOutlined,
  LeftCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { DatamanagementService } from '../../stores/meeting-store';

export const CheckList: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const { state } = useLocation();
  const navigate = useNavigate();
  const [dataMeeing, setDatameeing] = useState<any>([]);
  const [dataAgendes, setDataagendes] = useState<any>([]);

  const [dataUser, setDataUser] = useState<any>([]);
  const [Count, setCount] = useState<any>(0);
  const [CountPlus, setCountPlus] = useState<any>(0);
  const [CountDel, setCountDel] = useState<any>(0);
  const [positionName, setPositionName] = useState<any>([]);
  const [UsernameFilter, setUsernameFilter] = useState<any>([]);
  const [PositionFilter, setPositionFilter] = useState<any>([]);
  const [CheckinFilter, setCheckinFilter] = useState<any>([]);
  const [MeetingFilter, setMeetFilter] = useState<any>([]);
  const [peopleall, setPeopleall] = useState<any>([]);

  useEffect(() => {
    getListmeeting();
  }, []);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getMeetingByid(state)
      .then(data => {
        setDatameeing(data);
      });

    await DatamanagementService()
      .getagendaByid(state)
      .then(data => {
        console.log(data);

        setDataagendes(data);
      });

    await DatamanagementService()
      .getuserInroom(String(state))
      .then(async (data: any) => {
        setPeopleall(data.length);

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
            foodstatus: e.foodstatus,
            gifstatus: e.gifstatus === null ? false : e.gifstatus,
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
            data.map((ex: any) => {
              if (ex === event.uuid) {
                datas += ' ' + event.nameposition;
              }
            });
          }
        });
        return <div style={{ whiteSpace: 'nowrap' }}>{datas}</div>;
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
      render: (index: any, data: any) => {
        let link = '';
        if (data.statuscheckin === false) {
          link = `${window.origin}/detail/detailalready/${state}/${index}`;
        } else {
          link = `${window.origin}/detail/detailconfirm/${state}/${index}`;
        }

        return (
          <Popover content={link}>
            <Button
              icon={<CopyOutlined />}
              onClick={() => navigator.clipboard.writeText(link)}
            />
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
      dataIndex: 'foodstatus',
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
      dataIndex: 'gifstatus',
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

  const columnsVoting: any = [
    {
      title: 'วาระที่',
      dataIndex: 'step',
      key: 'step',
      width: '5%',
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'เรื่อง',
      dataIndex: 'agendes',
      key: 'agendes',
      width: '40%',
    },
    {
      title: 'link สำหรับโหวต',
      dataIndex: 'step',
      key: 'step',
      width: '10%',
      align: 'center',
      render: (text: any) => {
        return (
          <Popover content={`${window.origin}/vote/${state}/${text}`}>
            <Button
              icon={<CopyOutlined />}
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.origin}/vote/${state}/${text}`,
                )
              }
            />
          </Popover>
        );
      },
    },
    {
      title: 'เห็นชอบ',
      dataIndex: 'votingagree',
      key: 'votingagree',
      width: '5%',
      align: 'center',
      render: (text: any) => (
        <Badge
          className="site-badge-count-109"
          count={text}
          style={{ backgroundColor: '#52c41a' }}
        />
      ),
    },
    {
      title: 'ไม่เห็นชอบ',
      dataIndex: 'votingdisagree',
      key: 'votingdisagree',
      width: '5%',
      align: 'center',
      render: (text: any) => <Badge count={text ? text : 0} />,
    },
    {
      title: 'งดออกเสียง',
      dataIndex: 'votingabstain',
      key: 'votingabstain',
      width: '5%',
      align: 'center',
      render: (text: any, data: any) => {
        const resultsum =
          Number(peopleall) -
          Number(data.votingdisagree) -
          Number(data.votingagree);
        return <Badge count={resultsum} />;
      },
    },
    {
      title: 'จากทั้งหมด(คน)',
      dataIndex: '',
      key: '',
      width: '10%',
      align: 'center',
      render: (text: string) => peopleall,
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
                ตรวจสอบรายชื่อผู้เข้าร่วมประชุม
              </Title>
            </Col>
          </Row>
          <Typography
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              marginLeft: '15px',
              fontSize: '16px',
            }}
          >
            {dataMeeing[0]?.title}
          </Typography>
          <Row gutter={16}>
            <Col>
              <Typography
                style={{
                  textAlign: 'left',
                  // fontWeight: 'bold',
                  color: 'grey',
                  marginLeft: '15px',
                  fontSize: '16px',
                }}
              >
                {`ลิ้งค์ห้องประชุม`}
              </Typography>
            </Col>
            <Col>
              <Popover content={`${window.origin}/detail/${state}`}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.origin}/detail/${state}`,
                    )
                  }
                />
              </Popover>
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
                    <Space>
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
                      <InfoCircleOutlined style={{ marginTop: '6px' }} />
                    </Space>
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
                  <Space>
                    {' '}
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
                    <InfoCircleOutlined style={{ marginTop: '6px' }} />
                  </Space>
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
                  <Space>
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
                    <InfoCircleOutlined style={{ marginTop: '6px' }} />
                  </Space>
                </Col>
                <Row gutter={16}>
                  <Col span={4}>
                    {/* <Space></Space> */}
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
                  fontWeight: 'bold',
                }}
              >
                การลงมติในที่ประชุม
              </Typography>
            </>
          }
        >
          <Table
            columns={columnsVoting}
            dataSource={dataAgendes}
            rowKey={'step'}
            scroll={{ x: 'calc(1500px + 20%)' }}
          />
        </Card>
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
          title={
            <>
              <Typography
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                รายชื่อผู้เข้าร่วมประชุม
              </Typography>
            </>
          }
        >
          <Table
            columns={columns}
            dataSource={dataUser}
            rowKey={'id'}
            scroll={{ x: 'calc(1500px + 50%)' }}
          />
        </Card>
      </Row>
    </>
  );
};
