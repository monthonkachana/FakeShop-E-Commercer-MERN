import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';
const { TextArea } = Input;
const Inputappress = () => {
  
  return (
    <>
      
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        >      
        <Form.Item label="ชื่อ">
          <Input />
        </Form.Item>
        <Form.Item label="เบอร์ติดต่อ">
          <Input />
        </Form.Item>
       
        <Form.Item label="ที่อยู่">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="ธนาคาร" >
          <Radio.Group>
            <Radio value="apple"> กสิกร </Radio>
            <Radio value="pear"> ไทยพาณิชย์ </Radio>
            <Radio value="pear"> กรุงไทย </Radio>
            <Radio value="pear"> กรุงเทพ </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="ใบสลิป (*ถ้ามี)" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <Inputappress />;