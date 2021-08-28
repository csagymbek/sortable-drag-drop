const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".draggable");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const dragAfterEl = getDragAfterElement(container, e.clientY);
    if (dragAfterEl) {
      container.insertBefore(dragging, dragAfterEl);
    } else {
      container.appendChild(dragging);
    }
  });
});

const getDragAfterElement = (container, y) => {
  const draggableElementsArray = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElementsArray.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};
