# react-editable-treeview
React TreeView component with editable nodes

# Basic Usage
```javascript
import * as React from 'react'
import TreeView from 'react-editable-treeview'

const nodes = [{
  text: 'Home',
  children: [{
    text: 'About Us',
    url: '/about-us',
  }, {
    text: 'Contact',
    url: '/contact',
  }],
}]

class MyComponent extends React.Component {
  render() {
    return <TreeView nodes={nodes} />
  }
}
```
By default, the above code will render the above into nested `Unordered List <UL>` and `List Item <LI>` tags and render the child links as `Anchor <A>` tags with the appropriate `url`s.
