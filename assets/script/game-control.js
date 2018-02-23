cc.Class({
    extends: cc.Component,

    properties: {
        startDoorPrefab:cc.Prefab,
        endDoorPrefab:cc.Prefab,
        playerPrefab:cc.Prefab,
        boardPrefab:cc.Prefab

    },

    onLoad:function() {
        this.createThings();
        
    },
    createThings:function(){
        //生成初始门
        var startDoorNode = cc.instantiate(this.startDoorPrefab);
        cc.find("Canvas/Center").addChild(startDoorNode);
        startDoorNode.setPosition(this.getRandomPosition(0));
        //生成终点门
        var endDoorNode = cc.instantiate(this.endDoorPrefab);
        cc.find("Canvas/Center").addChild(endDoorNode);
        endDoorNode.setPosition(this.getRandomPosition(1));
        //生成主角
        var playerNode = cc.instantiate(this.playerPrefab);
        cc.find("Canvas/Center").addChild(playerNode);
        playerNode.setPosition(startDoorNode.getPosition());
        //生成两块板子
        var board1Node = cc.instantiate(this.boardPrefab);
        cc.find("Canvas/Center").addChild(board1Node);
        board1Node.setPosition(this.getRandomPosition(2));
        var board2Node = cc.instantiate(this.boardPrefab);
        cc.find("Canvas/Center").addChild(board2Node);
        board2Node.setPosition(this.getRandomPosition(3));
        
    },
    getRandomPosition: function (door) {
        if(door==0){
            var randY = -265;
            var randX = -250+cc.random0To1() * 500;
            return cc.p(randX, randY);
        }
        if(door==1){
            var randY = 365;
            var randX = -250+cc.random0To1() * 500;
            return cc.p(randX, randY);
        }
        if(door==2){
            var randY = 160;
            var randX = -185+cc.random0To1() * 370;
            return cc.p(randX, randY);
        }
        if(door==3){
            var randY = -60;
            var randX = -185+cc.random0To1() * 370;
            return cc.p(randX, randY);
        }
    },
});
