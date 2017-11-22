import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://www.mcdonalds.com/content/dam/usa/promotions/desktop/OFYQ_960x542.jpg',
    caption: 'Name is Image 1',
    altText: 'Awesome sauce!'
  },
  {
    src: 'https://article.images.consumerreports.org/prod/content/dam/cro/news_articles/health/CR-Health-Crop-Food-Child-10-16',
    caption: 'Image 2',
    altText: 'Edible catering!'
  },
  {
    src: 'http://www.fnstatic.co.uk/images/content/package/50-barbecue-recipes-to-feed-a-crowd_1.jpeg',
    caption: 'Image 3',
    altText: 'Nahh!!!'
  },
  {
    src: 'https://assets3.thrillist.com/v1/image/2416598/size/tmg-facebook_social.jpg',
    caption: 'Image 4',
    altText: 'Foood'
  },
  {
    src: 'https://assets3.thrillist.com/v1/image/2417362/size/tmg-facebook_social.jpg',
    caption: 'Image 5',
    altText: 'Eaattt'
  }
];

const Carousel = () => (
  <div className="carousels container">
    <UncontrolledCarousel items={items} />
  </div>

);

// UncontrolledCarousel.propTypes = {
//     items: PropTypes.array,isRequired,
//     indicators: PropTypes.bool, // default: true
//     controls: PropTypes.bool, // default: true
//     autoPlay: PropTypes.bool, // default: true
//   };

export default Carousel;
