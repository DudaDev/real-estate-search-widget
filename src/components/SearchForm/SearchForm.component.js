import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';
import { fetchProperties, useProperty } from '../../providers/Property'
import './searchForm.css';


function hasSomeValue (vals) {
  return Object.keys(vals).filter(key => vals[key]).length;
}

function isFullNumber (val) {
  return /^\d+$/.test(val)
}

function isMonetaryValue (val) {
  return /^\$?[\d,]+$/.test(val)
}

function numberFieldIsValid (val, vals) {
  return hasSomeValue(vals) && (!val.length || isFullNumber(val));
}

function monetaryFieldIsValid (val, vals) {
  return hasSomeValue(vals) && (!val.length || isMonetaryValue(val));
}

const validators = {
  beds: {
    fn: numberFieldIsValid,
    message: 'Enter full numbers'
  },
  baths: {
    fn: numberFieldIsValid,
    message: 'Enter full numbers'
  },
  minPrice: {
    fn: monetaryFieldIsValid,
    message: 'Enter full dollar amount'
  },
  maxPrice: {
    fn: monetaryFieldIsValid,
    message: 'Enter full dollar amount'
  }
}

const defaults = {
  beds: '',
  baths: '',
  minPrice: '',
  maxPrice: ''
}


Input.propTypes = {
  onChange: PropTypes.func.isRequired
}

function Input ({ onChange,  type = 'text', value = '', ...rest }) {
  return (
    <input type={type} value={value} onChange={onChange} {...rest} />
  )
}

function FormHelperText ({ children }) {
  return <div className="helperText">{children}</div>
}

function SearchForm ({ onSubmit, searchButtonText }) {
  const [handleChange, handleSubmit, errors, values] = useForm(
    defaults,
    validators,
    onSubmit
  );

  function formatMonetaryValue (e) {
    const { name, value } = e.target;
    let i = value.replace(/[^\d]/g, '');
    let j = (i.length > 3) ? i.length % 3 : 0;
    const formatted = (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1,');
    handleChange({ target: { name, value: formatted } });
  }

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <div className="formRow">
        <div className="formInput">
          <label htmlFor="beds" className="mls-searchFieldLabel">Bedrooms</label>
          <Input min="1" id="beds" value={values.beds} name="beds" onChange={handleChange} className="mls-searchFieldInput" />
          { errors.beds && <FormHelperText>{ errors.beds }</FormHelperText> }
        </div>

        <div className="formInput">
          <label htmlFor="baths" className="mls-searchFieldLabel">Bathrooms</label>
          <Input min="1" id="baths" value={values.baths} name="baths" onChange={handleChange} className="mls-searchFieldInput" />
          { errors.baths && <FormHelperText>{ errors.baths }</FormHelperText> }
        </div>

        <div className="formInput">
          <label htmlFor="minPrice" className="mls-searchFieldLabel">Minimum Price</label>
          <Input min="0" id="minPrice" value={values.minPrice} name="minPrice" onChange={formatMonetaryValue} className="mls-searchFieldInput" />
          { errors.minPrice && <FormHelperText>{ errors.minPrice }</FormHelperText> }
        </div>

        <div className="formInput">
          <label htmlFor="maxPrice" className="mls-searchFieldLabel">Maximum Price</label>
          <Input min="0" id="maxPrice" value={values.maxPrice} name="maxPrice" onChange={formatMonetaryValue} className="mls-searchFieldInput" />
          { errors.maxPrice && <FormHelperText>{ errors.maxPrice }</FormHelperText> }
        </div>
      </div>

      <div className="buttonRow">
        <button type="submit" className="mls-searchButton">{ searchButtonText }</button>
      </div>
    </form>
  )
}

export default function Search ({ searchButtonText }) {
  const { mls, limit, dispatch } = useProperty();

  function handleSearch (vals) {
    const cleaned = Object.keys(vals).reduce((acc, key) => {
      acc[key] = vals[key].replace(/[^\d]/g, '');
      return acc;
    }, {});

    fetchProperties({ ...cleaned, mls, limit }, dispatch);
  }

  return (
    <SearchForm onSubmit={handleSearch} searchButtonText={searchButtonText} />
  )
}
