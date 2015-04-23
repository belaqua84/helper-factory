(function(){ //encapsulating the factory keeps its contents out of the global namespace.

    'use strict';

	angular.module('yourApp').factory('helperFactory', function(){
        return {
            debounce: function(func, wait, immediate){              // Returns a function that as long as it continues to be invoked, will not
                var timeout;                                        // be triggered. The function will be called after it stops being invoked for
                return function() {                                 // N milliseconds. If `immediate` is passed, trigger the function on the
                    var context = this, args = arguments;           // leading edge, instead of the trailing.
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            },
            // forEach method to iterate over nodelist (presumably) returned by querySelectorAll
            forEachNode: function(nodeList, callback, model){
                for (var i = 0; i < nodeList.length; i++) {
                    callback.call(model, i, nodeList[i]); // passes back the stuff we need
                }
            },
            objectLength: function(obj){
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            },
            whichBrowser: function(){
                //I know, I know, don't use browser detection, use feature detection, but sometimes you need browser detection if yuo have a design bug between different browsers.
                var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
                var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
                var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; // At least Safari 3+: "[object HTMLElementConstructor]"
                var isChrome = !!window.chrome && !isOpera; // Chrome 1+
                var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

                var browser;

                switch(true){
                    case isChrome:
                        browser = 'chrome';
                        break;
                    case isSafari:
                        browser = 'safari';
                        break;
                    case isOpera:
                        browser = 'opera';
                        break;
                    case isFirefox:
                        browser = 'firefox';
                        break;
                    case isIE:
                        browser = 'ie';
                        break;
                }
                return browser;
            }
        };
	});
}());