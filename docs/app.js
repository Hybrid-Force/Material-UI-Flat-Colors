(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _src = require('../src');

var flatColors = _interopRequireWildcard(_src);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var COLOR_PAIRS = [['turquoise', 'greenSea'], ['emerald', 'nephritis'], ['peterRiver', 'belizeHole'], ['amethyst', 'wisteria'], ['wetAsphalt', 'midnightBlue'], ['sunFlower', 'orange'], ['carrot', 'pumpkin'], ['alizarin', 'pomegranate'], ['clouds', 'silver'], ['concrete', 'asbestos']];
var PALETTE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A400', 'A700'];
var COLOR_DARK = '#1d1d1d';
var COLOR_LIGHT = '#f0f0f0';

function convertHexToRGB(color) {
    if (color.length === 4) {
        var extendedColor = '#';
        for (var i = 1; i < color.length; i += 1) {
            extendedColor += color.charAt(i) + color.charAt(i);
        }
        color = extendedColor;
    }

    var values = {
        r: parseInt(color.substr(1, 2), 16),
        g: parseInt(color.substr(3, 2), 16),
        b: parseInt(color.substr(5, 2), 16)
    };

    return 'rgb(' + values.r + ', ' + values.g + ', ' + values.b + ')';
}

function decomposeColor(color) {
    if (color.charAt(0) === '#') {
        return decomposeColor(convertHexToRGB(color));
    }

    var marker = color.indexOf('(');
    var type = color.substring(0, marker);
    var values = color.substring(marker + 1, color.length - 1).split(',');
    values = values.map(function (value) {
        return parseFloat(value);
    });

    return { type: type, values: values };
}

function getLuminance(color) {
    var decomposedColor = decomposeColor(color);

    if (decomposedColor.type.indexOf('rgb') > -1) {
        var rgb = decomposedColor.values.map(function (val) {
            val /= 255; // normalized
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        // Truncate at 3 digits
        return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
    } else if (decomposedColor.type.indexOf('hsl') > -1) {
        return decomposedColor.values[2] / 100;
    }
}

function getContrastRatio(foreground, background) {
    var lumA = getLuminance(foreground);
    var lumB = getLuminance(background);
    var contrastRatio = (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);

    return Number(contrastRatio.toFixed(2)); // Truncate at two digits
}

function genColorShade(group, shade) {
    var bgColor = group[shade];
    var fgColor = COLOR_DARK;
    if (getContrastRatio(fgColor, bgColor) < 7) {
        fgColor = COLOR_LIGHT;
    }

    return '<div class="color-shade" style="color: ' + fgColor + '; background-color: ' + bgColor + '">\n                <span class="color-shade-key">' + shade + '</span>\n                <span class="color-shade-value">' + bgColor + '</span>\n            </div>';
}

function genColorGroup(name) {
    var group = flatColors[name];
    var bgColor = group[500];
    var fgColor = COLOR_DARK;
    if (getContrastRatio(fgColor, bgColor) < 7) {
        fgColor = COLOR_LIGHT;
    }

    var header = '<div style="color: ' + fgColor + '; background-color: ' + bgColor + '">\n                      <div class="color-shade"><span>' + name + '</span></div>\n                      <div class="color-shade">\n                          <span class="color-shade-key">500</span>\n                          <span class="color-shade-value">' + group[500] + '</span>\n                      </div>\n                  </div>';

    var content = PALETTE.map(genColorShade.bind(null, group)).join('');
    return '<div class="color-group">' + header + content + '</div>';
}

function genContent() {
    var content = COLOR_PAIRS.map(function (pair) {
        var pairContent = pair.map(genColorGroup).join('');
        return '<div class="color-pair">' + pairContent + '</div>';
    }).join('');
    var contentEl = document.querySelector('.content');
    contentEl.innerHTML = content;
    console.log('here');
}

genContent();

},{"../src":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var alizarin = {
    50: '#fceae8',
    100: '#f8c9c5',
    200: '#f3a69e',
    300: '#ee8277',
    400: '#eb6759',
    500: '#e74c3c',
    600: '#e44536',
    700: '#e03c2e',
    800: '#dd3327',
    900: '#d7241a',
    A100: '#ffffff',
    A200: '#ffd9d7',
    A400: '#ffa8a4',
    A700: '#ff8f8b',
    'contrastDefaultColor': 'light'
};

exports.default = alizarin;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var amethyst = {
    50: '#f3ebf6',
    100: '#e1cde9',
    200: '#cdacdb',
    300: '#b98bcc',
    400: '#aa72c1',
    500: '#9b59b6',
    600: '#9351af',
    700: '#8948a6',
    800: '#7f3e9e',
    900: '#6d2e8e',
    A100: '#f0d4ff',
    A200: '#dea1ff',
    A400: '#cb6eff',
    A700: '#c255ff',
    'contrastDefaultColor': 'light'
};

exports.default = amethyst;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var asbestos = {
    50: '#f0f1f1',
    100: '#d9dddd',
    200: '#bfc6c6',
    300: '#a5afaf',
    400: '#929d9e',
    500: '#7f8c8d',
    600: '#778485',
    700: '#6c797a',
    800: '#626f70',
    900: '#4f5c5d',
    A100: '#c6f8fc',
    A200: '#96f2f9',
    A400: '#5df3ff',
    A700: '#44f2ff',
    'contrastDefaultColor': 'dark'
};

exports.default = asbestos;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var belizeHole = {
    50: '#e5f0f7',
    100: '#bfd9ea',
    200: '#94c0dc',
    300: '#69a6ce',
    400: '#4993c4',
    500: '#2980b9',
    600: '#2478b2',
    700: '#1f6daa',
    800: '#1963a2',
    900: '#0f5093',
    A100: '#c3deff',
    A200: '#90c3ff',
    A400: '#5da7ff',
    A700: '#4499ff',
    'contrastDefaultColor': 'light'
};

exports.default = belizeHole;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var carrot = {
    50: '#fcf0e4',
    100: '#f8d8bd',
    200: '#f3bf91',
    300: '#eea564',
    400: '#ea9143',
    500: '#e67e22',
    600: '#e3761e',
    700: '#df6b19',
    800: '#db6114',
    900: '#d54e0c',
    A100: '#ffffff',
    A200: '#ffdbcd',
    A400: '#ffb79a',
    A700: '#ffa580',
    'contrastDefaultColor': 'dark'
};

exports.default = carrot;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var clouds = {
    50: '#fdfdfd',
    100: '#f9fbfb',
    200: '#f6f8f8',
    300: '#f2f5f5',
    400: '#eff2f3',
    500: '#ecf0f1',
    600: '#eaeeef',
    700: '#e7eced',
    800: '#e4e9eb',
    900: '#dfe5e7',
    A100: '#ffffff',
    A200: '#ffffff',
    A400: '#ffffff',
    A700: '#ffffff',
    'contrastDefaultColor': 'dark'
};

exports.default = clouds;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var concrete = {
    50: '#f2f4f4',
    100: '#dfe4e4',
    200: '#cad2d3',
    300: '#b5c0c1',
    400: '#a5b3b3',
    500: '#95a5a6',
    600: '#8d9d9e',
    700: '#829395',
    800: '#788a8b',
    900: '#67797b',
    A100: '#f3fdfe',
    A200: '#c2f7fc',
    A400: '#8cf4ff',
    A700: '#73f2ff',
    'contrastDefaultColor': 'dark'
};

exports.default = concrete;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var emerald = {
    50: '#e6f9ee',
    100: '#c0f0d4',
    200: '#97e6b8',
    300: '#6ddb9c',
    400: '#4dd486',
    500: '#2ecc71',
    600: '#29c769',
    700: '#23c05e',
    800: '#1db954',
    900: '#12ad42',
    A100: '#deffe7',
    A200: '#abffc2',
    A400: '#78ff9c',
    A700: '#5eff8a',
    'contrastDefaultColor': 'dark'
};

exports.default = emerald;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var greenSea = {
    50: '#e3f4f0',
    100: '#b9e3da',
    200: '#8bd0c2',
    300: '#5cbdaa',
    400: '#39ae97',
    500: '#16a085',
    600: '#13987d',
    700: '#108e72',
    800: '#0c8468',
    900: '#067355',
    A100: '#a2ffe2',
    A200: '#6fffd2',
    A400: '#3cffc2',
    A700: '#23ffba',
    'contrastDefaultColor': 'light'
};

exports.default = greenSea;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alizarin = require('./alizarin');

Object.defineProperty(exports, 'alizarin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_alizarin).default;
  }
});

var _amethyst = require('./amethyst');

Object.defineProperty(exports, 'amethyst', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_amethyst).default;
  }
});

var _asbestos = require('./asbestos');

Object.defineProperty(exports, 'asbestos', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_asbestos).default;
  }
});

var _belizeHole = require('./belizeHole');

Object.defineProperty(exports, 'belizeHole', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_belizeHole).default;
  }
});

var _carrot = require('./carrot');

Object.defineProperty(exports, 'carrot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_carrot).default;
  }
});

var _clouds = require('./clouds');

Object.defineProperty(exports, 'clouds', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_clouds).default;
  }
});

var _concrete = require('./concrete');

Object.defineProperty(exports, 'concrete', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_concrete).default;
  }
});

var _emerald = require('./emerald');

Object.defineProperty(exports, 'emerald', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_emerald).default;
  }
});

var _greenSea = require('./greenSea');

Object.defineProperty(exports, 'greenSea', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_greenSea).default;
  }
});

var _midnightBlue = require('./midnightBlue');

Object.defineProperty(exports, 'midnightBlue', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_midnightBlue).default;
  }
});

var _nephritis = require('./nephritis');

Object.defineProperty(exports, 'nephritis', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nephritis).default;
  }
});

var _orange = require('./orange');

Object.defineProperty(exports, 'orange', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_orange).default;
  }
});

var _peterRiver = require('./peterRiver');

Object.defineProperty(exports, 'peterRiver', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_peterRiver).default;
  }
});

var _pomegranate = require('./pomegranate');

Object.defineProperty(exports, 'pomegranate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pomegranate).default;
  }
});

var _pumpkin = require('./pumpkin');

Object.defineProperty(exports, 'pumpkin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pumpkin).default;
  }
});

var _silver = require('./silver');

Object.defineProperty(exports, 'silver', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_silver).default;
  }
});

var _sunFlower = require('./sunFlower');

Object.defineProperty(exports, 'sunFlower', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sunFlower).default;
  }
});

var _turquoise = require('./turquoise');

Object.defineProperty(exports, 'turquoise', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_turquoise).default;
  }
});

var _wetAsphalt = require('./wetAsphalt');

Object.defineProperty(exports, 'wetAsphalt', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_wetAsphalt).default;
  }
});

var _wisteria = require('./wisteria');

Object.defineProperty(exports, 'wisteria', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_wisteria).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./alizarin":2,"./amethyst":3,"./asbestos":4,"./belizeHole":5,"./carrot":6,"./clouds":7,"./concrete":8,"./emerald":9,"./greenSea":10,"./midnightBlue":12,"./nephritis":13,"./orange":14,"./peterRiver":15,"./pomegranate":16,"./pumpkin":17,"./silver":18,"./sunFlower":19,"./turquoise":20,"./wetAsphalt":21,"./wisteria":22}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var midnightBlue = {
    50: '#e6e8ea',
    100: '#c0c5cb',
    200: '#969fa8',
    300: '#6b7885',
    400: '#4c5b6a',
    500: '#2c3e50',
    600: '#273849',
    700: '#213040',
    800: '#1b2837',
    900: '#101b27',
    A100: '#68abff',
    A200: '#358fff',
    A400: '#0272ff',
    A700: '#0067e7',
    'contrastDefaultColor': 'light'
};

exports.default = midnightBlue;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var nephritis = {
    50: '#e5f5ec',
    100: '#bee7cf',
    200: '#93d7b0',
    300: '#68c690',
    400: '#47ba78',
    500: '#27ae60',
    600: '#23a758',
    700: '#1d9d4e',
    800: '#179444',
    900: '#0e8433',
    A100: '#b5ffc9',
    A200: '#82ffa4',
    A400: '#4fff7f',
    A700: '#36ff6d',
    'contrastDefaultColor': 'light'
};

exports.default = nephritis;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var orange = {
    50: '#fef3e3',
    100: '#fbe1b8',
    200: '#f9ce89',
    300: '#f7ba59',
    400: '#f5ab36',
    500: '#f39c12',
    600: '#f19410',
    700: '#ef8a0d',
    800: '#ed800a',
    900: '#ea6e05',
    A100: '#ffffff',
    A200: '#ffecdf',
    A400: '#ffceac',
    A700: '#ffbf92',
    'contrastDefaultColor': 'dark'
};

exports.default = orange;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var peterRiver = {
    50: '#e7f3fb',
    100: '#c2e0f4',
    200: '#9acced',
    300: '#71b7e6',
    400: '#52a7e0',
    500: '#3498db',
    600: '#2f90d7',
    700: '#2785d2',
    800: '#217bcd',
    900: '#156ac4',
    A100: '#f5f9ff',
    A200: '#c2ddff',
    A400: '#8fc1ff',
    A700: '#75b3ff',
    'contrastDefaultColor': 'dark'
};

exports.default = peterRiver;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pomegranate = {
    50: '#f7e7e6',
    100: '#ecc4bf',
    200: '#e09c95',
    300: '#d3746b',
    400: '#c9574b',
    500: '#c0392b',
    600: '#ba3326',
    700: '#b22c20',
    800: '#aa241a',
    900: '#9c1710',
    A100: '#ffcfcd',
    A200: '#ff9e9a',
    A400: '#ff6c67',
    A700: '#ff544d',
    'contrastDefaultColor': 'light'
};

exports.default = pomegranate;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pumpkin = {
    50: '#faeae0',
    100: '#f2ccb3',
    200: '#e9aa80',
    300: '#e0874d',
    400: '#da6e26',
    500: '#d35400',
    600: '#ce4d00',
    700: '#c84300',
    800: '#c23a00',
    900: '#b72900',
    A100: '#ffe5e0',
    A200: '#ffbaad',
    A400: '#ff8f7a',
    A700: '#ff7961',
    'contrastDefaultColor': 'light'
};

exports.default = pumpkin;

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var silver = {
    50: '#f7f8f8',
    100: '#ebedee',
    200: '#dee1e3',
    300: '#d1d5d8',
    400: '#c7cccf',
    500: '#bdc3c7',
    600: '#b7bdc1',
    700: '#aeb5ba',
    800: '#a6aeb3',
    900: '#98a1a6',
    A100: '#ffffff',
    A200: '#ffffff',
    A400: '#e1f3ff',
    A700: '#c8e9ff',
    'contrastDefaultColor': 'dark'
};

exports.default = silver;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sunFlower = {
    50: '#fdf8e2',
    100: '#fbedb7',
    200: '#f8e287',
    300: '#f5d657',
    400: '#f3cd33',
    500: '#f1c40f',
    600: '#efbe0d',
    700: '#edb60b',
    800: '#ebaf08',
    900: '#e7a204',
    A100: '#ffffff',
    A200: '#fff3da',
    A400: '#ffe1a7',
    A700: '#ffd98e',
    'contrastDefaultColor': 'dark'
};

exports.default = sunFlower;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var turquoise = {
    50: '#e4f7f3',
    100: '#baebe1',
    200: '#8ddece',
    300: '#5fd0ba',
    400: '#3cc6ab',
    500: '#1abc9c',
    600: '#17b694',
    700: '#13ad8a',
    800: '#0fa580',
    900: '#08976e',
    A100: '#c3ffec',
    A200: '#90ffdc',
    A400: '#5dffcc',
    A700: '#44ffc4',
    'contrastDefaultColor': 'dark'
};

exports.default = turquoise;

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var wetAsphalt = {
    50: '#e7e9ec',
    100: '#c2c8cf',
    200: '#9aa4af',
    300: '#71808e',
    400: '#526476',
    500: '#34495e',
    600: '#2f4256',
    700: '#27394c',
    800: '#213142',
    900: '#152131',
    A100: '#72adff',
    A200: '#3f8fff',
    A400: '#0c71ff',
    A700: '#0065f1',
    'contrastDefaultColor': 'light'
};

exports.default = wetAsphalt;

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var wisteria = {
    50: '#f1e9f5',
    100: '#ddc7e6',
    200: '#c7a2d6',
    300: '#b07cc6',
    400: '#9f60b9',
    500: '#8e44ad',
    600: '#863ea6',
    700: '#7b359c',
    800: '#712d93',
    900: '#5f1f83',
    A100: '#e7bfff',
    A200: '#d38cff',
    A400: '#bf59ff',
    A700: '#b640ff',
    'contrastDefaultColor': 'light'
};

exports.default = wisteria;

},{}]},{},[1]);
