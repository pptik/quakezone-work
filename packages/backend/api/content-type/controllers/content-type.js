'use strict';

const util = require('util');
// const { exec } = require('child_process');
const spawn = require('await-spawn');

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

    // console.log('contentTypes:', contentTypes);
    // console.log('schema.attributes:', contentTypes[0].schema.attributes);
    ctx.body = contentTypes;

    // ctx.send([{id: 'sometest'}]);
  },

  /**
   * See: node_modules/strapi-plugin-content-manager/controllers/ContentTypes.js
   * @param {*} ctx 
   */
  async createDynamic(ctx) {
    // kind: 'collectionType'
    // const { kind } = ctx.query;

    // try {
    //   await validateKind(kind);
    // } catch (error) {
    //   return ctx.send({ error }, 400);
    // }

    // const service = strapi.plugins['content-manager'].services.contenttypes;

    // const contentTypes = Object.keys(strapi.contentTypes)
    //   // .filter(uid => {
    //   //   if (uid.startsWith('strapi::')) return false;

    //   //   return !(kind && _.get(strapi.contentTypes[uid], 'kind', 'collectionType') !== kind);
    //   // })
    //   .map(uid => {
    //     return service.formatContentType(strapi.contentTypes[uid]);
    //   });

    // console.log('contentTypes:', contentTypes);
    // console.log('schema.attributes:', contentTypes[0].schema.attributes);
    // ctx.body = contentTypes;

    // ctx.send([{id: 'sometest'}]);
    // const execAsync = util.promisify(exec);
    
    /**
     * 
     * @param {StrapiContentTypeInput} data Contains `name`.
     */
    async function yarnStrapiGenerateApi(data) {
      console.debug('yarnStrapiGenerateApi', data);
      if (!data.name) {
        throw new Error('name is required');
      }
      const strapiFolder = `${__dirname}/../../..`;
      console.info('Spawning', 'yarn', ['strapi', 'generate:api', data.name], 'in', strapiFolder, '...');
      try {
        const res = await spawn('yarn', ['strapi', 'generate:api', data.name], {cwd: strapiFolder});
        // const { stdout, stderr } = await execAsync('yarn strapi generate:api', {cwd: strapiFolder, });
        console.log('stdout:', res.toString());
        // console.log('stderr:', stderr);
        return res.toString();
      } catch (e) {
        console.error('yarnStrapiGenerateApi', data.name, e.toString(), e.stderr.toString(), e.stdout.toString());
        throw e;
      }
    }

    console.debug('createDynamic', ctx.request.body);
    const result = await yarnStrapiGenerateApi(ctx.request.body);
    ctx.body = {contentType: {
      uid: JSON.stringify(result)
    }};
  },

};
