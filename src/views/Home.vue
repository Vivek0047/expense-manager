<template>

    <div class="home">
        <Navbar :email-id="emailId"></Navbar>
        <expense></expense>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Expense from "@/components/Expense.vue";
import Navbar from "@/components/Navbar.vue";
import instance from "@/router/axios";

@Component({
    components: {
        HelloWorld, Navbar,Expense
    }
})
export default class Home extends Vue {
    private emailId = ''

    created() {
        instance({
            url: '/Users',
            method: 'get',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        }).then((response) => {
            this.emailId = response.data.email;
            console.log(this.emailId, 'tets');
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }
}
</script>
