import Contact from '../models/Contact';

export default {
  render(contact: Contact) {
    return {
      whatsapp: contact.whatsapp,
      phone: contact.phone,
    };
  },

  renderMany(contacts: Contact[]) {
    return contacts.map(contact => this.render(contact));
  },
};
