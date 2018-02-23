

cc.Class({
    extends: cc.Component,

    properties: {
        speed:100,
        _randNum:0

    },


    onLoad:function() {
        this._randNum=Math.round(cc.random0To1())*2-1
        
    },
    update:function(dt){
        if(this.node.x<=-185){
            this._randNum=1
        }
        if(this.node.x>=185){
            this._randNum=-1
        }
        if(this._randNum==1){
            this.node.x+=this.speed*dt
        }
        if(this._randNum==-1){
            this.node.x-=this.speed*dt
        }
    },
    onCollisionStay: function (other, self) {
        if(other.node.group=='player'){
            if(this._randNum==1){
                other.node.x+=this.speed/60
            }
            if(this._randNum==-1){
                other.node.x-=this.speed/60
            }
        }
    },

});
