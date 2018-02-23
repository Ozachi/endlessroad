"use strict";
cc._RF.push(module, 'd63c0BfnYVDeJC9FQDTfVdR', 'move-control');
// script/move-control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        _jumping: false,
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

    onLoad: function onLoad() {
        this._anim = this.getComponent(cc.Animation);
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.onInventedKeyEvent();
    },

    onInventedKeyEvent: function onInventedKeyEvent() {
        var self = this;
        cc.find("Canvas/LeftBottom/goleft").on(cc.Node.EventType.TOUCH_START, function (event) {
            self._left = true;
            self.node.scaleX = -1;
            self.changeAnim();
        });
        cc.find("Canvas/LeftBottom/goleft").on(cc.Node.EventType.TOUCH_END, function (event) {
            self._left = false;
            self.changeAnim();
        });
        cc.find("Canvas/LeftBottom/goright").on(cc.Node.EventType.TOUCH_START, function (event) {
            self._right = true;
            self.node.scaleX = 1;
            self.changeAnim();
        });
        cc.find("Canvas/LeftBottom/goright").on(cc.Node.EventType.TOUCH_END, function (event) {
            self._right = false;
            self.changeAnim();
        });
        cc.find("Canvas/RightBottom/gojump").on(cc.Node.EventType.TOUCH_START, function (event) {
            self._up = true;
            self._jumping = true;
            self.changeAnim();
        });
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'door') {
            cc.director.loadScene("Game");
        }
        if (other.node.group == 'wall') {
            var blockArray = [];
            var selfAabb = self.world.aabb;
            var otherAabb = other.world.aabb;
            var selfPreAabb = self.world.preAabb;
            var otherPreAabb = other.world.preAabb;

            if (selfPreAabb.xMax <= otherAabb.xMin && selfAabb.xMax >= otherAabb.xMin) {
                //right block
                //console.log('right');
                var worldPositionX = selfAabb.center.x - Math.abs(otherAabb.xMin - selfAabb.xMax);
                this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(worldPositionX, 0)).x;
                blockArray.push("_rightBlock");
                this._rightBlock++;
            }
            if (selfPreAabb.xMin >= otherAabb.xMax && selfAabb.xMin <= otherAabb.xMax) {
                //left block
                //console.log('left');
                var _worldPositionX = selfAabb.center.x + Math.abs(otherAabb.xMax - selfAabb.xMin);
                this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(_worldPositionX, 0)).x;
                blockArray.push("_leftBlock");
                this._leftBlock++;
            }
            if (selfPreAabb.yMax <= otherAabb.yMin && selfAabb.yMax >= otherAabb.yMin) {
                //up block
                //console.log('up');
                var worldPositionY = selfAabb.center.y - Math.abs(otherAabb.yMin - selfAabb.yMax);
                this.node.y = this.node.parent.convertToNodeSpaceAR(cc.v2(0, worldPositionY)).y;
                blockArray.push("_upBlock");
                this._upBlock++;
            }
            if (selfPreAabb.yMin >= otherAabb.yMax && selfAabb.yMin <= otherAabb.yMax) {
                //down block
                //console.log('down');
                var _worldPositionY = selfAabb.center.y + Math.abs(otherAabb.yMax - selfAabb.yMin);
                this.node.y = this.node.parent.convertToNodeSpaceAR(cc.v2(0, _worldPositionY)).y;
                blockArray.push("_downBlock");
                this._jumping = false;
                this._downBlock++;
            }

            if (other.blockArrays == undefined) {
                other.blockArrays = [];
            }
            other.blockArrays[this.node.name] = blockArray;
        }
    },

    onCollisionExit: function onCollisionExit(other, self) {
        if (other.blockArrays && other.blockArrays[this.node.name] != undefined) {
            var blockArray = other.blockArrays[this.node.name];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = blockArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this[item]--;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    },

    onKeyDown: function onKeyDown(e) {
        switch (e.keyCode) {//离奇bug 
            case cc.KEY.a:
                {
                    this._left = true;this.node.scaleX = -1;break;
                }
            case cc.KEY.d:
                {
                    this._right = true;this.node.scaleX = 1;break;
                }
            case cc.KEY.j:
                {
                    this._up = true;this._jumping = true;break;
                }
        };
        this.changeAnim();
    },

    onKeyUp: function onKeyUp(e) {
        switch (e.keyCode) {
            case cc.KEY.a:
                {
                    this._left = false;break;
                }
            case cc.KEY.d:
                {
                    this._right = false;break;
                }
            //case cc.KEY.up: {this._up = false;this._jumping = true;break;}
        }
        this.changeAnim();
    },

    changeAnim: function changeAnim() {
        //check jump
        if (this._jumping) {
            if (!this._animState || this._animState.name !== 'jump') {
                this._anim.stop();
                this._animState = this._anim.play('jump');
            }
        }
        //check move
        else if (this._left == false && this._right == true || this._left == true && this._right == false) {
                if (!this._animState || this._animState.name !== 'move') {
                    this._anim.stop();
                    this._animState = this._anim.play('move');
                }
            }
            //check idle
            else if (this._left == false && this._right == false || this._left == true && this._right == true) {
                    if (!this._animState || this._animState.name !== 'idle') {
                        this._anim.stop();
                        this._animState = this._anim.play('idle');
                    }
                }
    }, //等会简单演示下帧动画的制作吧。。


    update: function update(dt) {
        if (this._left && !this._leftBlock) {
            this.node.x -= this.speedX;
        };
        if (this._right && !this._rightBlock) {
            this.node.x += this.speedX;
        };

        if (!this._downBlock) {
            this._speedY += this.g * dt;
        } else {
            this._speedY = 0;
            this._jumping = false;
            this.changeAnim();
        }
        if (this._up) {
            this._speedY = this.jumpY;
            this._up = false;
            this._jumping = true;
        }
        var currentSpeedY = this._speedY;
        if (this._upBlock) {
            currentSpeedY = Math.min(this._speedY, 0);
            this._speedY = 0;
        }
        this.node.y += currentSpeedY * dt;
    }

});

cc._RF.pop();