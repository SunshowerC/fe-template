import { BpmnEngineExecutionApi } from "bpmn-engine"
import EventEmitter from "events"




const listener = new EventEmitter()


// 记录节点开始
listener.on('activity.start', (...args)=>{
  const [elementApi, exection] = args as [any, BpmnEngineExecutionApi]
  // console.log('s')
  const {name: eleName, type, inbound, } = elementApi.content
  const environment = elementApi.environment
  const curInputData = inbound?.reduce((inBoundResult, item) => {
    if(!environment.output._activityState?.[item.sourceId]?.output) {
      return inBoundResult
    }
    inBoundResult.push({
      id: item.sourceId,
      data: environment.output._activityState?.[item.sourceId]?.output
    })
    return inBoundResult
  }, [])

  environment.output._activityState = environment.output._activityState || {}
  environment.output._activityState[elementApi.id] = {
    id: elementApi.id,
    name: eleName,
    // order: order++,
    startAt: new Date(),
    input: curInputData,
    type
    // output: api.content.output
  }
})


// 记录节点结束与结果
listener.on('activity.end', (...args)=>{
  const [elementApi, exection] = args as [any, BpmnEngineExecutionApi]
  const environment = elementApi.environment

  environment.output._activityState[elementApi.id]['output'] = elementApi.content.output?.[0]
  environment.output._activityState[elementApi.id]['endAt'] = new Date()
})


// 遇到 user taks 会进入 wait 状态
// 需要外部动作触发，才会进入下一阶段
// TODO: 等待超时情况下，读取状态存入数据库，不保留在内存
// listener.on('wait', async (elementApi) => {
//   const state = await engine.getState()
//   // fs.writeFileSync('./tmp/userTask.json', JSON.stringify(state, null, 2));
//   console.log('fck')
// });


export const bpmnListener = listener