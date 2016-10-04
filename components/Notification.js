'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactIntl = require('react-intl');

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

var _Animate = require('./Animate');

var _Animate2 = _interopRequireDefault(_Animate);

var _Meter = require('./Meter');

var _Meter2 = _interopRequireDefault(_Meter);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Status = require('./icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _Close = require('./icons/base/Close');

var _Close2 = _interopRequireDefault(_Close);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

var _Announcer2 = _interopRequireDefault(_Announcer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.NOTIFICATION;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Notification = function (_Component) {
  (0, _inherits3.default)(Notification, _Component);

  function Notification() {
    (0, _classCallCheck3.default)(this, Notification);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || (0, _getPrototypeOf2.default)(Notification)).call(this));

    _this._announce = _this._announce.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._announce();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._announce();
    }
  }, {
    key: '_announce',
    value: function _announce() {
      var _props = this.props;
      var announce = _props.announce;
      var message = _props.message;
      var intl = this.context.intl;

      if (announce) {
        var notificationMessage = _Intl2.default.getMessage(intl, 'Notification');
        _Announcer2.default.announce(notificationMessage + ': ' + message);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;
      var closer = _props2.closer;
      var context = _props2.context;
      var percentComplete = _props2.percentComplete;
      var message = _props2.message;
      var onClose = _props2.onClose;
      var timestamp = _props2.timestamp;
      var size = _props2.size;
      var state = _props2.state;
      var status = _props2.status;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--status-' + status.toLowerCase(), BACKGROUND_COLOR_INDEX + '-' + status.toLowerCase(), (0, _defineProperty3.default)({}, CLASS_ROOT + '--' + size, size), className);

      var statusNode = void 0;
      if (status) {
        statusNode = _react2.default.createElement(_Status2.default, { className: CLASS_ROOT + '__status',
          value: status, size: size });
      }

      var stateNode = void 0;
      if (state) {
        stateNode = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__state' },
          state
        );
      }

      var progress = void 0;
      if (percentComplete || 0 === percentComplete) {
        progress = _react2.default.createElement(
          _Box2.default,
          { direction: 'row', align: 'center' },
          _react2.default.createElement(_Meter2.default, {
            series: [{
              value: percentComplete,
              colorIndex: 'light-1'
            }] }),
          _react2.default.createElement(_Value2.default, { value: percentComplete, units: '%', size: 'small' })
        );
      }

      var timestampNode = void 0;
      if (timestamp) {
        var timestampFormatted = timestamp.toString();
        if (intl) {
          timestampFormatted = _react2.default.createElement(_reactIntl.FormattedDate, { value: timestamp, weekday: 'long', day: 'numeric',
            month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric',
            second: 'numeric' });
        }

        timestampNode = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__timestamp' },
          timestampFormatted
        );
      }

      var closerNode = void 0;
      if ((typeof closer === 'undefined' ? 'undefined' : (0, _typeof3.default)(closer)) === 'object') {
        closerNode = closer;
      } else if (onClose && closer) {
        closerNode = _react2.default.createElement(_Button2.default, { plain: true, onClick: onClose,
          icon: _react2.default.createElement(_Close2.default, { className: CLASS_ROOT + '__close' }),
          a11yTitle: _Intl2.default.getMessage(intl, 'Close Notification') });
      }

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Notification.propTypes));
      boxProps.announce = false;
      var fullBox = boxProps.hasOwnProperty('full') ? boxProps.full : 'horizontal';

      return _react2.default.createElement(
        _Animate2.default,
        { enter: { animation: 'fade', duration: 1000 },
          leave: { animation: 'fade', duration: 1000 } },
        _react2.default.createElement(
          _Box2.default,
          (0, _extends3.default)({}, restProps, boxProps, { className: classes,
            pad: 'small', direction: 'row', align: 'start', responsive: false,
            full: fullBox }),
          _react2.default.createElement(
            _Box2.default,
            { pad: 'small' },
            statusNode
          ),
          _react2.default.createElement(
            _Box2.default,
            { flex: true, pad: 'small' },
            _react2.default.createElement(
              'span',
              { className: CLASS_ROOT + '__message' },
              message
            ),
            context,
            timestampNode,
            stateNode,
            progress,
            children
          ),
          closerNode
        )
      );
    }
  }]);
  return Notification;
}(_react.Component);

Notification.displayName = 'Notification';
exports.default = Notification;
;

Notification.propTypes = (0, _extends3.default)({
  closer: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.bool]),
  context: _react.PropTypes.node,
  message: _react.PropTypes.string.isRequired,
  onClose: _react.PropTypes.func,
  percentComplete: _react.PropTypes.number,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  state: _react.PropTypes.string,
  status: _react.PropTypes.string,
  timestamp: _react.PropTypes.object }, _Box2.default.propTypes);

Notification.contextTypes = {
  intl: _react.PropTypes.object
};

Notification.defaultProps = {
  closer: false,
  status: 'unknown',
  pad: 'medium'
};
module.exports = exports['default'];