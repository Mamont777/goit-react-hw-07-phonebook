import { useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { selectFilteredContacts } from 'redux/selectors';
import { ContactItem } from 'components/ContactItem/ContactItem';

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contacts}>
      {filteredContacts.map(({ id, name, phone, avatar }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          phone={phone}
          avatar={avatar}
        />
      ))}
    </ul>
  );
}

export default ContactList;
