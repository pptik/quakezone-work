import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ProColumns, RequestData } from '@ant-design/pro-table';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';

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

export const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});


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

export function ContentTypeListInner() {

  const { loading, error, data } = useQuery(CONTENT_TYPES);
  console.debug('loading=', loading, 'error=', error, 'data=', data);

  async function queryRule(params?: TableListParams): Promise<RequestData<ContentType>> {
    console.log('queryRule', params);
    if (loading || error) {
      return {data: []};
    } else {
      return {data: data.contentTypesDynamic};
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
        rowKey="id"
        columns={columns}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        onReset={() => console.log('rset')}
      />
    </PageContainer>
  )
}

export default function ContentTypeList() {
  return (<ApolloProvider client={client}>
    <ContentTypeListInner />
  </ApolloProvider>);
}
