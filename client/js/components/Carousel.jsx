import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://www.thelocal.it/userdata/images/article/69523836b0191608c41d640feead8da2be5462038d3409e1e3900fad039c7fc8.jpg',
    caption: 'Image 1',
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
  }
];

class Carousel extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="carousels">
                <UncontrolledCarousel items={items} />
            </div>
            
        );
    }
}
// UncontrolledCarousel.propTypes = {
//     items: PropTypes.array,isRequired,
//     indicators: PropTypes.bool, // default: true
//     controls: PropTypes.bool, // default: true
//     autoPlay: PropTypes.bool, // default: true
//   };
  
export default Carousel;
