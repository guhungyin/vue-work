import footerBox from "../../../footerBox.js";
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'aboos-work';
const { createApp } = Vue;

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
configure({
    generateMessage: localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
const productModal = {
    //當id變動時，取得遠單資料，並呈現Modal
    props:['id','addToCatr','openModal'],
    data() {
        return {
            tempProduct: {},
            modal: {},
            qty: 1,
        };
    },
    template: '#userProductModal',
    watch:{//監聽props傳入的值
        id(){
            console.log('productModal:',this.id);
            if(this.id){
                axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
                .then(res => {
                    console.log('單一產品 : ' , res.data.product);
                    this.tempProduct = res.data.product;
                    this.modal.show();
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    },
    methods: {
        hide(){
            this.modal.hide();
        }
    },
    mounted(){
        this.modal = new bootstrap.Modal(this.$refs.modal);
        this.$refs.modal.addEventListener('hidden.bs.modal', (event) => {
            console.log('Modal被關閉了');
            this.openModal('');
        });
        // this.modal.show();
    }
};
const app = createApp({
    data() {
        return {
            products: [],
            productId: {},
            cart: {},
            loadingItem: '',// 存id
            form: {
                user: {
                name: '',
                email: '',
                tel: '',
                address: '',
                },
                message: '',
            },
        }
    },
    methods: {
        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then(res => {
                console.log('產品列表 : ' , res.data.products);
                this.products = res.data.products
            })
            .catch(err => {
                console.log(err);
            })
        },
        openModal(id){
            this.productId = id;
            console.log('外部傳入',id);
        },
        addToCatr(product_id,qty = 1){//當沒有傳入該參數時，會使用預設值
            this.loadingItem = product_id;
            const data = {
                product_id,
                qty,
            };
            axios.post(`${apiUrl}/api/${apiPath}/cart`,{data})
            .then(res => {
                console.log('加入購物車 : ' , res.data);
                this.loadingItem = '';
                this.$refs.productModal.hide();
                this.getCarts();
            })
            .catch(err => {
                console.log(err);
            })
        },
        getCarts(){
            //區塊或全畫面的讀取
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then(res => {
                console.log('購物車 : ' , res.data.data);
                this.cart = res.data.data
            })
            .catch(err => {
                console.log(err);
            })
        },
        updatedCartItem(item){ // 購物車id 產品id
            const data = {
                product_id: item.product.id,
                qty: item.qty,
            };
            this.loadingItem = item.id;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`,{data})
            .then(res => {
                console.log('購物車 : ' , res.data);
                this.getCarts();
                this.loadingItem = '';
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteCartItem(item){
            this.loadingItem = item.id;
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${item.id}`)
            .then(res => {
                console.log('刪除購物車 : ' , res.data);
                this.loadingItem = '';
                this.getCarts();
            })
            .catch(err => {
                console.log(err);
            })
        },
        onSubmit(){
            console.log('onSubmit');
        }
    },
    components:{
        footerBox,
        productModal,
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
    },
    mounted() {
        this.getProducts();
        this.getCarts();
    }
});
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app');