app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template:
        /*html*/
        `<div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img v-bind:src="image" :class="{ 'out-of-stock-img': !inventory }">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p>{{ description }}</p>
                    <p v-show="onSale">{{ saleMessage }}</p>
                    <p v-if="inventory > 10">In stock</p>
                    <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
                    <p v-else>Out of stock</p>
                    <p>Shipping {{ shipping }}</p>
                    <product-details :details="details"></product-details>
                    <div
                    v-for="(variant, index) in variants"
                    :key="variant.id"
                    @mouseover="updateVariant(index)"
                    class="color-circle"
                    :style="{ backgroundColor: variant.color }"
                    ></div>
                    <ul>
                        <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
                    </ul>
                    <div class="buttons-container">
                        <button
                            class="button"
                            :class="{ disabledButton: !inventory }"
                            :disabled="!inventory"
                            v-on:click="addToCart">
                            Add to cart
                        </button>
                        <button class="button" @click="removeFromCart">Remove item</button>
                    </div>
                    <a :href="url">Vue Mastery</a>
                </div>
            </div>
        </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'A warm fuzzy pair of socks',
            selectedVariant: 0,
            url: 'https://www.vuemastery.com/',
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            sizes: ['S', 'M', 'L', 'XL'],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inventory() {
            return this.variants[this.selectedVariant].quantity;
        },
        saleMessage() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale!';
            }

            return '';
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            }

            return 2.99;
        }
    }
});
