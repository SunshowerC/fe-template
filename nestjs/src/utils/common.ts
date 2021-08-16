

/**
 * 移除一个对象 Boolean(val) === false 的值
 * @param obj - 入参
 * @param excludes - 视为 有效的值
 */
export const removeFalseLikeKey = (obj: object, excludes: any[] = []) => {
  for (const k in obj) {
    if (!obj[k] && !excludes.includes(obj[k])) {
      delete obj[k]
    }
  }

  return obj
}