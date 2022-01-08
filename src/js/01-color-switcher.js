const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

let timerId = null

refs.btnStart.addEventListener('click', startColorSwitcher)
refs.btnStop.addEventListener('click', stopColorSwitcher)


function startColorSwitcher() {
    refs.btnStart.disabled = true;
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    console.log(timerId)}, 1000
    )
}

function stopColorSwitcher() {
    refs.btnStart.disabled = false;
    clearInterval(timerId)
}





function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
}

