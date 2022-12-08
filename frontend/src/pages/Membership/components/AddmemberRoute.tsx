import React, { useState } from 'react';
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { AddNormalUser } from './AddNormalUser';
import { AddMemberUser } from './AddMemberUser';

export const AddmemberRoute: React.FC = (): React.ReactElement => {
  const [getSegmented, setSegmented] = useState<Number>(0);
  return (
    <>
      <Segmented
        onChange={(e: any) => {
          setSegmented(e);
        }}
        defaultValue={0}
        block
        size="large"
        options={[
          {
            value: 0,
            label: 'แบบฟอร์มสมัครสมาชิกสมาคมทั่วไป',
          },
          {
            value: 1,
            label: 'แบบฟอร์มรับรองบุคคลผู้จะเป็นกรรมการของสมาคม',
          },
        ]}
      />
      <br />
      {getSegmented === 0 ? <AddNormalUser /> : <AddMemberUser />}
    </>
  );
};
