import { Field } from 'formik'
import React from 'react'
import { FormGroup } from 'reactstrap'

const index = ({ options, name,label }) => {
    return (
        <FormGroup className="myformgroup">
            <div className="row">
                <div className="col-md-4" id="my-radio-group">{label}</div>
                <div className="col-md-8" role="group" aria-labelledby="my-radio-group">
                    {options.map((option, idx) =>
                        <div key={idx}>
                            <label>
                                <Field type="radio" name={name} value={option.value} />
                                 {" " + option.label}
                            </label>{' '}
                        </div>
                    )}
                </div>
            </div>
        </FormGroup>
    )
}

export default index
