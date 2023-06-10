import { ToastContainer } from 'react-toastify';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import {
  selectDeleteId,
  selectError,
  selectIsLoading,
  selectShowModal,
} from 'redux/selectors';
import { Modal } from './Modal/Modal';
import { DeleteContactWarning } from './DeleteContactWarning/DeleteContactWarning';

export function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const showModal = useSelector(selectShowModal);
  const deleteId = useSelector(selectDeleteId);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      >
        {isLoading && !error && (
          <b style={{ textAlign: 'center' }}>Request in progress...</b>
        )}
      </div>
      <ContactList />
      {showModal && (
        <Modal>
          <DeleteContactWarning id={deleteId} />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}
