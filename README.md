# fraction.js
A javascript library for Fractions.
## Setup
~~~html
<script src="fraction.js"></script>
~~~
## Uses
### Create a Fraction
~~~javascript
//These all create same fraction 1/2
var frac = new Fraction(1,2);
var frac = new Fraction(0.5);
var frac = new Fraction("0.5");
var frac = new Fraction("1/2");
var frac = new Fraction("1/2");
var frac = new Fraction("1", "2");

var frac2 = new Fraction(frac);//from other fraction
~~~

### Adding Fractions
~~~javascript
var frac1 = new Fraction(1,2);
var frac2 = new Fraction(2,3);
var frac3 = new Fraction(3,4);

//You can add many fractions at once
frac1.add(frac2,frac3);
frac1.add(frac2,frac3,"4/5",0.2);//Even numbers and Fraction in string can be added
frac1.add([frac2,frac3,"4/5",0.2]);//You can pass array too 

//Another ways for adding
Fraction.add(frac2,frac3);
Fraction.add(frac2,frac3,"4/5",0.2);
Fraction.add([frac2,frac3,"4/5",0.2]); 
~~~
### Subtracting Two Fractions
~~~javascript
frac1.subtract(frac2);
//Even numbers and Fraction in string can be subtracted
frac1.subtract("4/5");
frac1.subtract(0.2);

//Another ways for subtracting
Fraction.subtract(frac1,frac2);
Fraction.subtract(frac1,"4/5");
Fraction.subtract(frac1,0.2); 
~~~
### Multiplying Fractions
~~~javascript
//You can multiply many fractions at once
frac1.multiply(frac2,frac3);
frac1.multiply(frac2,frac3,"4/5",0.2);//Even numbers and Fraction in string can be multiplied
frac1.multiply([frac2,frac3,"4/5",0.2]);//You can pass array too 

//Another ways for multiplying
Fraction.multiply(frac2,frac3);
Fraction.multiply(frac2,frac3,"4/5",0.2);
Fraction.multiply([frac2,frac3,"4/5",0.2]); 
~~~
### Dividing Two Fractions
~~~javascript
frac1.divide(frac2);
//Even numbers and Fraction in string can be divided
frac1.divide("4/5");
frac1.divide(0.2);

//Another ways for dividing
Fraction.divide(frac1,frac2);
Fraction.divide(frac1,"4/5");
Fraction.divide(frac1,0.2); 

//You can drop "divide" too :)
Fraction(frac1,frac2);
Fraction(frac1,"4/5");
Fraction(frac1,0.2); 
Fraction("1/3",0.2);
~~~
### Get Reciprocal
~~~javascript
frac1.reciprocal();//Converts frac1 to (1/frac)
Fraction.reciprocal(frac1);
~~~
### Adding Reciprocals
~~~javascript
//You can pass many fractions at once
Fraction.addReciprocals(frac1,frac2,frac3);//=(1/frac1)+(1/frac2)+(1/frac3)
Fraction.addReciprocals(frac1,"1/6",0.3);//Even numbers and Fraction in string can be passed
Fraction.addReciprocals([frac1,"1/6",0.3]);//You can pass array too 
~~~
### Comparing Fractions
~~~javascript
//is frac1=frac2?
frac1.equals(frac2);
Fraction.equals(frac1,frac2);

//is frac1>frac2?
frac1.isGreaterThan(frac2);
Fraction.isGreaterThan(frac1,frac2);

//is frac1<frac2?
frac1.isLessThan(frac2);
Fraction.isLessThan(frac1,frac2);

//You can even pass numbers and Fraction in string
~~~
### Comparing Fraction to a number
~~~javascript
//is frac1=number?
frac1==0.3;
frac1.equals(0.3);
Fraction.equals(frac1,0.3);

//is frac1>number?
frac1>0.3;
frac1.isGreaterThan(0.3);
Fraction.isGreaterThan(frac1,0.3);

//is frac1<number?
frac1<0.3;
frac1.isLessThan(0.3);
Fraction.isLessThan(frac1,0.3);
~~~
### Get Remainder
~~~javascript
//Get r, as x/y = q + (r/y), where q & r are integers
frac1.remainder();
Fraction.remainder(frac1);
~~~
### Get Quotient
~~~javascript
//Get q, as x/y = q + (r/y), where q & r are integers
frac1.quotient();
Fraction.quotient(frac1);
~~~
### Get in Decimal
~~~javascript
frac1.valueOf();
Fraction.valueOf(frac1);
~~~
