const items = document.querySelectorAll(".item");
const thumbs = document.querySelectorAll(".thumb");
//const items=document.querySelectorAll(".item"),thumbs=document.querySelectorAll(".thumb");let index=0;function showSlide(e){items.forEach(e=>e.classList.remove("active")),thumbs.forEach(e=>e.classList.remove("active")),items[e].classList.add("active"),thumbs[e].classList.add("active")}document.querySelector(".next").onclick=()=>{index=(index+1)%items.length,showSlide(index)},document.querySelector(".prev").onclick=()=>{index=(index-1+items.length)%items.length,showSlide(index)},thumbs.forEach((e,t)=>{e.onclick=()=>{index=t,showSlide(t)}});let startX=0;document.getElementById("slider").addEventListener("touchstart",e=>{startX=e.touches[0].clientX}),document.getElementById("slider").addEventListener("touchend",e=>{let t=e.changedTouches[0].clientX;startX-t>50&&document.querySelector(".next").click(),t-startX>50&&document.querySelector(".prev").click()});
let index = 0;

function showSlide(i) {
  items.forEach(e => e.classList.remove("active"));
  thumbs.forEach(e => e.classList.remove("active"));

  items[i].classList.add("active");
  thumbs[i].classList.add("active");
}

document.querySelector(".next").onclick = () => {
  index = (index + 1) % items.length;
  showSlide(index);
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + items.length) % items.length;
  showSlide(index);
};

thumbs.forEach((t, i) => {
  t.onclick = () => {
    index = i;
    showSlide(i);
  };
});

// Swipe Navigation
let startX = 0;
document.getElementById("slider").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.getElementById("slider").addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) document.querySelector(".next").click();
  if (endX - startX > 50) document.querySelector(".prev").click();
});
