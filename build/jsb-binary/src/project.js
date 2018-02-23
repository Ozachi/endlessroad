require = function t(n, e, i) {
function o(c, s) {
if (!e[c]) {
if (!n[c]) {
var r = "function" == typeof require && require;
if (!s && r) return r(c, !0);
if (a) return a(c, !0);
var h = new Error("Cannot find module '" + c + "'");
throw h.code = "MODULE_NOT_FOUND", h;
}
var d = e[c] = {
exports: {}
};
n[c][0].call(d.exports, function(t) {
var e = n[c][1][t];
return o(e || t);
}, d, d.exports, t, n, e, i);
}
return e[c].exports;
}
for (var a = "function" == typeof require && require, c = 0; c < i.length; c++) o(i[c]);
return o;
}({
"board-control": [ function(t, n, e) {
"use strict";
cc._RF.push(n, "de83dRC76lG0pgtotSxBVXj", "board-control");
cc.Class({
extends: cc.Component,
properties: {
speed: 100,
_randNum: 0
},
onLoad: function() {
this._randNum = 2 * Math.round(cc.random0To1()) - 1;
},
update: function(t) {
this.node.x <= -185 && (this._randNum = 1);
this.node.x >= 185 && (this._randNum = -1);
1 == this._randNum && (this.node.x += this.speed * t);
-1 == this._randNum && (this.node.x -= this.speed * t);
},
onCollisionStay: function(t, n) {
if ("player" == t.node.group) {
1 == this._randNum && (t.node.x += this.speed / 60);
-1 == this._randNum && (t.node.x -= this.speed / 60);
}
}
});
cc._RF.pop();
}, {} ],
"game-control": [ function(t, n, e) {
"use strict";
cc._RF.push(n, "5cc5cEwXJNFAq9ZSvQUDxF6", "game-control");
cc.Class({
extends: cc.Component,
properties: {
startDoorPrefab: cc.Prefab,
endDoorPrefab: cc.Prefab,
playerPrefab: cc.Prefab,
boardPrefab: cc.Prefab
},
onLoad: function() {
this.createThings();
},
createThings: function() {
var t = cc.instantiate(this.startDoorPrefab);
cc.find("Canvas/Center").addChild(t);
t.setPosition(this.getRandomPosition(0));
var n = cc.instantiate(this.endDoorPrefab);
cc.find("Canvas/Center").addChild(n);
n.setPosition(this.getRandomPosition(1));
var e = cc.instantiate(this.playerPrefab);
cc.find("Canvas/Center").addChild(e);
e.setPosition(t.getPosition());
var i = cc.instantiate(this.boardPrefab);
cc.find("Canvas/Center").addChild(i);
i.setPosition(this.getRandomPosition(2));
var o = cc.instantiate(this.boardPrefab);
cc.find("Canvas/Center").addChild(o);
o.setPosition(this.getRandomPosition(3));
},
getRandomPosition: function(t) {
if (0 == t) {
var n = -265, e = 500 * cc.random0To1() - 250;
return cc.p(e, n);
}
if (1 == t) {
var n = 365, e = 500 * cc.random0To1() - 250;
return cc.p(e, n);
}
if (2 == t) {
var n = 150, e = 370 * cc.random0To1() - 185;
return cc.p(e, n);
}
if (3 == t) {
var n = -50, e = 370 * cc.random0To1() - 185;
return cc.p(e, n);
}
}
});
cc._RF.pop();
}, {} ],
"move-control": [ function(t, n, e) {
"use strict";
cc._RF.push(n, "d63c0BfnYVDeJC9FQDTfVdR", "move-control");
cc.Class({
extends: cc.Component,
properties: {
_left: !1,
_right: !1,
_up: !1,
_down: !1,
_jumping: !1,
jumpY: 40,
speedX: 5,
_speedY: 0,
g: -10,
_leftBlock: 0,
_rightBlock: 0,
_upBlock: 0,
_downBlock: 0,
_anim: null,
_animState: null
},
onLoad: function() {
this._anim = this.getComponent(cc.Animation);
cc.systemEvent.on("keydown", this.onKeyDown, this);
cc.systemEvent.on("keyup", this.onKeyUp, this);
cc.director.getCollisionManager().enabled = !0;
this.onInventedKeyEvent();
},
onInventedKeyEvent: function() {
var t = this;
cc.find("Canvas/LeftBottom/goleft").on(cc.Node.EventType.TOUCH_START, function(n) {
t._left = !0;
t.node.scaleX = -1;
t.changeAnim();
});
cc.find("Canvas/LeftBottom/goleft").on(cc.Node.EventType.TOUCH_END, function(n) {
t._left = !1;
t.changeAnim();
});
cc.find("Canvas/LeftBottom/goright").on(cc.Node.EventType.TOUCH_START, function(n) {
t._right = !0;
t.node.scaleX = 1;
t.changeAnim();
});
cc.find("Canvas/LeftBottom/goright").on(cc.Node.EventType.TOUCH_END, function(n) {
t._right = !1;
t.changeAnim();
});
cc.find("Canvas/RightBottom/gojump").on(cc.Node.EventType.TOUCH_START, function(n) {
t._up = !0;
t._jumping = !0;
t.changeAnim();
});
},
onCollisionEnter: function(t, n) {
"door" == t.node.group && cc.director.loadScene("Game");
if ("wall" == t.node.group) {
var e = [], i = n.world.aabb, o = t.world.aabb, a = n.world.preAabb;
t.world.preAabb;
if (a.xMax <= o.xMin && i.xMax >= o.xMin) {
var c = i.center.x - Math.abs(o.xMin - i.xMax);
this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(c, 0)).x;
e.push("_rightBlock");
this._rightBlock++;
}
if (a.xMin >= o.xMax && i.xMin <= o.xMax) {
var s = i.center.x + Math.abs(o.xMax - i.xMin);
this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(s, 0)).x;
e.push("_leftBlock");
this._leftBlock++;
}
if (a.yMax <= o.yMin && i.yMax >= o.yMin) {
var r = i.center.y - Math.abs(o.yMin - i.yMax);
this.node.y = this.node.parent.convertToNodeSpaceAR(cc.v2(0, r)).y;
e.push("_upBlock");
this._upBlock++;
}
if (a.yMin >= o.yMax && i.yMin <= o.yMax) {
var h = i.center.y + Math.abs(o.yMax - i.yMin);
this.node.y = this.node.parent.convertToNodeSpaceAR(cc.v2(0, h)).y;
e.push("_downBlock");
this._jumping = !1;
this._downBlock++;
}
void 0 == t.blockArrays && (t.blockArrays = []);
t.blockArrays[this.node.name] = e;
}
},
onCollisionExit: function(t, n) {
if (t.blockArrays && void 0 != t.blockArrays[this.node.name]) {
var e = t.blockArrays[this.node.name], i = !0, o = !1, a = void 0;
try {
for (var c, s = e[Symbol.iterator](); !(i = (c = s.next()).done); i = !0) this[c.value]--;
} catch (t) {
o = !0;
a = t;
} finally {
try {
!i && s.return && s.return();
} finally {
if (o) throw a;
}
}
}
},
onKeyDown: function(t) {
switch (t.keyCode) {
case cc.KEY.a:
this._left = !0;
this.node.scaleX = -1;
break;

case cc.KEY.d:
this._right = !0;
this.node.scaleX = 1;
break;

case cc.KEY.j:
this._up = !0;
this._jumping = !0;
}
this.changeAnim();
},
onKeyUp: function(t) {
switch (t.keyCode) {
case cc.KEY.a:
this._left = !1;
break;

case cc.KEY.d:
this._right = !1;
}
this.changeAnim();
},
changeAnim: function() {
if (this._jumping) {
if (!this._animState || "jump" !== this._animState.name) {
this._anim.stop();
this._animState = this._anim.play("jump");
}
} else if (0 == this._left && 1 == this._right || 1 == this._left && 0 == this._right) {
if (!this._animState || "move" !== this._animState.name) {
this._anim.stop();
this._animState = this._anim.play("move");
}
} else if ((0 == this._left && 0 == this._right || 1 == this._left && 1 == this._right) && (!this._animState || "idle" !== this._animState.name)) {
this._anim.stop();
this._animState = this._anim.play("idle");
}
},
update: function(t) {
this._left && !this._leftBlock && (this.node.x -= this.speedX);
this._right && !this._rightBlock && (this.node.x += this.speedX);
if (this._downBlock) {
this._speedY = 0;
this._jumping = !1;
this.changeAnim();
} else this._speedY += this.g * t;
if (this._up) {
this._speedY = this.jumpY;
this._up = !1;
this._jumping = !0;
}
var n = this._speedY;
if (this._upBlock) {
n = Math.min(this._speedY, 0);
this._speedY = 0;
}
this.node.y += n * t;
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "board-control", "game-control", "move-control" ]);