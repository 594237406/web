window.onload = function() {

	var oCon = document.getElementById('con');			//棋盘
	var oScroe = document.getElementById('scroe');		//分数div
	var oMask = document.getElementById('mask');		//胜利蒙版
	var oJump = document.getElementById('jump');		//胜利div
	var oLoad = document.getElementById('load');		//开始读取
	var oLoadProg = document.getElementById('loadProg');
	var aLoadDiv = oLoadProg.getElementsByTagName('div');
	var oText = oJump.getElementsByTagName('P')[0];		//说明
	var continueBtn = oJump.getElementsByTagName('input')[0];	//继续挑战按钮
	var aDiv = oCon.getElementsByTagName('div');		//格子
	var oP = oScroe.getElementsByTagName('P')[0];
	var arrText = [ '不好意思，您输了！', '恭喜您，已达到2048！', '您的成就已载入史册！' ];
	var arrLoadImg = [ 'img/body_bg.gif', 'img/scroe.png', 'img/bg.png',
			'img/cube_2.png', 'img/cube_4.png', 'img/cube_8.png',
			'img/cube_16.png', 'img/cube_32.png', 'img/cube_64.png',
			'img/cube_128.png', 'img/cube_256.png', 'img/cube_512.png',
			'img/cube_1024.png', 'img/cube_2048.png', 'img/cube_4096.png',
			'img/cube_8192.png' ];
	var arrCellAll = [];			//棋盘所有带数字的格子
	var arrCollapseAll = [];		//棋盘所有带数字的格子内数字
	var moveNum = 0;				//移动格子数字个数
	var showNum = 0;
	var addScroe = 0;
	var win = 0;
	var isWin = true;
	var is2048 = false;
	var show2048 = true;
	var is8192 = false;
	var oLoadImg = new Image();
	var loadCur = 0;
	var isOK = true;									//是否可以进行游戏（当图片运动时，不允许再次移动图片）

	//加载图片
	loadImage();
	function loadImage() {
		oLoadImg.src = arrLoadImg[loadCur];
	}
	
	//图片加载方法
	oLoadImg.onload = function() {
		loadCur++;
		var iScale = loadCur / arrLoadImg.length;
		aLoadDiv[1].innerHTML = parseInt(iScale * 100) + '%';
		aLoadDiv[0].style.width = 300 * iScale + 'px';

		if (loadCur < arrLoadImg.length) {
			loadImage();
		} else if (loadCur == arrLoadImg.length) {
			oLoad.style.display = 'none';
		}
	};
	
	begin();
	
	//开始方法
	function begin() {
		oP.innerHTML = 0;			//清空分数
		addScroe = 0;				//加分为0
		setAttr();					//设置属性：x\y值，数字
		init();						//初始化三个数字
		init();
		init();
	}
	
	//加载图片
	function init() {
		var randNum = getRanNum();
		showPic(randNum['posNum'], randNum['num']);
	}

	//设置属性
	function setAttr() {
		for ( var i = 0; i < aDiv.length; i++) {
			aDiv[i].X = i % 4;
			aDiv[i].Y = Math.floor(i / 4);
			aDiv[i].t = 0;
		}
	}

	//重新开始
	function fnReset() {
		for ( var i = 0; i < aDiv.length; i++) {
			if (aDiv[i].children[0]) {
				aDiv[i].removeChild(aDiv[i].children[0]);
				aDiv[i].t = 0;
			}
		}
	}

	//继续按钮
	continueBtn.onclick = function() {
		if (!isWin || is8192) {			//如果到8192且没有赢得游戏
			fnReset();					//清空数字
			begin();					//重新开始
			oMask.style.display = oJump.style.display = 'none';		//胜利蒙版隐藏
			isWin = true;				//赢得游戏
			is2048 = false;				
			show2048 = true;
			is8192 = false;
			isOK = true;
		}
		if (is2048) {
			oMask.style.display = oJump.style.display = 'none';		//胜利蒙版隐藏
			show2048 = false;	
			is2048 = false;
		}
	};
	
	//随即数字
	function getRanNum() {
		var arr = [];
		var posNum = null;
		var num = Math.random() > 0.8 ? 2 : 1;
		for ( var i = 0; i < aDiv.length; i++) {
			if (aDiv[i].t == 0){
				arr.push(aDiv[i]);
			}
		}
		posNum = Math.floor(Math.random() * arr.length);

		return {
			"posNum" : arr[posNum],
			"num" : num
		};
	}

	//展示图片
	function showPic(pos, num) {
		var oImg = document.createElement('img');
		oImg.src = getPic(num);
		pos.appendChild(oImg);
		pos.t = num;
	}

	//获得图片
	function getPic(n) {
		switch (n) {
		case 1:
			return 'img/cube_2.png';
		case 2:
			return 'img/cube_4.png';
		case 3:
			return 'img/cube_8.png';
		case 4:
			return 'img/cube_16.png';
		case 5:
			return 'img/cube_32.png';
		case 6:
			return 'img/cube_64.png';
		case 7:
			return 'img/cube_128.png';
		case 8:
			return 'img/cube_256.png';
		case 9:
			return 'img/cube_512.png';
		case 10:
			return 'img/cube_1024.png';
		case 11:
			return 'img/cube_2048.png';
		case 12:
			return 'img/cube_4096.png';
		case 13:
			return 'img/cube_8192.png';
		}
	}

	//键盘按下事件
	document.onkeydown = function(ev) {
		if (!isOK){
			return;
		}
		var ev = ev || event;
		
		//清空单元格和移动数字
		arrCellAll = [];
		arrCollapseAll = [];
		moveNum = 0;
		showNum = 0;
		
		//如果有胜利蒙版，推出
		if (getStyle(oMask, 'display') != "none") {
			return;
		}
		
		switch (ev.keyCode) {
			case 37:
				for ( var i = 0; i < 4; i++) {
			                   //left:0 1 2 3,4 5 6 7,8 9 10 11,12 13 14 15：左右排列
					isMove(37, aDiv[i * 4], aDiv[i * 4 + 1], aDiv[i * 4 + 2],
							aDiv[i * 4 + 3]);
				}
				break;
			case 38:
				for ( var i = 0; i < 4; i++) {
								//up:0 4 8 12,1 5 9 13,2 6 10 14,3 7 11 15：上下排列
					isMove(38, aDiv[i], aDiv[i + 1 * 4], aDiv[i + 2 * 4],
							aDiv[i + 3 * 4]);
				}
				break;
			case 39:
				for ( var i = 0; i < 4; i++) {
								//right:0 1 2 3,4 5 6 7,8 9 10 11,12 13 14 15	
					isMove(39, aDiv[i * 4], aDiv[i * 4 + 1], aDiv[i * 4 + 2],
							aDiv[i * 4 + 3]);
				}
				break;
			case 40:
				for ( var i = 0; i < 4; i++) {
								//down:0 4 8 12,1 5 9 13,2 6 10 14,3 7 11 15 	
					isMove(40, aDiv[i], aDiv[i + 1 * 4], aDiv[i + 2 * 4],
							aDiv[i + 3 * 4]);
				}
				break;
		}
	};

	//是否移动判断
	function isMove(k, a, b, c, d) {
		//如果横向，传一排，如果纵向，传一列，分别传4次
		var arr = [ a, b, c, d ];
		
		arrCollapse = [];		
		arrCell = [];
		
		for ( var i = 0; i < arr.length; i++) {
			if (arr[i].children[0]) {		//如果格内有数字
				arrCell.push(arr[i]);		//添加格子
				arrCollapse.push(arr[i].t);	//添加数字
			}
		}
		
		//如果是左或者上
		if (k == 37 || k == 38) {
			
			for ( var i = 0; i < arrCollapse.length; i++) {
				//如果格子下一个数字存在且格子数字与下一个格子数字相等
				if (arrCollapse[i + 1] && arrCollapse[i] == arrCollapse[i + 1]) {
					addScroe += arrCollapse[i];
					arrCollapse[i] += 1;			//2的次方+=1
					arrCollapse.splice(i + 1, 1);	//删除下一个元素数字
					arrCell[i] = arrCell[i + 1];	//当前元素等于下一个元素
					arrCell.splice(i + 1, 1);		//删除下一个元素
					if (arrCollapse[i] == 11) {
						is2048 = true;
					}
					if (arrCollapse[i] == 13) {
						is8192 = true;
					}
				}
			}
		} else {
			for ( var i = arrCollapse.length - 1; i >= 0; i--) {
				if (i > 0 && arrCollapse[i] == arrCollapse[i - 1]) {
					addScroe += arrCollapse[i] * 2;
					arrCollapse[i] += 1;
					arrCollapse.splice(i - 1, 1);	//删除上一个元素
					arrCell[i] = arrCell[i - 1];
					arrCell.splice(i - 1, 1);
					if (arrCollapse[i] == 11) {
						is2048 = true;
					}
					if (arrCollapse[i] == 13) {
						is8192 = true;
					}
					i--;
				}
			}
		}
		
		
		arrCellAll.push(arrCell);					//合并后元素
		arrCollapseAll.push(arrCollapse);			//合并后元素数字
		if (arrCellAll.length == 4) {				//如果是4行4列元素全部添加
			startMove(k, arrCellAll, arrCollapseAll);
		}

	}

	//开始移动
	function startMove(k, arr, arrNum) {

		var dis = null;
		var speed = null;

		if (k == 39 || k == 40) {
			for ( var i = 0; i < arr.length; i++) {
				for ( var j = 0; j < arr[i].length; j++) {
					if (arr[i].length == 4)
						break;
					arr[i].unshift(null);
					arrNum[i].unshift(0);
				}
			}
		}
		for ( var i = 0; i < arr.length; i++) {
			for ( var j = 0; j < arr[i].length; j++) {
				if (k == 37) {
					if (j != arr[i][j].X || arrNum[i][j] != arr[i][j].t) {
						moveNum++;
					}
				} else if (k == 38) {
					if (j != arr[i][j].Y || arrNum[i][j] != arr[i][j].t) {
						moveNum++;
					}
				} else if (k == 39) {
					if (arr[i][j] && j != arr[i][j].X || arr[i][j]
							&& arrNum[i][j] != arr[i][j].t) {
						moveNum++;
					}
				} else if (k == 40) {
					if (arr[i][j] && j != arr[i][j].Y || arr[i][j]
							&& arrNum[i][j] != arr[i][j].t) {
						moveNum++;
					}
				}
			}
		}

		for ( var i = 0; i < arrNum.length; i++) {
			for ( var j = 0; j < arrNum[i].length; j++) {
				if (arrNum[i][j] != 0)
					showNum++;
				if (arrNum[i][j] == 11 && show2048) {
					is2048 = true;
				}
				if (arrNum[i][j] == 13) {
					is8192 = true;
				}
			}
		}

		if (showNum == 15 || showNum == 16) {
			isWin = false;
		} else {
			isWin = true;
		}

		if (moveNum == 0) {
			return;
		}

		isOK = false;

		if (k == 37) {
			for ( var i = 0; i < arr.length; i++) {
				for ( var j = 0; j < arr[i].length; j++) {
					if (j != arr[i][j].X || arrNum[i][j] != arr[i][j].t) {
						dis = (j - arr[i][j].X) * 80;
						speed = (arr[i][j].X - j) * 40;
						doMove(arr[i][j].children[0], speed, 'left', dis,
								function() {
									moveNum--;
									if (moveNum == 0) {
										rePic(k, arrNum, showNum);
									}
								});
					}
				}
			}
		} else if (k == 38) {
			for ( var i = 0; i < arr.length; i++) {
				for ( var j = 0; j < arr[i].length; j++) {
					if (j != arr[i][j].Y || arrNum[i][j] != arr[i][j].t) {
						dis = (j - arr[i][j].Y) * 109;
						speed = (arr[i][j].Y - j) * 50;
						doMove(arr[i][j].children[0], speed, 'top', dis,
								function() {
									moveNum--;
									if (moveNum == 0) {
										rePic(k, arrNum, showNum);
									}
								});
					}
				}
			}
		} else if (k == 39) {
			for ( var i = 0; i < arr.length; i++) {
				for ( var j = 0; j < arr[i].length; j++) {
					if (arr[i][j] && j != arr[i][j].X || arr[i][j]
							&& arrNum[i][j] != arr[i][j].t) {
						dis = (j - arr[i][j].X) * 80;
						speed = (j - arr[i][j].X) * 40;
						doMove(arr[i][j].children[0], speed, 'left', dis,
								function() {
									moveNum--;
									if (moveNum == 0) {
										rePic(k, arrNum, showNum);
									}
								});
					}
				}
			}
		} else if (k == 40) {
			for ( var i = 0; i < arr.length; i++) {
				for ( var j = arr[i].length; j >= 0; j--) {
					if (arr[i][j] && j != arr[i][j].Y || arr[i][j]
							&& arrNum[i][j] != arr[i][j].t) {
						dis = (j - arr[i][j].Y) * 109;
						speed = (j - arr[i][j].Y) * 50;
						doMove(arr[i][j].children[0], speed, 'top', dis,
								function() {
									moveNum--;
									if (moveNum == 0) {
										rePic(k, arrNum, showNum);
									}
								});
					}
				}
			}
		}

	}
	
	//移动格子
	function doMove(obj, num, attr, target, endFn) {
		num = parseInt(getStyle(obj, attr)) < target ? num : -num;

		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var speed = parseInt(getStyle(obj, attr)) + num;
			if (speed < target && num < 0 || speed > target && num > 0) {
				speed = target;
			}
			obj.style[attr] = speed + 'px';
			if (speed == target) {
				clearInterval(obj.timer);
				if (typeof endFn == 'function') {
					endFn();
				}
			}
		}, 30);
	}

	//重置图片
	function rePic(k, arrNum, showNum) {
		//console.log(1);
		fnReset();
		for ( var m = 0; m < arrNum.length; m++) {
			for ( var n = 0; n < arrNum[m].length; n++) {
				if (arrNum[m][n]) {
					var oImg = document.createElement('img');
					oImg.src = getPic(arrNum[m][n]);
					if (k == 37) {
						aDiv[m * 4 + n].appendChild(oImg);
						aDiv[m * 4 + n].t = arrNum[m][n];
					} else if (k == 38) {
						aDiv[n * 4 + m].appendChild(oImg);
						aDiv[n * 4 + m].t = arrNum[m][n];
					} else if (k == 39) {
						aDiv[m * 4 + n].appendChild(oImg);
						aDiv[m * 4 + n].t = arrNum[m][n];
					} else if (k == 40) {
						aDiv[n * 4 + m].appendChild(oImg);
						aDiv[n * 4 + m].t = arrNum[m][n];
					}
					showNum--;
				}
			}
		}
		oP.innerHTML = addScroe * 2;

		if (showNum == 0) {
			init();
			isOK = true;
			if (is2048 && show2048) {
				fnJump(1);
			}
			if (is8192) {
				fnJump(2);
			}
			if (!isWin) {
				win = 0;
				for ( var i = 0; i < aDiv.length; i++) {

					if ((i + 1) % 4 == 0 && aDiv[i + 4]
							&& aDiv[i].t == aDiv[i + 4].t) {
						return;
					} else if ((i + 1) % 4 != 0 && aDiv[i].t == aDiv[i + 1].t
							|| aDiv[i + 4] && aDiv[i].t == aDiv[i + 4].t) {
						return;
					} else {
						win++;
					}

				}
				if (win == 16) {
					fnJump(0);
				}
			}
		}

	}
	
	//弹出提示
	function fnJump(n) {
		oText.innerHTML = arrText[n];
		oMask.style.display = oJump.style.display = 'block';
	}

	function getStyle(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(
				obj, false)[attr];
	}

};
