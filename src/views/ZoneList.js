import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Link from './Link';
import * as zoneActions from '../actions/zoneActions';
import * as locationActions from '../actions/locationActions';
import {colors, getRgba} from '../theme/colors';
import DataTable, {Cell} from './DataTable';
import ScrollView from './ScrollView';
import Icon from './Icon';
import Input from './Input';
import TextArea from './TextArea';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Dialog from './Dialog';
import Text from './Text';
import Select from './Select';
import Button from './Button';
import moment from 'moment';
import Modal from './Modal';

class ZoneList extends Component {
  state = {
    zoneModalIsOpen: false
  }

  componentWillMount() {
    this.context.store.dispatch(locationActions.loadLocation({displayName: ['Zones']}));
    this.props.loadAllZones();
  }

  render() {
    const {zones} = this.props;
    const editing = zones.get('editing');

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
                    {value: 'Published', label: 'Published'},
                    {value: 'Draft', label: 'Draft'},
                    {value: 'Pending Review', label: 'Pending Review'}
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

            <Button
              style={{position: 'fixed', bottom: 40, right: 40}}
              icon='create'
              fab={true}
              fill={colors.red700}
              color='#FFF'
              onClick={::this.handleCreateZone}>
            </Button>

          </FlexRow>

          <DataTable
            columns={[
              {name: 'Title', flex: 1},
              {name: 'Identifier', width: 160},
              {name: 'Created', width: 100},
              {name: 'Modified', width: 100}
            ]}
            onHeaderClick={field => ::this.toggleSort(field)}
            items={zones.get('all').toJS()}
            itemKey='_id'
            rowClassName='hover-container'
            rowCells={[
              <Cell renderfn={item =>
                <div>
                  <FlexRow justify='flex-start' align='baseline' flex={1} style={{marginRight: '20px'}}>
                    <Link to={`/zones/${item._id}`}>
                      <Text weight='medium' size='large' color='darkblue'>{item.title}</Text>
                    </Link>
                  </FlexRow>
                  <Text size='small' lineHeight='18px' color='darkgrey' style={{paddingRight: 20, marginBottom: 12}}>{item.description}</Text>
                  <div className='show-on-hover' style={{lineHeight: 'normal'}}>
                    <Button size='tiny' icon='edit' color={colors.lightblue900} push='0 20px 0 0'>Edit</Button>
                    <Button size='tiny' icon='delete' color={colors.red700} onClick={::this.handleDeleteZoneClick(item)}>Delete</Button>
                  </div>
                </div>
              }/>,
              <Cell renderfn={item =>
                <Text color='darkgrey' lineHeight='24px' size='small' flexAlign='center'>
                  {item.identifier}
                </Text>
              }/>,
              <Cell renderfn={item =>
                <div>
                  <Text size='small' lineHeight='24px' color='darkgrey'>{moment(item.created).format('MM/DD/YY')}</Text>
                  <Text size='small' color='darkgrey'>{moment(item.created).format('h:mm:ss a')}</Text>
                </div>
              }/>,
              <Cell renderfn={item =>
                <div>
                  <Text size='small' lineHeight='24px' color='darkgrey'>{moment(item.modified).format('MM/DD/YY')}</Text>
                  <Text size='small' color='darkgrey'>{moment(item.modified).format('h:mm:ss a')}</Text>
                </div>
              }/>
            ]}/>
        </div>

        <Dialog
          ref='deleteDialog'
          confirmText='Delete Zone'
          confirmColor={colors.red500}
          content={(item) =>
            <Text size='large' weight='light'>
              Are you sure you want to delete "{item.title}"?
            </Text>
          }>
        </Dialog>

        <Modal
          show={this.state.zoneModalIsOpen}
          closeOnOuterClick={true}
          style={{background: colors.bluegrey900}}
          onClose={::this.closeModal}
          containerStyle={{
            padding: 0,
            margin: '20vh auto 0 auto',
            width: '800px',
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flex: 1,
            flexDirection: 'column'
          }}>
          <div style={{padding: '16px 12px', borderBottom: `0px solid ${colors.grey300}`}}>
            <FlexRow>
              <div style={{margin: '0 12px', fontWeight: 400, fontSize: 18}}>Create Zone</div>
              <Button icon='close' color={colors.bluegrey300} onClick={::this.closeModal}/>
            </FlexRow>
          </div>

          <FlexRow dir='column' style={{background: colors.grey100, width: '100%'}}>

              <div style={{padding: 40, width: '100%'}}>
                <FlexRow>
                  <Flex push='0 10px 24px 0'>
                    <Input
                      name='title'
                      value={editing.get('title')}
                      label='Title'
                      placeholder='Add a field title'
                      onChange={change => this.props.editZone(change)}/>
                  </Flex>
                  <Flex push='0 0 24px 10px'>
                    <Input
                      name='identifier'
                      value={editing.get('identifier')}
                      label='Template Identifier'
                      placeholder='Add a field identifier to be used in templates'
                      onChange={change => this.props.editZone(change)}/>
                  </Flex>
                </FlexRow>
                <TextArea
                  name='description'
                  value={editing.get('description')}
                  label='Description'
                  placeholder='Add a short description'
                  onChange={change => this.props.editZone(change)}/>

                <FlexRow justify='flex-end' style={{marginTop: 40}}>
                  <Button
                    push='0 20px 0 0'
                    onClick={::this.handleCancelCreateZone}>
                    Cancel
                  </Button>
                  <Button
                    fill={colors.lightgreen500}
                    color='#FFF'
                    icon='check'
                    onClick={::this.handleSaveNewZone}>
                    Save
                  </Button>
                </FlexRow>
              </div>

          </FlexRow>

        </Modal>

      </ScrollView>
    );
  }

  handleSaveNewZone() {
    // validate
    const zone = this.props.zones.get('editing');
    this.props.saveZone(zone);
  }

  handleCancelCreateZone() {
    this.setState({zoneModalIsOpen: false});
  }

  handleDeleteZoneClick(zone) {
    return () => {
      this.refs.deleteDialog.show(zone)
        .then(() => this.props.deleteZone(zone._id));
    };
  }

  handleCreateZone() {
    this.props.createZone();
    this.setState({zoneModalIsOpen: true});
  }

  showModal() {
    this.setState({zoneModalIsOpen: true});
  }

  closeModal() {
    this.setState({zoneModalIsOpen: false});
  }

}

ZoneList.contextTypes = {
  store: PropTypes.object
};

export default connect(
  state => ({
    zones: state.zones
  }),
  dispatch => bindActionCreators(zoneActions, dispatch)
)(ZoneList);
