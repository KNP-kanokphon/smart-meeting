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
import { TableBoard } from './createmeeting/TableBoard';
import { TableAttendee } from './createmeeting/TableAttendee';
import { useEffect, useState } from 'react';
import moment from 'moment';

interface IProp {
  setDataField: (dataField: any) => void;
  data?: any;
  user?: any;
  nameFilesummary?: any;
}

export const AgendaPage: React.FC<IProp> = ({
  setDataField,
  data,
  user,
  nameFilesummary,
}) => {
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    // setFileList(nameFilesummary)
    // console.log(nameFilesummary,'nameFilesummary');
    // const newNameFilesummary = nameFilesummary.map((x: any, y: any) => {
    //   console.log(x.type);

    //   if ((x.type = 'fileOverviwe')) return { ...x, name: x.namefile, uid: y };
    // });
    // const newNameFilesummary = nameFilesummary.filter(
    //   (x: any) => x.type === 'fileOverviwe',
    // );
    const file: any = [];
    nameFilesummary.filter((c: any, index: number) => {
      if (c.type === 'fileOverviwe') {
        file.push({
          id: 30,
          idmeeting: c.idmeeting,
          namefile: c.namefile,
          pathfile: c.pathfile,
          type: 'fileAgenda',
          step: '0',
          name: c.namefile,
          uid: index,
        });
      }
    });
    setFileList(file);
    const oldanswer = {
      title: dataAgenda?.title,
      room: dataAgenda?.room,
      floor: dataAgenda?.floor,
      building: dataAgenda?.building,
      meetingPlace: dataAgenda?.meetingplace,
      date: dataAgenda?.day,
      timeStart: dataAgenda?.starttime,
      timeEnd: dataAgenda?.endtime,
      detailMeeting: dataAgenda?.detail,
      fileOverview: file,
    };
    setDataField(oldanswer);
  }, [nameFilesummary]);
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
  const setDataAgendaield = (dataField: any) => {
    setDataAgenda((pre: any) => ({ ...pre, ...dataField }));
  };
  const [dataAgenda, setDataAgenda] = useState<any>([]);
  useEffect(() => {
    setDataAgendaield(data[0]);
  }, [data]);

  return (
    <>
      <Col span={24} style={{ marginTop: '20px', marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            เรื่อง
            <Input
              value={dataAgenda?.title}
              onChange={(e: any) => [
                setDataField({ title: e.target.value }),
                setDataAgendaield({ title: e.target.value }),
              ]}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            ห้องประชุม
            <Input
              value={dataAgenda?.room}
              onChange={(e: any) => [
                setDataField({ room: e.target.value }),
                setDataAgendaield({ room: e.target.value }),
              ]}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            ชั้น
            <Input
              value={dataAgenda?.floor}
              onChange={(e: any) => [
                setDataField({ floor: e.target.value }),
                setDataAgendaield({ floor: e.target.value }),
              ]}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            อาคาร
            <Input
              value={dataAgenda?.building}
              onChange={(e: any) => [
                setDataField({ building: e.target.value }),
                setDataAgendaield({ building: e.target.value }),
              ]}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            สถานที่ประชุม
            <Input
              value={dataAgenda?.meetingplace}
              onChange={(e: any) => [
                setDataField({ meetingPlace: e.target.value }),
                setDataAgendaield({ meetingplace: e.target.value }),
              ]}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ marginBottom: '10px' }}>
        <Row gutter={16}>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            วันที่
            <DatePicker
              value={
                typeof dataAgenda?.day === 'string'
                  ? moment(dataAgenda?.day)
                  : dataAgenda?.day
              }
              onChange={(date, dateString) => [
                setDataField({ date: dateString }),
                setDataAgendaield({ day: dateString }),
              ]}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            เวลาเริ่ม
            <TimePicker
              value={
                typeof dataAgenda?.starttime === 'string'
                  ? moment(dataAgenda?.starttime, 'HH:mm:ss')
                  : dataAgenda?.starttime
              }
              onChange={(date, dateString) => [
                setDataField({ timeStart: date?.format('HH:mm:ss') }),
                setDataAgendaield({ starttime: date?.format('HH:mm:ss') }),
              ]}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={{ span: 8 }} lg={{ span: 8 }}>
            เวลาสิ้นสุด
            <TimePicker
              value={
                typeof dataAgenda?.endtime === 'string'
                  ? moment(dataAgenda?.endtime, 'HH:mm:ss')
                  : dataAgenda?.endtime
              }
              onChange={(date, dateString) => [
                setDataField({ timeEnd: date?.format('HH:mm:ss') }),
                setDataAgendaield({ endtime: date?.format('HH:mm:ss') }),
              ]}
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
              value={dataAgenda?.detail}
              onChange={(e: any) => [
                setDataField({ detailMeeting: e.target.value }),
                setDataAgendaield({ detail: e.target.value }),
              ]}
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
      <TableBoard onChangeSetItemFiled={onChangeSetItemFiled} user={user} />
      <Divider />
      <TableAttendee
        onChangeSetItemFiledAtt={onChangeSetItemFiledAtt}
        user={user}
      />
    </>
  );
};
