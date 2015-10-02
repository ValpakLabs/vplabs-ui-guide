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
import ComponentExample from './ComponentExample';
import PropTable from './PropTable';

class PageText extends React.Component {
  render() {
    return (
      <ScrollView>

        <div style={{background: colors.white}}>

          <FlexBox style={{background: colors.deeppurple500}} align='stretch'>
            <Flex>
              <div style={{padding: 40}}>
                <Text color='#FFF' size='xxxlarge' weight='thin'>{`<Text />`}</Text>
                <Text color='#FFF' size='large' weight='thin'>A convenient component for setting lines of text.</Text>
              </div>
            </Flex>
            <Flex style={{display: 'flex', justifyContent: 'center'}} align='center'>
              <code style={{color: colors.white, background: Color(colors.black).alpha(0.1).rgbaString(), padding: '12px 24px', borderRadius: 3}}>{`import { Text } from 'vplabs-ui';`}</code>
            </Flex>
          </FlexBox>

          <ComponentExample code={
`<Text size='mega' italic={true}>The quick, dirty fox...</Text>
<Text size='xxlarge' weight='thin'>The quick, dirty fox...</Text>
<Text color={colors.lightblue500} lineHeight='48px'>The quick, dirty fox...</Text>
<Text size='small' weight='bold'>The quick, dirty fox...</Text>`
            }>
            <Flex style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 40}}>
              <Text size='mega' italic={true}>The quick, dirty fox...</Text>
              <Text size='xxlarge' weight='thin'>The quick, dirty fox...</Text>
              <Text color={colors.lightblue500} lineHeight='48px'>The quick, dirty fox...</Text>
              <Text size='small' weight='bold'>The quick, dirty fox is really dirty.</Text>
            </Flex>
          </ComponentExample>

        </div>

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
