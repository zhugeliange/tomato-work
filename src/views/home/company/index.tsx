/**
 * 公司单位
 */
import React, { useEffect, useRef } from 'react'
import useKeepState from 'use-keep-state'
import Table from '@/components/table'
import CreateCompanyModal from './CreateCompanyModal'
import { serviceGetAllCompany, serviceDelCompany } from '@/services'
import { Button, Popconfirm } from 'antd'
import { fromNow } from '@/utils'

interface State {
  showCreateCompanyModal: boolean
  detail: { [key: string]: any }
}

const initialState: State = {
  showCreateCompanyModal: false,
  detail: {}
}

const CompanyPage = () => {
  const [state, setState] = useKeepState(initialState)
  const tableRef = useRef<any>()
  const tableColumns = [
    {
      title: '单位名称',
      dataIndex: 'companyName',
      width: 170
    },
    {
      title: '入职日期',
      dataIndex: 'startDate',
      width: 130
    },
    {
      title: '离职日期',
      dataIndex: 'endDate',
      width: 130,
      render: (endDate: string|null) => endDate ?? '至今'
    },
    {
      title: '在职天数',
      dataIndex: 'id',
      width: 100,
      render: (_: unknown, record: any) =>
        fromNow(record.startDate, record.endDate) + ' 天'
    },
    {
      title: '薪资',
      dataIndex: 'amount',
      render: (amount: string) => `￥${amount}`
    },
    {
      title: '备注',
      dataIndex: 'remark',
      className: 'wbba'
    },
    {
      title: '操作',
      width: 170,
      align: 'right',
      fixed: 'right',
      render: (record: any) => (
        <>
          <Button onClick={() => handleEditCompany(record)}>编辑</Button>
          <Popconfirm
            title="您确定要删除吗？"
            onConfirm={() => handleDelCompany(record)}
            placement="bottomLeft"
            okType="danger"
          >
            <Button>删除</Button>
          </Popconfirm>
        </>
      )
    }
  ]

  function handleEditCompany(record: any) {
    setState({ detail: record })
    toggleCreateCompanyModal()
  }

  async function handleDelCompany(record: any) {
    await serviceDelCompany(record.id)
    tableRef.current.getTableData()
  }

  function getAllCompany() {
    return serviceGetAllCompany()
  }

  function toggleCreateCompanyModal() {
    setState({ showCreateCompanyModal: !state.showCreateCompanyModal })
  }

  const handleSuccess = function() {
    toggleCreateCompanyModal()
    tableRef.current.getTableData()
  }

  useEffect(() => {
    tableRef?.current?.getTableData()
  }, [])

  return (
    <div className="company">
      <Table
        ref={tableRef}
        getTableData={getAllCompany}
        columns={tableColumns}
        onDelete={serviceDelCompany}
        onAdd={() => setState({
          showCreateCompanyModal: true,
          detail: {}
        })}
      />

      <CreateCompanyModal
        visible={state.showCreateCompanyModal}
        onSuccess={handleSuccess}
        onCancel={toggleCreateCompanyModal}
        detail={state.detail}
      />
    </div>
  )
}

export default CompanyPage
