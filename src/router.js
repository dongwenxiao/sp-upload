import Router from 'koa-router'

/**
 * 创建upload相关路由
 *
 * @export
 * @returns
 */
export default function createRouter() {

    const router = new Router()

    return router
        .get('/test', async(ctx) => {
            ctx.body = 'test'
        })
        .post('/file', async(ctx) => {

        })
}