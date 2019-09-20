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

export const addListItem = async ({ _id, data }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOne({ _id }, (err, list) => {
      if (err) reject(err)
      // if (!list) reject(new Error('List not found'))
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
export const toggleListItem = async ({ list_id, item_id }) => {
  // console.log('SPACETAG: listController.js', list_id, item_id)
  let promise = new Promise((resolve, reject) => {
    listModel.findOne({ _id: list_id }, (err, list) => {
      if (err) reject(err)
      const newVal = !list.items.id(item_id).done
      list.items.id(item_id).done = !list.items.id(item_id).done
      list.save()
      resolve(list.items.id(item_id))
    })

    // jsut cant get it to work
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
export const changeListItemName = async ({ list_id, item_id, name }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOneAndUpdate(
      { _id: list_id, 'items._id': item_id },
      { 'items.$.name': name },
      // { $set: { 'items.$.name': name } },
      { new: true },
      (err, list) => {
        if (err) reject(err)
        const item = list.items.id(item_id)
        resolve(item)
      }
    )
  })
  let result = await promise
  return result
}

export const changeListName = async ({ _id, name }) => {
  let promise = new Promise((resolve, reject) => {
    listModel.findOneAndUpdate({ _id }, { name }, { new: true }, (err, list) => {
      if (err) reject(err)
      resolve(list)
    })
  })
  let result = await promise
  return result
}
