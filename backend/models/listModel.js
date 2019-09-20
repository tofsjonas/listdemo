import { Schema, model } from 'mongoose'

// keep them in one schema
// https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/
const listItemSchema = new Schema(
  {
    name: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

const listSchema = new Schema(
  {
    name: { type: String, required: true },
    items: [listItemSchema],
  },
  { timestamps: true }
)
const List = model('List', listSchema)
export default List
