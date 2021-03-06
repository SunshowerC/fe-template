

export const sleep = (millSecond: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millSecond)
  })
}



/**
 * 移除一个对象 Boolean(val) === false 的值
 * @param obj - 入参
 * @param excludes - 视为 有效的值
 */
export const removeFalseLikeKey = <T = any>(obj: T, excludes: any[] = []):T => {
  for (const k in obj) {
    if (!obj[k] && !excludes.includes(obj[k])) {
      delete obj[k]
    }
  }

  return obj
}