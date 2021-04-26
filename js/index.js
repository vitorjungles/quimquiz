let year = document.createElement("span");
let request = new XMLHttpRequest();

year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

request.open('GET', "./json/data.json");
request.responseType = 'json';
request.send();
request.onload = () => {
  const questions = request.response;

  let questionsLength = Object.keys(questions["quiz"]["questions"]).length;
  let questionsArray = [];
  let alternativesLength = 0;
  let alternativesArray = [];
  let numberOfInput = 0;
  let numberOfAllAlternatives = [];
  let correctQuestions = [];
  let correctQuestionsValue = [];
  let divArray = [];
  let index = 0;

  let header = document.createElement("header");
  let h1 = document.createElement("h1")
  let titlePage = document.createElement("title");
  let section = document.createElement("section");

  section.id = 'questions';

  titlePage.textContent = h1.textContent = questions["quiz"]["title"];

  header.append(h1);

  document.querySelector("main").insertAdjacentElement('afterbegin', header);
  document.querySelector("meta[name='viewport']").after(titlePage);

  shuffle(questionsArray, questionsLength);

  for (let c = 0, length = questionsArray.length; c < length; c++) {
    let div = document.createElement("div");
    let title = document.createElement("h1");
    let span = document.createElement("span");
    let form = document.createElement("form");
    let p = document.createElement("p");

    span.classList = "red";
    span.textContent = "*";

    title.textContent = c + 1 < 10 ? `0${c + 1}. ` + questions["quiz"]["questions"][`${questionsArray[c]}`]["title"] : `${c + 1}. ` + questions["quiz"]["questions"][`${questionsArray[c]}`]["title"];
    title.appendChild(span);

    div.append(title);
    div.classList = "box";

    alternativesLength = Object.keys(questions["quiz"]["questions"][`${questionsArray[c]}`]["alternatives"]).length;

    shuffle(alternativesArray, alternativesLength, true);

    numberOfAllAlternatives.push(alternativesLength);

    for (let i = 0, len = alternativesArray.length; i < len; i++) {
      let label = document.createElement("label");
      let input = document.createElement("input");

      if (alternativesArray[i] == questions["quiz"]["questions"][`${questionsArray[c]}`]["correct"]) {
        correctQuestions.push(numberOfInput);
      };

      input.type = "radio";
      input.name = `question${c + 1}`;
      input.id = `q${c + 1}-${i + 1}`;

      label.textContent = `${String.fromCharCode(97 + i)}) ` + questions["quiz"]["questions"][`${questionsArray[c]}`]["alternatives"][`${alternativesArray[i]}`];
      label.htmlFor = `q${c + 1}-${i + 1}`;

      form.append(input, label);
      if (questions["quiz"]["questions"][`${questionsArray[c]}`]["alternatives"][`${i + 1}`]) {
        let br = document.createElement("br");
        form.append(br);
      };
      numberOfInput++;
    };
    correctQuestionsValue.push(questions["quiz"]["questions"][`${questionsArray[c]}`]["value"]);
    alternativesArray = [];

    p.id = `q${c + 1}`;
    p.textContent = questions["quiz"]["questions"][`${questionsArray[c]}`]["value"] + " pontos";

    div.append(form, p);

    divArray.push(div);
  };

  let validationButton = document.querySelector("#validate");

  let total = 0, counter = 0, numberOfForms = 0;
  let minutes = 0, seconds = 0, hours = 0;
  let quizTime = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    };
    if (minutes == 60) {
      minutes = 0;
      hours++;
    };
  }, 1000);
  numberOfInput = 0;

  divArray.forEach(element => { 
    section.append(element);
  });

  if (questions["quiz"]["type"] == "one-question" && !/(Phone|Android|BB10|Tablet|iPad)/.test(navigator.userAgent) && window.innerWidth >= 330) {
    for (let c = 1, length = divArray.length; c < length; c++) {
      divArray[c].hidden = true;
    };
    validationButton.hidden = true;

    let control = document.createElement("section");
    let backIcon = document.createElement("span");
    let nextIcon = document.createElement("span");
    let nextDiv = document.createElement("div");
    let backDiv = document.createElement("div");

    control.id = 'control';

    nextIcon.classList = 'material-icons-outlined md-36 next';
    nextIcon.textContent = 'arrow_forward_ios';
    nextIcon.addEventListener('click', () => {
      if (divArray[index + 1]) {
        if (!divArray[index + 2]) {
          validationButton.hidden = false;
          nextDiv.hidden = true;
        };
        divArray[index].hidden = true;
        divArray[index += 1].hidden = false;
      };
      backDiv.hidden = !divArray[index - 1] ? true : false;
    });

    backIcon.classList = 'material-icons-outlined md-36 back';
    backIcon.textContent = 'arrow_back_ios';
    backDiv.hidden = true;
    backIcon.addEventListener('click', () => {
      if (divArray[index - 1]) {
        if (!validationButton.hidden) {
          validationButton.hidden = true;
          nextDiv.hidden = false;
        };
        divArray[index].hidden = true;
        divArray[index -= 1].hidden = false;
      };
      backDiv.hidden = !divArray[index - 1] ? true : false;
    });

    nextDiv.append(nextIcon);
    backDiv.append(backIcon);

    control.append(backDiv, nextDiv);

    document.querySelector("header").insertAdjacentElement('afterend', control);
  } else {
    divArray.forEach(element => {
      element.classList.add('width-auto');
    });
  };

  document.querySelector("header").insertAdjacentElement('afterend', section);
  document.querySelector("#final").hidden = document.querySelector("footer").hidden = false;

  validationButton.addEventListener('click', () => {
    if (permission() && validationButton.value != 'Enviar') {
      location.reload();
    } else if (permission()) {
      clearInterval(quizTime);

      validationButton.value = 'Reiniciar quiz';

      let interval = setInterval(validation, 1000);
      let barProgress = document.createElement("progress");
      let firstBr = document.createElement("br");
      let secondBr = document.createElement("br");

      barProgress.value = 0;
      barProgress.max = 100;

      document.querySelector("#final").append(firstBr, secondBr, barProgress);

      function validation() {
        counter++;
        barProgress.value += 20;
        if (counter == 5) {
          clearInterval(interval);

          [firstBr, secondBr, barProgress].forEach(element => {
            element.remove();
          });

          let valueOfQuiz = 0, hits = 0, title, points;

          for (let c = 0, len = document.querySelectorAll("input").length - 1; c < len; c++) {
            let label = document.querySelectorAll("label")[c];
            let input = document.querySelectorAll("input")[c];

            input.classList = 'cursor-default';
            input.disabled = true;

            if (numberOfInput == 0) {
              numberOfForms++;
              title = document.querySelectorAll("h1")[numberOfForms];
              points = document.querySelector(`#q${numberOfForms}`);
            };

            numberOfInput++;

            if (correctQuestions.indexOf(c) != -1) {
              valueOfQuiz += correctQuestionsValue[0];

              if (input.checked) {
                total += correctQuestionsValue[0];
                title.classList = 'green';
                points.textContent = `${correctQuestionsValue[0]}/${correctQuestionsValue[0]}`;
                hits++;
              };
              label.classList = 'green-background';

            } else if (input.checked) {
              title.classList = 'red';
              label.classList = 'red-background';
              points.textContent = `0/${correctQuestionsValue[0]}`;
            };

            if (numberOfInput == numberOfAllAlternatives[0]) {
              numberOfInput = 0;
              [numberOfAllAlternatives, correctQuestionsValue].forEach(element => {
                element.splice(0, 1)
              });
            };
          };

          let hitsElement = document.createElement("h1");
          let pointsElement = document.createElement("h1");
          let feedbackElement = document.createElement("h1");
          let timeElement = document.createElement("h1");

          if (hours < 10) {
            hours = `0${hours}`;
          };
          if (minutes < 10) {
            minutes = `0${minutes}`;
          };
          if (seconds < 10) {
            seconds = `0${seconds}`;
          };

          timeElement.id = 'time';
          timeElement.textContent = `Tempo: ${hours}:${minutes}:${seconds}`;
          hitsElement.textContent = `Acertos: ${hits}/${correctQuestions.length} questões`;
          pointsElement.textContent = `Nota: ${total}/${valueOfQuiz} pontos`;

          total >= Math.floor(valueOfQuiz / 2 + valueOfQuiz / 10) ? (
            pointsElement.classList = hitsElement.classList = 'darkblue',
            feedbackElement.textContent = 'Parabéns! Mandou bem!'
          ) : (
            pointsElement.classList = hitsElement.classList = 'red', 
            feedbackElement.textContent = 'Não foi desta vez...'
          );

          document.querySelector("#final").append(pointsElement, hitsElement, timeElement, feedbackElement);
        };
      };
    };
  });

  function permission() {
    for (let c = 1, length = document.querySelectorAll("form").length + 1; c < length; c++) {
      for (let i = 0, len = document.querySelectorAll("form")[c - 1].length; i < len; i++) {
        if (document.querySelectorAll(`input[name='question${c}'`)[i].checked) {
          counter++;
          break;
        } else if (i == len - 1 && counter == 0) {
          return false;
        };
      };
      counter = 0;
    };
    return true;
  };

  function random(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
  };

  function shuffle(array, variable) {
    let randomInt = 0;
    while (array.length < variable) {
      randomInt = random(0, variable);
      while (array.indexOf(randomInt) != -1) {
        randomInt = random(0, variable);
      };
      array.push(randomInt);
    };
  };
};