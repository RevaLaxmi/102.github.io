//Initial References are established
// we have the container element the heart drawing - drawHearts  variable 
// variable for the mouse coordinates. x,y and the array to store heart objects. 
const container = document.querySelector(".container");
let drawHearts; // It allows the code to conditionally execute the logic for creating and updating hearts based on whether drawHearts is true or false.
let mouseX = 0,
  mouseY = 0; // They are used to determine where on the screen the hearts should be created, following the mouse or touch input.
let hearts = []; // It allows the code to update and manage each heart independently, controlling their appearance and removal based on their visibility status.

//Red Shades - colors of the following hearts
// let colors = ["#ff0000", "#dc143c", "#ff4040", "#ed2939", "#fe2712", "#ed1c24"];
//let colors = ["#ffc0cb", "#ffb6c1", "#ff69b4", "#ff1493", "#c71585"];
// pink colors
// let colors = ["#ffc0cb", "#ffc6cc", "#ffd2d2", "#ffdae2", "#ffe0e6"];
// slight darker shades of pink 

//let colors = ["#ffabb7", "#ffa0ad", "#ff94a3", "#ff8999", "#ff7f8f"];

//shades of purple

let colors = ["#bf94e4", "#9b30ff"];




// Rainbow Colors
//let colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"];



//Events Object - This approach provides a convenient way to handle different types of input events (mouse or touch) consistently.
// By having an events object, the code can use a common interface for handling both mouse and touch events.

let events = {
  mouse: {
    move: "mousemove",
    stop: "mouseout",
  },
  touch: {
    move: "touchmove",
    stop: "touchend",
  },
};

let deviceType = "";

//Detect touch device
// Try creating a TouchEvent; if successful, it's a touch device.
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Random number between given range
// A function for generating random numbers within a given range is defined.
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

//Create Hearts
function startCreation() {
  //If drawHearts = true only then start displaying hearts. This is done to stop hearts creation when mouse is not on the screen.
  if (drawHearts) {
    //Create Div
    let div = document.createElement("div");
    div.classList.add("heart-container");
    //Set left and top based on mouse X and Y
    div.style.left = mouseX + randomNumberGenerator(5, 50) + "px";
    div.style.top = mouseY + randomNumberGenerator(5, 50) + "px";
    //Random shade of Red
    let randomColor =
      colors[Math.floor(randomNumberGenerator(0, colors.length - 1))];
    //heart dic
    div.innerHTML = `<div class="heart"></div>`;
    div.style.opacity = 1;
    //Set the value of variable --size to random number
    let root = document.querySelector(":root");
    let sizeValue = randomNumberGenerator(10, 20);
    //Random height/width value
    //You can change this
    root.style.setProperty("--size", sizeValue + "px");
    root.style.setProperty("--color", randomColor);
    container.appendChild(div);
    //set visible flag for div
    hearts.push({
      visible: true,
    });
  }
  updateHearts(); // Schedule the function to run again after a short delay.
  window.setTimeout(startCreation, 200);
}

function updateHearts() {
    // we're creating a fading effect
  for (let i in hearts) {
    //get div at current index
    let heartContainer = document.getElementsByClassName("heart-container")[i];
    //If visible
    // Checks if the current heart container is marked as visible in the hearts array.
    if (hearts[i].visible) {
      heartContainer.style.opacity = +heartContainer.style.opacity - 0.1;
      //If 0 set visible to false
      // Decreases the opacity of the heart container by 0.1. This creates a fading effect.
      if (heartContainer.style.opactiy == 0) {
        hearts[i].visible = false;
      }
      // If the opacity of the heart container reaches 0, it sets the visible property in the hearts array to false.
      // because that means we now need to loop back. 
    } else {
      //if div is not visible remove it and remove entry from hearts array
      // The remove() method removes the heartContainer element from the DOM, making it no longer part of the document structure.
      heartContainer.remove();
      hearts.splice(i, 1);
    }
  }
}
isTouchDevice();
// this is using the function that we attempted to create. 
document.addEventListener(events[deviceType].move, function (e) {
  mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
  // if its a touch device it uses a certain function ow something else. 
  mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
  drawHearts = true;
});

document.addEventListener(events[deviceType].stop, function (e) {
  drawHearts = false;
});

window.onload = () => {
  drawHearts = false;
  startCreation();
};
