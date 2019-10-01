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
    case 'FETCH_FAILURE':
      return {
        ...state,
      }
    case 'CREATE_LIST':
      return {
        ...state,
        lists: [...state.lists, action.payload],
      }
    case 'UPDATE_LIST_NAME':
      return {
        ...state,
      }
    case 'ADD_LIST_ITEM':
      const { list, item } = action.payload
      // const pelle = {
      //   ...state,
      //   lists: [
      //     state.lists.map(mlist => {
      //       // console.log('SPACETAG: listReducer.js', mlist)
      //       if (mlist._id === list._id) {
      //         mlist.items.push(item)
      //       }
      //       return mlist
      //     }),
      //   ],
      // }
      // didn't think you could insta-edit
      state.lists.map(mlist => {
        // console.log('SPACETAG: listReducer.js', mlist)
        if (mlist._id === list._id) {
          mlist.items.push(item)
        }
        return mlist
      })
      return {
        ...state,
      }
    case 'UPDATE_LIST_ITEM_NAME':
      return {
        ...state,
      }
    case 'TOGGLE_LIST_ITEM_DONE':
      return {
        ...state,
      }
    case 'DELETE_LIST_ITEM':
      return {
        ...state,
      }
    default:
      return state
  }
}
