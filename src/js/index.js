App = {
 
    web3Provider: null,
    contracts: {},
 
    //初始化
    init: function(){
        return App.initweb3();
    },
 
    //初始化web3
    initweb3: function(){
        //获取web3对象
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(App.web3Provider);
        } else {
            // Set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },
 
    //初始化合约
    initContract: function(){
        //拿到Simple.json的内容，回调函数的参数data即为拿到的内容
        $.getJSON("Simple.json",function(data){
            //得到TruffleContract对象，并赋值给App.contracts.Simple
           App.contracts.Simple = TruffleContract(data);
           //设置Provider
           App.contracts.Simple.setProvider(App.web3Provider);
           //调用合约的get方法
           App.get();
           //事件监听，更新显示的内容
           App.watchChanged();
        });
 
        //调用事件
        App.bindEvents();
    },
 
    //合约的get方法
    get: function(){
        //deployed得到合约的实例，通过then的方式回调拿到实例
        App.contracts.Simple.deployed().then(function(instance){
            return instance.get.call();
        }).then(function(result){ //异步执行，get方法执行完后回调执行then方法，result为get方法的返回值
            $("#loader").hide();
            $("#info").html(`我叫` + result[0] + `， 我今年` + result[1] + `岁了。`);
        }).catch(function(err){ //get方法执行失败打印错误
            console.log(err);
        })
    },
 
    //事件，更新操作
    bindEvents: function(){
        $("#button").click(function(){
            $("#loader").show();
            App.contracts.Simple.deployed().then(function(instance){
                return instance.set.sendTransaction($("#name").val(),$("#age").val());
            }).then(function(result){
                    App.get(); //set方法执行完后调用get方法，获取最新值（可没有，通常使用事件监听的方式）
                }).catch(function(err){
                    console.log(err);
                });
            });
    },
 
    //事件监听
    watchChanged: function(){
        App.contracts.Simple.deployed().then(function(instance){
            var infoEvent = instance.Instructor();
            infoEvent.watch(function(err, result){
                $("#loader").hide();
                $("#info").html(`我叫` + result.args.name + `， 我今年` + result.args.age + `岁了。`);
            })
        });
    }
}
 
//加载应用
$(function(){
    $(window).load(function(){
        App.init();
    });
});