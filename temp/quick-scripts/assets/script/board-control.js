(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/board-control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'de83dRC76lG0pgtotSxBVXj', 'board-control', __filename);
// script/board-control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
        _randNum: 0

    },

    onLoad: function onLoad() {
        this._randNum = Math.round(cc.random0To1()) * 2 - 1;
    },
    update: function update(dt) {
        if (this.node.x <= -185) {
            this._randNum = 1;
        }
        if (this.node.x >= 185) {
            this._randNum = -1;
        }
        if (this._randNum == 1) {
            this.node.x += this.speed * dt;
        }
        if (this._randNum == -1) {
            this.node.x -= this.speed * dt;
        }
    },
    onCollisionStay: function onCollisionStay(other, self) {
        if (other.node.group == 'player') {
            if (this._randNum == 1) {
                other.node.x += this.speed / 60;
            }
            if (this._randNum == -1) {
                other.node.x -= this.speed / 60;
            }
        }
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=board-control.js.map
        