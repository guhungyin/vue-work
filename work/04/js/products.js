import footerBox from "../../../footerBox.js";
import pagination from "./pagination.js";
import productModal from "./productModal.js";
let ProductModal = null;
let delProductModal = null;
const { createApp } = Vue;
createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath:'aboos-work',
            products: [],
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
            page: {}
        }
    },
    methods: {
        checkAdmin(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
            .then(() => {
                this.getProducts();
            })
            .catch((err) => {
                alert(err.response.data.message);
                window.location = 'login.html';
            })
        },
        getProducts(page = 1){// 參數預設
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`;
            axios.get(url).then((res) => {
                this.products = res.data.products;
                this.page = res.data.pagination;
                console.log(res.data);
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        updateProduct(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let http = 'post';
            if(!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                http = 'put';
            }
            axios[http](url,{data: this.tempProduct}).then((res) => {
                alert(res.data.message);
                ProductModal.hide();
                this.getProducts();
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        openModal(isNew,item){
            if (isNew === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                ProductModal.show();
            } else if (isNew === 'edit') {
                this.tempProduct = {...item };
                this.isNew = false;
                ProductModal.show();
            } else if (isNew === 'delete') {
                this.tempProduct = {...item };
                delProductModal.show();
            }
        },
        delProduct(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url).then((res) => {
                alert(res.data.message);
                delProductModal.hide();
                this.getProducts();
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        createImages(){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        }
    },
    mounted() {
        ProductModal = new bootstrap.Modal(document.getElementById('ProductModal'), {
            keyboard: false
        })
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        })
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)aboosToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();
    }, 
    components:{
        footerBox,
        pagination,
        productModal
    }
}).mount('#app');