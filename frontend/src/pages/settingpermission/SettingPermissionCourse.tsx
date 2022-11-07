import {
  Card,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  Select,
} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import type { FormInstance } from 'antd/es/form';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  title: string;
  name: string;
  lastname: string;
  course: string;
  id: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const SettingPermissionCourse: React.FC = (): React.ReactElement => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '1',
      title: 'm',
      name: 'string',
      lastname: 'string',
      course: 'string',
      id: 'string',
    },
    {
      key: '2',
      title: 'f',
      name: 'string',
      lastname: 'string',
      course: 'string',
      id: 'string',
    },
  ]);
  const { Option } = Select;

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: any = [
    {
      title: 'คำนำหน้า',
      dataIndex: 'title',
      width: '30%',
    //   editable: true,
      render: (_: any, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Select placeholder={'Please Select'} allowClear style={{width:"100%"}}>
            <Option key={0} value={"m"}>นาย</Option>
            <Option key={1} value={"f"}>นางสาว</Option>
          </Select>
        ) : (
          <Select placeholder={'Please Select'} allowClear style={{width:"100%"}}>
           <Option key={0} value={"m"}>นาย</Option>
            <Option key={1} value={"f"}>นางสาว</Option>
          </Select>
        ),
    },
    {
      title: 'ชื่อ',
      dataIndex: 'age',
      render: (_: any, record: { key: React.Key }) =>
        dataSource.length >= 1 ? <Input /> : null,
    },
    {
      title: 'นามสกุล',
      dataIndex: 'address',
      render: (_: any, record: { key: React.Key }) =>
        dataSource.length >= 1 ? <Input /> : null,
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'address',
      render: (_: any, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Select placeholder={'Please Select'} style={{width:"100%"}} allowClear>
            <Option key={0} value={"m"}>นายกสมาคม</Option>
            <Option key={1} value={"f"}>รองนายกสมาคม</Option>
          </Select>
        ) : (
          <Select placeholder={'Please Select'}>
            <Option key={0} value={"m"}>นายกสมาคม</Option>
            <Option key={1} value={"f"}>รองนายกสมาคม</Option>
          </Select>
        ),
    },
    {
      title: 'action',
      dataIndex: 'id',
      render: (_: any, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      title: '',
      name: 'string',
      lastname: 'string',
      course: 'string',
      id: 'string',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <>
      <Card title={'ตำแหน่ง'} style={{ borderRadius: '10px' }}>
        <div>
          <Button
            onClick={handleAdd}
            // type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: '#1E6541',
            }}
          >
            <Typography style={{ color: 'white' }}>เพิ่มตำแหน่ง</Typography>
          </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns as ColumnTypes}
          />
        </div>
      </Card>
    </>
  );
};
