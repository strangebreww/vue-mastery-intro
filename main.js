const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            description: 'A warm fuzzy pair of socks',
            image: './assets/images/socks_blue.jpg',
            url: 'https://www.vuemastery.com/',
            inventory: 9,
            onSale: true,
        }
    }
});
