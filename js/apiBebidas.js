document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector("#buscadorBebidas");
  const bebidasHTML = document.querySelector("#bebidas");

  const llamadaAPI = () => {
    const inputBebida = document.querySelector("#inputBuscador").value;
    if (inputBebida.trim() === "") {
      Swal.fire({
        title: "El campo esta vacio",
        text: "Coloca el nombre de tu bebida favorita!",
        icon: "question",
      });
      return;
    }

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputBebida}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.drinks) {
          cargarBebidas(data.drinks);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal! No se encontraron bebidas con ese nombre",
          });
        }
      })
      .catch((error) => console.log("Error encontrado: ", error));
  };

  search.addEventListener("submit", (event) => {
    event.preventDefault();
    llamadaAPI();
  });

  const cargarBebidas = (bebidas) => {
    bebidas.forEach((element) => {
      const {
        idDrink,
        strAlcoholic,
        strCategory,
        strDrink,
        strGlass,
        strIBA,
        strDrinkThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
      } = element;

      // crea una variable para almacenar el html de cada ingrediente
      let ingredientesHTML = "";
      // crea una lista con todos los ingredientes que puede contener
      const ingredientes = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
      ];
      // recorremos la lista de los ingredientes
      ingredientes.forEach((ingrediente) => {
        // elavuamos cada ingrediente, asegurandonos de que no sean "null" y contengan un valor
        if (ingrediente) {
          // si el ingrediente contiene un valor, se agrega a una etiqueta HTML y diha etiqueta se agrega y se suma junto con las otras, dentro de la variable ya creada anteriormente
          ingredientesHTML += `<li>${ingrediente}</li>`;
        }
      });

      return (bebidasHTML.innerHTML += `
      <div class="bebida">
            <div class="bebida-principal d-flex">
              <div class="bebida-img">
                <img
                  src="${strDrinkThumb}"
                  alt="${strDrink}"
                  class="img-fluid rounded"
                />
              </div>
              <div class="bebida-info">
                <h1>${strDrink}</h1>
                <h2>${strAlcoholic}</h2>
                <p>${strCategory}</p>
                <p>${idDrink}</p>
              </div>
            </div>
            <p>${strGlass}</p>
            ${strIBA ? `<h3>estilo: ${strIBA}</h3>` : ""}
            <h4>Ingredientes:</h4>
            <ul>
              ${ingredientesHTML}
            </ul>
          </div>`);
    });
  };
});

//CATALOGO



function llamarAPIindex(letra){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`)
 .then(response => response.json())
 .then(drinks => dibujarDatos(drinks));
}


function dibujarDatos(json){
  const filas = json.drinks.map(obj => Bebidas(obj));//crea un array de los objetows recibidos
  document.querySelector('.bebidasVariedad .bebidas').innerHTML=filas.join('');
  
}

function Bebidas(obj){
  return `
  <a> 
                <div  class="bebida">

                      <img class=imgBebidas  src="${obj.strDrinkThumb}" alt="${obj.strDrink}" loading="lazy">

                      <div class="tituloBebida">
                          <h4> ${obj.strDrink}</h4>
                      </div>                      
                </div>
            </a>

          `;            

}

llamarAPIindex('c');