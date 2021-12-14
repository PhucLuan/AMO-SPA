import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  namepage: "ManageAsset",
  params: {
    State: "",
    Category: "",
    KeySearch: "",
    OrderProperty: "",
    Desc: true,
  },
  listChange: false,
};

const manageassetSlice = createSlice({
  name: "pagename",
  initialState,
  reducers: {
    onChangePageName(state, action) {
      state.namepage = action.payload;
    },
    onChangeParam(state, action) {
      state.params = action.payload;
    },
    onListChange(state) {
      state.listChange = !state.listChange;
    },
  },
});

const { reducer, actions } = manageassetSlice;
export const { onChangePageName, onChangeParam, onListChange } = actions;
export default reducer;
