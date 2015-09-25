import React, {PropTypes, Component} from 'react';

class Picture extends Component {

  static propTypes = {

  }

  static defaultProps = {
    radius: false,
    src: '',
    width: 'auto',
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    shadow: true,
    push: 0,
    halign: 'center',
    valign: 'center',
    altText: '',
    onClick: e => null
  }

  render() {
    const {
      radius,
      src,
      width,
      height,
      maxWidth,
      maxHeight,
      shadow,
      push,
      halign,
      valign,
      altText
    } = this.props;

    const styles = {
      base: {
        width,
        height,
        maxWidth,
        maxHeight,
        display: 'flex',
        justifyContent: halign,
        alignItems: valign,
        margin: push
      },
      image: {
        display: 'block',
        boxShadow: shadow ? '0px 3px 4px rgba(0,0,0,0.4)' : 'none',
        borderRadius: radius,
        flex: '1 1 100%',
        maxWidth,
        maxHeight
      }
    };

    return (
      <div id={this.props.id} style={{...styles.base, ...this.props.style}} onClick={e => this.props.onClick(e)}>
        <img altText={altText} style={styles.image} src={`${src[0] === '/' ? '/balefire-savoo' + src : src}`}/>
      </div>
    );
  }

}

export default Picture;
