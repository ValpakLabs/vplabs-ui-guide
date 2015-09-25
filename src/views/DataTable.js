import React, {PropTypes, Component} from 'react/addons';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Link from './Link';
import colors from '../theme/colors.js';
import {dataTableStyles} from './styles';
import ScrollView from './ScrollView';
import Icon from './Icon';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Picture from './Picture';
import Text from './Text';
import Button from './Button';
import moment from 'moment';

class DataTable extends Component {

  render() {
    const {items, sortField, sortOrder, columns} = this.props;

    return (
      <div style={dataTableStyles.base}>
        <div style={{...dataTableStyles.headerRow}}>
          {columns.map((col, index) => {
            return (
              <div
                key={index}
                onClick={e => this.props.onHeaderClick(col.name.toLowerCase())}
                style={{
                  flex: col.flex || 'none',
                  width: col.width || 'auto'
                }}>
                <Text
                  key={index}
                  size='normal'
                  flexAlign='center'
                  weight='medium'
                  color='darkgrey'
                  flex={1}
                  lineHeight='24px'
                  width={col.width || 'auto'}
                  cursor='pointer'
                  onClick={::this.toggleSort(col.name)}>
                  {col.name}
                  {sortField === col.name.toLowerCase() ?
                    <Icon
                      fill={colors['orange-500']}
                      name={sortOrder === 'DESC' ? 'arrow_drop_down' : 'arrow_drop_up'}/> : null}
                </Text>
              </div>
            );
          })}
        </div>

        <CSSTransitionGroup transitionEnterTimeout={200} transitionLeaveTimeout={200} component='div' transitionName='dataTableTransition'>
        {this.props.items.map((item, i) =>
          <div
            key={item[this.props.itemKey]}
            className={this.props.rowClassName || ''}>

            <div style={dataTableStyles.row}>

              {this.props.rowCells.map((cell, cellIndex) =>
                React.cloneElement(cell, {
                  key: `${item[this.props.itemKey]}_${cellIndex}`,
                  item: item,
                  width: columns[cellIndex].width,
                  flex: columns[cellIndex].flex
                })
              )}
            </div>

          </div>
        )}
        </CSSTransitionGroup>
      </div>
    );
  }

  toggleSort() {

  }

}

export default DataTable;

export class Cell extends Component {
  render() {
    return (
      <div style={{
        flex: this.props.flex || 'none',
        width: this.props.width || 'auto'
      }}>
        {this.props.renderfn(this.props.item)}
      </div>
    );
  }
}