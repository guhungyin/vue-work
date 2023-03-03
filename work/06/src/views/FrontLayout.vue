<template>
    <div>
        這是前台頁面
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/products">產品列表</router-link> |
        <router-link to="/cart">購物車</router-link>
        <hr>
        <RouterView></RouterView>
    </div>
</template>

<script>
import { RouterView } from 'vue-router'
export default {
  comments: {
    RouterView
  }
}
</script>
