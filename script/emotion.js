var SelectionStart_lin=0;
var lin_sr_bq_pan=0;
var sb_click=0;
var lin_start=0;
document.onselectionchange = function (e) {
    //判断是否支持document.selection属性
    if (window.getSelection) {
        //获取Selection对象
        var se = window.getSelection();
        //获取起始位置，这个是字符的序号位置，而不是坐标
        var start = se.anchorOffset;
        //获取结束位置
        var end = se.focusOffset;
//      //获取起始的dom元素
//      var startEl = se.anchorNode.parentElement;
//      //获取结束的dom元素
//      var endEl = se.focusNode.parentElement;
//      //获取起始dom元素的文本内容
//      var startText = startEl.innerText;
//      var txt = '';
//      if (startEl == endEl) {
//          txt = startText.substring(start, end);
//      }
        //document.getElementById('biaoti').value = start;
        lin_start=start;
        if(lin_sr_bq_pan==0)
        {
        	if(sb_click==1) {SelectionStart_lin=start;sb_click=0;}
        	//alert('设置当前光标位置:'+SelectionStart_lin);
        } 
        lin_sr_bq_pan=0;
        //alert(SelectionStart_lin);
        //document.getElementById('biaoti').value = SelectionStart_lin+":"+start+"-"+sb_click;
    }
}
document.getElementById("o").addEventListener('touchstart',function(){
	lin_sr_bq_pan=0;
	sb_click=1;
});
var onTouchStart=function()
{
	lin_sr_bq_pan=0;
	sb_click=1;
}
 function fadd_emotion(name)
{
				lin_sr_bq_pan=1;
                var val=document.getElementById("o").innerHTML;
		    	$('#o').focus();
		        var str="<img src='../emotion/"+name+".png'/>";
		        /***表情转换***/
				for(var j=0;j<emotion_json.length;j++)
				{
					if(emotion_json[j].name==name)
					{
						str=emotion_json[j].text;
						break;
					}
				}
				/************/
                if(val=="请输入内容" || val=="请输入你想要说的话" || val=="请输入帖子内容") 
                {
                    document.getElementById("o").innerHTML="";
                }
		        _insertimg(str);
}
function fohuo_jd()
{
	var val=document.getElementById("o").innerHTML;
	if(val=="请输入你想要说的话" || val=="请输入帖子内容" || val=="请输入内容")
	{
		document.getElementById("o").innerHTML="";
		document.getElementById("o").style.color="#000";
	}
}
function foshi_jd()
{
	var val=document.getElementById("o").innerHTML;
	if(val=="")
	{
		document.getElementById("o").innerHTML="请输入内容";
		document.getElementById("o").style.color="#999";
	}
}
function fdelete_o()
{
    var val=document.getElementById("o").innerHTML;
    var lin='';
    for(var i=0;i<val.length-1;i++)
    {
        lin+=val[i];
    }
    document.getElementById("o").innerHTML=lin;
}
function fopen_emotion()
{
	if(SelectionStart_lin==0 && lin_start!=0) SelectionStart_lin=lin_start;
    api.openFrame({
            name: 'emotion',
            url: 'emotion.html',
            rect: {
                x:0,
                y:api.winHeight-241,
                w:'auto',
                h:241
            }
    });
}
function fclose_emotion()
{
    api.closeFrame({
            name: 'emotion'
    });
}
// var strHtml='[';
// var dataroot="../emotion/emotion.json"; 
// 		$.getJSON(dataroot, function(data)
// 		{ 
// 			$.each(data,function(infoIndex,info){
// 				strHtml+='{name:"'+info["name"]+'",text:"'+info["text"]+'"}';
// 			});
// 			strHtml+="]";
// 		});
        //strHtml= eval("("+strHtml+")");
 $(function(){
//          $('#btn').click(function(){
//              $('#o').focus();
//              var str="<img src='../emotion/Expression_1.png' width='20' height='20' />";
//             
////$(str).appendTo($('#o'));
//              _insertimg(str);
//          });
			
            $('#t').click(function(){
                $('#div1').html($('#o').html());
            });
 
            $('#ttbtn').click(function(){
                alert($('#tt').val());
            });
            $("#img").click(function(){
 
            });
            $("#o").bind({
                mouseup:saveRange,
                change:saveRange
            })
        });
        var _range;
        function saveRange(){
            var selection= window.getSelection ? window.getSelection() : document.selection;
            var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
            _range = range;
        }
        //锁定编辑器中鼠标光标位置。。
        function _insertimg(str){
        		/***表情转换***/
               var a1=$('#o').text();
               var a2=$('#o').html();
               var tu_end=$('#o img').length;
//             if(a1=="" || a1==a2)
//             {
                  var tc = document.getElementById("o");
                   var tclen = tc.innerHTML.length; 
                   var lin_a=SelectionStart_lin;
                   lin_sr_bq_pan=1;
                   tc.focus(); 
                   if(typeof document.selection != "undefined") 
                   { 
                   document.selection.createRange().text = str; 
                   } 
                   else 
                   { 
                   tc.innerHTML = tc.innerHTML.substr(0,SelectionStart_lin)+str+tc.innerHTML.substring(SelectionStart_lin,tclen); 
                   //tc.innerHTML = tc.innerHTML.substr(0,SelectionStart_lin)+'[表情]'+tc.innerHTML.substring(SelectionStart_lin,tclen); 
                   //tc.innerHTML = tc.innerHTML.substr(0,tc.selectionStart)+str;
                   } 
                   SelectionStart_lin=lin_a+str.length;
                   lin_sr_bq_pan=1;
                   //alert("cha:"+SelectionStart_lin+"="+lin_a+"+"+str.length+":当前："+lin_sr_bq_pan);
                       // var max=$('#o img').length;
                       // var sum=0;
                       // for(var i=0;i<max;i++)
                       // {
                       //     sum+=$('#o img').eq(i).prop('outerHTML').length;
                       // }
                       // document.getElementById('biaoti').value=$('#biaoti').value+""+max;
                       // SelectionStart_lin=sum;
                   return;
//             }
				/**********/
            if (!window.getSelection){
                document.getElementById('o').focus();
                var selection= window.getSelection ? window.getSelection() : document.selection;
                var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
                range.pasteHTML(str);
                range.collapse(false);
                range.select();
            }else{
                document.getElementById('o').focus();
                var selection= window.getSelection ? window.getSelection() : document.selection;
                selection.addRange(_range);
                range = _range;
//                var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
                range.collapse(false);

                var hasR = range.createContextualFragment(str);
                var hasR_lastChild = hasR.lastChild;
                while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
                    var e = hasR_lastChild;
                    hasR_lastChild = hasR_lastChild.previousSibling;
                    hasR.removeChild(e)
                }
                range.insertNode(hasR);
                if (hasR_lastChild) {
                    range.setEndAfter(hasR_lastChild);
                    range.setStartAfter(hasR_lastChild)
                }
                selection.removeAllRanges();
                selection.addRange(range)
            }
            $('#o').blur();
            fopen_emotion2();
        }
        //监控粘贴(ctrl+v),如果是粘贴过来的东东，则替换多余的html代码，只保留<br>
        function pasteHandler(){
            setTimeout(function(){
                var content = document.getElementById("o").innerHTML;
                valiHTML=["br"];
                content=content.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + valiHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + valiHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>");
                if(!/firefox/.test(navigator.userAgent.toLowerCase())){
                    content=content.replace(/\r?\n/gi, "<br>");
                }
                document.getElementById("o").innerHTML=content;
            },1)
 
        }
        var edt = document.getElementById("o");
        if(edt.addEventListener){
            edt.addEventListener("paste",pasteHandler,false);
        }else{
            edt.attachEvent("onpaste",pasteHandler);
        }