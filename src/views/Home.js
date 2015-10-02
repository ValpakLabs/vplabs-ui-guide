import React from 'react';
import colors from '../theme/colors';
import ScrollView from './ScrollView';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Text from './Text';
import Code from './Code';
import ComponentExample from './ComponentExample';

class Home extends React.Component {
  render() {
    const heroStyle = {
      background: `linear-gradient(to top, ${colors.amber500} 0%, ${colors.amber700} 100%)`,
      height: 500
    };

    return (
      <ScrollView>
        <FlexBox style={heroStyle} justify='center' align='center'>
          <Text color='#FFF' size='xmega' weight='thin'>ValpakLabs Component Guide</Text>
        </FlexBox>

        <ComponentExample code={
`import React from 'react';
import {FlexBox, Text} from 'vplabs-ui';

class App extends React.Component {
  render() {
    return (
      <FlexBox>
        <Text>Hello, World!</Text>
      </FlexBox>
    );
  }
}`
          }>
          <Flex style={{padding: 40}}>
            <Text size='xxlarge' weight='medium'>Get the module.</Text>
            <pre style={{background: colors.grey100, width: '100%', borderRadius: 3, padding: '12px 18px'}}>
              <code className='javascript'>$ npm install vplabs-ui</code>
            </pre>
          </Flex>
        </ComponentExample>

        <FlexBox justify='center' style={{padding: '120px 0'}}>
          <div style={{width: 1024}}>
            <Text size='xxlarge' weight='medium'>Use the components.</Text>
          </div>
        </FlexBox>

      </ScrollView>
    );
  }
};

export default Home;
