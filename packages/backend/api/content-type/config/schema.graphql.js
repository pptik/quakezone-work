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
  `,
  query: `
    contentTypesDynamic: [StrapiContentType]
  `,
  type: {
    StrapiContentType: {
      _description: 'Strapi content type',
    }
  },
  resolver: {
    Query: {
      contentTypesDynamic: {
        description: 'Return Strapi content types',
        resolver: 'application::content-type.content-type.findDynamic',
      }
    },
  },
};
