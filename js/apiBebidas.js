document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#buscadorBebidas');
  const bebidasHTML = document.querySelector('#bebidas');

  const llamadaAPI = () => {
    const inputBebida = document.querySelector('#inputBuscador').value;
    if (inputBebida.trim() === '') {
      Swal.fire({
        title: 'El campo esta vacio',
        text: 'Coloca el nombre de tu bebida favorita!',
        icon: 'question',
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
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal! No se encontraron bebidas con ese nombre',
          });
        }
      })
      .catch((error) => console.log('Error encontrado: ', error));
  };

  search.addEventListener('submit', (event) => {
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
    });
  };
});
