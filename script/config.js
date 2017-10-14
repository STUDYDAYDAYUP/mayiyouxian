var YAH_web='http://sxo2o.yao2099.com';/*网址dsh.yao2099.com   192.168.1.201:8820*/
var YAH_web="http://wx.mayiyouxian.com";
//var YAH_web='http://192.168.3.3:803';
//var YAH_web='http://sxo2ot.yao2099.com';
var YAH_ajax_name=YAH_web+'/Cjson/';/*数据交互ajax链接地址*/
//var statement="声明：所有商品活动与苹果公司（apple inc.）无关";
var statement='';
var user_lv=0;//是否显示会员等级，0不显示，1显示
var statement_obj=document.getElementById("statement");
//if(statement_obj) statement_obj.innerHTML=statement;
function fduanwang()//网络获取数据失败时提示的数据
{
	api.toast({
		msg: '网络不给力呀！',
		duration: 2000,
		location: 'bottom'
	});
}
function get_appkey(time){
    time = String(time);
    var abc = 'aOIlas456sdcxdr1sdf1';
    var def = '';
    for(i=0;i<time.length;i++){
	    def += time[i] + abc[i];
	}
    if($api.getStorage('app_token_value')){
       token = $api.getStorage('app_token_value');
    }
    else{
       token = '';
    }
    var app_key_sign = md5(def+token);
    return app_key_sign;

}
function fenxiang_xuan()
{
	api.openFrame({
	    name: 'fenxiang_tanc',
	    url: 'fenxiang_tanc.html',
	    rect: {
		    x:0,
		    y:0,
		    w:api.winWidth,
		    h:api.winHeight
	    }
    });
    api.openFrame({
	    name: 'fenxiang',
	    url: 'fenxiang.html',
	    rect: {
		    x:0,
		    y:api.winHeight-80,
		    w:api.winWidth,
		    h:80
	    },
	    animation:{
        	type:"movein",                //动画类型（详见动画类型常量）
		    subType:"from_bottom",       //动画子类型（详见动画子类型常量）
		    duration:300
        }
    });
}
function getTime(/** timestamp=0 **/) {
        var ts = arguments[0] || 0;
        var t,y,m,d,h,i,s;
        t = ts ? new Date(ts*1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth()+1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(i<10?'0'+i:i)+':'+(s<10?'0'+s:s);
}
function getTime2(/** timestamp=0 **/) {
        var ts = arguments[0] || 0;
        var t,y,m,d,h,i,s;
        t = ts ? new Date(ts*1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth()+1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
}
function getTime3(/** timestamp=0 **/) {
        var ts = arguments[0] || 0;
        var t,y,m,d,h,i,s;
        t = ts ? new Date(ts*1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth()+1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return y+'.'+(m<10?'0'+m:m)+'.'+(d<10?'0'+d:d);
}
function getTime4(/** timestamp=0 **/) {
        var ts = arguments[0] || 0;
        var t,y,m,d,h,i,s;
        t = ts ? new Date(ts*1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth()+1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return y+'/'+(m<10?'0'+m:m)+'/'+(d<10?'0'+d:d);
}
function getTime_shifen(/** timestamp=0 **/) {
        var ts = arguments[0] || 0;
        var t,y,m,d,h,i,s;
        t = ts ? new Date(ts*1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth()+1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return (h<10?'0'+h:h)+'.'+(i<10?'0'+i:i);
}
function getTime_shi(/** timestamp=0 **/) {
        var ts = arguments[0] || 0;
        var t,y,m,d,h,i,s;
        t = ts ? new Date(ts*1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth()+1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return (h<10?'0'+h:h);
}
function getTime_fen(/** timestamp=0 **/) {
        var ts = arguments[0] || 0;
        var t,y,m,d,h,i,s;
        t = ts ? new Date(ts*1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth()+1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return (i<10?'0'+i:i);
}
function fopen_dianpu(shopId)
{
        api.openWin({
                name: 'dianpu',
                url: 'dianpu.html',
                pageParam:{
                        shopId:shopId
                }
        });
}
Number.prototype.rate=function(){
var oStr=this.toString();
if(oStr.indexOf(".")==-1)
return 1;
else
return Math.pow(10,parseInt(oStr.length-oStr.indexOf(".")-1));
}

function tran(){
args=tran.arguments;
var temp=1;
for(i=0;i<args.length;i++)
temp*=args[ i ]*args[ i ].rate();
for(i=0;i<args.length;i++)
temp/=args[ i ].rate();
return temp
}

//加
function floatJia(arg1,arg2){
     var r1,r2,m;
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
     m=Math.pow(10,Math.max(r1,r2));
     return (arg1*m+arg2*m)/m;
}

//减
function floatJian(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

//乘
function floatCheng(arg1,arg2)   {
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}


//除
function floatChu(arg1,arg2){
      var t1=0,t2=0,r1,r2;
      try{t1=arg1.toString().split(".")[1].length}catch(e){}
      try{t2=arg2.toString().split(".")[1].length}catch(e){}

      r1=Number(arg1.toString().replace(".",""));

      r2=Number(arg2.toString().replace(".",""));
      return (r1/r2)*Math.pow(10,t2-t1);
}
function Trim(str,is_global)//去除空格函数
     {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g")
            {
                result = result.replace(/\s/g,"");
             }
            return result;
    }
    function fopen_look_user(look_user_id)
    {
        api.openWin({
            name: 'look_user',
            url: 'look_user.html',
            pageParam:{
                look_user_id:look_user_id
            }
        });
    }
function flook_img(img)
	{
		var photoBrowser = api.require('photoBrowser');
		photoBrowser.open({
		    images: [img],
		    bgColor: '#000'
		}, function(ret, err) {
		    if (ret) {
		        //alert(JSON.stringify(ret));
		        if(ret.eventType=='click')
		        {
		        	photoBrowser.close();
		        }
		    } else {
		        //alert(JSON.stringify(err));
		    }
		});
	}
function fopen_ditu()
{
	api.openWin({
	    name: 'weizhi_header',
	    url: 'weizhi_header.html'
    });
}
