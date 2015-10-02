import React, {PropTypes, Component} from 'react';
import config from '../config';
import {connect} from 'react-redux';
import Link from './Link';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import * as templateActions from '../actions/templateActions';
import * as zoneActions from '../actions/zoneActions';
import * as locationActions from '../actions/locationActions';
import {colors, getRgba} from '../theme/colors';
import FittedPage from './FittedPage.js';
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
import Modal from 'simple-react-modal';
import moment from 'moment';
import uuid from 'uuid-lib';

class TemplateEdit extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    let displayName;
    const {dispatch} = this.context.store;
    const {loadLocation} = locationActions;
    if (this.props.params.id) {
      this.props.loadTemplate(this.props.params.id).then(() => {
        dispatch(loadLocation({displayName: ['Templates', this.props.template.get('title')]}));
      });
    } else {
      dispatch(loadLocation({displayName: ['Templates', 'Create']}));
    }
    this.props.loadAllZones();
  }

  render() {
    const {template, zones} = this.props;

    const sidebarStyles = {
      width: 260,
      padding: '20px',
      borderLeft: `1px solid ${colors.grey300}`
    };

    return (
      <FittedPage>

        <FlexBox align='stretch'>
          <Flex>
            <ScrollView>

              <div style={{padding: 40}}>
                <Input
                  size='large'
                  name='title'
                  push='0 0 24px 0'
                  value={template.get('title')}
                  placeholder='Template Name'
                  onChange={change => this.props.editTemplate(change)}/>

                <Select
                  label='Attached Zones'
                  multi={true}
                  name='attachedZones'
                  options={this.getZonesList()}
                  value={template.get('attachedZones') && template.get('attachedZones').toJS().join(',')}
                  onChange={::this.handleAddZones}/>
              </div>

            </ScrollView>
          </Flex>

          <div style={sidebarStyles}>
            <div style={{width: 220, margin: '0 0 20px 0', position: 'fixed', bottom: '0'}}>
              <FlexBox justify='space-between'>
                <Button
                  icon='save'
                  disabled={template && !template.get('hasLocalEdits')}
                  flex='1'
                  color={colors.lightgreen600}
                  onClick={::this.handleSaveClick}>Save</Button>
                <Button
                  icon='delete'
                  flex='1'
                  disabled={template && !template.get('_id')}
                  color={colors.red700}
                  onClick={::this.handleDeleteClick}>Delete</Button>
              </FlexBox>
            </div>
          </div>
        </FlexBox>

      </FittedPage>
    );
  }

  getZonesList() {
    if (!this.props.zones)
      return [];
    return this.props.zones.toJS().map((zone, i) => ({
      key: i,
      value: zone._id,
      label: zone.title
    }));
  }

  handleAddZones(change) {
    const zoneIds = change.attachedZones.map(zone => zone.value);
    this.props.setZones(zoneIds);
  }

  handleSaveClick(e) {
    const {template, user} = this.props;
    if (!template.get('author'))
      this.props.editTemplate({author: user.toJS()});
    this.props.saveTemplate(template.toJS());
  }

  handleDeleteClick() {
    const {template, deleteTemplate} = this.props;
    this.refs.deleteDialog.show()
      .then(() => deleteTemplate(template.get('_id')))
      .then(res => this.context.router.transitionTo(`${config.appContext}/templates`));
  }
}

TemplateEdit.defaultProps = {
  user: Immutable.Map(),
  zones: Immutable.List(),
  template: Immutable.Map()
};

TemplateEdit.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map),
  zones: PropTypes.instanceOf(Immutable.List),
  template: PropTypes.instanceOf(Immutable.Map)
};

TemplateEdit.contextTypes = {
  store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    template: state.templates.get('editing'),
    zones: state.zones.get('all'),
    user: state.auth.get('user')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...templateActions, ...zoneActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEdit);
