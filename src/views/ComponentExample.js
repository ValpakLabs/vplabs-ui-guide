import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Code from './Code';

class ComponentExample extends Component {
  static defaultProps = {
    padding: 20,
    dir: 'row',
    languages: ['js', 'html']
  }

  render() {
    const styles = {
      base: {}
    };

    return (
      <FlexBox align='stretch' dir={this.props.dir} style={{background: '#FFFFFF'}}>
        <Flex style={{display: 'flex', borderBottom: `1px solid ${colors.grey300}`}}>
          <FlexBox flex={1} align='center' justify='space-around' style={{padding: this.props.padding}}>
            {this.props.children}
          </FlexBox>
        </Flex>
        <Flex style={{display: 'flex', alignItems: 'stretch', borderBottom: `1px solid ${colors.bluegrey800}`}}>
          <Code width={this.props.codeWidth} languages={this.props.languages}>{this.props.code || ''}</Code>
        </Flex>
      </FlexBox>
    );
  }

}

export default ComponentExample;
