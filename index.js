
var birdPos="70vh"
var game=true

const down_button=document.querySelector('.down');
down_button.addEventListener('click',()=>{
    let num =Number(birdPos.slice(0,2))
    if(birdPos!=="70vh"){
        num+=5;
        birdPos=num.toString()+ 'vh';
        document.querySelector('.bird').style.positon ='absolute';
        document.querySelector('.bird').style.top =birdPos;
    }
})

//logic for changing height of obstacles
var pillarHeight=["10vh","10vh","20vh","20vh","10vh","40vh"];

const pillarHeightChange =()=>{
    document.querySelector('.hurdle1').style.height=pillarHeight[0];
    document.querySelector('.hurdle2').style.height=pillarHeight[1];
    document.querySelector('.hurdle3').style.height=pillarHeight[2];
    document.querySelector('.hurdle4').style.height=pillarHeight[3];
    document.querySelector('.hurdle5').style.height=pillarHeight[4];
    document.querySelector('.hurdle6').style.height=pillarHeight[5];
    pillarHeight.unshift();
    let height=parseInt(Math.random()*30);
    let str=height.toString();
    str+='vh';
    pillarHeight.push(str)
    pillarHeight.shift()

    //checking for end game
    if(document.querySelector('.bird').getBoundingClientRect().top<=document.querySelector('.hurdle1').getBoundingClientRect()){
        alert('Game over Restart to start the game')
        clearInterval(intervalID)
        clearInterval(birdIntervalId)
    }


}

const birdHeightChange=()=>{
     
        //updating the birds height
        if(birdPos!=="20vh"){
            let num =Number(birdPos.slice(0,2));
            num-=5;
            birdPos=num.toString()+ 'vh';
            document.querySelector('.bird').style.positon ='absolute';
            document.querySelector('.bird').style.top =birdPos;
        }
           //checking for end game
           if(document.querySelector('.bird').getBoundingClientRect().top<=document.querySelector('.hurdle1').getBoundingClientRect().bottom){
            alert('Game over Restart to start the game')
            clearInterval(intervalID)
            clearInterval(birdIntervalId)
        }
    
}

const intervalID = setInterval(pillarHeightChange, 2000);
const birdIntervalId=setInterval(birdHeightChange,500)





