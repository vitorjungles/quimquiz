var date = document.getElementById("date");
date.textContent = new Date().getFullYear();
var total=co=co2=0; v2=false;

var interval1 = setInterval(questions, 1000);

function questions() {
  var v=true;
  for (let c=1; c<8; c++) {
    for (let i=0; i<4; i++) {
      if (document.getElementsByName(`question${c}`).item(i).checked) {
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
    var OldText = document.getElementById("txt");
    OldText.textContent = 'Pronto para envio';
    OldText.style.color = 'darkgreen';
    v2=true;
    clearInterval(interval1);
  };
};
document.getElementById("validate").onclick = function() {
  if (v2) {
    var array = [1, 1, 1, 1, 1, 1, 1]; array2 = [];
    for (let c=0; c<array.length; c++) {
      if (document.getElementsByName(`question${c+1}`).item(array[c]).checked) {
        total+=2;
        console.log(total, c, c+1);
      } else {
        for (let i=0; i<4; i++) {
          if (document.getElementsByName(`question${c+1}`).item(i).checked) {
            array2.push([`Na questão ${c+1}, marcou item ${i} e a resposta era ${array[c]}.`]);
            console.log(array2);
          };
        };
      };
    };
    var Old = document.getElementById("txt2");
    Old.style.color = 'black';
    Old.textContent = 'Analisando';
    var Old2 = document.getElementById("txt3");
    var Old3 = document.getElementById("txt4");
    if (Old2.textContent!='') {
      Old2.textContent = '';
      Old3.textContent = '';
    };
    var interval2 = setInterval(e, 1000);
    function e() {
      co2+=1;
      if (co2==5) {
        clearInterval(interval2);
        Old.textContent = `Nota: ${total}/14 pontos.`;
        Old2.textContent = `Acertos: ${7-array2.length}/7 questões.`;
        if (total>=8) {
          Old.style.color = Old2.style.color = 'darkblue';
          Old3.textContent = '\uD83C\uDF8A\uD83C\uDF89 Parabéns!! \uD83C\uDF89\uD83C\uDF8A';
        } else {
          Old.style.color = Old2.style.color = 'red';
          Old3.textContent = 'Não foi desta vez... :(';
        };
        total=co2=0;
        array2=[];
      } else {
        Old.textContent += '.';
      };
    };
  };
};