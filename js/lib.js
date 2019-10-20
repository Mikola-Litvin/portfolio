//expantion panel
function accTumbler(accID) {

  var accpanel = document.getElementById(accID);
  
  if (accpanel.className == 'acc-show') {

    accpanel.className = 'acc-hide';
  }
  else {

    accpanel.className = 'acc-show';
  }
}

//slider
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {

  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {

  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {

    this.classList.remove('active', direction);
  });
}

function showItem(direction) {

  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function() {

    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function previousItem(n) {

  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {

  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.slider__button-left').addEventListener('click', function() {

  if (isEnabled) {

    previousItem(currentItem);
  }
});


document.querySelector('.slider__button-right').addEventListener('click', function() {

  if (isEnabled) {

    nextItem(currentItem);
  }
});

//swiper
function swipeDetect(el) {

  let swiper = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  swiper.addEventListener('mousedown', function(e) {

    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  swiper.addEventListener('mouseup', function(e) {

    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {

      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {

        if (distX > 0) {

          if (isEnabled) {

            previousItem(currentItem);
          }
        }
        else {

          if (isEnabled) {

            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  });

  swiper.addEventListener('touchstart', function(e) {

    if (e.target.classList.contains('slider__button-left') || e.target.classList.contains('slider__button-right')) {

      if (e.target.classList.contains('slider__button-left')) {

        if (isEnabled) {

          previousItem(currentItem);
        }
      }
      else if (e.target.classList.contains('slider__button-right')) {

        if (isEnabled) {

          nextItem(currentItem);
        }
      }
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  swiper.addEventListener('touchmove', function(e) {

    e.preventDefault();
  });

  swiper.addEventListener('touchend', function(e) {

    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime > 100 && elapsedTime <= allowedTime) {

      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {

        if (distX > 0) {

          if (isEnabled) {

            previousItem(currentItem);
          }
        }
        else {

          if (isEnabled) {

            nextItem(currentItem);
          }
        }
      }
    }
    else if (elapsedTime < 100) {

      if (e.target.src) {

        let src = e.target.parentElement;
    
        createLayer(src);
      }
    }

    e.preventDefault();
  });
}

let el = document.querySelector('.slider');

swipeDetect(el);

//show projects
function toggleView(obj) {

  let showProject = document.querySelector('.show-project');
  let iframe = document.querySelector('iframe');

  if (obj.textContent == "Mobile") {

    iframe.classList.add('mobile');
    showProject.style.backgroundColor = '#A4AD93';
    obj.textContent = "Desktop";
    obj.style.backgroundColor = '#131313';
  }
  else if (obj.textContent == "Desktop") {

    iframe.classList.remove('mobile');
    showProject.style.backgroundColor = '#FFFFFF';
    obj.textContent = "Mobile";
    obj.style.backgroundColor = '#A4AD93';
  }
}

function createLayer(src) {
  
  window.scrollTo(0, 0);
  document.querySelector('html').style.overflow = 'hidden';

  let body = document.querySelector('body');
  let showProject = document.createElement('div');
  let iframe = document.createElement('iframe');
  let backButton = document.createElement('div');
  let toggleButton = document.createElement('div');

  showProject.classList.add('show-project');
  toggleButton.classList.add('toggle-button');
  backButton.classList.add('back-button');
  iframe.src = src;
  iframe.width = '100%';
  iframe.frameborder = '0';
  backButton.textContent = 'Back';
  toggleButton.textContent = 'Mobile';

  backButton.onclick = function() {

    let body = document.querySelector('body');
    let showProject = document.querySelector('.show-project');
  
    body.removeChild(showProject);
  };

  toggleButton.onclick = function() {

    let obj = this;
    toggleView(obj);
  };

  showProject.appendChild(iframe);
  showProject.appendChild(toggleButton);
  showProject.appendChild(backButton);
  body.appendChild(showProject);
}

let sliderContainer = document.querySelector('.slider__container');

sliderContainer.addEventListener('click', function(e) {
  
  if (e.target.src) {
    
    let src = e.target.parentElement;
    
    createLayer(src);
  }
  
  e.preventDefault();
});