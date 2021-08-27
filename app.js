const drags = document.querySelectorAll("p");
const containers = document.querySelectorAll("div");

Array.from(drags).forEach((drag) => {
  drag.addEventListener("dragstart", () => {
    console.log("dragstart");
  });
});
