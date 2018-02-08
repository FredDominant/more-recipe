import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.$ = () => ({
  removeClass: () => {},
  click: () => {},
  hide: () => {},
  show: () => {}
});
global.document = document;
console.error = (message) => {
  throw new Error(message);
};
