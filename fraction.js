var Fraction = function() {
	var argLen=arguments.length;
	correctArgumentLength(0,2,argLen);
	
	this.numerator;
	this.denominator;
	
	var numerator = 0;
	var denominator = 1;
	

	if(argLen>0){
		console.log("0");
		var x=parseFraction(arguments[0]);
		numerator=x.numerator;
		denominator=x.denominator;
		
	}
	if(argLen>1){
		console.log("1");
		var x=parseFraction(arguments[1]);
		numerator*=x.denominator;
		denominator*=x.numerator;
		
	}
	
	function parseFraction(arg){
		var numerator = 0;
		var denominator = 1;
		if(typeof arg=="number"){
			console.log("2");
			/*numerator = Number(arg);
			if(!Number.isInteger(numerator)){
				arg = String(numerator).split('.');
				numerator=Number(arg[0]+arg[1]);
				denominator=Number("1e"+arg[1].length);
			}*/
        var x=normalize(String(Number(arg)));	
			numerator=x.numerator;
			denominator=x.denominator;		
		}
		else if(arg.constructor===String){
			console.log("3");
			var x=normalize(arg);	
			numerator=x.numerator;
			denominator=x.denominator;
		}
		else if(arg.constructor===Fraction){
			console.log("4");
			numerator=arg.numerator;
			denominator=arg.denominator;
		}
		
		else throw new Error("invalid argument");
		return {
			numerator:numerator,
			denominator:denominator
		}
	}
	
	//from a.b/c.d to x/y
	function normalize(z){
		var a='',b='',c='',d='',x='',y='';
		
		var numerator = 0;
		var denominator = 1;
		
		z=z.split('/');
		x=z[0].split('.');
		
		a=String(Number(x[0]));
		numerator=a;
		if(x.length==2){
			b=x[1];
			numerator+=b;
		}
		
		if(z.length==2){
			y=z[1].split('.');
			c=String(Number(y[0]));
			denominator=c;
			if(y.length==2){
			d=y[1];
			denominator+=d;
			}
		}
		if(x.length>2||y.length>2||z.length>2)throw new Error("invalid argument");
		

		
		var decPointDiff=b.length-d.length;
		if(decPointDiff<0)
			numerator+="e"+(-decPointDiff);
		else if(decPointDiff>0)
			denominator+="e"+decPointDiff;
		return{
			numerator:Number(numerator),
			denominator:Number(denominator)
		}
			
	}
	this.numerator=numerator;
	this.denominator=denominator;
	this.simplify();
}

	Fraction.prototype.reciprocal=function(){
		correctArgumentLength(0,0, arguments.length);
		var x=this.numerator;
		this.numerator=this.denominator;
		this.denominator=x;
		return this;
		
	}
	
	Fraction.prototype.simplify = function(h) {
		var x=Fraction.gcd(this.numerator,this.denominator);
		this.numerator/=x;
		this.denominator/=x;
		if(this.numerator<0&&this.denominator<0){
			this.numerator/=-1;
			this.denominator/=-1;	
		}
	}
	
	Fraction.prototype.divide = function(frac) {
		correctArgumentLength(1,1,arguments.length);
		var x=new Fraction(frac);
		return this.change(new Fraction(this,x));
	}
	
	Fraction.prototype.multiply = function() {
		var argLen=arguments.length;
		var x;
		correctArgumentLength(1,Infinity,argLen);
		if(Array.isArray(arguments[0])){
			correctArgumentLength(1,1,argLen);
			x=(new Fraction(arguments[0][0]));
			for(var i=1;i<arguments[0].length;i++){
				x.change(new Fraction(x,(new Fraction(arguments[0][i]).reciprocal())));
			}
		}
		else{
			x=(new Fraction(arguments[0]));
			for(var i=1;i<argLen;i++){
				x.change(new Fraction(x,(new Fraction(arguments[i]).reciprocal())));
			}
		}
		x.reciprocal();
		return this.change(new Fraction(this,x));
	}
	
	Fraction.prototype.add=function(){
		var argLen=arguments.length;
		var x;
		correctArgumentLength(1,Infinity,argLen);
		if(Array.isArray(arguments[0])){
			correctArgumentLength(1,1,argLen);
			x=(new Fraction(arguments[0][0]));
			for(var i=1;i<arguments[0].length;i++){
				x=Fraction.add2Fractions(x,new Fraction(arguments[0][i]));
			}
		}
		else{
			x=(new Fraction(arguments[0]));
			for(var i=1;i<argLen;i++){
				x=Fraction.add2Fractions(x,new Fraction(arguments[i]));
			}
		}
		return this.change(Fraction.add2Fractions(this,x));
	}
	
	Fraction.prototype.subtract=function(frac){
		correctArgumentLength(1,1,arguments.length);
		var x=new Fraction(frac);
		x.numerator*=-1;
		return this.change(Fraction.add2Fractions(this,x));
	}
	
	Fraction.prototype.toString = function() {
		correctArgumentLength(0,0, arguments.length);
		if (this.denominator == 1) { return "" + this.numerator; }
		return "" + this.numerator + "/" + this.denominator;
	}
	
	Fraction.prototype.valueOf = function() {
		correctArgumentLength(0,0, arguments.length);
		return this.numerator / this.denominator;
	}
	
	Fraction.prototype.change = function(newFrac) {
		correctArgumentLength(1,1, arguments.length);
		this.numerator = newFrac.numerator;
		this.denominator = newFrac.denominator;
		return this;
	}
	
	Fraction.prototype.equals=function(frac){
		correctArgumentLength(1,1, arguments.length);
		var x=new Fraction(this,frac);
		return x.numerator==x.denominator;
	}
	
	Fraction.prototype.isGreaterThan=function(frac){
		correctArgumentLength(1,1, arguments.length);
		var x=new Fraction(this,frac);
		return x.numerator>x.denominator;
	}
	
	Fraction.prototype.isLessThan=function(frac){
		correctArgumentLength(1,1, arguments.length);
		var x=new Fraction(this,frac);
		return x.numerator<x.denominator;
	}
	
	Fraction.prototype.remainder=function(){
		correctArgumentLength(0,0, arguments.length);
		return this.numerator%this.denominator;
	}
	
	Fraction.prototype.quotient=function(){
		correctArgumentLength(0,0, arguments.length);
		return (this.numerator-this.remainder())/this.denominator;
	}
	
	Fraction.reciprocal=function(){
		var argLen=arguments.length;
		correctArgumentLength(0,2,argLen);
		var x=new Fraction();
		if(argLen>0){
			x=new Fraction(arguments[0]);
		}
		if(argLen>1){
			x=new Fraction(arguments[0],arguments[1]);
		}
		x.reciprocal();
		return x;
	}

	Fraction.divide=function(numerator,denominator){
		correctArgumentLength(2,2,arguments.length);
		return new Fraction(numerator,denominator);
	}
	
	Fraction.multiply=function(){
		var argLen=arguments.length;
		correctArgumentLength(1,Infinity,argLen);
		var x=new Fraction(1);
		if(Array.isArray(arguments[0])){
			correctArgumentLength(1,1,argLen);
			correctArgumentLength(2,Infinity,arguments[0].length);
			x.multiply(arguments[0]);
		}
		else{
			correctArgumentLength(2,Infinity,argLen);
			x.multiply(Array.from(arguments));
		}
		return x;
	}
	
	Fraction.add=function(){
		var argLen=arguments.length;
		correctArgumentLength(1,Infinity,argLen);
		var x=new Fraction();
		if(Array.isArray(arguments[0])){
			correctArgumentLength(1,1,argLen);
			correctArgumentLength(2,Infinity,arguments[0].length);
			x.add(arguments[0]);
		}
		else{
			correctArgumentLength(2,Infinity,argLen);
			x.add(Array.from(arguments));
		}
		return x;
	}
	
	Fraction.addReciprocals=function(){
		var argLen=arguments.length;
		correctArgumentLength(1,Infinity,argLen);
		var x=new Fraction();
		if(Array.isArray(arguments[0])){
			correctArgumentLength(1,1,argLen);
			correctArgumentLength(2,Infinity,arguments[0].length);
			for(var i=0;i<arguments[0].length;i++)
			x=Fraction.add2Fractions(x,(new Fraction(arguments[0][i])).reciprocal());
		}
		else{
			correctArgumentLength(2,Infinity,argLen);
			for(var i=0;i<argLen;i++)
			x=Fraction.add2Fractions(x,(new Fraction(arguments[i])).reciprocal());
		}
		return x;
	}
	
	Fraction.subtract=function(frac1,frac2){
		correctArgumentLength(2,2,arguments.length);
		return((new Fraction(frac1)).subtract(new Fraction(frac2)));
	}
	
	Fraction.toString = function(frac) {
		correctArgumentLength(1,1, arguments.length);
		var x=new Fraction(frac);
		return x.toString();
	}
	
	Fraction.valueOf = function(frac) {
		//correctArgumentLength(1,1, arguments.length);
		var x=new Fraction(frac);
		return x.valueOf();
	}
	
	Fraction.isGreaterThan=function(frac1,frac2){
		correctArgumentLength(2,2, arguments.length);
		var x=new Fraction(frac1);
		return x.isGreaterThan(new Fraction(frac2));
	}
	
	Fraction.isLessThan=function(frac1,frac2){
		correctArgumentLength(2,2, arguments.length);
		var x=new Fraction(frac1);
		return x.isLessThan(new Fraction(frac2));
	}
	
	Fraction.equals=function(frac1,frac2){
		correctArgumentLength(2,2, arguments.length);
		var x=new Fraction(frac1);
		return x.equals(new Fraction(frac2));
	}
	
	Fraction.remainder=function(frac){
		correctArgumentLength(1,1, arguments.length);
		var x=new Fraction(frac);
		return x.numerator%x.denominator;
	}
	
	Fraction.quotient=function(frac){
		correctArgumentLength(1,1, arguments.length);
		var x=new Fraction(frac);
		return (x.numerator-x.remainder())/x.denominator;
	}
	
	Fraction.gcd = function(num1, num2) {
		num1 = Math.abs(num1);
		num2 = Math.abs(num2);
		var greater = Math.max(num1, num2);
		var lesser = Math.min(num1, num2);
	
		while (lesser != 0) {
			var t = lesser;
			lesser = greater % lesser;
			greater = t;
		}
		return greater;
	};
	
	Fraction.add2Fractions = function(frac1, frac2) {
		correctArgumentLength(2,2, arguments.length);
		if(frac1.constructor!==Fraction||frac2.constructor!==Fraction){
			throw new Error("invalid argument");
		}
		return new Fraction(frac1.numerator * frac2.denominator + frac1.denominator * frac2.numerator,frac1.denominator * frac2.denominator);
	}

	Fraction.fromRepeatingDecimals=function(frac){
		correctArgumentLength(1,1, arguments.length);
		var x=Number(frac);
		if(String(1/x).length<String(x).length)
			x=1/x;
		return new Fraction(x);
	}
	
	function correctArgumentLength(min,max, actual) {
	if (min > actual || actual > max) { throw new Error("invalid number of arguments"); }
	}
	
