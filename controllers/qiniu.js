'use strict';


const config = require('../configs/config.local')
const qiniu = require('qiniu')

module.exports = {
    async getToken(req, res) {
        const accessKey = config.qiniu.accessKey;
        const secretKey = config.qiniu.secretKey;

        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: config.qiniu.bucket,
            expires: config.qiniu.expires,
            mimeLimit: 'image/*',
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","fname":"$(fname)"}',
        };
        const putPoliy = new qiniu.rs.PutPolicy(options);
        const token = putPoliy.uploadToken(mac);

        res.send({ token });
    }
}