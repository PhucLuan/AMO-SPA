import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import InputField from '../../../../components/custom-fields/InputField';
import RadioField from '../../../../components/custom-fields/RadioField';
import SelectField from '../../../../components/custom-fields/SelectField';


UserForm.propTypes = {
    onSubmit: PropTypes.func,
};

UserForm.defaultProps = {
    onSubmit: null,
}
const TYPE_OPTIONS = [
    { value: 'Admin', label: 'Administrator' },
    { value: 'Staff', label: 'Staff' }
];
const GENRE_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
];
function UserForm(props) {

    const { initialValues, isAddMode } = props;

    const history = useHistory();
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const validationSchema = Yup.object().shape({
        UserName: Yup.string().required('This field is required.'),
        Email: Yup.string().required('This field is required.').email('Invalid email'),
        FirstName: Yup.string().required('This field is required.'),
        LastName: Yup.string().required('This field is required.'),
        Type: Yup.string().required('This field is required.').nullable(),
        DateOfBirth: Yup.string().required('This field is required.').test(
            "DateOfBirth",
            "User is under 18. Please select a different date",
            value => {
                return getAge(value) > 18;
            }
        ).nullable(),

        JoinedDate: Yup.date().required('This field is required.')
        .when(['DateOfBirth'], (DateOfBirth, a) => {
            if (DateOfBirth) {              
                return Yup.date()
                    .min(DateOfBirth, 'Joined date is not later than Date of Birth. Please select a different date')
                    .test(
                            "JoinedDate",
                            "Joined date is Saturday or Sunday. Please select a different date",
                            value => {
                                const day =  new Date(value).getDay();
                                if(day === 0 || day === 6) return false 
                                else return true;
                            }
                    )
            }
        }).nullable(),

        Gender: Yup.string().required("A radio option is required")
    });

    return (
        <Formik
        enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
        >
            {formikProps => {
                // do something here ...
                const { isSubmitting } = formikProps;

                return (
                    <Form>
                        <FastField
                            name="FirstName"
                            component={InputField}

                            disabled={!isAddMode}
                            label="First Name"
                            placeholder="Eg: Wow nature ..."
                        />

                        <FastField
                            name="LastName"
                            component={InputField}

                            disabled={!isAddMode}
                            label="Last Name"
                            placeholder="Eg: Wow nature ..."
                        />
                        
                        {isAddMode? 
                            <>
                                <FastField
                                    name="Email"
                                    component={InputField}

                                    label="Email"
                                    placeholder="Eg: Wow nature ..."
                                />

                                <FastField
                                    name="UserName"
                                    component={InputField}

                                    label="User Name"
                                    placeholder="Eg: Wow nature ..."
                                />
                            </> : ''
                        }

                        <FastField
                            name="DateOfBirth"
                            component={InputField}

                            type="date"
                            label="Date of Birth"
                            placeholder="Eg: Wow nature ..."
                        />
                        <RadioField options={GENRE_OPTIONS} name="Gender" label="Gender"/>
                        <FastField
                            name="JoinedDate"
                            component={InputField}

                            type="date"
                            label="Joined Date"
                            placeholder="Eg: Wow nature ..."
                        />
                        <FastField
                            name="Type"
                            component={SelectField}

                            label="Type"
                            placeholder="What's your user type?"
                            options={TYPE_OPTIONS}
                        />

                        <FormGroup>
                            <Button type="submit"
                                disabled={!(formikProps.dirty && formikProps.isValid)}
                                color='danger'>
                                {isSubmitting && <Spinner size="sm" />}
                                {isAddMode ? 'Save' : 'Update'}
                            </Button>
                            {' '}
                            <Button onClick={() => history.push('/manageuser')}>
                                Cancel
                            </Button>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default UserForm
