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
    const afterEl = getDragAfterElement(container, e.clientY);
    if (afterEl === null) {
      container.appendChild(dragging);
    } else {
      container.insertBefore(dragging, afterEl);
    }
  });
});

const getDragAfterElement = (container, y) => {
  const draggableElements = Array.from(
    container.querySelectorAll(".draggable:not(.dragging)")
  );
  return draggableElements.reduce(
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
