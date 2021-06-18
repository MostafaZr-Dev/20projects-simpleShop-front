import queryString from "query-string";
import qs from "qs";

export const addMultipleQueryArg = (query, key, value) => {
  const search = queryString.stringify(query);

  const queryParams = new URLSearchParams(search);

  key = decodeURIComponent(`${key}[]`);

  queryParams.append(key, value);

  return queryParams.toString();
};

export const removeMultipleQueryArg = (query, key, value) => {
  const search = queryString.stringify(query);

  const queryParams = new URLSearchParams(search);

  key = decodeURIComponent(`${key}[]`);

  if (queryParams.has(key)) {
    const prevValue = queryParams.getAll(key);
    const newValue = prevValue.filter((pValue) => pValue !== value);

    if (newValue.length > 0) {
      queryParams.delete(key);
      newValue.forEach((newValueItem) => {
        queryParams.append(key, newValueItem);
      });
    } else {
      queryParams.delete(key);
    }
  }

  return queryParams.toString();
};

export const addQueryLHSArg = (query, key, operator, value) => {
  const search = queryString.stringify(query);

  const queryParams = new URLSearchParams(search);

  key = decodeURIComponent(`${key}[${operator}]`);

  if (queryParams.has(key)) {
    queryParams.set(key, value);
  } else {
    queryParams.set(key, value);
  }

  return queryParams.toString();
};

export const addSimpleQuery = (query, key, value) => {
  const search = queryString.stringify(query);

  const queryParams = new URLSearchParams(search);

  queryParams.set(key, decodeURIComponent(value));

  return queryParams.toString();
};

export const removeQueryArg = (query, key) => {
  const search = queryString.stringify(query);

  const queryParams = new URLSearchParams(search);

  queryParams.delete(key);

  return queryParams.toString();
};

export const stringifyQuery = (query) => {
  return queryString.stringify(query);
};

export const getQueryObject = (query) => {
  return queryString.parse(query);
};

export const parseQuery = (query) => {
  return qs.parse(query);
};
