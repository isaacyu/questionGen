// v2: from c9.io on 21 mar 2017
// v1: from c9.io before 21 mar 2017

var q = {}; // an object that can be access in making question

var random = {
	alpha: function(){
		return questionGenTools.randomPict(
			["a","b","c"]
		);
	},
	prime: function(){
		return questionGenTools.randomPict(
			["a","b","c"]
		);
	}
};

var questionGenTools ={
	
	// return an array of strings that enclosed inside {}
	// example: "abc{12{der}3}defg{4567}hijkl{8}m" => ["{12{der}3}","{4567}","{8}"]
	getNoFunctStrArr: function(addedFunctStr){
		
		var noFunctStrArr =[];

        var leftMostInst = isaac.extract(addedFunctStr,"{");
      
        var cutIndex,remainStr;   
      
        //var addedFunctStr = noFunctStr;
      
        // find instruction inside {}
            
        remainStr = addedFunctStr;

        while(leftMostInst !== ""){
        	
        	var isEngChar = function(str){
        		var english = /[a-zA-Z]/;
        		return english.test(str);
        	}
        	
        	// position of last char of string inside {}
        	cutIndex = isaac.mySearch(remainStr,leftMostInst)+leftMostInst.length;
        	
        	// position of first char of string inside {}
        	var beginIndex = isaac.mySearch(remainStr,leftMostInst);
      
        	console.log("cutIndex",cutIndex);
        	
        	console.log("detected instruction",leftMostInst);//,"remainStr",remainStr);
 
			var charBeforeIt = remainStr.substr(beginIndex-1,1);       	
        	
        	console.log("charBeforeIt", charBeforeIt);
        	
        	//if (!isEngChar(charBeforeIt)){
        	
        		noFunctStrArr.push(leftMostInst);
        

        		
        	//}
        	
      		remainStr = remainStr.substring(cutIndex);
          
      		leftMostInst = isaac.extract(remainStr,"{");
        
        }
      
        console.log(noFunctStrArr);
        
        return noFunctStrArr;
   
	},
	
	
	

	// when input a string of code, like:
	// {a:"A",b:"boy"}
	// ["abc","dbf"]
	// "I am a boy"
	// return an object, array, string
	// assume input string would not be a string 'error'
	stringCodeToObject: function(str){


		var F = new Function ("try{var tmp=" + str + ";return tmp}catch(error){return 'error'}");
		
		return F();

	},
	
	
	
	// determine the type of instruction: string, arrayOfString, function
	instType: function (inst){
		
		var instTypeOf = (typeof inst);
		var construct = inst.constructor;
		
		//console.log("inst",inst,"construct",construct);
		
		if(instTypeOf === "string"){
			return "string";
		}	
			
		
		if(instTypeOf === "function"){
			return "function";
		}	
		

		if(construct === Array){
			
			var firstElement = inst[0];
			
			var firstElType = questionGenTools.instType(firstElement)
			
			return "array of "+firstElType;
			
		}	
		
		
		
		return "hi";
		
	},
	
	randomPict: function(arr){
		
		var randIndex = Math.round(Math.random()*arr.length+.5,0)-1;
		
		//console.log("randIndex",randIndex);
		
		return arr[randIndex];

	
	},
	
	
	// run the code of instArr
	// assume any arrays are array of string or array of number
	exeInstructionArr: function(instArr){
		
		var tmp="";
		
		console.log("q");
		
		
		for (var i = 0; i<instArr.length;i++){
			var thisInst = instArr[i];
			var instType = questionGenTools.instType(thisInst);
			
			//console.log(//"thisInst",thisInst,
			//"instType",instType);
			
			if(instType==="string"){
				tmp = tmp + thisInst;
			}

			if(instType==="array of string"){
				
				var randomPict = questionGenTools.randomPict(thisInst);
				
				tmp = tmp + randomPict;
				
			}
			
			if(instType==="function"){
				
				
				
				var thisVal = thisInst(q);
              
                //console.log("thisInst as function", thisInst);
				
				tmp = tmp + thisVal;
				
			}
			
		}	
		
		//console.log("return",tmp);
		
		return tmp;
		
	},	
	
	
	// return an object, from the textarea with jquery selector: srtFrom
	getValueAsObj: function(srtFrom){
		
		var assgint = function(str){

			/*
			
			["abc","cde",{"a":"a char","b":"b char"}]
			
			obj = str.replace(/(['"])?([a-zA-Z0-9_])(['"])?:/g,'"$2": ');
			
			console.log('obj',obj);
			
			obj = JSON.parse(obj);

			return obj;
			*/
			
			//console.log("str",str);
			
			var F = new Function ("var tmp=" + str + ";return tmp");
			
			return F();
			
			//console.log("tmp",tmp);
		
		}
		
		
		var str = $(srtFrom).val();
		//var instruction;
		
		obj = assgint(str);
		
		//console.log('obj',obj);
		
		return obj;
		
		
		
	},
	
	captureTab: function(idStr){
		
		function keyHandler(e) {
			var TABKEY = 9;
			if(e.keyCode == TABKEY) {
				this.value += "    ";
				if(e.preventDefault) {
					e.preventDefault();
				}
				return false;
			}
		}
		
		
		var myInput = document.getElementById(idStr);
		
		console.log("myInput",myInput);
		
		if(myInput.addEventListener ) {
			myInput.addEventListener('keydown',keyHandler,false);
		} else if(myInput.attachEvent ) {
			myInput.attachEvent('onkeydown',keyHandler); 
		}


	},
	
	// when you typw tab, it go to the next buttom imstead of insert a tab
	// to make some textbox work, run this function with argument textAreaSelector
	// eample: questionGenTools.makeTextAreaTabWork("#textArea")
	// v0
	makeTextAreaTabWork: function(textAreaSelector){
		
		
		//console.log("hi");
		// http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
		$(document).delegate(textAreaSelector, 'keydown', function(e) {
			var keyCode = e.keyCode || e.which;

			if (keyCode == 9) {
				//console.log('you pressed tab');
				e.preventDefault();
				var start = $(this).get(0).selectionStart;
				var end = $(this).get(0).selectionEnd;

				// set textarea value to: text before caret + tab + text after caret
				$(this).val($(this).val().substring(0, start)
				+ "\t"
				+ $(this).val().substring(end));

				// put caret at right position again
				$(this).get(0).selectionStart =
				$(this).get(0).selectionEnd = start + 1;
			}
		});					
	}





};
