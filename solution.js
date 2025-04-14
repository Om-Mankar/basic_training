// Q1. 
function CalculateFactorial(num){
    function fac(num){
        if(num===0){
            return 1;
        }
        return num*fac(num-1);
    }
   return fac(num)
}

// Q2
function CheckFirstChar(str){
let ans="";
for(let i=0;i<str.length;i++){
    if(i==0 && str[0]>='a' && str[0]<='z'){
        ans+=str[0].toLocaleUpperCase();
    }else{
        ans+=(str[i]);
    }
    
}
return ans;    
}

// Q3
class Calculator {
    
    constructor(){
        this.a=0;
        this.b=0;
    }
    read(){
        this.a=Number(window.prompt("Enter the first number",0));
        this.b=Number(window.prompt("Enter the second number",0));
        document.body.innerHTML=`first number ${this.a} , second Number ${this.b}\n`
    }
    sum(){
        document.body.innerHTML=document.body.innerHTML+`sum of the two is ${this.a+this.b}\n`;
        return this.a+this.b;
    }
    mul(){
        document.body.innerHTML=document.body.innerHTML+`mul of the two is ${this.a*this.b}\n`;
        return this.a*this.b;
    }
}
const number=new Calculator;
setTimeout(number.read,1000);
setTimeout(number.sum,4000);
setTimeout(number.mul,8000)

// Q4
function Deepclone(obj){
    newObj=obj;
    for(const key in obj){
        newObj[key]=obj[key];
    }
    return newObj;
}

