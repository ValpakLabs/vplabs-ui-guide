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
        padding: '3px 12px',
        color: this.props.itemColor,
        ...this.props.itemStyle
      }
    };

    return (
      <div style={styles.base}>
        {React.Children.map(this.props.children, child => {
          return <div style={styles.item}>{child}</div>;
        })}
      </div>
    );
  }

}

export default Menu;
