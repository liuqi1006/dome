//商品规格选择
$(function(){
	$(".sys_item_spec .sys_item_specpara").each(function(){
		var i=$(this);
		var p=i.find("ul>li");
		p.click(function(){
			if(!!$(this).hasClass("selected")){
				$(this).removeClass("selected");
				i.removeAttr("data-attrval");
			}else{
				$(this).addClass("selected").siblings("li").removeClass("selected");
				i.attr("data-attrval",$(this).attr("data-aid"))
			}
			getattrprice() //输出价格
		})
	})
	
	//获取对应属性的价格
	function getattrprice(){
		var defaultstats=true;
		var _val='';
		var _resp={
			mktprice:".sys_item_mktprice",
			price:".sys_item_price"
		}  //输出对应的class
		$(".sys_item_spec .sys_item_specpara").each(function(){
			var i=$(this);
			var v=i.attr("data-attrval");
			if(!v){
				defaultstats=false;
			}else{
				_val+=_val!=""?"_":"";
				_val+=v;
			}
		})
		if(!!defaultstats){
			_mktprice=sys_item['sys_attrprice'][_val]['mktprice'];
			_price=sys_item['sys_attrprice'][_val]['price'];
		}else{
			_mktprice=sys_item['mktprice'];
			_price=sys_item['price'];
		}
		//输出价格
		$(_resp.mktprice).text(_mktprice);  ///其中的math.round为截取小数点位数
		$(_resp.price).text(_price);
	}
})


$(function(){			
	   $(".jqzoom").jqueryzoom({
			xzoom:600,
			yzoom:600,
			offset:10,
			position:"right",
			preload:1,
			lens:1
		});
		$("#spec-list").jdMarquee({
			deriction:"left",
			width:500,
			height:56,
			step:2,
			speed:4,
			delay:10,
			control:true,
			_front:"#spec-right",
			_back:"#spec-left"
		});
		$("#spec-list img").bind("mouseover",function(){
			var src=$(this).attr("src");
			$("#spec-n1 img").eq(0).attr({
				src:src.replace("\/n5\/","\/n1\/"),
				jqimg:src.replace("\/n5\/","\/n0\/")
			});
			$(this).css({
				"border":"2px solid #ff6600",
				"padding":"1px"
			});
		}).bind("mouseout",function(){
			$(this).css({
				"border":"1px solid #ccc",
				"padding":"2px"
			});
		});				
	})
	
	
	/*或者不用jquery*/
/*商品数量框输入*/
function keyup(){
	var quantity = document.getElementById("quantity").value;
	if(isNaN(quantity) ||  parseInt(quantity)!=quantity || parseInt(quantity)<1){
		quantity = 1;
		return;
    }
	if(quantity>=10){
		document.getElementById("quantity").value=quantity.substring(0,quantity.length-1);
		alert("商品数量不能大于10");
	}
}

/*商品数量+1*/
function numAdd(){
	var quantity = document.getElementById("quantity").value;
 	var num_add = parseInt(quantity)+1;
 	var price=document.getElementById("price").value;
 	if(quantity==""){
 	 	num_add = 1;
 	}
 	if(num_add>=10){
 		document.getElementById("quantity").value=num_add-1;
	    alert("商品数量不能大于10");
  	}else{
	  	document.getElementById("quantity").value=num_add;
	  	var Num=price*num_add;
	  	document.getElementById("totalPrice").innerHTML=Num.toFixed(2);
  	}
}
/*商品数量-1*/
function numDec(){
	var quantity = document.getElementById("quantity").value;
	var price=document.getElementById("price").value;
 	var num_dec = parseInt(quantity)-1;
 	if(num_dec>0){
 		document.getElementById("quantity").value=num_dec;
 		var Num=price*num_dec;
 		 document.getElementById("totalPrice").innerHTML=Num.toFixed(2);
 	}
}
function show()
{
	document.getElementById("totalPrice").innerHTML=3.25*3;
}