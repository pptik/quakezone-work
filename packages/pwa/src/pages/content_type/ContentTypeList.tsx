import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ProColumns, RequestData } from '@ant-design/pro-table';

interface ContentType {
  id?: string;
  name?: string;
  title?: string;
  tableName?: string;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export async function queryRule(params?: TableListParams): Promise<RequestData<ContentType>> {
  return {
    data: [
      {
        id: '915298as',
        name: 'contentType',
        title: 'Content Type',
        tableName: undefined,
      }
    ]
  }
}

export default function ContentTypeList() {
  const columns: ProColumns<ContentType>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      tip: 'The name of the content type',
    },
    {
      title: 'Title'      ,
      dataIndex: 'title',
    }
  ];
  return (
    <PageContainer>
      <ProTable<ContentType>
        headerTitle="Content Type List"
        rowKey="id"
        columns={columns}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
      />
    </PageContainer>
  )
}
