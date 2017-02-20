import { spMongoDB } from 'sp-mongo'
import createRouter from './router'
import Router from 'koa-router'
import File from './File'

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
        this.domain = opt.domain || 'http://localhost:3000/upload/'
        this.collection = opt.collection || '__sp_upload'

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
        this.router = createRouter(this.domain)

        // 配置数据库连接对象和表名
        File.configDAO(this.dao)
        File.configCollection(this.collection)

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
