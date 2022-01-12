import { shallow } from 'enzyme';
import Image from 'next/image';
import LocalImage from './LocalImage';

describe('components/LocalImage', () => {
  it('should render a next/image with a passthrough loader prop', () => {
    const wrapper = shallow(
      <LocalImage
        src="something.jpg"
      />,
    );

    const { loader } = wrapper.find(Image).props();
    const result = loader!({ src: 'something.jpg', width: 50 });
    expect(result).toBe('something.jpg');
  });
});
