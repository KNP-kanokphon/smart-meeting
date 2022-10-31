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
import {  EllipsisOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { Search } = Input;

export const MeetingScheduleRoute: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const { Option } = Select;

  const count = 3;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [openToday, setOpenToday] = useState(false);
  const [openLastmeet, setOpenLastmeet] = useState(false);

  //   const hide = () => {
  //     setOpen(false);
  //   };

  const handleOpenChangeToday = (newOpen: boolean) => {
    setOpenToday(newOpen);
  };
  const handleOpenChangeLastmeet = (newOpen: boolean) => {
    setOpenLastmeet(newOpen);
  };

  useEffect(() => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res);

        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const contentToday = (
    <>
      <Button style={{ border: 'none' }}>Edit</Button>
      <Button style={{ border: 'none', color: 'red' }}>Delete</Button>
    </>
  );

  const contentLastMeet = (
    <>
      <Button style={{ border: 'none' }}>View</Button>
      <Button style={{ border: 'none' }}>E-Signature</Button>
      <Button style={{ border: 'none' }}>Minutes</Button>
      <Button style={{ border: 'none', color: 'red' }}>Delete</Button>
    </>
  );
  const onSearch = (value: string) => console.log(value);
  const filterSearch = (
    <>
      <Space>
        <Select placeholder="Meeting Name" allowClear>
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
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
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
                        ห้อง 5 กันยา
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
                        26
                      </Typography>
                    </Col>
                  </Row>,

                  <Button
                    htmlType="submit"
                    style={{ background: '#1E6541', color: 'white' }}
                  >
                    Check in List
                  </Button>,
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
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '20px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.name?.last}
                      </Typography>
                    }
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </Skeleton>
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
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
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
                        ห้อง 5 กันยา
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
                        26
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
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <Typography
                        style={{
                          textAlign: 'left',
                          fontSize: '20px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.name?.last}
                      </Typography>
                    }
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </Row>
  );
};
