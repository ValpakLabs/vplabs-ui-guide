import React from 'react';
import colors from '../theme/colors';
import ScrollView from './ScrollView';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Text from './Text';
import Code from './Code';
import ComponentExample from './ComponentExample';
import InlineCode from './InlineCode';
import {Table, Row, Cell} from './Table';

class PageFlexBox extends React.Component {
  render() {
    const heroStyle = {
      background: colors.lightgreen500,
      padding: 40
    };

    return (
      <ScrollView>
        <FlexBox style={heroStyle} align='center'>
          <div>
            <Text color='#FFF' size='xxxlarge' weight='thin'>{`<FlexBox />`}</Text>
            <Text color='#FFF' size='large' weight='thin'>A layout container for working with the flexbox CSS model.</Text>
          </div>
        </FlexBox>

        <ComponentExample code={
`<FlexBox>
  <div>Block</div>
  <div>Block</div>
  <div>Block</div>
</FlexBox>`
          }>
          <FlexBox flex={1} style={{alignSelf: 'stretch'}}>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
          </FlexBox>
        </ComponentExample>

        <ComponentExample code={
`<FlexBox justify='space-between' align='center'>
  <div>Block</div>
  <div>Block</div>
  <div>Block</div>
</FlexBox>`
          }>
          <FlexBox flex={1} justify='space-between' align='center'>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
          </FlexBox>
        </ComponentExample>

        <ComponentExample code={
`<FlexBox dir='column'>
  <div>Block</div>
  <div>Block</div>
  <div>Block</div>
</FlexBox>`
          }>
          <FlexBox flex={1} dir='column'>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
          </FlexBox>
        </ComponentExample>

        <ComponentExample code={
`<FlexBox dir='column' align='stretch'>
  <div>Block</div>
  <div>Block</div>
  <div>Block</div>
</FlexBox>`
          }>
          <FlexBox flex={1} dir='column' align='stretch'>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
            <div style={{margin: 1, padding: '4px 8px', background: colors.red100}}>Block</div>
          </FlexBox>
        </ComponentExample>

        <FlexBox justify='center' style={{padding: '60px 0'}}>
          <div style={{width: 1024}}>
            <Text size='xxlarge' weight='medium' push='0 0 24px 0'>Properties</Text>
            <Table>
              <Row>
                <Cell width={130} style={{fontWeight: 500}}>Property</Cell>
                <Cell width={200} style={{fontWeight: 500}}>Type</Cell>
                <Cell style={{fontWeight: 500}}>Description</Cell>
              </Row>
              <Row>
                <Cell>dir</Cell>
                <Cell>
                  <div style={{fontSize: 12, fontStyle: 'italic', color: colors.grey600, marginBottom: 6}}>One of:</div>
                  <div><InlineCode>'row'</InlineCode></div>
                  <div><InlineCode>'column'</InlineCode></div>
                </Cell>
                <Cell>Sets the flex-direction property.</Cell>
              </Row>
              <Row>
                <Cell>flex</Cell>
                <Cell>
                  <div style={{fontSize: 12, fontStyle: 'italic', color: colors.grey600, marginBottom: 6}}>One of type:</div>
                  <div><InlineCode>Number</InlineCode></div>
                  <div><InlineCode>String</InlineCode></div>
                </Cell>
                <Cell>This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is <InlineCode>'1 1 100%'</InlineCode>.</Cell>
              </Row>
              <Row>
                <Cell>justify</Cell>
                <Cell>
                  <div style={{fontSize: 12, fontStyle: 'italic', color: colors.grey600, marginBottom: 6}}>One of:</div>
                  <div><InlineCode>'flex-start'</InlineCode></div>
                  <div><InlineCode>'flex-end'</InlineCode></div>
                  <div><InlineCode>'center'</InlineCode></div>
                  <div><InlineCode>'space-between'</InlineCode></div>
                  <div><InlineCode>'space-around'</InlineCode></div>
                </Cell>
                <Cell>Sets the alignment across the main axis.</Cell>
              </Row>
              <Row>
                <Cell>align</Cell>
                <Cell>
                  <div style={{fontSize: 12, fontStyle: 'italic', color: colors.grey600, marginBottom: 6}}>One of:</div>
                  <div><InlineCode>'flex-start'</InlineCode></div>
                  <div><InlineCode>'flex-end'</InlineCode></div>
                  <div><InlineCode>'center'</InlineCode></div>
                  <div><InlineCode>'stretch'</InlineCode></div>
                  <div><InlineCode>'baseline'</InlineCode></div>
                </Cell>
                <Cell>Defines the default behavior for how flex items are laid out along the cross axis on the current line.</Cell>
              </Row>
              <Row>
                <Cell>wrap</Cell>
                <Cell>
                  <div style={{fontSize: 12, fontStyle: 'italic', color: colors.grey600, marginBottom: 6}}>One of:</div>
                  <div><InlineCode>'nowrap'</InlineCode></div>
                  <div><InlineCode>'wrap'</InlineCode></div>
                  <div><InlineCode>'wrap-reverse'</InlineCode></div>
                </Cell>
                <Cell>By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property. Direction also plays a role here, determining the direction new lines are stacked in.</Cell>
              </Row>
            </Table>
          </div>
        </FlexBox>

      </ScrollView>
    );
  }
};

export default PageFlexBox;
