import { BpmnEngine, BpmnEngineExecutionApi, Engine } from "bpmn-engine";
import { bpmnListener } from "./listener";


interface BpmnNestProps {
  source: string

  services: Record<string, any>
}


export class BpmnNest {

  public engine: BpmnEngine

  constructor(public props: BpmnNestProps) {
    const processName = 'get_from_source'
    const customServiceMap = {
      ...props.services,
    }

    this.engine = Engine({
      source: props.source,
      name: processName,
      listener: bpmnListener,
      services: customServiceMap
    });
  }


  async run(body: any) {
    return new Promise((resolve, reject) => {


      this.engine.execute({
        variables: {
          body
          // reqBody: {
          //   prjId: 776
          // }
        },
      }, (async (err, execution: BpmnEngineExecutionApi) => {
        if (err) throw err;

        const state = await this.engine.getState()
        const [definition] = await this.engine.getDefinitions()
        const processes = definition?.getProcesses();

        const stateList = processes[0].environment.activityState
        const variable = processes[0].environment.variables

        console.log(`response: ${execution.name}`,
          // execution.environment.output
        )
        const output = execution.environment.output

        resolve(output)

      }) as any)

    })

  }
}