'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * # AnimateOnChange component.
 * Adds `animationClassName` when `animate` is true, then removes
 * `animationClassName` when animation is done (event `animationend` is
 * triggered).
 *
 * @prop {string} className - Base class name.
 * @prop {string} animationClassName - Class added when `animate == true`.
 * @prop {bool} animate - Wheter to animate component.
 */

var AnimateOnChange = (function (_Component) {
  _inherits(AnimateOnChange, _Component);

  function AnimateOnChange(props) {
    _classCallCheck(this, AnimateOnChange);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AnimateOnChange).call(this, props));

    _this.state = { animating: false, clearAnimationClass: false };
    return _this;
  }

  _createClass(AnimateOnChange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.refs.root.addEventListener('animationstart', function () {
        _this2.setState({ animating: true, clearAnimationClass: false });
      });
      this.refs.root.addEventListener('animationend', function () {
        // send separate, animation state change will not render
        _this2.setState({ clearAnimationClass: true }); // renders
        _this2.setState({ animating: false, clearAnimationClass: false });
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.animating != nextState.animating) {
        // do not render on animation change
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;

      if (this.props.animate && !this.state.clearAnimationClass) {
        className += ' ' + this.props.animationClassName;
      }

      return _react2.default.createElement(
        'span',
        { ref: 'root', className: className },
        this.props.children
      );
    }
  }]);

  return AnimateOnChange;
})(_react.Component);

exports.default = AnimateOnChange;