# sp-upload
Upload file module for sp-base

## 逻辑

上传文件到指定文件夹，数据表记录上传的文件。

## 使用

```
import { spUpload } from 'sp-upload'

const uploadService = new spUpload(
    Object.assign({ip: '127.0.0.1', port: '23707', db: 'db_name'}, {
        prefix: '/upload',  // api path
        domain: 'http://localhost:3000/upload/',  // publish url
        collection: 'my_collection_name' // custom collection name
    }),
    serverRouter,
    serverMiddleware
)
uploadService.mount()
```

## 接口

```
// 请求

url: /upload/file
type: form-data
param: file,[folder]
```

```
// 返回值

{
  "code": 200,
  "data": {
    "url": "http://localhost:3000/upload/b868c07f01b976b0fe5fb31a8f915586.jpg",
    "originalFilename": "body.jpg",
    "filename": "b868c07f01b976b0fe5fb31a8f915586.jpg",
    "encoding": "7bit",
    "mimeType": "image/jpeg",
    "folder": "",
    "_id": "58aa850fcc537a39e6450477"
  },
  "msg": "上传成功"
}
```