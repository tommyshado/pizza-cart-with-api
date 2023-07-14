document.addEventListener("alphine:init", () => {
    Alphine.data("pizzaCart", () => {
        return {
            title: 'Pizza Cart API',
            pizzas: [],

            init() {
                axios
                    .get('https://pizza-api.projectcodex.net/api/pizzas')
                    .then(result => {
                        this.pizzas = result.data.pizzas;
                    })
            }
        }
    });
});