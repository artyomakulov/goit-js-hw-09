import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    hoursQ: document.querySelector('[data-hours]'),
daysQ: document.querySelector('[data-days]'),
minutesQ: document.querySelector('[data-minutes]'),
secondsQ: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
               Notiflix.Notify.failure('Please choose a date in the future') 
        }
        else {
            refs.startBtn.disabled = false;
            Notiflix.Notify.success('Вперед')
            refs.startBtn.addEventListener('click', () => {
                let timerId = setInterval(() => {
                    let newDate = convertMs(selectedDates[0] - new Date());
                    console.log(newDate)
                    refs.daysQ.textContent = newDate.days;
                    refs.hoursQ.textContent = newDate.hours;
                    refs.minutesQ.textContent = newDate.minutes;
                    refs.secondsQ.textContent = newDate.seconds;
                    if (selectedDates[0] - new Date() < 1000) {
                        clearInterval(timerId);
                    }
                }, 1000);
          refs.startBtn.disabled = true;
            })
        }
  },
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}



flatpickr(refs.input, options);

console.log(new Date())


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
