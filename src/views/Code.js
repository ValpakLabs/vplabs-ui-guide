import React, {PropTypes, Component} from 'react';
import Color from 'color';
import colors from '../theme/colors';
import FlexBox from './FlexBox';
import highlight from 'highlight.js';

require('../../node_modules/highlight.js/styles/tomorrow-night.css');

class Code extends Component {
  static defaultProps = {
    languages: ['js', 'html'],
    width: 'auto'
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

    highlight.configure({
      languages: this.props.languages
    });

    return (
      <div style={styles.base}>
        <pre style={{width: this.props.width}}>
          <code
            style={{color: '#FFF'}}
            dangerouslySetInnerHTML={{__html: this.highlight(this.props.children)}}/>
        </pre>
      </div>
    );
  }

  highlight(code) {
    const highlighted = highlight.highlightAuto(this.props.children, this.props.languages).value;
    return highlight.fixMarkup(highlighted);
  }

}

export default Code;
