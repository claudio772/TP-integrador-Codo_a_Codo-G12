document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#buscadorBebidas');
  const bebidasHTML = document.querySelector('#bebidas');

  const llamadaAPI = () => {
    const inputBebida = document.querySelector('#inputBuscador').value;
    if (inputBebida.trim() === '') {
      alert('EL CAMPO ESTA VACIO'); /* CAMBIAR POR OTRA COSA */
      return;
    }

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputBebida}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.drinks) {
          console.log(data.drinks); /* BORRAR DESPUES */
          cargarBebidas(data.drinks);
        } else {
          alert('puto');
        }
      })
      .catch((error) => console.log('Error encontrado: ', error));
  };

  search.addEventListener('submit', (event) => {
    event.preventDefault();
    llamadaAPI();
  });

  const cargarBebidas = (bebidas) => {
    console.log('entra a funcion'); /* BORRAR DESPUES */
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
      } = element;
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
            <h3>estilo: ${strIBA}</h3>
            <h4>Ingredientes:</h4>
            <ul>
              <li>${strIngredient1}</li>
              <li>${strIngredient2}</li>
              <li>${strIngredient3}</li>
              <li>${strIngredient4}</li>
            </ul>
          </div>`);
      /*       <div class="bebida col-md-3">
              <h1>${strDrink}</h1>
              <h2>${strAlcoholic}</h2>
              <p>${strCategory}</p>
              <p>${strGlass}</p>
              <img src="${strDrinkThumb}" alt="${strDrink}" class="img-fluid rounded"/>
              <p>${idDrink}</p>
              <h3>Estilo: ${strIBA}</h3>
              <h4>Ingredientes:</h4>
              <ul>
                <li>${strIngredient1}</li>
                <li>${strIngredient2}</li>
                <li>${strIngredient3}</li>
                <li>${strIngredient4}</li> 
              </ul>
            </div>
            
            <div class="bebida">
            <div class="bebida-img d-flex">
              <img
                src="${strDrinkThumb}"
                alt="${strDrink}"
                class="img-fluid rounded"
              />
              <div class="bebida-principal flex-direction-column">
                <h1>${strDrink}</h1>
                <h2>${strAlcoholic}</h2>
                <p>${strCategory}</p>
                <p>${idDrink}</p>
              </div>
            </div>
            <p>${strGlass}</p>
            <h3>estilo: ${strIBA}</h3>
            <h4>Ingredientes:</h4>
            <ul>
              <li>${strIngredient1}</li>
              <li>${strIngredient2}</li>
              <li>${strIngredient3}</li>
              <li>${strIngredient4}</li>
            </ul>
        </div>
            
            
            
            */
    });
  };
});
