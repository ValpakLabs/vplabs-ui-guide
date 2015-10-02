import React from 'react';
import cx from 'classnames';

class Triangle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let coords = '';
    let isVertical = false;
    let glyph = '';
    let shadowOffset = '0px 0px';

    if (this.props.position === 'above') {
      coords = '0,0 20,0 10,10';
      shadowOffset = '0px 1px';
      glyph = '▼';
    }
    if (this.props.position === 'right') {
      coords = '0,10 10,0 10,20';
      isVertical = true;
      shadowOffset = '-1px 1px';
      glyph = '◀';
    }
    if (this.props.position === 'below') {
      coords = '10,10 20,10 0,10';
      shadowOffset = '0px 1px';
      glyph = '▲';
    }
    if (this.props.position === 'left') {
      coords = '0,10 10,0 10,10';
      isVertical = true;
      shadowOffset = '1px 1px';
      glyph = '▶';
    }

    const styles = {
      textShadow: `${shadowOffset} 5px rgba(0,0,0,0.2)`,
      lineHeight: 'normal',
      color: this.props.color,
      position: 'absolute',
      top: this.props.style.top,
      left: this.props.style.left,
      right: this.props.style.right,
      bottom: this.props.style.bottom,
      transform: isVertical ? 'scaleY(2)' : 'scaleX(2)'
    };

    return (
      <div style={styles}>{glyph}</div>
    );
  }

}

Triangle.defaultProps = {
  color: '#FFF'
};

export default Triangle;
