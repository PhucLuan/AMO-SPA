import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersPaging: undefined,
    listChange: false
  }
  
const userSlice = createSlice({
    name: 'manageUser',
    initialState,
    reducers: {
        fetchUsersPaging(state, action) {
            state.usersPaging = action.payload;
        },
        onListChange(state) {
            state.listChange = !state.listChange;
        }
    }
});

const { reducer, actions } = userSlice;
export const { fetchUsersPaging, onListChange, addedNewUser, onParamsChange } = actions;
export default reducer;