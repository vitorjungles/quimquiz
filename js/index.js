var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

var request = new XMLHttpRequest();
request.open('GET', "./json/data.json");

request.responseType = 'json';
request.send();

request.onload = () => {
  const Questions = request.response;
  var QuestionsLength = 0;
  var QuestionsArray = [];
  var AlternativesLength = 0;
  var AlternativesArray = [];
  var NumberOfInput = 0;
  var NumberOfAllAlternatives = [];
  var CorrectQuestions = [];
  var CorrectQuestionsValue = [];
  var Array = [];
  var Index = 0;

  var Header = document.createElement("header");
  var H1 = document.createElement("h1")
  var TitlePage = document.createElement("title");
  var Section = document.createElement("section");

  Section.id = 'questions';

  TitlePage.textContent = H1.textContent = Questions["quiz"]["title"];

  Header.append(H1);

  document.querySelector("body").firstChild.before(Header);
  document.querySelector("meta[name='viewport']").after(TitlePage);

  for (let Key in Questions["quiz"]["questions"]) {
    QuestionsLength += 1;
  };

  Shuffle(QuestionsArray, QuestionsLength);

  for (let c = 0, length = QuestionsArray.length; c < length; c++) {
    var Div = document.createElement("div");
    var Title = document.createElement("h1");
    var Span = document.createElement("span");
    var Form = document.createElement("form");
    var P = document.createElement("p");

    Span.classList = "red";
    Span.textContent = "*";

    Title.textContent = c + 1 < 10 ? `0${c + 1}. ` + Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["title"] : `${c + 1}. ` + Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["title"];
    Title.firstChild.after(Span);

    Div.append(Title);
    Div.classList = "box";

    for (let Key in Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["alternatives"]) {
      AlternativesLength += 1;
    };

    Shuffle(AlternativesArray, AlternativesLength, true);

    NumberOfAllAlternatives.push(AlternativesLength);

    for (let i = 0, len = AlternativesArray.length; i < len; i++) {
      var Label = document.createElement("label");
      var Input = document.createElement("input");
      var Br = document.createElement("br");

      if (AlternativesArray[i] == Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["correct"]) {
        CorrectQuestions.push(NumberOfInput);
      };

      Input.type = "radio";
      Input.name = `question${c + 1}`;
      Input.id = `q${c + 1}-${i + 1}`;

      Label.textContent = `${String.fromCharCode(97 + i)}) ` + Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["alternatives"][`${AlternativesArray[i]}`];
      Label.htmlFor = `q${c + 1}-${i + 1}`;

      Form.append(Input);
      Form.append(Label);
      if (Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["alternatives"][`${i + 1}`] != undefined) { 
        Form.append(Br);
      };
      NumberOfInput += 1;
    };
    CorrectQuestionsValue.push(Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["value"]);
    AlternativesArray = [];
    AlternativesLength = 0;

    P.id = `q${c + 1}`;
    P.textContent = Questions["quiz"]["questions"][`${QuestionsArray[c]}`]["value"] + " pontos";

    Div.append(Form);
    Div.append(P);

    Array.push(Div);
  };

  var total = 0, co = 0, NumberOfForms = 0, SecondCheck = false, ThirdCheck = false;
  var Minutes = 0, Seconds = 0, Hours = 0;
  var QuizTime = setInterval(function () {
    Seconds += 1;
    if (Seconds == 60) {
      Seconds = 0;
      Minutes += 1;
    };
    if (Minutes == 60) {
      Minutes = 0;
      Hours += 1;
    };
  }, 1000);
  NumberOfInput = 0;

  Array.forEach(function (array) { Section.append(array) });

  InputLoop();

  if (Questions["quiz"]["type"] == "one-question") {
    for (let c = 0, length = Array.length; c < length; c++) {
      if (c != 0) {
        Array[c].hidden = true;
      };
    };
    document.querySelector("#validate").hidden = true;

    var Control = document.createElement("section");
    var BackIcon = document.createElement("span");
    var NextIcon = document.createElement("span");

    Control.id = 'control';

    NextIcon.classList = 'material-icons-outlined md-36 next';
    NextIcon.textContent = 'arrow_forward_ios';
    NextIcon.addEventListener('click', function Next() {
      if (Array[Index + 1] != undefined) {
        if (Array[Index + 2] == undefined) {
          document.querySelector("#validate").hidden = false;
        };
        Array[Index].hidden = true;
        Array[Index += 1].hidden = false;
      };
    });

    BackIcon.classList = 'material-icons-outlined md-36 back';
    BackIcon.textContent = 'arrow_back_ios';
    BackIcon.addEventListener('click', function Back() {
      if (Array[Index - 1] != undefined) {
        if (document.querySelector("#validate").hidden == false) {
          document.querySelector("#validate").hidden = true;
        };
        Array[Index].hidden = true;
        Array[Index -= 1].hidden = false;
      };
    });

    [BackIcon, NextIcon].forEach(function (array) { Control.append(array) });
    document.querySelector("main").firstChild.before(Control);
  };

  document.querySelector("main").firstChild.before(Section);
  document.querySelector("body").hidden = false;

  document.querySelector("#validate").addEventListener('click', function Quiz() {
    if (SecondCheck && ThirdCheck) {
      location.reload();
    } else if (SecondCheck && !ThirdCheck) {
      clearInterval(QuizTime);

      ThirdCheck = true;

      var Old = document.createElement("h1");
      var Old2 = document.querySelector("#validate");

      Old.textContent = 'Analisando';
      document.querySelectorAll("input").item(document.querySelectorAll("input").length - 1).after(Old);
      Old2.value = 'Reiniciar quiz';

      var Interval = setInterval(Validation, 1000);

      function Validation() {
        co += 1;
        if (co == 5) {
          clearInterval(Interval);

          var ValueOfQuiz = 0, Hits = 0, title, points;

          for (let c = 0, len = document.querySelectorAll("input").length - 1; c < len; c++) {
            var label = document.querySelectorAll("label").item(c);
            var input = document.querySelectorAll("input").item(c);

            if (NumberOfInput == 0) {
              NumberOfForms += 1;
              title = document.querySelectorAll("h1").item(NumberOfForms);
              points = document.querySelector(`#q${NumberOfForms}`);
            };

            NumberOfInput += 1;

            if (CorrectQuestions.indexOf(c) != -1) {
              ValueOfQuiz += CorrectQuestionsValue[0];

              if (input.checked) {
                total += CorrectQuestionsValue[0];
                title.classList = 'green';
                points.textContent = `${CorrectQuestionsValue[0]}/${CorrectQuestionsValue[0]}`;
                Hits += 1;
              };
              label.classList = 'green-background';

            } else if (input.checked) {
              title.classList = 'red';
              label.classList = 'red-background';
              points.textContent = `0/${CorrectQuestionsValue[0]}`;
            };

            if (NumberOfInput == NumberOfAllAlternatives[0]) {
              NumberOfInput = 0;
              NumberOfAllAlternatives.splice(0, 1);
              CorrectQuestionsValue.splice(0, 1);
            };
          };

          var HitsElement = document.createElement("h1");
          var Feedback = document.createElement("h1");
          var TimeElement = document.createElement("h1");

          if (Hours < 10) {
            Hours = `0${Hours}`;
          };
          if (Minutes < 10) {
            Minutes = `0${Minutes}`;
          };
          if (Seconds < 10) {
            Seconds = `0${Seconds}`;
          };

          TimeElement.id = 'time';
          TimeElement.textContent = `Tempo: ${Hours}:${Minutes}:${Seconds}`;
          HitsElement.id = 'txt3';
          HitsElement.textContent = `Acertos: ${Hits}/${CorrectQuestions.length} questões`;
          Old.textContent = `Nota: ${total}/${ValueOfQuiz} pontos`;

          total >= Math.floor(ValueOfQuiz / 2 + ValueOfQuiz / 10) ? Old.classList = HitsElement.classList = 'darkblue' : Old.classList = HitsElement.classList = 'red';
          total >= Math.floor(ValueOfQuiz / 2 + ValueOfQuiz / 10) ? Feedback.textContent = 'Parabéns! Mandou bem! :)' : Feedback.textContent = 'Não foi desta vez... :(';

          [HitsElement, TimeElement, Feedback].forEach(function (array) { document.querySelector("#final").querySelectorAll("h1").item(document.querySelector("#final").querySelectorAll("h1").length - 1).after(array) });
        } else {
          Old.textContent += '.';
        };
      };
    };
  });

  function InputLoop(add = true) {
    for (let c = 1, length = Section.querySelectorAll("form").length + 1; c < length; c++) {
      for (let i = 0, len = Section.querySelectorAll("form").item(c - 1).length; i < len; i++) {
        add ? Section.querySelectorAll(`input[name='question${c}']`).item(i).addEventListener("click", Permission) : Section.querySelectorAll(`input[name='question${c}']`).item(i).removeEventListener("click", Permission);
      };
    };
  };

  function Permission() {
    var v = true;
    for (let c = 1, length = document.querySelectorAll("form").length + 1; c < length; c++) {
      for (let i = 0, len = document.querySelectorAll("form").item(c - 1).length; i < len; i++) {
        if (document.querySelectorAll(`input[name='question${c}'`).item(i).checked) {
          co += 1;
        };
        if (i == len - 1 && co == 0) {
          v = false;
          break;
        };
      };
      co = 0;
      if (v == false) {
        break;
      };
    };

    if (v) {
      SecondCheck = true;
      InputLoop(false);
    };
  };

  function Random(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
  };

  function Shuffle(array, variable) {
    while (array.length < variable) {
      var RandomInt = Random(0, variable);
      while (array.indexOf(RandomInt) != -1) {
        RandomInt = Random(0, variable);
      };
      array.push(RandomInt);
    };
  };
};