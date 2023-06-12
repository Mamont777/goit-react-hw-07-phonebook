import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TiUserDeleteOutline } from 'react-icons/ti';
import Avatar from '@mui/material/Avatar';
import { toggleModal } from 'redux/contactsSlice';
import css from './ContactItem.module.css';
import { useState } from 'react';

export const ContactItem = ({ id, name, phone, avatar }) => {
  const dispatch = useDispatch();
  const handleToggleModal = () => dispatch(toggleModal(id));
  const [isValidImageUrl, setIsValidImageUrl] = useState(true);

  return (
    <li className={css.contacts__item}>
      {avatar && isValidImageUrl ? (
        <img
          src={avatar}
          alt="Contact's avatar"
          width="48"
          className={css.contacts__img}
          onError={e => {
            setIsValidImageUrl(false);
          }}
        />
      ) : (
        <Avatar />
      )}
      <p className={css.contacts__data}>
        <span>
          {name}: {phone}
        </span>
        <button
          type="button"
          className={css.btnDel}
          onClick={() => dispatch(handleToggleModal)}
        >
          Delete
          <TiUserDeleteOutline size="16" className={css.icon} />
        </button>
      </p>
    </li>
  );
};

ContactItem.propTypes = {
  //   id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
