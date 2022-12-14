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
  InfoCircleOutlined,
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
                  <Badge status="success" text="????????????????????????" />
                </Space>
              ) : (
                <Space>
                  <Badge status="error" text="?????????????????????????????????" />
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
                  <Badge status="success" text="?????????????????????" />
                </Space>
              ) : (
                <Space>
                  <Badge status="error" text="???????????????????????????????????????" />
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
      title: '???????????????',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      fixed: 'left',
    },
    {
      title: '????????????-?????????????????????',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
      filters: UsernameFilter,
      onFilter: (value: any, record: any) => record.username?.startsWith(value),
      filterSearch: true,
    },
    {
      title: '?????????????????????',
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
      title: '????????????????????????',
      dataIndex: '',
      key: '',
      width: '10%',
    },
    {
      title: '???????????????????????????????????????',
      dataIndex: '',
      key: '',
      width: '10%',
    },
    {
      title: '???????????????',
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
              style={{ color: 'rgb(30, 101, 65)' }}
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
      title: '???????????????????????????????????????????????????',
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
            <Badge status="success" text="????????????????????????" />
          </Space>
        ) : (
          <Space>
            <Badge status="error" text="?????????????????????????????????" />
          </Space>
        );
      },
    },
    {
      title: '?????????????????????????????????????????????????????????',
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
              {'?????????????????????'}
            </Space>
          </Tag>
        ) : (
          <Tag>
            <Space>
              <Icon icon="emojione-v1:cross-mark" />
              {'???????????????????????????????????????'}
            </Space>
          </Tag>
        );
      },
    },
    {
      title: '??????????????????????????????????????????',
      dataIndex: '',
      key: '',
      width: '10%',
      render: (text: any) => {
        return text === true ? (
          <Tag color="lime">
            <Space>
              <Icon icon="emojione:white-heavy-check-mark" />
              {'?????????'}
            </Space>
          </Tag>
        ) : (
          <Tag color="orange">
            <Space>
              <Icon icon="emojione-v1:cross-mark" />
              {'??????????????????'}
            </Space>
          </Tag>
        );
      },
    },
    {
      title: '?????????????????????????????????????????????????????????',
      dataIndex: '',
      key: '',
      width: '10%',
      render: (text: any) => {
        return text === true ? (
          <Tag color="lime">
            <Space>
              <Icon icon="emojione:white-heavy-check-mark" />
              {'??????????????????'}
            </Space>
          </Tag>
        ) : (
          <Tag color="volcano">
            <Space>
              <Icon icon="emojione-v1:cross-mark" />
              {'????????????????????????????????????'}
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
                ?????????????????????????????????????????????????????????????????????????????????????????????
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
            {dataIntable[0]?.title}
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
                {`???????????????????????????????????????????????? ${window.origin}/detail/${state}`}
              </Typography>
            </Col>
            <Col>
              <a
                style={{ color: 'rgb(30, 101, 65)', fontSize: '16px' }}
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
                    <Space>
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontWeight: 'bold',
                          color: 'grey',
                          fontSize: '20px',
                        }}
                      >
                        ??????????????????????????????????????????????????????????????????????????????????????????????????????
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
                      ?????????????????????????????????
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
                      ????????????????????????????????????????????????
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
                ?????????????????????????????????????????????????????????????????????????????????????????????
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
