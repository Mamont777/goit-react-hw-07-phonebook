import { useDispatch } from 'react-redux';
import { toggleModal } from 'redux/contactsSlice';
import { deleteContact } from 'redux/operations';
import css from './DeleteContactWarning.module.css';

export const DeleteContactWarning = ({ id }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
    dispatch(toggleModal(id));
  };
  const handleCloseModal = () => {
    dispatch(toggleModal(id));
  };
  return (
    <div className={css.deleteWarning}>
      <div className={css.modalWrapper}>
        <div className={css.text}>
          Are you sure you want to delete this contact?
        </div>
        <div className={css.buttonWrapper}>
          <button
            type="button"
            className={css.buttonOk}
            onClick={handleDeleteContact}
          >
            OK
          </button>
          <button
            type="button"
            className={css.buttonNo}
            onClick={handleCloseModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
