<script setup>

const props = defineProps({

    title: String,
    icon: String,

})



</script>


<template>
    <header class="flex justify-between py-1 px-4 border-b-2 border-logo items-center ">
       <a href="/"> <img class="w-32" src="../assets/pillar-in-shield-with-fire-3321ld.png"/> </a>

        <div class="flex justify-end items-center gap-x-4 text-logo ">

            <h1 class="font-bold">{{ title }}</h1>

            <fa class="text-4xl" :icon="icon" />

        </div>



    </header>
</template>