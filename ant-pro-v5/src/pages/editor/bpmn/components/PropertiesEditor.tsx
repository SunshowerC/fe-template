import { Button, Drawer, Space } from "antd";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";


export interface PropertiesEditorDrawerProps {
  // selectedNode: any
}

export interface PropertiesEditorDrawerRef {
  // selectedNode: any

  open: (selectedNode:any)=>any
}

const __PropertiesEditorDrawer = (props: PropertiesEditorDrawerProps, ref: Ref<PropertiesEditorDrawerRef>) => {
  const [open, setOpen] = useState(false);


  const onOpen = () => {
    setOpen(true);
  };


  const onClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, ()=>{
    return {
      open: ()=>{
        console.log('openepe')
        onOpen()
      }
    }
  })

  return (
    <Drawer
      title="Drawer with extra actions"
      placement={'right'}
      width={500}
      mask={false}
      onClose={onClose}
      visible={open}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )

}


export const PropertiesEditorDrawer = forwardRef(__PropertiesEditorDrawer)
