<script setup>

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, computed } from "vue";
import StyledHeader from '../components/StyledHeader.vue';
import { db } from "../firebase"



const pesquisaBruta = ref("")
const ramais = ref([])
const ramaisFiltrados = computed(() => {
  if (!pesquisaBruta.value) {
    return ramais.value
  } else {
    return ramais.value.filter(contato =>
      contato.name.toLowerCase().includes(pesquisaBruta.value.toLowerCase()) ||
      contato.phone.toLowerCase().includes(pesquisaBruta.value.toLowerCase()) ||
      contato.area.toLowerCase().includes(pesquisaBruta.value.toLowerCase())
    )
  }
})

async function getRamais() {

  const querySnapshot = await getDocs(collection(db, "ramais"));
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    ramais.value.push(data)

    // console.log(doc.id, " => ", doc.data());

  })

}

getRamais()


async function deleteRamal(id) {

  await deleteDoc(doc(db, "ramais", id));

  ramais.value = []

  getRamais()
}



</script>




<template>
  <StyledHeader title="Ramais" icon="phone" />

  <div class="flex flex-col md:flex-row justify-between md:m-4 gap-y-4 ">

    <div class="mx-4 w-full" >
      <div class="flex items-center justify-between ">
        <input v-model="pesquisaBruta" class="border-2 border-logo rounded-lg text-center placeholder-logo bg-rose-100"
          placeholder="Pesquisar" />
        <a href="/cadastro" class="rounded-lg shadow-lg py-2 px-4 bg-logo text-white font-semibold"
          >Cadastrar</a>
      </div>
    </div>

  </div>

  <table class="text-center text-xs md:text-base md:w-full">
    <thead class="bg-rose-300 h-10">

      <th class="border-2 border-white">Nome</th>
      <th class="border-2 border-white">Ramal</th>
      <th class="border-2 border-white">Area</th>
      <th class="border-2 border-white w-24">Remover</th>


    </thead>

    <!-- mostra as informações do backend as listas ramal, setor, centro de custo, nome -->

    <tbody class="text-xs">

      <tr v-for="contato in ramaisFiltrados " class="even:bg-rose-200">


        <td> <a :href="`/cadastro/${contato.id}`">{{ contato.name }}</a></td>
        <td> <a :href="`/cadastro/${contato.id}`"> {{ contato.phone }}</a></td>
        <td> <a :href="`/cadastro/${contato.id}`"> {{ contato.area }}</a> </td>
        <td>
          <fa @click="deleteRamal(contato.id)" class="text-red-500" icon="ban" />
        </td>

      </tr>

    </tbody>
  </table>
</template>