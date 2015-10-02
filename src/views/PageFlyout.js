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
import Flyout from './Flyout';
import Icon from './Icon';
import ComponentExample from './ComponentExample';
import PropTable from './PropTable';

class PageFlyout extends React.Component {
  render() {
    return (
      <ScrollView>

        <div style={{background: colors.white}}>

          <FlexBox style={{background: colors.deeppurple500}} align='stretch'>
            <Flex>
              <div style={{padding: 40}}>
                <Text color='#FFF' size='xxxlarge' weight='thin'>{`<Flyout />`}</Text>
                <Text color='#FFF' size='large' weight='thin'>A floating popover-like element.</Text>
              </div>
            </Flex>
            <Flex style={{display: 'flex', justifyContent: 'center'}} align='center'>
              <code style={{color: colors.white, background: Color(colors.black).alpha(0.1).rgbaString(), padding: '12px 24px', borderRadius: 3}}>{`import { Flyout } from 'vplabs-ui';`}</code>
            </Flex>
          </FlexBox>

          <ComponentExample code={
`<Button onClick={::this.showFlyout}>Flyout Above</Button>
<Flyout position='above' ref='myFlyout'>I'm a flyout!</Flyout>

// Call the flyout's 'show' method,
// passing in the clicked element for positioning

showFlyout(e) {
  this.refs.myFlyout(e.currentTarget);
}
`
            }>
            <Flex align='stretch' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
              <FlexBox justify='space-around'>
                <Button preset='info-fill' onClick={e => this.refs.flyout1.show(e.currentTarget)}>Flyout Above</Button>
                <Flyout position='above' ref='flyout1'>I'm a smart flyout : )</Flyout>

                <Button preset='success-fill' onClick={e => this.refs.flyout2.show(e.currentTarget)}>Flyout Right</Button>
                <Flyout position='right' ref='flyout2' bgcolor={colors.lightgreen500} width={200}>
                  <FlexBox dir='column' align='center'>
                    <Icon fill={colors.lightgreen900} size={36} name='question_answer'/>
                    <Text color={colors.white} push='6px 0 0 0'>I'm a fancy flyout!</Text>
                  </FlexBox>
                </Flyout>
              </FlexBox>
              <FlexBox justify='space-around'>
                <Button preset='warn-fill' onClick={e => this.refs.flyout3.show(e.currentTarget)}>Flyout Below</Button>
                <Flyout position='below' ref='flyout3'>I'm a flyout!</Flyout>
                <Button preset='error-fill' onClick={e => this.refs.flyout4.show(e.currentTarget)}>Flyout Left</Button>
                <Flyout position='left' ref='flyout4'>I'm a flyout!</Flyout>
              </FlexBox>
            </Flex>
          </ComponentExample>

        </div>

        <FlexBox justify='center' style={{padding: '60px 0 30px 0', margin: '0 40px'}}>
          <div style={{width: 1024}}>
            <Text size='xxlarge' weight='medium' push='0 0 24px 0'>Properties</Text>

            <PropTable
              rows={[
                {
                  prop: 'bgcolor',
                  types: ['String'],
                  description: 'Set the background color of the flyout. Accepts any CSS color value.'
                },
                {
                  prop: 'position',
                  typeLabel: 'One of:',
                  types: ['above', 'right', 'below', 'left'],
                  description: 'Sets the position of the flyout relative to the trigger. The flyout will attempt to adjust it\'s position if there is not enough space on the left or right of the viewport.'
                },
                {
                  prop: 'width',
                  typeLabel: 'One of type',
                  types: ['String', 'Number'],
                  description: <div>Controls the flyout width. Accepts any CSS width value. Default is <InlineCode>300</InlineCode>.</div>
                },
                {
                  prop: 'closeOnClick',
                  types: ['Boolean'],
                  description: <div>Closes the flyout when clicking inside of it. Default is <InlineCode>false</InlineCode>.</div>
                },
                {
                  prop: 'onClickAway',
                  types: ['Function'],
                  description: 'A callback to be executed when clicking outside of the flyout.'
                }
              ]}
            />

          </div>
        </FlexBox>

        <FlexBox justify='center' style={{padding: '60px 0', margin: '0 40px'}}>
          <div style={{width: 1024}}>
            <Text size='xxlarge' weight='medium' push='0 0 24px 0'>Methods</Text>

            <PropTable
              type='methods'
              rows={[
                {
                  method: <InlineCode>show( target: DOMElement )</InlineCode>,
                  description: 'Shows the flyout. Requires a DOM element to anchor the flyout to, typically the button or element that triggered the component.'
                },
                {
                  method: <InlineCode>hide()</InlineCode>,
                  description: 'Hides the flyout. By default, the flyout hides automatically when clicking anywhere outside of it.'
                }
              ]}
            />

          </div>
        </FlexBox>

      </ScrollView>
    );
  }
};

export default PageFlyout;
