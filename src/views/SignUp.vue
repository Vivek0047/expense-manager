<template>
    <ValidationObserver v-slot="{invalid}" ref="signUpObserver">
        <b-form action="#" method="post" @submit.prevent="postForm" autocomplete="off" id="signUpForm">
            <b-form-group>
                <ValidationProvider name="username" rules="required|userNameAvailable|min:4"
                                    v-slot="{classes,errors}">
                    <b-form-input v-model="signUp.UserName" placeholder="Try Username..."
                                  v-on:keyup="checkUserName"
                                  :class="classes">
                    </b-form-input>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
            </b-form-group>
            <b-form-group>
                <ValidationProvider name="firstname" rules="required" v-slot="{classes,errors}">
                    <b-form-input v-model="signUp.FirstName" placeholder="First Name" :class="classes">
                    </b-form-input>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
            </b-form-group>
            <b-form-group>
                <ValidationProvider name="lastname" rules="required" v-slot="{classes,errors}">
                    <b-form-input v-model="signUp.LastName" placeholder="Last Name" :class="classes">
                    </b-form-input>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
            </b-form-group>
            <b-form-group>
                <ValidationProvider name="email" rules="required|email" v-slot="{classes,errors}">
                    <b-form-input v-model="signUp.Email" placeholder="Enter email" :class="classes">
                    </b-form-input>
                    <span>{{ errors[0] }}</span>
                </ValidationProvider>
            </b-form-group>
            <b-form-group>
                <b-form-input v-model="signUp.ContactNumber" placeholder="Enter contact">
                </b-form-input>
            </b-form-group>
            <ValidationObserver>
                <b-form-group>
                    <validation-provider rules="required|confirmed:signUp.ConfirmPassword" v-slot="{errors,classes}"
                                         vid="signUp.Password">
                        <b-form-input type="password" v-model="signUp.Password" placeholder="Enter password"
                                      :class="classes">
                        </b-form-input>
                        <span>{{ errors[0] }}</span>
                    </validation-provider>
                </b-form-group>
                <b-form-group>
                    <validation-provider rules="required|confirmed:signUp.Password" v-slot="{errors,classes}"
                                         vid="signUp.ConfirmPassword">
                        <b-form-input type="password" v-model="signUp.ConfirmPassword" placeholder="Confirm password"
                                      :class="classes">
                        </b-form-input>
                        <span>{{ errors[0] }}</span>
                    </validation-provider>
                </b-form-group>
            </ValidationObserver>
            <b-button type="submit" align="centre" :disabled="invalid"> Submit</b-button>
            <p :style="{fontSize:'small',marginTop:'1rem'}">Have an account click
                <router-link to="/Login">here</router-link>
            </p>
            <router-view></router-view>
        </b-form>
    </ValidationObserver>
</template>

<script lang="ts">
/*eslint-disable */
import {Component, Vue, Prop} from 'vue-property-decorator'
import {ValidationProvider, extend, configure, ValidationObserver} from 'vee-validate'
import {required, email, confirmed} from "vee-validate/dist/rules";
import axios from 'axios';
import router from "@/router";
import instance from "@/router/axios";

extend('min', {
    validate(value, {length}) {
        return value.length >= length;
    }, params: ['length'],
    message:
        'Min length should be {length}'
})

extend('required', {
    ...required, message: 'Required'
})

extend('email', email)
extend('confirmed', {
    ...confirmed, message: 'Confirm Password dont matches.'
})
extend('userNameAvailable', value => {
    const taken = ['vikku', 'vivek'];
    if (taken.some(x => x == value)) {
        return 'This username is taken';
    }
    return true;
})

configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    }
})

@Component({
    components: {
        ValidationProvider,
        ValidationObserver
    }
})

export default class SignUp extends Vue {
    private url = 'http://localhost:55430/api/ApplicationUsers/Register'
    public signUp: any = {
        UserName: '', ContactNumber: '', Email: '', Password: '', ConfirmPassword: '', FirstName: '', LastName: ''
    }

    get FullName() {
        return this.signUp.FirstName + ' ' + this.signUp.LastName;
    }

    checkUserName() {
        console.log(this.signUp.UserName, 'checkusername');
        if (this.signUp.UserName.length >= 4) {
            const name = this.signUp.UserName;
            instance({
                url: '/ApplicationUsers/CheckUserName/' + this.signUp.UserName,
                data: this.signUp.UserName,
                method: 'get',
                headers: {"Content-Type": "text/plain"}
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                this.$refs.signUpObserver.setErrors({username: 'This username taken'})
            })
        }
    }

    makeToast(title: string, msg: string, variant: string) {
        this.$bvToast.toast(msg ? msg : 'Please try again', {
            title: `${title}`,
            variant: variant ? variant : 'default',
            solid: true
        })
    }

    postForm() {
        const model = {
            UserName: this.signUp.UserName,
            ContactNumber: this.signUp.ContactNumber,
            Email: this.signUp.Email,
            Password: this.signUp.Password,
            FullName: this.FullName
        };
        instance({url: '/ApplicationUsers/Register', method: 'post', data: model}).then((response) => {
            this.makeToast('Signup', 'SignUp complete', 'success');
            router.push({name: 'Login'});
        }).catch((error) => {
            console.log(error);
            this.makeToast('SignUp Failed', 'Please try again', 'danger');
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
