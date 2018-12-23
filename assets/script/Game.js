// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rooms: [cc.Node],
        gamecamera: cc.Camera,
        myhouse:cc.Node,
        bs_11:{  //项的资源预制体
            type:cc.Prefab,
            default:null,
        },
        bs_12:{  //项的资源预制体
            type:cc.Prefab,
            default:null,
        },
        bs_13:{  //项的资源预制体
            type:cc.Prefab,
            default:null,
        },
        facilityPre:[cc.Prefab],
        // facilityPre2:[cc.Node],
        // facilityPre3:[cc.Prefab],

        houseUI:cc.Node,
        facilityUI:cc.Node,
        facilityNode:[cc.Node],
        selectFacilityState:[],
        curBuildFaility:0,
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let windowSize=cc.view.getVisibleSize();
        this.gamecamera.zoomRatio = 3
        // this.selectFacilityState:var,

        // .x = 50;
        // this.camera[0].position = cc.v2(100,300);
        cc.log("--->z1  " +windowSize.width + "   " + windowSize.height);
        cc.log("--->z1  " +this.rooms.length);
        for(var i = 0;i < this.rooms.length;i++){
            // cc.log("--->z1  " + i + "  --- " + (2000 - this.rooms[i].x)/100 + "  " + ((4600 - this.rooms[i].y) / 50) + "   "
            // + Math.round((2000 - this.rooms[i].x)/100) + "  " + Math.round((4600 - this.rooms[i].y) / 50));
            this.rooms[i].zIndex =Math.round((2000 - this.rooms[i].x)/100) * Math.round((4600 - this.rooms[i].y) / 50);
            // this.rooms[i].zIndex =Math.round((2000 - this.rooms[i].x)/100 * (4600 - this.rooms[i].y) / 50);
        }
        this.houseUI.active = true;
        this.facilityUI.active = false;
        this.selectFacilityState = [false,false,false,false,false,false,false,false];

    },


    buildOKClick: function (event, customEventData) {
        if(this.myhouse.getChildByName("bs")){
            let  build = this.myhouse.getChildByName("bs");
            let animation = build.getComponent(cc.Animation)
            animation.play("buildend");
        }
        this.houseUI.active = false;
        let animation2 = this.gamecamera.getComponent(cc.Animation);
        animation2.play("camera1")
    },

    selectRoomClick: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        cc.log("--->btnClick2")
        // var node = event.target;
        // node.active = false;

        if(this.myhouse.getChildByName("bs")){
            this.myhouse.removeChild(this.myhouse.getChildByName("bs"));
        }
        if(customEventData == 1){
            this.newnode = cc.instantiate(this.bs_11);
        }else if(customEventData == 2){
            this.newnode = cc.instantiate(this.bs_12);
        }else if(customEventData == 3){
            this.newnode = cc.instantiate(this.bs_13);
        }
        this.newnode.name = "bs";
        this.myhouse.addChild(this.newnode);
        // this.myhouse.active = false;
        // var node = event.target;
        // var button = node.getComponent(cc.Button);
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    selectFacilityClick: function (event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        cc.log("--->btnClick2")
        // if(this.selectFacilityState[customEventData - 1]){
        //     return;
        // }
        var node = event.target;
        if(node.getChildByName("select").active || this.curBuildFaility >= 6){
            return;
        }
        node.getChildByName("select").active = true;
        this.newnode = cc.instantiate(this.facilityPre[customEventData - 1]);
        this.facilityNode[this.curBuildFaility].addChild(this.newnode);
        this.curBuildFaility = this.curBuildFaility + 1 ;
        // if(this.myhouse.getChildByName("bs")){
        //     this.myhouse.removeChild(this.myhouse.getChildByName("bs"));
        // }
        // if(customEventData == 1){
        //     this.newnode = cc.instantiate(this.bs_11);
        // }else if(customEventData == 2){
        //     this.newnode = cc.instantiate(this.bs_12);
        // }else if(customEventData == 3){
        //     this.newnode = cc.instantiate(this.bs_13);
        // }
        // this.newnode.name = "bs";
        // this.myhouse.addChild(this.newnode);
    }

    // update (dt) {},
});
