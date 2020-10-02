<template>
    <b-form action="#" method="post" autocomplete="off" :style="{backgroundColor: '#7b7b7d' }">
        <b-form-group>
            <ValidationProvider name="username" rules="required|userNameAvailable|min:4" v-slot="{classes,errors}">
                <b-form-input v-model="signUp.UserName" placeholder="Try Username..." :class="classes">
                </b-form-input>
                <span>{{ errors[0] }}</span>
            </ValidationProvider>
        </b-form-group>
        <b-form-group>
            <ValidationProvider name="email" rules="required|email" v-slot="{classes,errors}">
                <b-form-input v-model="signUp.Email" placeholder="Enter email" required :class="classes">
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
        <b-button type="submit" align="centre" :style="{backgroundColor:'#8bc064'}"> Submit</b-button>
    </b-form>
</template>

<script lang="ts">
/*eslint-disable */
import {Component, Vue, Prop} from 'vue-property-decorator'
import {ValidationProvider, extend, configure, ValidationObserver} from 'vee-validate'
import {required, email, confirmed} from "vee-validate/dist/rules";

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

    public signUp: any = {
        UserName: '', ContactNumber: '', Email: '', Password: '', ConfirmPassword: ''
    }

    mounted() {
        console.log('hi');
        console.log(this.signUp);
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
