import { FastField, Form, Formik, useField } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import assetApi from '../../../../api/assetApi';
import InputField from '../../../../components/custom-fields/InputField';
import RadioField from '../../../../components/custom-fields/RadioField';
import SelectField from '../../../../components/custom-fields/SelectField';


AssetForm.propTypes = {
    onSubmit: PropTypes.func,
};

AssetForm.defaultProps = {
    onSubmit: null,
}
// const CATEGORY_OPTIONS = [
//     { value: '138257dc-6bc6-499e-a169-2086eabc8c9d', label: 'Laptop' },
//     { value: '138257dc-6bc6-499e-a169-2086eabc8c9f', label: 'Monitor' },
//     { value: '138257dc-6bc6-499e-a169-2086eabc8c9e', label: 'PC' }
// ];


function AssetForm(props) {

    const { initialValues, isAddMode } = props;

    const history = useHistory();

    const [Filterlist, setFilterlist] = useState()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        categoryId: Yup.string().required('This field is required.').nullable(),
        specification: Yup.string().required('This field is required.'),
        installedDate: Yup.date().required("This field is required.").nullable(),
        state: Yup.string().required("A radio option is required")
    });
    const STATE_OPTIONS = isAddMode ? 
    [
        { value: '0', label: 'Available' },
        { value: '1', label: 'Not Available' }
    ] : 
    [
        { value: '0', label: 'Available' },
        { value: '1', label: 'Not Available' },
        { value: '4', label: 'Waiting For Recycle' },
        { value: '5', label: 'Recycled' }
    ]
    ;
    const handleSubmitForm = (asset) => {

        if (isAddMode) {
            const postAsset = async () => {
                try {
                    await assetApi.post(asset)
                        .then((res) => {
                            alert("Add success");
                            history.push('/manageasset');
                        });

                } catch (error) {
                    alert(error)
                }
            }
            postAsset();
        }
        else {
            const putAsset = () => {
                try {
                    assetApi.put(asset)
                        .then((res) => {
                            alert("Update success");
                            history.push('/manageasset');
                        });

                } catch (error) {
                    alert(error)
                }
            }
            putAsset();
        }
    }

    const MyTextArea = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and alse replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <FormGroup className="myformgroup">
                <div className="row myformgroup-row-textarea">
                <label className="col-md-4" htmlFor={props.id || props.name}>{label}</label>
                <textarea className="text-area col-md-8 myinput" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
                </div>
            </FormGroup>
        );
    };

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await assetApi.getFilter()
            setFilterlist(res)
        }
        fetchCategory();
    }, [])

    console.log(Filterlist)

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmitForm(values)}
        >
            {formikProps => {
                // do something here ...
                const { isSubmitting } = formikProps;
                return (
                    <Form>
                        <FastField
                            name="name"
                            component={InputField}

                            label="Name"
                            placeholder="Eg: Laptop ..."
                        />
                        {Filterlist &&
                            <FastField
                                name="categoryId"
                                component={SelectField}
                                disabled={!isAddMode}
                                label="Category"
                                placeholder="Choose a category?"
                                options={Filterlist.categoryList.map((category) => {
                                    return { value: category.id, label: category.name };
                                })}
                            />}

                        {/* <FastField
                            name="specification"
                            component={InputField}

                            label="Specification"
                            placeholder="Eg: Laptop ..."
                        /> */}
                        <MyTextArea
                            label="Specification"
                            name="specification"
                            rows="6"
                            placeholder="Eg: Laptop ..."
                        />
                        <FastField
                            name="installedDate"
                            component={InputField}

                            type="date"
                            label="Installed Date"
                            placeholder="Eg: Time ..."
                        />

                        <RadioField options={STATE_OPTIONS} name="state" label="State"/>

                        <FormGroup>
                            <Button
                                type="submit"
                                disabled={!(formikProps.dirty && formikProps.isValid)}
                                color='danger'>
                                {isSubmitting && <Spinner size="sm" />}
                                {isAddMode ? 'Save' : 'Update'}
                            </Button>
                            {' '}
                            <Button onClick={() => history.push('/manageasset')}>
                                Cancel
                            </Button>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default AssetForm
