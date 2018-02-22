"use strict";
cc._RF.push(module, '676e6oo4odBmZuI7Tu9kn8d', 'wall-script');
// script/wall-script.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.name = "wall#" + Date.now();
    }

});

cc._RF.pop();