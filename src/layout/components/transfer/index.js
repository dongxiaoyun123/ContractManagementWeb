import Transfer from '../transfer/src/main.vue';

/* istanbul ignore next */
Transfer.install = function (Vue) {
    Vue.component(Transfer.name, Transfer);
};

export default Transfer;
