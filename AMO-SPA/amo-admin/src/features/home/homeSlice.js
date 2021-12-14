import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  namepage: "Home",
  Params: {
    userId: "abc",
  },
  homesPaging: undefined,
  listChange: false,
};

const homeSlice = createSlice({
  name: "pagename",
  initialState,
  reducers: {
    onChangePageName(state, action) {
      state.namepage = action.payload;
    },
    onParamsChange(state, action) {
      state.Params = action.payload;
    },
    fetchAssignmentsPaging(state, action) {
      state.homesPaging = action.payload;
    },
    onListChange(state) {
      state.listChange = !state.listChange;
    },
  },
});

const { reducer, actions } = homeSlice;
export const {
  onChangePageName,
  onParamsChange,
  fetchAssignmentsPaging,
  onListChange,
} = actions;
export default reducer;
