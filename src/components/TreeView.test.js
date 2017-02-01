import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import TreeView from './TreeView'

jest.unmock('./TreeView')

describe('TreeView', () => {
  let parent = null

  beforeEach(() => {
    parent = document.createElement('div')
  })

  function render(element) {
    // eslint-disable-next-line react/no-render-return-value
    const component = ReactDOM.render(element, parent)
    return {
      parent,
      component,
      // eslint-disable-next-line react/no-find-dom-node
      rendered: ReactDOM.findDOMNode(component),
    }
  }

  it('renders wrapper with specified classes', () => {
    let { rendered } = render(<TreeView className="test-class" />)

    expect(rendered.nodeName).toEqual('DIV')
    expect(rendered.classList).toHaveLength(1)
    expect(Array.from(rendered.classList)).toEqual(['test-class'])

    rendered = render(<TreeView className={['test-1', 'test-2']} />).rendered

    expect(rendered.nodeName).toEqual('DIV')
    expect(rendered.classList).toHaveLength(2)
    expect(Array.from(rendered.classList)).toEqual(['test-1', 'test-2'])
  })

  it('renders wrapper and simple node list', () => {
    const { rendered } = render(
      <TreeView
        nodes={[{ text: 'only', children: [] }]}
        nodeViewModeClass="view-mode"
      />
    )

    expect(rendered.nodeName).toEqual('DIV')
    expect(rendered.childNodes).toHaveLength(1)

    const list = rendered.childNodes[0]
    expect(list.nodeName).toEqual('UL')
    expect(Array.from(list.classList)).toEqual(['node-list'])

    const node = list.childNodes[0]
    expect(Array.from(node.classList)).toEqual(['treeview-node', 'view-mode'])
    expect(node.childNodes).toHaveLength(1)
    expect(Array.from(node.childNodes[0].classList)).toEqual(['node-text'])
  })

  it('renders nested nodes', () => {
    render(
      /* eslint-disable key-spacing */
      <TreeView
        nodes={[{
          text: 'parent',
          children: [{
            text: 'child',
            children: [{
              text: 'grandchild',
            }],
          }],
        }]}
      />
    )

    const nodes = Array.from(parent.getElementsByClassName('treeview-node'))
    expect(nodes).toHaveLength(3)

    const [parentNode, childNode, grandchildNode] = nodes

    //     txt:parent node-list  container
    expect(parentNode.parentNode.parentNode).toEqual(parent.childNodes[0])

    //     txt:child node-list  txt:parent
    expect(childNode.parentNode.parentNode).toEqual(parentNode)

    //     txt:grandchild node-list  txt:child
    expect(grandchildNode.parentNode.parentNode).toEqual(childNode)
  })

  it('honors editing list and view/edit settings', () => {
    const editRenderer = jest.fn().mockImplementation(TreeView.editModeRenderer)
    const editNode = { text: 'editing' }

    const viewRenderer = jest.fn().mockImplementation(TreeView.viewModeRenderer)
    const viewNode = { text: 'viewing' }

    const cloneNode = { text: 'editing' }

    render(<TreeView
      nodes={[viewNode, editNode, cloneNode]}
      nodeViewModeClass="view-node" nodeEditModeClass="edit-node"
      editModeRenderer={editRenderer} viewModeRenderer={viewRenderer}
    />)

    expect(viewRenderer.mock.calls).toHaveLength(3)
    expect(viewRenderer.mock.calls[0][0]).toEqual(viewNode)
    expect(viewRenderer.mock.calls[1][0]).toEqual(editNode)
    expect(viewRenderer.mock.calls[2][0]).toEqual(cloneNode)

    expect(editRenderer.mock.calls).toHaveLength(0)

    viewRenderer.mockClear()
    editRenderer.mockClear()

    expect(Array.from(parent.getElementsByClassName('view-node'))).toHaveLength(3)
    expect(Array.from(parent.getElementsByClassName('edit-node'))).toHaveLength(0)

    render(<TreeView
      nodes={[viewNode, editNode, cloneNode]} editing={[editNode]}
      nodeViewModeClass="view-node" nodeEditModeClass="edit-node"
      editModeRenderer={editRenderer} viewModeRenderer={viewRenderer}
    />)

    expect(viewRenderer.mock.calls).toHaveLength(2)
    expect(viewRenderer.mock.calls[0][0]).toEqual(viewNode)
    expect(viewRenderer.mock.calls[1][0]).toEqual(cloneNode)

    expect(editRenderer.mock.calls).toHaveLength(1)
    expect(editRenderer.mock.calls[0][0]).toEqual(editNode)

    expect(Array.from(parent.getElementsByClassName('view-node'))).toHaveLength(2)
    expect(Array.from(parent.getElementsByClassName('edit-node'))).toHaveLength(1)
  })

  it('calls onNodeEdit binding correctly, with default renderers', () => {
    const node = { text: 'text', url: 'http://www.example.com' }
    const onNodeEdit = jest.fn().mockImplementation(TreeView.defaultProps.onNodeEdit)

    render(<TreeView nodes={[node]} editing={[node]} onNodeEdit={onNodeEdit} />)

    const textFields = parent.getElementsByTagName('input')
    TestUtils.Simulate.change(textFields[0], { target: { value: 'new-text' } })
    expect(onNodeEdit).toHaveBeenLastCalledWith(node, { text: 'new-text', url: node.url })

    TestUtils.Simulate.change(textFields[1], { target: { value: 'new-url' } })
    expect(onNodeEdit).toHaveBeenLastCalledWith(node, { text: node.text, url: 'new-url' })

    expect(onNodeEdit.mock.calls).toHaveLength(2)
  })
})
