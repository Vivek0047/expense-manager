<template>
    <b-form @submit.prevent="postForm" autocomplete="off" method="post">
        <b-form-group>
            <b-form-input v-model="login.UserName" placeholder="UserName">
            </b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input v-model="login.Password" placeholder="Password" type="password">
            </b-form-input>
        </b-form-group>
        <b-button type="submit">Login</b-button>
        <p :style="{fontSize:'small',marginTop:'1rem'}">Don't have account click
            <router-link to="/">here</router-link>
        </p>
        <router-view></router-view>
    </b-form>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import axios from 'axios';
import router from "@/router";
import instance from "@/router/axios";

@Component
export default class Login extends Vue {
    private url = 'http://localhost:55430/api/ApplicationUsers/Login'
    private login: any = {
        UserName: '', Password: ''
    }

    makeToast(title: string, msg: string, variant: string) {
        this.$bvToast.toast(msg ? msg : 'Please try again', {
            title: `${title}`,
            variant: variant ? variant : 'default',
            solid: true
        })
    }

    postForm() {
        instance({url: '/ApplicationUsers/Login', data: this.login, method: 'post'}).then((response) => {
            // console.log(response);
            // this.makeToast('Login success', 'Yay!!', 'success');
            localStorage.setItem('token', response.data.token);
            console.log(localStorage.getItem('token'));
            console.log(response,'login response');
            router.push({name: 'Home'});
        }).catch((error) => {
            console.log(error);
            this.makeToast('Login failed', 'Oops!!', 'danger');
        })
    }
}
</script>

<style scoped>
body {
    background: #16a085;
    font-family: sans-serif;
    font-size: 10px;
}

form {
    background: #fff;
    padding: 4em 4em 2em;
    max-width: 400px;
    margin: 50px auto 0;
    box-shadow: 0 0 1em #222;
    border-radius: 2px;
}
</style>
