<template>
    <div>
        這是購物車
        <table class="table align-middle">
        <thead>
            <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                    <td>
                        <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="deleteCartItem(item)" :disabled="item.id === loadingItem">
                            <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
                            x
                        </button>
                    </td>
                    <td>
                    {{ item.product.title }}
                    </td>
                    <td>
                        <div class="input-group input-group-sm">
                            <select name="" id="" class="form-select"
                            v-model="item.qty"
                            :disabled="item.id === loadingItem"
                            @change="updatedCartItem(item)">
                                <option :value="i" v-for="i in 30"
                                :key=" i + '123' ">{{i}}</option>
                            </select>
                            <span class="input-group-text">{{item.product.unit}}</span>
                        </div>
                    </td>
                    <td class="text-end">
                        {{ item.total }}
                    </td>
                </tr>
            </template>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ cart.total }}</td>
            </tr>
            <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ cart.final_total }}</td>
            </tr>
        </tfoot>
    </table>
    </div>

</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      productId: {},
      cart: {},
      loadingItem: ''// 存id
    }
  },
  methods: {
    getCarts () {
      // 區塊或全畫面的讀取
      this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`)
        .then(res => {
          console.log('購物車 : ', res.data.data)
          this.cart = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    updatedCartItem (item) { // 購物車id 產品id
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      this.$http.put(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then(res => {
          console.log('購物車 : ', res.data)
          this.getCarts()
          this.loadingItem = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCartItem (item) {
      this.loadingItem = item.id
      this.$http.delete(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then(res => {
          console.log('刪除購物車 : ', res.data)
          this.loadingItem = ''
          this.getCarts()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
