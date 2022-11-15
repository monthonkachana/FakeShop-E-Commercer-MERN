export function searchReducer(state = { text: "" }, action) {
  switch (action.type) {
    case "SEARCH_QUERY":
      // ส่งแบบ object ...state
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
