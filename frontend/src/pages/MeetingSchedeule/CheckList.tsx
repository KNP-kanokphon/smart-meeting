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
} from '@ant-design/icons';
import { DatamanagementService } from '../../stores/meeting-store';

export const CheckList: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const { state } = useLocation();
  const [dataIntable, setDataIntable] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const navigate = useNavigate();
  const [positionName,setPositionName] = useState<[{id:string,uuid:string,nameposition:string,createdate:string}]>([{id:'',uuid:'',nameposition:'',createdate:''}]);
  useEffect(() => {
    getListmeeting();
  }, []);
  const getListmeeting = async () => {
    await DatamanagementService()
      .getMeetingByid(state)
      .then(data => {
        setDataIntable(data);
      });
    console.log(state);

    await DatamanagementService()
      .getuserInroom(String(state))
      .then(async (data: any) => {
        const position = await DatamanagementService().getPositionall().then(data =>{
          setPositionName(data)
          return (data)
        })
        const newData = await data.map((e: any, i: number) => {
          const pname = position.find((name:{id:string,uuid:string,nameposition:string,createdate:string}) => name.uuid === e.position)
          console.log(pname);
          
      
            return {
              id: i + 1,
              uuidprofile: e.uuidprofile,
              uuidroom: e.uuid,
              username: e.username,
              statuscheckin: e.checkin,
              position: !pname?'':pname.nameposition,
              statusconfirm: e.confirm
            };
          
          
        });
        setDataUser(newData);
        console.log(newData,'newData');
        
      });
  };

  const [datasource, setDatasource] = useState<any>([]);

  const contentAction = (
    <>
      <Row style={{ width: 'auto', textAlign: 'left' }}>
        <Col span={24} style={{ marginBottom: '10px' }}>
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
    },
    {
      title: 'link',
      dataIndex: 'uuidprofile',
      key: 'uuidprofile',
      width: '20%',
      render: (data: any) => {
        return <>{`${window.origin}/detail/detailalready/${state}/${data}`}</>;
      },
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'position',
      key: 'position',
      width: '20%',
      render: (e: any, row: any) => {
        if (e) {
          return (
            <>
              {positionName.map((x: any) => {
               console.log(x,'x');
               
               return <>{x.uuid === e ? x.nameposition : ''}</>;
              })}
            </>
          );
        }
      },
    },
    {
      title: 'หลักสูตร',
      dataIndex: 'course',
      key: 'course',
      width: '15%',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
      width: '20%',

      render: (text: any) => {
        return text ? text : '-';
      },
    },
    // {
    //   title: 'สถานะการลงทะเบียน',
    //   dataIndex: 'statuscheckin',
    //   key: 'statuscheckin',
    //   width: '10%',

    //   render: (text: any) => {
    //     console.log(text);
    //     return text === true ? (
    //       <Space>
    //         <Badge color={'green'} text={'เข้าร่วม'} />
    //       </Space>
    //     ) : (
    //       <Space>
    //         <Badge color={'orange'} text={'ไม่เข้าร่วม'} />
    //       </Space>
    //     );
    //   },
    // },
    {
      title: 'สถานะเข้าร่วมประชุม',
      dataIndex: 'statuscheckin',
      key: 'statuscheckin',
      width: '10%',

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
      title: 'สถานะการลงทะเบียน',
      dataIndex: 'statusconfirm',
      key: 'statuscheckin',
      width: '10%',

      render: (text: any) => {
        return text === true ? (
          <Tag>
            <Space>
              
              {'เข้าร่วม'}
            </Space>
          </Tag>
        ) : (
          <Tag>
            <Space>
              
              {'ไม่เข้าร่วม'}
            </Space>
          </Tag>
        );
      },
    }
  ];
  return (
    <>
      <Row
        gutter={[
          { xs: 8, sm: 16 },
          { xs: 8, sm: 16 },
        ]}
      >
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}
        >
          <Row gutter={16}>
            <Col>
              <Button
                style={{
                  border: 'none',
                  width: 'auto',
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
        </Card>

        <div style={{ width: '100%', marginLeft: '10px', marginRight: '10px' }}>
          <Card
            style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
            title={
              <>
                <Typography
                  style={{
                    textAlign: 'left',
                    // fontSize: '30px',
                    // fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  Check-in Lists
                </Typography>
                <Typography
                  style={{
                    textAlign: 'left',
                    // fontSize: '30px',
                    // fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  {dataIntable[0]?.title}
                </Typography>
                <Typography
                  style={{
                    textAlign: 'left',
                    // fontSize: '30px',
                    // fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  {`Link ${window.origin}/detail/${state}`}
                </Typography>
              </>
            }
            // extra={}
          >
            <Table
              columns={columns}
              dataSource={dataUser}
              rowKey={'uuid'}
              scroll={{ x: 'calc(1200px + 50%)' }}
            />
          </Card>
        </div>
      </Row>
    </>
  );
};
