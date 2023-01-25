import { Button, Col, Form, Input, Row, Space, Upload } from 'antd';
import {
  InfoCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { saveAs } from 'file-saver';
type RequiredMark = boolean | 'optional';
const { TextArea } = Input;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  Pagestep: string;
  field?: any[];
  idroom: any;
  idstep: string;
};

export const DetailSumMinutes: React.FC<Props> = ({
  children,
  extra,
  Pagestep,
  field,
  idroom,
  idstep,
}) => {
  return (
    <>
      <Row>
        {/* <Form
          name="dynamic_form_nest_item"
          // onFinish={onFinish}
          autoComplete="off"
          style={{ width: '100%' }}
          form={form}
          // onChange={onFinish}
          // layout="vertical"
          // initialValues={{ requiredMarkValue: requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
        >
          <Form.Item
            label={`ระเบียบวาระที่ ${Pagestep}`}
            required
            tooltip="This is a required field"
            name="agendas"
          >
            <Input placeholder={agenda?.agendes} disabled />
          </Form.Item>
          <Form.Item
            label="รายละเอียดการประชุม"
            tooltip={{
              title: 'Tooltip with customize icon',
              icon: <InfoCircleOutlined />,
            }}
            name="detail"
          >
            <TextArea placeholder={agenda?.detailagendes} disabled />
          </Form.Item>
          <Row>
            <Col span={2}>เรื่องที่</Col>
            <Col span={18}>รายละเอียด</Col>
            <Col offset={1} span={3}></Col>
          </Row>
          {agendaDetail?.map((x: any, i: number) => {
            const id = Number(x.idagendess) + 1;
            return (
              <Row key={i}>
                <Col span={2}>{`${id}.${x.step}`}</Col>
                <Col span={18}>{x.detail}</Col>
                <Col offset={1} span={3}></Col>
              </Row>
            );
          })}
          <br></br>
          ไฟลเอกสารเพิ่มเติม (ถ้ามี)
          <br></br>
          {pathfile.map((x: any) => {
            if (x.type === 'fileAgenda' && String(x.step) === String(idstep)) {
              return (
                <>
                  <Button
                    type="link"
                    onClick={() => getFiles(idroom, idstep, x.namefile)}
                    key={`${idroom}.${idstep}.${x.namefile}`}
                  >
                    {x.namefile}
                  </Button>
                  <br></br>
                </>
              );
            }
          })}
          <br></br>
        </Form> */}
      </Row>
    </>
  );
};
