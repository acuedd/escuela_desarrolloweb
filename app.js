
let healthCondition = document.querySelector('.health');

setTimeout(() => {
  healthCondition.innerText = "Estas por ser FIT!"
}, 2000);

//llamamos los objetos
let bmi_button = document.querySelector(`#bmi`);
let sleep_button = document.querySelector(`#sleep`);
let water_button = document.querySelector(`#water`);
let steps_button = document.querySelector(`#steps`);

let bmi_body = document.querySelector(`#bmi_body`);
let sleep_body = document.querySelector(`#sleep_body  `);
let water_body = document.querySelector(`#water_body`);
let steps_body = document.querySelector(`#steps_body`);


//botones del menú
bmi_button.addEventListener("click",()=>{
  fadeIn(bmi_body);
  fadeOut(sleep_body);
  fadeOut(water_body);
  fadeOut(steps_body);
  showModalBMI("Calula tu masa corporal");
});

sleep_button.addEventListener("click",()=>{
  fadeOut(bmi_body);
  fadeIn(sleep_body);
  fadeOut(water_body);
  fadeOut(steps_body);
});

water_button.addEventListener("click",()=>{
  fadeOut(bmi_body);
  fadeOut(sleep_body);
  fadeIn(water_body);
  fadeOut(steps_body);
});

steps_button.addEventListener("click",()=>{
  fadeOut(bmi_body);
  fadeOut(sleep_body);
  fadeOut(water_body);
  fadeIn(steps_body);
});


//modales
function showModalBMI(strTitulo, strtexto) {
  
  let title = document.querySelector(`.modal-title`);
  title.innerHTML = strTitulo;

  let m1 = $(`#myModal`);
  m1.modal("show");
}

//botones para calcular
let btnBMI = document.querySelector(`#btnGuardarBMI`);
btnBMI.addEventListener("click",()=>{
  //obtenemos la altura y la formateamos a un valor entero
    let altura = parseInt(document.querySelector("#txt_altura").value);

  //obtenemos el peso y la formateamos a un valor entero
  let peso = parseInt(document.querySelector("#txt_peso").value);
  calcularBMI(altura, peso);

});

function calcularBMI(altura, peso){
  let mensaje = "";
    // value or not
    if (altura === "" || isNaN(altura)) mensaje = "Ingresa una altura correcta!";
  
    else if (peso === "" || isNaN(peso)) mensaje = "Ingresa un peso correcto!";    
    else {
  
        // Fixing upto 2 decimal places
        let bmi = (peso / ((altura * altura) 
                            / 10000)).toFixed(2);
  
        // Dividing as per the bmi conditions
        if (bmi < 18.6) mensaje =`Abajo del peso : <span>${bmi}</span>`;  
        else if (bmi >= 18.6 && bmi < 24.9)  mensaje = `Normal : <span>${bmi}</span>`;  
        else mensaje = `Sobrepeso : <span>${bmi}</span>`;
    }

    crearRegistro(altura, peso, mensaje);
    let m1 = $(`#myModal`);
    m1.modal("hide");
  }

  function crearRegistro(altura, peso, mensaje){
    let tbody_bmi = document.querySelector(`#tbody_bmi`);
    let bmi_span = document.querySelector(`#bmi_span`);

    let fecha = moment().format("DD/MM/YYYY h:mm:ss a");
    let fila = `<tr>
                  <td></td>
                  <td>${fecha}</td>
                  <td>${altura}cm</td>
                  <td>${peso} lbs</td>
                  <td>${mensaje}</td>
                </tr>`;
    
    tbody_bmi.insertAdjacentHTML('afterend',fila);
    bmi_span.innerHTML = mensaje;
    

  }

  //funciones generales 

   // ** FADE OUT FUNCTION **
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

// ** FADE IN FUNCTION **
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};