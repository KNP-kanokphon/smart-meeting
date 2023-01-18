import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  TimePicker,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { TableBoard } from './createmeeting/TableBoard';
import { TableAttendee } from './createmeeting/TableAttendee';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { type } from '@testing-library/user-event/dist/type';

interface IProp {
  setDataField: (dataField: any) => void;
  data: any;
  user?: any;
  nameFileoverview: any;
}

export const AgendaPage: React.FC<IProp> = ({
  setDataField,
  data,
  user,
  nameFileoverview,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const [dataAgenda, setDataAgenda] = useState<any>([]);
  useEffect(() => {
    form.setFieldsValue({
      title: data[0]?.title,
      room: data[0]?.room,
      floor: data[0]?.floor,
      building: data[0]?.building,
      meetingPlace: data[0]?.meetingplace,
      date:
        typeof data[0]?.day === 'string'
          ? moment(data[0]?.day, 'YYYY:MM:DD')
          : data[0]?.day,
      timeStart:
        typeof data[0]?.starttime === 'string'
          ? moment(data[0]?.starttime, 'HH:mm:ss')
          : data[0]?.starttime,
      timeEnd:
        typeof data[0]?.starttime === 'string'
          ? moment(data[0]?.endtime, 'HH:mm:ss')
          : data[0]?.endtime,
      detail: data[0]?.detail,
      files: nameFileoverview,
    });
    setFileList(nameFileoverview);
    setDataField({
      title: data[0]?.title,
      room: data[0]?.room,
      floor: data[0]?.floor,
      building: data[0]?.building,
      meetingPlace: data[0]?.meetingplace,
      date:
        typeof data[0]?.day === 'string'
          ? moment(data[0]?.day, 'YYYY:MM:DD')
          : data[0]?.day,
      timeStart:
        typeof data[0]?.starttime === 'string'
          ? moment(data[0]?.starttime, 'HH:mm:ss')
          : data[0]?.starttime,
      timeEnd:
        typeof data[0]?.starttime === 'string'
          ? moment(data[0]?.endtime, 'HH:mm:ss')
          : data[0]?.endtime,
      detail: data[0]?.detail,
      files: nameFileoverview,
    });
  }, [data, nameFileoverview]);

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

  const onChangeForm = (values: any, changvalue: any) => {
    setDataField(changvalue);
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  return (
    <>
      {data && nameFileoverview && (
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onValuesChange={onChangeForm}
          autoComplete="off"
          layout="vertical"
          // initialValues={{ title: dataAgenda?.title }}
          // fields={[
          //   {
          //     name: ['title'],
          //     value: dataAgenda?.title,
          //   },
          // ]}
          style={{ marginTop: '20px', marginBottom: '10px' }}
        >
          <Col span={24}>
            <Form.Item
              label={'เรื่อง'}
              name={'title'}
              rules={[{ required: true, message: 'กรุณากรอกเรื่อง' }]}
            >
              <Input placeholder="เรื่อง" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={16}>
              <Col xs={{ span: 8 }} lg={{ span: 8 }}>
                <Form.Item
                  name={'room'}
                  label={'ห้อง'}
                  rules={[{ required: true, message: 'กรุณากรอกห้องประชุม' }]}
                >
                  <Input placeholder="ห้องประชุม" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 8 }} lg={{ span: 8 }}>
                <Form.Item
                  name={'floor'}
                  label={'ชั้น'}
                  rules={[{ required: true, message: 'กรุณากรอกชั้น' }]}
                >
                  <Input placeholder="ชั้น" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 8 }} lg={{ span: 8 }}>
                <Form.Item
                  name={'building'}
                  label={'อาคาร'}
                  rules={[{ required: true, message: 'กรุณากรอกอาคาร' }]}
                >
                  <Input placeholder="อาคาร" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item
                  name={'meetingPlace'}
                  label={'สถานที่ประชุม'}
                  rules={[
                    { required: true, message: 'กรุณากรอกสถานที่ประชุม' },
                  ]}
                >
                  <Input placeholder="สถานที่ประชุม" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={16}>
              <Col xs={{ span: 8 }} lg={{ span: 8 }}>
                <Form.Item
                  name={'date'}
                  label={'วันที่'}
                  rules={[{ required: true, message: 'กรุณากรอกวันที่' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={{ span: 8 }} lg={{ span: 8 }}>
                <Form.Item
                  name={'timeStart'}
                  label={'เวลาเริ่ม'}
                  rules={[{ required: true, message: 'กรุณากรอกเวลาเริ่ม' }]}
                >
                  <TimePicker style={{ width: '100%' }} />
                </Form.Item>
                {/* <TimePicker
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
                /> */}
              </Col>
              <Col xs={{ span: 8 }} lg={{ span: 8 }}>
                <Form.Item
                  name={'timeEnd'}
                  label={'เวลาสิ้นสุด'}
                  rules={[{ required: true, message: 'กรุณากรอกเวลาสิ้นสุด' }]}
                >
                  <TimePicker style={{ width: '100%' }} />
                </Form.Item>
                {/* <TimePicker
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
                /> */}
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item
                  name={'detail'}
                  label={'รายละเอียดการประชุม'}
                  // rules={[{ required: true, message: 'กรุณากรอกเวลาสิ้นสุด' }]}
                >
                  <TextArea maxLength={1000} rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label={'เอกสารภาพประกอบการประชุม'} name={'files'}>
                  <Upload {...props}>
                    <Button
                      // disabled={fileList.length === 1}
                      icon={<UploadOutlined />}
                    >
                      Click To Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Divider />
          <TableAttendee
            onChangeSetItemFiledAtt={onChangeSetItemFiledAtt}
            user={user}
          />
        </Form>
      )}
    </>
  );
};
