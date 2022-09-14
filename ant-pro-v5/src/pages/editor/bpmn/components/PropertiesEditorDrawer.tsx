import ProForm, { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { Button, Drawer, Form, message, Space } from "antd";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { BpmnElement } from "../bpmn.type";
// import ProForm from '@ant-design/pro-form'

export interface PropertiesEditorDrawerProps {
  // selectedNode: any
  onSubmit?: (val: PropertyFormObj) => any

}

export interface PropertiesEditorDrawerRef {
  // selectedNode: any

  open: (selectedNode: PropertyFormObj) => any

}

export interface PropertyFormObj {
  type?: string
  name: string
  taskDesc?: string
  implement: string
}

const __PropertiesEditorDrawer = (props: PropertiesEditorDrawerProps, ref: Ref<PropertiesEditorDrawerRef>) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<PropertyFormObj>();


  const onOpen = () => {
    setOpen(true);
  };


  const onClose = () => {
    setOpen(false);
    form.resetFields()
  };

  const onSumit = async (values)=>{
    console.log('onSumit', values);

    try {

    
    await props.onSubmit?.(values)
  } catch(e) {
    console.log('eeeer', e)
  }
    message.success('提交成功');
    
    onClose()
  }

  useImperativeHandle(ref, () => {
    return {
      open: (formVal: PropertyFormObj) => {
        onOpen()
        form.setFieldsValue(formVal)
      }
    }
  })

  return (
    <Drawer
      title="属性配置"
      placement={'right'}
      width={500}
      mask={false}
      onClose={onClose}
      visible={open}
      extra={
        <Space>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button type="primary" onClick={()=>form.submit()}>
            OK
          </Button>
        </Space>
      }
    >
      <ProForm 
        form={form}
        layout={"horizontal"}
        labelCol={{
          span: 6,
        }}
        request={async ()=>{
          return {
            name: 'some',
            taskDesc: 'thing',
            implement: 'implement'
          }
        }}
        onFinish={onSumit}
        submitter={false}
      >
      {/* 1. task name: 任务名
2. description: 任务描述
3. implement: 方法 */}

        <ProFormText
          rules={[{required: true, max: 20}]}
          label="任务名"
          name={"name"}
         />

        <ProFormTextArea
          label="任务描述"
          rules={[{max: 255}]}
          name={"taskDesc"}
         />

        <ProFormSelect
          label="方法"
          name={"implement"}
          options={[
            'abc',
            'abc1',
            'abc3',
          ]}
        />
      </ProForm>
    </Drawer>
  )

}


export const PropertiesEditorDrawer = forwardRef(__PropertiesEditorDrawer)
