import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout"
import ProTable, { ProColumns, ProTableProps } from "@ant-design/pro-table"
import { Button } from "antd";
import { BpmnDefItem } from "../bpmn.type";


interface ListRequestParams {

}


const BpmnList = () => {




  const columns: ProColumns<BpmnDefItem>[] = [{
    title: '流程名',
    dataIndex: 'bpmnName'
  },{
    title: '流程描述',
    dataIndex: 'bpmnDesc',
    search: false,
    // hideInForm: true,
  },{
    title: '版本',
    dataIndex: 'version',
    search: false,
    // hideInForm: true,
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime'
  }, {
    title: "创建人",
    dataIndex: 'operator',
  }, {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <a
        key="流程详情"
        onClick={() => {
          // handleUpdateModalVisible(true);
          // setCurrentRow(record);
        }}
      >
        流程详情
      </a>,
    ],
  },]


  const requestTableList:ProTableProps<BpmnDefItem, ListRequestParams>['request'] = async (params, sort, filter)=>{
    
    
    return {
      data: [{
        bpmnName: 'bpmnName',
        bpmnDesc: 'bpmnDesc',
        version: 'version',
        createTime: 'createTime',
        operator: 'operator',
      }],
      success: true,
      total: 100,
    }
  }

  return <PageContainer>
    <ProTable
      headerTitle="BPMN 列表"
      rowKey="key"
      search={{
        labelWidth: 120,
      }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            // handleModalVisible(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>,
      ]}
      request={requestTableList}
      columns={columns}
    >

    </ProTable>
  </PageContainer>
}

export default BpmnList