

export enum CaseFormat {
  NotTransform = 1,
  CamelCase = 2,
  SnakeCase = 3
}

export const CustomFormatKey = '_CUSTOM_FORMAT_KEY'

export const reqAndRespTransform = {
  req: {
    case: CaseFormat.NotTransform 
  },
  res: {
    case: CaseFormat.NotTransform
  }
}