var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

var request = new XMLHttpRequest();
request.open('GET', "https://vitorjungles.github.io/json/data.json")

request.responseType = 'json';
request.send();

request.onload = function () {
  var Questions = request.response;

  var Header = document.createElement("header");
  var H1 = document.createElement("h1")
  var TitlePage = document.createElement("title");
  var Section = document.createElement("section");

  Section.id = 'questions';

  TitlePage.textContent = H1.textContent = Questions["quiz"]["title"];

  Header.append(H1);

  document.querySelector("body").firstChild.before(Header);
  document.querySelector("meta[name='viewport']").after(TitlePage);

  for (let FirstKey in Questions["quiz"]["questions"]) {
    var Div = document.createElement("div");
    var Title = document.createElement("h1");
    var Span = document.createElement("span");
    var Form = document.createElement("form");
    var P = document.createElement("p");

    Span.id = "red2";
    Span.textContent = "*";
    
    Title.textContent = Questions["quiz"]["questions"][FirstKey]["title"];
    Title.firstChild.after(Span);

    Div.append(Title);
    Div.classList = "box";

    for (let SecondKey in Questions["quiz"]["questions"][FirstKey]["alternatives"]) {
      var Label = document.createElement("label");
      var Input = document.createElement("input");
      var Br = document.createElement("br");
      
      Input.type = "radio";
      Input.name = FirstKey;
      Input.id = `q${FirstKey.substring(FirstKey.length - 1, FirstKey.length)}-${SecondKey}`;

      Label.textContent = Questions["quiz"]["questions"][FirstKey]["alternatives"][SecondKey];
      Label.htmlFor = `q${FirstKey.substring(FirstKey.length - 1, FirstKey.length)}-${SecondKey}`;

      Form.append(Input);
      Form.append(Label);
      if (Questions["quiz"]["questions"][FirstKey]["alternatives"][parseInt(SecondKey) + 1 + ''] != undefined) { 
        Form.append(Br);
      };
    };
    P.textContent = Questions["quiz"]["questions"][FirstKey]["value"] + " pontos";

    Div.append(Form);
    Div.append(P);
    
    Section.append(Div);
  };
  var Main = document.querySelector("main");
  Main.firstChild.before(Section)
};

var total = 0, co = 0, count = 0, SecondCheck = false, ThirdCheck = false;

function InputLoop(add = true) {
  for (let c = 1; c < document.querySelectorAll("form").length + 1; c++) {
    for (let i = 0; i < 4; i++) {
      add ? document.querySelectorAll(`input[name='question${c}']`).item(i).addEventListener("click", Permission) : document.querySelectorAll(`input[name='question${c}']`).item(i).removeEventListener("click", Permission);
    };
  };
};

InputLoop();

function exchange(variable, text, color = 'black') {
  variable.style.color = color;
  variable.textContent = text;
  return variable;
};

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

    var CorrectQuestions = [2, 4, 11, 13, 19, 22, 24];

    function Validation() {
      co += 1;
      if (co == 5) {
        clearInterval(Interval);

        for (let c = 0; c < document.querySelectorAll("input").length - 1; c++) {
          var title = title;
          var points = points;
          var label = document.querySelectorAll("label").item(c);
          var input = document.querySelectorAll("input").item(c);

          if (c % 4 == 0) {
            count += 1;
            title = document.querySelectorAll("h1").item(count);
            points = document.querySelector(`#q${count}`);
          };

          if (CorrectQuestions.indexOf(c) != -1) {
            if (input.checked) {
              total += 2;
              title.style.color = '#1E8E3E';
              points.textContent = '2/2';
            };
            label.style.background = '#E6F4EA';

          } else if (input.checked) {
            title.style.color = '#D93025';
            label.style.background = '#FCE8E6';
            points.textContent = '0/2';
          };
        };

        var Old2 = document.createElement("h1");
        var Old3 = document.createElement("h1");
        Old2.id = 'txt3';
        Old.textContent = `Nota: ${total}/${CorrectQuestions.length * 2} pontos.`;
        Old2.textContent = `Acertos: ${total / 2}/${CorrectQuestions.length} questões.`;
        total >= 8 ? Old.style.color = Old2.style.color = 'darkblue' : Old.style.color = Old2.style.color = '#D93025';
        total >= 8 ? Old3.textContent = 'Parabéns! Mandou bem! :)' : Old3.textContent = 'Não foi desta vez... :(';
        [Old2, Old3].forEach(function (array) { document.querySelectorAll("section").item(1).querySelectorAll("h1").item(document.querySelectorAll("section").item(1).querySelectorAll("h1").length - 1).after(array) });
      } else {
        Old.textContent += '.';
      };
    };
  };
}, { once: true });