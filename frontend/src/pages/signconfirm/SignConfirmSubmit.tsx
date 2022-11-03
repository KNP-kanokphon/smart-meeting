import React, { useRef } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  Row,
  Table,
  Typography,
  Modal,
  Space,
} from 'antd';
import SignaturePad from 'react-signature-canvas';
import { EditOutlined } from '@ant-design/icons';

export const SignConfirmSubmit: React.FC = (): React.ReactElement => {
  const sigCanvas = useRef<any>(null);

  return (
    <div>
      <Card
        style={{
          borderRadius: '15px',
          boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
        }}
        title={
          <>
            <Row gutter={16}>
              <Col>
                <EditOutlined />
              </Col>
              <Col>
                <Typography>Signature</Typography>
              </Col>
              <Col>
                <Typography>{`(ดร.ฐิติมา หล่อพิพัฒน์)`}</Typography>
              </Col>
            </Row>
          </>
        }
      >
        {' '}
        <div style={{ textAlign: 'center' }}>
          <SignaturePad
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 'auto',
              // height: '400px',
              //   background:"grey",
              className: 'sigCanvas',
            }}
          />
        </div>
        <Typography>ลายเซ็นผู้อนุมัติ</Typography>
        <Row gutter={14}>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 12 }}
            style={{ textAlign: 'right' }}
          >
            <Button>Back</Button>
          </Col>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 12 }}
            style={{ textAlign: 'left' }}
          >
            <Button
              style={{ background: '#1E6541', color: 'white' }}
              // onClick={onFinish}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
