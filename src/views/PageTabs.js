import React from 'react';
import Color from 'color';
import colors from '../theme/colors';
import ScrollView from './ScrollView';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Text from './Text';
import Code from './Code';
import InlineCode from './InlineCode';
import Button from './Button';
import Icon from './Icon';
import Tabs from './Tabs';
import Tab from './Tab';
import ComponentExample from './ComponentExample';
import PropTable from './PropTable';

class PageText extends React.Component {
  render() {
    return (
      <ScrollView>

        <FlexBox style={{background: colors.deeppurple500}} align='stretch'>
          <Flex>
            <div style={{padding: 40}}>
              <Text color='#FFF' size='xxxlarge' weight='thin'>{`<Tabs />`}</Text>
              <Text color='#FFF' size='large' weight='thin'>A component for rendering tabbed content.</Text>
            </div>
          </Flex>
          <Flex style={{display: 'flex', justifyContent: 'center'}} align='center'>
            <code style={{color: colors.white, background: Color(colors.black).alpha(0.1).rgbaString(), padding: '12px 24px', borderRadius: 3}}>{`import { Tabs, Tab } from 'vplabs-ui';`}</code>
          </Flex>
        </FlexBox>

        <ComponentExample code={
`<Tabs>
  <Tab label='Tab 1'>Tab 1</Tab>
  <Tab label='Tab 2'>Tab 2</Tab>
  <Tab label='Tab 3'>Tab 3</Tab>
</Tabs>`
          }>
          <Flex style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: -20}}>
            <Tabs>
              <Tab label='Tab 1'>
                <FlexBox align='center' justify='center' style={{width: '100%', height: 200}}>
                  <Text size='xxxlarge' weight='thin'>Tab 1</Text>
                </FlexBox>
              </Tab>
              <Tab label='Tab 2'>
                <FlexBox align='center' justify='center' style={{width: '100%', height: 200}}>
                  <Text size='xxxlarge' weight='thin'>Tab 2</Text>
                </FlexBox>
              </Tab>
              <Tab label='Tab 3'>
                <FlexBox align='center' justify='center' style={{width: '100%', height: 200}}>
                  <Text size='xxxlarge' weight='thin'>Tab 3</Text>
                </FlexBox>
              </Tab>
            </Tabs>
          </Flex>
        </ComponentExample>



        <FlexBox justify='center' style={{padding: '60px 0 30px 0', margin: '0 40px'}}>
          <div style={{width: 1024}}>
            <Text size='xxlarge' weight='medium' push='0 0 24px 0'>Properties</Text>

            <PropTable
              rows={[
                {
                  prop: 'size',
                  typeLabel: 'One of:',
                  types: [
                    'tiny',
                    'small',
                    'normal',
                    'large',
                    'xlarge',
                    'xxlarge',
                    'xxxlarge',
                    'mega',
                    'xmega',
                    'xxmega',
                    'xxxmega'
                  ],
                  description: 'Sets the text size from one of several predefined sizes. Also accepts a number or CSS size value.'
                },
                {
                  prop: 'weight',
                  typeLabel: 'One of:',
                  types: [
                    'thin',
                    'light',
                    'normal',
                    'medium',
                    'bold',
                    'ultra'
                  ],
                  description: 'Sets the font weight.'
                },
                {
                  prop: 'color',
                  types: ['String'],
                  description: 'Sets the text color. Accepts any CSS color value.'
                },
                {
                  prop: 'lineHeight',
                  types: ['String'],
                  description: 'Sets the line-height. Accept any CSS size value.'
                },
                {
                  prop: 'align',
                  types: ['String'],
                  description: 'Sets the text-align property.'
                },
                {
                  prop: 'letterSpacing',
                  typeLabel: 'One of type:',
                  types: ['String', 'Number'],
                  description: 'Sets the letter-spacing property. Accepts and CSS size value.'
                },
                {
                  prop: 'push',
                  typeLabel: 'One of type:',
                  types: ['String', 'Number'],
                  description: 'Sets the margin property. Accepts a number for all sides or a string shorthand for all sides.'
                },
                {
                  prop: 'italic',
                  types: ['Boolean'],
                  description: 'Sets font-style to "italic"'
                },
                {
                  prop: 'transform',
                  types: ['String'],
                  description: 'Setsthe text-transform property.'
                },
                {
                  prop: 'display',
                  types: ['String'],
                  description: 'Sets the display property of the text.'
                },
                {
                  prop: 'flexAlign',
                  types: ['Boolean'],
                  description: 'Set the element to flex display and center align\'s child elements horizontally. Useful for setting an icon along side text within the compoent.'
                },
                {
                  prop: 'flex',
                  types: ['Boolean'],
                  description: 'Set the display property to "flex"'
                },
                {
                  prop: 'width',
                  typeLabel: 'One of type:',
                  types: ['String', 'Number'],
                  description: 'Controls the width of the text element. Default is "auto".'
                },
                {
                  prop: 'height',
                  typeLabel: 'One of type:',
                  types: ['String', 'Number'],
                  description: 'Controls the width of the text element. Default is "auto".'
                }
              ]}
            />

          </div>
        </FlexBox>

      </ScrollView>
    );
  }
};

export default PageText;
