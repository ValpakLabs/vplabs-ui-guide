import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Link from './Link';
import {pageStatusSelector} from '../reducers/pages';
import * as pageActions from '../actions/pageActions';
import * as locationActions from '../actions/locationActions';
import colors from '../theme/colors';
import DataTable, {Cell} from './DataTable';
import ScrollView from './ScrollView';
import Icon from './Icon';
import FlexRow from './FlexRow';
import Dialog from './Dialog';
import Text from './Text';
import Select from './Select';
import Button from './Button';
import moment from 'moment';

class PageList extends Component {

  componentWillMount() {
    this.props.loadLocation({displayName: ['Pages']});
    this.props.loadAllPages();
  }

  render() {
    const {pages} = this.props;
    const sortField = pages.get('sortField');
    const sortOrder = pages.get('sortOrder');

    return (
      <ScrollView>

        <div style={{padding: '0 40px 100px 40px'}}>

          <FlexRow style={{padding: '20px 0'}}>

            <FlexRow justify='flex-start'>
              <div style={{width: 200, marginRight: 10}}>
                <Select
                  name='status'
                  placeholder='Filter by Status'
                  value={this.props.statusFilter}
                  onChange={::this.props.filterPages}
                  options={[
                    {value: 'Published', label: 'Published'},
                    {value: 'Draft', label: 'Draft'},
                    {value: 'Pending Review', label: 'Pending Review'}
                  ]}/>
              </div>
            </FlexRow>

            <div>
              <Button
                color={pages.get('expandedListDisplay') ? colors.grey600 : colors.blue500}
                icon='view_headline'
                onClick={e => this.props.toggleExpandedListDisplay(false)}/>
              <Button
                color={pages.get('expandedListDisplay') ? colors.blue500 : colors.grey600}
                icon='view_list'
                onClick={e => this.props.toggleExpandedListDisplay(true)}/>
            </div>

            <Button
              style={{position: 'fixed', bottom: 40, right: 40}}
              icon='create'
              fab={true}
              fill={colors.red700}
              color='#FFF'
              onClick={e => this.props.createPage()}>
            </Button>

          </FlexRow>

          <DataTable
            columns={[
              {name: 'Title', flex: 1},
              {name: 'User', width: 160},
              {name: 'Created', width: 100},
              {name: 'Modified', width: 100}
            ]}
            onHeaderClick={field => ::this.toggleSort(field)}
            sortField={sortField}
            sortOrder={sortOrder}
            items={this.props.filteredPages.toJS()}
            itemKey='_id'
            rowClassName='hover-container'
            rowCells={[
              <Cell renderfn={item =>
                <div style={{display: pages.get('expandedListDisplay') ? 'block' : 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <FlexRow justify='flex-start' align='baseline' flex={pages.get('expandedListDisplay') ? 1 : 'none'} style={{marginRight: '20px'}}>
                    <Link to={`/pages/${item._id}`}>
                      <Text weight='medium' size='large' color='darkblue'>{item.title}</Text>
                    </Link>
                    {item.status !== 'Published' ?
                      <Text weight='bold' size='normal' push='0 0 0 0.5em' color={colors.grey800}>// {item.status}</Text>
                      : null}
                  </FlexRow>

                  {pages.get('expandedListDisplay') ?
                    <Text size='small' lineHeight='18px' color='darkgrey' style={{paddingRight: 20, marginBottom: 12}}>{item.description}</Text>
                    : null}

                  <div className='show-on-hover' style={{lineHeight: 'normal'}}>
                    <Button size='tiny' icon='edit' color={colors.lightblue900} push='0 20px 0 0'>
                      <Link to={`/pages/${item._id}`}>edit</Link>
                    </Button>
                    <Button size='tiny' icon='delete' color={colors.red700} onClick={::this.handleDeletePageClick(item)}>Delete</Button>
                  </div>
                </div>
              }/>,
              <Cell renderfn={item =>
                <Text color='darkgrey' lineHeight='24px' size='small' flexAlign='center'>
                  <Icon name='person' fill={colors.bluegrey400} size={16} pushRight={3}/>{item.author}
                </Text>
              }/>,
              <Cell renderfn={item =>
                <div>
                  <Text size='small' lineHeight='24px' color='darkgrey'>{moment(item.created).format('MM/DD/YY')}</Text>
                  {pages.get('expandedListDisplay') ? <Text size='small' color='darkgrey'>{moment(item.created).format('h:mm:ss a')}</Text> : null}
                </div>
              }/>,
              <Cell renderfn={item =>
                <div>
                  <Text size='small' lineHeight='24px' color='darkgrey'>{moment(item.modified).format('MM/DD/YY')}</Text>
                  {pages.get('expandedListDisplay') ? <Text size='small' color='darkgrey'>{moment(item.modified).format('h:mm:ss a')}</Text> : null}
                </div>
              }/>
            ]}/>
        </div>

        <Dialog
          ref='deleteDialog'
          confirmText='Delete Page'
          confirmColor={colors.red700}
          content={(item) =>
            <Text size='large'>Are you sure you want to delete "{item.title}"?</Text> }>
        </Dialog>

      </ScrollView>
    );
  }

  toggleSort(sort) {
    const order = this.props.pages.get('sortOrder') === 'ASC' ? 'DESC' : 'ASC';
    this.props.sort({sort, order});
  }

  handleDeletePageClick(page) {
    return () => {
      this.refs.deleteDialog.show(page)
        .then(() => this.props.deletePage(page._id));
    };
  }

}

PageList.contextTypes = {
  store: PropTypes.object
};

export default connect(
  state => ({
    pages: state.pages,
    filteredPages: pageStatusSelector(state),
    statusFilter: state.pages.get('filter') && state.pages.get('filter').status
  }),
  dispatch => bindActionCreators({...pageActions, ...locationActions}, dispatch)
)(PageList);
