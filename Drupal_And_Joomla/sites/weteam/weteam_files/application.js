/**
 * Глобальные настройки ассинхронных запросов
 */
jQuery.ajaxSetup({
    cache: false
});

/* Глобальное пространство имен */
var IHC = {};

/**
 * Namespace utility
 */
IHC.namespace = function () {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i++) {
        d = a[i].split('.');
        o = IHC;
        for (j = (d[0] === 'IHC') ? 1 : 0; j < d.length; j++) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};

/**
 * Save point engine
 */
(function () {
    var uidx = 1;

    var storage = {};

    /**
     * Generate an id that is unique among application
     * @method guid
     * @param pre {String} optional guid prefix
     * @return {String} the guid
     */
    IHC.guid = function (pre) {
        var p = (pre) || 'ihc';
        return p + '-' + uidx++;
    };

    /**
     * Make a save point for linking DOMNodes and Objects via IDs
     * @param obj {Object}
     * @param pre {String} optional guid prefix
     * @return {String} the guid
     */
    IHC.savepoint = function (obj, pre) {
        var guid = IHC.guid(pre);
        storage[guid] = obj;
        return guid;
    };

    /**
     * Recall data for save point
     * @param guid {String} id of save point
     * @return {Object} stored data
     */
    IHC.recall = function (guid) {
        return (guid in storage) ? storage[guid] : null;
    };
})();


/**
 * JavaScript printf/sprintf functions.
 *
 * This code is unrestricted: you are free to use it however you like.
 *
 * The functions should work as expected, performing left or right alignment,
 * truncating strings, outputting numbers with a required precision etc.
 *
 * For complex cases, these functions follow the Perl implementations of
 * (s)printf, allowing arguments to be passed out-of-order, and to set the
 * precision or length of the output based on arguments instead of fixed
 * numbers.
 *
 * See http://perldoc.perl.org/functions/sprintf.html for more information.
 *
 * Implemented:
 * - zero and space-padding
 * - right and left-alignment,
 * - base X prefix (binary, octal and hex)
 * - positive number prefix
 * - (minimum) width
 * - precision / truncation / maximum width
 * - out of order arguments
 *
 * Not implemented (yet):
 * - vector flag
 * - size (bytes, words, long-words etc.)
 *
 * Will not implement:
 * - %n or %p (no pass-by-reference in JavaScript)
 *
 * @version 2007.04.27
 * @author Ash Searle
 */
(function () {
    // regexp pattern
    var sprintfPattern = /%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;

    String.prototype.sprintf = function () {

        var a = arguments, i = 0, format = this;

        function pad(str, len, chr, leftJustify) {
            var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
            return leftJustify ? str + padding : padding + str;
        }

        function justify(value, prefix, leftJustify, minWidth, zeroPad) {
            var diff = minWidth - value.length;
            if (diff > 0) {
                if (leftJustify || !zeroPad) {
                    value = pad(value, minWidth, ' ', leftJustify);
                } else {
                    value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
                }
            }
            return value;
        }

        function formatBaseX(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
            // Note: casts negative numbers to positive ones
            var number = value >>> 0;
            prefix = prefix && number && {'2': '0b', '8': '0', '16': '0x'}[base] || '';
            value = prefix + pad(number.toString(base), precision || 0, '0', false);
            return justify(value, prefix, leftJustify, minWidth, zeroPad);
        }

        function formatString(value, leftJustify, minWidth, precision, zeroPad) {
            if (precision != null) {
                value = value.slice(0, precision);
            }
            return justify(value, '', leftJustify, minWidth, zeroPad);
        }

        function replaceCallback(substring, valueIndex, flags, minWidth, _, precision, type) {
            if (substring == '%%') return '%';

            // parse flags
            var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false;
            for (var j = 0; flags && j < flags.length; j++) switch (flags.charAt(j)) {
                case ' ': positivePrefix = ' '; break;
                case '+': positivePrefix = '+'; break;
                case '-': leftJustify = true; break;
                case '0': zeroPad = true; break;
                case '#': prefixBaseX = true; break;
            }

            // parameters may be null, undefined, empty-string or real valued
            // we want to ignore null, undefined and empty-string values

            if (!minWidth) {
                minWidth = 0;
            } else if (minWidth == '*') {
                minWidth = +a[i++];
            } else if (minWidth.charAt(0) == '*') {
                minWidth = +a[minWidth.slice(1, -1)];
            } else {
                minWidth = +minWidth;
            }

            // Note: undocumented perl feature:
            if (minWidth < 0) {
                minWidth = -minWidth;
                leftJustify = true;
            }

            if (!isFinite(minWidth)) {
                throw new Error('sprintf: (minimum-)width must be finite');
            }

            if (!precision) {
                precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : void(0);
            } else if (precision == '*') {
                precision = +a[i++];
            } else if (precision.charAt(0) == '*') {
                precision = +a[precision.slice(1, -1)];
            } else {
                precision = +precision;
            }

            // grab value using valueIndex if required?
            var value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++],
                number,
                prefix;

            switch (type) {
                case 's': return formatString(String(value), leftJustify, minWidth, precision, zeroPad);
                case 'c': return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
                case 'b': return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'o': return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'x': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'X': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
                case 'u': return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'i':
                case 'd': {
                    number = parseInt(+value);
                    prefix = number < 0 ? '-' : positivePrefix;
                    value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                    return justify(value, prefix, leftJustify, minWidth, zeroPad);
                }
                case 'e':
                case 'E':
                case 'f':
                case 'F':
                case 'g':
                case 'G': {
                    number = +value;
                    prefix = number < 0 ? '-' : positivePrefix;
                    var method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                    var textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                    value = prefix + Math.abs(number)[method](precision);
                    return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                }
                default: return substring;
            }
        }

        return format.replace(sprintfPattern, replaceCallback);
    };
}());



/**
 * Format money
 */
IHC.formatMoney = function (value) {
    var sign = value < 0 ? "-" : "", rub, kop;
    value = Math.abs(value).toFixed(2).split(".");
    rub = parseInt(value[0]);
    kop = parseInt(value[1]);
    return sign + IHC.Provider.Messages[kop > 0 ? "formatMoneyFull" : "formatMoneyShort"].sprintf(rub, kop);
};


/**
 * Обертки для ассинхронных запросов
 */
(function () {

    function ajaxHelper(method, url, data, callback) {
        if (data instanceof Function) {
            callback = data;
            data = {};
        }
        $.ajax({
            'url': url,
            'data': data,
            'success': callback,
            'error': function (xhr, textStatus) {
//                if (console && $.isFunction(console.log)) console.log(textStatus);
                callback({"errors": [
                    IHC.Provider.Messages.ajax[textStatus] ? IHC.Provider.Messages.ajax[textStatus] : textStatus 
                ]});
            },
            'type': method,
            'dataType': 'json',
            'cache' : false
        });
    }

    IHC.getJSON = function (url, data, callback) {
        ajaxHelper('get', url, data, callback);
    };
    IHC.postJSON = function (url, data, callback) {
        ajaxHelper('post', url, data, callback);
    };
})();




/**
 * Контроллер навигационного меню
 */
$(function () {

    $('#nav > ul > li').each(function (pos) {
        var ele = $(this);
        // декорируем
        var sub = ele.find('ul.sub-menu');
        if (sub.length > 0) {
            var w = document.createElement("div");
            $(w).addClass("w").append(sub);
            ele.append(w);

            // получаем размеры блока
            ele.addClass("over");
            var width = Math.max(sub.outerWidth(), 48 + (function () {
                var mw = 0;
                ele.find("a").each(function () {
                    var ow = $(this).outerWidth();
                    if (mw < ow) {
                        mw = ow;
                    }
                });
                return mw;
            }()));
            sub.add(w).width(width);
            ele.removeClass("over");
        }

        if (pos > 0) {
            ele.hover(function () {
                $(this).addClass("over");
            }, function () {
                $(this).removeClass("over");
            });
        }

    });


});


/**
 * Раскрывающиеся разделы
 */
$(function () {

    $('h1.collapsible').bind('click', function(e) {
        $(this).toggleClass('collapsed')
            .next('div').slideToggle(200);
    });
    $('.expandAll').bind('click', function(e) {
        $('h1.collapsible.collapsed').removeClass('collapsed')
            .next('div').slideDown(200);
        return false;
    });
    $('.collapseAll').bind('click', function(e) {
        $('h1.collapsible').addClass('collapsed')
            .next('div').slideUp(200);
        return false;
    });

});


/**
 * Usability helper
 */
IHC.replaceSubmit = function (form, message) {
    message = message || IHC.Provider.Messages.replaceSubmitDefault;
    $("div.submit-holder", form)
            .children().addClass("hidden")
            .end().append('<p class="spin">' + message + '&hellip;</p>');
};


IHC.htmlspecialchars = function (str) {

     var ENTITIES = {
        34: '&quot;',
        38: '&amp;',
        39: '&#039;',
        60: '&lt;',
        62: '&gt;'
    };

    var i, s = ("" + str).split(""), c;
    for (i = s.length; i--;) {
        c = s[i].charCodeAt(0);
        if (ENTITIES[c]) {
            s[i] = ENTITIES[c];
        }
    }

    return s.join('');
};

IHC.sanitizeTextInput = function (str) {
    return IHC.htmlspecialchars(str).replace(/\n/g, ' ');
}
