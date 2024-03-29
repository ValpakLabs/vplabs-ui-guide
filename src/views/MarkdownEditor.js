import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {requireServerCss, getInputSelection} from '../util';
import colors from '../theme/colors';
import Remarkable from 'remarkable';
import Switch from './Switch';
import FlexBox from './FlexBox';
import Flex from './Flex';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';

class MarkdownEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.md = new Remarkable({
      html: true,
      linkify: true,
      typographer: true,
      quotes: '“”‘’'
    });

    this.state = {
      htmltext: this.props.htmltext,
      mdtext: this.props.mdtext,
      fullscreen: false
    };
  }

  componentDidMount() {
    if (!this.state.htmltext)
      this.renderMarkdown(this.state.mdtext);
  }

  render() {
    const styles = {
      base: {
        background: colors.grey50,
        position: this.state.fullscreen ? 'fixed' : 'relative',
        height: this.state.fullscreen ? '100vh' : this.props.height,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: this.state.fullscreen ? 9999 : 1,
        boxShadow: this.props.shadow ? '0px 2px 5px rgba(0,0,0,0.2)' : 'none',
        display: 'flex',
        flexDirection: 'column'
      },
      splitWrapper: {
        display: 'flex',
        width: '100%',
        flex: 1
      },
      header: {
        paddingBottom: 20
      },
      col1: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      },
      col2: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      },
      mdtextarea: {
        color: colors.grey800,
        fontFamily: 'monospace',
        fontSize: 14,
        lineHeight: '20px',
        width: '100%',
        flex: 1,
        border: 0,
        resize: 'none',
        padding: 20,
        background: '#FFF'
      },
      htmlpreview: {
        color: colors.grey800,
        borderLeft: `1px solid ${colors.grey300}`,
        overflow: 'auto',
        padding: '6px 20px',
        background: '#fff',
        flex: 1
      }
    };

    const headerProps = {
      push: '10px 20px',
      size: 'normal',
      weight: 'medium',
      color: colors.grey600
    };

    const tinyHeaderProps = {
      size: 'tiny',
      weight: 'normal',
      color: colors.grey500,
      transform: 'uppercase',
      letterSpacing: '0.1em',
      style: {
        padding: '0 20px 4px 20px',
        borderBottom: `1px solid ${colors.grey300}`
      }
    };

    if (!this.state.fullscreen)
      styles.base = {...styles.base, ...this.props.style};

    return (
      <div style={styles.base}>

        <div style={styles.header}>
          <FlexBox>
            <Text {...headerProps}>{this.props.title}</Text>
            <Button
              color={this.state.fullscreen ? colors.blue500 : colors.grey600}
              icon={this.state.fullscreen ? 'fullscreen_exit' : 'fullscreen'}
              onClick={::this.toggleFullscreen} />
          </FlexBox>
        </div>

        <div style={styles.splitWrapper}>
          <div ref='col1' style={styles.col1} onScroll={::this.handleScroll('col1')}>
            <Text {...tinyHeaderProps}>Markdown</Text>
            <textarea
              placeholder={markdownSample}
              ref='textarea'
              style={styles.mdtextarea}
              onChange={::this.handleChange}
              value={this.state.mdtext} />
          </div>

          <div style={styles.col2}>
            <Text {...tinyHeaderProps}>HTML Preview</Text>
            <div
              ref='col2'
              style={styles.htmlpreview}
              dangerouslySetInnerHTML={{__html: this.state.htmltext}} />
          </div>
        </div>

      </div>
    );
  }

  handleScroll(col) {
    if (!this.props.syncScroll) return;
    return e => {
      const el = e.target;
      const col2 = ReactDOM.findDOMNode(this.refs.col2);
      const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight));
      col2.scrollTop = col2.scrollHeight * progress;
    };
  }

  renderMarkdown(mdtext) {
    const htmltext = this.md.render(mdtext);
    this.setState({htmltext, mdtext});
    this.props.onChange({
      [this.props.mdFieldName]: mdtext,
      [this.props.htmlFieldName]: htmltext
    });
  }

  toggleFullscreen() {
    const fullscreen = !this.state.fullscreen;
    this.setState({fullscreen});
  }

  handleChange(e) {
    this.renderMarkdown(e.target.value);
  }
}

MarkdownEditor.propTypes = {
  syncScroll: PropTypes.bool,
  mdtext: PropTypes.string,
  htmltext: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  mdFieldName: PropTypes.string,
  htmlFIeldName: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  standalone: PropTypes.bool,
  shadow: PropTypes.bool,
  onChange: PropTypes.func
};

MarkdownEditor.defaultProps = {
  syncScroll: false,
  mdtext: '',
  htmltext: '',
  title: 'Markdown Editor',
  mdFieldName: 'markdown',
  htmlFIeldName: 'html',
  height: 400,
  shadow: true,
  standalone: true,
  onChange: e => null
};

export default MarkdownEditor;

const markdownSample = `An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and \`monospace\`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~



### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

size  material      color
----  ------------  ------------
9     leather       brown
10    hemp canvas   natural
11    glass         transparent

Table: Shoes, their sizes, and what they're made of

(The above is the caption for the table.) Pandoc also supports
multi-line tables:

--------  -----------------------
keyword   text
--------  -----------------------
red       Sunsets, apples, and
          other red or reddish
          things.

green     Leaves, grass, frogs
          and other things it's
          not easy being.
--------  -----------------------

A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](/example-image.jpg "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.`