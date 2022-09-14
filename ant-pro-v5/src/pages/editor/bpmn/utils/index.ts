
const innerKeys = ['name']
const PROPERTY_PREFIX = `NEST:`


export const transWithPrefix = (values: Record<string,any>)=>{
  const formValWithPrefix = Object.keys(values).reduce((result, curKey)=>{
    if(!innerKeys.includes(curKey))  {
      result[PROPERTY_PREFIX + curKey] = values[curKey]
    } else {
      result[curKey] = values[curKey]
    }

    return result
  }, {} as Record<string, any>)

  return formValWithPrefix
}

export const transWithoutPrefix = (values: Record<string,any>)=>{
  if(!values) {
    return values
  }
  const formValWithoutPrefix = Object.keys(values).reduce((result, curKey)=>{
    if(curKey.startsWith(PROPERTY_PREFIX))  {
      const keyWithoutPrefix = curKey.replace(PROPERTY_PREFIX, '')
      result[keyWithoutPrefix] = values[curKey]
    } else {
      result[curKey] = values[curKey]
    }
    return result
  }, {} as Record<string, any>)

  return formValWithoutPrefix
}