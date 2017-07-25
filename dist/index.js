'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = {
  start: ['animationstart', 'webkitAnimationStart', 'mozAnimationStart', 'oanimationstart', 'MSAnimationStart'],
  end: ['animationend', 'webkitAnimationEnd', 'mozAnimationEnd', 'oanimationend', 'MSAnimationEnd'],
  startRemoved: [],
  endRemoved: []
};

/**
 * # AnimateOnChange component.
 * Adds `animationClassName` when `animate` is true, then removes
 * `animationClassName` when animation is done (event `animationend` is
 * triggered).
 *
 * @prop {string} baseClassName - Base class name.
 * @prop {string} animationClassName - Class added when `animate == true`.
 * @prop {bool} animate - Wheter to animate component.
 */

var AnimateOnChange = function (_Component) {
  _inherits(AnimateOnChange, _Component);

  function AnimateOnChange(props) {
    _classCallCheck(this, AnimateOnChange);

    var _this = _possibleConstructorReturn(this, (AnimateOnChange.__proto__ || Object.getPrototypeOf(AnimateOnChange)).call(this, props));

    _this.state = { animating: false, clearAnimationClass: false };
    _this.animationStart = _this.animationStart.bind(_this);
    _this.animationEnd = _this.animationEnd.bind(_this);
    return _this;
  }

  _createClass(AnimateOnChange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var elm = this.refs.root;
      this.addEventListener('start', elm, this.animationStart);
      this.addEventListener('end', elm, this.animationEnd);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var elm = this.refs.root;
      this.removeEventListeners('start', elm, this.animationStart);
      this.removeEventListeners('end', elm, this.animationEnd);
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(type, elm, eventHandler) {
      // until an event has been triggered bind them all
      events[type].map(function (event) {
        // console.log(`adding ${event}`)
        elm.addEventListener(event, eventHandler);
      });
    }
  }, {
    key: 'removeEventListeners',
    value: function removeEventListeners(type, elm, eventHandler) {
      events[type].map(function (event) {
        // console.log(`removing ${event}`)
        elm.removeEventListener(event, eventHandler);
      });
    }
  }, {
    key: 'updateEvents',
    value: function updateEvents(type, newEvent) {
      // console.log(`updating ${type} event to ${newEvent}`)
      events[type + 'Removed'] = events[type].filter(function (e) {
        return e !== newEvent;
      });
      events[type] = [newEvent];
    }
  }, {
    key: 'animationStart',
    value: function animationStart(e) {
      if (events['start'].length > 1) {
        this.updateEvents('start', e.type);
        this.removeEventListeners('startRemoved', this.refs.root, this.animationStart);
      }
      this.setState({ animating: true, clearAnimationClass: false });
    }
  }, {
    key: 'animationEnd',
    value: function animationEnd(e) {
      if (events['end'].length > 1) {
        this.updateEvents('end', e.type);
        this.removeEventListeners('endRemoved', this.refs.root, this.animationStart);
      }
      // send separate, animation state change will not render
      this.setState({ clearAnimationClass: true }); // renders
      this.setState({ animating: false, clearAnimationClass: false });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.animating !== nextState.animating) {
        // do not render on animation change
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.baseClassName;

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
}(_react.Component);

AnimateOnChange.propTypes = {
  children: _propTypes2.default.any.isRequired,
  animate: _propTypes2.default.bool.isRequired,
  baseClassName: _propTypes2.default.string.isRequired,
  animationClassName: _propTypes2.default.string.isRequired
};

exports.default = AnimateOnChange;