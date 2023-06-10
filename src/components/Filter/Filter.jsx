import { useSelector, useDispatch } from 'react-redux';
import { FcSearch } from 'react-icons/fc';
import css from './Filter.module.css';
import { selectFilter } from 'redux/selectors';
import { filterContacts } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChangeFilter = e => {
    dispatch(filterContacts(e.currentTarget.value));
  };
  return (
    <label className={css.filterTitle}>
      <FcSearch size="18" className={css.icon} /> Find contacts by name
      <input
        className={css.filterInput}
        type="text"
        value={filter}
        onChange={handleChangeFilter}
        placeholder="search"
      />
    </label>
  );
};

export default Filter;
