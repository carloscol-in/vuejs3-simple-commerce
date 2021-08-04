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
            <badge :product="product" />
            <p class="description__status" v-if="product.stock === 3">Quedan pocas unidades!</p>
            <p class="description__status" v-else-if="product.stock === 2">Quedan muy poquitas unidades!</p>
            <p class="description__price" :style="{ color: price_color }">
                $ {{ new Intl.NumberFormat("es-MX").format(product.price) }}
            </p>
            <p class="description__content">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit aut explicabo labore, error quibusdam atque maxime soluta excepturi debitis ex nostrum id sit minima perspiciatis nulla odio? Obcaecati, magni nesciunt.
            </p>
            <div class="discount">
                <span>Discount Code:</span>
                <input type="text" placeholder="Write your CODE" @keyup.enter="applyDiscount($event)">
            </div>
            <button :disabled="product.stock === 0" @click="sendToCart()">Add to cart</button>
        </section>
    `,
    props: ["product"],
    emits: ['sendToCart'],
    setup(props, context) {
        const product_state = reactive({
            product: props.product,
            active_image: 0,
            price_color: "rgb(104, 104, 209)",
        });

        const sendToCart = () => {
            context.emit("sendToCart", props.product)
        }

        const discount_codes = ref(["OFFER1", "DSICOUNT12"]);
        function applyDiscount(event) {
            const discount_code_index = discount_codes.value.indexOf(event.target.value);
            if (discount_code_index >= 0) {
                product_state.product.price *= 50 / 100;
                discount_codes.value.splice(discount_code_index, 1);
            }
        }

        watch(
            () => product_state.active_image,
            (value, old_value) => {
                console.log(value, old_value);
        });

        watch(
            () => product_state.product.stock,
            (value) => {
                if (value <= 1) {
                    product_state.price_color = "rgb(188, 30, 67)";
                }
            }
        );

        return {
            ...toRefs(product_state),

            sendToCart,

            applyDiscount,
        };
    }
});