const dbConfig = require('../database/db-config');
const {nanoid} = require('nanoid')

const shortUrlSchema = new dbConfig.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: () => nanoid()
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = dbConfig.model('ShortUrl', shortUrlSchema)
