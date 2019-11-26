<template>   
    <div class='centered_absolute' >
            <div class="jumbotron">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
    </div>
</template>

<style scoped>
    .centered_absolute {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 99;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);
    }
    .jumbotron{
        min-width:200px;
        text-align: center
    }
</style>