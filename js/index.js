var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

var total=co=co2=count=0, v2=v3=false;

function exchange(variable, text, color='black') {
  variable.style.color=color;
  variable.textContent=text;
  return variable;
};

var FirstInterval = setInterval(Permission, 1000);

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
    v2=true;
    clearInterval(FirstInterval);
  };
};

document.querySelector("#validate").addEventListener('click', function() {
  if (v2&&v3) {
    location.reload();
  } else if (v2&&v3==false) {
    v3=true;

    var Old = document.createElement("h1"), Old4 = document.querySelector("#validate"), Old5 = document.querySelector("#txt");
    Old.textContent = 'Analisando';
    document.querySelectorAll("input").item(document.querySelectorAll("input").length-1).after(Old);
    Old4.value = 'Reiniciar quiz';
    Old5.remove();

    var SecondInterval = setInterval(Validation, 1000);

    var CorrectQuestions = [2, 4, 11, 13, 19, 22, 24];

    function Validation() {
      co2+=1;
      if (co2==5) {
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
        Old2.id = "txt3";
        Old.textContent = `Nota: ${total}/14 pontos.`;
        Old2.textContent = `Acertos: ${total/2}/7 questões.`;
        total>=8 ? Old.style.color = Old2.style.color = 'darkblue' : Old.style.color = Old2.style.color = '#D93025';
        total>=8 ? Old3.textContent = 'Parabéns! Mandou bem! :)' : Old3.textContent = 'Não foi desta vez... :(';
        document.querySelectorAll("section").item(1).querySelectorAll("h1").item(document.querySelectorAll("section").item(1).querySelectorAll("h1").length-1).after(Old2);
        document.querySelectorAll("section").item(1).querySelectorAll("h1").item(document.querySelectorAll("section").item(1).querySelectorAll("h1").length-1).after(Old3);
      } else {
        Old.textContent += '.';
      };
    };
  };
});