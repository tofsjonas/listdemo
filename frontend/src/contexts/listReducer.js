/**
 * 
  maybe more useful in a different scenario...
  isLoading: true,
  isSaving: false,
  loadError: false,
  saveError: false,
 */

export const listReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        lists: action.payload,
      }
    // case 'FETCH_FAILURE':
    //   return {
    //     ...state,
    //   }
    case 'CREATE_LIST':
      return {
        ...state,
        lists: [...state.lists, action.payload],
      }
    case 'UPDATE_LIST':
      var { list, item } = action.payload
      // didn't think you could insta-edit
      state.lists.map(mlist => {
        if (mlist._id === list._id) {
          return { ...mlist, ...list }
        }
        return mlist
      })
      return {
        ...state,
      }
    case 'ADD_LIST_ITEM':
      var { list, item } = action.payload
      // didn't think you could insta-edit
      state.lists.map(mlist => {
        if (mlist._id === list._id) {
          mlist.items.push(item)
        }
        return mlist
      })
      return {
        ...state,
      }
    case 'UPDATE_LIST_ITEM':
      return {
        ...state,
      }
    case 'DELETE_LIST_ITEM':
      const { listId, itemId } = action.payload
      state.lists.map(mlist => {
        if (mlist._id === listId) {
          mlist.items = mlist.items.filter(item => {
            return item._id !== itemId
          })
          // mlist.items.push(item)
        }
        return mlist
      })

      return {
        ...state,
      }
    default:
      return state
  }
}
