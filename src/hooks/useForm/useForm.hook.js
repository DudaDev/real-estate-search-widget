import { useEffect, useState } from 'react';

export default function useForm(initialValues, validators, onSubmit) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      onSubmit(values);
      setSubmitted(false);
    }
  }, [submitted, errors, values, onSubmit]);

  function validate(validator, propValue, allValues) {
    return validator && !validator.fn(propValue, allValues) ? true : false;
  }

  function validateAll() {
    const newErrors = Object.keys(values).reduce((acc, key) => {
      const validator = validators[key]
      let error;

      const validatorArray = !Array.isArray(validator)
        ? [validator]
        : validator;

      error = validatorArray.find(v => validate(v, values[key], values));
      if (error) {
        acc[key] =
          typeof error.message === 'function'
            ? error.message(values[key])
            : error.message;
      }

      return acc;
    }, {});

    return newErrors;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateAll(values));
    setSubmitted(true);
  }

  return [handleInputChange, handleSubmit, errors, values];
}
