# fe-template
common fe template


## 项目

### nestjs@8
- [ ] 日志规范
  - [x] http context 
  - [x] incoming req / outgoing req & resp 
  - [x] sql 查询语句以及响应耗时 
  - [ ] grpc 请求 incoming/ outgoing 
- typeorm 
- [ ]  抛出 http 错误的规范：nonlive 环境异常信息尽可能详尽，带 stack 。
  - 【**被动异常**】代码异常信息不应该被用户知晓。统一响应 error_code = -1 + error_msg server error （例如 xxx undefined ，duplicated record）
  - 【**主动捕获的异常**】业务捕获抛出异常，
    1. 可以被用户知晓具体原因的，返回 error code + 具体的 error msg 。 前端 notify error_msg
    2. 不能给用户知晓原因的，返回 error code。 前端 notify xxx failed ?
  - 上游接口异常 被捕获到的。
- [x] 请求数据，响应数据的 camel case 、 snakeCase 格式化
- [x] sql 响应数据的 camel case 、 snakeCase 格式化 【nestjs】
- [x] nestjs 自动查询 *.module.ts 文件，自动注入，避免手动加载
- [ ] 接口目录自动读取自动按规则注册接口
- 单元测试，集成测试


基础系统管理功能
- [ ] RBAC 权限管理
- [ ] 系统接口访问日志与记录
- [ ] open api 自动配置
- [ ] 

### react ant-pro
