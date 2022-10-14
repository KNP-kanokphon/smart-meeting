import { Row } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { reportStore } from '../../stores/report-store';

export const ReportLayout: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    reportStore.init(location.pathname.split('/').pop() || '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Row gutter={[16, 16]}>
      <Outlet />
    </Row>
  );
};
