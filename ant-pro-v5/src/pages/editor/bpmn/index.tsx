

// APP.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card } from 'antd'


import { xmlstr } from './testxml';
// import './App.css';
// mian.js

// import './index.css';

// import App from './App';

// 以下为bpmn工作流绘图工具的样式
// import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

// import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import { PageContainer } from '@ant-design/pro-layout';
import { PropertiesEditorDrawerRef, PropertiesEditorDrawer, PropertyFormObj} from './components/PropertiesEditorDrawer';
import { useBpmn } from './hooks/useBpmn';
import { transWithoutPrefix } from './utils';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { ProcessSettingModalForm } from './components/ProcessSettingModalForm';


// 全局组件
function App() {

  // let bpmnModeler: BpmnModeler;
  // let [bpmnModeler, setModeler] = useState<BpmnModeler>(null)
  // let [curXml, setCurXml] = useState<string>()

  let drawerRef = useRef<PropertiesEditorDrawerRef>(null)
  const {
    initBpmn,
    bpmnModeler,
    curXml,
    onUpdateProperties,
    selectedElem,
  } = useBpmn({
    xml: xmlstr,
    onElementClick({
      eventType,
      element
    }) {
      const attr = transWithoutPrefix(element?.businessObject?.$attrs)
      const formVal:PropertyFormObj = {
        type: element?.businessObject?.$type,
        // 内置属性
        name: element?.businessObject?.name,
        // taskName: element.
        // 自定义属性 element.businessObject.$attrs.customText
        taskDesc: attr.taskDesc,
        implement: attr.implement
      } 
      

      console.log("element.businessObject", element.businessObject)
      drawerRef.current?.open(formVal)
      console.log('on element click', {
        eventType, 
      })
    }
  })

  
  useEffect(() => {

    initBpmn();
  }, [])


  const onSubmit = async (val)=>{
    onUpdateProperties(selectedElem, val)
  }

  const createBpmnProcess =  async (processForm) => {
    // processForm.name
    // bpmn: curXml
    console.log('create bpmn proces', {
      bpmnDefinition: curXml,
      ...processForm
    })
  }


  console.log('curXml', curXml)
  return (
    <PageContainer content="bpmn 流程">
      <Card title="编辑器" className='bpmn-card' extra={[
        <ProcessSettingModalForm onSubmit={createBpmnProcess} />,
        <Button type="primary">保存</Button>
      ]}>
        <div className='bpmn-container'>
          {/* bpmn容器 */}
          <div id="canvas" className="canvas-container"></div>
          {/* <div className="properties-panel"></div> */}
        </div>

      </Card>

      <PropertiesEditorDrawer ref={drawerRef} onSubmit={onSubmit} ></PropertiesEditorDrawer>
    </PageContainer>
  );
}

export default App;
