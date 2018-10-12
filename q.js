// v1: 9 apr 2018, in phone, transfer to c9

var q={};

q.randomPict = questionGenTools.randomPict;
//
q._randomBetween = function(a,b){
	// 0 to 3, 4 possibilities, 
	// len = 4
	var len = b-a+1;
	var tmp = Math.random() * len-0.5;
	tmp = Math.round(tmp) + a;
	return tmp;
};

q.gcf = function(a,b){
	
	var big,small;
	
	if (a>b){
		big = a;
		small = b;
	}else{
		big = b;
		small = a;
	}
	
	if (big % small == 0){
		return small;
	}else{
		return q.gcf(small,(big % small));
	}
		
};

q.latexMixedNumber = function(n,d){
	
	//console.log("n",n,"d",d);
	
	var sign = "";
	var tmp = "";
	
	//console.log("n * d < 0",n * d < 0);
	
	if (n * d < 0){
		sign = "-";
		n = Math.abs(n);
		d = Math.abs(d);
	}
	
	var intPart = Math.round(n/d-0.5),
	newN = n - intPart * d;
	
	if (intPart == 0){
		tmp = sign + "\\frac{" + n + "}{" + d + "}";
	}else if (newN == 0){
		tmp = sign + intPart;
	}
	else{
		tmp = sign + intPart + "\\frac{" + newN + "}{" + d + "}";
	}
	
	if(n == 0){
		tmp = "0";
	}
	
	//console.log("tmp",tmp);
	
	return tmp;
		
};


q.randomBetween = function(lower,uppler,primeTo){

	if (primeTo){
		
		var tmp = q._randomBetween(lower,uppler);
		
		if (q.gcf(tmp,primeTo) == 1){
			
			return tmp;
			
		}else{
			
			return q.randomBetween(lower,uppler,primeTo);
			
		}
		
		
	}else{
		
		return q._randomBetween(lower,uppler);		
		
	}



};


// return the sufex of nubmer e.g. 1st, 2nd, 3rd, 4th, 32nd
q.nth = function(n){
	
	if (n % 10 == 1){
		
		if (n != 11){
		
			return n + "st";
			
		}
		
	}
	
	if (n % 10 == 2){
		
		if (n != 12){
		
			return n + "nd";
			
		}
		
	}
	
	if (n % 10 == 3){
		
		if (n != 13){
		
			return n + "rd";
			
		}
		
	}	
	
	return n + "th";
};
	

q.randomBetween_continuous = function(a,b){
	// 0 to 3, 4 possibilities, 
	// len = 4
	var len = b-a+1;
	var tmp = Math.random() * len;
	tmp = tmp + a;
	return tmp;
};

// to make an array of A.P. with a1=a, d = d, number of terms = n
q.ap = function(firstTerm,commonDiff,numOfTerm){
	var tmp=[];
	var term= firstTerm;
	for(var i=0; i < numOfTerm;i++){
		tmp.push(term);
		term=term+commonDiff;
	}
	return tmp;
};



// to make an array of G.P. with a1=a, d = d, number of terms = n
q.gp = function(firstTerm,commonRatio,numOfTerm){
	var tmp=[];
	var term= firstTerm;
	for(var i=0; i < numOfTerm;i++){
		tmp.push(term);
		term=term*commonRatio;
	}
	return tmp;
};



// otherInfo are used to set some attribute of f
q.image = function(inArr,f,otherInfo){
	var tmp=[];
	var total=inArr.length;
	for(var i=0; i < total;i++){
		tmp.push(f(inArr[i],otherInfo));
		
	}
	return tmp;
};


// not finished
var test = function(){
	var a=1,b=4;
	
	
	var total=10000;
	var countA=0,
	countB=0;
	
	for(var i =0;i<total;i++){
		
		var eg = q.randomBetween(a,b);
		
		//console.log(eg);
		
		if(eg==a){
			countA = countA+1;
		}
		
		if(eg==b){
			countB++;
		}
	}
	
	
};

q.roundDp = function(num,dp){
   var tmp = num;
   tmp = tmp * Math.pow(10,dp);
   tmp = Math.round(tmp);
   tmp = tmp / Math.pow(10,dp);
   return tmp;
};


q.addRand = function(inX,otherInfo){
	var a = otherInfo.from,b=otherInfo.to;
	var tmp=inX + q.randomBetween_continuous(a,b);
	tmp = q.roundDp(tmp,1);
	return tmp;
};

q.singleTerm = function(coeff, strVar, intExp,isLeading){

	// zero case
	if (coeff == 0){
		return "";
	}

	// constant case
	if (intExp== 0 && isLeading == false){		
		if (coeff > 0){
			return "+"+coeff + "";
		}else{
			return coeff + "";
		}
	}

	// example: 1x+7
	if (coeff == -1 && intExp == 1){
		return "-" + strVar;	
	}
	
	if (coeff == 1 && intExp == 1 && isLeading == false){
		return "+" + strVar;
	}


	if (coeff == -1 && intExp !== 1){
		return "-" + strVar + "^{" + intExp +"}";
	}

	// example: 1x+7
	if (coeff == 1 && isLeading == true){
		if (intExp !== 1){
			return strVar + "^{" + intExp +"}";
		}else{
			return strVar;
		}
	}else{
		if (intExp !== 1){
			return coeff+strVar + "^{" + intExp +"}";
		}else{
			
			if(isLeading){
				if (coeff == 1){
					return strVar;
				}else if(coeff == -1){
					return "-" + strVar;
				}else{
					return coeff+strVar;
				}
			}else{
				if (coeff>0){
					return "+" + coeff+strVar;
				}else{
					return coeff+strVar;
				}
			}
		}		
	}
};


// give an object {n, d, value, latexStr}, given the upper bound of denominator and n, d are relatively prime
// the lower bound of denominator is defualt as 2
q.randomFrac = 	function(d_upper,n_upper){
	
	var obj = {};

	obj.d = q.randomBetween(2,d_upper);
	obj.n = q.randomBetween(1,n_upper,ratio_d);

	obj.val = obj.n /obj.d;
	obj.latex = "\\frac{" + obj.n +"}{"+ obj.d + "}";
	

	return obj;
};



// p1 and p2 as array
q.polyMultiply = function(pOneArr, pTwoArr){
	
	if(pOneArr.length > pTwoArr.length){
		var p1 = pOneArr, p2 = pTwoArr;
	}else{
		var p2 = pOneArr, p1 = pTwoArr;
	}
	var d1 = p1.length -1, d2 = p2.length -1;
	
	var tmp = [];
	
	var max = Math.max(d1, d2);
	var min = Math.min(d1, d2);
	
	// say, d1 = 4, d2 = 3
	// max = max (d1, d2) = 4
	// start = min(n, max)
	// 7	4,3					start = 4	end = 4 = 7 - 3
	// 6	4,2 3,3				start = 4	end = 3 = 6 - 3
	// 5	4,1 3,2, 2,3					end = 2 = 5 - 3
	// 4	4,0 3,1, 2,2 1,3				end = 1 = 4 - 3
	// 3	3,0 2,1 1,2 0,3					end = 0 = 3 - 3
	// 2	2,0 1,1 0,2						end = 0
	for (var n = d1+d2; n>-1; n--){
		
		//console.log("n",n);
		
		var start = Math.min(max, n);
		var tmpSum = 0;
		var end = Math.max(n-min, 0);

		//console.log("start",start,"end",end);

		for (var i = start; i >= end ; i--){
			//console.log("i",i);
			/*
			console.log(p1[d1-i] , 
				-(start-i-(n-i)),
				p2[d2+(start-i-(n-i))]
			);
			*/
			tmpSum = tmpSum + p1[d1-i] * p2[d2+(start-i-(n-i))];
		}
		
		tmp.push(tmpSum);
		
	}
	
	return tmp;
	
};


// return a geometric sequence with first few terms integer and fraction common ratio
// obj.a1 = first term, obj.aMid = middle integer term, obj.aLast = last integer term, obj.rLatex, obj.rVal
q.gpWithFracRatioIntTermToN = function(n_upper,d_upper){
	
	var obj = {};
	var dummy = {}; // dummy
	//var upper = d_upper


		var ratio_n = q.randomBetween(1,n_upper);
		var ratio_d = q.randomBetween(2,d_upper,ratio_n);
		dummy.ratio_n = ratio_n;
		dummy.ratio_d = ratio_d;
		dummy.n1 = q.randomBetween(1,5);
		dummy.n2 = dummy.n1+q.randomBetween(1,3)*2+1;
		var d = dummy.n2-dummy.n1;
		//dummy.firstTerm = dummy.randomBetween(1,5) * Math.pow(ratio_d, d);
		//dummy.nextTerm = dummy.firstTerm * Math.pow(ratio_n /ratio_d, d);
		//dummy.nextTerm = dummy.roundDp(dummy.nextTerm,0);
		
		obj.a1 = (q.randomBetween(1,5) * Math.pow(ratio_d, dummy.n2-1));
		obj.a1 = q.roundDp(obj.a1,0);
		
		obj.aMid = obj.a1 * Math.pow(ratio_n /ratio_d, dummy.n1-1);
		obj.aMid =  q.roundDp(obj.aMid,0);
		
		obj.aLast = obj.a1 * Math.pow(ratio_n /ratio_d, dummy.n2-1);
		obj.aLast =  q.roundDp(obj.aLast,0);
		
		obj.rVal = ratio_n /ratio_d;
		obj.rLatex = "\\frac{" + ratio_n +"}{"+ ratio_d + "}";
		
		
		//dummy.isADecimal = dummy.roundDp(dummy.realFirstTerm, 0) !== dummy.realFirstTerm;

		return obj;


	
};

q.polynomial = function(coeffArr,variable){
	var deg = coeffArr.length -1;
	var result = "";
	for (var i=0;i<deg+1;i++){
		if (i==0){
			result = result + q.singleTerm(coeffArr[i], variable, deg-i,true);
		}else{
			result = result + q.singleTerm(coeffArr[i], variable, deg-i,false);
		}
	}
	
	return result;
};

q.randQuadFn = function(aMax,bMax,cMac){
		var a = q.randomBetween(1,aMax)*q.randomPict([-1,1]);
		var b = q.randomPict([q.randomBetween(1,bMax)*q.randomPict([-1,1]),0]);
		var c = q.randomPict([q.randomBetween(1,cMac)*q.randomPict([-1,1]),0]);
		var poly = q.polynomial([a, b, c],"x");
		return poly;
};


q.randLinearFn = function(aMax,bMax){
		var a = q.randomBetween(1,aMax)*q.randomPict([-1,1]);
		var b = q.randomPict([q.randomBetween(1,bMax)*q.randomPict([-1,1]),0]);
		console.log("a",a,"b",b);
		var poly = q.polynomial([a, b],"x");
		console.log("poly",poly);
		return poly;
};

q.randSginNonZeroInt = function(max){
	return q.randomBetween(1,max)*q.randomPict([-1,1]);
};

q.randSginIntWithProbZero = function(max,probOfZero){
	if (Math.random()<probOfZero){
		return 0;
	}else{
		return q.randSginNonZeroInt(max);
	}
};

q.randPrimeBelow = function(max){
	var primeList = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 
		59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 
		139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
	
	var tmp = q.randomPict(primeList);
	
	if(max > Math.max(primeList)){
		return "max to large, please extend the list of prime number";
	}
	
	while (tmp > max){
		primeList = primeList.slice(0,primeList.indexOf(tmp));
		tmp = q.randomPict(primeList);
	}
	
	return tmp;
	
};

q.shuffleArr = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
