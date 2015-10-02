import React, {PropTypes, Component} from 'react';
import FlexBox from './FlexBox';
import Icon from './Icon';
import colors from '../theme/colors';

class NotificationBanner extends Component {

  static propTypes = {
    level: PropTypes.oneOf(['info', 'warn', 'error']),
  }

  static defaultProps = {
    level: 'info',
  }

  render() {
    const {level, text} = this.props;

    const styles = {
      base: {
        padding: '20px 32px 20px 40px',
        background: levelBgColors[level],
      },
      text: {
        marginLeft: 14,
        fontSize: 15,
        fontWeight: 400,
      },
    };

    return (
      <div style={styles.base}>
        <FlexBox>
          <FlexBox justify='flex-start'>
            <Icon name={levelIcons[level]}/>
            <div style={styles.text}>{text}</div>
          </FlexBox>
          {this.props.children}
        </FlexBox>
      </div>
    );
  }

}

const levelBgColors = {
  info: colors['light-blue-400'],
  warn: colors['orange-400'],
  error: colors['red-400'],
};

const levelIcons = {
  info: 'info_outline',
  warn: 'warning',
  error: 'error',
};

export default NotificationBanner;
