import {
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  TimePicker,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { props } from 'lodash/fp';
import { TableBoard } from '../Meeting/createmeeting/TableBoard';
import { TableAttendee } from '../Meeting/createmeeting/TableAttendee';
import { useEffect, useState } from 'react';

interface IProp {
  setDataField: (dataField: any) => void;
}

export const AgendaPage: React.FC<IProp> = ({ setDataField }) => {
  const [fileList, setFileList] = useState<any>([]);
  const onChangeDate = (date: any) => {
    console.log(date);
  };
  const onChangeStartTime = (time: any) => {
    console.log(time);
  };
  const onChangeEndTime = (time: any) => {
    console.log(time);
  };
  const onChangeSetItemFiled = async (filedList: any) => {
    setDataField({ userBoard: filedList });
  };
  const onChangeSetItemFiledAtt = async (filedList: any) => {
    setDataField({ userAttendee: filedList });
  };
  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setDataField({ fileOverview: newFileList });
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
      setDataField({ fileOverview: [...fileList, file] });
      return false;
    },
    fileList,
  };
  return (
    <>
      <Col span={24} style={{ marginTop: '20px', marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            เรื่อง
            <Input
              onChange={(e: any) => setDataField({ title: e.target.value })}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            ห้องประชุม
            <Input
              onChange={(e: any) => setDataField({ room: e.target.value })}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            ชั้น
            <Input
              onChange={(e: any) => setDataField({ floor: e.target.value })}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            อาคาร
            <Input
              onChange={(e: any) => setDataField({ building: e.target.value })}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            สถานที่ประชุม
            <Input
              onChange={(e: any) =>
                setDataField({ meetingPlace: e.target.value })
              }
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            วันที่
            <DatePicker
              onChange={(date, dateString) =>
                setDataField({ date: dateString })
              }
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            เวลาเริ่ม
            <TimePicker
              onChange={(date, dateString) =>
                setDataField({ timeStart: date?.format('HH:mm:ss') })
              }
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            เวลาสิ้นสุด
            <TimePicker
              onChange={(date, dateString) =>
                setDataField({ timeEnd: date?.format('HH:mm:ss') })
              }
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginBottom: '10px' }}>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            รายละเอียดการประชุม
            <TextArea
              rows={4}
              onChange={(e: any) =>
                setDataField({ detailMeeting: e.target.value })
              }
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
      <TableBoard onChangeSetItemFiled={onChangeSetItemFiled} />
      <Divider />
      <TableAttendee onChangeSetItemFiledAtt={onChangeSetItemFiledAtt} />
    </>
  );
};
