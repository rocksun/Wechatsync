/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["CodeBlockToPlainText"] = CodeBlockToPlainText;
/* harmony export (immutable) */ __webpack_exports__["processDocCode"] = processDocCode;
/* harmony export (immutable) */ __webpack_exports__["makeImgVisible"] = makeImgVisible;
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getChildren(obj, count) {
  count++
  if (count > 4) return null
  if (obj.children().length > 1) return obj
  return getChildren(obj.children().eq(0), count)
}

function CodeBlockToPlainTextOther(pre) {
  var text = []
  var minSub = getChildren(pre, 0)
  var lines = minSub.children()
  for (let index = 0; index < lines.length; index++) {
    const element = lines.eq(index)
    const codeStr = element.text()
    text.push(escapeHtml(codeStr))
  }
  return text.join('\n')
}

function CodeBlockToPlainText(pre) {
  var text = []
  var minSub = getChildren(pre, 0)
  var lines = pre.find('code')
  if (lines.length > 1) {
    return CodeBlockToPlainTextOther(pre)
  }

  for (let index = 0; index < lines.length; index++) {
    const element = lines.eq(index)
    const codeStr = element[0].innerText
    console.log('codeStr', codeStr)
    var codeLines = codeStr.split('\n')
    codeLines.forEach((codeLine) => {
      text.push('<code>' + escapeHtml(codeLine) + '</code>')
    })
  }
  return text.join('\n')
}

function processDocCode(div) {
  var doc = div
  var pres = doc.find('pre')
  // console.log("find code blocks", pres.length, post);
  for (let mindex = 0; mindex < pres.length; mindex++) {
    const pre = pres.eq(mindex)
    try {
      var newHtml = CodeBlockToPlainText(pre, 0)
      if (newHtml) {
        console.log('processDocCode', newHtml)
        pre.html(newHtml)
      } else {
        console.log('processDocCode.failed')
      }
    } catch (e) {}
  }
}

function makeImgVisible(doc) {
  console.log('makeImgVisible')
  var pres = doc.find('img')
  for (let mindex = 0; mindex < pres.length; mindex++) {
    const item = pres.eq(mindex)
    const src = item.attr('data-src')
    if (src) {
      item.attr('src', src)
    }
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function extend (destination) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) destination[key] = source[key];
    }
  }
  return destination
}

function repeat (character, count) {
  return Array(count + 1).join(character)
}

var blockElements = [
  'address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas',
  'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav',
  'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table',
  'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
];

function isBlock (node) {
  return blockElements.indexOf(node.nodeName.toLowerCase()) !== -1
}

var voidElements = [
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
  'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];

function isVoid (node) {
  return voidElements.indexOf(node.nodeName.toLowerCase()) !== -1
}

var voidSelector = voidElements.join();
function hasVoid (node) {
  return node.querySelector && node.querySelector(voidSelector)
}

var rules = {};

rules.paragraph = {
  filter: 'p',

  replacement: function (content) {
    return '\n\n' + content + '\n\n'
  }
};

rules.lineBreak = {
  filter: 'br',

  replacement: function (content, node, options) {
    return options.br + '\n'
  }
};

rules.heading = {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

  replacement: function (content, node, options) {
    var hLevel = Number(node.nodeName.charAt(1));

    if (options.headingStyle === 'setext' && hLevel < 3) {
      var underline = repeat((hLevel === 1 ? '=' : '-'), content.length);
      return (
        '\n\n' + content + '\n' + underline + '\n\n'
      )
    } else {
      return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'
    }
  }
};

rules.blockquote = {
  filter: 'blockquote',

  replacement: function (content) {
    content = content.replace(/^\n+|\n+$/g, '');
    content = content.replace(/^/gm, '> ');
    return '\n\n' + content + '\n\n'
  }
};

rules.list = {
  filter: ['ul', 'ol'],

  replacement: function (content, node) {
    var parent = node.parentNode;
    if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
      return '\n' + content
    } else {
      return '\n\n' + content + '\n\n'
    }
  }
};

rules.listItem = {
  filter: 'li',

  replacement: function (content, node, options) {
    content = content
      .replace(/^\n+/, '') // remove leading newlines
      .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
      .replace(/\n/gm, '\n    '); // indent
    var prefix = options.bulletListMarker + '   ';
    var parent = node.parentNode;
    if (parent.nodeName === 'OL') {
      var start = parent.getAttribute('start');
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + '.  ';
    }
    return (
      prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
    )
  }
};

rules.indentedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'indented' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },

  replacement: function (content, node, options) {
    return (
      '\n\n    ' +
      node.firstChild.textContent.replace(/\n/g, '\n    ') +
      '\n\n'
    )
  }
};

rules.fencedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'fenced' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },

  replacement: function (content, node, options) {
    var className = node.firstChild.className || '';
    var language = (className.match(/language-(\S+)/) || [null, ''])[1];
    var code = node.firstChild.textContent;

    var fenceChar = options.fence.charAt(0);
    var fenceSize = 3;
    var fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm');

    var match;
    while ((match = fenceInCodeRegex.exec(code))) {
      if (match[0].length >= fenceSize) {
        fenceSize = match[0].length + 1;
      }
    }

    var fence = repeat(fenceChar, fenceSize);

    return (
      '\n\n' + fence + language + '\n' +
      code.replace(/\n$/, '') +
      '\n' + fence + '\n\n'
    )
  }
};

rules.horizontalRule = {
  filter: 'hr',

  replacement: function (content, node, options) {
    return '\n\n' + options.hr + '\n\n'
  }
};

rules.inlineLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'inlined' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    var href = node.getAttribute('href');
    var title = node.title ? ' "' + node.title + '"' : '';
    return '[' + content + '](' + href + title + ')'
  }
};

rules.referenceLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'referenced' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node, options) {
    var href = node.getAttribute('href');
    var title = node.title ? ' "' + node.title + '"' : '';
    var replacement;
    var reference;

    switch (options.linkReferenceStyle) {
      case 'collapsed':
        replacement = '[' + content + '][]';
        reference = '[' + content + ']: ' + href + title;
        break
      case 'shortcut':
        replacement = '[' + content + ']';
        reference = '[' + content + ']: ' + href + title;
        break
      default:
        var id = this.references.length + 1;
        replacement = '[' + content + '][' + id + ']';
        reference = '[' + id + ']: ' + href + title;
    }

    this.references.push(reference);
    return replacement
  },

  references: [],

  append: function (options) {
    var references = '';
    if (this.references.length) {
      references = '\n\n' + this.references.join('\n') + '\n\n';
      this.references = []; // Reset references
    }
    return references
  }
};

rules.emphasis = {
  filter: ['em', 'i'],

  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.emDelimiter + content + options.emDelimiter
  }
};

rules.strong = {
  filter: ['strong', 'b'],

  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.strongDelimiter + content + options.strongDelimiter
  }
};

rules.code = {
  filter: function (node) {
    var hasSiblings = node.previousSibling || node.nextSibling;
    var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings;

    return node.nodeName === 'CODE' && !isCodeBlock
  },

  replacement: function (content) {
    if (!content.trim()) return ''

    var delimiter = '`';
    var leadingSpace = '';
    var trailingSpace = '';
    var matches = content.match(/`+/gm);
    if (matches) {
      if (/^`/.test(content)) leadingSpace = ' ';
      if (/`$/.test(content)) trailingSpace = ' ';
      while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';
    }

    return delimiter + leadingSpace + content + trailingSpace + delimiter
  }
};

rules.image = {
  filter: 'img',

  replacement: function (content, node) {
    var alt = node.alt || '';
    var src = node.getAttribute('src') || '';
    var title = node.title || '';
    var titlePart = title ? ' "' + title + '"' : '';
    return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
  }
};

/**
 * Manages a collection of rules used to convert HTML to Markdown
 */

function Rules (options) {
  this.options = options;
  this._keep = [];
  this._remove = [];

  this.blankRule = {
    replacement: options.blankReplacement
  };

  this.keepReplacement = options.keepReplacement;

  this.defaultRule = {
    replacement: options.defaultReplacement
  };

  this.array = [];
  for (var key in options.rules) this.array.push(options.rules[key]);
}

Rules.prototype = {
  add: function (key, rule) {
    this.array.unshift(rule);
  },

  keep: function (filter) {
    this._keep.unshift({
      filter: filter,
      replacement: this.keepReplacement
    });
  },

  remove: function (filter) {
    this._remove.unshift({
      filter: filter,
      replacement: function () {
        return ''
      }
    });
  },

  forNode: function (node) {
    if (node.isBlank) return this.blankRule
    var rule;

    if ((rule = findRule(this.array, node, this.options))) return rule
    if ((rule = findRule(this._keep, node, this.options))) return rule
    if ((rule = findRule(this._remove, node, this.options))) return rule

    return this.defaultRule
  },

  forEach: function (fn) {
    for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
  }
};

function findRule (rules, node, options) {
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    if (filterValue(rule, node, options)) return rule
  }
  return void 0
}

function filterValue (rule, node, options) {
  var filter = rule.filter;
  if (typeof filter === 'string') {
    if (filter === node.nodeName.toLowerCase()) return true
  } else if (Array.isArray(filter)) {
    if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true
  } else if (typeof filter === 'function') {
    if (filter.call(rule, node, options)) return true
  } else {
    throw new TypeError('`filter` needs to be a string, array, or function')
  }
}

/**
 * The collapseWhitespace function is adapted from collapse-whitespace
 * by Luc Thevenard.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Luc Thevenard <lucthevenard@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * collapseWhitespace(options) removes extraneous whitespace from an the given element.
 *
 * @param {Object} options
 */
function collapseWhitespace (options) {
  var element = options.element;
  var isBlock = options.isBlock;
  var isVoid = options.isVoid;
  var isPre = options.isPre || function (node) {
    return node.nodeName === 'PRE'
  };

  if (!element.firstChild || isPre(element)) return

  var prevText = null;
  var prevVoid = false;

  var prev = null;
  var node = next(prev, element, isPre);

  while (node !== element) {
    if (node.nodeType === 3 || node.nodeType === 4) { // Node.TEXT_NODE or Node.CDATA_SECTION_NODE
      var text = node.data.replace(/[ \r\n\t]+/g, ' ');

      if ((!prevText || / $/.test(prevText.data)) &&
          !prevVoid && text[0] === ' ') {
        text = text.substr(1);
      }

      // `text` might be empty at this point.
      if (!text) {
        node = remove(node);
        continue
      }

      node.data = text;

      prevText = node;
    } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
      if (isBlock(node) || node.nodeName === 'BR') {
        if (prevText) {
          prevText.data = prevText.data.replace(/ $/, '');
        }

        prevText = null;
        prevVoid = false;
      } else if (isVoid(node)) {
        // Avoid trimming space around non-block, non-BR void elements.
        prevText = null;
        prevVoid = true;
      }
    } else {
      node = remove(node);
      continue
    }

    var nextNode = next(prev, node, isPre);
    prev = node;
    node = nextNode;
  }

  if (prevText) {
    prevText.data = prevText.data.replace(/ $/, '');
    if (!prevText.data) {
      remove(prevText);
    }
  }
}

/**
 * remove(node) removes the given node from the DOM and returns the
 * next node in the sequence.
 *
 * @param {Node} node
 * @return {Node} node
 */
function remove (node) {
  var next = node.nextSibling || node.parentNode;

  node.parentNode.removeChild(node);

  return next
}

/**
 * next(prev, current, isPre) returns the next node in the sequence, given the
 * current and previous nodes.
 *
 * @param {Node} prev
 * @param {Node} current
 * @param {Function} isPre
 * @return {Node}
 */
function next (prev, current, isPre) {
  if ((prev && prev.parentNode === current) || isPre(current)) {
    return current.nextSibling || current.parentNode
  }

  return current.firstChild || current.nextSibling || current.parentNode
}

/*
 * Set up window for Node.js
 */

var root = (typeof window !== 'undefined' ? window : {});

/*
 * Parsing HTML strings
 */

function canParseHTMLNatively () {
  var Parser = root.DOMParser;
  var canParse = false;

  // Adapted from https://gist.github.com/1129031
  // Firefox/Opera/IE throw errors on unsupported types
  try {
    // WebKit returns null on unsupported types
    if (new Parser().parseFromString('', 'text/html')) {
      canParse = true;
    }
  } catch (e) {}

  return canParse
}

function createHTMLParser () {
  var Parser = function () {};

  {
    var JSDOM = __webpack_require__(9).JSDOM;
    Parser.prototype.parseFromString = function (string) {
      return new JSDOM(string).window.document
    };
  }
  return Parser
}

var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();

function RootNode (input) {
  var root;
  if (typeof input === 'string') {
    var doc = htmlParser().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + input + '</x-turndown>',
      'text/html'
    );
    root = doc.getElementById('turndown-root');
  } else {
    root = input.cloneNode(true);
  }
  collapseWhitespace({
    element: root,
    isBlock: isBlock,
    isVoid: isVoid
  });

  return root
}

var _htmlParser;
function htmlParser () {
  _htmlParser = _htmlParser || new HTMLParser();
  return _htmlParser
}

function Node (node) {
  node.isBlock = isBlock(node);
  node.isCode = node.nodeName.toLowerCase() === 'code' || node.parentNode.isCode;
  node.isBlank = isBlank(node);
  node.flankingWhitespace = flankingWhitespace(node);
  return node
}

function isBlank (node) {
  return (
    ['A', 'TH', 'TD', 'IFRAME', 'SCRIPT', 'AUDIO', 'VIDEO'].indexOf(node.nodeName) === -1 &&
    /^\s*$/i.test(node.textContent) &&
    !isVoid(node) &&
    !hasVoid(node)
  )
}

function flankingWhitespace (node) {
  var leading = '';
  var trailing = '';

  if (!node.isBlock) {
    var hasLeading = /^\s/.test(node.textContent);
    var hasTrailing = /\s$/.test(node.textContent);
    var blankWithSpaces = node.isBlank && hasLeading && hasTrailing;

    if (hasLeading && !isFlankedByWhitespace('left', node)) {
      leading = ' ';
    }

    if (!blankWithSpaces && hasTrailing && !isFlankedByWhitespace('right', node)) {
      trailing = ' ';
    }
  }

  return { leading: leading, trailing: trailing }
}

function isFlankedByWhitespace (side, node) {
  var sibling;
  var regExp;
  var isFlanked;

  if (side === 'left') {
    sibling = node.previousSibling;
    regExp = / $/;
  } else {
    sibling = node.nextSibling;
    regExp = /^ /;
  }

  if (sibling) {
    if (sibling.nodeType === 3) {
      isFlanked = regExp.test(sibling.nodeValue);
    } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
      isFlanked = regExp.test(sibling.textContent);
    }
  }
  return isFlanked
}

var reduce = Array.prototype.reduce;
var leadingNewLinesRegExp = /^\n*/;
var trailingNewLinesRegExp = /\n*$/;
var escapes = [
  [/\\/g, '\\\\'],
  [/\*/g, '\\*'],
  [/^-/g, '\\-'],
  [/^\+ /g, '\\+ '],
  [/^(=+)/g, '\\$1'],
  [/^(#{1,6}) /g, '\\$1 '],
  [/`/g, '\\`'],
  [/^~~~/g, '\\~~~'],
  [/\[/g, '\\['],
  [/\]/g, '\\]'],
  [/^>/g, '\\>'],
  [/_/g, '\\_'],
  [/^(\d+)\. /g, '$1\\. ']
];

function TurndownService (options) {
  if (!(this instanceof TurndownService)) return new TurndownService(options)

  var defaults = {
    rules: rules,
    headingStyle: 'setext',
    hr: '* * *',
    bulletListMarker: '*',
    codeBlockStyle: 'indented',
    fence: '```',
    emDelimiter: '_',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full',
    br: '  ',
    blankReplacement: function (content, node) {
      return node.isBlock ? '\n\n' : ''
    },
    keepReplacement: function (content, node) {
      return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
    },
    defaultReplacement: function (content, node) {
      return node.isBlock ? '\n\n' + content + '\n\n' : content
    }
  };
  this.options = extend({}, defaults, options);
  this.rules = new Rules(this.options);
}

TurndownService.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */

  turndown: function (input) {
    if (!canConvert(input)) {
      throw new TypeError(
        input + ' is not a string, or an element/document/fragment node.'
      )
    }

    if (input === '') return ''

    var output = process.call(this, new RootNode(input));
    return postProcess.call(this, output)
  },

  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array} plugin The plugin or array of plugins to add
   * @returns The Turndown instance for chaining
   * @type Object
   */

  use: function (plugin) {
    if (Array.isArray(plugin)) {
      for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
    } else if (typeof plugin === 'function') {
      plugin(this);
    } else {
      throw new TypeError('plugin must be a Function or an Array of Functions')
    }
    return this
  },

  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns The Turndown instance for chaining
   * @type Object
   */

  addRule: function (key, rule) {
    this.rules.add(key, rule);
    return this
  },

  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */

  keep: function (filter) {
    this.rules.keep(filter);
    return this
  },

  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */

  remove: function (filter) {
    this.rules.remove(filter);
    return this
  },

  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns A string with Markdown syntax escaped
   * @type String
   */

  escape: function (string) {
    return escapes.reduce(function (accumulator, escape) {
      return accumulator.replace(escape[0], escape[1])
    }, string)
  }
};

/**
 * Reduces a DOM node down to its Markdown string equivalent
 * @private
 * @param {HTMLElement} parentNode The node to convert
 * @returns A Markdown representation of the node
 * @type String
 */

function process (parentNode) {
  var self = this;
  return reduce.call(parentNode.childNodes, function (output, node) {
    node = new Node(node);

    var replacement = '';
    if (node.nodeType === 3) {
      replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue);
    } else if (node.nodeType === 1) {
      replacement = replacementForNode.call(self, node);
    }

    return join(output, replacement)
  }, '')
}

/**
 * Appends strings as each rule requires and trims the output
 * @private
 * @param {String} output The conversion output
 * @returns A trimmed version of the ouput
 * @type String
 */

function postProcess (output) {
  var self = this;
  this.rules.forEach(function (rule) {
    if (typeof rule.append === 'function') {
      output = join(output, rule.append(self.options));
    }
  });

  return output.replace(/^[\t\r\n]+/, '').replace(/[\t\r\n\s]+$/, '')
}

/**
 * Converts an element node to its Markdown equivalent
 * @private
 * @param {HTMLElement} node The node to convert
 * @returns A Markdown representation of the node
 * @type String
 */

function replacementForNode (node) {
  var rule = this.rules.forNode(node);
  var content = process.call(this, node);
  var whitespace = node.flankingWhitespace;
  if (whitespace.leading || whitespace.trailing) content = content.trim();
  return (
    whitespace.leading +
    rule.replacement(content, node, this.options) +
    whitespace.trailing
  )
}

/**
 * Determines the new lines between the current output and the replacement
 * @private
 * @param {String} output The current conversion output
 * @param {String} replacement The string to append to the output
 * @returns The whitespace to separate the current output and the replacement
 * @type String
 */

function separatingNewlines (output, replacement) {
  var newlines = [
    output.match(trailingNewLinesRegExp)[0],
    replacement.match(leadingNewLinesRegExp)[0]
  ].sort();
  var maxNewlines = newlines[newlines.length - 1];
  return maxNewlines.length < 2 ? maxNewlines : '\n\n'
}

function join (string1, string2) {
  var separator = separatingNewlines(string1, string2);

  // Remove trailing/leading newlines and replace with separator
  string1 = string1.replace(trailingNewLinesRegExp, '');
  string2 = string2.replace(leadingNewLinesRegExp, '');

  return string1 + separator + string2
}

/**
 * Determines whether an input can be converted
 * @private
 * @param {String|HTMLElement} input Describe this parameter
 * @returns Describe what it returns
 * @type String|Object|Array|Boolean|Number
 */

function canConvert (input) {
  return (
    input != null && (
      typeof input === 'string' ||
      (input.nodeType && (
        input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11
      ))
    )
  )
}

/* harmony default export */ __webpack_exports__["a"] = (TurndownService);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getDriver"] = getDriver;
/* harmony export (immutable) */ __webpack_exports__["getPublicAccounts"] = getPublicAccounts;
/* harmony export (immutable) */ __webpack_exports__["getMeta"] = getMeta;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jianshu__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zhihu__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toutiao__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__weibo__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__segmentfault__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__juejin__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__csdn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cnblog__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__weixin__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__yidian__ = __webpack_require__(14);












function getDriver(account) {
  if (account.type == 'wordpress') {
    return new __WEBPACK_IMPORTED_MODULE_2__wordpress__["a" /* default */](
      account.params.wpUrl,
      account.params.wpUser,
      account.params.wpPwd
    )
  }

  if (account.type == 'zhihu') {
    return new __WEBPACK_IMPORTED_MODULE_1__zhihu__["a" /* default */]()
  }

  if (account.type == 'jianshu') {
    return new __WEBPACK_IMPORTED_MODULE_0__jianshu__["a" /* default */]()
  }

  if (account.type == 'typecho') {
    return new __WEBPACK_IMPORTED_MODULE_2__wordpress__["a" /* default */](
      account.params.wpUrl,
      account.params.wpUser,
      account.params.wpPwd,
      true
    )
  }

  if (account.type == 'toutiao') {
    return new __WEBPACK_IMPORTED_MODULE_3__toutiao__["a" /* default */]()
  }

  if (account.type == 'weibo') {
    return new __WEBPACK_IMPORTED_MODULE_4__weibo__["a" /* default */]()
  }

  if (account.type == 'segmentfault') {
    return new __WEBPACK_IMPORTED_MODULE_5__segmentfault__["a" /* default */](account)
  }

  if (account.type == 'juejin') {
    return new __WEBPACK_IMPORTED_MODULE_6__juejin__["a" /* default */](account)
  }

  if (account.type == 'csdn') {
    return new __WEBPACK_IMPORTED_MODULE_7__csdn__["a" /* default */](account)
  }

  if (account.type == 'cnblog') {
    return new __WEBPACK_IMPORTED_MODULE_8__cnblog__["a" /* default */](account)
  }
  if (account.type == 'weixin') {
    return new __WEBPACK_IMPORTED_MODULE_9__weixin__["a" /* default */](account)
  }

  if (account.type == 'yidian') {
    return new __WEBPACK_IMPORTED_MODULE_10__yidian__["a" /* default */](account)
  }

  throw Error('not supprt account type')
}

async function getPublicAccounts() {
  console.log('getPublicAccounts')
  var drivers = [
    new __WEBPACK_IMPORTED_MODULE_5__segmentfault__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_7__csdn__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_6__juejin__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_8__cnblog__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_4__weibo__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_1__zhihu__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_0__jianshu__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_3__toutiao__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_9__weixin__["a" /* default */](),
    new __WEBPACK_IMPORTED_MODULE_10__yidian__["a" /* default */](),
  ]
  var users = []
  for (let index = 0; index < drivers.length; index++) {
    const driver = drivers[index]
    try {
      var user = await driver.getMetaData()
      users.push(user)
    } catch (e) {
      console.log(e)
    }
  }
  return users
}

function getMeta() {
  return {
    version: '0.0.7',
    versionNumber: 7,
    log: '',
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var NoteVersionCaches = {}
var defaultNoteBookId

class JianShuDriver {
  constructor() {
    this.name = 'jianshu'
    // chrome.cookies.getAll({ domain: "zhihu.com"},  function(cookies){
    //     console.log(cookies)
    // })
  }

  async getMetaData() {
    var res = await $.ajax({
      url: 'https://www.jianshu.com/settings/basic.json',
    })
    var notebooks = await $.get('https://www.jianshu.com/author/notebooks')
    // console.log(res);
    // https://upload.jianshu.io/users/upload_avatars/12192974/d02c5033-7f82-458f-9b3e-f4c4dbaa1221?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96
    return {
      uid: res.data.avatar.split('/')[5],
      title: res.data.nickname,
      avatar: res.data.avatar,
      type: 'jianshu',
      displayName: '简书',
      supportTypes: ['html'],
      home: 'https://www.jianshu.com/settings/basic',
      icon: 'https://www.jianshu.com/favicon.ico',
      notebooks: notebooks,
    }
  }

  async addPost(post) {
    var notebooks = await $.get('https://www.jianshu.com/author/notebooks')
    var firstNoteBook = notebooks[0]
    defaultNoteBookId = firstNoteBook.id
    var res = await $.ajax({
      url: 'https://www.jianshu.com/author/notes',
      type: 'POST',
      dataType: 'JSON',
      headers: {
        accept: 'application/json',
      },
      contentType: 'application/json',
      data: JSON.stringify({
        at_bottom: false,
        notebook_id: firstNoteBook.id,
        title: post.post_title,
      }),
    })
    console.log(res)
    return {
      status: 'success',
      post_id: res.id,
      notebook_id: firstNoteBook.id,
    }
  }

  async editPost(post_id, post) {
    var cacheVerions = NoteVersionCaches[post_id]
    var notebook_id = post.notebook_id ? post.notebook_id : defaultNoteBookId

    if (!cacheVerions) {
      var bookNotes = await $.get(
        'https://www.jianshu.com/author/notebooks/' + notebook_id + '/notes'
      )
      var currentNote = bookNotes.filter((t) => {
        return t.id == post_id
      })[0]

      console.log(post_id, bookNotes)
      NoteVersionCaches[post_id] = currentNote.autosave_control
      NoteVersionCaches[post_id]++
      cacheVerions = NoteVersionCaches[post_id]
    } else {
      NoteVersionCaches[post_id]++
      cacheVerions = NoteVersionCaches[post_id]
    }

    console.log('currentNote', cacheVerions)
    var requestData = {
      autosave_control: cacheVerions,
    }

    if (post.post_content) {
      requestData.content = post.post_content
    }

    if (post_id) {
      requestData.id = post_id
    }

    if (post.post_title) {
      requestData.title = post.post_title
    }

    // https://www.jianshu.com/author/notebooks/108908/notes
    var res = await $.ajax({
      url: 'https://www.jianshu.com/author/notes/' + post_id,
      type: 'PUT',
      dataType: 'JSON',
      contentType: 'application/json',
      headers: {
        accept: 'application/json',
      },
      data: JSON.stringify(requestData),
    })

    return {
      status: 'success',
      notebook_id: notebook_id,
      post_id: post_id,
      draftLink:
        'https://www.jianshu.com/writer#/notebooks/' +
        notebook_id +
        '/notes/' +
        post_id,
    }
  }

  async uploadFile(file) {
    var src = file.src
    try {
      // jianshu not support webp
      if (src.indexOf('xitu.io') > -1) {
        src = src.replace('webp', 'png')
      }

      var res = await $.ajax({
        url: 'https://www.jianshu.com/upload_images/fetch',
        type: 'POST',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true,
        },
        headers: {
          accept: 'application/json',
        },
        data: JSON.stringify({
          url: src,
        }),
      })

      // http only
      console.log('uploadFile', res)
      return [res]
    } catch (e) {
      console.log('JianShuDriver.uploadFile', e)
      var error = e.responseJSON.error[0].message
      throw new Error(error)
    }
  }

  async preEditPost(post) {
    var div = $('<div>')
    $('body').append(div)
    div.html(post.content)
    var doc = div
    var processEmptyLine = function (idx, el) {
      var $obj = $(this)
      var originalText = $obj.text()
      var img = $obj.find('img')
      var brs = $obj.find('br')
      if (originalText == '') {
        ;(function () {
          if (img.length) return
          if (!brs.length) return
          $obj.remove()
        })()
      }

      // try to replace as h2;
      var strongTag = $obj.find('strong').eq(0)
      var childStrongText = strongTag.text()
      if (originalText == childStrongText) {
        var strongSize = null
        var tagStart = strongTag
        var align = null
        for (let index = 0; index < 4; index++) {
          var fontSize = tagStart.css('font-size')
          var textAlign = tagStart.css('text-align')
          if (fontSize) {
            strongSize = fontSize
          }
          if (textAlign) {
            align = textAlign
          }
          if (align && strongSize) break
          if (tagStart == $obj) {
            console.log('near top')
            break
          }
          tagStart = tagStart.parent()
        }
        if (strongSize) {
          var theFontSize = parseInt(strongSize)
          if (theFontSize > 17 && align == 'center') {
            var newTag = $('<h2></h2>').append($obj.html())
            $obj.after(newTag).remove()
          }
        }
      }
    }

    // remove empty break line
    doc.find('p').each(processEmptyLine)
    doc.find('section').each(processEmptyLine)

    var processBr = function (idx, el) {
      var $obj = $(this)
      if (!$obj.next().length) {
        $obj.remove()
      }
    }
    doc.find('br').each(processBr)
    // table {
    //     margin-bottom: 10px;
    //     border-collapse: collapse;
    //     display: table;
    //     width: 100%!important;
    // }
    // td, th {
    //     word-wrap: break-word;
    //     word-break: break-all;
    //     padding: 5px 10px;
    //     border: 1px solid #DDD;
    // }

    // console.log('found table', doc.find('table'))
    var tempDoc = $('<div>').append(doc.clone())
    post.content =
      tempDoc.children('div').length == 1
        ? tempDoc.children('div').html()
        : tempDoc.html()
    // div.remove();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = JianShuDriver;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getChildren(obj, count) {
  count++
  if (count > 4) return null
  if (obj.children().length > 1) return obj
  return getChildren(obj.children().eq(0), count)
}

function CodeBlockToPlainTextOther(pre) {
  var text = []
  var minSub = getChildren(pre, 0)
  var lines = minSub.children()
  for (let index = 0; index < lines.length; index++) {
    const element = lines.eq(index)
    const codeStr = element.text()
    text.push('<code>' + escapeHtml(codeStr) + '</code>')
  }
  return text.join('\n')
}

function CodeBlockToPlainText(pre) {
  var text = []
  var minSub = getChildren(pre, 0)
  var lines = pre.find('code')
  if (lines.length > 1) {
    return CodeBlockToPlainTextOther(pre)
  }

  for (let index = 0; index < lines.length; index++) {
    const element = lines.eq(index)
    const codeStr = element[0].innerText
    console.log('codeStr', codeStr)
    var codeLines = codeStr.split('\n')
    codeLines.forEach((codeLine) => {
      text.push('<code>' + escapeHtml(codeLine) + '</code>')
    })
  }
  return text.join('\n')
}

class ZhiHuDriver {
  constructor() {
    // this.skipReadImage = true
    this.version = '0.0.1'
    this.name = 'zhihu'
  }

  async getMetaData() {
    var res = await $.ajax({
      url:
        'https://www.zhihu.com/api/v4/me?include=account_status%2Cis_bind_phone%2Cis_force_renamed%2Cemail%2Crenamed_fullname',
    })
    // console.log(res);
    return {
      uid: res.uid,
      title: res.name,
      avatar: res.avatar_url,
      supportTypes: ['html'],
      type: 'zhihu',
      displayName: '知乎',
      home: 'https://www.zhihu.com/settings/account',
      icon: 'https://static.zhihu.com/static/favicon.ico',
    }
  }

  async addPost(post) {
    var res = await $.ajax({
      url: 'https://zhuanlan.zhihu.com/api/articles/drafts',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({
        title: post.post_title,
        // content: post.post_content
      }),
    })
    console.log(res)
    return {
      status: 'success',
      post_id: res.id,
    }
    //
  }

  async editPost(post_id, post) {
    console.log('editPost', post.post_thumbnail)
    var res = await $.ajax({
      url: 'https://zhuanlan.zhihu.com/api/articles/' + post_id + '/draft',
      type: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify({
        title: post.post_title,
        content: post.post_content,
        isTitleImageFullScreen: false,
        titleImage: 'https://pic1.zhimg.com/' + post.post_thumbnail + '.png',
      }),
    })

    return {
      status: 'success',
      post_id: post_id,
      draftLink: 'https://zhuanlan.zhihu.com/p/' + post_id + '/edit',
    }
    // https://zhuanlan.zhihu.com/api/articles/68769713/draft
  }

  untiImageDone(image_id) {
    return new Promise(function(resolve, reject) {
      function waitToNext() {
        console.log('untiImageDone', image_id);
        (async () => {
          var imgDetail = await $.ajax({
            url: 'https://api.zhihu.com/images/' + image_id,
            type: 'GET',
          })
          console.log('imgDetail', imgDetail)
          if (imgDetail.status != 'processing') {
            console.log('all done')
            resolve(imgDetail)
          } else {
            console.log('go next', waitToNext)
            setTimeout(waitToNext, 300)
          }
        })()
      }
      waitToNext()
    })
  }

  async _uploadFile(file) {
    var src = file.src
    var res = await $.ajax({
      url: 'https://zhuanlan.zhihu.com/api/uploaded_images',
      type: 'POST',
      headers: {
        accept: '*/*',
        'x-requested-with': 'fetch',
      },
      data: {
        url: src,
        source: 'article',
      },
    })

    return [
      {
        id: res.hash,
        object_key: res.hash,
        url: res.src,
      },
    ]
  }

  async uploadFile(file) {
    console.log('ZhiHuDriver.uploadFile', file, md5)
    var updateData = JSON.stringify({
      image_hash: md5(file.bits),
      source: 'article',
    })
    console.log('upload', updateData)
    var fileResp = await $.ajax({
      url: 'https://api.zhihu.com/images',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      data: updateData,
    })

    console.log('upload', fileResp)

    var upload_file = fileResp.upload_file
    if (fileResp.upload_file.state == 1) {
      var imgDetail = await this.untiImageDone(upload_file.image_id)
      console.log('imgDetail', imgDetail)
      upload_file.object_key = imgDetail.original_hash
    } else {
      var token = fileResp.upload_token
      let client = new OSS({
        endpoint: 'https://zhihu-pics-upload.zhimg.com',
        accessKeyId: token.access_id,
        accessKeySecret: token.access_key,
        stsToken: token.access_token,
        cname: true,
        bucket: 'zhihu-pics',
      })
      var finalUrl = await client.put(
        upload_file.object_key,
        new Blob([file.bits])
      )
      console.log(client, finalUrl)
    }
    console.log(file, fileResp)
    return [
      {
        id: upload_file.object_key,
        object_key: upload_file.object_key,
        url: 'https://pic4.zhimg.com/' + upload_file.object_key,
        // url: 'https://pic1.zhimg.com/80/' + upload_file.object_key + '_hd.png',
      },
    ]
  }

  async preEditPost(post) {
    var div = $('<div>')
    $('body').append(div)

    // post.content = post.content.replace(/\>\s+\</g,'');
    div.html(post.content)

    // var org = $(post.content);
    // var doc = $('<div>').append(org.clone());
    var doc = div
    var pres = doc.find('pre')
    console.log('find code blocks', pres.length, post)
    for (let mindex = 0; mindex < pres.length; mindex++) {
      const pre = pres.eq(mindex)
      try {
        var newHtml = CodeBlockToPlainText(pre, 0)
        if (newHtml) {
          console.log(newHtml)
          pre.html(newHtml)
        }
      } catch (e) {}
    }

    var processEmptyLine = function (idx, el) {
      var $obj = $(this)
      var originalText = $obj.text()
      var img = $obj.find('img')
      var brs = $obj.find('br')
      if (originalText == '') {
        ;(function () {
          if (img.length) return
          if (!brs.length) return
          $obj.remove()
        })()
      }

      // try to replace as h2;
      var strongTag = $obj.find('strong').eq(0)
      var childStrongText = strongTag.text()
      if (originalText == childStrongText) {
        var strongSize = null
        var tagStart = strongTag
        var align = null
        for (let index = 0; index < 4; index++) {
          var fontSize = tagStart.css('font-size')
          var textAlign = tagStart.css('text-align')
          if (fontSize) {
            strongSize = fontSize
          }
          if (textAlign) {
            align = textAlign
          }
          if (align && strongSize) break
          if (tagStart == $obj) {
            console.log('near top')
            break
          }
          tagStart = tagStart.parent()
        }
        if (strongSize) {
          var theFontSize = parseInt(strongSize)
          if (theFontSize > 17 && align == 'center') {
            var newTag = $('<h2></h2>').append($obj.html())
            $obj.after(newTag).remove()
          }
        }
      }
    }

    // remove empty break line
    doc.find('p').each(processEmptyLine)
    doc.find('section').each(processEmptyLine)

    var processBr = function (idx, el) {
      var $obj = $(this)
      if (!$obj.next().length) {
        $obj.remove()
      }
    }
    doc.find('br').each(processBr)
    // table {
    //     margin-bottom: 10px;
    //     border-collapse: collapse;
    //     display: table;
    //     width: 100%!important;
    // }
    // td, th {
    //     word-wrap: break-word;
    //     word-break: break-all;
    //     padding: 5px 10px;
    //     border: 1px solid #DDD;
    // }

    // console.log('found table', doc.find('table'))
    var tempDoc = $('<div>').append(doc.clone())
    post.content =
      tempDoc.children('div').length == 1
        ? tempDoc.children('div').html()
        : tempDoc.html()
    // div.remove();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ZhiHuDriver;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function xmlrpcWrapper(conf) {
  return new Promise((resolve, reject) => {
    $.xmlrpc(conf).then(
      function (response, status, xhr) {
        resolve({
          response,
          status,
          xhr,
        })
      },
      function (jqXHR, status, error) {
        reject({
          jqXHR,
          status,
          error,
        })
      }
    )
  })
}

class WordpressDriver {
  constructor(url, user, pwd, isTypecho) {
    this.url = url
    this.user = user
    this.pwd = pwd
    this.isTypecho = isTypecho
  }

  getRPC() {
    var endPoint = this.url + '/xmlrpc.php'
    if (this.isTypecho) {
      endPoint = this.url + '/action/xmlrpc'
    }
    return endPoint
  }

  async getMetaData() {
    var params = [this.user, this.pwd]
    var res = await xmlrpcWrapper({
      url: this.getRPC(),
      methodName: 'wp.getUsersBlogs',
      params: params,
    })
    res.icon = chrome.extension.getURL('images/wordpress.ico')
    return res
  }

  addPost(post) {
    if (this.isTypecho) {
      return {
        status: 'success',
        post_id: '1',
      }
    }

    var params = [0, this.user, this.pwd, post]
    var end = this.url
    return xmlrpcWrapper({
      url: this.getRPC(),
      methodName: 'wp.newPost',
      params: params,
    })
  }

  editPost(post_id, post) {
    var params = [0, this.user, this.pwd, post]
    var endpoint = this.getRPC()
    var isTypecho = this.isTypecho
    if (isTypecho) {
      params.push(false)
      params[3] = {
        title: post['post_title'],
        // text: "!!!\n" + post['post_content'].trim() + "\n!!!",
        description: post['post_content'].trim(),
        // markdown: 1
      }
      console.log('params', params)
    } else {
      params[3] = post_id
      params.push(post)
    }
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          var res = await xmlrpcWrapper({
            url: endpoint,
            methodName: isTypecho ? 'metaWeblog.newPost' : 'wp.editPost',
            params: params,
          })

          res.draftLink = this.url + '?p=' + post_id
          console.log('Wordpress', res)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })()
    })
  }

  //  'metaWeblog.getPost' => array($this, 'mwGetPost'),

  uploadFile(file) {
    if (this.isTypecho) {
      file['bytes'] = file['bits']
      delete file['bits']
    }
    var params = [0, this.user, this.pwd, file]

    var end = this.url
    return $.xmlrpc({
      url: this.getRPC(),
      methodName: 'wp.uploadFile',
      params: params,
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WordpressDriver;


window.WordpressDriver = WordpressDriver


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ToutiaoDriver {
  constructor() {
    this.skipReadImage = true
    this.name = 'toutiao'
  }

  async getMetaData() {
    var res = await $.ajax({
      url: 'https://mp.toutiao.com/get_media_info/',
    })
    // console.log(res);
    return {
      uid: res.data.user.id,
      title: res.data.user.screen_name,
      avatar: res.data.user.https_avatar_url,
      supportTypes: ['html'],
      type: 'toutiao',
      displayName: '头条',
      home: 'https://mp.toutiao.com/profile_v3/graphic/publish',
      icon: 'https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/pgcfe/sz/mp_logo.png',
    }
  }

  async addPost(post) {
    return {
      status: 'success',
      post_id: 0,
    }
  }

  async editPost(post_id, post) {
    var pgc_feed_covers = []
    if (post.post_thumbnail_raw && post.post_thumbnail_raw.images) {
      pgc_feed_covers.push({
        id: 0,
        url: post.post_thumbnail_raw.url,
        uri: post.post_thumbnail_raw.images[0].origin_web_uri,
        origin_uri: post.post_thumbnail_raw.images[0].origin_web_uri,
        ic_uri: '',
        thumb_width: post.post_thumbnail_raw.images[0].width,
        thumb_height: post.post_thumbnail_raw.images[0].height,
      })
    }

    await $.get('https://mp.toutiao.com/profile_v3/graphic/publish')

    var res = await $.ajax({
      url:
        'https://mp.toutiao.com/core/article/edit_article_post/?source=mp&type=article',
      type: 'POST',
      dataType: 'JSON',
      data: {
        title: post.post_title,
        article_ad_type: 3,
        article_type: 0,
        from_diagnosis: 0,
        origin_debut_check_pgc_normal: 0,
        tree_plan_article: 0,
        save: 0,
        pgc_id: 0,
        content: post.post_content,
        pgc_feed_covers: JSON.stringify(pgc_feed_covers),
      },
    })

    if (!res.data) {
      throw new Error(res.message)
    }

    return {
      status: 'success',
      post_id: res.data.pgc_id,
      draftLink:
        'https://mp.toutiao.com/profile_v3/graphic/publish?pgc_id=' +
        res.data.pgc_id,
    }
  }

  async uploadFile(file) {
    var src = file.src
    var res = await $.ajax({
      url: 'https://mp.toutiao.com/tools/catch_picture/',
      type: 'POST',
      headers: {
        accept: '*/*',
      },
      data: {
        upfile: src,
        version: 2,
      },
    })

    // throw new Error('fuck');

    if (res.images && !res.images.length) {
      throw new Error('图片上传失败 ' + src)
    }

    // http only
    console.log('uploadFile', res)
    return [res]
  }

  async preEditPost(post) {
    var div = $('<div>')
    $('body').append(div)

    div.html(post.content)

    // var org = $(post.content);
    // var doc = $('<div>').append(org.clone());

    var doc = div
    var pres = doc.find('a')
    for (let mindex = 0; mindex < pres.length; mindex++) {
      const pre = pres.eq(mindex)
      try {
        pre.after(pre.html()).remove()
      } catch (e) {}
    }

    var pres = doc.find('iframe')
    for (let mindex = 0; mindex < pres.length; mindex++) {
      const pre = pres.eq(mindex)
      try {
        pre.remove()
      } catch (e) {}
    }

    try {
      const images = doc.find('img')
      for (let index = 0; index < images.length; index++) {
        const image = images.eq(index)
        const imgSrc = image.attr('src')
        if (imgSrc && imgSrc.indexOf('.svg') > -1) {
          console.log('remove svg Image')
          image.remove()
        }
      }
      const qqm = doc.find('qqmusic')
      qqm.next().remove()
      qqm.remove()
    } catch (e) {}

    post.content = $('<div>').append(doc.clone()).html()
    console.log('post', post)
  }

  editImg(img, source) {
    img.attr('web_uri', source.images[0].origin_web_uri)
  }
  //   <img class="" src="http://p2.pstatp.com/large/pgc-image/bc0a9fc8e595453083d85deb947c3d6e" data-ic="false" data-ic-uri="" data-height="1333" data-width="1000" image_type="1" web_uri="pgc-image/bc0a9fc8e595453083d85deb947c3d6e" img_width="1000" img_height="1333"></img>
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ToutiaoDriver;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var cacheWeiboUser = null
// var Readability = require("../reader/Readability");

// fetch("https://card.weibo.com/article/v3/aj/editor/draft/save?uid=1820387812&id=402", { "credentials": "include", "headers": { "accept": "application/json, text/plain, */*", "accept-language": "zh-CN,zh;q=0.9", "content-type": "application/x-www-form-urlencoded" }, "referrer": "https://card.weibo.com/article/v3/editor", "referrerPolicy": "no-referrer-when-downgrade", "body": "id=402&title=aaaaaaaaaaa&updated=2019-10-10%2016%3A06%3A43&subtitle=&type=&status=0&publish_at=&error_msg=&error_code=0&collection=%5B%5D&free_content=&content=%3Cp%20align%3D%22justify%22%3Eaaaaaaaaaaaaa%3C%2Fp%3E&cover=https%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F6c80e9e4ly1g7t62jq7uzj202s01kdfz.jpg&summary=aaa&writer=&extra=null&is_word=0&article_recommend=%5B%5D&follow_to_read=1&isreward=1&pay_setting=%7B%22ispay%22%3A0%2C%22isvclub%22%3A0%7D&source=0&action=1&save=1", "method": "POST", "mode": "cors" });

class WeiboDriver {
  constructor() {
    this.name = 'weibo'
  }

  async getMetaData() {
    var html = await $.get('https://card.weibo.com/article/v3/editor')
    var configIndx = html.indexOf('$CONFIG')
    var lastIndex = html.indexOf('</script>', configIndx)
    var configStr = html.substring(configIndx - 12, lastIndex)

    if (configStr.indexOf('CONFIG') > -1) {
      var res = new Function(configStr + ' return $CONFIG;')()
      cacheWeiboUser = res
      return {
        uid: res.uid,
        title: res.nick,
        avatar: res.avatar_large,
        supportTypes: ['html'],
        displayName: '微博',
        type: 'weibo',
        home: 'https://card.weibo.com/article/v3/editor',
        icon: 'https://weibo.com/favicon.ico',
      }
    } else {
      throw new Error('not found')
    }
  }

  async addPost(post) {
    var res = await $.post(
      'https://card.weibo.com/article/v3/aj/editor/draft/create?uid=' +
        cacheWeiboUser.uid
    )
    if (res.code != 100000) {
      throw new Error(res.msg)
      return
    }

    console.log(res)
    var post_id = res.data.id

    var res = await $.ajax({
      url:
        'https://card.weibo.com/article/v3/aj/editor/draft/save?uid=' +
        cacheWeiboUser.uid +
        '&id=' +
        post_id,
      type: 'POST',
      dataType: 'JSON',
      headers: {
        accept: 'application/json',
      },
      data: {
        id: post_id,
        title: post.post_title,
        subtitle: '',
        type: '',
        status: '0',
        publish_at: '',
        error_msg: '',
        error_code: '0',
        collection: '[]',
        free_content: '',
        content: post.post_content,
        cover: '',
        summary: '',
        writer: '',
        extra: 'null',
        is_word: '0',
        article_recommend: '[]',
        follow_to_read: '1',
        isreward: '1',
        pay_setting: '{"ispay":0,"isvclub":0}',
        source: '0',
        action: '1',
        content_type: '0',
        save: '1',
      },
      // data: {
      //   id: post_id,
      //   title: post.post_title,
      //   status: 0,
      //   error_code: 0,
      //   content: post.post_content,
      //   cover: "",
      //   // summary: 'aaaab',
      //   writer: "",
      //   is_word: 0,
      //   article_recommend: [],
      //   follow_to_read: 1,
      //   isreward: 1,
      //   pay_setting: JSON.stringify({ ispay: 0, isvclub: 0 }),
      //   source: 0,
      //   action: 1,
      //   save: 1
      // }
    })
    console.log(res)
    return {
      status: 'success',
      post_id: post_id,
    }
  }

  async preEditPost(post) {
    // var div = $('<div>');
    // $('body').append(div);
    // div.html(post.content);

    // // var doc = div;
    // // doc.clone()
    // var documentClone = document.cloneNode(true);
    // var article = new Readability(documentClone).parse();

    // div.remove();
    // console.log(article);
    var rexp = new RegExp('>[\ts ]*<', 'g')
    var result = post.content.replace(rexp, '><')
    post.content = result
  }

  async editPost(post_id, post) {
    var res = await $.ajax({
      url:
        'https://card.weibo.com/article/v3/aj/editor/draft/save?uid=' +
        cacheWeiboUser.uid +
        '&id=' +
        post_id,
      type: 'POST',
      dataType: 'JSON',
      headers: {
        accept: 'application/json',
      },
      data: {
        id: post_id,
        title: post.post_title,
        subtitle: '',
        type: '',
        status: '0',
        publish_at: '',
        error_msg: '',
        error_code: '0',
        collection: '[]',
        free_content: '',
        content: post.post_content,
        cover: post.post_thumbnail_raw ? post.post_thumbnail_raw.url : '',
        summary: '',
        writer: '',
        extra: 'null',
        is_word: '0',
        article_recommend: '[]',
        follow_to_read: '1',
        isreward: '1',
        pay_setting: '{"ispay":0,"isvclub":0}',
        source: '0',
        action: '1',
        content_type: '0',
        save: '1',
      },
      // data: {
      //   id: post_id,
      //   title: post.post_title,
      //   status: 0,
      //   error_code: 0,
      //   content: post.post_content,
      //   cover: post.post_thumbnail_raw ? post.post_thumbnail_raw.url : "",
      //   // summary: 'aaaab',
      //   writer: "",
      //   is_word: 0,
      //   article_recommend: [],
      //   follow_to_read: 1,
      //   isreward: 1,
      //   pay_setting: JSON.stringify({ ispay: 0, isvclub: 0 }),
      //   source: 0,
      //   action: 1,
      //   save: 1
      // }
    })
    console.log(res)
    return {
      status: 'success',
      post_id: post_id,
      draftLink: 'https://card.weibo.com/article/v3/editor#/draft/' + post_id,
    }
  }

  untiImageDone(src) {
    return new Promise((resolve, reject) => {
      ;(async function loop() {
        var res = await $.ajax({
          url:
            'https://card.weibo.com/article/v3/aj/editor/plugins/asyncimginfo?uid=' +
            cacheWeiboUser.uid,
          type: 'POST',
          headers: {
            accept: '*/*',
            'x-requested-with': 'fetch',
          },
          data: {
            'urls[0]': src,
          },
        })

        var done = res.data[0].task_status_code == 1
        if (done) {
          resolve(res.data[0])
        } else {
          setTimeout(loop, 1000)
        }
      })()
    })
  }

  async uploadFile(file) {
    var src = file.src
    var res = await $.ajax({
      url:
        'https://card.weibo.com/article/v3/aj/editor/plugins/asyncuploadimg?uid=' +
        cacheWeiboUser.uid,
      type: 'POST',
      headers: {
        accept: '*/*',
        'x-requested-with': 'fetch',
      },
      data: {
        'urls[0]': src,
      },
    })

    // https://card.weibo.com/article/v3/aj/editor/plugins/asyncuploadimg?uid=1820387812
    var imgDetail = await this.untiImageDone(src)
    return [
      {
        id: imgDetail.pid,
        object_key: imgDetail.pid,
        url: imgDetail.url,
      },
    ]
  }

  async uploadFileOld(file) {
    var blob = new Blob([file.bits])
    console.log('uploadFile', file, blob)
    var fileResp = await $.ajax({
      url:
        'https://picupload.weibo.com/interface/pic_upload.php?app=miniblog&s=json&p=1&data=1&url=&markpos=1&logo=0&nick=',
      type: 'POST',
      processData: false,
      data: new Blob([file.bits]),
    })

    console.log(file, fileResp)
    return [
      {
        id: fileResp.data.pics.pic_1.pid,
        object_key: fileResp.data.pics.pic_1.pid,
        url:
          'https://wx3.sinaimg.cn/large/' +
          fileResp.data.pics.pic_1.pid +
          '.jpg',
      },
    ]
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeiboDriver;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_turndown__ = __webpack_require__(1);
const { processDocCode, makeImgVisible } = __webpack_require__(0)


var segIframe = null
var abb = {}

window.onmessage = (e) => {
  var action = JSON.parse(e.data)
  if (action.eventId && abb[action.eventId]) {
    abb[action.eventId](action.err, action.data)
  }
}

function requestFrameMethod(d) {
  return new Promise((resolve, reject) => {
    var evtId = Date.now() + Math.random()
    d.eventId = evtId
    abb[evtId] = function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    }

    segIframe.contentWindow.postMessage(JSON.stringify(d), '*')
  })
}

class Segmentfault {
  constructor() {
    this.name = 'segmentfault'
  }

  async getMetaData() {
    var res = await $.get('https://segmentfault.com/user/settings')
    var parser = new DOMParser()
    var htmlDoc = parser.parseFromString(res, 'text/html')
    var link = htmlDoc.getElementsByClassName('user-avatar')[0]
    if (!link) {
      throw Error('not found')
    }

    var uid = link.href.split('/').pop()
    var avatar = link.style['background-image']
      .replace('url("', '')
      .replace('")', '')
    console.log(
      link.href,
      link.style['background-image'].replace('url("', '').replace('")', '')
    )

    if (!segIframe) {
      segIframe = document.createElement('iframe')
      segIframe.src = 'https://segmentfault.com/write?freshman=1'
      document.body.append(segIframe)
    }

    return {
      uid: uid,
      title: uid,
      avatar: avatar,
      type: 'segmentfault',
      displayName: 'Segmentfault',
      supportTypes: ['markdown', 'html'],
      home: 'https://segmentfault.com/user/draft',
      icon:
        'https://assets.segmentfault.com/v-5f7db51e/global/img/static/touch-icon.png',
    }
  }

  async addPost(post) {
    console.log('addPost', segIframe)

    var turndownService = new __WEBPACK_IMPORTED_MODULE_0_turndown__["a" /* default */]()
    turndownService.addRule('codefor', {
      filter: ['pre'],
      replacement: function (content) {
        // content = content.replace(new RegExp("` ", "g"), "\n");
        // content = content.replace(new RegExp("`", "g"), "");
        return ['```', content, '```'].join('\n')
      },
    })

    var markdown = turndownService.turndown(post.post_content)
    post.markdown = markdown
    console.log(markdown)

    var data = await requestFrameMethod({
      type: 'sendPost',
      data: {
        type: 1,
        url: '',
        blogId: 0,
        isTiming: 0,
        created: '',
        weibo: 0,
        license: 0,
        tags: '',
        title: post.post_title,
        text: post.markdown,
        articleId: '',
        draftId: '',
        id: '',
      },
    })

    console.log('data', data)
    return {
      status: 'success',
      post_id: data.data,
    }
  }

  async editPost(post_id, post) {
    return {
      status: 'success',
      post_id: post_id,
      draftLink: 'https://segmentfault.com/write?draftId=' + post_id,
    }
  }

  async uploadFile(file) {
    var formdata = new FormData()
    var blob = new Blob([file.bits])
    formdata.append('image', blob)
    var res = await axios({
      url: 'https://segmentfault.com/img/upload/image',
      method: 'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    var url = 'https://image-static.segmentfault.com/' + res.data[2]
    //  return url;
    return [
      {
        id: res.data[2],
        object_key: res.data[2],
        url: url,
      },
    ]
  }

  async preEditPost(post) {
    var div = $('<div>')
    $('body').append(div)

    try {
      // post.content = post.content.replace(/\>\s+\</g,'');
      console.log('zihu.Juejin')
      div.html(post.content)

      // var org = $(post.content);
      // var doc = $('<div>').append(org.clone());
      var doc = div
      // var pres = doc.find("pre");
      processDocCode(div)
      makeImgVisible(div)

      var tempDoc = $('<div>').append(doc.clone())
      post.content =
        tempDoc.children('div').length == 1
          ? tempDoc.children('div').html()
          : tempDoc.html()

      console.log('after.predEdit', post.content)
    } catch (e) {
      console.log('preEdit.error', e)
    }
  }

  async uploadFileByForm($file) {
    var formdata = new FormData()
    formdata.append('image', $file)
    var res = await axios({
      url: 'https://segmentfault.com/img/upload/image',
      method: 'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    var url = 'https://image-static.segmentfault.com/' + res.data[2]
    return url
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Segmentfault;



/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_turndown__ = __webpack_require__(1);
const { processDocCode, makeImgVisible } = __webpack_require__(0)


class Juejin {
  constructor(ac) {
    this.version = '0.0.1'
    this.name = 'juejin'
    this.account = ac
    this.skipUpload = true
    console.log('Juejin', 'initliaze', ac, this)
  }

  async getMetaData() {
    var data = await $.get('https://juejin.im/auth')
    console.log(data)
    return {
      uid: data.userId,
      title: data.user.username,
      avatar: data.user.avatarLarge,
      type: 'juejin',
      displayName: '掘金',
      raw: data,
      supportTypes: ['markdown', 'html'],
      home: 'https://juejin.im/editor/drafts',
      icon: 'https://gold-cdn.xitu.io/favicons/favicon.ico',
    }
  }

  async addPost(post, _instance) {
    // https://post-storage-api-ms.juejin.im/v1/draftStorage
    console.log('addPost', _instance)
    console.log(_instance.account, post.markdown)
    // var post_id = res.data.id;
    console.log('TurndownService', __WEBPACK_IMPORTED_MODULE_0_turndown__["a" /* default */])
    var turndownService = new __WEBPACK_IMPORTED_MODULE_0_turndown__["a" /* default */]()
    turndownService.addRule('codefor', {
      filter: ['pre'],
      replacement: function (content) {
        // content = content.replace(new RegExp("` ", "g"), "\n");
        // content = content.replace(new RegExp("`", "g"), "");
        return ['```', content, '```'].join('\n')
      },
    })

    var markdown = turndownService.turndown(post.post_content)
    console.log(markdown)

    var res = await $.ajax({
      url: 'https://post-storage-api-ms.juejin.im/v1/draftStorage',
      type: 'POST',
      dataType: 'JSON',
      headers: {
        accept: 'application/json',
      },
      data: {
        uid: _instance.account.uid,
        device_id: _instance.account.raw.clientId,
        token: _instance.account.raw.token,
        src: 'web',
        category: '5562b428e4b00c57d9b94b9d',
        content: '',
        // html: post.post_content,
        html: ``,
        markdown: markdown,
        screenshot: '',
        isTitleImageFullscreen: 0,
        tags: '',
        title: post.post_title,
        type: 'markdown',
      },
    })
    console.log(res)
    return {
      status: 'success',
      post_id: res.d[0],
    }
  }

  async editPost(post_id, post) {
    return {
      status: 'success',
      post_id: post_id,
      draftLink: 'https://juejin.im/editor/drafts/' + post_id,
    }
  }

  async uploadFile(file) {
    var src = file.src
    var res = await $.ajax({
      url: 'https://cdn-ms.juejin.im/v1/fetch',
      type: 'POST',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true,
      },
      headers: {
        accept: 'application/json',
      },
      data: JSON.stringify({
        bucket: 'gold-user-assets',
        url: src,
      }),
    })

    console.log(res)
    return [
      {
        id: res.dkey,
        object_key: res.dkey,
        url: res.d.url.https,
      },
    ]
  }

  async preEditPost(post) {
    var div = $('<div>')
    $('body').append(div)

    try {
      // post.content = post.content.replace(/\>\s+\</g,'');
      console.log('zihu.Juejin')
      div.html(post.content)

      // var org = $(post.content);
      // var doc = $('<div>').append(org.clone());
      var doc = div
      // var pres = doc.find("pre");
      processDocCode(div)
      makeImgVisible(div)

      var tempDoc = $('<div>').append(doc.clone())
      post.content =
        tempDoc.children('div').length == 1
          ? tempDoc.children('div').html()
          : tempDoc.html()

      console.log('after.predEdit', post.content)
    } catch (e) {
      console.log('preEdit.error', e)
    }
  }

  async uploadFileByForm($file) {
    var formdata = new FormData()
    formdata.append('file', $file)
    var res = await axios({
      url: 'https://cdn-ms.juejin.im/v1/upload?bucket=gold-user-assets',
      method: 'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return res.data.d.url.http
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Juejin;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// https://mp.csdn.net/mdeditor/saveArticle
// title: 996.ICU项目Stars构成分析
// markdowncontent:
// 996.ICU项目Stars构成分析
// content: <p>996.ICU项目Stars构成分析</p>
// id:
// readType: public
// tags:
// status: 2
// categories:
// type:
// original_link:
// authorized_status: undefined
// articleedittype: 1
// Description:
// resource_url:
// csrf_token:

// https://me.csdn.net/api/user/show

class CSDN {
  constructor() {
    this.name = 'csdn'
  }

  async getMetaData() {
    var res = await $.get('https://me.csdn.net/api/user/show')
    return {
      uid: res.data.csdnid,
      title: res.data.username,
      avatar: res.data.avatarurl,
      type: 'csdn',
      displayName: 'CSDN',
      supportTypes: ['markdown'],
      home: 'https://mp.csdn.net/',
      icon: 'https://csdnimg.cn/public/favicon.ico',
    }
  }

  async addPost(post) {
    var res = await $.ajax({
      url: 'https://mp.csdn.net/mdeditor/saveArticle',
      type: 'POST',
      dataType: 'JSON',
      headers: {
        accept: 'application/json',
      },
      data: {
        title: post.post_title,
        markdowncontent: post.markdown,
        content: post.post_content,
        id: '',
        readType: 'public',
        tags: '',
        status: 2,
        categories: '',
        type: '',
        original_link: '',
        authorized_status: 'undefined',
        articleedittype: 1,
        Description: '',
        resource_url: '',
        csrf_token: '',
      },
    })
    console.log(res)
    return {
      status: 'success',
      post_id: res.data.id,
    }
  }

  async editPost(post_id, post) {
    return {
      status: 'success',
      post_id: post_id,
      draftLink: 'https://mp.csdn.net/mdeditor/' + post_id,
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CSDN;




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// https://mp.csdn.net/mdeditor/saveArticle
// title: 996.ICU项目Stars构成分析
// markdowncontent:
// 996.ICU项目Stars构成分析
// content: <p>996.ICU项目Stars构成分析</p>
// id:
// readType: public
// tags:
// status: 2
// categories:
// type:
// original_link:
// authorized_status: undefined
// articleedittype: 1
// Description:
// resource_url:
// csrf_token:
// https://me.csdn.net/api/user/show
// https://passport.cnblogs.com/user/LoginInfo?callback=jQuery17083998854357229_1570784103705&_=1570784103764

class Cnblog {
  constructor() {
    this.name = 'cnblog'
  }

  async getMetaData() {
    var res = await $.get('https://home.cnblogs.com/user/CurrentUserInfo')
    var parser = new DOMParser()
    var htmlDoc = parser.parseFromString(res, 'text/html')
    var img = htmlDoc.getElementsByClassName('pfs')[0]
    var link = img.parentNode.href
    var pie = link.split('/')
    pie.pop()
    var uid = pie.pop()
    console.log(link)
    return {
      uid: uid,
      title: uid,
      avatar: img.src,
      type: 'cnblog',
      displayName: 'CnBlog',
      supportTypes: ['markdown'],
      home: 'https://i.cnblogs.com/EditArticles.aspx?IsDraft=1',
      icon: 'https://common.cnblogs.com/favicon.ico',
    }
  }

  async addPost(post) {
    var postId = null
    try {
      var res = await $.ajax({
        url: 'https://i.cnblogs.com/EditArticles.aspx?opt=1',
        type: 'POST',
        dataType: 'JSON',
        headers: {},
        data: {
          __VIEWSTATE: '',
          __VIEWSTATEGENERATOR: '',
          Editor$Edit$txbTitle: post.post_title,
          Editor$Edit$EditorBody: post.markdown,
          Editor$Edit$Advanced$ckbPublished: 'on',
          Editor$Edit$Advanced$chkDisplayHomePage: 'on',
          Editor$Edit$Advanced$chkComments: 'on',
          Editor$Edit$Advanced$chkMainSyndication: 'on',
          Editor$Edit$Advanced$txbEntryName: '',
          Editor$Edit$Advanced$txbExcerpt: '',
          Editor$Edit$Advanced$txbTag: '',
          Editor$Edit$Advanced$tbEnryPassword: '',
          Editor$Edit$lkbDraft: '存为草稿',
        },
      })
      console.log('CNBLOG addPost', res)
    } catch (e) {
      var parser = new DOMParser()
      var htmlDoc = parser.parseFromString(e.responseText, 'text/html')
      var editLink = htmlDoc.getElementById('TipsPanel_LinkEdit')
      var ErrorPanel = htmlDoc.getElementsByClassName('ErrorPanel')[0]
      if (editLink) {
        postId = editLink.href.split('postid=')[1]
        console.log('CNBLOG error', editLink, editLink.href.query)
      } else {
        if (ErrorPanel) {
          throw Error(ErrorPanel.innerText)
        }
      }
      console.log('CNBLOG error', e.responseText, htmlDoc, editLink)
    }

    return {
      status: 'success',
      post_id: postId,
    }
  }

  async editPost(post_id, post) {
    return {
      status: 'success',
      post_id: post_id,
      draftLink:
        'https://i.cnblogs.com/EditArticles.aspx?postid=' +
        post_id +
        '&update=1',
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Cnblog;




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var weixinMetaCache = null

class WeixinDriver {
  constructor() {
    this.meta = weixinMetaCache
    this.name = 'weixin'
  }

  async getMetaData() {
    var res = await $.ajax({ url: 'https://mp.weixin.qq.com/' })
    var innerDoc = $(res)
    var doc = $('<div>').append(innerDoc.clone())
    // console.log('WeixinDriver', res);
    var code = doc.find('script').eq(0).text()
    code = code.substring(code.indexOf('window.wx.commonData'))
    var wx = new Function(
      'window.wx = {}; window.handlerNickname = function(){};' +
        code +
        '; return window.wx;'
    )()
    console.log(code, wx)
    var commonData = Object.assign({}, wx.commonData)
    delete window.wx
    if (!commonData.data.t) {
      throw new Error('未登录')
    }
    var metadata = {
      uid: commonData.data.user_name,
      title: commonData.data.nick_name,
      token: commonData.data.t,
      commonData: commonData,
      avatar: doc.find('.weui-desktop-account__thumb').eq(0).attr('src'),
      type: 'weixin',
      supportTypes: ['html'],
      home: 'https://mp.weixin.qq.com',
      icon: 'https://mp.weixin.qq.com/favicon.ico',
    }
    weixinMetaCache = metadata
    console.log('weixinMetaCache', weixinMetaCache)
    return metadata
  }

  async addPost(post) {
    return {
      status: 'success',
      post_id: 0,
    }
  }

  async editPost(post_id, post) {
    console.log('editPost', post.post_thumbnail)
    var res = await $.ajax({
      url:
        'https://mp.weixin.qq.com/cgi-bin/operate_appmsg?t=ajax-response&sub=create&type=10&token=' +
        weixinMetaCache.token +
        '&lang=zh_CN',
      type: 'POST',
      dataType: 'JSON',
      data: {
        token: weixinMetaCache.token,
        lang: 'zh_CN',
        f: 'json',
        ajax: '1',
        random: Math.random(),
        AppMsgId: '',
        count: '1',
        data_seq: '0',
        operate_from: 'Chrome',
        isnew: '0',
        ad_video_transition0: '',
        can_reward0: '0',
        related_video0: '',
        is_video_recommend0: '-1',
        title0: post.post_title,
        author0: '',
        writerid0: '0',
        fileid0: '',
        digest0: post.post_title,
        auto_gen_digest0: '1',
        content0: post.post_content,
        sourceurl0: '',
        need_open_comment0: '1',
        only_fans_can_comment0: '0',
        cdn_url0: '',
        cdn_235_1_url0: '',
        cdn_1_1_url0: '',
        cdn_url_back0: '',
        crop_list0: '',
        music_id0: '',
        video_id0: '',
        voteid0: '',
        voteismlt0: '',
        supervoteid0: '',
        cardid0: '',
        cardquantity0: '',
        cardlimit0: '',
        vid_type0: '',
        show_cover_pic0: '0',
        shortvideofileid0: '',
        copyright_type0: '0',
        releasefirst0: '',
        platform0: '',
        reprint_permit_type0: '',
        allow_reprint0: '',
        allow_reprint_modify0: '',
        original_article_type0: '',
        ori_white_list0: '',
        free_content0: '',
        fee0: '0',
        ad_id0: '',
        guide_words0: '',
        is_share_copyright0: '0',
        share_copyright_url0: '',
        source_article_type0: '',
        reprint_recommend_title0: '',
        reprint_recommend_content0: '',
        share_page_type0: '0',
        share_imageinfo0: '{"list":[]}',
        share_video_id0: '',
        dot0: '{}',
        share_voice_id0: '',
        insert_ad_mode0: '',
        categories_list0: '[]',
        sections0:
          '[{"section_index":1000000,"text_content":"​kkk","section_type":9,"ad_available":false}]',
        compose_info0:
          '{"list":[{"blockIdx":1,"content":"<p>​kkk<br></p>","width":574,"height":27,"topMargin":0,"blockType":9,"background":"rgba(0, 0, 0, 0)","text":"kkk","textColor":"rgb(51, 51, 51)","textFontSize":"17px","textBackGround":"rgba(0, 0, 0, 0)"}]}',
      },
    })

    if (!res.appMsgId) {
      var err = formatError(res)
      console.log('error', err)
      throw new Error(
        '同步失败 错误内容：' + (err && err.errmsg ? err.errmsg : res.ret)
      )
    }
    return {
      status: 'success',
      post_id: res.appMsgId,
      draftLink:
        'https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=' +
        res.appMsgId +
        '&token=' +
        weixinMetaCache.token +
        '&lang=zh_CN',
    }
    // https://zhuanlan.zhihu.com/api/articles/68769713/draft
  }

  async uploadFile(file) {
    var src = file.src
    var res = await $.ajax({
      url:
        'https://mp.weixin.qq.com/cgi-bin/uploadimg2cdn?lang=zh_CN&token=' +
        weixinMetaCache.token +
        '&t=' +
        Math.random(),
      type: 'POST',
      dataType: 'JSON',
      data: {
        imgurl: src,
        t: 'ajax-editor-upload-img',
        token: weixinMetaCache.token,
        lang: 'zh_CN',
        f: 'json',
        ajax: '1',
      },
    })

    if (res.errcode != 0) {
      throw new Error('图片上传失败' + src)
    }
    console.log(res)
    return [
      {
        id: 'aaa',
        object_key: 'aaa',
        url: res.url,
      },
    ]
  }

  async preEditPost(post) {
    var div = $('<div>')
    $('body').append(div)

    if (post.inline_content) {
      post.content = post.inline_content
    }

    div.html(post.content)

    var doc = div
    var tags = doc.find('p')
    for (let mindex = 0; mindex < tags.length; mindex++) {
      const tag = tags.eq(mindex)
      try {
        var nextHasImage = tag.next().children('img').length
        var span = $('<span></span>')
        span.html(tag.html())
        tag.html('')
        tag.append(span)
        // if (!tag.children("br").length) tag.css("margin-bottom", "20px");
        // tag.after("<p><br></p>");
        // span.css("color", "rgb(68, 68, 68)");
        // span.css("font-size", "16px");
      } catch (e) {}
    }

    var tags = doc.find('img')
    for (let mindex = 0; mindex < tags.length; mindex++) {
      const tag = tags.eq(mindex)
      const wraperTag = tag.parent()
      try {
        tag.removeAttr('_src')
        tag.attr('style', '')
        wraperTag.replaceWith('<p>' + wraperTag.html() + '</p>')
      } catch (e) {}
    }

    var pres = doc.find('a')
    for (let mindex = 0; mindex < pres.length; mindex++) {
      const pre = pres.eq(mindex)
      try {
        pre.after(pre.html()).remove()
      } catch (e) {}
    }

    var processEmptyLine = function (idx, el) {
      var $obj = $(this)
      var originalText = $obj.text()
      var img = $obj.find('img')
      var brs = $obj.find('br')
      if (originalText == '') {
        ;(function () {
          if (img.length) return
          if (!brs.length) return
          $obj.remove()
        })()
      }
    }

    var processListItem = function (idx, el) {
      var $obj = $(this)
      $obj.html($('<p></p>').append($obj.html()))
    }

    doc.find('li').each(processListItem)
    // remove empty break line
    doc.find('p').each(processEmptyLine)

    var processBr = function (idx, el) {
      var $obj = $(this)
      if (!$obj.next().length) {
        $obj.remove()
      }
    }

    doc.find('br').each(processBr)
    post.content = $('<div>')
      .append(
        "<section style='margin-left: 6px;margin-right: 6px;line-height: 1.75em;'>" +
          doc.clone().html() +
          '</section>'
      )
      .html()

    console.log('post.content', post.content)
    var inlineCssHTML = juice.inlineContent(
      post.content,
      `
    /**
    * common style
    */

   html, address,
   blockquote,
   body, dd, div,
   dl, dt, fieldset, form,
   frame, frameset,
   h1, h2, h3, h4,
   h5, h6, noframes,
   ol, p, ul, center,
   dir, hr, menu, pre   { display: block; unicode-bidi: embed }
   li              { display: list-item }
   head            { display: none }
   table           { display: table }
   tr              { display: table-row }
   thead           { display: table-header-group }
   tbody           { display: table-row-group }
   tfoot           { display: table-footer-group }
   col             { display: table-column }
   colgroup        { display: table-column-group }
   td, th          { display: table-cell }
   caption         { display: table-caption }
   th              { font-weight: bolder; text-align: center }
   caption         { text-align: center }
   body            { margin: 8px }
   h1              { font-size: 2em; margin: .67em 0 }
   h2              { font-size: 1.5em; margin: .75em 0 }
   h3              { font-size: 1.17em; margin: .83em 0 }
   h4, p,
   blockquote, ul,
   fieldset, form,
   ol, dl, dir,
   menu            { margin: 1.12em 0 }
   h5              { font-size: .83em; margin: 1.5em 0 }
   h6              { font-size: .75em; margin: 1.67em 0 }
   h1, h2, h3, h4,
   h5, h6, b,
   strong          { font-weight: bolder }
   blockquote      { margin-left: 40px; margin-right: 40px }
   i, cite, em,
   var, address    { font-style: italic }
   pre, tt, code,
   kbd, samp       { font-family: monospace }
   pre             { white-space: pre }
   button, textarea,
   input, select   { display: inline-block }
   big             { font-size: 1.17em }
   small, sub, sup { font-size: .83em }
   sub             { vertical-align: sub }
   sup             { vertical-align: super }
   table           { border-spacing: 2px; }
   thead, tbody,
   tfoot           { vertical-align: middle }
   td, th, tr      { vertical-align: inherit }
   s, strike, del  { text-decoration: line-through }
   hr              { border: 1px inset }
   ol, ul, dir,
   menu, dd        { margin-left: 40px }
   ol              { list-style-type: decimal }
   ol ul, ul ol,
   ul ul, ol ol    { margin-top: 0; margin-bottom: 0 }
   u, ins          { text-decoration: underline }
   br:before       { content: "\A"; white-space: pre-line }
   center          { text-align: center }
   :link, :visited { text-decoration: underline }
   :focus          { outline: thin dotted invert }
   
   /* Begin bidirectionality settings (do not change) */
   BDO[DIR="ltr"]  { direction: ltr; unicode-bidi: bidi-override }
   BDO[DIR="rtl"]  { direction: rtl; unicode-bidi: bidi-override }
   
   *[DIR="ltr"]    { direction: ltr; unicode-bidi: embed }
   *[DIR="rtl"]    { direction: rtl; unicode-bidi: embed }
   
   @media print {
     h1            { page-break-before: always }
     h1, h2, h3,
     h4, h5, h6    { page-break-after: avoid }
     ul, ol, dl    { page-break-before: avoid }
   }
   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
     font-weight: bold;
   }
   
   h1 {
     font-size: 1.25em;
     line-height: 1.4em;
   }
   
   h2 {
     font-size: 1.125em;
   }
   
   h3 {
     font-size: 1.05em;
   }
   
   h4,
   h5,
   h6 {
     font-size: 1em;
     margin: 1em 0;
   }

    p {
      color: rgb(51, 51, 51);
      font-size: 15px;
    }

    li p {
      margin: 0;
    }
   `
    )
    console.log('inlineCssHTML new', inlineCssHTML)
    post.content = inlineCssHTML
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeixinDriver;


function formatError(e) {
  var r,
    a = {
      errmsg: '',
      index: !1,
    }
  switch (
    ('undefined' != typeof e.ret
      ? (r = 1 * e.ret)
      : e.base_resp &&
        'undefined' != typeof e.base_resp.ret &&
        (r = 1 * e.base_resp.ret),
    1 * r)
  ) {
    case -8:
    case -6:
      ;(e.ret = '-6'), (a.errmsg = '请输入验证码')
      break

    case 62752:
      a.errmsg = '可能含有具备安全风险的链接，请检查'
      break

    case 64505:
      a.errmsg = '发送预览失败，请稍后再试'
      break

    case 64504:
      a.errmsg = '保存图文消息发送错误，请稍后再试'
      break

    case 64518:
      a.errmsg = '正文只能包含一个投票'
      break

    case 10704:
    case 10705:
      a.errmsg = '该素材已被删除'
      break

    case 10701:
      a.errmsg = '用户已被加入黑名单，无法向其发送消息'
      break

    case 10703:
      a.errmsg = '对方关闭了接收消息'
      break

    case 10700:
    case 64503:
      a.errmsg =
        '1.接收预览消息的微信尚未关注公众号，请先扫码关注<br /> 2.如果已经关注公众号，请查看微信的隐私设置（在手机微信的“我->设置->隐私->添加我的方式”中），并开启“可通过以下方式找到我”的“手机号”、“微信号”、“QQ号”，否则可能接收不到预览消息'
      break

    case 64502:
      a.errmsg = '你输入的微信号不存在，请重新输入'
      break

    case 64501:
      a.errmsg = '你输入的帐号不存在，请重新输入'
      break

    case 412:
      a.errmsg = '图文中含非法外链'
      break

    case 64515:
      a.errmsg = '当前素材非最新内容，请重新打开并编辑'
      break

    case 320001:
      a.errmsg = '该素材已被删除，无法保存'
      break

    case 64702:
      a.errmsg = '标题超出64字长度限制'
      break

    case 64703:
      a.errmsg = '摘要超出120字长度限制'
      break

    case 64704:
      a.errmsg = '推荐语超出300字长度限制'
      break

    case 64708:
      a.errmsg = '推荐语超出140字长度限制'
      break

    case 64515:
      a.errmsg = '当前素材非最新内容'
      break

    case 200041:
      a.errmsg = '此素材有文章存在违规，无法编辑'
      break

    case 64506:
      a.errmsg = '保存失败,链接不合法'
      break

    case 64507:
      a.errmsg =
        '内容不能包含外部链接，请输入http://或https://开头的公众号相关链接'
      break

    case 64510:
      a.errmsg = '内容不能包含音频，请调整'
      break

    case 64511:
      a.errmsg = '内容不能包多个音频，请调整'
      break

    case 64512:
      a.errmsg = '文章中音频错误,请使用音频添加按钮重新添加。'
      break

    case 64508:
      a.errmsg = '查看原文链接可能具备安全风险，请检查'
      break

    case 64550:
      a.errmsg = '请勿插入不合法的图文消息链接'
      break

    case 64558:
      a.errmsg = '请勿插入图文消息临时链接，链接会在短期失效'
      break

    case 64559:
      a.errmsg = '请勿插入未群发的图文消息链接'
      break

    case -99:
      a.errmsg = '内容超出字数，请调整'
      break

    case 64705:
      a.errmsg = '内容超出字数，请调整'
      break

    case -1:
      a.errmsg = '系统错误，请注意备份内容后重试'
      break

    case -2:
    case 200002:
      a.errmsg = '参数错误，请注意备份内容后重试'
      break

    case 64509:
      a.errmsg = '正文中不能包含超过3个视频，请重新编辑正文后再保存。'
      break

    case -5:
      a.errmsg = '服务错误，请注意备份内容后重试。'
      break

    case 64513:
      a.errmsg = '请从正文中选择封面，再尝试保存。'
      break

    case -206:
      a.errmsg = '目前，服务负荷过大，请稍后重试。'
      break

    case 10801:
      ;(a.errmsg =
        '标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。'),
        (a.index = 1 * e.msg)
      break

    case 10802:
      ;(a.errmsg =
        '作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。'),
        (a.index = 1 * e.msg)
      break

    case 10803:
      ;(a.errmsg = '敏感链接，请重新添加。'), (a.index = 1 * e.msg)
      break

    case 10804:
      ;(a.errmsg =
        '摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。'),
        (a.index = 1 * e.msg)
      break

    case 10806:
      ;(a.errmsg =
        '正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。'),
        (a.index = 1 * e.msg)
      break

    case 10808:
      ;(a.errmsg =
        '推荐语不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。'),
        (a.index = 1 * e.msg)
      break

    case 10807:
      a.errmsg = '内容不能违反公众平台协议、相关法律法规和政策，请重新编辑。'
      break

    case 200003:
      a.errmsg = '登录态超时，请重新登录。'
      break

    case 64513:
      a.errmsg = '封面必须存在正文中，请检查封面'
      break

    case 64551:
      a.errmsg = '请检查图文消息中的微视链接后重试。'
      break

    case 64552:
      a.errmsg = '请检查阅读原文中的链接后重试。'
      break

    case 64553:
      a.errmsg = '请不要在图文消息中插入超过5张卡券。请删减卡券后重试。'
      break

    case 64554:
      a.errmsg = '在当前情况下不允许在图文消息中插入卡券，请删除卡券后重试。'
      break

    case 64555:
      a.errmsg = '请检查图文消息卡片跳转的链接后重试。'
      break

    case 64556:
      a.errmsg = '卡券不属于该公众号，请删除后重试'
      break

    case 64557:
      a.errmsg = '卡券无效，请删除后重试。'
      break

    case 13002:
      ;(a.errmsg = '该广告卡片已过期，删除后才可保存成功'),
        (a.index = 1 * e.msg)
      break

    case 13003:
      ;(a.errmsg = '已有文章插入过该广告卡片，一个广告卡片仅可插入一篇文章'),
        (a.index = 1 * e.msg)
      break

    case 13004:
      ;(a.errmsg = '该广告卡片与图文消息位置不一致'), (a.index = 1 * e.msg)
      break

    case 15801:
    case 15802:
    case 15803:
    case 15804:
    case 15805:
    case 15806:
      a.errmsg =
        e.remind_wording ||
        '你所编辑的内容可能含有违反微信公众平台平台协议、相关法律法规和政策的内容'
      break

    case 1530503:
      a.errmsg = '请勿添加其他公众号的主页链接'
      break

    case 1530504:
      a.errmsg = '请勿添加其他公众号的主页链接'
      break

    case 1530510:
      a.errmsg = '链接已失效，请在手机端重新复制链接'
      break

    case 153007:
    case 153008:
    case 153009:
    case 153010:
      a.errmsg =
        '很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字字数大于300字，且自己创作的内容大于引用内容<br />2、文章文字字数小于300字，无视频，且图片（包括封面图）均为你已成功声明原创的图片<br />说明：上述要求中，文章文字字数不包含标点符号和空格，请知悉。'
      break

    case 153200:
      a.errmsg = '无权限声明原创，取消声明后重试'
      break

    case 1530511:
      a.errmsg = '链接已失效，请在手机端重新复制链接'
      break

    case 220001:
      a.errmsg = '"素材管理"中的存储数量已达到上限，请删除后再操作。'
      break

    case 220002:
      a.errmsg = '你的图片库已达到存储上限，请进行清理。'
      break

    case 153012:
      a.errmsg = '请设置转载类型'
      break

    case 200042:
      a.errmsg = '图文中包含的小程序素材不能多于50个、小程序帐号不能多于10个'
      break

    case 200043:
      a.errmsg = '图文中包含没有关联的小程序，请删除后再保存'
      break

    case 64601:
      a.errmsg = '一篇文章只能插入一个广告卡片'
      break

    case 64602:
      a.errmsg = '尚未开通文中广告位，但文章中有广告'
      break

    case 64603:
      a.errmsg = '文中广告前不足300字'
      break

    case 64604:
      a.errmsg = '文中广告后不足300字'
      break

    case 64605:
      a.errmsg = '文中不能同时插入文中广告和互选广告'
      break

    case 65101:
      a.errmsg = '图文模版数量已达到上限，请删除后再操作'
      break

    case 64560:
      a.errmsg = '请勿插入历史图文消息页链接'
      break

    case 64561:
      a.errmsg = '请勿插入mp.weixin.qq.com域名下的非图文消息链接'
      break

    case 64562:
      a.errmsg = '请勿插入非mp.weixin.qq.com域名的链接'
      break

    case 153013:
      a.errmsg = '文章内含有投票，不能设置为开放转载'
      break

    case 153014:
      a.errmsg = '文章内含有卡券，不能设置为开放转载'
      break

    case 153015:
      a.errmsg = '文章内含有小程序链接，不能设置为开放转载'
      break

    case 153016:
      a.errmsg = '文章内含有小程序链接，不能设置为开放转载'
      break

    case 153017:
      a.errmsg = '文章内含有小程序卡片，不能设置为开放转载'
      break

    case 153018:
      a.errmsg = '文章内含有商品，不能设置为开放转载'
      break

    case 153019:
      a.errmsg = '文章内含有广告卡片，不能设置为开放转载'
      break

    case 153020:
      a.errmsg = '文章内含有广告卡片，不能设置为开放转载'
      break

    case 153021:
      a.errmsg = '文章内含有广告卡片，不能设置为开放转载'
      break

    case 153101:
      a.errmsg = '含有原文已删除的转载文章，请删除后重试'
      break

    case 64707:
      a.errmsg = '赞赏账户授权失效或者状态异常'
      break

    case 420001:
      a.errmsg = '封面图不支持GIF，请更换'
      break

    case 353004:
      a.errmsg = '不支持添加商品，请删除后重试'
      break

    case 442001:
      a.errmsg = '帐号新建/编辑素材能力已被封禁，暂不可使用。'
      break

    default:
      a.errmsg = '系统繁忙，请稍后重试'
  }
  return a
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class YiDian {
  constructor() {
    this.skipReadImage = true
  }

  async getMetaData() {
    var res = await $.ajax({ url: 'https://mp.yidianzixun.com' })
    var innerDoc = $(res)
    var doc = $('<div>').append(innerDoc.clone())
    var code = doc.find('#__val_').text()
    console.log('YiDian', code)
    // code = code.substring(code.indexOf("window.mpuser"));
    // eval(code);
    var mpuser = new Function(code + '; return window.mpuser;')()
    var commonData = Object.assign({}, mpuser)
    console.log(commonData)
    if (!commonData.id) {
      throw new Error('未登录')
    }
    var metadata = {
      uid: commonData.id,
      title: commonData.media_name,
      commonData: commonData,
      avatar: commonData.media_pic,
      type: 'yidian',
      supportTypes: ['html'],
      home: 'https://mp.yidianzixun.com',
      icon: 'https://www.yidianzixun.com/favicon.ico',
    }
    return metadata
  }

  async addPost(post) {
    return {
      status: 'success',
      post_id: 0,
    }
  }

  async editPost(post_id, post) {
    var res = await $.ajax({
      url: 'https://mp.yidianzixun.com/model/Article',
      type: 'POST',
      dataType: 'JSON',
      data: {
        title: post.post_title,
        cate: '',
        cateB: '',
        coverType: 'default',
        covers: [],
        content: post.post_content,
        hasSubTitle: 0,
        subTitle: '',
        original: 0,
        reward: 0,
        videos: [],
        audios: [],
        votes: {
          vote_id: '',
          vote_options: [],
          vote_end_time: '',
          vote_title: '',
          vote_type: 1,
          isAdded: false,
        },
        images: [],
        goods: [],
        is_mobile: 0,
        status: 0,
        import_url: '',
        import_hash: '',
        image_urls: {},
        minTimingHour: 3,
        maxTimingDay: 7,
        tags: [],
        isPubed: false,
        lastSaveTime: '',
        dirty: false,
        editorType: 'articleEditor',
        activity_id: 0,
        join_activity: 0,
        notSaveToStore: true,
      },
    })

    if (!res.id) {
      throw new Error('同步错误' + JSON.stringify(res))
    }
    return {
      status: 'success',
      post_id: res.id,
      draftLink: 'https://mp.yidianzixun.com/#/Writing/' + res.id,
    }
  }

  async uploadFile(file) {
    var src = file.src
    var res = await $.get(
      'https://mp.yidianzixun.com/api/getImageFromUrl?src=' +
        encodeURIComponent(src)
    )
    // throw new Error('fuck');
    if (res.status != 'success') {
      throw new Error('图片上传失败 ' + src)
    }
    // http only
    console.log('uploadFile', res)
    return [
      {
        id: '',
        object_key: '',
        url: res.inner_addr,
      },
    ]
  }

  async preEditPost(post) {
    // var div = $("<div>");
    // $("body").append(div);
    // div.html(post.content);
    // // var org = $(post.content);
    // // var doc = $('<div>').append(org.clone());
    // var doc = div;
    // var pres = doc.find("a");
    // for (let mindex = 0; mindex < pres.length; mindex++) {
    //   const pre = pres.eq(mindex);
    //   try {
    //     pre.after(pre.html()).remove();
    //   } catch (e) {}
    // }
    // var pres = doc.find("iframe");
    // for (let mindex = 0; mindex < pres.length; mindex++) {
    //   const pre = pres.eq(mindex);
    //   try {
    //     pre.remove();
    //   } catch (e) {}
    // }
    // post.content = $("<div>")
    //   .append(doc.clone())
    //   .html();
    // console.log("post", post);
  }

  //   editImg(img, source) {
  //     img.attr("web_uri", source.images[0].origin_web_uri);
  //   }
  //   <img class="" src="http://p2.pstatp.com/large/pgc-image/bc0a9fc8e595453083d85deb947c3d6e" data-ic="false" data-ic-uri="" data-height="1333" data-width="1000" image_type="1" web_uri="pgc-image/bc0a9fc8e595453083d85deb947c3d6e" img_width="1000" img_height="1333"></img>
}
/* harmony export (immutable) */ __webpack_exports__["a"] = YiDian;



/***/ })
/******/ ]);