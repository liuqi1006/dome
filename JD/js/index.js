// JavaScript Document
function run(odj){
		var aPop=document.getElementsByClassName("pop")[0]
		var aSection1=aPop.getElementsByClassName("section1")
		var leave_menu
		for(var i=0; i<odj.length; i++){
			odj[i].onmouseover=function(){
				clearTimeout(leave_menu);
				aPop.style.display="block";
				//得到自己的data-index自定义属性
				var show_id=this.getAttribute("data-index");		
				for(var j=0; j<aSection1.length; j++){			
					aSection1[j].style.display="none";
				};
				//显示相对应的内容
				document.getElementById("cate_item"+show_id).style.display="block";
			};
			
			aLi[i].onmouseout=function(){
				clearTimeout(leave_menu);
				leave_menu=setTimeout(function(){
					aPop.style.display="none";
				},100)
			};
		};
		
		aPop.onmouseenter=function(ev){
			clearTimeout(leave_menu);
			this.style.display="block";
		};
		
		aPop.onmouseleave=function(){
			this.style.display="none";
		};
	}
	//-----------------------------------------------------------
function run1(odj){
		var aBtn=odj.getElementsByTagName('ol')[0].children;
		var oUl=odj.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		aLi[0].style.opacity=1;
		var pBtn=document.getElementById('prevBtn');
		var nBtn=document.getElementById('nextBtn');
	
		var n=0;//当前显示图片索引
		
			
		//添加点击事件
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index=i;//发拍照
			aBtn[i].onclick=function(){
				
				if(n!=this.index){
					slideItem(n,this.index);
					n=this.index;
					changeAc();
				}
			};
		};
		
		pBtn.onclick=function(){
			if(n<1){
				n=aLi.length;
				slideItem(0,aLi.length-1);
			}else{
				slideItem(n,n-1);
			};
			n--;
			changeAc();
		}
	
		nBtn.onclick=function(){
			n++;
			if(n>aLi.length-1){
				n=0;
				slideItem(aLi.length-1,0);
			}else{
				slideItem(n-1,n);
			};
			changeAc();
			
		};
		
		
		function slideItem(a,b){
			aLi[a].style.display='block';
			aLi[a].style.opacity=1;
			
			aLi[b].style.display='block';
			aLi[b].style.opacity=0;
			
			move(aLi[a],'opacity',0,1000);
			move(aLi[b],'opacity',100,1000,function(){
				aLi[a].style.display='none';
			});
		};
		
		
		function changeAc(){
			for(var j=0; j<aBtn.length; j++){
				aBtn[j].className='';
			};
			aBtn[n].className='ac';
		}
}
	//--------------------------------------------------------------
function tab(obj,a){
			//var oTab=document.getElementsByClassName('tab')[0];
			
			//传入对象
			var oUl=obj.getElementsByTagName('ul')[0];
			
			var oLi=oUl.getElementsByTagName('li');
			
			for(var i=0; i<oLi.length; i++){
				
				oLi[i].index=i;
				//li绑定事件
				oLi[i].onclick=function(){
					//切换ac
					for(var j=0; j<oLi.length; j++){
						oLi[j].className="";						
						a[j].style.display="none";//隐藏所有div	
					};					
					//指定的div显示				
					a[this.index].style.display="block";				
					
				};

			};
		};
	//-----------------------------------------------------------------
function run3(obj){
	var aLi=obj.getElementsByTagName('li');
	var aFloor=document.getElementsByClassName('floor');
	var arr=[];
		
	//-------------------------------------------------
		
	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	console.log(arr)
	
	window.onscroll=function(){
		//显示楼层编号-------------------------------------------------
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>1300){
			obj.style.display='block';
		}else{
			obj.style.display='none';
		};
		
		// 根据楼层滚动位置，定位编号------------------------------------------------
		var last_arr=[];
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+400){//400为接近屏幕的敏感区
				last_arr.push(arr[j].name);
			}
		};
		
		console.log(last_arr);
		var li_index=last_arr[last_arr.length-1];

		for(var l=0; l<aFloor.length; l++){
			aLi[l].className='';
		};
		//页面上部如果有内容，没有楼层会放入新数组，产生错误
		last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';
	};
	
	//点击编号，跳转到相对楼层-----------------------------------------------
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	//move-------------------------------------------------------
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};
}	