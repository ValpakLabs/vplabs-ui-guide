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

class PageScrollView extends React.Component {
  render() {
    return (
      <ScrollView>

        <div style={{background: colors.white}}>

          <FlexBox style={{background: colors.deeppurple500}} align='stretch'>
            <Flex>
              <div style={{padding: 40}}>
                <Text color='#FFF' size='xxxlarge' weight='thin'>{`<ScrollView />`}</Text>
                <Text color='#FFF' size='large' weight='thin'>A scrollable container that fills it's parent container.</Text>
              </div>
            </Flex>
            <Flex style={{display: 'flex', justifyContent: 'center'}} align='center'>
              <code style={{color: colors.white, background: Color(colors.black).alpha(0.1).rgbaString(), padding: '12px 24px', borderRadius: 3}}>{`import { ScrollView } from 'vplabs-ui';`}</code>
            </Flex>
          </FlexBox>

          <ComponentExample padding={0} code={
`


<ScrollView>
    Bacon ipsum dolor amet ball tip...
</ScrollView>



`
            }>
          
              <ScrollView>
                <div style={{padding: '40px 60px'}}>
                  Bacon ipsum dolor amet ball tip biltong cow, pork tail chuck pig chicken alcatra leberkas beef ribs turkey picanha doner pancetta. Tenderloin rump pork chicken pig swine capicola landjaeger fatback ham hock turducken. Short loin swine pork chop hamburger kevin turkey cow, pork loin bresaola capicola tail flank rump andouille jowl. Salami pork belly alcatra meatball chicken pastrami, doner rump tail pork. Doner ham hock cow alcatra. Picanha ground round tenderloin alcatra meatball pork chop. Drumstick andouille meatloaf cupim meatball.

                  Beef ribs jerky turducken leberkas. Prosciutto salami kielbasa rump kevin short ribs jerky ham hock. Salami meatloaf shoulder flank kevin, brisket kielbasa landjaeger turducken venison ribeye pancetta. Capicola beef porchetta short ribs kielbasa meatball, andouille corned beef jowl brisket filet mignon pork loin pancetta.

                  Chicken pork ball tip salami tail ham turducken short ribs picanha corned beef rump. Sausage meatball t-bone fatback. Ham biltong spare ribs, prosciutto alcatra rump pig flank cow porchetta. Drumstick pork strip steak pork belly pork loin tenderloin alcatra corned beef picanha ribeye frankfurter landjaeger. Jerky beef ribs tail brisket t-bone meatball ham hock tri-tip spare ribs meatloaf shank corned beef fatback pig. Turkey tail brisket pastrami cupim swine andouille prosciutto short loin shank.
                </div>
              </ScrollView>
         
          </ComponentExample>

        </div>

      </ScrollView>
    );
  }
};

export default PageScrollView;
