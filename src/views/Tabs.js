import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';

class Tabs extends Component {

  static propTypes = {

  }

  static defaultProps = {
    darkTheme: false,
    hasContent: true,
    underlineColor: colors['orange-600']
  }

  state = {
    selectedIndex: this.props.selectedIndex || 0
  }

  render() {
    const styles = {
      base: {
        ...this.props.wrapperStyle
      },
      navigation: {
        display: 'flex',
        background: !this.props.darkTheme ? 'transparent' : colors['blue-grey-800'],
        ...this.props.navStyle
      },
      tabContent: {
        overflow: 'auto',
        ...this.props.tabContentStyle
      }
    };

    let tabContent = [];

    let validTabs = [];

    React.Children.forEach(this.props.children, child => {
      if (child && child.type.name === 'Tab')
        validTabs.push(child);
    });

    let tabs = validTabs.map((tab, index) => {
      if (tab.props.children) {
        tabContent.push(React.createElement(TabTemplate, {
          key: index,
          selected: this.state.selectedIndex === index,
          tabStyle: this.props.tabTemplateStyle
        }, tab.props.children));
      } else {
        tabContent.push(undefined);
      }

      return React.cloneElement(tab, {
        key: index,
        selected: this.state.selectedIndex === index,
        darkTheme: this.props.darkTheme,
        tabIndex: index,
        width: '100%',
        tabStyle: this.props.tabStyle,
        underlineColor: this.props.underlineColor,
        handleTouchTap: ::this.handleTouchTap
      });
    }, this);

    return (
      <div style={styles.base}>
        <div style={styles.navigation}>
          {tabs}
        </div>
        {this.props.hasContent ?
          <div style={styles.tabContent}>
            {tabContent}
          </div>
        : null}
      </div>
    );
  }

  handleTouchTap(tabIndex, tab) {
    if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
      this.props.onChange(tabIndex, tab);
    }

    this.setState({selectedIndex: tabIndex});
    if (tab.props.onActive) tab.props.onActive(tab);
  }

}

export default Tabs;

class TabTemplate extends Component {
  render() {
    let styles = {
      height: 0,
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
      textAlign: 'initial',
      ...this.props.tabStyle
    };

    if (this.props.selected) {
      delete styles.height;
      styles.overflow = 'auto';
    }
    return <div style={{...styles, display: this.props.selected ? 'flex' : 'none'}}>{this.props.children}</div>;
  }
}
