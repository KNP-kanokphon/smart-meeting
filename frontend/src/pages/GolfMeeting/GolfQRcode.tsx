import React from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Image,
  Form,
  Space,
  Divider,
  Input,
} from 'antd';
import QRCode from 'qrcode.react';
import {
  ArrowRightOutlined,
  VerticalAlignBottomOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/images/KPIS Logo.png';
import './GolfRoute.css';
export interface Props {
  baseURL: string;
}

const data = { namegroup: 'testname', name: 'testnameUser' };

export const GolfQRcode: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const downloadQRCode = () => {
    const canvas: any = document.getElementById('qr-gen');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Row className="row">
        <Col xs={24} md={12} lg={12}>
          <Card className="card">
            <Row>
              <Col span={24}>
                <Image src={Logo} width={100} preview={false} />
              </Col>
              <Col span={24}>
                <Typography className="typothree">กรุณาแสดง QR code</Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothree">
                  นี้ให้กับเจ้าหน้าที่ก่อนเข้าร่วมกิจกรรม
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typotwooooo">
                  {data.namegroup}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothree">{data.name}</Typography>
              </Col>
            </Row>
            <Card className="cardqrcode">
              <QRCode
                id="qr-gen"
                size={180}
                value={`${window.location.host}`}
              />
            </Card>
            <Button
              type="link"
              onClick={downloadQRCode}
              style={{
                textAlign: 'center',
                marginBottom: '10px',
                marginTop: '10px',
              }}
            >
              <DownloadOutlined />
            </Button>

            <Button type="primary" className="buttonnext">
              <ArrowRightOutlined rotate={180} /> ย้อนกลับ
            </Button>
          </Card>
          <Typography className="typofooter">
            ©2022 O S D Company Limited
          </Typography>
        </Col>
      </Row>
    </>
  );
};
