import React, {Component, PropTypes} from 'react';
import colors, colors from '../theme/colors';
import Box from './Box';
import Input from './Input';
import Text from './Text';
import Icon from './Icon';
import TextArea from './TextArea';
import Button from './Button';
import FlexBox from './FlexBox';
import Flex from './Flex';
import moment from 'moment';

class PageEditForm extends Component {
  static propTypes = {
    page: PropTypes.object,
    onPageChange: PropTypes.func
  }

  render() {
    const {page={}} = this.props;
    const {social={}} = page;
    return (
      <div style={{
        // display: 'flex',
        // flexWrap: 'wrap'
      }}>

        <Box pad='40px 30px' style={{flex: '1 1 500px', alignItems: 'stretch', borderRight: `1px solid ${colors.grey300}`}}>

          <Text flexAlign='center' weight='light' size='xlarge' color='darkgrey' push='0 0 1.5em 10px'>
            <Icon name='description' size={24} pushRight={12}/> Basic Info
          </Text>

          <FlexBox wrap='wrap'>
            <Flex flex='2 1 250px'>
              <Input
                push='0 10px 24px 10px'
                label='Title'
                name='title'
                value={page.title}
                onChange={::this.handlePageEdit}/>
            </Flex>
            <Flex flex='3 1 250px'>
              <Input
                push='0 10px 24px 10px'
                label='Page Slug'
                name='slug'
                value={page.slug}
                onChange={::this.handlePageEdit}/>
            </Flex>
          </FlexBox>
          <TextArea
            push='0 10px'
            label='Description'
            name='description'
            value={page.description}
            onChange={::this.handlePageEdit}/>
        </Box>

        <Box pad='40px 30px' style={{flex: '1 1 500px', alignItems: 'stretch', borderRight: `1px solid ${colors.grey300}`}}>

          <Text flexAlign='center' weight='light' size='xlarge' color='darkgrey' push='0 0 1.5em 10px'>
            <Icon name='share' size={24} pushRight={12}/> Open Graph Tags
          </Text>

          <FlexBox wrap='wrap'>
            <Flex flex='2 1 250px'>
              <Input
                push='0 10px 24px 10px'
                label='Open Graph Title'
                name='social.og_title'
                value={social.og_title}
                onChange={::this.handlePageEdit}/>
            </Flex>
            <Flex flex='3 1 250px'>
              <Input
                push='0 10px 24px 10px'
                label='Open Graph URL'
                name='social.og_url'
                value={social.og_url}
                onChange={::this.handlePageEdit}/>
            </Flex>
          </FlexBox>
          <TextArea
            push='0 10px'
            label='Open Graph Description'
            name='social.og_description'
            value={social.og_description}
            onChange={::this.handlePageEdit}/>
        </Box>

        <Box pad='40px 30px' style={{flex: '1 1 500px', alignItems: 'stretch', borderRight: `1px solid ${colors.grey300}`}}>

          <Text flexAlign='center' weight='light' size='xlarge' color='darkgrey' push='0 0 1.5em 10px'>
            <Icon name='share' size={24} pushRight={12}/> Twitter Sharing
          </Text>

          <Input
            push='0 10px 24px 10px'
            label='Tweet URL'
            name='social.twitter_url'
            value={social.twitter_url}
            onChange={::this.handlePageEdit}/>
          <TextArea
            push='0 10px'
            label='Tweet Text'
            name='social.twitter_text'
            value={social.twitter_text}
            onChange={::this.handlePageEdit}/>
        </Box>

        <Box pad='40px 30px' style={{flex: '1 1 500px', alignItems: 'stretch', borderRight: `1px solid ${colors.grey300}`}}>

          <Text flexAlign='center' weight='light' size='xlarge' color='darkgrey' push='0 0 1.5em 10px'>
            <Icon name='share' size={24} pushRight={12}/> Pinterest Sharing
          </Text>

          <Input
            push='0 10px 24px 10px'
            label='Pinterest URL'
            name='social.pinterest_url'
            value={social.pinterest_url}
            onChange={::this.handlePageEdit}/>
          <TextArea
            push='0 10px'
            label='Pinterest Description'
            name='social.pinterest_description'
            value={social.pinterest_description}
            onChange={::this.handlePageEdit}/>
        </Box>

        <Box pad='40px 30px' style={{flex: '1 1 500px', alignItems: 'stretch', borderRight: `1px solid ${colors.grey300}`}}>

          <Text flexAlign='center' weight='light' size='xlarge' color='darkgrey' push='0 0 1.5em 10px'>
            <Icon name='share' size={24} pushRight={12}/> Google Plus Sharing
          </Text>
          <Input
            push='0 10px 24px 10px'
            label='Google Plus URL'
            name='social.gplus_url'
            value={social.gplus_url}
            onChange={::this.handlePageEdit}/>
          <TextArea
            push='0 10px'
            label='Google Plus Description'
            name='social.gplus_description'
            value={social.gplus_description}
            onChange={::this.handlePageEdit}/>
        </Box>

      </div>
    );
  }

  handlePageEdit(change) {
    this.props.onPageChange(change);
  }

}

export default PageEditForm;
