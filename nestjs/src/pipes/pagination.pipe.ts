// pipe: 对分页参数添加默认值处理

import { PipeTransform, Injectable } from '@nestjs/common'
import { IsOptional, IsInt, Min } from 'class-validator'

/**
 * 列表分页通用请求
 */
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  current?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  pageSize?: number


  @IsOptional()
  @IsInt()
  @Min(0)
  limit?: number
  
  @IsOptional()
  @IsInt()
  @Min(0)
  take?: number
  
  @IsOptional()
  @IsInt()
  @Min(0)
  page?: number
  
  @IsOptional()
  @IsInt()
  @Min(0)
  pages?: number
  
  @IsOptional()
  @IsInt()
  @Min(0)
  pageId?: number
  
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number
  
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number
  
}


/**
 * 补全所有分页参数
 */
export const transToFullPagination = <T extends Record<string, any>>(
  value: T
): Required<PaginationDto> & T => {
  const result: any = Object.assign({}, value)
  const pageSize = result.pageSize || result.limit || 10
  const current = result.current || result.page || result.pageId || result.pages || 1
  const offset = result.offset || (current - 1) * pageSize || 0

  result.pageSize = pageSize
  result.limit = pageSize
  result.take = pageSize

  result.current = current
  result.page = current
  result.pages = current
  result.pageId = current

  result.offset = offset
  result.skip = offset

  return result
}
@Injectable()
export class PaginationPipe<T extends PaginationDto> implements PipeTransform<T> {
  transform(value: T) {
    return transToFullPagination(value)
  }
}
