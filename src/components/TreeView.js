import * as React from 'react'

export default class TreeView extends React.Component {
  static editModeRenderer(node, props) {
    const classes = []
      .concat(props.nodeClass)
      .concat(props.nodeEditModeClass)
      .filter(c => c && typeof c === 'string')

    return (
      <div className={classes.join(' ')}>
        <div className="node-text">
          <input type="text" value={node.text} />
        </div>
        <div className="node-url">
          <input type="text" value={node.url} />
        </div>
      </div>
    )
  }

  static viewModeRenderer(node, props) {
    const classes = []
      .concat(props.nodeClass)
      .concat(props.nodeViewModeClass)
      .filter(c => c && typeof c === 'string')

    /* eslint-disable react/jsx-indent */
    return (
      <div className={classes.join(' ')}>
        { node.url
          ? <div className="node-link">
              <a href={node.url}>{node.text || node.url}</a>
            </div>
          : <div className="node-text">{node.text}</div>
        }
      </div>
    )
  }

  renderNodeList(nodes) {
    return nodes.map((node, index) => {
      const props = { ...this.props, key: node.key || index }

      if (this.editable !== false && this.editing.indexOf(node) !== -1) {
        return this.props.editModeRenderer(node, props)
      }

      return this.props.viewModeRenderer(node, props)
    })
  }

  render() {
    // [].concat handles a single node/[] of nodes correctly
    const nodes = [].concat(this.props.nodes)

    return (
      <div className="treeview-container">
        {this.renderNodeList(nodes)}
      </div>
    )
  }
}

const lazyFunction = f => ((...args) => f(...args))

let NodeListShape

const NodeShape = React.PropTypes.shape({
  key: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),

  text:     React.PropTypes.string.isRequired,
  url:      React.PropTypes.string,
  children: lazyFunction(() => NodeListShape),
})

NodeListShape = React.PropTypes.arrayOf(NodeShape)

const ClassListShape = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.arrayOf(React.PropTypes.string),
])

TreeView.propTypes = {
  editable: React.PropTypes.bool,    // eslint-disable-line react/no-unused-prop-types
  nodes:    React.PropTypes.oneOfType([NodeShape, NodeListShape]),

  className:         ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeClass:         ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeViewModeClass: ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeEditModeClass: ClassListShape, // eslint-disable-line react/no-unused-prop-types

  editModeRenderer: React.PropTypes.func.isRequired,
  viewModeRenderer: React.PropTypes.func.isRequired,
}
TreeView.defaultProps = {
  editable: true,
  nodes:    [],

  className:         'treeview-container',
  nodeClass:         'treeview-node',
  nodeViewModeClass: '',
  nodeEditModeClass: 'treeview-node-editing',

  editModeRenderer: TreeView.editModeRenderer,
  viewModeRenderer: TreeView.viewModeRenderer,
}
