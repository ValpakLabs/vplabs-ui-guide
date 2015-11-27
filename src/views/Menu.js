import React, {PropTypes, Component} from 'react';

class Menu extends Component {
  static defaultProps = {
    itemColor: '#000'
  }

  render() {
    const styles = {
      base: {
        ...this.props.style
      },
      item: {
        padding: '4px 20px',
        display: 'block',
        ...this.props.itemStyle
      }
    };

    return (
      <div style={styles.base}>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {style: {...styles.item, ...child.props.style}});
        })}
      </div>
    );
  }

}

export default Menu;
