import { useCallback, useState } from "react";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import minimapModule from "diagram-js-minimap";
import * as BpmnJsPanel from 'bpmn-js-properties-panel';
import { BpmnElement } from "../bpmn.type";
import { transWithPrefix } from "../utils";
import NestModule from '../custom/nest.json'

export interface UseBpmnProps {
  xml: string 

  onElementClick?: (...args: any[])=>any
}

const PROPERTY_PREFIX = `NEST:`


export const useBpmn = (props: UseBpmnProps)=> {
  const {onElementClick, xml} = props
  let bpmnModeler: any;
  let [modeling, setModeling] = useState<any>()
  let [curXml, setCurXml] = useState<string>(xml)
  const [selectedElem, setSelectedElem] = useState<BpmnElement>()

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
      // propertiesPanel: {
      //   parent: '.properties-panel'
      // },
      additionalModules: [
        // 左边工具栏以及节点
        BpmnPropertiesPanelModule, // 这里引入的是右侧属性栏这个框
        BpmnPropertiesProviderModule, // // 而这个引入的是右侧属性栏里的内容
        minimapModule, // 右上角缩略图
      ],
      moddleExtensions: {
        nest: NestModule,
        //如果要在属性面板中维护camunda：XXX属性，则需要此 
        // camunda: camundaModdleDescriptor
      }
    });
    // setModeler(curBpmnModeler)
    bpmnModeler = curBpmnModeler
    // modeling = bpmnModeler.get('modeling')
    setModeling(bpmnModeler.get('modeling'))
    
    // 渲染 bpmn 图
    await createBpmnDiagram();

    addBpmnListener()
  }, [])

  const createBpmnDiagram = useCallback(async () => {
    // 开始绘制出事bpmn的图
    try {
      const result = await bpmnModeler.importXML(curXml);
      var canvas = bpmnModeler.get('canvas')
      canvas.zoom('fit-viewport')

      console.log(result);
      console.log('属性面板数据: ', bpmnModeler.get('propertiesPanel'));
    } catch (error) {
      console.error(error)
    }
  }, [bpmnModeler, curXml])

  // 绑定事件
  const addBpmnListener = () => {
    // 给图绑定事件，当图有发生改变就会触发这个事件
    bpmnModeler.on('commandStack.changed', async () => {
      // 加载出当前的 xml 
      const xmlRes = await bpmnModeler.saveXML({ format: true })
      console.log('commandStack.changed')
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
    // const modeling = bpmnModeler.get('modeling')

    eventTypes.forEach(function (eventType) {
      eventBus.on(eventType, function (e) {
        if (!e || e.element.type == 'bpmn:Process') return // 这里我的根元素是bpmn:Process
      	

        // 读取节点 xml 属性
        const properties = e.element.businessObject
        // console.log(`${eventType}`,{e, properties})
        if(eventType === 'element.click') {
          setSelectedElem(e.element)

          onElementClick?.({
            eventType,
            element: e.element
          })
          // drawerRef.current?.open({})

          // modeling.updateProperties(e.element, {
          //   name: '我是修改后的Task名称', // 在 e.element.businessObject.name 
          //   customText: '我是自定义的text属性' // 自定义的属性在 e.element.businessObject.$attrs.customText
          // })
        }
      })
    })
  }


  // 更新节点参数
  const onUpdateProperties = useCallback((element, values:any)=>{
    if(!modeling) {
      throw new Error('unknown modeling')
    }

    const formValWithPrefix = transWithPrefix(values)
    
    modeling.updateProperties(element, {
      ...formValWithPrefix
      // name: '我是修改后的Task名称', // 在 e.element.businessObject.name 
      // customText: '我是自定义的text属性' // 自定义的属性在 e.element.businessObject.$attrs.customText
    })
  }, [modeling]) 


  return {
    curXml,
    onUpdateProperties,
    initBpmn,
    // modeling,
    bpmnModeler,
    selectedElem,
  }

}