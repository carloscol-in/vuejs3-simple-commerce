app.component("product", {
    template: `
        <section class="product">
            <div class="product__thumbnails">
                <div
                    v-for="(image, index) in product.images"
                    :key="image.thumbnail"
                    class="thumb"
                    :class="{ active: active_image === index }"
                    :style="{ backgroundImage: 'url(' + product.images[index].thumbnail + ')' }"
                    @click="active_image = index"
                ></div>
            </div>
            <div class="product__image">
                <img :src="product.images[active_image].image" :alt="product.name">
            </div>
        </section>
        <section class="description">
            <h4>{{ product.name.toUpperCase() }}</h4>
            <span class="badge new" v-if="product.new">
                New
            </span>
            <span class="badge offer" v-if="product.offer">
                Discount
            </span>
            <p class="description__status" v-if="product.stock === 3">Quedan pocas unidades!</p>
            <p class="description__status" v-else-if="product.stock === 2">Quedan muy poquitas unidades!</p>
            <p class="description__price">$ {{ new Intl.NumberFormat("es-MX").format(product.price) }}</p>
            <p class="description__content">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit aut explicabo labore, error quibusdam atque maxime soluta excepturi debitis ex nostrum id sit minima perspiciatis nulla odio? Obcaecati, magni nesciunt.
            </p>
            <div class="discount">
                <span>Discount Code:</span>
                <input type="text" placeholder="Write your CODE" @keyup.enter="applyDiscount($event)">
            </div>
            <button :disabled="product.stock === 0" @click="addToCart()">Add to cart</button>
        </section>
    `,
    props: [
        "product",
    ],
    setup(props) {
        const product_state = reactive({
            product: props.product,
            active_image: 0,
        });

        function addToCart() {
            const prod_index = cart_state.cart.findIndex(prod => prod.name === product_state.product.name);
            if(prod_index >= 0){
                cart_state.cart[prod_index].quantity += 1;
            } else {
                cart_state.cart.push(product_state.product);
            }
            product_state.product.stock -= 1;
        }

        const discount_codes = ref(["OFFER1", "DSICOUNT12"]);
        function applyDiscount(event) {
            const discount_code_index = discount_codes.value.indexOf(event.target.value);
            if (discount_code_index >= 0) {
                product_state.product.price *= 50 / 100;
                discount_codes.value.splice(discount_code_index, 1);
            }
        }

        return {
            ...toRefs(product_state),

            addToCart,

            applyDiscount,
        };
    }
});