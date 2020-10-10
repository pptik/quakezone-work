'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * See: node_modules/strapi-plugin-content-manager/controllers/ContentTypes.js
   * @param {*} ctx 
   */
  async findDynamic(ctx) {
    // kind: 'collectionType'
    // const { kind } = ctx.query;

    // try {
    //   await validateKind(kind);
    // } catch (error) {
    //   return ctx.send({ error }, 400);
    // }

    const service = strapi.plugins['content-manager'].services.contenttypes;

    const contentTypes = Object.keys(strapi.contentTypes)
      // .filter(uid => {
      //   if (uid.startsWith('strapi::')) return false;

      //   return !(kind && _.get(strapi.contentTypes[uid], 'kind', 'collectionType') !== kind);
      // })
      .map(uid => {
        return service.formatContentType(strapi.contentTypes[uid]);
      });

    console.log('contentTypes:', contentTypes);
    console.log('schema.attributes:', contentTypes[0].schema.attributes);
    ctx.body = contentTypes;

    // ctx.send([{id: 'sometest'}]);
  },
};
