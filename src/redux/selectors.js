import { createSelector } from '@reduxjs/toolkit';

export const selectFilter = state => state.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectShowModal = state => state.contacts.showModal;
export const selectDeleteId = state => state.contacts.deleteId;
export const selectContacts = ({ contacts }) =>
  [...contacts.items].sort((a, b) => a.name.localeCompare(b.name));

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!contacts) {
      return [];
    }
    return contacts.filter(({ name }) =>
      name.toLowerCase().trim().includes(filter.toLowerCase())
    );
  }
);
