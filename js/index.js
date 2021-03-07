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
    OldText.textContent = 'Todas as questões foram respondidas :)';
    OldText.style.color = 'darkgreen';
    v2=true;
    clearInterval(interval1);
  };
  console.log(v, v2);
};
document.getElementById("validate").onclick = function() {
  if (v2) {
    var Old = document.getElementById("txt2");
    Old.textContent = 'Analisando resultados';
    var interval2 = setInterval(e, 1000);
    function e() {
      co2+=1;
      console.log(co2);
      if (co2==5) {
        clearInterval(interval2);
        co2=0;
        Old.textContent = `Resultado: ${total}/14 pontos.`;
      } else {
        Old.textContent += '.';
      };
    };
  };
};