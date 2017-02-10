import { spMongoDB } from 'sp-mongo'
import createRouter from './router'
import Router from 'koa-router'

export default class spUpload {

    /**
     * Creates an instance of ApiFactory.
     *
     * @param {any} opt {ip: '', port: '', db: '', prefix: ''} 连接mongodb需要的信息
     * @param {any} router 包含 .use() 方法的对象
     *
     * @memberOf ApiFactory
     */
    constructor(opt, router, middleware) {

        // 维护当前的路由列表
        this.collections = []

        // mongodb 数据库连接信息
        this.ip = opt.ip
        this.port = opt.port
        this.db = opt.db

        // 所有接口URL前缀
        this.urlPrefix = opt.prefix || '/upload'

        // koa 路由，主要使用 .use() 挂载
        this.rootRouter = router

        // koa 中间件挂载
        this.rootMiddleware = middleware

        this.init()
    }

    init() {


        // 实例化数据库连接对象
        this.dao = new spMongoDB({ ip: this.ip, port: this.port, db: this.db })

        // 当前auth路由
        this.router = createRouter()

        // handbars 模板注册
        // const views = require('koa-views')
        // this.rootMiddleware.use(views(__dirname + '/server/views', {
        //     extension: 'ejs',
        //     map: {
        //         hbs: 'ejs'
        //     }
        // }))
    }

    /**
     * 挂载到主路由上
     *
     * @memberOf ApiFactory
     */
    mount() {

        // 挂载prefix路由

        const uploadRouter = new Router()
        uploadRouter.use(this.urlPrefix, this.router.routes(), this.router.allowedMethods())
        this.rootRouter.use(uploadRouter)

        // 挂载权限校验中间件

        // const rootRouter = this.rootRouter.root
        // const authMiddleware = authMiddlewareCreate(rootRouter)
        // this.rootMiddleware.use(authMiddleware)

    }


    response(code, data, msg, type = 'json') {
        if (type === 'json') {
            return {
                code,
                data,
                msg
            }
        }
    }
}
