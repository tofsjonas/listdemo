export const listReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isSaving: false,
        loadError: false,
        saveError: false,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        lists: action.payload,
        isLoading: false,
        isSaving: false,
        loadError: false,
        saveError: false,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        loadError: action.payload,
        saveError: false,
      }
    case 'CREATE_LIST':
      return {
        ...state,
        lists: [...state.lists, action.payload],
        isLoading: false,
        isSaving: true,
        loadError: false,
        saveError: false,
      }
    case 'UPDATE_LIST_NAME':
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        loadError: false,
        saveError: false,
      }
    case 'NEW_LIST_ITEM':
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        loadError: false,
        saveError: false,
      }
    case 'UPDATE_LIST_ITEM_NAME':
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        loadError: false,
        saveError: false,
      }
    case 'TOGGLE_LIST_ITEM_DONE':
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        loadError: false,
        saveError: false,
      }
    case 'DELETE_LIST_ITEM':
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        loadError: false,
        saveError: false,
      }
    default:
      return state
  }
}
