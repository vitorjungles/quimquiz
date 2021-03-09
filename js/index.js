var date = document.getElementById("date");
date.textContent = new Date().getFullYear();
var total=co=co2=count=0; v2=false;

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
    var Old = document.getElementById("txt2");
    Old.style.color = 'black';
    Old.textContent = 'Analisando';
    var Old2 = document.getElementById("txt3");
    var Old3 = document.getElementById("txt4");
    if (Old2.textContent!='') {
      Old2.textContent = '';
      Old3.textContent = '';
      for (let c=0; c<array5.length; c++) {
        var t = document.getElementsByTagName("label").item(array5[c]);
        t.style.color = 'black';
        t.textContent = t.textContent.substring(t.textContent.length-3, 0);
      };
      for (let c=0; c<array6.length; c++) {
        var t = document.getElementsByTagName("label").item(array6[c]);
        t.style.color = 'black';
        t.textContent = t.textContent.substring(t.textContent.length-2, 0);
      };
      array5=[];
      array6=[];
    };
    var interval2 = setInterval(e, 1000);
    var array = [1, 1, 1, 1, 1, 1, 1]; array2 = []; array3 = []; array4 = []; array5 = []; array6 = [];
    for (let c=0; c<array.length; c++) {
      var points = document.getElementById(`q${c+1}`);
      if (points.textContent!='') {
        points.textContent = '';
      };
      if (document.getElementsByName(`question${c+1}`).item(array[c]).checked) {
        count+=4;
        total+=2;
        array2.push(count-3);
        console.log(total, c, c+1);
        array3.push(1);
      } else {
        for (let i=0; i<4; i++) {
          count+=1;
          if (document.getElementsByName(`question${c+1}`).item(i).checked) {
            array3.push(0);
            array4.push(count-1);
          };
        };
      };
    };
    function e() {
      co2+=1;
      if (co2==5) {
        clearInterval(interval2);
        console.log(array2);
        console.log(array3);
        console.log(array4); 
        for (let c=0; c<document.getElementsByTagName("label").length; c++) {
          var text = document.getElementsByTagName("label").item(c);
          if (array4.indexOf(c)!=-1) {
            text.style.color = 'red';
            text.textContent += ' \u274C';
            array6.push(c);
          } else if (array2.indexOf(c)!=-1) {
            text.style.color = 'darkgreen';
            text.textContent += ' \u2714\uFE0F';
            array5.push(c);
          };
          console.log(text)
        };
        for (let c=0; c<array.length; c++) {
          if (array3[c]=='0') {
            text2 = document.getElementsByTagName("label").item(c*4+(array[c]));
            text2.style.color = 'darkgreen';
            text2.textContent += ' \u2714\uFE0F';
            array5.push(c*4+(array[c]));
            console.log(text2);
          };
        };
        for (let c=0; c<array3.length; c++) {
          var points = document.getElementById(`q${c+1}`);
          array3[c]==1 ? points.style.color = 'darkgreen' : points.style.color = 'red';
          array3[c]==1 ? points.textContent = '2/2' : points.textContent = '0/2';
        };
        Old.textContent = `Nota: ${total}/14 pontos.`;
        Old2.textContent = `Acertos: ${array2.length}/7 questões.`;
        total>=8 ? Old.style.color = Old2.style.color = 'darkblue' : Old.style.color = Old2.style.color = 'red';
        total>=8 ? Old3.textContent = '\uD83C\uDF8A\uD83C\uDF89 Parabéns!! \uD83C\uDF89\uD83C\uDF8A' : Old3.textContent = 'Não foi desta vez... :(';
        total=co2=count=0;
        array2=[];
        array3=[];
      } else {
        Old.textContent += '.';
      };
    };
  };
};