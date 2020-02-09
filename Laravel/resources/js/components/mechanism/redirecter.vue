<template></template>
<script>
import { mapGetters } from "vuex";

export default {

    computed:{        
        ...mapGetters({
            'mustRedirect' : 'redirecter/mustRedirect'
        })
    },

    watch:{
        mustRedirect: function(next,prev){
            if(next && !prev){
                var url = this.$store.state.redirecter.redirectUrl;
                console.log('NAVIGATING TO ', url);
                this.$router.push(url);
            }
            this.$store.dispatch('redirecter/redirectFinished');
        }
    }    
}
</script>