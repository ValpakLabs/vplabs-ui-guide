import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import colors, {colors, getRgba} from '../theme/colors';
import uuid from 'uuid-lib';
import * as fileActions from '../actions/fileActions';
import * as mediaActions from '../actions/mediaActions';
import Dropzone from 'react-dropzone';
import Gallery from './Gallery';
import ScrollView from './ScrollView';
import Input from './Input';
import Switch from './Switch';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Icon from './Icon';
import Button from './Button';
import Tabs from './Tabs';
import Tab from './Tab';
import Progress from './Progress';
import Flyout from './Flyout';

const styles = {
  tabsNav: {
    width: '50%'
  },
  dropzoneWrapper: {
    background: colors['blue-grey-50'],
    flex: 1,
    display: 'flex',
    border: `0px dashed ${colors['blue-grey-200']}`
  },
  dropzone: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropzoneInner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropzoneText: {
    fontWeight: 100,
    fontSize: 36,
    lineHeight: '60px',
    marginBottom: 16,
    color: colors['blue-grey-200']
  },
  previewRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 160,
    background: colors['blue-grey-700']
  },
  previewImageWrapper: {
    flex: '1 1 auto',
    maxWidth: 150,
    minHeight: 4,
    maxHeight: 140,
    padding: 0,
    margin: 10,
    background: '#FFF',
    boxShadow: '0px 3px 4px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  previewImage: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: 'auto',
    transition: 'all .3s ease-out'
  },
  previewImageProgress: {
    position: 'absolute',
    background: '#FFF',
    left: 0,
    bottom: 0,
    height: 4,
    width: '100%'
  }
};

@connect(state => ({
  media: state.media,
  files: state.files
}))
class MediaLibrary extends Component {

  static propTypes = {

  }

  static defaultProps = {
    autoLoad: false,
    selectedPageId: null,
    user: {},
    showGalleryTab: true,
    showUploadTab: true,
    onImageUpload: function() {},
    onGallerySelectionAdd: function() {},
    onGallerySelectionRemove: function() {}
  }

  componentDidMount() {
    if (this.props.autoLoad)
      this.props.dispatch(mediaActions.loadMediaItems());
  }

  getGalleryTab() {
    if (this.props.showGalleryTab) {
      return (
        <Tab label='Gallery'>
          <Gallery
            selected={this.props.selected}
            images={this.props.media.toJS().images}
            onImageSelectionAdd={::this.handleGallerySelectionAdd}
            onImageSelectionRemove={::this.handleGallerySelectionRemove}/>
        </Tab>
      );
    } else
      return;
  }

  getUploadTab() {
    if (this.props.showUploadTab) {
      return (
        <Tab label='Upload'>
          <div style={styles.dropzoneWrapper}>
            <Dropzone onDrop={::this.handleFiles} style={styles.dropzone}>
              <div style={styles.dropzoneInner}>
                <div style={{lineHeight: 0}}>
                  <Icon name='cloud_upload' size={90} fill={colors['blue-grey-200']}/>
                </div>
                <div style={styles.dropzoneText}>Drop files here.</div>
              </div>
            </Dropzone>
          </div>

          <div style={styles.previewRow}>
            {!this.props.files.toJS().pendingUploads.length ? <div style={{width: '100%', textAlign: 'center', color: 'rgba(255,255,255,0.5)'}}>New uploads will show here...</div> : null}
            {this.props.files.toJS().pendingUploads.map(upload => {
              return (
                <div style={{position: 'relative'}} key={upload.uuid}>
                  <div id={`flyout-trigger_${upload.uuid}`} style={styles.previewImageWrapper} onClick={e => ::this.refs[`flyout_${upload.uuid}`].show()}>
                    <img style={{...styles.previewImage, opacity: upload.uploadProgress < 1 ? 0.4 : 1}} src={upload.preview}/>
                    <div style={styles.previewImageProgress}>
                      <Progress progress={upload.uploadProgress} failed={upload.failed}/>
                    </div>
                  </div>
                  <Flyout position='above' ref={`flyout_${upload.uuid}`} target={`flyout-trigger_${upload.uuid}`}>
                    <Flex>
                      
                      <Input
                        name='altText'
                        value={upload.altText}
                        label='Alt Text'
                        placeholder='Add an alternative text attribute'/>
                      <br/>
                      <Input
                        name='linkHref'
                        value={upload.linkHref}
                        label='Link Href'
                        placeholder='Add a url to visit when image is clicked'/>
                      <Switch
                        style={{marginTop:16}}
                        value={upload.linkOpensNewWindow}
                        label='Open link in new window'
                        name='linkOpensNewWindow'/>
                      <Switch
                        style={{marginTop:0}}
                        value={upload.social}
                        label='Use as default share image'
                        name='social'/>
                      <br/>
                      <div style={{textAlign: 'right'}}>
                        <Button
                          fill={colors.lightblue500}
                          color='white'>
                          Save
                        </Button>
                      </div>
                    </Flex>
                  </Flyout>
                </div>
              );
            })}
          </div>
        </Tab>
      );
    } else
      return;
  }

  render() {
    return (
      <Tabs
        selectedIndex={0}
        wrapperStyle={{flex: '1', display: 'flex', flexDirection: 'column'}}
        navStyle={styles.tabsNav}
        tabContentStyle={{flex: 1, display: 'flex', flexDirection: 'column'}}
        tabTemplateStyle={{display: 'flex', flexDirection: 'column', flex: 1}}>

        {this.getGalleryTab()}
        {this.getUploadTab()}

      </Tabs>
    );
  }

  handleFiles(files) {
    files = files.map(file => {
      file.uuid = uuid.raw();
      file.author = this.props.user.username;
      file.uploadedTo = this.props.selectedPageId;
      file.uploadProgress = 0;
      return file;
    });
    this.props.dispatch(fileActions.batchUploadImages(files)).then(res => {
      files.forEach(file => {
        const addedImage = this.props.media.get('images').find(image => image.uuid === file.uuid);
        this.props.onImageUpload(addedImage);
      });
    });
  }

  handleGallerySelectionAdd(image) {
    this.props.onGallerySelectionAdd(image);
  }

  handleGallerySelectionRemove(image) {
    this.props.onGallerySelectionRemove(image);
  }

}

export default MediaLibrary;
