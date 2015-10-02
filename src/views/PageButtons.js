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

class PageButtons extends React.Component {
  render() {
    return (
      <ScrollView>

        <div style={{background: colors.white}}>

          <FlexBox style={{background: colors.deeppurple500}} align='stretch'>
            <Flex>
              <div style={{padding: 40}}>
                <Text color='#FFF' size='xxxlarge' weight='thin'>{`<Button />`}</Text>
                <Text color='#FFF' size='large' weight='thin'>A button element...obviously.</Text>
              </div>
            </Flex>
            <Flex style={{display: 'flex', justifyContent: 'center'}} align='center'>
              <code style={{color: colors.white, background: Color(colors.black).alpha(0.1).rgbaString(), padding: '12px 24px', borderRadius: 3}}>{`import { Button } from 'vplabs-ui';`}</code>
            </Flex>
          </FlexBox>

          <ComponentExample code={
`<Button>Press</Button>
<Button preset='success'>Press</Button>
<Button preset='warn'>Press</Button>
<Button preset='error'>Press</Button>`
            }>
            <Button>Press</Button>
            <Button preset='success'>Press</Button>
            <Button preset='warn'>Press</Button>
            <Button preset='error'>Press</Button>
          </ComponentExample>

          <ComponentExample code={
`<Button preset='info-fill'>Press</Button>
<Button preset='success-fill'>Press</Button>
<Button preset='warn-fill'>Press</Button>
<Button preset='error-fill'>Press</Button>`
            }>
            <Button preset='info-fill'>Press</Button>
            <Button preset='success-fill'>Press</Button>
            <Button preset='warn-fill'>Press</Button>
            <Button preset='error-fill'>Press</Button>
          </ComponentExample>

          <ComponentExample code={
`<Button fab={true} icon='room' preset='info-fill'/>
<Button fab={true} icon='done' preset='success-fill'/>
<Button fab={true} icon='feedback' preset='warn-fill'/>
<Button fab={true} icon='delete' preset='error-fill' shadow={false}/>`
            }>
            <Button fab={true} icon='room' preset='info-fill'/>
            <Button fab={true} icon='done' preset='success-fill'/>
            <Button fab={true} icon='feedback' preset='warn-fill'/>
            <Button fab={true} icon='delete' preset='error-fill' shadow={false}/>
          </ComponentExample>

        </div>

        <FlexBox justify='center' style={{padding: '60px 0'}}>
          <div style={{width: 1024}}>
            <Text size='xxlarge' weight='medium' push='0 0 24px 0'>Properties</Text>

            <PropTable
              rows={[
                {
                  prop: 'fill',
                  types: ['String'],
                  description: <div>Set the button's background color. Accepts any CSS color value. Default is <InlineCode>'transparent'</InlineCode>.</div>
                },
                {
                  prop: 'color',
                  types: ['String'],
                  description: <div>Set the button's text color. Accepts any CSS color value. Default is <InlineCode>'#000000'</InlineCode>.</div>
                },
                {
                  prop: 'preset',
                  typeLabel: 'One of',
                  types: ['default', 'info', 'info-fill', 'success', 'success-fill', 'warn', 'warn-fill', 'error', 'error-fill'],
                  description: 'Preset background and text color combinations.'
                },
                {
                  prop: 'icon',
                  types: ['String'],
                  description: <div>Adds an icon to the button. Icons are from Google's <a className='link' href='https://www.google.com/design/icons/' target='_blank'>Material Design Icons</a>.</div>
                },
                {
                  prop: 'flex',
                  typeLabel: 'One of type:',
                  types: ['Number', 'String'],
                  description: <div>This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is <InlineCode>'none'</InlineCode>.</div>
                },
                {
                  prop: 'push',
                  typesLabel: 'One of type:',
                  types: ['Number', 'String'],
                  description: <div>A convenience property for adding margins. Accepts a number for all sides or CSS shorthand string for each side.</div>
                },
                {
                  prop: 'shadow',
                  types: ['Boolean'],
                  description: <div>Enable/disable the button's shadow. Default is <InlineCode>false</InlineCode> for standrad buttons and <InlineCode>true</InlineCode> for floating (FAB) buttons.</div>
                },
                {
                  prop: 'disabled',
                  types: ['Boolean'],
                  description: 'Disables the button.'
                },
                {
                  prop: 'onClick',
                  types: ['Function'],
                  description: 'A callback to handle button clicks.'
                }
              ]}
            />

          </div>
        </FlexBox>

      </ScrollView>
    );
  }
};

export default PageButtons;
