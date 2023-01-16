import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';

interface Props {
  baseURL: string;
}

export const DetailNoMeeting: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  const navigate = useNavigate();

  return <div>Hello</div>;
};
