import Ong from '../models/Ong';

import contactViews from './contactView';

export default {
  render(ong: Ong) {
    return {
      name: ong.name,
      email: ong.email,
      cnpj: ong.cnpj,
      city: ong.city,
      uf: ong.uf,
      profile: ong.profile,
      contact: contactViews.render(ong.contact),
    };
  },

  renderMany(ongs: Ong[]) {
    return ongs.map(ong => this.render(ong));
  },
};
