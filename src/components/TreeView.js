import * as React from 'react'

const map = new WeakMap()
const internal = (object) => {
  if (!map.has(object)) {
    map.set(object, {})
  }

  return map.get(object)
}

const classes = (...args) =>
  [].concat(...args)
  .filter(c => c && typeof c === 'string')
  .join(' ')

export default class TreeView extends React.Component {
  static editModeRenderer(node, props) {
    const className = classes(props.nodeClass, props.nodeEditModeClass)

    return (
      <div key={props.key} className={className}>
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
    const className = classes(props.nodeClass, props.nodeViewModeClass)

    return (
      <li key={props.key} className={className}>
        { node.url /* eslint-disable react/jsx-indent */
          ? <div className="node-link">
              <a href={node.url}>{node.text || node.url}</a>
            </div>
          : <div className="node-text">{node.text}</div>
        }
        {this.renderNodeList(node.children)}
      </li>
    )
  }

  constructor(props) {
    super(props)
    internal(this).editing = Array.isArray(props.editing) ? props.editing : []
    this.isEditing = node => internal(this).editing.indexOf(node) !== -1
  }
  componentWillReceiveProps(props) {
    if (Array.isArray(props.editing)) {
      internal(this).editing = props.editing
    }
  }

  renderNodeList(nodes) {
    if (!nodes || !Array.isArray(nodes) || nodes.length === 0) return []

    return (
      <ul className="node-list">
        {nodes.map((node, index) => {
          const props = { ...this.props, key: node.key || index }

          return (this.editable !== false && this.isEditing(node))
            ? this.props.editModeRenderer.call(this, node, props)
            : this.props.viewModeRenderer.call(this, node, props)
        })}
      </ul>
    )
  }

  render() {
    const className = classes(this.props.className)
    // [].concat handles a single node/[] of nodes correctly
    const nodes = [].concat(this.props.nodes)

    return (
      <div className={className}>
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
  editing:  NodeListShape,
  nodes:    NodeListShape,

  className:         ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeClass:         ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeViewModeClass: ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeEditModeClass: ClassListShape, // eslint-disable-line react/no-unused-prop-types

  editModeRenderer: React.PropTypes.func.isRequired,
  viewModeRenderer: React.PropTypes.func.isRequired,
}
TreeView.defaultProps = {
  editable: true,
  editing:  undefined,
  nodes:    [],

  className:         'treeview-container',
  nodeClass:         'treeview-node',
  nodeViewModeClass: '',
  nodeEditModeClass: 'treeview-node-editing',

  editModeRenderer: TreeView.editModeRenderer,
  viewModeRenderer: TreeView.viewModeRenderer,
}
