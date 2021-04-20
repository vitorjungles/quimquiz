var year = document.createElement("span");
var request = new XMLHttpRequest();

year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

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
    QuestionsLength++;
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
      AlternativesLength++;
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
      NumberOfInput++;
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

  var total = 0, co = 0, NumberOfForms = 0;
  var Minutes = 0, Seconds = 0, Hours = 0;
  var QuizTime = setInterval(function () {
    Seconds++;
    if (Seconds == 60) {
      Seconds = 0;
      Minutes++;
    };
    if (Minutes == 60) {
      Minutes = 0;
      Hours++;
    };
  }, 1000);
  NumberOfInput = 0;

  Array.forEach(function (array) { 
    Section.append(array);
  });

  if (Questions["quiz"]["type"] == "one-question" && !/(Phone|Android|BB10|Tablet|iPad)/.test(navigator.userAgent) && window.innerWidth >= 330) {
    for (let c = 0, length = Array.length; c < length; c++) {
      if (c != 0) {
        Array[c].hidden = true;
      };
    };
    document.querySelector("#validate").hidden = true;

    var Control = document.createElement("section");
    var BackIcon = document.createElement("span");
    var NextIcon = document.createElement("span");
    var NextDiv = document.createElement("div");
    var BackDiv = document.createElement("div");

    Control.id = 'control';

    NextIcon.classList = 'material-icons-outlined md-36 next';
    NextIcon.textContent = 'arrow_forward_ios';
    NextIcon.addEventListener('click', function Next() {
      if (Array[Index + 1] != undefined) {
        if (Array[Index + 2] == undefined) {
          document.querySelector("#validate").hidden = false;
          NextDiv.hidden = true;
        };
        Array[Index].hidden = true;
        Array[Index += 1].hidden = false;
      };
      BackDiv.hidden = Array[Index - 1] == undefined ? true : false;
    });

    BackIcon.classList = 'material-icons-outlined md-36 back';
    BackIcon.textContent = 'arrow_back_ios';
    BackDiv.hidden = true;
    BackIcon.addEventListener('click', function Back() {
      if (Array[Index - 1] != undefined) {
        if (document.querySelector("#validate").hidden == false) {
          document.querySelector("#validate").hidden = true;
          NextDiv.hidden = false;
        };
        Array[Index].hidden = true;
        Array[Index -= 1].hidden = false;
      };
      BackDiv.hidden = Array[Index - 1] == undefined ? true : false;
    });

    NextDiv.append(NextIcon);
    BackDiv.append(BackIcon);

    [BackDiv, NextDiv].forEach(function (array) { 
      Control.append(array);
    });

    document.querySelector("main").firstChild.before(Control);
  } else {
    Array.forEach(function (array) { 
      array.classList += ' width-auto';
    });
  };

  document.querySelector("main").firstChild.before(Section);
  document.querySelector("#final").hidden = document.querySelector("footer").hidden = false;

  document.querySelector("#validate").addEventListener('click', function Quiz() {
    if (Permission() && document.querySelector("#validate").value != 'Enviar') {
      location.reload();
    } else if (Permission()) {
      clearInterval(QuizTime);

      var Old = document.createElement("h1");
      var Old2 = document.querySelector("#validate");

      Old.hidden = true;
      document.querySelectorAll("input")[document.querySelectorAll("input").length - 1].after(Old);
      Old2.value = 'Reiniciar quiz';

      var Interval = setInterval(Validation, 1000);
      var BarProgress = document.createElement("progress");
      var FirstBr = document.createElement("br");
      var SecondBr = document.createElement("br");

      BarProgress.value = 0;
      BarProgress.max = 100;

      [FirstBr, SecondBr, BarProgress].forEach(function (array) {
        document.querySelector("#final").append(array);
      });

      function Validation() {
        co++;
        BarProgress.value += 20;
        if (co == 5) {
          clearInterval(Interval);

          [FirstBr, SecondBr, BarProgress].forEach(function (array) {
            array.remove();
          });

          var ValueOfQuiz = 0, Hits = 0, title, points;

          for (let c = 0, len = document.querySelectorAll("input").length - 1; c < len; c++) {
            var label = document.querySelectorAll("label")[c];
            var input = document.querySelectorAll("input")[c];

            if (NumberOfInput == 0) {
              NumberOfForms++;
              title = document.querySelectorAll("h1")[NumberOfForms];
              points = document.querySelector(`#q${NumberOfForms}`);
            };

            NumberOfInput++;

            if (CorrectQuestions.indexOf(c) != -1) {
              ValueOfQuiz += CorrectQuestionsValue[0];

              if (input.checked) {
                total += CorrectQuestionsValue[0];
                title.classList = 'green';
                points.textContent = `${CorrectQuestionsValue[0]}/${CorrectQuestionsValue[0]}`;
                Hits++;
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
          total >= Math.floor(ValueOfQuiz / 2 + ValueOfQuiz / 10) ? Feedback.textContent = 'Parabéns! Mandou bem!' : Feedback.textContent = 'Não foi desta vez...';

          Old.hidden = false;

          [HitsElement, TimeElement, Feedback].forEach(function (array) { 
            document.querySelector("#final").querySelectorAll("h1")[document.querySelector("#final").querySelectorAll("h1").length - 1].after(array);
          });
        };
      };
    };
  });

  function Permission() {
    for (let c = 1, length = document.querySelectorAll("form").length + 1; c < length; c++) {
      for (let i = 0, len = document.querySelectorAll("form")[c - 1].length; i < len; i++) {
        if (document.querySelectorAll(`input[name='question${c}'`)[i].checked) {
          co++;
          break;
        } else if (i == len - 1 && co == 0) {
          return false;
        };
      };
      co = 0;
    };

    return true;
  };

  function Random(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
  };

  function Shuffle(array, variable) {
    var RandomInt = 0;
    while (array.length < variable) {
      RandomInt = Random(0, variable);
      while (array.indexOf(RandomInt) != -1) {
        RandomInt = Random(0, variable);
      };
      array.push(RandomInt);
    };
  };
};