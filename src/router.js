import Router from 'koa-router'

const multer = require('koa-multer')
const moment = require('moment')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

const FILE_SAVE_PATH = process.cwd() + '/src/server/public/upload'
const FILE_BASE_URL = 'http://localhost:3000/upload/'



var storage = multer.diskStorage({
    destination: function(req, file, cb) {

        let dir = FILE_SAVE_PATH
        const tag = req.body.tag

        // 如果有子目录
        if (tag) {
            dir += `/${tag}/`
        }

        if (!fs.existsSync(dir)) {
            mkdirp(dir, function(err) {
                if (err) console.error(err)
                else cb(null, dir)
            })

        } else {
            cb(null, dir)
        }
    },

    filename: function(req, file, cb) {

        const ext = path.extname(file.originalname)
        const filename = md5(moment().format('YYYY.MM.DD.HH.mm.ss.SSS') + Math.random()) + ext
        const tag = req.body.tag || ''
        const url = tag ? FILE_BASE_URL + `${tag}/` + filename : FILE_BASE_URL + filename

        req.handleResult = {
            url,
            originalFilename: file.originalname,
            filename: filename,
            encoding: file.encoding,
            mimeType: file.mimetype,
            tag
        }

        cb(null, filename)


    }
})
const upload = multer({ storage: storage })


/**
 * 创建upload相关路由
 *
 * @export
 * @returns
 */
export default function createRouter() {

    const router = new Router()

    return router
        .get('/file', async(ctx) => {
            ctx.body = `
                Use post method for upload file,  input name is "file". <br>
                Url: /upload/file<br>
                Method: post<br>
                Param: tag[folder], file[file]
            `
        })
        .post('/file', upload.single('file'), async(ctx) => {

            // 参数
            // - file 上传的文件流字段
            // - [tag] 上传文件指定放的文件夹名

            // 返回
            // - url 文件外网访问的URL
            // - originalFilename 原文件名
            // - filename 现在文件名
            // - encoding 编码
            // - mimeType mime类型
            // - tag 指定子文件夹
            ctx.body = ctx.req.handleResult
        })
}