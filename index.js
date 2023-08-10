var draggableElements = document.getElementsByClassName("dragable");

for (var i = 0; i < draggableElements.length; i++) {
  const dragzone = document.getElementById(
    draggableElements[i].getAttribute("data-dragzone")
  );
  if (dragzone) {
    dragElement(draggableElements[i], dragzone);
  }
}

function dragElement(element, dragzone) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  if (dragzone) {
    dragzone.onmousedown = dragMouseDown;
  } else {
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    const newTop = element.offsetTop - pos2;
    const newLeft = element.offsetLeft - pos1;
    // Dodaj warunki, aby elementy nie przesunęły się poza granice dragzone
    if (newTop >= 0 && newTop <= dragzone.clientHeight - element.clientHeight) {
      element.style.top = newTop + "px";
    }
    if (newLeft >= 0 && newLeft <= dragzone.clientWidth - element.clientWidth) {
      element.style.left = newLeft + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
