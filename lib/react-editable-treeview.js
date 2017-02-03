(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define("react-editable-treeview", ["React"], factory);
	else if(typeof exports === 'object')
		exports["react-editable-treeview"] = factory(require("React"));
	else
		root["react-editable-treeview"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = function classes() {
  var _ref;

  return (_ref = []).concat.apply(_ref, arguments).filter(function (c) {
    return c && typeof c === 'string';
  }).join(' ');
};

var contains = function contains(array, value) {
  return (Array.isArray(array) ? array : []).indexOf(value) !== -1;
};

var TreeView = function (_React$Component) {
  _inherits(TreeView, _React$Component);

  function TreeView() {
    _classCallCheck(this, TreeView);

    return _possibleConstructorReturn(this, (TreeView.__proto__ || Object.getPrototypeOf(TreeView)).apply(this, arguments));
  }

  _createClass(TreeView, [{
    key: 'renderNodeList',
    value: function renderNodeList(nodes) {
      var _this2 = this;

      if (!nodes || !Array.isArray(nodes) || nodes.length === 0) return [];

      return React.createElement(
        'ul',
        { className: 'node-list' },
        nodes.map(function (node, index) {
          var editing = contains(_this2.props.editing, node);
          var props = _extends({}, _this2.props, { key: node.key || index });

          return editing ? _this2.props.editModeRenderer.call(_this2, node, props) : _this2.props.viewModeRenderer.call(_this2, node, props);
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var className = classes(this.props.className);
      // [].concat handles a single node/[] of nodes correctly
      var nodes = [].concat(this.props.nodes);

      return React.createElement(
        'div',
        { className: className },
        this.renderNodeList(nodes)
      );
    }
  }], [{
    key: 'editModeRenderer',
    value: function editModeRenderer(node, props) {
      var _this3 = this;

      var className = classes(props.nodeClass, props.nodeEditModeClass);

      return React.createElement(
        'li',
        { key: props.key, className: className },
        React.createElement(
          'div',
          { className: 'node-text' },
          React.createElement('input', {
            type: 'text', value: node.text,
            onChange: function onChange(e) {
              return _this3.props.onNodeEdit.call(_this3, node, _extends({}, node, { text: e.target.value
              }));
            }
          })
        ),
        React.createElement(
          'div',
          { className: 'node-url' },
          React.createElement('input', {
            type: 'text', value: node.url,
            onChange: function onChange(e) {
              return _this3.props.onNodeEdit.call(_this3, node, _extends({}, node, { url: e.target.value
              }));
            }
          })
        ),
        this.renderNodeList(node.children)
      );
    }
  }, {
    key: 'viewModeRenderer',
    value: function viewModeRenderer(node, props) {
      var _this4 = this;

      var className = classes(props.nodeClass, props.nodeViewModeClass);
      var onClick = function onClick() {
        var _props$onNodeClick;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_props$onNodeClick = _this4.props.onNodeClick).call.apply(_props$onNodeClick, [node].concat(args, [node]));
      };

      return React.createElement(
        'li',
        { key: props.key, className: className, onClick: onClick },
        node.url /* eslint-disable react/jsx-indent */
        ? React.createElement(
          'a',
          { className: 'node-link', href: node.url, onClick: function onClick(e) {
              return e.preventDefault();
            } },
          node.text || node.url
        ) : React.createElement(
          'div',
          { className: 'node-text', href: '#' },
          node.text
        ),
        this.renderNodeList(node.children)
      );
    }
  }]);

  return TreeView;
}(React.Component);

exports.default = TreeView;


var lazyFunction = function lazyFunction(f) {
  return function () {
    return f.apply(undefined, arguments);
  };
};

var NodeListShape = void 0;

var NodeShape = React.PropTypes.shape({
  key: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),

  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string,
  children: lazyFunction(function () {
    return NodeListShape;
  })
});

NodeListShape = React.PropTypes.arrayOf(NodeShape);

var ClassListShape = React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]);

TreeView.propTypes = {
  editing: NodeListShape,
  nodes: NodeListShape,

  className: ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeClass: ClassListShape, // eslint-disable-line react/no-unused-prop-types

  nodeEditModeClass: ClassListShape, // eslint-disable-line react/no-unused-prop-types
  nodeViewModeClass: ClassListShape, // eslint-disable-line react/no-unused-prop-types

  editModeRenderer: React.PropTypes.func.isRequired,
  viewModeRenderer: React.PropTypes.func.isRequired,

  onNodeClick: React.PropTypes.func,
  onNodeEdit: React.PropTypes.func
};
TreeView.defaultProps = {
  editing: [],
  nodes: [],

  className: 'treeview-container',
  nodeClass: 'treeview-node',

  nodeEditModeClass: 'treeview-node-editing',
  nodeViewModeClass: '',

  editModeRenderer: TreeView.editModeRenderer,
  viewModeRenderer: TreeView.viewModeRenderer,

  onNodeClick: function onNodeClick(event, node) {}, // eslint-disable-line no-unused-vars
  onNodeEdit: function onNodeEdit(current, updated) {} };

/***/ })
/******/ ]);
});