

// APP.js
import { useCallback, useEffect, useState } from 'react';
import { Button, Card } from 'antd'

import BpmnModeler from 'bpmn-js/lib/Modeler';
// import propertiesPanelModule from 'bpmn-js-properties-panel';
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import * as BpmnJsPanel from 'bpmn-js-properties-panel';
// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

// 如果你想使用Camunda BPM来执行相关属性的话, 也得安装一个叫camunda-bpmn-moddle的扩展:
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
// import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
// import 'bpmn-js-properties-panel'
import minimapModule from "diagram-js-minimap";

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


// 全局组件
function App() {

  let bpmnModeler: BpmnModeler;
  // let [bpmnModeler, setModeler] = useState<BpmnModeler>(null)
  let [curXml, setCurXml] = useState<string>()

  
  useEffect(() => {

    initBpmn();
  }, [])

  const initBpmn = useCallback(async () => {
    // 建模，初始化画布
    const {
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
    } = BpmnJsPanel
    const curBpmnModeler = new BpmnModeler({
      container: '#canvas', // 这里为数组的第一个元素
      height: '100%',
      //添加控制板
      propertiesPanel: {
        parent: '.properties-panel'
      },
      additionalModules: [
        // 左边工具栏以及节点
        BpmnPropertiesPanelModule, // 这里引入的是右侧属性栏这个框
        BpmnPropertiesProviderModule, // // 而这个引入的是右侧属性栏里的内容
        minimapModule, // 右上角缩略图
      ],
      moddleExtensions: {
        //如果要在属性面板中维护camunda：XXX属性，则需要此 
        camunda: camundaModdleDescriptor
      }
    });
    // setModeler(curBpmnModeler)
    bpmnModeler = curBpmnModeler

    // 渲染 bpmn 图
    await createBpmnDiagram();

    addBpmnListener()
  }, [])

  const createBpmnDiagram = useCallback(async () => {
    // 开始绘制出事bpmn的图
    try {
      const result = await bpmnModeler.importXML(xmlstr);
      var canvas = bpmnModeler.get('canvas')
      canvas.zoom('fit-viewport')

      console.log(result);
      console.log('属性面板数据: ', bpmnModeler.get('propertiesPanel'));
    } catch (error) {
      console.error(error)
    }
  }, [bpmnModeler])

  // 绑定事件
  const addBpmnListener = () => {
    // 给图绑定事件，当图有发生改变就会触发这个事件
    bpmnModeler.on('commandStack.changed', async () => {
      // 加载出当前的 xml 
      const xmlRes = await bpmnModeler.saveXML({ format: true })
      
      setCurXml(xmlRes.xml)
    })

    // 节点元素变更事件: 新增，删除，连线
    const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 'connect.move']
    events.forEach(function (event) {
      bpmnModeler.on(event, e => {
        console.log(event, e)
        var elementRegistry = bpmnModeler.get('elementRegistry')
        var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
        console.log(`shape[${event}]`, shape)
      })
    })


    // 节点元素点击事件
    const eventBus = bpmnModeler.get('eventBus') // 需要使用eventBus
    const eventTypes = ['element.click', 'element.changed'] // 需要监听的事件集合
    const modeling = bpmnModeler.get('modeling')

    eventTypes.forEach(function (eventType) {
      eventBus.on(eventType, function (e) {
        if (!e || e.element.type == 'bpmn:Process') return // 这里我的根元素是bpmn:Process
      	

        // 读取节点 xml 属性
        const properties = e.element.businessObject
        console.log(`${eventType}`,{e, properties})
        if(eventType === 'element.click') {
          modeling.updateProperties(e.element, {
            name: '我是修改后的Task名称', // 在 e.element.businessObject.name 
            customText: '我是自定义的text属性' // 自定义的属性在 e.element.businessObject.$attrs.customText
          })
        }
      })
    })



  }


  console.log('curXml', curXml)
  return (
    <PageContainer content="bpmn 流程">
      <Card title="编辑器" className='bpmn-card' extra={[
        <Button type="primary">保存</Button>
      ]}>
        <div className='bpmn-container'>
          {/* bpmn容器 */}
          <div id="canvas" className="canvas-container"></div>
          <div className="properties-panel"></div>
        </div>

      </Card>

    </PageContainer>
  );
}

export default App;
