<template>
    <b-container fluid="sm">
        <b-row>
            <b-col class="expense-div">
                <b-form @submit.prevent="postForm">
                    <b-form-group label="Item :" label-cols-sm="4" label-cols-lg="3">
                        <b-form-input v-model="expense.ItemName"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Price :" label-cols-sm="4" label-cols-lg="3">
                        <b-input-group prepend="₹" append=".00">
                            <b-form-input v-model.number="expense.Amount" type="number"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group label="Bought Date : " label-cols-sm="4" label-cols-lg="3">
                        <b-form-datepicker v-model="expense.Date"></b-form-datepicker>
                    </b-form-group>
                    <b-form-group label="Remarks :" label-cols-sm="4" label-cols-lg="3">
                        <b-form-input v-model="expense.Remarks"></b-form-input>
                    </b-form-group>
                    <b-button type="submit">Add</b-button>
                </b-form>
            </b-col>
            <b-col>2 of 2</b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import instance from "@/router/axios";

@Component
export default class Expense extends Vue {
    expense: any = {
        ItemName: '', Amount: 0, Date: '', Remarks: ''
    }

    postForm() {
        console.log(this.expense);
        console.log(typeof (this.expense.Amount));
        instance({url: '/Expenses', data: this.expense, method: 'post'}).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }
}
</script>

<style scoped>
.expense-div {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 1em #222;
    padding: 2em 2em 2em;
    margin-top: 50px;
}
</style>
