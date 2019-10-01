import { Schema, model } from 'mongoose'

// keep them in one schema
// https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/
const listItemSchema = new Schema(
  {
    title: { type: String, required: true, default: '[list item]' },
    done: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

const listSchema = new Schema(
  {
    title: { type: String, required: true, default: '[list title]' },
    items: [listItemSchema],
  },
  { timestamps: true }
)

export const ListItemModel = model('ListItem', listItemSchema)

export const ListModel = model('List', listSchema)
// export default List
