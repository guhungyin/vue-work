export default {
    props:['tempProduct','updateProduct','isNew','createImages'],
    template : `<div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4">
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">主要圖片</label>
                            <input v-model="tempProduct.imageUrl" type="text" class="form-control" id="formGroupExampleInput" placeholder="請輸入圖片連結">
                            <img :src="tempProduct.imageUrl" class="img-fluid">
                        </div>
                        <div class="mb-3">
                            <h3 class="form-label mb-3">多圖新增</h3>
                            <div v-if="Array.isArray(tempProduct.imagesUrl)">
                                <div class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                                    <div class="mb-3">
                                        <label for="imageUrl" class="form-label">圖片網址</label>
                                        <input v-model="tempProduct.imagesUrl[key]" type="text" class="form-control" placeholder="請輸入圖片連結">
                                    </div>
                                    <img class="img-fluid" :src="image">
                                </div>
                                <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                                </div>
                                <div v-else>
                                    <button class="btn btn-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">刪除圖片</button>  
                                </div>
                            </div>
                            <div v-else>
                                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">新增圖片</button>  
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input v-model="tempProduct.title" type="text" class="form-control" id="title" placeholder="請輸入標題">
                        </div>
                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="classification" class="form-label">分類</label>
                                <input v-model="tempProduct.category" type="text" class="form-control" id="classification" placeholder="請輸入分類">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="unit" class="form-label">單位</label>
                                <input v-model="tempProduct.unit" type="text" class="form-control" id="unit" placeholder="請輸入單位">
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="origin_price" class="form-label">原價</label>
                                <input v-model="tempProduct.origin_price" type="number" class="form-control" id="origin_price" placeholder="請輸入原價">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">售價</label>
                                <input v-model="tempProduct.price" type="number" class="form-control" id="price" placeholder="請輸入售價">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea v-model="tempProduct.description" id="description" type="text" class="form-control" placeholder="請輸入產品描述"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">說明內容</label>
                            <textarea v-model="tempProduct.content" id="description" type="text" class="form-control" placeholder="請輸入說明內容"></textarea>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" id="is_enabled" class="form-check-input" type="checkbox" true-value="1" false-value="0">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
        </div>
    </div>`
}