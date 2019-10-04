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
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        lists: action.payload,
      }
    }
    case 'CREATE_LIST': {
      return {
        ...state,
        lists: [action.payload, ...state.lists],
      }
    }
    case 'UPDATE_LIST': {
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
    }
    case 'DELETE_LIST': {
      var { list } = action.payload
      // didn't think you could insta-edit state...
      state.lists = state.lists.filter(mlist => {
        return mlist._id !== list._id
      })
      return {
        ...state,
      }
    }
    case 'ADD_LIST_ITEM': {
      var { list, item } = action.payload
      // didn't think you could insta-edit state
      state.lists.map(mlist => {
        if (mlist._id === list._id) {
          mlist.items.push(item)
        }
        return mlist
      })
      return {
        ...state,
      }
    }
    case 'UPDATE_LIST_ITEM': {
      var { listId, item } = action.payload
      state.lists.map(mlist => {
        if (mlist._id === listId) {
          mlist.items = mlist.items.map(mitem => {
            if (mitem._id === item._id) {
              return item
            }
            return mitem
          })
        }
        return mlist
      })
      return {
        ...state,
      }
    }
    case 'DELETE_LIST_ITEM': {
      var { listId, itemId } = action.payload
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
    }
    default:
      return state
  }
}
