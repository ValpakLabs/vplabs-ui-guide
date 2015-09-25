import React, {PropTypes, Component} from 'react';
import ErrorStackParser from 'error-stack-parser';
import colors from '../theme/colors';

class ErrorBox extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error).isRequired
  }

  render() {
    const {error} = this.props;

    const styles = {
      base: {
        background: colors.red700,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 99999,
        padding: 40,
        color: '#FFF'
      }
    };

    const frames = ErrorStackParser.parse(error).map(f => {
      const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`;
      return (
        <div style={{fontSize: 16, marginBottom: 24, fontFamily: 'monospace', lineHeight: '18px'}}>
          <div>{f.functionName}</div>
          <div style={{fontSize: 14, color: colors.red200}}>
            <a href={link}>{link}</a>
          </div>
        </div>
      );
    });

    return (
      <div style={styles.base}>
        <div style={{fontSize: 36, fontWeight: 500, marginBottom: 48}}>{error.name}: {error.message}</div>
        <div style={{}}>{frames}</div>
      </div>
    );
  }

}

export default ErrorBox;

ErrorBox.propTypes = {

};

ErrorBox.defaultProps = {

};
