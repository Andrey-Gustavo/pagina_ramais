<script setup>

defineProps({
    message: String,
    type: String
})

</script>

<template>
    <div class="animate__animated animate__bounceInDown absolute top-5 w-full flex justify-center">
            <div class="px-8 py-2 rounded-lg flex gap-x-4 justify-center items-center text-white font-semibold shadow-lg"
            :class="type == 'erro'? 'bg-red-600' : 'bg-green-600'"
            >
                <fa v-if="type == 'erro'" icon="triangle-exclamation"/>
                <fa v-if="type == 'sucesso'" icon="check"/>
                <span>{{ message }}</span>
            </div>
        </div>
</template>