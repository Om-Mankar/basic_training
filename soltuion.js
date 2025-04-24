// Q1
function testNum(num){
    return new Promise((resolve,reject)=>{
        if(num>10){
            resolve( "higher than 10");
        } else if(num<10){
            resolve( "less than 10");
        }
        reject("equal to 10");
    }).then((result)=>{console.log("resolve",result)},(result)=>{console.log("reject",result)})
}

//Q2
function question2(arr){
    return new Promise((resolve,reject)=>{
        arr.map(element => {
            if(typeof element !== "string"){
                reject("All element not string")
            }
        });
        resolve(arr)
    }).then((result)=>{
        //sorting all elements
        result.sort();
         console.log(result);
    },(result)=>{
         console.log(new Error(result));
    })
}

// Q3
function callBack(){
    console.log("hi callback");
}
const sleep=(callBack)=>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callBack);
        }, 3000);
    })
}

  sleep(callBack).then(result=>result())

// Q4 
function randomTime(){
    return Math.floor(Math.random()*6000);
}
function question4(){
  
    const pro =new Promise((resolve)=>{
        setTimeout(()=>{console.log(0);resolve();},randomTime())
    }).then(()=>{
       return new Promise((resolve)=>{ setTimeout(()=>{console.log(1);resolve();},randomTime())});
    }).then(()=>{
        return new Promise((resolve)=>{ setTimeout(()=>{ console.log(2);resolve();},randomTime())});
     })
     .then(()=>{
       return new Promise((resolve)=>{ setTimeout(()=>{ console.log(3);resolve();},randomTime())});

     }).then(( )=>{
        return new Promise((resolve)=>{ setTimeout(()=>{ console.log(4);resolve();},randomTime())});
     }).then(()=>{
        return new Promise((resolve)=>{ setTimeout(()=>{ console.log(5);resolve();},randomTime())});

     }).then(()=>{
        return new Promise((resolve)=>{ setTimeout(()=>{ console.log(6);resolve();},randomTime())});

     }).then(()=>{
        return new Promise((resolve)=>{ setTimeout(()=>{ console.log(7);resolve();},randomTime())});
        

     }).then(()=>{
        return new Promise((resolve)=>{ setTimeout(()=>{ console.log(8);resolve();},randomTime())});
         

     }).then(()=>{
        return new Promise((resolve)=>{ setTimeout(()=>{ console.log(9);resolve();},randomTime())});
         
     }).then(()=>{console.log("over")})
    
}
question4();

//Q5.
//  var somelist = readVeryLongList();
// var nextItem = function() {
//    var item = somelist.pop();
//    if (item) {
//        // process the list item...
//        nextItem();
//    }
// };

//Q6.
function question6(){
// Reason : let is having a blocked scoped .
    for(let i = 0; i < 10; i++) {
        const func=setTimeout(function() {
          console.log(i); 
        }, 10);
    
     }
}
  

