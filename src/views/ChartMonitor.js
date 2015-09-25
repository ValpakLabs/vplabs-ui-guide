import React, { PropTypes, Component } from 'react';
import * as themes from '../../node_modules/redux-devtools/lib/react/themes';
import { tree } from '../../node_modules/d3-state-visualizer/lib/charts';
import visualizer from 'd3-state-visualizer';
import JSONTree from 'react-json-tree';


const styles = {
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300
  },
  buttonBar: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: 'transparent',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  elements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    bottom: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
};

class TreeChart extends Component {
  static propTypes = {
    state: PropTypes.object,
    rootKeyName: PropTypes.string,
    pushMethod: PropTypes.string,
    tree: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.array
    }),
    id: PropTypes.string,
    style: PropTypes.shape({
      node: PropTypes.shape({
        colors: PropTypes.shape({
          'default': PropTypes.string,
          parent: PropTypes.string,
          collapsed: PropTypes.string
        }),
        radius: PropTypes.number
      }),
      text: PropTypes.shape({
        colors: PropTypes.shape({
          'default': PropTypes.string,
          hover: PropTypes.string
        })
      }),
      link: PropTypes.object
    }),
    size: PropTypes.number,
    aspectRatio: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),
    isSorted: PropTypes.bool,
    heightBetweenNodesCoeff: PropTypes.number,
    widthBetweenNodesCoeff: PropTypes.number,
    transitionDuration: PropTypes.number,
    tooltipOptions: PropTypes.shape({
      disabled: PropTypes.bool,
      left: PropTypes.number,
      top: PropTypes.number,
      offset: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number
      }),
      indentationSize: PropTypes.number,
      style: PropTypes.object
    })
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.renderChart = tree(React.findDOMNode(this), this.props);
    this.renderChart();
  }

  componentWillReceiveProps(nextProps) {
    this.renderChart(nextProps.tree || nextProps.state);
  }

  render() {
    return <div/>;
  }
}

export default class ChartMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      object: null
    }
  }

  static propTypes = {
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    monitorState: PropTypes.object.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired,
    jumpToState: PropTypes.func.isRequired,
    setMonitorState: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    visibleOnLoad: PropTypes.bool
  };

  static defaultProps = {
    select: (state) => state,
    monitorState: { isVisible: true, isChartVisible: true },
    theme: 'nicinabox',
    visibleOnLoad: true
  };

  componentWillReceiveProps() {
  }

  componentDidUpdate() {
  }

  componentWillMount() {
    let visibleOnLoad = this.props.visibleOnLoad;
    const { monitorState } = this.props;
    this.props.setMonitorState({
      ...monitorState,
      isVisible: visibleOnLoad
    });
  }

  render() {
    const { monitorState, computedStates } = this.props;
    // const { components: { TreeChart }} = visualizer;

    let theme;
    if (typeof this.props.theme === 'string') {
      if (typeof themes[this.props.theme] !== 'undefined') {
        theme = themes[this.props.theme];
      } else {
        console.warn('DevTools theme ' + this.props.theme + ' not found, defaulting to nicinabox');
        theme = themes.nicinabox;
      }
    } else {
      theme = this.props.theme;
    }
    if (!monitorState.isVisible) {
      return null;
    }

    const style = {
      width: '100%',
      height: '100%',
      node: {
        colors: {
          'default': theme.base0B,
          collapsed: theme.base0B,
          parent: theme.base0E
        },
        radius: 7
      },
      text: {
        colors: {
          'default': theme.base0D,
          hover: theme.base06
        }
      }
    };

    let _state = computedStates[computedStates.length - 1].state;
    let toJSState = {};

    for (let key in _state) {
      toJSState[key] = _state[key].toJS();
    }

    return (
      <div style={{...styles.container, backgroundColor: theme.base00}}>
        <TreeChart
          state={toJSState}
          id='todosState'
          aspectRatio={0.5}
          isSorted={false}
          heightBetweenNodesCoeff={1}
          widthBetweenNodesCoeff={1.3}
          tooltipOptions={{disabled: true}}
          style={style}
          onClickText={::this.viewTreeObject}
        />
        <div style={{position: 'absolute', top: 0, right: 0, width: 400, height: '100vh', background: 'rgba(0,0,0,0.3)', overflow: 'auto', padding: '0 20px 0 0'}}>
          <JSONTree theme={themes.nicinabox} data={ this.state.object } />
        </div>
      </div>
    );
  }

  viewTreeObject(node) {
    this.setState({object: extractNode(node)});
  }
}

function extractNode(node) {
  let view = {};

  if (node.children) {
    node.children.forEach(child => {
      view[child.name] = extractNode(child);
    });
  } else if (node.object) {
    view = node.object;
  } else if (node.value) {
    view = node.value;
  }

  return view;
}





