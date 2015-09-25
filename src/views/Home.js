import React from 'react';
import colors from '../theme/colors';
import ScrollView from './ScrollView';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Text from './Text';

class Home extends React.Component {
  render() {
    const heroStyle = {
      background: colors.lightgreen500,
      height: 500
    };

    return (
      <ScrollView>
        <FlexRow style={heroStyle} justify='center'>
          <Text color='#FFF' size='xmega' weight='thin'>ValpakLabs Component Guide</Text>
        </FlexRow>

        <FlexRow>
          <FlexRow justify='center' style={{height: 300, background: colors.white}}>
            Left Side
          </FlexRow>

          <FlexRow justify='center' style={{height: 300, background: colors.bluegrey800}}>
            Right Side
          </FlexRow>
        </FlexRow>
      </ScrollView>
    );
  }
};

export default Home;
