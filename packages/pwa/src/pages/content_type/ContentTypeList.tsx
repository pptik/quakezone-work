import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ProColumns, RequestData } from '@ant-design/pro-table';
import { gql, useApolloClient, useQuery } from '@apollo/client';

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

const CONTENT_TYPES = gql`
{
  contentTypesDynamic {
    uid
    name
    apiID
    label
    isDisplay
    schema {
      modelType
      connection
      collectionName
      kind
    }
  }
}
`;

export default function ContentTypeList() {
  const client = useApolloClient();
  // const { loading, error, data } = useQuery(CONTENT_TYPES);
  // console.debug('loading=', loading, 'error=', error, 'data=', data);

  async function queryRule(params?: TableListParams): Promise<RequestData<ContentType>> {
    console.log('queryRule', params);
    const res = await client.query({query: CONTENT_TYPES});
    if (res.error) {
      console.error(res.errors);
      return {data: [], success: false};
    } else {
      console.debug('contentTypes=', res.data.contentTypesDynamic);
      return {data: res.data.contentTypesDynamic};
    }
    // return {
    //   data: [
    //     {
    //       id: '915298as',
    //       name: 'contentType',
    //       title: 'Content Type',
    //       tableName: undefined,
    //     }
    //   ]
    // }
  }

  const columns: ProColumns<ContentType>[] = [
    {
      title: 'UID',
      dataIndex: 'uid',
      tip: 'UID to be referenced programmatically',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      tip: 'Display name as given when creating the content type',
    },
    {
      title: 'API ID',
      dataIndex: 'apiID',
      tip: 'ID for  use in REST or GraphQL API',
    },
    {
      title: 'Label',
      dataIndex: 'label',
      tip: 'Plural display name',
    }
  ];
  return (
    <PageContainer>
      <ProTable<ContentType>
        headerTitle="Content Type List"
        rowKey="uid"
        columns={columns}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        onReset={() => console.log('rset')}
      />
    </PageContainer>
  )
}
