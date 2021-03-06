
/**
 * Module dependencies.
 */

var domify = require('domify');
var digit = require('./digit');

/**
 * Expose `Counter`.
 */

module.exports = Counter;

/**
 * Initialize a new `Counter`.
 *
 * @api public
 */

function Counter() {
  this.el = domify('<div class="counter"></div>');
  this._digits = [];
  this.n = 0;
  this.digits(2);
}

/**
 * Set the total number of digits to `n`.
 *
 * @param {Number} n
 * @return {Counter}
 * @api public
 */

Counter.prototype.digits = function(n) {
  this.total = n;
  this.ensureDigits(n);
  return this;
};

/**
 * Add a digit element.
 *
 * @api private
 */

Counter.prototype.addDigit = function() {
  var el = domify(digit);
  this._digits.push(el);
  this.el.appendChild(el);
  this.render(el, 0);
  el.className += ' digit-' + this._digits.length;
};

/**
 * Ensure at least `n` digits are available.
 *
 * @param {Number} n
 * @api private
 */

Counter.prototype.ensureDigits = function(n) {
  while (this._digits.length < n) {
    this.addDigit();
  }
};

/**
 * Update digit `i` with `val`.
 *
 * @param {Number} i
 * @param {String} val
 * @api private
 */

Counter.prototype.updateDigit = function(i, val) {
  var el = this._digits[i];
  var match = el.className.match(/value-([0-9])/);
  var from;
  if (!match) return;
  if (val === match[1]) return;
  this.render(el, val);
};

/**
  * Render value.
  *
  * @param {Element} el
  * @param {String} val
  * @return {Counter}
  * @api private
  */

Counter.prototype.render = function(el, val) {
  el.textContent = val;
  el.className = el.className.replace(/value-[0-9]/, 'value-' + val);
};

/**
 * Update count to `n`.
 *
 * @param {Number} n
 * @return {Counter}
 * @api public
 */

Counter.prototype.update = function(n) {
  this.n = n;
  var str = n.toString();
  var len = str.length;
  var digits = Math.max(len, this.total);

  this.ensureDigits(len);
  for (var i = 0; i < len; ++i) {
    this.updateDigit(digits - i - 1, str[len - i - 1]);
  }

  return this;
};
