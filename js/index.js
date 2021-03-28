var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

var total = 0, co = 0, count = 0, SecondCheck = false, ThirdCheck = false;

var FirstInterval = setInterval(Permission, 1000);

function exchange(variable, text, color='black') {
  variable.style.color=color;
  variable.textContent=text;
  return variable;
};

function Permission() {
  var v=true;
  for (let c=1; c<8; c++) {
    for (let i=0; i<4; i++) {
      if (document.querySelectorAll(`input[name='question${c}'`).item(i).checked) {
        co+=1;
      };
      if (i==3&&co==0) {
        v=false;
        break;
      };
    };
    co=0;
    if (v==false) {
      break;
    };
  };

  if (v) {
    var OldText = document.querySelector("#txt");
    OldText = exchange(OldText, 'Pronto para envio', '#1E8E3E');
    SecondCheck=true;
    clearInterval(FirstInterval);
  };
};

document.querySelector("#validate").addEventListener('click', function Quiz() {
  document.querySelector('#validate').addEventListener('click', Quiz, { once: true });
  if (SecondCheck&&ThirdCheck) {
    location.reload();
  } else if (SecondCheck&&ThirdCheck==false) {
    ThirdCheck=true;

    var Old = document.createElement("h1"), Old4 = document.querySelector("#validate"), Old5 = document.querySelector("#txt");
    Old.textContent = 'Analisando';
    document.querySelectorAll("input").item(document.querySelectorAll("input").length-1).after(Old);
    Old4.value = 'Reiniciar quiz';
    Old5.remove();

    var SecondInterval = setInterval(Validation, 1000);

    var CorrectQuestions = [2, 4, 11, 13, 19, 22, 24];

    function Validation() {
      co+=1;
      if (co==5) {
        clearInterval(SecondInterval);

        for (let c=0; c<document.querySelectorAll("input").length-1; c++) {
          var title=title, points=points, label = document.querySelectorAll("label").item(c), input = document.querySelectorAll("input").item(c);

          if (c%4==0) {
            count+=1;
            title = document.querySelectorAll("h1").item(count);
            points = document.querySelector(`#q${count}`);
          };

          if (CorrectQuestions.indexOf(c)!=-1) {
            if (input.checked) {
              total+=2;
              title.style.color='#1E8E3E';
              points.textContent='2/2';
            };
            label.style.background='#E6F4EA';

          } else if (input.checked) {
            title.style.color='#D93025';
            label.style.background = '#FCE8E6';
            points.textContent='0/2';
          };
        };

        var Old2 = document.createElement("h1"), Old3 = document.createElement("h1");
        Old2.id = 'txt3';
        Old.textContent = `Nota: ${total}/${CorrectQuestions.length*2} pontos.`;
        Old2.textContent = `Acertos: ${total/2}/${CorrectQuestions.length} questões.`;
        total>=8 ? Old.style.color = Old2.style.color = 'darkblue' : Old.style.color = Old2.style.color = '#D93025';
        total>=8 ? Old3.textContent = 'Parabéns! Mandou bem! :)' : Old3.textContent = 'Não foi desta vez... :(';
        [Old2, Old3].forEach(function(array) { document.querySelectorAll("section").item(1).querySelectorAll("h1").item(document.querySelectorAll("section").item(1).querySelectorAll("h1").length-1).after(array) });
      } else {
        Old.textContent += '.';
      };
    };
  };
}, { once: true });