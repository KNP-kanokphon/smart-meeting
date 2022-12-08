import React, { useState, useRef } from 'react';
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
  ConfigProvider,
  InputNumber,
  Button,
  Space,
  Upload,
  message,
  Modal,
} from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import SignatureCanvas from 'react-signature-canvas';

// datepicker local thialand
import dayjs from 'dayjs';
import thTH from 'antd/lib/locale-provider/th_TH';
import 'dayjs/locale/th';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style';
import TextArea from 'antd/lib/input/TextArea';
const DatePicker = generatePicker(dayjsGenerateConfig);
let buddhistEra = require('dayjs/plugin/buddhistEra');
dayjs.extend(buddhistEra);
dayjs.locale('th');
const configuredLocale: any = {
  ...thTH,
  DatePicker: {
    ...thTH.DatePicker,
    dateFormat: 'YYYY-MM-DD', // DD MM BBBB
    yearFormat: 'BBBB',
    lang: {
      ...thTH.DatePicker?.lang,
      dateFormat: 'YYYY-MM-DD', // DD MM BBBB
      dateTimeFormat: 'DD MM YYYY HH:mm:ss',
      yearFormat: 'BBBB',
    },
  },
};
//

export const AddMemberUser: React.FC = (): React.ReactElement => {
  const { Option } = Select;
  const [open, setOpen] = useState<any>();
  const [imageURLone, setImageURlone] = useState<any>(null);
  const sigCanvas = useRef<any>(null);
  const [fileList, setFileList] = useState<any>([]);

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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

  const showModal = (e: any) => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const endSignager: any = {
    onEnd: () => {
      const pngUrl = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      setImageURlone(pngUrl);
    },
  };

  return (
    <>
      <Modal
        title={
          <div>
            <Row>
              <Space>
                <Col>
                  <EditOutlined />
                </Col>
                <Col>
                  <Typography>Signature</Typography>
                </Col>
              </Space>
            </Row>
          </div>
        }
        visible={open}
        style={{ width: '500px', height: '500px' }}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={false}
      >
        <div style={{ textAlign: 'center' }}>
          <SignatureCanvas
            canvasProps={{
              width: 250,
              height: 200,
              className: 'sigCanvas',
            }}
            ref={sigCanvas}
            {...endSignager}
            backgroundColor="#EBEDF0"
          />
        </div>
        <Row gutter={14}>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 12 }}
            style={{ textAlign: 'right' }}
          >
            <Button onClick={handleCancel}>Back</Button>
          </Col>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 12 }}
            style={{ textAlign: 'left' }}
          >
            <Button
              style={{ background: '#1E6541', color: 'white' }}
              //   onClick={onFinish}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Modal>
      <Card
        style={{ width: '100%' }}
        title={
          <>
            <Row>
              <Col span={12} style={{ textAlign: 'left' }}>
                <Typography>
                  แบบฟอร์มรับรองบุคคลผู้จะเป็นกรรมการสมาคม
                </Typography>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Select
                  placeholder={'สถานะ'}
                  style={{ width: '20%', textAlign: 'left' }}
                >
                  <Option value="1">สถานะ 1</Option>
                  <Option value="2">สถานะ 2</Option>
                </Select>
              </Col>
            </Row>
          </>
        }
      >
        <ConfigProvider locale={configuredLocale}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'คำนำหน้า'}>
                  <Select placeholder={'เลือกคำนำหน้า'}>
                    <Option value={'M'}>นาย</Option>
                    <Option value={'F'}>นางสาว</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ชื่อ-นามสกุล'}>
                  <Input placeholder="ชื่อ สกุล" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'เลขบัตรประชาชน'}>
                  <Input placeholder="เลขบัตรประชาชน" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'วัน-เดือน-ปี'}>
                  <DatePicker format={'DD-MM-BBBB'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'อายุ'}>
                  <Input placeholder="อายุ" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หมายเลขโทรศัพท์'}>
                  <InputNumber
                    type="phone"
                    maxLength={10}
                    placeholder="หมายเลขโทรศัพท์"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อีเมลล์'}>
                  <Input placeholder="อีเมลล์" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร'}>
                  <Select placeholder={'กรุณาเลือก'}>
                    <Option value={'1'}>หลักสูตร A</Option>
                    <Option value={'2'}>หลักสูตร B</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร 1'}>
                  <Select placeholder={'กรุณาเลือก'}>
                    <Option value={'1'}>หลักสูตร A</Option>
                    <Option value={'2'}>หลักสูตร B</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'รุ่น'}>
                  <Input type="number" placeholder="#1" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตำแหน่งสมาคม'}>
                  <Select placeholder={'กรุณาเลือก'}>
                    <Option value={'1'}>ตำแหน่ง A</Option>
                    <Option value={'2'}>ตำแหน่ง B</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={2}>
                <Form.Item label={'บ้านเลขที่'}>
                  <Input placeholder="บ้านเลขที่" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'เลขที่ห้อง'}>
                  <Input placeholder="เลขที่ห้อง" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อาคาร / หมู่บ้าน'}>
                  <Input placeholder="อาคาร / หมู่บ้าน" />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'หมู่'}>
                  <Input placeholder="#1" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตรอก / ซอย'}>
                  <Input placeholder="ตรอก / ซอย" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'}>
                  <Input placeholder="ถนน" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อีเมลล์'}>
                  <Input placeholder="อีเมลล์" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'}>
                  <Input placeholder="ตำบล / แขวง" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'}>
                  <Input placeholder="อำเภอ / เขต" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จัหงวัด'}>
                  <Input type="number" placeholder="รหัสไปรษณีย์" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={'กรณีเป็นบุคคลต่างด้าว ถือหนังสือเดินทางเลขที่'}
                >
                  <Input placeholder="กรอกข้อมูล" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    'ใบสำคัญถิ่นที่อยู่/ใบสาคัญประจาตัวคนต่างด้าวเลขที่ (ถ้ามี)'
                  }
                >
                  <Input placeholder="กรอกข้อมูล" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ใบอนุญาตทำงานเลขที่ (ถ้ามี)'}>
                  <Input placeholder="กรอกข้อมูล" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'ข้าพเจ้าประกอบอาชีพ'}>
                  <Input placeholder="ข้าพเจ้าประกอบอาชีพ" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำแหน่ง'}>
                  <Input placeholder="ตำแหน่ง" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รายได้เฉลี่ยเดือนละ'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value: any) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    stringMode
                    // step="0.01"
                    parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                    placeholder="รายได้เฉลี่ยเดือนละ"
                    addonAfter="บาท"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'สถานที่ประกอบอาชีพ'}>
                  <Input placeholder="สถานที่ประกอบอาชีพ" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'เลขที่'}>
                  <Input placeholder="เลขที่" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'หมู่ที่'}>
                  <Input placeholder="#1" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตรอก / ซอย'}>
                  <Input type="number" placeholder="ตรอก / ซอย" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'}>
                  <Input type="number" placeholder="ถนน" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'}>
                  <Input type="number" placeholder="ตำบล / แขวง" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'}>
                  <Input type="number" placeholder="อำเภอ / เขต" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'}>
                  <Input type="number" placeholder="จังหวัด" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'}>
                  <Input type="number" placeholder="รหัสไปรษณีย์" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'โทรศัพท์สถานที่ประกอบอาชีพ'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    type="phone"
                    maxLength={10}
                    placeholder="โทรศัพท์สถานที่ประกอบอาชีพ"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={'ปัจจุบันข้าพเจ้ามีทรัพย์สิน ดังต่อไปนี้'}>
                  <TextArea
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    'ข้าพเจ้าเคยทำงานในสมาคมหรือองค์กรอื่นๆ มาก่อน ดังนี้ (ระบุชื่อองค์กรและตำแหน่ง)'
                  }
                >
                  <TextArea
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    'ข้าพเจ้าเคยต้องหาในคดีอาญาหรือคดีแพ่งโดยศาลมีคาพิพากษาถึงที่สุดแล้ว ดังต่อไปนี้'
                  }
                >
                  <TextArea
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={'ข้าพเจ้ามีความประสงค์จะเป็น (ตำแหน่งในสมาคม)'}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder={'ข้าพเจ้ามีความประสงค์จะเป็น (ตำแหน่งในสมาคม)'}
                  >
                    <Option value={1}>ตำแหน่ง 1</Option>
                    <Option value={2}>ตำแหน่ง 2</Option>
                    <Option value={3}>ตำแหน่ง 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'ของสมาคม'}>
                  <Input placeholder="กรอกข้อมูล" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={'ข้อความเพิ่มเติม (ถ้ามี)'}>
                  <TextArea
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Typography style={{ marginBottom: '10px' }}>
              ข้าพเจ้าขอรับรองว่าข้อความที่ได้ให้ไว้ข้างต้นเป็นความจริงทุกประการ
              ทั้งนี้
              หากนายทะเบียนสมาคมตรวจสอบพบว่าข้าพเจ้ามีฐานะและความประพฤติไม่เหมาะสม
              หรือระบุข้อความใดๆ อันเป็นเท็จ
              ข้าพเจ้ายินยอมให้นายทะเบียนสมาคมดำเนินการให้เป็นไปตาม
              ระเบียบกฎหมายที่เกี่ยวข้องทุกประการ
            </Typography>
            <Row gutter={16} style={{ marginBottom: '20px' }}>
              <Col>
                <Button
                  type="primary"
                  style={{ backgroundColor: '#1E6541' }}
                  onClick={(e: any) => showModal(e)}
                >
                  <Space>
                    <EditOutlined />
                    {'E-Signature'}
                  </Space>
                </Button>
              </Col>
              <Col>ลงลายเซ็นชื่อ ผู้จะเป็นกรรมการ</Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Col>
              <Col span={8}>
                <Typography>
                  *อัพโหลดสำเนา 3 ชุด
                  พร้อมลงลายมือชื่อด้วยปากกาสีน้ำเงินหรือสีดำเท่านั้น
                  (สำเนาบัตรประชาชน / สำเนาทะเบียนบ้าน / สำเนาบัตรข้าราชการ)
                </Typography>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{ justifyContent: 'center', display: 'flex' }}
            >
              <Col>
                <Button type="primary" style={{ backgroundColor: '#1E6541' }}>
                  ยืนยัน
                </Button>
              </Col>
              <Col>
                <Button>ยกเลิก</Button>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </Card>
    </>
  );
};
