app.component("product", {
    template: /* vue-html */ `
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
    props: ["product"],
    data() {
        return {
            active_image: 0,
            discountCodes: ["PLATZI20", "IOSAMUEL"]
        };
    },
    methods: {
        applyDiscount(event) {
            const discount_code_index = this.discount_codes.indexOf(event.target.value);
            if (discount_code_index >= 0) {
                this.product.price *= 50 / 100;
                this.discount_codes.splice(discount_code_index, 1);
            }
        },
        addToCart() {
            const prod_index = this.cart.findIndex(prod => prod.name === this.product.name);
            if(prod_index >= 0){
                this.cart[prod_index].quantity += 1;
            } else {
                this.cart.push(this.product);
            }
            this.product.stock -= 1;
        }
    }
});