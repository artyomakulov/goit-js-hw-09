import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formWindow: document.querySelector('.form'),
  btnSubmit: document.querySelector('button'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
}

refs.formWindow.addEventListener('submit', madePromise);

function madePromise(event) {
  event.preventDefault();

  let delayForm = Number(refs.inputDelay.value);
  let stepForm = Number(refs.inputStep.value);
  let amountForm = Number(refs.inputAmount.value);
  formInputResult(delayForm, stepForm, amountForm)
}

function formInputResult(delayForm, stepForm, amountForm) {
  let counter = 0
  for (let i = delayForm; i < 1000000; i += delayForm) {
    setTimeout(() => {
      counter += 1;
      if (counter > amountForm) {
   return
      }
      else if (counter < 2) {
        createPromise(counter, delayForm)
          .then(value => Notiflix.Notify.success(`${value}`))
          .catch(error => Notiflix.Notify.failure(`${error}`))
      }
      else {
        let delayStepForm = delayForm += stepForm;
         createPromise(counter, delayStepForm)
          .then(value => Notiflix.Notify.success(`${value}`))
          .catch(error => Notiflix.Notify.failure(`${error}`))
      }
  }
  , intervalOf(delayForm, i, stepForm))
}
}

function intervalOf(delayForm, i, stepForm) {
  if (stepForm < 1) {
    return delayForm
  }
  return i;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  })
}


// createPromise(2, 1500)
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });