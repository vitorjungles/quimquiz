

// Exchanging year text
var date = document.getElementById("date");
date.textContent = new Date().getFullYear();

// Counting and validation variables
var total=co=co2=count=0;
var v2=v3=false;

// Function to exchange texts and colors
function exchange(variable, text, color='black', add=false) {
  variable.style.color = color;
  add ? variable.textContent += text : variable.textContent = text;
  return variable
};

// First Interval
var interval1 = setInterval(questions, 1000);

// Analysis of unanswered questions
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

  // Exchanging permission text
  if (v) {
    var OldText = document.getElementById("txt");
    OldText = exchange(OldText, 'Pronto para envio', 'darkgreen');
    v2=true;
    clearInterval(interval1);
  };
};

// Button click function
document.getElementById("validate").onclick = function() {

  // Reload page conditional
  if (v2&&v3) {
    location.reload();
  } else if (v2&&v3==false) {
    v3=true;

    // Exchanging texts and colors
    var Old = document.getElementById("txt2");
    Old = exchange(Old, 'Analisando')
    var Old2 = document.getElementById("txt3");
    var Old3 = document.getElementById("txt4");
    var Old4 = document.getElementById("validate");
    Old4.value = 'Reiniciar quiz';
    var Old5 = document.getElementById("txt");
    Old5.textContent = '';

    // Second interval
    var interval2 = setInterval(e, 1000);

    // Arrays
    var array = [2, 0, 1, 1, 1, 1, 1]; array2 = []; array3 = []; array4 = [];

    // Validation
    for (let c=0; c<array.length; c++) {

      // Verifying correct questions
      if (document.getElementsByName(`question${c+1}`).item(array[c]).checked) {
        count+=4;
        total+=2;
        array2.push(count-3);
        console.log(total, c, c+1);
        array3.push(1);
      } else {
        for (let i=0; i<4; i++) {
          count+=1;

          // Verifying wrong questions
          if (document.getElementsByName(`question${c+1}`).item(i).checked) {
            array3.push(0);
            array4.push(count-1);
          };
        };
      };
    };

    // Shows final results
    function e() {
      co2+=1;
      if (co2==5) {
        clearInterval(interval2);

        console.log(array2);
        console.log(array3);
        console.log(array4);

        // Exchanging <label> text
        for (let c=0; c<document.getElementsByTagName("label").length; c++) {
          var text = document.getElementsByTagName("label").item(c);
          if (array4.indexOf(c)!=-1) {
            text = exchange(text, ' \u274C', 'red', true);
          } else if (array2.indexOf(c)!=-1) {
            text = exchange(text, ' \u2714\uFE0F', 'darkgreen', true);
          };
        };
        for (let c=0; c<array.length; c++) {
          if (array3[c]=='0') {
            var text2 = document.getElementsByTagName("label").item(c*4+(array[c]));
            text2 = exchange(text2, ' \u2714\uFE0F', 'darkgreen', true);
          };
        };

        // Exchanging <p> text, <h1> color and <span> color
        for (let c=0; c<array3.length; c++) {
          var points = document.getElementById(`q${c+1}`);
          var title = document.getElementsByTagName("h1").item(c+1);
          var span = document.getElementsByTagName("span").item(c+1);
          array3[c]==1 ? points = exchange(points, '2/2', 'darkgreen') : points = exchange(points, '0/2', 'red');
          array3[c]==1 ? title.style.color = 'darkgreen' : title.style.color = 'red';
          title.style.color=='darkgreen' ? span.style.color = 'red' : span = span;
        };

        // Texts of the final results
        Old.textContent = `Nota: ${total}/14 pontos.`;
        Old2.textContent = `Acertos: ${array2.length}/7 questões.`;
        total>=8 ? Old.style.color = Old2.style.color = 'darkblue' : Old.style.color = Old2.style.color = 'red';
        total>=8 ? Old3.textContent = '\uD83C\uDF8A\uD83C\uDF89 Parabéns!! \uD83C\uDF89\uD83C\uDF8A' : Old3.textContent = 'Não foi desta vez... :(';
      } else {
        Old.textContent += '.';
      };
    };
  };
};