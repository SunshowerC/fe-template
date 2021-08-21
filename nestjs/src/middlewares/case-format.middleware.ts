import { NextFunction } from "express";

import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { isObject } from "class-validator";
import { CaseFormat, CustomFormatKey, REQ_TRANSFORM, RESP_TRANSFORM } from "src/config/data-transform";

const excludeKeys = {
  exclude: [CustomFormatKey]
}

export const CaseFormatMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isJson = req.headers['content-type']?.includes('application/json')

  if(isObject(req.body) && isJson) {
    const formatReqCase = req.body[CustomFormatKey] ?? REQ_TRANSFORM.case
    
    switch (formatReqCase) {
      case CaseFormat.CamelCase: 
        Object.assign(req, {
          body: camelcaseKeys(req.body || {}, excludeKeys)
        })
        break;

      case CaseFormat.SnakeCase: 
        Object.assign(req, {
          body: snakecaseKeys(req.body || {}, excludeKeys)
        })
        break;

      case CaseFormat.NotTransform: 
      default: break;
    }
  }

  try {
    const oldJSON: (...args)=>any = res.json;
    (res as any).json = (data) => {
        // For Async call, handle the promise and then set the data to `oldJson`
        if (data && data.then != undefined) {
            // Resetting json to original to avoid cyclic call.
            
            return data.then((responseData) => {
                // Custom logic/code.
                res.json = oldJSON;
                return oldJSON.call(res, responseData);
                // return oldJSON(responseData)
            }).catch((error) => {
                next(error);
            });
        } else {
          const formatRespCase = data[CustomFormatKey] ?? RESP_TRANSFORM.case

          switch (formatRespCase) {
            case CaseFormat.CamelCase: 
              data = camelcaseKeys(data || {}, excludeKeys)
              break;
      
            case CaseFormat.SnakeCase: 
              data = snakecaseKeys(data || {}, excludeKeys)
              break;
      
            case CaseFormat.NotTransform: 
            default: break;
          }
          
          // For non-async interceptor functions
          // Resetting json to original to avoid cyclic call.
          // Custom logic/code.

          res.json = oldJSON;
          return oldJSON.call(res, data);
        }
      } 
  } catch (error) {
      next(error);
  }


  
  next()
}