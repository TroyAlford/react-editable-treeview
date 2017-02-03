import * as React from 'react'
import * as ReactDOM from 'react-dom'

import TreeView from '../../src/components/TreeView'

ReactDOM.render(
  <TreeView
    onNodeClick={(e, node) => { e.stopPropagation(); console.log('Clicked:', node) }}
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
