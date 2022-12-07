import { Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  message,
  Row,
  Steps,
  TimePicker,
  Upload, Form} from 'antd';
import React, { useRef,useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
import './css/style.css';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  UploadOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { TableBoard } from './TableBoard';
import { TableAttendee } from './TableAttendee';
const { TextArea } = Input;






// const { Option } = Select;
export const CreateMeeting: React.FC = () => {

  //start firstPage 
  const [title, setTitle] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [building, setBuilding] = useState<string>('');
  const [meetingplace, setMeetingplace] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [starttime, setStarttime] = useState<string>('');
  const [endtime, setEndtime] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [snack, setSnack] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);
  const onChangeDate = (e: any) => {
    const date = e._d;
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });
    var formattedDate = day + '-' + month + '-' + year;
    setDay(formattedDate);
  };
  const onChangeStartTime = (e: any) => {
    const time = e._d;
    const newTime = time.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    setStarttime(newTime);
  };
  const onChangeEndTime = (e: any) => {
    const time = e._d;
    const newTime = time.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    setEndtime(newTime);
  };
  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  //end firstPage 

  //start secondPage 
  type TabPosition = 'left' | 'right' | 'top' | 'bottom';
  const [tabPosition, setTabPosition] = useState<TabPosition>('left');


  const defaultPanes = new Array(3).fill(0).map((_, index) => {
    const id = String(index + 1);
    return { label: `ระเบียบวาระที่ ${id}`, children: `Content of Tab Pane ${index + 1}`, key: id };
  });
  const [activeKeyTab, setActiveKeyTab] = useState(defaultPanes[0].key);
  const [itemsTab, setItemsTab] = useState(defaultPanes);
  const newTabIndex = useRef(3);

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItemsTab([...itemsTab, { label: `ระเบียบวาระที่ ${newTabIndex.current}`, children: 'New Tab Pane', key: newActiveKey }]);
    setActiveKeyTab(newActiveKey);
  };
  const onChangeTab = (key: string) => {
    setActiveKeyTab(key);
  };
  const remove = (targetKey: string) => {
    const targetIndex = itemsTab.findIndex(pane => pane.key === targetKey);
    const newPanes = itemsTab.filter(pane => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKeyTab) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKeyTab(key);
    }
    setItemsTab(newPanes);
  };

  const onEditTab = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  //end secondPage 

  const firstPage = () => {
    return (
      <div>
      <Row gutter={16}>
        <Col span={24} style={{ marginTop: '20px', marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              เรื่อง
              <Input defaultValue={title} onChange={(e: any) => setTitle(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              ห้องประชุม
              <Input onChange={(e: any) => setRoom(e.target.value)} />
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              ชั้น
              <Input onChange={(e: any) => setFloor(e.target.value)} />
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              อาคาร
              <Input onChange={(e: any) => setBuilding(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              สถานที่ประชุม
              <Input onChange={(e: any) => setMeetingplace(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              วันที่
              <DatePicker onChange={onChangeDate} style={{ width: '100%' }} />
              {/* <Input onChange={(e: any) => setDay(e.target.value)} /> */}
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              เวลาเริ่ม
              <TimePicker
                onChange={onChangeStartTime}
                style={{ width: '100%' }}
              />
              {/* <Input onChange={(e: any) => setStarttime(e.target.value)} /> */}
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              เวลาสิ้นสุด
              <TimePicker
                onChange={onChangeEndTime}
                style={{ width: '100%' }}
              />
              {/* <Input onChange={(e: any) => setEndtime(e.target.value)} /> */}
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              รายละเอียดการประชุม
              <TextArea
                rows={4}
                onChange={(e: any) => setDetail(e.target.value)}
                showCount
                maxLength={1000}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              เอกสารภาพประกอบการประชุม
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Upload {...props}>
                <Button
                  // disabled={fileList.length === 1}
                  icon={<UploadOutlined />}
                >
                  Click To Upload
                </Button>
              </Upload>
            </Col>
          </Row>
        </Col>
        <Divider />
        {/* <TableBoard /> */}
        <Divider />
        {/* <TableAttendee /> */}
        <Col span={24}>
          <Row>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 24 }}
              style={{ textAlign: 'center' }}
            >
              <br></br>
              {/* <Button
                style={{ color: 'white', background: '#1E6541' }}
                onClick={() => nextPage()}
              >
                Next
              </Button> */}
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
    );
  }
  const secondPage = () => {


  return (
    <>
      {/* <Tabs
        tabPosition={tabPosition}
        items={new Array(newTabIndex).fill(0).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
        // items={items}
      /> */}
      <Tabs
        tabPosition={tabPosition}
        hideAdd
        onChange={onChangeTab}
        activeKey={activeKeyTab}
        type="editable-card"
        onEdit={onEditTab}
        items={itemsTab}
      />
      <Button onClick={add}>ADD</Button>

    </>
  );
  }
  const thirdPage = () => {
    return "3";
  }
  const steps = [
    {
      title: 'In Progress',
      content: firstPage(),
    },
    {
      title: 'Waiting',
      content: secondPage(),
    },
    {
      title: 'Waiting',
      content: thirdPage(),
    },
  ];
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ 
    key: item.title,
    title: item.title 
  }));
  return (
    <>
    <Card title="Create Meeting" style={{ width: '100%' }}>
      <Steps current={current} items={items} />
      <br />
      <div className="steps-content">
        {steps[current].content}
      </div>
      <div className="steps-action" style={{textAlign: 'center'}}>
        {current < steps.length - 1 && (
          <Button style={{ color: 'white', background: '#1E6541' }} type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button style={{ color: 'white', background: '#1E6541' }} type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px',color: 'white', background: '#1E6541' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
      </Card>
    </>
  );
};