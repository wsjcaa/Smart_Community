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
    extends: cc.Component,    //组件属性定义
    properties: {
        PREFAB: cc.Prefab, //预制件
        parent: cc.Node,   //预制件实例化后所在的父节点
        autoLoad: false,   //自动加载
    },
    //组件加载时检查，是否自动加载预制件
    onLoad() {
        if (this.autoLoad) {
            this.loadPrefab();
        }
    },
    //实例化预制件，设置父节点
    loadPrefab() {
        let node = cc.instantiate(this.PREFAB);
        //当父节点不存在时，使用当前组件为父节点
        node.parent = this.parent || this.node;
    }
});