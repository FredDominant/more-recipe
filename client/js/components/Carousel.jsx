import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://www.mcdonalds.com/content/dam/usa/promotions/desktop/OFYQ_960x542.jpg',
    caption: '',
    altText: 'Awesome sauce!'
  },
  {
    src: 'https://article.images.consumerreports.org/prod/content/dam/cro/news_articles/health/CR-Health-Crop-Food-Child-10-16',
    caption: '',
  },
  {
    src: 'http://www.fnstatic.co.uk/images/content/package/50-barbecue-recipes-to-feed-a-crowd_1.jpeg',
    caption: '',
    altText: 'Nahh!!!'
  },
  {
    src: 'https://assets3.thrillist.com/v1/image/2416598/size/tmg-facebook_social.jpg',
    caption: '',
    altText: 'Foood'
  },
  {
    src: 'https://assets3.thrillist.com/v1/image/2417362/size/tmg-facebook_social.jpg',
    caption: '',
    altText: 'Eaattt'
  }
];

const Carousel = () => (
  <div className="carousels container">
    <UncontrolledCarousel items={items} />
  </div>

);

export default Carousel;
