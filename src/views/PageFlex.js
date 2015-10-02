import React from 'react';
import colors from '../theme/colors';
import ScrollView from './ScrollView';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Text from './Text';
import Code from './Code';
import InlineCode from './InlineCode';
import PropTable from './PropTable';

class PageFlex extends React.Component {
  render() {
    const heroStyle = {
      background: colors.lightgreen500,
      padding: 40
    };

    return (
      <ScrollView>
        <FlexBox style={heroStyle} align='center'>
          <div>
            <Text color='#FFF' size='xxxlarge' weight='thin'>{`<Flex />`}</Text>
            <Text color='#FFF' size='large' weight='thin'>A flex item to be used in conjunction with {`<FlexBox/>`}</Text>
          </div>
        </FlexBox>

        <FlexBox align='stretch'>
          <FlexBox pad='40px 60px' align='stretch' style={{background: colors.white, borderBottom: `1px solid ${colors.grey300}`}}>
            <FlexBox align='stretch'>
              <Flex style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
              <Flex style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
              <Flex style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
            </FlexBox>
          </FlexBox>
          <Code languages={['html']} style={{borderBottom: `1px solid ${colors.bluegrey800}`}}>
{`<FlexBox align='stretch'>
  <Flex>Block</Flex>
  <Flex>Block</Flex>
  <Flex>Block</Flex>
</FlexBox>`}
          </Code>
        </FlexBox>

        <FlexBox align='stretch'>
          <FlexBox pad='40px 60px' align='stretch' style={{background: colors.white, borderBottom: `1px solid ${colors.grey300}`}}>
            <FlexBox align='stretch'>
              <Flex flex={3} style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
              <Flex flex={2} style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
              <Flex style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
            </FlexBox>
          </FlexBox>
          <Code languages={['html']} style={{borderBottom: `1px solid ${colors.bluegrey800}`}}>
{`<FlexBox align='stretch'>
  <Flex flex='3 1 auto'>Block</Flex>
  <Flex flex='2 1 auto'>Block</Flex>
  <Flex>Block</Flex>
</FlexBox>`}
          </Code> 
        </FlexBox>

        <FlexBox align='stretch'>
          <FlexBox pad='40px 60px' align='stretch' style={{background: colors.white, borderBottom: `1px solid ${colors.grey300}`}}>
            <FlexBox>
              <Flex align='stretch' style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
              <Flex align='flex-end' style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
              <Flex align='center' style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
              <Flex style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</Flex>
            </FlexBox>
          </FlexBox>          
          <Code languages={['html']} style={{borderBottom: `1px solid ${colors.bluegrey800}`}}>
{`<FlexBox>
<Flex align='stretch'>Block</Flex>
<Flex align='flex-end'>Block</Flex>
<Flex align='center'>Block</Flex>
<Flex>Block</Flex>
</FlexBox>`}
          </Code>
        </FlexBox>

        <FlexBox justify='center' style={{padding: '60px 0'}}>
          <div style={{width: 1024}}>
            <Text size='xxlarge' weight='medium' push='0 0 24px 0'>Properties</Text>

            <PropTable
              rows={[
                {
                  prop: 'flex',
                  typeLabel: 'One of type:',
                  types: ['Number', 'String'],
                  description: <div>This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is <InlineCode>'1 1 auto'</InlineCode>.</div>
                },
                {
                  prop: 'align',
                  typeLabel: 'One of:',
                  types: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
                  description: 'This allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.'
                }
              ]}
            />

          </div>
        </FlexBox>

      </ScrollView>
    );
  }
};

export default PageFlex;
