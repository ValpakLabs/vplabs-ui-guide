import React from 'react';
import Text from './Text';
import colors from '../theme/colors';

class Box extends React.Component {
  static defaultProps = {
    pad: 20,
    bgcolor: 'transparent',
    shadowDepth: 2,
    titleColor: colors['light-blue-900'],
  }

  render() {
    const {pad, bgcolor, shadowDepth, title, titleColor} = this.props;
    const style = {
      width: '100%',
      // height: '100%',
      background: bgcolor,
      padding: pad,
      // boxShadow: `0px ${shadowDepth}px ${shadowDepth + 1}px rgba(0, 0, 0, 0.13)`,
      borderBottom: `2px dotted ${colors['grey-300']}`
    };
    const headerStyle = {
      marginBottom: '2.5em',
      color: titleColor,
      // borderBottom: `1px solid ${colors['grey-200']}`,
    };
    const contentStyle = {

    };

    return (
      <div style={{...style, ...this.props.style}}>
        {title ? (
          <div style={headerStyle}>
            <Text
              size='xlarge'
              weight='light'
              color={titleColor}>
              {title}
            </Text>
          </div>
        ) : null}
        <div style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default Box;
