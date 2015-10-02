import React, {PropTypes, Component} from 'react';
import config from '../config';
import {connect} from 'react-redux';
import Link from './Link';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import * as pageActions from '../actions/pageActions';
import * as templateActions from '../actions/templateActions';
import * as zoneActions from '../actions/zoneActions';
import * as locationActions from '../actions/locationActions';
import {colors, getRgba} from '../theme/colors';
import PageEditSidebar from './PageEditSidebar.js';
import FittedPage from './FittedPage.js';
import PageEditForm from './PageEditForm';
import ScrollView from './ScrollView';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Header from './Header';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import Tabs from './Tabs';
import Tab from './Tab';
import AltTab from './AltTab';
import Picture from './Picture';
import Box from './Box';
import Switch from './Switch';
import ContentField from './ContentField';
import ImageField from './ImageField';
import DataTable, {Cell} from './DataTable';
import MediaLibrary from './MediaLibrary';
import MarkdownEditor from './MarkdownEditor';
import Dialog from './Dialog';
import Label from './Label';
import Select from './Select';
import Modal from './Modal';
import uuid from 'uuid-lib';

class PageEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mediaModalIsOpen: false,
      selectedTab: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {page, user, zones, location, templates} = this.props; 

    return (
      <FittedPage direction='column'>
        <Header
          bgcolor={colors.bluegrey800}
          style={{
            padding: 0
          }}>
          <Tabs
            selectedIndex={this.state.selectedTab}
            hasContent={false}
            wrapperStyle={{flex: 1, alignSelf: 'flex-end', marginRight: 280}}
            navStyle={{}}
            tabStyle={{flex: '1 0 auto', color: '#FFF'}}
            underlineColor={colors.lightgreen500}
            onChange={selectedTab => ::this.setState({selectedTab})}>
            <Tab label='Meta and Social'/>
            <Tab label='Content Fields'/>
            <Tab label='Images'/>
            <Tab label='Widgets'/>
          </Tabs>
        </Header>
        <FlexBox align='stretch'>
          <Flex>
            <ScrollView>
              <AltTab ref='tab1' selected={this.state.selectedTab === 0}>
                <div style={{padding: 0, width: '100%'}}>
                  <PageEditForm
                    page={page.toJS()}
                    onPageChange={this.props.editSelectedPage}/>
                </div>
              </AltTab>

              <AltTab ref='tab2' selected={this.state.selectedTab === 1}>
                <div style={{width: '100%'}}>
                  <FlexBox style={{padding: 40}}>
                    <Text flexAlign='center' weight='light' size='xlarge' color='darkgrey'>
                      <Icon name='subject' size={24} pushRight={12}/> Content Fields
                    </Text>
                    <Button
                      fill={colors.lightblue500}
                      color='#FFF'
                      icon='add'
                      onClick={e => this.addEntity('fields', {_id: uuid.raw()})}>
                      Add Field
                    </Button>
                  </FlexBox>
                  <div style={{padding: '0 40px'}}>
                    {page.get('fields') && page.get('fields').map((field, i) =>
                      <ContentField
                        key={i}
                        field={field}
                        zoneOptions={this.getZoneOptions()}
                        onChange={::this.editEntity('fields', field)}
                        onRemove={field => ::this.removeEntity('fields', field)} />
                    )}
                  </div>
                </div>
              </AltTab>

              <AltTab ref='tab3' selected={this.state.selectedTab === 2}>
                <div style={{width: '100%'}}>
                  <FlexBox style={{padding: 40}}>
                    <Text flexAlign='center' weight='light' size='xlarge' color='darkgrey'>
                      <Icon name='collections' size={24} pushRight={12}/> Images
                    </Text>
                    <Button
                      fill={colors.lightblue600}
                      color='#FFF'
                      icon='add'
                      onClick={::this.toggleGalleryModal}>
                      Add Image
                    </Button>
                  </FlexBox>
                  <div style={{padding: '0 40px'}}>
                    {page.get('images') && page.get('images').map((image, i) =>
                      <ImageField
                        key={i}
                        image={image}
                        zoneOptions={this.getZoneOptions()}
                        onChange={::this.editEntity('images', image)}
                        onRemove={image => this.removeEntity('images', image)}/>
                    )}
                  </div>
                </div>
              </AltTab>

              <AltTab ref='tab4' selected={this.state.selectedTab === 3}>
                <div style={{padding: 40, flex: 1}}>
                  This section is still being built.
                </div>
              </AltTab>

            </ScrollView>
          </Flex>

          <PageEditSidebar
            page={page}
            user={user}
            templates={templates}
            onPageSaveClick={::this.handlePageSaveClick}
            onDeletePageClick={::this.handleDeletePageClick}
            onSetTemplate={::this.handleSetTemplate}
            onEditSelectedPage={::this.props.editSelectedPage}
            />

          {this.renderModal()}

          <Dialog
            ref='deleteDialog'
            confirmText='Delete Page'
            confirmColor={colors.red700}>
            <Text
              size='large'>
              Are you sure you want to delete this page?
            </Text>
          </Dialog>
        </FlexBox>
      </FittedPage>
    );
  }

  renderModal() {
    const page = this.props.page.toJS();
    const user = this.props.user.toJS();
    return (
      <Modal
        show={this.state.mediaModalIsOpen}
        closeOnOuterClick={true}
        style={{zIndex: 9999, width: '100%', background: getRgba('blue-grey-900', 0.9), fontFamily: 'inherit'}}
        onClose={::this.toggleGalleryModal}
        containerStyle={{
          padding: 0,
          zIndex: 9999,
          margin: '2vh auto 0 auto',
          width: '96vw',
          height: '96vh',
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <div style={{padding: '16px 12px', borderBottom: `0px solid ${colors.grey300}`}}>
          <FlexBox>
            <div style={{margin: '0 12px', fontWeight: 400, fontSize: 18}}>Add Images</div>
            <Button icon='close' color={colors.bluegrey300} onClick={::this.toggleGalleryModal}/>
          </FlexBox>
        </div>

        <MediaLibrary
          autoLoad={true}
          selected={page.images && page.images.map(image => image._id)}
          selectedPageId={page._id}
          user={user}
          onImageUpload={image => this.addEntity('images', image)}
          onGallerySelectionAdd={image => this.addEntity('images', image)}
          onGallerySelectionRemove={image => this.removeEntity('images', image)} />
      </Modal>
    );
  }

  handleSetTemplate(change) {
    const templateId = change.template;
    const selectedTemplate = this.props.templates.toJS().find(template => template._id === templateId);
    this.props.editSelectedPage({template: selectedTemplate});
    this.props.clearFieldZones();
  }

  addEntity(collection, entity) {
    this.props.addPageEntity({
      id: this.props.page.get('_id'),
      collection,
      entity
    });
  }

  editEntity(collection, entity) {
    return (change) => {
      this.props.editPageEntity({
        id: this.props.page.get('_id'),
        entity,
        collection,
        change
      });
    };
  }

  removeEntity(collection, entity) {
    this.props.removePageEntity({
      id: this.props.page.get('_id'),
      collection,
      entity
    });
  }

  toggleGalleryModal() {
    this.setState({mediaModalIsOpen: !this.state.mediaModalIsOpen});
  }

  getZoneOptions() {
    const page = this.props.page;
    const template = page.get('template');
    const zones = this.props.zones.filter(zone => {
      return template && template.get('attachedZones').find(attachedZoneId => attachedZoneId === zone.get('_id'));
    });
    const options = zones.map(zone => ({value: zone.get('_id'), label: zone.get('title')}));
    const newOptions = options.map((option, i) => {
      if (page.get('fields') && page.get('fields').find(field => field.get('zone') === option.value) ||
          page.get('images') && page.get('images').find(image => image.get('zone') === option.value)) {
        option.disabled = true;
      }
      return option;
    });
    return newOptions;
  }

  handlePageSaveClick(e) {
    const {page, user} = this.props;
    if (!page.get('author'))
      this.props.editSelectedPage({author: user.toJS()});
    this.props.saveSelectedPage(page.toJS());
  }

  handleDeletePageClick() {
    const {page, deletePage} = this.props;
    this.refs.deleteDialog.show()
      .then(() => deletePage(page.get('_id')))
      .then(res => this.props.history(null, `${config.appContext}/pages`));
  }

  fetchData() {
    let displayName;
    let {dispatch} = this.context.store;
    if (this.props.params.id) {
      this.props.loadSelectedPage(this.props.params.id).then(() =>
        dispatch(locationActions.loadLocation({ displayName: ['Pages', this.props.page.get('title')] }))
      );
    } else {
      dispatch(locationActions.loadLocation({displayName: ['Pages', 'Create']}));
    }
    this.props.loadAllZones();
    this.props.loadAllTemplates();
  }
}

PageEdit.defaultProps = {
  user: Immutable.Map(),
  zones: Immutable.List(),
  templates: Immutable.List(),
  page: Immutable.Map()
};

PageEdit.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map),
  zones: PropTypes.instanceOf(Immutable.List),
  templates: PropTypes.instanceOf(Immutable.List),
  page: PropTypes.instanceOf(Immutable.Map)
};

PageEdit.contextTypes = {
  store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    page: state.pages.get('selected'),
    zones: state.zones.get('all'),
    templates: state.templates.get('all'),
    user: state.auth.get('user')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...pageActions, ...zoneActions, ...templateActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEdit);
