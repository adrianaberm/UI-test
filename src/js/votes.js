/* Get parent */
const closest = (el, sel) => {
  if (el != null)
    return el.matches(sel) ? el :
      (el.querySelector(sel) ||
        closest(el.parentNode, sel));
}


/*show thank you box*/
const showThankYou = (element) => {
  let hide = closest(element, ".rt-vote__item__options");
  let show = closest(element, ".rt-vote__item__voted");

  show.style.display = "block";
  hide.style.display = "none";
}

/* show thumbs options*/

const showOptions = (element) => {
  let show = closest(element, ".rt-vote__item__options");
  let hide = closest(element, ".rt-vote__item__voted");
  let radios = closest(element, ".rt-vote__item__thumb");

  show.style.display = "block";
  hide.style.display = "none";
  radios.checked = false;
}

/* Vote Up functions*/
const voteUp = (element) => {
  let op1 = closest(element, ".rt-vote__results__thumb-up p").innerHTML;
  let posNum = parseInt(op1, 10);
  let op2 = closest(element, ".rt-vote__results__thumb-down p").innerHTML;
  let negNum = parseInt(op2, 10);

  posNum += 1;
  negNum -= 1;
  closest(element, ".rt-vote__item__voteNow").addEventListener("click", function() {
    closest(element, ".rt-vote__results__thumb-up p").innerHTML = +posNum + "<span>%</span>";
    closest(element, ".rt-vote__results__thumb-down p").innerHTML = +negNum + "<span>%</span>";
    closest(element, ".rt-vote__results__thumb-up").style.width = +posNum + "%";
    closest(element, ".rt-vote__results__thumb-down").style.width = +negNum + "%";
    showThankYou(element);
    checkLocalStorage(element);
    localStorage.setItem('up', op1 += 1);
    localStorage.setItem('down', op2 -= 1);
  });
}

/*vote down options*/
const voteDown = (element) => {
  let op1 = closest(element, ".rt-vote__results__thumb-up p").innerHTML;
  let posNum = parseInt(op1, 10);
  let op2 = closest(element, ".rt-vote__results__thumb-down p").innerHTML;
  let negNum = parseInt(op2, 10);

  negNum += 1;
  posNum -= 1;
  closest(element, ".rt-vote__item__voteNow").addEventListener("click", function() {
    closest(element, ".rt-vote__results__thumb-down p").innerHTML = +negNum + "<span>%</span>";
    closest(element, ".rt-vote__results__thumb-up p").innerHTML = +posNum + "<span>%</span>";
    closest(element, ".rt-vote__results__thumb-up").style.width = +posNum + "%";
    closest(element, ".rt-vote__results__thumb-down").style.width = +negNum + "%";
    showThankYou(element);
  });
}


/* change badge depending on votes*/
const changeBagde = (element) => {
  let op1 = closest(element, ".rt-vote__results__thumb-up p").innerHTML;
  let op2 = closest(element, ".rt-vote__results__thumb-down p").innerHTML;
  let titleBange = closest(element, ".rt-vote__item__title");

  if (op1 > op2) {
    titleBange.classList.add('thumbUp-badge');
    titleBange.classList.remove('thumbDown-badge');
  } else {
    titleBange.classList.add('thumbDown-badge');
    titleBange.classList.remove('thumbUp-badge');
  }

}

/* execute functions for each vote button*/
Array
  .from(document.querySelectorAll('.rt-vote__item__thumb'))
  .forEach(element => {
    element.addEventListener("click", function() {
      changeBagde(element);

      if (element.value == 1) {
        voteUp(element);

      } else if (element.value == 2) {
        voteDown(element);
      }
    });
  })


/* execute functions for each vote again button*/
Array
  .from(document.querySelectorAll('.rt-vote__item__voted'))
  .forEach(element => {
    element.addEventListener("click", function() {

      showOptions(element);
    });
  })