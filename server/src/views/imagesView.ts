import Image from '../models/Image';

export default {
  render(image: Image) {
    return {
      key: image.key,
      url: image.url,
    };
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  },
};
