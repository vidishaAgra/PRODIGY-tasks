Shery.mouseFollower();


let buttons=document.querySelectorAll(".btn");
let msg = document.querySelector("#msg");

let turnO=true;
let count=0;

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

buttons.forEach((but)=>{
    but.addEventListener("click",()=>{
        if(turnO){
            but.innerText="O";
            turnO=false;
        } else {
            but.innerText="X";
            turnO=true;
        }
        but.disabled=true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
          }
    })
})
const disableBoxes = () => {
    for (let but of buttons) {
      but.disabled = true;
    }
  };
const gameDraw = () => {
    msg.style.display="inline";
    msg.innerText = `Game was a Draw.`;
  
    disableBoxes();
  };
const showinner=(winner)=>{
    msg.style.display="inline";
    msg.innerText = `Congratulations, Winner is ${winner}`;
    
    disableBoxes();
}

const checkWinner=()=>{
    for(let pattern of winPattern){
        let pos1=buttons[pattern[0]].innerText;
        let pos2=buttons[pattern[1]].innerText;
        let pos3=buttons[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                showinner(pos1);
                return true;
            }
        }

    }
}
var t=gsap.timeline();
t.to(".landingPage p",{
    y:"-100",
    duration:1
})

t.to(".landingPage",{
    height:"0vh",
    duration:"2"

})