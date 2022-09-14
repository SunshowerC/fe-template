import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { Button, message } from "antd";

export interface ProcessSettingModalFormProps {
  onSubmit?: (...args)=> any
}

export const ProcessSettingModalForm = (props: ProcessSettingModalFormProps) => {


  return <ModalForm
    title={"流程设置"}
    width={"480px"}
    
    
    onFinish={async (values) => {
      console.log('setting form ', values)
      message.success('提交成功');
      await props.onSubmit?.(values)
      return true;
    }}
    trigger={<Button>设置</Button>}>
    <ProFormText
      rules={[{required: true}]}
      width="lg"
      name="bpmnName"
      label="流程名"
      placeholder="请输入名称"
    />

    <ProFormTextArea
      width="lg"
      name="bpmnDesc"
      label="流程描述"
    />
  </ModalForm>
}