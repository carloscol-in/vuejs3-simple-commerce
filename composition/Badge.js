app.component("badge", {
    template: /* vue-html */ `
        <span class="badge new" v-if="product.new">
            New
        </span>
        <span class="badge offer" v-if="product.offer">
            Discount
        </span>
    `,
    props: ["product"],
    setup(props) {
        const badge_state = reactive({
            product: props.product,
        });

        return {
            ...toRefs(badge_state),
        };
    }
});