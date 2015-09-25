import React, {PropTypes, Component} from 'react';
import {colors, getRgba} from '../theme/colors';
import Immutable from 'immutable';
import moment from 'moment';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Text from './Text';
import Label from './Label';
import Select from './Select';
import Button from './Button';

class PageEditSidebar extends Component {
  // shouldComponentUpdate(nextProps) {
  //   const nextPage = nextProps.page.toJS();
  //   const thisPage = this.props.page.toJS();
  //   return !Immutable.is(nextProps.user, this.props.user) ||
  //          !Immutable.is(nextProps.templates, this.props.templates) ||
  //          thisPage.author !== nextPage.author ||
  //          thisPage.created !== thisPage.created ||
  //          thisPage.modified !== thisPage.modified ||
  //          thisPage.status !== thisPage.status ||
  //          thisPage.hasLocalEdits !== thisPage.hasLocalEdits;
  // }

  render() {
      const page = this.props.page.toJS();
      const user = this.props.user.toJS();
      const dateFormat = 'MM/DD/YY, h:mm:ss a';
      const templateOptions = this.props.templates.toJS().map(template => {
        return {
          value: template._id,
          label: template.title
        };
      });
      const statusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
        { value: 'Pending Review', label: 'Pending Review' }
      ];
      const sidebarStyles = {
        width: 260,
        padding: '20px',
        borderLeft: `1px solid ${colors.grey300}`
      };
      const dtAttrs = {
        size: 'normal',
        lineHeight: '24px',
        weight: 'medium',
        width: 70,
        color: colors.grey500
      };
      const ddAttrs = {
        size: 'normal',
        lineHeight: '24px',
        weight: 'normal'
      };

      return (
        <div style={sidebarStyles}>

          <div style={{marginBottom: 20}}>
            <FlexRow align='flex-start' justify='flex-start' style={{marginBottom: 6}}>
              <Label width={70}>Author</Label>
              <Text {...ddAttrs}>{page.author || user.username}</Text>
            </FlexRow>

            {page._id ?
              <FlexRow align='flex-start' justify='flex-start' style={{marginBottom: 6}}>
                <Label width={70}>Created</Label>
                <Text {...ddAttrs}>{moment(page.created).format(dateFormat)}</Text>
              </FlexRow>
            : null}

            {page._id ?
              <FlexRow align='flex-start' justify='flex-start' style={{marginBottom: 0}}>
                <Label width={70}>Modified</Label>
                <Text {...ddAttrs}>{moment(page.modified).format(dateFormat)}</Text>
              </FlexRow>
            : null}

          </div>

          <Select
            label='Status'
            name='status'
            value={page.status || 'Draft'}
            options={statusOptions}
            onChange={::this.props.onEditSelectedPage}/>
          <br/>
          <Select
            label='Page Template'
            name='template'
            value={page.template && page.template._id}
            options={templateOptions}
            onChange={::this.props.onSetTemplate}/>

          <div style={{width: 220, margin: '0 0 20px 0', position: 'fixed', bottom: '0'}}>
            <FlexRow justify='space-between'>
              <Button
                icon='save'
                disabled={!page.hasLocalEdits}
                flex='1'
                color={colors.lightgreen600}
                onClick={::this.props.onPageSaveClick}>Save</Button>
              <Button
                icon='delete'
                flex='1'
                disabled={!page._id}
                color={colors.red700}
                onClick={::this.props.onDeletePageClick}>Delete</Button>
            </FlexRow>
          </div>

        </div>
      );
    }

}

export default PageEditSidebar;

PageEditSidebar.propTypes = {

};

PageEditSidebar.defaultProps = {

};
