import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'redux/contactsSlice';
import { selectShowModal } from 'redux/selectors';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowModal);

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleToggleModal();
      }
    };
    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, handleToggleModal]);
  if (!showModal) {
    return null;
  }

  return createPortal(
    <div className={css.overlay}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};
