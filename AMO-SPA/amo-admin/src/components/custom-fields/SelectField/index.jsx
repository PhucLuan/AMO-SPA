import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function SelectField(props) {
    const { field, form, options, label, placeholder, disabled } = props;
    const { name, value } = field;
    
    const selectedOption = value === '00000000-0000-0000-0000-000000000000'?null: options.find(option => option.value+'' === value +'');
    
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;
        
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent);
    }
      
    return (
        <FormGroup className="myformgroup">
             <div className="row myformgroup-row">
            {label && <Label className="col-md-4" for={name}>{label}</Label>}

            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}

                placeholder={placeholder}
                isDisabled={disabled}
                options={options}

                className={showError ? 'myselect col-md-8 is-invalid' : 'myselect col-md-8'}
            />
            <ErrorMessage className="myvalidfeedback col-md-12" name={name} component={FormFeedback} />
            </div>
        </FormGroup>
    );
}

export default SelectField;