import React, {PropTypes, Component} from 'react';
import Immutable from 'immutable';
import colors from '../theme/colors';
import Select from './Select';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Button from './Button';
import Input from './Input';
import Switch from './Switch';
import Text from './Text';
import Picture from './Picture';
import Label from './Label';

class ImageField extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return !Immutable.is(this.props.image, nextProps.image) ||
  //          !Immutable.is(this.props.zoneOptions, nextProps.zoneOptions);
  // }

  render() {
    const {image, zoneOptions} = this.props;

    const styles = {
      base: {
        position: 'relative',
        padding: '30px 20px',
        background: '#FDFDFD',
        marginBottom: 30,
        borderLeft: `1px solid ${colors.orange600}`,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.2)'
      }
    };

    return (
      <FlexBox
        className='hover-container'
        align='flex-start'
        justify='flex-start'
        style={styles.base}>
        <div style={{marginRight: 30, marginLeft: 10}}>
          <Picture
            valign='flex-start'
            width={200}
            maxHeight={200}
            push='0 0 20px 0'
            src={`/content/${image.get('fullsize').get('path')}`}/>
          <FlexBox justify='center'>
            <Text push='0 5px 0 0' color='lightgrey'>Dimensions:</Text>
            <Text weight='medium'>{image.get('fullsize').get('width')} x {image.get('fullsize').get('height')}</Text>
          </FlexBox>

          <FlexBox justify='center' className='show-on-hover' style={{margin: '5px auto 0px auto'}}>
            <Button size='tiny' color={colors.lightblue900} push='0 10px'>View</Button>
            <span> | </span>
            <Button size='tiny' color={colors.lightblue900} push='0 10px'>Edit</Button>
            <span> | </span>
            <Button
              onClick={e => this.handleRemove(image)}
              size='tiny'
              color={colors.red700}
              push='0 10px'>
              Remove
            </Button>
          </FlexBox>
        </div>

        <Flex>

          <FlexBox wrap='wrap'>
            <Flex flex='1 1 240px'>
              <div style={{margin: '0 10px 24px 10px'}}>
                <Select
                  label='Placement'
                  name='zone'
                  value={image.get('zone')}
                  options={zoneOptions.toJS()}
                  onChange={::this.handleChange}/>
              </div>
            </Flex>
            <Flex flex='3 1 280px'>
              <Input
                push='0 10px 24px 10px'
                name='altText'
                value={image.get('altText')}
                label='Alt Text'
                placeholder='Add an alternative text attribute'
                onChange={::this.handleChange}/>
            </Flex>
          </FlexBox>
          <Input
            push='0 10px 24px 10px'
            name='linkHref'
            value={image.get('linkHref')}
            label='Link Href'
            placeholder='Add a url to visit when image is clicked'
            onChange={::this.handleChange}/>

          <FlexBox wrap='wrap'>
            <Flex flex='1 1 350px'>
              <Switch
                labelFirst={false}
                justify={false}
                style={{width: 'auto', margin: '0px 10px 0px 10px'}}
                value={image.get('linkOpensNewWindow')}
                label='Open link in new window'
                name='linkOpensNewWindow'
                onChange={::this.handleChange}/>
            </Flex>
            <Flex flex='1 1 350px'>
              <Switch
                labelFirst={false}
                justify={false}
                style={{width: 'auto', margin: '0px 10px 0px 10px'}}
                value={image.get('social')}
                label='Use as default share image'
                name='social'
                onChange={::this.handleChange}/>
            </Flex>
          </FlexBox>
        </Flex>

      </FlexBox>
    );
  }

  handleChange(image) {
    this.props.onChange(image);
  }

  handleRemove(image) {
    this.props.onRemove(image);
  }

}

export default ImageField;

ImageField.propTypes = {
  image: PropTypes.instanceOf(Immutable.Map),
  zoneOptions: PropTypes.instanceOf(Immutable.List),
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

ImageField.defaultProps = {
  image: Immutable.Map(),
  zoneOptions: Immutable.List(),
  onChange: e => null,
  onRemove: e => null
};
