import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  onInputChange,
  onSelect,
  selectResults,
  selectValue,
  selectQuery,
} from './searchSlice';
import styles from './Search.module.css';

const renderItem = (dispatch, item, query) => {
  const { title } = item;
  const s = title.toLowerCase().indexOf(query);

  const node = <span>
    { title.substr(0, s) }
    <strong>{title.substr(s,query.length)}</strong>
    { title.substr(s + query.length) }
  </span>;

  return (<div
    className={styles.item}
    key={item.id}
    onClick={ (e) => dispatch(onSelect(title)) }
  >
    {node}
  </div>);
}

export function Search() {
  const results = useSelector(selectResults);
  const query = useSelector(selectQuery);
  const value = useSelector(selectValue);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.wrapper}>

        <input
          className={styles.input}
          placeholder='Type "mint" for example'
          onChange={(e) => dispatch(onInputChange(e.target.value))}
          value={value}
        />

        <div className={styles.results}>
          { results.map(p => renderItem(dispatch, p, query) ) }
        </div>
      </div>
    </div>
  );
}
