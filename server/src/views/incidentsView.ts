import Incident from '../models/Incident';
import imagesView from './imagesView';

export default {
  render(incident: Incident) {
    return {
      id: incident.id,
      title: incident.title,
      description: incident.description,
      value: incident.value,
      views: incident.views,
      createdAt: incident.created_at,
      updatedAt: incident.updated_at,
      images: imagesView.renderMany(incident.images),
    };
  },

  renderMany(incidents: Incident[]) {
    return incidents.map(incident => this.render(incident));
  },
};
