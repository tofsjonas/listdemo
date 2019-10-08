import { Schema, model } from 'mongoose'

// keep them in one schema
// https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/
const listItemSchema = new Schema(
  {
    title: { type: String, required: true, default: 'todo item' },
    done: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

const listSchema = new Schema(
  {
    title: { type: String, required: true, default: 'todo list' },
    items: [listItemSchema],
  },
  { timestamps: true }
)

export const ListItemModel = model('ListItem', listItemSchema)

export const ListModel = model('List', listSchema)
// export default List

// custom ids, fast då kan man lika gärna lägga till ett "key"-fält, så slipper man mucka med mongoose
// var Post = new mongoose.Schema({
//   _id: Number,
//   title: String,
//   content: String,
//   tags: [ String ]
// }, { _id: false });
