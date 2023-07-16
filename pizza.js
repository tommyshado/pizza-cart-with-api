document.addEventListener("alpine:init", () => {
    Alpine.data("pizzaCart", () => {
        return {
            title: 'Pizza Cart API',

            // here we are sending all the data
            pizzas: [],

            username: "tommyshado",
            cartId: "BkL4xDXzJB",

            cartPizzas: [],
            cartTotal: 0.00,


            // this getCart() method returns the get cart url which is the pizza data
            getCart() {
                const getCartUrl = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/GET`;

                return axios.get(getCartUrl);
            },

            showCartData() {
                // here we are referencing the getCart() results by using a promise .then to loop over the data
                // we will get from axios .get()
                this.getCart().then(result => {

                    // .then() promise allows us to access the data by using result.data where result is just an 
                    // object and when we use .data it will retrieve all the data as an object and...
                    const cartData = result.data;

                    // pizzas is a key that maps an array that contains objects of pizzas

                    // here we setting the cartPizzas reference with the pizzas array and...
                    this.cartPizzas = cartData.pizzas;

                    // here we are setting the cartTotal reference with the total which is just key in the cartData object
                    this.cartTotal = (cartData.total).toFixed(2);
                })
            },

            // init method
            init() {
                axios
                // .get() gets the data from the https url then...
                    .get('https://pizza-api.projectcodex.net/api/pizzas')
                    
                    // set the data into the pizzas array
                    .then(result => {
                        this.pizzas = result.data.pizzas;
                    })

                this.showCartData();
            },
        }
    });
});