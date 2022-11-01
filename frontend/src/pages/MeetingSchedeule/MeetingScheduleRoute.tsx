import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  List,
  Skeleton,
  Button,
  // Avatar,
  Input,
  Col,
  Popover,
  DatePicker,
  Space,
  Select,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { Search } = Input;

export const MeetingScheduleRoute: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const { Option } = Select;

  const [openToday, setOpenToday] = useState(false);
  const [openLastmeet, setOpenLastmeet] = useState(false);

  const handleOpenChangeToday = (newOpen: boolean) => {
    setOpenToday(newOpen);
  };
  const handleOpenChangeLastmeet = (newOpen: boolean) => {
    setOpenLastmeet(newOpen);
  };

  const dataS: any = [
    {
      id: 1,
      title: 'Ant Design Title 1',
      name: 'ขอเชิญประชุมคณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า ครั้งที่ 5/2565',
      detail: '18/10/2565 18:00 - 20:00 น.',
      status: 1,
      meetingroom: 'ห้อง 5 กันยา',
      participant: '20',
    },
    {
      id: 2,
      title: 'Ant Design Title 2',
      name: 'ขอเชิญประชุมวิชาการสถาบันพระปกเกล้า ครั้งที่ 23/2565 “ประชาธิปไตยในภูมิทัศน์ใหม่ ” ',
      detail: '13/10/2565 13:00 - 15:00 น.',
      status: 0,
      meetingroom: 'ห้อง 5 กันยา',
      participant: '20',
    },
    {
      id: 3,
      title: 'Ant Design Title 3',
      name: 'ขอเชิญประชุมวิชาการสถาบันพระปกเกล้า ครั้งที่ 23/2565 “ประชาธิปไตยในภูมิทัศน์ใหม่ไหมมมมม ” ',
      detail: '13/10/2565 13:00 - 15:00 น.',
      status: 0,
      meetingroom: 'ห้อง 5 กันยา',
      participant: '20',
    },
    {
      id: 4,
      title: 'Ant Design Title 4',
      name: 'ขอเชิญประชุมวิชาการสถาบันพระปกเกล้า ครั้งที่ 23/2565 “ประชาธิปไตยในภูมิทัศน์ใหม่ไม่ยู๊ ” ',
      detail: '13/10/2565 13:00 - 15:00 น.',
      status: 0,
      meetingroom: 'ห้อง 5 กันยา',
      participant: '20',
    },
  ];

  const contentToday = (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
            Edit
          </Button>
        </Col>
        <Col span={24}>
          <Button
            style={{
              border: 'none',
              color: 'red',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  const contentLastMeet = (
    <>
      <Row>
        <Col span={24}>
          <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
            View
          </Button>
        </Col>
        <Col span={24}>
          <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
            E-Signature
          </Button>
        </Col>
        <Col span={24}>
          <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
            Minutes
          </Button>
        </Col>
        <Col span={24}>
          <Button
            style={{
              border: 'none',
              color: 'red',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );
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
    <Row
      gutter={[
        { xs: 8, sm: 16 },
        { xs: 8, sm: 16 },
      ]}
    >
      <Card style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}>
        <Title style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
          MEETING SCHEDULE
        </Title>
      </Card>
      <div style={{ width: '100%', marginLeft: '40px', marginRight: '40px' }}>
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
          title={
            <Typography
              style={{
                textAlign: 'left',
                fontSize: '30px',
                fontWeight: 'bold',
                color: 'grey',
              }}
            >
              Today
            </Typography>
          }
        >
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={dataS}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          color: 'grey',
                        }}
                      >
                        ห้องประชุม
                      </Typography>
                    </Col>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          fontSize: '18px',
                        }}
                      >
                        {item.meetingroom}
                      </Typography>
                    </Col>
                  </Row>,
                  <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          color: 'grey',
                        }}
                      >
                        ผู้ตกลงเข้าร่วม
                      </Typography>
                    </Col>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          fontSize: '18px',
                        }}
                      >
                        {item.participant}
                      </Typography>
                    </Col>
                  </Row>,
                  item.status === 1 ? (
                    <Button
                      htmlType="submit"
                      style={{ background: '#1E6541', color: 'white' }}
                    >
                      Check in List
                    </Button>
                  ) : null,
                  <Popover
                    content={contentToday}
                    trigger="click"
                    open={openToday}
                    onOpenChange={handleOpenChangeToday}
                  >
                    <Button
                      htmlType="submit"
                      icon={<EllipsisOutlined rotate={90} />}
                      style={{ border: 'none' }}
                    />
                  </Popover>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Typography
                      style={{
                        textAlign: 'left',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  description={item.detail}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
          title={
            <Typography
              style={{
                textAlign: 'left',
                fontSize: '30px',
                fontWeight: 'bold',
                color: 'grey',
              }}
            >
              Last Meeting
            </Typography>
          }
          extra={filterSearch}
        >
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={dataS}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          color: 'grey',
                        }}
                      >
                        ห้องประชุม
                      </Typography>
                    </Col>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          fontSize: '18px',
                        }}
                      >
                        {item.meetingroom}
                      </Typography>
                    </Col>
                  </Row>,
                  <Row>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          color: 'grey',
                        }}
                      >
                        ผู้ตกลงเข้าร่วม
                      </Typography>
                    </Col>
                    <Col span={24} style={{ textAlign: 'left' }}>
                      <Typography
                        style={{
                          fontSize: '18px',
                        }}
                      >
                        {item.participant}
                      </Typography>
                    </Col>
                  </Row>,
                  <Popover
                    content={contentLastMeet}
                    trigger="click"
                    open={openLastmeet}
                    onOpenChange={handleOpenChangeLastmeet}
                  >
                    <Button
                      htmlType="submit"
                      style={{ border: 'none' }}
                      icon={<EllipsisOutlined rotate={90} />}
                    />
                  </Popover>,
                ]}
              >
                {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                <List.Item.Meta
                  title={
                    <Typography
                      style={{
                        textAlign: 'left',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  description={item.detail}
                />
                {/* </Skeleton> */}
              </List.Item>
            )}
          />
        </Card>
      </div>
    </Row>
  );
};
