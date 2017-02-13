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

        // console.log(req)
        // console.log(req.body.tag)

        let dir = FILE_SAVE_PATH

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

        req.handleResult = {
            url: FILE_BASE_URL + filename,
            originalFilename: file.originalname,
            filename: filename,
            encoding: file.encoding,
            mimeType: file.mimetype
        }

        // console.log(req.handleResult)

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
            ctx.body = 'Use post method for upload file,  input name is "file"'
        })
        .post('/file', upload.single('file'), async(ctx) => {
            ctx.body = ctx.req.handleResult
        })
}