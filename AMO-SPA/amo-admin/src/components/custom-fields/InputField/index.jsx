import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

function InputField(props) {
  const {
    field, form,
    type, label, placeholder, disabled, onClick, value, containerClassName, inputClassName
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <FormGroup className={`myformgroup ${containerClassName}`}>
      <div className="row myformgroup-row">
      {label && <Label className="col-md-4" htmlFor={name}>{label}</Label>}

      <Input
        className={`col-md-8 myinput ${inputClassName}`}
        id={name}
        {...field}

        {...(value ? {value: value} : {})}
        onClick = {onClick}
        type={type}
        disabled={disabled}
        placeholder={placeholder}

        invalid={showError}
      />
            <ErrorMessage className="myvalidfeedback col-md-12" name={name} component={FormFeedback} />

      </div>
    </FormGroup>
  );
}

export default InputField;