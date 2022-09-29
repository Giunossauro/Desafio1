//const jQuery = require("jquery");
const time = document.getElementById("time");
const display = document.getElementById("display");
const intervals = [];
/* const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds"); */

time.focus();

$.mask.definitions['H'] = "[0-2]";
$.mask.definitions['h'] = "[0-9]";
$.mask.definitions['M'] = "[0-5]";
$.mask.definitions['m'] = "[0-9]";
$.mask.definitions['S'] = "[0-5]";
$.mask.definitions['s'] = "[0-9]";
$.mask.autoclear = false;

$("#time").mask("Hh:Mm:Ss")
  .focusout((e) => {
    e.target.value = e.target.value.replace(/_/g, '0');
  })
  .bind("keypress", (e) => {
    const length = e.target.value.replace(/\D/g, '').length;
    const realLength = length < 3 ? length : length < 5 ? length + 1 : length + 2;

    $.mask.definitions['h'] = e.target.value[0] === '2' ? "[0-3]" : "[0-9]";
    setCaretPosition("time", realLength);
  });

const toogle = () => {
  if (interval[1]) {
    clearInterval(interval.pop());
  } else {
    interval.push(setInterval(() => {
      const timeWithoutColon = time.value.replace(/\D/g, '');
      const hours = Number(timeWithoutColon.slice(0, 2));
      const minutes = Number(timeWithoutColon.slice(2, 4));
      const seconds = Number(timeWithoutColon.slice(4, 6));
      const totalInMilliseconds = ((((hours * 60) + minutes) * 60) + seconds) * 1000;
      const milliseconds = totalInMilliseconds % 1000;
      const element = jQuery(time).unmask();

      display.innerText = `
          ${String(hours).length > 1 ? hours : '0'.concat(hours)
        }:${String(minutes).length > 1 ? minutes : '0'.concat(minutes)
        }:${String(seconds).length > 1 ? seconds : '0'.concat(seconds)
        }.${String(milliseconds).length === 3 ? milliseconds :
          String(milliseconds).length === 2 ? '0'.concat(milliseconds) :
            '00'.concat(milliseconds)
        }`;
    }, 1));
  }
};

intervals.push(setInterval(() => {
  $("#time").mask("Hh:Mm:Ss");
  display.innerText = time.value ? ''.concat(time.value.replace(/_/g, "0"), ".000") : "00:00:00.000";
}, 17));

const setCaretPosition = (elemId, caretPos) => {
  var elem = document.getElementById(elemId);

  if (elem != null) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    }
    else {
      if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      }
      else
        elem.focus();
    }
  }
};

/* hours.addEventListener("input", () => {
  const value = hours.value;
  if (value.length > 1 || (value.length < 2 && Number(value)) > 2) {
    minutes.focus();
  } */
  //hoursWithoutComma = hours.value.replace(":","").replace(":","");
  //hours.value = "000000".slice(hours.value.length).concat("00:00:00");
/* inputValue = time.value
            .replace("R$", "")
        .replace(" ", "")
    .replace(",", "")
.replaceAll(".", "");

typedCharIndex = inputValue.length - 1;
typedChar = inputValue[typedCharIndex];

if (!isNaN(parseInt(typedChar, 10))) {
  colocarPontoFlutuante();
  inputValue = formatarNumero(inputValue);

  inputValue = inputValue.replace("R$", "");
  inputValue = inputValue.replace(" ", "");
  time.value = inputValue.replace(String.fromCharCode(160), "");
}
else {
  inputValue = "".concat(inputValue.slice(0, typedCharIndex--));
  colocarPontoFlutuante();
  inputValue = formatarNumero(inputValue);

  inputValue = inputValue.replace("R$", "");
  inputValue = inputValue.replace(" ", "");
  time.value = inputValue.replace(String.fromCharCode(160), "");
} *//* 
});

const colocarPontoFlutuante = () => {
if (typedCharIndex == 0) {
  inputValue = "0.0".concat(inputValue);
}
else if (typedCharIndex == 1) {
  inputValue = "0.".concat(inputValue);
}
else {
  inputValue = "".concat(
    inputValue.slice(0, --typedCharIndex),
    ".",
    inputValue.slice(typedCharIndex)
  );
}

if (!isNaN(+inputValue)) {
  inputValue = +inputValue;
  valor = inputValue;
}
};

const formatarNumero = (input) => {
return input.toLocaleString(
  'pt-br', {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: "BRL",
  useGrouping: true
}
);
}; */
