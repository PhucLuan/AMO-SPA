import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import assetApi from '../../../api/assetApi.js';
import AssetForm from '../components/AssetForm/AssetForm';


const AddEdit = () => {

    const history = useHistory();
    const { assetId } = useParams();
    const isAddMode = !assetId;
    const [asset, setAsset] = useState()
    const initialValues = isAddMode
        ? {
            name: '',
            categoryId: null,
            specification:'',
            installedDate:null,
            state:''
        }
        : asset;

        const handleSubmit = async (values) => {
            try {
                if(isAddMode){
                    await assetApi.post(values);
                } else{
                    await assetApi.put(assetId, values);
                }

                history.push('/manageasset');
            } catch (error) {
                console.log('Failed to post asset: ', error);
            }
        }
    
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
    useEffect( () => {
        const fetchAsset = async () => {
            if (!isAddMode) {
                console.log('abc');
                const response = await assetApi.get(assetId);
                response.installedDate = formatDate(response.installedDate)
                setAsset(response)
            }
        }
        fetchAsset();
    }, [isAddMode,assetId])

    console.log(asset)

    return (
        <div id = 'asset-form'>
            <div className="titleview mb-3">{isAddMode?'Create New Asset':'Edit Asset'}</div>

            <AssetForm
                isAddMode={isAddMode}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default AddEdit
