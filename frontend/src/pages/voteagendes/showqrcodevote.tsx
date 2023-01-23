import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
const { Meta } = Card;

export const Showqrcodevote: React.FC = (): React.ReactElement => {
  const { roomid } = useParams<{ roomid: string }>();
  const { step } = useParams<{ step: string }>();
  return (
    <Card
      hoverable
      style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
    >
      <QRCode
        id="qr-gen"
        size={700}
        value={`${window.location.host}/vote/loginvote/${roomid}/${step}`}
      />
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};
