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

            cartDisplay: false,

            // this getCart() method returns the get cart url which is the pizza data
            getCart() {
                const getCartUrl = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/GET`;

                return axios.get(getCartUrl);
            },

            addPizza(pizzaId) {

                // here we sending a pizza id to the api
                // make use of the api endpoint for adding to add a pizza to the screen
                return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/add", {
                    "cart_code": this.cartId,
                    "pizza_id": pizzaId,
                })
            },

            removePizza(pizzaId) {
                // make use of the api endpoint to remove data from the screen
                return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/remove", {
                    "cart_code": this.cartId,
                    "pizza_id": pizzaId,
                })
            },
            
            // this fetch the added data
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

            addPizzaToCart(pizzaId) {
                this
                    // pass in the pizza id as an argument then...
                    .addPizza(pizzaId)
                    // call showCartData() method to show added data
                    .then(() => {
                        // showing the pizza cart
                        this.cartDisplay = true;

                        // showing the pizza cart data
                        this.showCartData();
                    })
            },

            removeCart() {
                // Check the length of the cartPizza array if it is greater than 0 then... set a cart display to false
                if (this.cartPizzas.length === 0) this.cartDisplay = false;
            },
                   
            removePizzaFromCart(pizzaId) {
                this
                    .removePizza(pizzaId)
                    .then(() => {
                        // call show data to refresh the page and get the updatad data
                        this.showCartData();

                        this.removeCart();
                    })
            },
        }
    });
});