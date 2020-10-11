import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { CreateContentTypeForm } from './CreateContentTypeForm';
import { contentTypesDynamic, contentTypesDynamic_contentTypesDynamic } from './__generated__/contentTypesDynamic';
import { createContentTypeDynamic, createContentTypeDynamicVariables } from './__generated__/createContentTypeDynamic';

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
query contentTypesDynamic {
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
const CREATE_CONTENT_TYPE = gql`
mutation createContentTypeDynamic($name: String!) {
  createContentTypeDynamic(input: {
    data: {
      name: $name
    }
  }) {
    contentType {
      uid
    }
  }
}
`;

export default function ContentTypeList() {
  const client = useApolloClient();
  // const { loading, error, data } = useQuery(CONTENT_TYPES);
  // console.debug('loading=', loading, 'error=', error, 'data=', data);
  const [createContentTypeMutation] = useMutation<createContentTypeDynamic, createContentTypeDynamicVariables>(CREATE_CONTENT_TYPE);
  const actionRef = useRef<ActionType>();

  async function queryRule(params?: TableListParams): Promise<RequestData<contentTypesDynamic_contentTypesDynamic>> {
    console.log('queryRule', params);
    const res = await client.query<contentTypesDynamic>({query: CONTENT_TYPES, fetchPolicy: 'no-cache'});
    if (res.error) {
      console.error(res.errors);
      return {data: [], success: false};
    } else {
      console.debug('contentTypes=', res.data.contentTypesDynamic);
      let data = res.data.contentTypesDynamic!;
      return {data};
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

  async function createContentType(value: createContentTypeDynamicVariables) {
    console.info('createContentType', value);
    try {
      await createContentTypeMutation({
        variables: {name: value.name!}
      });
    } catch (e) {
      console.error('createContentType error:', e);
    }
    // Assumes Strapi will restart
    setCreateModalVisible(false);
    setTimeout(() => {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }, 5000);
}

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const columns: ProColumns<contentTypesDynamic_contentTypesDynamic>[] = [
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
      <ProTable<contentTypesDynamic_contentTypesDynamic>
        headerTitle="Content Type List"
        rowKey="uid"
        columns={columns}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        toolBarRender={() => [
          <Button key="createModal" type="primary" onClick={() => setCreateModalVisible(true)}>
            <PlusOutlined /> New Content Type
          </Button>
        ]}
        actionRef={actionRef}
      />

      <CreateContentTypeForm modalVisible={createModalVisible} onCancel={() => setCreateModalVisible(false)}>
        <ProTable<contentTypesDynamic_contentTypesDynamic, contentTypesDynamic_contentTypesDynamic>
          onSubmit={value => createContentType(value)}
          rowKey="uid"
          type="form"
          columns={columns.filter(_ => _.dataIndex == 'name')}
        />
      </CreateContentTypeForm>
    </PageContainer>
  )
}
