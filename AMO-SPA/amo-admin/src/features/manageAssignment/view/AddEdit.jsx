import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import assignmentApi from '../../../api/assignmentApi';
import { ParseDateTime } from '../../../utils/ParseDateTime';
import { onParamsChange } from '../assignmentSlice';
import AssignmentForm from '../components/AssignmentForm/AssignmentForm';

const AddEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { assignmentId } = useParams();
    const Params = useSelector(state => state.user.Params); 
    const isAddMode = !assignmentId;

    const convertDate = (date) => date.split('/').reverse().join('-');

    const [inputValue, setInputValue] = useState({
        UserID: '',
        AssetID: '',
        UserFullName: '',
        AssetName:'',
        AssignedDate: convertDate(ParseDateTime(new Date().toISOString())),
        Note:''
    });
    const [initialValues, setInitialValue] = useState({
        UserID: '',
        AssetID: '',
        UserFullName: '',
        AssetName:'',
        AssignedDate: convertDate(ParseDateTime(new Date().toISOString())),
        Note:''
    });
    const handleSubmit = async (values) => {
        const {AssetName, UserFullName, ...postValue} = values;
        try {
            if(isAddMode){
                await  assignmentApi.post(postValue);
            } else{
                await  assignmentApi.put(assignmentId, values);
            }
            dispatch(onParamsChange({...Params, OrderProperty: 'UpdatedDate'}));
            history.push('/manageassignment');
        } catch (error) {
            console.log('Failed to post assignment: ', error);
        }
    }
    
    
    
    useEffect( () => {
        const fetchUserList = async () => {
            if (!isAddMode) {
                const response = await assignmentApi.get(assignmentId);
                setInputValue({
                    UserID: response.userID,
                    AssetID:  response.assetID,
                    UserFullName: response.assignedTo,
                    AssetName: response.assetName,
                    AssignedDate: convertDate(response.assignedDate),
                    Note:  response.note
                });
                setInitialValue({
                    UserID: response.userID,
                    AssetID:  response.assetID,
                    UserFullName: response.assignedTo,
                    AssetName: response.assetName,
                    AssignedDate: convertDate(response.assignedDate),
                    Note:  response.note
                });
            }
        }
        fetchUserList();
    }, [isAddMode,assignmentId])
    return (
        <div id = 'user-form'>
            <div className="titleview mb-3">{isAddMode?'Create New Assignment':'Edit Assignment'}</div>
            <AssignmentForm
                isAddMode={isAddMode}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                setInputValue = {setInputValue}
                setInitialValue = {setInitialValue}
                inputValue = {inputValue}
            />
        </div>
    )
}

export default AddEdit
