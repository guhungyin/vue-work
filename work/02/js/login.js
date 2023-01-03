createApp({
    data(){
        return{
            user: {
                username : '',
                password : '',
            }
        }
    },
    methods : {
        login(){
            const api = `https://vue3-course-api.hexschool.io/v2/admin/signin`;
            // console.log(api);
            axios.post( api , this.user)
            .then((res) => {
                console.log(res.data)
                const {token,expired} = res.data;
                console.log(token, expired);
                document.cookie = `aboosToken=${token}; expires=${new Date(expired)};`;
                window.location = 'products.html';
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.dir(err)
            });
        },
        checkAdmin(){
            const url = `https://vue3-course-api.hexschool.io/v2/api/user/check`;
            axios.post(url)
            .then((res) => {
                // this.getData();
                console.log(res);
            })
            .catch((err) => {
                alert(err.response.data.message);
                // window.location = 'login.html';
                console.log(err.response);
            })
        }
    }
}).mount('#content');