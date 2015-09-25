import React, {PropTypes, Component} from 'react';
import Immutable from 'immutable';
import colors from '../theme/colors';
import Select from './Select';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Input from './Input';
import Text from './Text';
import TextArea from './TextArea';
import Button from './Button';
import Icon from './Icon';
import MarkdownEditor from './MarkdownEditor';
import Label from './Label';

class ContentField extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      hasHover: false
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return !Immutable.is(this.props.field, nextProps.field) ||
  //          !Immutable.is(this.props.zoneOptions, nextProps.zoneOptions);
  // }

  render() {
    const {field, zoneOptions} = this.props;

    const styles = {
      base: {
        position: 'relative',
        padding: 30,
        background: '#FDFDFD',
        marginBottom: 30,
        borderLeft: `1px solid ${field.get('type') === 'html' ? colors.bluegrey500 : colors.purple500}`,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.2)'
      }
    };

    return (
      <div style={styles.base} className='hover-container' onMouseEnter={::this.handleMouseEnter} onMouseLeave={::this.handleMouseLeave}>

        <div className='show-on-hover' style={{position: 'absolute', top: 0, right: 0}}>
          <Button
            icon='close'
            color={colors.red700}
            onClick={e => this.handleRemove(field)}/>
        </div>

        <FlexRow style={{marginBottom: 24, maxWidth: 1000}}>
          <Flex flex={1}>
            <Select
              label='Type'
              placeholder='Select field type'
              name='type'
              value={field.get('type') || 'text'}
              options={[
                {value: 'text', label: 'Text'},
                {value: 'html', label: 'Markdown'}
              ]}
              onChange={::this.handleChange}/>
          </Flex>

          <Flex flex={1} push='0 0 0 20px'>
            <Select
              label='Placement'
              placeholder='Select field placement'
              name='zone'
              value={field.get('zone')}
              options={zoneOptions.toJS()}
              noResultsText='No unsued zones. Add some more.'
              onChange={::this.handleChange}/>
          </Flex>
        </FlexRow>

        <div>
          {!field.get('type') || field.get('type') === 'text' ?
            <TextArea
              push='0'
              label='Field Content'
              name='value'
              placeholder='Add some content to this field'
              value={field.get('value')}
              onChange={change => this.handleChange(change)}/>
            :
            <MarkdownEditor
              style={{margin: '30px -30px -30px -30px', borderTop: `1px solid ${colors.grey200}`}}
              shadow={false}
              height={350}
              mdtext={field.get('mdtext')}
              mdFieldName='mdtext'
              htmlFieldName='value'
              title='Field Content'
              onChange={change => this.handleChange(change)}/>
          }
        </div>

      </div>
    );
  }

  handleChange(field) {
    this.props.onChange(field);
  }

  handleRemove(field) {
    this.props.onRemove(field);
  }

  handleMouseEnter() {
    this.setState({hasHover:true});
  }

  handleMouseLeave() {
    this.setState({hasHover:false});
  }

}

ContentField.propTypes = {
  field: PropTypes.instanceOf(Immutable.Map),
  zoneOptions: PropTypes.instanceOf(Immutable.List),
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

ContentField.defaultProps = {
  field: Immutable.Map(),
  zoneOptions: Immutable.List(),
  onChange: e => null,
  onRemove: e => null
};

export default ContentField;
