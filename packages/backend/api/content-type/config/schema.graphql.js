module.exports = {
  definition: `
    type StrapiSchema {
      modelType: String
      connection: String
      collectionName: String
      kind: String
    }

    type StrapiContentType {
      uid: String!
      name: String!
      apiID: String!
      label: String!
      isDisplay: Boolean
      schema: StrapiSchema
    }

    input StrapiContentTypeInput {
      name: String!
    }
    
    input createContentTypeDynamic {
      data: StrapiContentTypeInput
    }

    type createContentTypeDynamicPayload {
      contentType: StrapiContentType
    }
  `,
  query: `
    contentTypesDynamic: [StrapiContentType!]
  `,
  mutation: `
    createContentTypeDynamic(input: createContentTypeDynamic): createContentTypeDynamicPayload
  `,
  type: {
    StrapiContentType: {
      _description: 'Strapi content type',
    },
    StrapiContentTypeInput: {
      _description: 'Data needed for mutating content type',
    },
    createContentTypeDynamicInput: {
      _description: 'Input when creating content type',
    },
    createContentTypeDynamicPayload: {
      _description: 'Payload after creating content type',
    }
  },
  resolver: {
    Query: {
      contentTypesDynamic: {
        description: 'Return Strapi content types',
        resolver: 'application::content-type.content-type.findDynamic',
      }
    },
    Mutation: {
      createContentTypeDynamic: {
        description: 'Create a new Strapi content type',
        resolver: 'application::content-type.content-type.createDynamic',
      }
    }
  },
};
