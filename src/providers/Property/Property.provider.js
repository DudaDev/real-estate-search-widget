import React, { useContext, useEffect, useReducer }  from 'react';

const REQUIRED_PARAMS = {
  p: 'json',
  t: 'spark-list'
}

const PropertyStateContext = React.createContext();
const PropertyDispatchContext = React.createContext();

const PROPERTY = {
  FETCH_PROPERTIES_REQUEST: 'FETCH_PROPERTIES_REQUEST',
  FETCH_PROPERTIES_SUCCESS: 'FETCH_PROPERTIES_SUCCESS',
  FETCH_PROPERTIES_FAILURE: 'FETCH_PROPERTIES_FAILURE'
}

function propertyDataReducer (state, action) {
  switch (action.type) {
    case PROPERTY.FETCH_PROPERTIES_SUCCESS:
      return action.properties
    default:
      return state;
  }
}

function propertyErrorReducer (action) {
  switch (action.type) {
    case PROPERTY.FETCH_PROPERTIES_ERROR:
      return action.error
    default:
      return null;
  }
}

function propertyLoadingReducer (action) {
  switch (action.type) {
    case PROPERTY.FETCH_PROPERTIES_REQUEST:
      return true;
    default:
      return false;
  }
}

function propertyReducer (state, action) {
  switch (action.type) {
    case PROPERTY.FETCH_PROPERTIES_REQUEST:
    case PROPERTY.FETCH_PROPERTIES_SUCCESS:
    case PROPERTY.FETCH_PROPERTIES_FAILURE:
      return {
        data: propertyDataReducer(state.data, action),
        error: propertyErrorReducer(action),
        loading: propertyLoadingReducer(action)
      }
    default:
      throw Error('Unknown action type for property reducer');
  }
}

function getQuery (params) {
  const keys = Object.keys(params).filter(key => params[key]);
  const cleaned = keys.reduce((acc, key) => {
    acc[key] = params[key];
    return acc;
  }, {});

  const combined = { ...REQUIRED_PARAMS, ...cleaned };
  return Object.entries(combined).map(prop => prop.join('=')).join('&');
}

export function fetchProperties (params, dispatch) {
  const query = getQuery(params);
  return fetch(`${process.env.REACT_APP_SEARCH_BASE_URL}?${query}`)
    .then(response => response.json())
    .then(results => {
      dispatch({ type: PROPERTY.FETCH_PROPERTIES_SUCCESS, properties: results });
    }).catch((error) => {
      dispatch({ type: PROPERTY.FETCH_PROPERTIES_FAILURE, error });
    });;
}

export default function PropertyProvider ({ children, limit }) {
  const [state, dispatch] = useReducer(propertyReducer, {
    data: [],
    error: null,
    loading: false,
    pristine: true
  });

  useEffect(() => {
    fetchProperties({ limit }, dispatch);
  }, [limit])

  return (
    <PropertyStateContext.Provider value={state}>
      <PropertyDispatchContext.Provider value={dispatch}>
        { children }
      </PropertyDispatchContext.Provider>
    </PropertyStateContext.Provider>
  )
}

export function useProperty () {
  const state = useContext(PropertyStateContext);
  const dispatch = useContext(PropertyDispatchContext);

  return {
    ...state,
    dispatch
  }
}
