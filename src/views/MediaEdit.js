import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import config from '../config';
import {bindActionCreators} from 'redux';
import colors from '../theme/colors';
import Color from 'color';
import * as mediaActions from '../actions/mediaActions';
import * as locationActions from '../actions/locationActions';
import ScrollView from './ScrollView';
import FlexBox from './FlexBox';
import FlexColumn from './FlexColumn';
import Flex from './Flex';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import Tabs from './Tabs';
import Tab from './Tab';
import Picture from './Picture';
import Box from './Box';
import Switch from './Switch';

class MediaEdit extends Component {

  componentWillMount() {
    this.props.loadLocation({displayName: ['Media', 'Edit']});
    this.props.loadMedia(this.props.params.id);
  }

  render() {
    const image = this.props.selection && this.props.selection.toJS() || {};

    const styles = {
      imageWrapper: {
        background: Color(colors.bluegrey800).darken(0.2).rgbaString(),
        padding: 40
      },
      imageInfo: {
        padding: 0
      }
    };

    return (
      <ScrollView>

          <div style={styles.imageWrapper}>
            <FlexColumn>
              <Picture src={`/content/${image.fullsize && image.fullsize.path}`} maxHeight={460}/>
              <div>
                <Text
                  style={{marginTop: 20}}
                  size='xlarge'
                  weight='thin'
                  color={colors.bluegrey600}>
                  {image.title}
                </Text>
              </div>
            </FlexColumn>
          </div>

          <FlexBox align='stretch' style={styles.imageInfo}>
            <Flex style={{padding: '40px 80px'}}>
              <Input
                name='title'
                value={image.title}
                label='Title'
                placeholder='Give your image a title'
                onChange={::this.handleChange}/>
              <br/>
              <Input
                name='altText'
                value={image.altText}
                label='Alt Text'
                placeholder='Add an alternative text attribute'
                onChange={::this.handleChange}/>
              <br/>
              <TextArea
                name='description'
                value={image.description}
                label='Description'
                placeholder='Add a description'
                onChange={::this.handleChange}/>
            </Flex>

            <div style={{width: 340, padding: '40px 40px', borderLeft: `1px solid ${colors.grey300}`}}>
              <Input
                flex={1}
                push='0 0 12px 0'
                icon='link'
                name='altText'
                value={`${config.appContext}/content/${image.fullsize && image.fullsize.path}`}
                label='Image URL'
                readOnly={true}/>
              <FlexBox align='flex-start' justify='flex-start' style={{marginBottom: 6}}>
                <Text size='normal' lineHeight='24px' weight='medium' width={90} color={colors.grey500}>File type</Text>
                <Text size='normal' lineHeight='24px' weight='normal'>{image.mimeType && image.mimeType.split('/')[1]}</Text>
              </FlexBox>
              <FlexBox align='flex-start' justify='flex-start' style={{marginBottom: 6}}>
                <Text size='normal' lineHeight='24px' weight='medium' width={90} color={colors.grey500}>File size</Text>
                <Text size='normal' lineHeight='24px' weight='normal'>{Math.floor(image.fileSize && (image.fileSize / 1000) || 0) + ' kB'}</Text>
              </FlexBox>
              <FlexBox align='flex-start' justify='flex-start' style={{marginBottom: 0}}>
                <Text size='normal' lineHeight='24px' weight='medium' width={90} color={colors.grey500}>Dimensions</Text>
                <Text size='normal' lineHeight='24px' weight='normal'>{image.fullsize && (image.fullsize.width + ' x ' + image.fullsize.height)}</Text>
              </FlexBox>

              <FlexBox style={{marginTop: 40}}>
                <Button
                  icon='save'
                  color={colors.lightgreen500}
                  onClick={e => this.props.saveMedia(image)}>
                  Update
                </Button>
                <Button
                  icon='delete'
                  color={colors.red400}>
                  Delete
                </Button>
              </FlexBox>
            </div>
          </FlexBox>

      </ScrollView>
    );
  }

  handleChange(change) {
    this.props.editMedia(change);
  }

}

export default connect(
  state => ({selection: state.media.get('selection')}),
  dispatch => bindActionCreators({...mediaActions, ...locationActions}, dispatch)
)(MediaEdit);
