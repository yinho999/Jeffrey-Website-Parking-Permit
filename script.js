const rank = document.querySelector("#rank");
const residence = document.querySelector("#residence");
const travelTime = document.querySelector("#travelTime");
const carpool = document.getElementsByName("carpool");
const shift = document.getElementsByName("shift");
const sn = document.querySelector("#SN");
const ui = document.querySelector("#UI");
const staffName = document.querySelector("#staffName");
const post = document.querySelector("#Post");

function returnRadio(radio) {
  for (const element of radio) {
    if (element.checked) {
      return element.value;
    }
  }
}

const ranking = {
  I: 4,
  SS: 3,
  S: 2,
  C: 1,
};
const region = {
  HKI: 1,
  KW: 2,
  KE: 3,
  NTS: 4,
  NTN_LT: 5,
};
let userData;

document.querySelector("#submit").addEventListener("click", loadData);
function loadData(e) {
  e.preventDefault();

  //   console.log("abc");
  console.log([
    rank.value,
    residence.value,
    travelTime.value,
    returnRadio(carpool),
    returnRadio(shift),
    sn.value,
    staffName.value,
    post.value,
  ]);
  if (
    !(
      rank.value &&
      residence.value &&
      travelTime.value &&
      returnRadio(carpool) &&
      returnRadio(shift) &&
      sn.value &&
      staffName.value &&
      post.value
    )
  )
    return;
  let totalScore = 0;
  // Ranking score

  totalScore += ranking[rank.value];
  console.log(totalScore);

  // Region of Residence
  let score1 = region[residence.value];

  // travel time
  const time = +travelTime.value;
  let score2;
  if (time < 45 && time > 0) {
    score2 = 0;
  } else if (45 >= time && time < 60) {
    score2 = 1;
  } else if (60 >= time && time < 75) {
    score2 = 1;
  } else if (75 >= time && time < 90) {
    score2 = 1;
  } else if (time > 90) {
    score2 = 4;
  }
  totalScore += score1 > score2 ? score1 : score2;
  //   Carpool
  if (returnRadio(carpool) === "yes") {
    totalScore += 1;
  }
  //   Shift Duty
  if (returnRadio(shift) === "yes") {
    totalScore += 1;
  }
  userData = {
    score: totalScore,
    sn: sn.value,
    staffName: staffName.value,
    post: post.value,
  };
}

//
if (module.hot) {
  module.hot.accept();
}
