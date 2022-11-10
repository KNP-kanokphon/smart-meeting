import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  Button,
  Col,
  Popover,
  Space,
  Table,
  Tag,
  Badge,
  Select,
  Input,
  DatePicker,
  Dropdown,
  Menu,
} from 'antd';
import { Icon } from '@iconify/react';
import { EllipsisOutlined, DownOutlined } from '@ant-design/icons';
import { idText } from 'typescript';
import { useNavigate } from 'react-router-dom';
import { DatamanagementService } from '../../../stores/meeting-store';
import dayjs from 'dayjs';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

export const TableLast: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [dataIntable, setDataIntable] = useState<any>([]);
  const [openToday, setOpenToday] = useState(false);
  const [openLastmeet, setOpenLastmeet] = useState(false);
  const [dataUuidMeet, setUuidMeet] = useState<any>([]);

  useEffect(() => {
    getydataAlluserubnroom();
    getListmeeting();
  }, []);

  // const handleOpenChangeToday = (newOpen: boolean) => {
  //   setOpenToday(newOpen);
  // };
  // const handleOpenChangeLastmeet = (newOpen: boolean) => {
  //   setOpenLastmeet(newOpen);
  // };

  const getydataAlluserubnroom = async () => {
    const res = await DatamanagementService().getuserInroomAll();
    // console.log(res);
    const newData = await res.map((e: any) => {
      // console.log(e);
      return {
        checkin: e.checkin,
        confirm: e.confirm,
        email: e.email,
        id: e.id,
        idmeeting: e.idmeeting,
        model: e.model,
        phone: e.phone,
        position: e.position,
        type: e.type,
        type_user: e.type_user,
        username: e.username,
        uuidprofile: e.uuidprofile,
      };
    });
    // console.log(newData);
    setUuidMeet(newData);
  };
  // console.log(dataUuidMeet);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getListmeeting()
      .then(data => {
        // console.log(data);

        const dataNew = data.filter((e: any) => {
          const dateParts = e.day.split('-');
          const dd = new Date(e.day);
          const dn = new Date();
          const dateCreate = [
            dd.getDate(),
            dd.getMonth() + 1,
            dd.getFullYear(),
          ];

          const dateNow = [dn.getDate(), dn.getMonth() + 1, dn.getFullYear()];
          if (
            `${dateCreate[0]}-${dateCreate[1]}-${dateCreate[2]}` ===
            `${dateNow[0]}-${dateNow[1]}-${dateNow[2]}`
          ) {
            return;
          } else {
            return e;
          }
        });
        setDataIntable(dataNew);
      });
  };
  const onclickViwe = (e: any) => {
    console.log(e.item.props.title);

    if (e.key === 'view') {
      navigate(`detail/view`, { state: e.item.props.title });
    } else if ((e.key === 'signate', { state: e.item.props.title })) {
      navigate(`detail/signate`, { state: e.item.props.title });
    } else if (e.key === 'minutes') {
      navigate(`detail/minutes`, { state: e.item.props.title });
    }
  };

  const columnsLast = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '70%',
      ellipsis: true,
      render: (data: string, dataAll: any) => {
        return (
          <>
            <Row>
              <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {data}
              </Typography>
            </Row>
            <Row>
              <Space>
                <Typography style={{ color: 'grey' }}>
                  {dayjs(dataAll.day).add(543, 'year').format('DD-MM-YYYY')}
                </Typography>
                <Typography style={{ color: 'grey' }}>
                  {dataAll.starttime}-{dataAll.endtime} น.
                </Typography>
              </Space>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
      width: '10%',
      ellipsis: true,
      render: (data: any) => {
        return (
          <>
            <Row>
              <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                ห้องประชุม
              </Typography>
            </Row>
            <Row>
              <Typography style={{ color: 'grey' }}>{data}</Typography>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Participant',
      dataIndex: 'uuid',
      key: 'uuid',
      width: '30%',
      // ellipsis: true,
      render: (data: any, dataAll: any) => {
        return (
          <>
            <Row gutter={16}>
              <Col span={24}>
                <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  ผู้ตกลงเข้าร่วม
                </Typography>
              </Col>
              <Col span={24} style={{ color: 'grey' }}>
                {dataUuidMeet.map((event: any) => {
                  if (event.length < 2) {
                    return event.idmeeting == data ? event.username : <></>;
                  } else {
                    let ressss: string = '';
                    if (event.idmeeting === data) {
                      ressss += ' ' + event.username;
                    } else {
                      <></>;
                    }
                    let splittt = ressss;
                    return (
                      <>
                        <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
                      </>
                    );
                  }
                })}
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Checklist',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      align: 'right',
      render: (data: string, dataAll: any) => {
        return (
          <>
            <Dropdown
              overlay={
                <Menu
                  onClick={onclickViwe}
                  items={[
                    { key: `view`, label: 'View', title: dataAll.uuid },
                    { key: 'signate', label: 'E-Signate', title: dataAll.uuid },
                    { key: 'minutes', label: 'Minutes', title: dataAll.uuid },
                  ]}
                />
              }
            >
              <a style={{ color: '#1E6541' }}>
                More <DownOutlined />
              </a>
            </Dropdown>
          </>
        );
      },
    },
  ];

  const onSearch = (value: string) => console.log(value);
  const filterSearch = (
    <>
      <Space>
        <Select
          placeholder="Meeting Name"
          style={{ border: 'none' }}
          allowClear
        >
          <Option>name 1</Option>
          <Option>name 2</Option>
        </Select>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <RangePicker />
      </Space>
    </>
  );

  return (
    <Card
      style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
      title={
        <Typography
          style={{
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'grey',
          }}
        >
          Last Meeting
        </Typography>
      }
      extra={filterSearch}
    >
      <Table
        dataSource={dataIntable}
        columns={columnsLast as any}
        showHeader={false}
      />
    </Card>
  );
};
