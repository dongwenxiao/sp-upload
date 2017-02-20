import Model from 'sp-model'

export default class Role extends Model {

    constructor({ url, originalFilename, filename, encoding, mimeType, folder }) {
        super()

        this.url = url
        this.originalFilename = originalFilename
        this.filename = filename
        this.encoding = encoding
        this.mimeType = mimeType
        this.folder = folder
    }
}