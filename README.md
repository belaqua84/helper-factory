# helper-factory
A factory written in AngularJS that replaces some of the most useful functions of jquery with pure javascript.  

So far it includes 6 functions:

- hasClass
- addClass
- removeClass
- forEachNode
- debounce
- whichBrowser

##Usage

First, bring the script into your index page:

`<script scr="helperFactory.js"></script>`

Then Dependency Inject helperFactory into any controller or directive or wherever you want to use any of these functions:

`myApp.controller('HelloWorldController', ['$scope', 'helperFactory', function($scope, helperFactory) {...}]);`

To use any of the functions within helperFactory, invoke them thusly:

###hasClass

`helperFactory.hasClass(elem, 'classname'); //returns true/false`

###addClass

`helperFactory.addClass(elem, 'classname'); //adds class name if it is not already present`

###removeClass

`helperFactory.removeClass(elem, 'classname'); //removes class name if present`

###forEachNode

`helperFactory.forEachNode(nodeList, function(index, value){...});`

Typically used in conjunction with `document.querySelectorAll(selector);` which returns a node list, the prototype of which does not include a forEach function.  This forEachNode function iterates through the nodelist and returns the content of each node, which could then, for example, be added to an array which is easier to interact with and has more options.

example:

```
nodeList = document.querySelectorAll('button');
var myArray = [];
helperFactory.forEachNode(nodeList, function(index, value){
  myArray.push(value);
});
```

###debounce

`var efficientFunction = helperFactory.debounce(function() { functionToDebounce() }, 100);`

When a function is called repeatedly, say something attached to a resize or scroll event, we don't necessarily want it to be called continuously, it really only needs to be called once, when the resize or scroll event is complete.  This debounce function will prevent the function called on the resize event from being invoked until there has been no resize event for N miliseconds.

example: 

```
var efficientResize = helperFactory.debounce(function() {
  adjustHeights();
}, 100);  //make the adjustment if no resize activity after 100 miliseconds.

angular.element($window).bind('resize', function () {
  efficientResize();
});
```


###whichBrowser

`helperFactory.whichBrowser() === 'chrome') //returns the browser name in lowercase`
