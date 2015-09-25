import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';
import Picture from './Picture';
import Icon from './Icon';

class Gallery extends Component {

  static propTypes = {

  }

  static defaultProps = {
    selected: [],
    images: [],
    onImageClick: function () {},
    onImageSelectionAdd: function() {},
    onImageSelectionRemove: function() {}
  }

  state = {
    selectedImages: []
  }

  render() {
    const {images} = this.props;

    const styles = {
      base: {
        background: colors['blue-grey-100'],
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20
      },
      imageWrapper: {
        maxWidth: 200,
        maxHeight: 300,
        padding: 0,
        margin: '20px 15px',
        background: '#FFF',
        boxShadow: '0px 3px 4px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      },
      image: {
        flex: '1 1 100%',
        display: 'block',
        maxWidth: '100%',
        maxHeight: 300
      }
    };

    return (
      <div style={{...styles.base, ...this.props.style}}>
        {this.props.images.map((image, i)=> {
          return (
            <div
              key={image._id}
              style={{...styles.imageWrapper, ...this.props.wrapperStyle}}
              onClick={::this.handleImageClick(image)}>
              <Picture style={styles.image} src={`/content/${image.thumbnail.path}`}/>
              <div style={this.getCheckStyle(image)}>
                <Icon name='check_circle' size={24} fill={colors['blue-500']}/>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  handleImageClick(image) {
    return e => {
      const elem = e.currentTarget;
      if (!this.isSelected(image)) {
        this.addSelectedImage(image);
      } else {
        this.removeSelectedImage(image);
      }
      this.props.onImageClick(image);
    };
  }

  getCheckStyle(image) {
    const baseStyle = {
      position: 'absolute',
      right: 5,
      bottom: 5,
      borderRadius: '50%',
      background: '#FFF',
      height: 24,
      display: 'none'
    };

    const selectedStyle = {
      display: 'block'
    };

    if (this.isSelected(image))
      return {...baseStyle, ...selectedStyle};

    return baseStyle;
  }

  addSelectedImage(image) {
    this.props.onImageSelectionAdd(image);
  }

  removeSelectedImage(image) {
    this.props.onImageSelectionRemove(image);
  }

  isSelected(image) {
    return this.props.selected.find(selected => selected === image._id) ? true : false;
  }

}

export default Gallery;
