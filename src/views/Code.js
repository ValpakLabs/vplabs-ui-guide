import React, {PropTypes, Component} from 'react';
import Color from 'color';
import colors from '../theme/colors';
import FlexBox from './FlexBox';

require('../../static/prism.css');

class Code extends Component {
  static defaultProps = {
    languages: ['jsx'],
    width: 'auto'
  }

  componentDidMount() {
    if (typeof Prism !== 'undefined')
      Prism.highlightElement(this.refs.code);
  }

  render() {
    const styles = {
      base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        overflow: 'auto',
        padding: '20px 40px',
        background: Color(colors.bluegrey800).darken(0.2).rgbString(),
        ...this.props.style
      }
    };

    return (
      <div className='language-jsx' ref='wrap' style={styles.base}>
        <pre ref='pre' style={{width: this.props.width}}>
          <code
            ref='code'>
            {this.props.children}
          </code>
        </pre>
      </div>
    );
  }

}

export default Code;
