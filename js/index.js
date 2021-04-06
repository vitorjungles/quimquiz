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

  for (let c = 0; c < QuestionsArray.length; c++) {
    var Div = document.createElement("div");
    var Title = document.createElement("h1");
    var Span = document.createElement("span");
    var Form = document.createElement("form");
    var P = document.createElement("p");

    Span.id = "red2";
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

    for (let i = 0; i < AlternativesArray.length; i++) {
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

    Section.append(Div);
  };
  var Main = document.querySelector("main");

  Main.firstChild.before(Section);

  document.querySelector("body").hidden = false;

  function InputLoop(add = true) {
    for (let c = 1; c < document.querySelectorAll("form").length + 1; c++) {
      for (let i = 0; i < document.querySelectorAll("form").item(c - 1).length; i++) {
        add ? document.querySelectorAll(`input[name='question${c}']`).item(i).addEventListener("click", Permission) : document.querySelectorAll(`input[name='question${c}']`).item(i).removeEventListener("click", Permission);
      };
    };
  };

  InputLoop();

  function Permission() {
    var v = true;
    for (let c = 1; c < document.querySelectorAll("form").length + 1; c++) {
      for (let i = 0; i < 4; i++) {
        if (document.querySelectorAll(`input[name='question${c}'`).item(i).checked) {
          co += 1;
        };
        if (i == 3 && co == 0) {
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
      var OldText = document.querySelector("#txt");
      OldText = exchange(OldText, 'Pronto para envio', '#1E8E3E');
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

  var total = 0, co = 0, NumberOfForms = 0, SecondCheck = false, ThirdCheck = false;
  NumberOfInput = 0;

  function exchange(variable, text, color = 'black') {
    variable.style.color = color;
    variable.textContent = text;
    return variable;
  };

  document.querySelector("#validate").addEventListener('click', function Quiz() {
    document.querySelector('#validate').addEventListener('click', Quiz, { once: true });
    if (SecondCheck && ThirdCheck) {
      location.reload();
    } else if (SecondCheck && !ThirdCheck) {
      ThirdCheck = true;

      var Old = document.createElement("h1");
      var Old4 = document.querySelector("#validate");
      var Old5 = document.querySelector("#txt");

      Old.textContent = 'Analisando';
      document.querySelectorAll("input").item(document.querySelectorAll("input").length - 1).after(Old);
      Old4.value = 'Reiniciar quiz';
      Old5.remove();

      var Interval = setInterval(Validation, 1000);

      function Validation() {
        co += 1;
        if (co == 5) {
          clearInterval(Interval);

          var ValueOfQuiz = 0;
          var Hits = 0;

          for (let c = 0; c < document.querySelectorAll("input").length - 1; c++) {
            var title = title;
            var points = points;
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
                title.style.color = '#1E8E3E';
                points.textContent = `${CorrectQuestionsValue[0]}/${CorrectQuestionsValue[0]}`;
                Hits += 1;
              };
              label.style.background = '#E6F4EA';

            } else if (input.checked) {
              title.style.color = '#D93025';
              label.style.background = '#FCE8E6';
              points.textContent = `0/${CorrectQuestionsValue[0]}`;
            };

            if (NumberOfInput == NumberOfAllAlternatives[0]) {
              NumberOfInput = 0;
              NumberOfAllAlternatives.splice(0, 1);
              CorrectQuestionsValue.splice(0, 1);
            };
          };

          var Old2 = document.createElement("h1");
          var Old3 = document.createElement("h1");

          Old2.id = 'txt3';
          Old.textContent = `Nota: ${total}/${ValueOfQuiz} pontos.`;
          Old2.textContent = `Acertos: ${Hits}/${CorrectQuestions.length} questões.`;

          total >= Math.floor(ValueOfQuiz / 2 + ValueOfQuiz / 10) ? Old.style.color = Old2.style.color = 'darkblue' : Old.style.color = Old2.style.color = '#D93025';
          total >= Math.floor(ValueOfQuiz / 2 + ValueOfQuiz / 10) ? Old3.textContent = 'Parabéns! Mandou bem! :)' : Old3.textContent = 'Não foi desta vez... :(';

          [Old2, Old3].forEach(function (array) { document.querySelectorAll("section").item(1).querySelectorAll("h1").item(document.querySelectorAll("section").item(1).querySelectorAll("h1").length - 1).after(array) });
        } else {
          Old.textContent += '.';
        };
      };
    };
  }, { once: true });
};