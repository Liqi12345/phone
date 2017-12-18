
	$(function(){

		// let arr = [
		// {id:1,name:'李琪',phone:'1735843485',pinyin:'liqi'},
		// {id:2,name:'李佳',phone:'158358070485',pinyin:'lijia'},
		// {id:3,name:'刘震',phone:'17635363485',pinyin:'liuzhen'},
		// {id:1,name:'李琪',phone:'1735843485',pinyin:'liqi'},
		// {id:2,name:'李佳',phone:'158358070485',pinyin:'lijia'},
		// {id:3,name:'刘震',phone:'17635363485',pinyin:'liuzhen'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:4,name:'乔美丽',phone:'15034260765',pinyin:'qiaomeili'},
		// {id:5,name:'王晋玲',phone:'18734445673',pinyin:'wangjinling'},
		// {id:5,name:'王晋玲',phone:'18734445673',pinyin:'wangjinling'},
		// {id:5,name:'王晋玲',phone:'18734445673',pinyin:'wangjinling'},
		// {id:5,name:'王晋玲',phone:'18734445673',pinyin:'wangjinling'},
		// {id:5,name:'王晋玲',phone:'18734445673',pinyin:'wangjinling'},
		// {id:6,name:'哥哥',phone:'13994830308',pinyin:'gege'},
		// {id:6,name:'哥哥',phone:'13994830308',pinyin:'gege'},
		// {id:6,name:'哥哥',phone:'13994830308',pinyin:'gege'},
		// {id:6,name:'哥哥',phone:'13994830308',pinyin:'gege'},
		// {id:6,name:'哥哥',phone:'13994830308',pinyin:'gege'},
		// {id:6,name:'哥哥',phone:'13994830308',pinyin:'gege'},
		// {id:7,name:'爸爸',phone:'15135489444',pinyin:'baba'},
		// {id:7,name:'爸爸',phone:'15135489444',pinyin:'baba'},
		// {id:7,name:'爸爸',phone:'15135489444',pinyin:'baba'},
		// {id:7,name:'爸爸',phone:'15135489444',pinyin:'baba'},
		// {id:7,name:'爸爸',phone:'15135489444',pinyin:'baba'},
		// {id:7,name:'爸爸',phone:'15135489444',pinyin:'baba'},
		// {id:7,name:'爸爸',phone:'15135489444',pinyin:'baba'},
		// ]

	// localStorage.setItem('phone',JSON.stringify(arr))
	let srr = JSON.parse(localStorage.getItem('phone'))
	let box = $('.box')[0];
	let dw = $('.dw')[0];
	let tops = $('.tops')[0];
	
	con(srr);

	let h = $('h3')
	// console.log(h)
	let search = $('input')[0];
	let hei = search.offsetHeight + tops.offsetHeight;

	let arr1 = [];
	Array.prototype.forEach.call(h,function(e){
			let htop = e.offsetTop;
			arr1.push(htop)
	})	

	window.addEventListener('scroll',function(){
		let srcolltops = document.documentElement.scrollTop;

		arr1.forEach(function(ele,index){
			if(hei + srcolltops >= ele){	
				tops.innerHTML = h[index].innerText;
			}
		})
	})


	search.addEventListener('input',function(){
		let inp = this.value.trim();
		let obj1 = srr.filter(ele =>ele.pinyin.includes(inp) || ele.name.includes(inp) || ele.phone.includes(inp))
		con(obj1)
	})
	

	function con(srr){
		// 创建obj对象存放首字母数组
		let obj = {};
		// 遍历每个JSON对象
		srr.forEach(function(ele){
			// 获取首字母
			let first = ele.pinyin.trim().charAt(0).toUpperCase();
			// 如果首字母里面是undefined
			if(!obj[first]){
				// first转为数组
				obj[first] = [];
			}
			// 数组里添加首字母是它的ele元素
			obj[first].push(ele)
			
		})
		// 获取首字母属性进行排列
		let key = Object.keys(obj).sort();

		tops.innerText = key[0];
		// html box为空
		box.innerHTML = '';
		dw.innerHTML = '';
		// 依次遍历排列好的每个字母
		key.forEach(ele => {
			// 在box添加h3元素和首字母
			box.innerHTML += `<h3>${ele}</h3>` ;
			// dw盒子添加首字母
			
			dw.innerHTML += `<li>${ele}</li>`

			// 遍历每个字母里的每条JSON数据
			obj[ele].forEach(elem =>{
				box.innerHTML += `<a href="tel:${elem.phone}">${elem.name}</a>`
			}) 
		})
	}

})