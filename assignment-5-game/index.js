//adding event listners to the code
var pos="35vh"

//logic for Up button
const up_button=document.querySelector('.up');
up_button.addEventListener('click',()=>{
    
        
    let num =Number(pos.slice(0,2))
    if(pos!=="10vh"){
        num-=5;
        pos=num.toString()+ 'vh';
        document.querySelector('.bird').style.positon ='absolute';
        document.querySelector('.bird').style.top =pos;
    }
    
})

//logic for Down button
const down_button=document.querySelector('.down');
down_button.addEventListener('click',()=>{
    let num =Number(pos.slice(0,2))
    if(pos!=="70vh"){
        num+=5;
        pos=num.toString()+ 'vh';
        document.querySelector('.bird').style.positon ='absolute';
        document.querySelector('.bird').style.top =pos;
    }
})

//logic for changing height of obstacles
var topPillarHeight=["30vh","0vh","40vh","0vh","25vh","0vh"];
var bottomPillarHeight=["20vh","0vh","10vh","0vh","25vh","0vh"];

const pillarHeightChange =()=>{
    //changing height of top pillars
    document.querySelector('.hurdle1').style.height=topPillarHeight[0];
    document.querySelector('.hurdle2').style.height=topPillarHeight[1];
    document.querySelector('.hurdle3').style.height=topPillarHeight[2];
    document.querySelector('.hurdle4').style.height=topPillarHeight[3];
    document.querySelector('.hurdle5').style.height=topPillarHeight[4];
    document.querySelector('.hurdle6').style.height=topPillarHeight[5];

    //changing height of bottom pillars
    document.querySelector('.hurdle7').style.height=bottomPillarHeight[0];
    document.querySelector('.hurdle8').style.height=bottomPillarHeight[1];
    document.querySelector('.hurdle9').style.height=bottomPillarHeight[2];
    document.querySelector('.hurdle10').style.height=bottomPillarHeight[3];
    document.querySelector('.hurdle11').style.height=bottomPillarHeight[4];
    document.querySelector('.hurdle12').style.height=bottomPillarHeight[5];
    
    //updating the Height array of pillar
    if(!(topPillarHeight[0]=='0vh' && bottomPillarHeight[0]=='0vh')){
        let height=parseInt(Math.random()*40);
        let str=height.toString();
        str+='vh';
        topPillarHeight.push(str)
        height=50-height;
        str=height.toString();
        str+='vh';
        bottomPillarHeight.push(str)
    } else {
        topPillarHeight.push('0vh')
        bottomPillarHeight.push('0vh')
    }
    topPillarHeight.shift()
    bottomPillarHeight.shift()

}
const checkBird=()=>{
     //checking for end game
     let birdTopCoordinate=document.querySelector('.bird').getBoundingClientRect().top;
     let birdRightCoordinate=document.querySelector('.bird').getBoundingClientRect().right;
     let topHurdleBottomCoordinate=document.querySelector('.hurdle1').getBoundingClientRect().bottom;
     let topHurdleLeftCoordinate=document.querySelector('.hurdle1').getBoundingClientRect().left;
     let birdBottomCoordinate=document.querySelector('.bird').getBoundingClientRect().bottom;
     let bottomHurdleTopCoordinate=document.querySelector('.hurdle7').getBoundingClientRect().top;
     let bottomHurdleLeftCoordinate=document.querySelector('.hurdle7').getBoundingClientRect().left;

     if(((birdTopCoordinate<=topHurdleBottomCoordinate
        )&& (birdRightCoordinate>=topHurdleLeftCoordinate)
        )||(
     (birdBottomCoordinate>=bottomHurdleTopCoordinate) && (
        birdRightCoordinate>=bottomHurdleLeftCoordinate)))
        {
        alert('Game over Restart to start the game')
        clearInterval(intervalID)
        clearInterval(birdIntervalId)
        }
    }

const intervalID = setInterval(pillarHeightChange,1500);
const birdIntervalId=setInterval(checkBird,500);





