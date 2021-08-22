import { DynamicModule, Module } from "@nestjs/common";
import fs from 'fs'
import { appLogger } from "src/services/logger/app-logger.service";

console.log('dir', __dirname)
 

function getFiles (dir: string, files_?: string[]){
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
      var name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()){
          getFiles(name, files_);
      } else {
          files_.push(name);
      }
  }
  return files_;
}

@Module({})
export class AutoModule {
  static register(opt: {
    modulesPath: string,
    excludes?: string[] 
  }) {
    let files = getFiles(opt.modulesPath)
    const moduleFiles = files.filter(path => path.endsWith('.module.js'))

    const moduleObjList: any[] = []

    moduleFiles.forEach(item => {
      let curModule = require(item)

      const list = Object.entries(curModule).map(([k, v]) => {
        if(typeof v === 'function' && v.name.endsWith('Module')) {
          return v
        }
      }).filter(Boolean)
      
      moduleObjList.push(...list)
    })

    appLogger.info('auto inject modules', {
      modules: moduleObjList.map(item => item.name)
    })

    const nestModules = moduleObjList.map(item => {
      return {
        module: item
      }
    })

    return  nestModules;
  }

  
}