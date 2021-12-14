import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Params: {
        OrderProperty: 'UpdatedDate',
        Desc: true,
        Page: 1,
        Limit: 5
    }
}
  
const assignmentSlice = createSlice({
    name: 'manageAssignment',
    initialState,
    reducers: {
        onParamsChange(state, action){
            state.Params = action.payload;
        },
        onAssetParamsChange(state, action){
            state.assetParams = action.payload;
        }
    }
});

const { reducer, actions } = assignmentSlice;
export const { onParamsChange } = actions;
export default reducer;