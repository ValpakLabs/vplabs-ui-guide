import React, {PropTypes, Component} from 'react';

class AltTab extends Component {

  render() {
    let styles = {
      height: this.props.selected ? '100%' : 0,
      overflow: this.props.selected ? 'auto' : 'hidden',
      width: '100%',
      position: 'relative',
      textAlign: 'initial',
      ...this.props.tabStyle
    };

    return <div style={{...styles, display: this.props.selected ? 'flex' : 'none'}}>{this.props.children}</div>;
  }

}

export default AltTab;
