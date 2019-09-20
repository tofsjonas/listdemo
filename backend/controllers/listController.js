import listModel from '../models/listModel'

export const createList = async ({ name }) => {
  let promise = new Promise((resolve, reject) => {
    var list = new listModel({ name })
    list.save((err, list) => {
      if (err) reject(err)
      resolve(list)
    })
  })
  let result = await promise
  return result
}
export const getAllLists = async () => {
  let promise = new Promise((resolve, reject) => {
    listModel.find((err, list) => {
      if (err) reject(err)
      resolve(list)
    })
  })
  let result = await promise
  return result
}

export const getList = async ({ list_id }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOne({ _id: list_id }, (err, list) => {
      if (err) reject(err)
      resolve(list)
    })
  })
  let result = await promise
  return result
}
export const updateListName = async ({ list_id, name }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOneAndUpdate({ _id: list_id }, { name }, { new: true }, (err, list) => {
      if (err) reject(err)
      resolve(list)
    })
  })
  let result = await promise
  return result
}
export const deleteList = async ({ list_id }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findByIdAndDelete(list_id, (err, list) => {
      if (err) reject(err)
      resolve('DELETE LIST OK')
    })
  })
  let result = await promise
  return result
}
export const addListItem = async ({ list_id, data }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findById(list_id, (err, list) => {
      if (err) reject(err)
      list.items.push(data)
      list.save((err, list) => {
        if (err) reject(err)
        const items = list.items
        resolve(items[items.length - 1])
      })
    })
  })
  let result = await promise
  return result
}
export const updateListItemName = async ({ list_id, item_id, name }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOneAndUpdate({ _id: list_id, 'items._id': item_id }, { 'items.$.name': name }, { new: true }, (err, list) => {
      if (err) reject(err)
      const item = list.items.id(item_id)
      resolve(item)
    })
  })
  let result = await promise
  return result
}
export const toggleListItem = async ({ list_id, item_id }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOne({ _id: list_id }, (err, list) => {
      if (err) reject(err)
      const newVal = !list.items.id(item_id).done
      list.items.id(item_id).done = !list.items.id(item_id).done
      list.save()
      resolve(list.items.id(item_id))
    })

    // just cant get xor to work
    // listModel.findOneAndUpdate(
    //   { _id: list_id, 'items._id': item_id },
    //   {
    //     $bit: {
    //       // ['items.$.done']: { xor: 1 },
    //       'items.$.done': { xor: 1 },
    //     },
    //   },
  })
  let result = await promise
  return result
}
export const deleteListItem = async ({ list_id, item_id }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOneAndUpdate({ _id: list_id }, { $pull: { items: { _id: item_id } } }, (err, res) => {
      if (err) reject(err)
      resolve('DELETE LIST ITEM OK')
    })
  })
  let result = await promise
  return result
}
