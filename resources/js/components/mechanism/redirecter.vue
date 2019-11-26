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
                console.log('navigating to ', this.$store.state.redirecter.redirectUrl);
                this.$router.push(this.$store.state.redirecter.redirectUrl)
            }
            this.$store.dispatch('redirecter/redirectFinished');
        }
    }    
}
</script>