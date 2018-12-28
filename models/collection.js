const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId; // 兼容v2版本的写法
const ObjectId = Schema.Types.ObjectId;

const stateMap = new Map([
    [1, '待受理'],
    [2, '已受理'],
    [5, '待定'],
    [10, '已完成']
])

// 将数字转换为用0补齐的指定位数的字符串 
const formatNumberToGivenDigit = (num, digit) => {
    num = parseInt(num).toString()
    return num.length >= digit ? num : `${'0'.repeat(digit - num.length)}${num}`
}

// 生成年月日时分秒的id串
const generateCollectionId = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const milliseconds = date.getMilliseconds()
    const n = [year, month, day, hour, minute, second]
        .map((e) => formatNumberToGivenDigit(e, 2))
        .join('') + [milliseconds]
        .map((e) => formatNumberToGivenDigit(e, 4))
        .join('')
    return n
}
const collectionSchema = new Schema({
    id: { type: String, required: true, default: generateCollectionId },
    user: { type: ObjectId, required: true, ref: 'Loong.User' },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    pics: { type: [String], default: [] },
    resultImage: { type: String, default: '' },
    state: { type: Number, default: 1 },
}, { timestamps: true, toJSON: { virtuals: true } })

// 创建虚拟文档属性状态描述, 方便前端显示
collectionSchema.virtual('stateDesc').get(function() {
    return stateMap.get(this.state) || '未知'
})

collectionSchema.virtual('thumb').get(function() {
    return this.pics[0] || ''
})
const Collection = mongoose.model('Loong.Collection', collectionSchema)

module.exports = Collection