import footerBox from "../../../footerBox.js";
const { createApp } = Vue;
createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath:'aboos-work',
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        checkAdmin(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
            .then(() => {
                this.getData();
            })
            .catch((err) => {
                alert(err.response.data.message);
                window.location = 'login.html';
            })
        },
        getData(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
            .then((res) => {
                this.products = res.data.products;
            })
            .catch((err) => {
                alert(err.response.data.message);
            })
        },
        openProduct(item) {
            this.tempProduct = item;
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)aboosToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();
    },
    components:{
        footerBox
    }
}).mount('#app');