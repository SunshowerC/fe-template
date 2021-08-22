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

export interface PaginationParams {
  pagination: Required<PaginationDto>
}


/**
 * 补全所有分页参数
 */
export const transToFullPagination = <T extends Record<string, any>>(
  value: T
): T & PaginationParams => {
  // client 传入的值
  const result: any = Object.assign({}, value)
  let {
    pageSize, limit, 
    current, page, pageId, pages, 
    offset
  } = result 

  // 
  pageSize = pageSize || limit || 10
  current = current || page || pageId || pages || 1
  offset = offset || (current - 1) * pageSize || 0

  let pagination: Required<PaginationDto> = {
    pageSize : pageSize,
    limit : pageSize,
    take : pageSize,

    current : current,
    page : current,
    pages : current,
    pageId : current,

    offset : offset,
    skip : offset,
  }
  

  return {
    ...result,
    pagination
  }
}
@Injectable()
export class PaginationPipe<T extends PaginationDto> implements PipeTransform<T> {
  transform(value: T) {
    return transToFullPagination(value)
  }
}
