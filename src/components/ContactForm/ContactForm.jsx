import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiUserAddLine } from 'react-icons/ri';
import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './ContactForm.module.css';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

const notifyOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const addContacts = contact => {
    const existingContact = contacts.find(({ name }) => name === contact.name);

    if (existingContact) {
      toast.error(`${contact.name} is already in contacts`, notifyOptions);
      return;
    }
    dispatch(addContact(contact));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(10),
      name,
      number,
    };
    addContacts(contact);
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit}>
        <label>
          <IoMdPersonAdd size="16" className={css.wrapper__icon} />
          Name
          <input
            className={css.dataInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          <BsFillTelephoneFill size="16" className={css.wrapper__iconPhone} />
          Number
          <input
            className={css.dataInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={css.btn}>
          <RiUserAddLine size="16" className={css.icon} />
          Add contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
