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

const collectionSchema = new Schema({
    userId: { type: ObjectId, required: true, ref: 'User'},
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    pics: { type: [String] },
    resultImage: { type: String },
    state: { type: Number },
}, { timestamps: true })

// 创建虚拟文档属性状态描述, 方便前端显示
collectionSchema.virtual('statusDesc').get(() => stateMap.get(this.state) || '未知')

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection