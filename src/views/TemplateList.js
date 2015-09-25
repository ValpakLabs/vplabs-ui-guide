import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Link from './Link';
import * as templateActions from '../actions/templateActions';
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

class TemplateList extends Component {

  componentWillMount() {
    this.context.store.dispatch(locationActions.loadLocation({displayName: ['Templates']}));
    this.props.loadAllTemplates();
  }

  render() {
    const {templates} = this.props;
    const editing = templates.get('editing');

    return (
      <ScrollView>

        <div style={{padding: '0 40px 100px 40px'}}>

          <FlexRow style={{padding: '20px 0'}}>

            <Button
              style={{position: 'fixed', bottom: 40, right: 40}}
              icon='create'
              fab={true}
              fill={colors.red700}
              color='#FFF'
              onClick={e => this.props.createTemplate()}>
            </Button>

          </FlexRow>

          <DataTable
            columns={[
              {name: 'Title', flex: 1},
              {name: 'Author', width: 160},
              {name: 'Created', width: 100},
              {name: 'Modified', width: 100}
            ]}
            items={templates.get('all').toJS()}
            itemKey='_id'
            rowClassName='hover-container'
            rowCells={[
              <Cell renderfn={item =>
                <div>
                  <FlexRow justify='flex-start' align='baseline' flex={1} style={{marginRight: '20px'}}>
                    <Link to={`/templates/${item._id}`}>
                      <Text weight='medium' size='large' color='darkblue'>{item.title}</Text>
                    </Link>
                  </FlexRow>
                  <Text size='small' lineHeight='18px' color='darkgrey' style={{paddingRight: 20, marginBottom: 12}}>{item.description}</Text>
                  <div className='show-on-hover' style={{lineHeight: 'normal'}}>
                    <Button size='tiny' icon='edit' color={colors.lightblue900} push='0 20px 0 0'>Edit</Button>
                    <Button size='tiny' icon='delete' color={colors.red700} onClick={::this.handleDeleteClick(item)}>Delete</Button>
                  </div>
                </div>
              }/>,
              <Cell renderfn={item =>
                <Text color='darkgrey' lineHeight='24px' size='small' flexAlign='center'>{item.author.username}</Text>
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
          confirmText='Delete Template'
          confirmColor={colors.red500}
          content={(item) =>
            <Text size='large' weight='light'>
              Are you sure you want to delete "{item.title}"?
            </Text>
          }>
        </Dialog>

      </ScrollView>
    );
  }

  handleDeleteClick(item) {
    return e => {
    }
  }

}

TemplateList.contextTypes = {
  store: PropTypes.object
};

export default connect(
  state => ({
    templates: state.templates
  }),
  dispatch => bindActionCreators(templateActions, dispatch)
)(TemplateList);
