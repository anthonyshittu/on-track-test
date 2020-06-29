const initiateState = {
  page: 0,
  itemsPerPage: 20,
  dataPerPage: {},
  count: 0
}

const books = (state = initiateState, { type, payload }) => {
  switch (type) {
    case 'SET_DATA_PER_PAGE':
      return {
        ...state,
        dataPerPage: {
          ...state.dataPerPage,
          [payload.page]: payload.data.books
        },
        count: payload.data.count
      }
    case 'UPDATE_PAGE':
      return {
        ...state,
        page: payload
      }
    default:
      return state
  }
}

export default books;
