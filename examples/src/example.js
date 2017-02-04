import * as React from 'react'
import * as ReactDOM from 'react-dom'

import TreeView from '../../src/components/TreeView'

const log = document.getElementById('log')

ReactDOM.render(
  <TreeView
    onNodeClick={(e, node) => {
      e.stopPropagation()
      log.append('Clicked:', JSON.stringify(node))
      log.appendChild(document.createElement('br'))
    }}
    nodes={[{
      text: 'Home',
      url:  '#',

      children: [{
        text: 'Staff',
        url:  '#',

        children: [
          { text: 'John' },
          { text: 'Jill' },
        ],
      }, {
        text: 'Products',

        children: [
          { text: 'Widget' },
          { text: 'Thingy' },
        ],
      }],
    }]}
  />
, document.getElementById('application'))
