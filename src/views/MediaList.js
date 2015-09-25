import React, {Component, PropTypes} from 'react/addons';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Link from './Link';
import config from '../config.js';
import {createTransitionHook} from '../universalRouter';
import * as mediaActions from '../actions/mediaActions';
import * as locationActions from '../actions/locationActions';
import colors, {colors, getRgba} from '../theme/colors';
import {dataTableStyles} from './styles';
import ScrollView from './ScrollView';
import Icon from './Icon';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Picture from './Picture';
import Text from './Text';
import Button from './Button';
import MediaLibrary from './MediaLibrary';
import Gallery from './Gallery';
import Modal from './Modal';
import moment from 'moment';
import Select from './Select';

@connect(
  state => ({
    media: state.media,
    images: state.media.get('images'),
    user: state.auth.get('user')
  }),
  dispatch => bindActionCreators({...mediaActions, ...locationActions}, dispatch)
)
class MediaList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mediaModalIsOpen: false
    };
  }

  componentWillMount() {
    this.props.loadLocation({displayName: ['Media']});
    this.props.loadMediaItems();
  }

  render() {
    return (
      <ScrollView>

        <div style={{padding: '0 40px 100px 40px'}}>

        <FlexRow style={{padding: '20px 0'}}>
          <FlexRow justify='flex-start'>
            <div style={{width: 180, marginRight: 10}}>
              <Select
                name='statusFilter'
                placeholder='Filter by Status'
                options={[
                  {value: 'all', label: 'Show All'},
                  {value: 'published', label: 'Published'},
                  {value: 'draft', label: 'Draft'},
                  {value: 'pending', label: 'Pending Review'}
                ]}/>
            </div>
            <div style={{width: 180}}>
              <Select
                name='monthFilter'
                placeholder='Filter by Month'
                options={[
                  {value: 'all', label: 'Show All'},
                  {value: 'published', label: 'Published'},
                  {value: 'draft', label: 'Draft'},
                  {value: 'pending', label: 'Pending Review'}
                ]}/>
            </div>
          </FlexRow>
          <div>
            <Button
              color={this.props.media.get('galleryView') ? colors.grey600 : colors.blue500}
              icon='view_headline'
              onClick={e => this.props.toggleGalleryDisplay(false)}/>
            <Button
              color={this.props.media.get('galleryView') ? colors.blue500 : colors.grey600}
              icon='view_comfy'
              onClick={e => this.props.toggleGalleryDisplay(true)}/>
          </div>

          <Button
            style={{position: 'fixed', bottom: 40, right: 40, zIndex: 3}}
            icon='add'
            fab={true}
            fill={colors.red700}
            color='white'
            onClick={::this.showModal}/>
        </FlexRow>

        {this.props.media.get('galleryView') ?
          <Gallery
            images={this.props.images.toJS()}
            onImageClick={::this.viewMedia}
            style={{
              margin: '0 -40px -100px -40px',
              padding: '20px 25px 100px 25px',
              background: colors.grey300,
              borderTop: `1px solid ${colors.grey400}`,
              justifyContent: 'space-between'
            }}
            wrapperStyle={{
            }}/>
        :
        <div style={{...dataTableStyles.base}}>
          <div style={{...dataTableStyles.headerRow}}>
            <Text weight='medium' color='darkgrey' width={120}></Text>
            <Text weight='medium' color='darkgrey' flex={1}>Media ID</Text>
            <Text weight='medium' color='darkgrey' width={120}>User</Text>
            <Text weight='medium' color='darkgrey' width={100}>Created</Text>
          </div>

          <CSSTransitionGroup transitionEnterTimeout={200} transitionLeaveTimeout={200} component='div' transitionName='dataTableTransition'>
          {this.props.images.toJS().map((image, i) =>
            <div
              key={image._id}
              className='hover-container'>

              <div style={dataTableStyles.row}>
                <Picture
                  width={90}
                  height={90}
                  valign='flex-start'
                  push='0 30px 0 0'
                  src={`/content/${image.thumbnail.path}`}/>

                <FlexRow dir='column' align='flex-start'>
                  <Flex>
                    <Link to={`/media/${image._id}`}>
                      <Text weight='medium' size='large' color='darkblue'>{image.title}</Text>
                    </Link>
                    <Text size='small' lineHeight='18px' color='darkgrey'>{image.fullsize.filename}</Text>
                  </Flex>

                  <div className='show-on-hover' style={{lineHeight: 'normal'}}>
                    <Button size='tiny' icon='photo' color={colors['light-blue-900']} push='0 20px 0 0'>View</Button>
                    <Button size='tiny' icon='edit' color={colors['light-blue-900']} push='0 20px 0 0'>Edit</Button>
                    <Button onClick={::this.handleDeleteMediaClick(image)} size='tiny' icon='delete' color={colors['red-700']}>Delete</Button>
                  </div>
                </FlexRow>

                <div style={{width: 120}}>
                  <FlexRow justify='flex-start'>
                    <Text color='darkgrey' size='small' flexAlign='center'>
                      <Icon name='person' fill={colors['blue-grey-400']} size={16} pushRight={3}/>{image.author}
                    </Text>
                  </FlexRow>
                </div>

                <div style={{width: 100}}>
                  <Text size='small' color='darkgrey'>{moment(image.created).format('MM/DD/YY')}</Text>
                </div>
              </div>

            </div>
          )}
          </CSSTransitionGroup>
        </div>
        }

        <Modal
          show={this.state.mediaModalIsOpen}
          closeOnOuterClick={true}
          style={{width: '100%', background: getRgba('blue-grey-900', 0.9), fontFamily: 'inherit'}}
          onClose={::this.closeModal}
          containerStyle={{
            padding: 0,
            margin: '2vh auto 0 auto',
            width: '96vw',
            height: '96vh',
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <div style={{padding: '16px 12px', borderBottom: `0px solid ${colors.grey300}`}}>
            <FlexRow>
              <div style={{margin: '0 12px', fontWeight: 400, fontSize: 18}}>Add Images</div>
              <Button icon='close' color={colors.bluegrey300} onClick={::this.closeModal}/>
            </FlexRow>
          </div>

          <MediaLibrary
            showGalleryTab={false}
            user={this.props.user.toJS()}/>
        </Modal>
        </div>
      </ScrollView>
    );
  }

  handleDeleteMediaClick(image) {
    return () => {
      if (window.confirm('Are you sure you want to delete this image?')) {
        this.props.deleteMedia(image._id);
      }
    };
  }

  viewMedia(image) {
    this.props.history.pushState(null, `${config.appContext}/media/${image._id}`);
  }

  showModal() {
    this.setState({mediaModalIsOpen: true});
  }

  closeModal() {
    this.setState({mediaModalIsOpen: false});
  }

}

export default MediaList;
