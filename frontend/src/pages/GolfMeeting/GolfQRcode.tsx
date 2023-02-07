import React, { useEffect, useState } from 'react';
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
  Modal,
} from 'antd';
import QRCode from 'qrcode.react';
import {
  ArrowRightOutlined,
  VerticalAlignBottomOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/images/KPIS Logo.png';
import './GolfRoute.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatamanagementService } from '../../stores/meeting-store';
export interface Props {
  baseURL: string;
}
export const GolfQRcode: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const [userprofile, setUserprofile] = useState<any>([]);
  const [UserProfileContract, setUserprofileContracts] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      autoGetapiprofile();
    }, 3000);

    return () => clearInterval(interval);
    // autoGetapiprofile();
  }, []);

  const autoGetapiprofile = async () => {
    const datateam = await DatamanagementService().getactivitybyphone(
      state.detail[0].phonenumberownergang,
    );

    const resultCheckin = await DatamanagementService().getactivitybyid(
      state.idactivity,
      state.applicationnumber,
    );
    setModalOpen(datateam[0]);
    if (datateam[0].checkinstatus === true && modalOpen === false) {
      showModal();
    }
  };

  const nextPage = () => {
    navigate(
      `/golfdetailcheckin/${state.detail[0].idactivity}/${state.detail[0].applicationnumber}`,
    );
  };
  const showModal = () => {
    let secondsToGo = 3;

    const modal = Modal.success({
      title: 'ลงทะเบียนเสร็จสิ้น',
      content: `จะปิดการแสดงผลภายในเวลา ${secondsToGo} วินาที.`,
      okButtonProps: {
        style: {
          display: 'none',
        },
      },
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `จะปิดการแสดงผลภายในเวลา ${secondsToGo} วินาที.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      nextPage();
      modal.destroy();
    }, secondsToGo * 1000);
  };

  console.log(
    `${window.location.origin}/activity/golfcheckin/${state.detail[0].idactivity}/${state.detail[0].applicationnumber}`,
  );

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
                  {state.namegang}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography
                  className="typothree"
                  hidden={state?.member1 ? false : true}
                >{`${state?.member1}`}</Typography>
                <Typography
                  className="typothree"
                  hidden={state?.member2 ? false : true}
                >{`${state?.member2}`}</Typography>
                <Typography
                  className="typothree"
                  hidden={state?.member3 ? false : true}
                >{`${state?.member3}`}</Typography>
                <Typography
                  className="typothree"
                  hidden={state?.member4 ? false : true}
                >{`${state?.member4}`}</Typography>
                {/* <Typography className="typothree">{state.name}</Typography> */}
              </Col>
            </Row>
            <Card className="cardqrcode">
              <QRCode
                id="qr-gen"
                size={180}
                value={`${window.location.origin}/activity/golfcheckin/${state.idactivity}/${state.applicationnumber}`}
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

            <Button
              type="primary"
              className="buttonnext"
              onClick={() => navigate(-1)}
            >
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
