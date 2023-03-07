<script setup>
import { useRoute } from 'vue-router';
import StyledHeader from '../components/StyledHeader.vue';
import AlertModal from '../components/AlertModal.vue';

import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import { ref } from 'vue';


const route = useRoute()

const idRamal = route.params.id



async function getRamal() {

    const docRef = doc(db, "ramais", idRamal);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        ramal.value = docSnap.data().phone
        nome.value = docSnap.data().name
        area.value = docSnap.data().area
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

}

if (idRamal) {

    getRamal()

}


const erro = ref("")
const sucesso = ref("")
const area = ref("")
const nome = ref("")
const ramal = ref("")

const setores = [
    "",
    "TI",
    "Marketing",
    "Compliance",
    "Juridico",
    "Financeiro",
    "Recursos Humanos",
    "Diretoria",

]






async function postContact() {

    if (!nome.value || !ramal.value || !area.value) {

        erro.value = "Cadastro incompleto! Complete todos os campos."
        setTimeout(() => erro.value = "", 5000)
        return

    }
    const regex = /\d+/;
    if (regex.test(nome.value) || regex.test(area.value)) {
        erro.value = "NOME e ÁREA devem conter apenas letras."
        setTimeout(() => erro.value = "", 5000)
        return
    }
    if (!regex.test(ramal.value)) {
        erro.value = "RAMAL só pode ser cadastrado com números."
        setTimeout(() => erro.value = "", 5000)
        return
    }

    // Add a new document with a generated id.
    if (!idRamal) {
        const response = await addDoc(collection(db, "ramais"), {
            name: nome.value,
            phone: ramal.value,
            area: area.value
        });
        if (response.id) {

            sucesso.value = "Ramal cadastrado com sucesso."
            setTimeout(() => sucesso.value = "", 5000)
            nome.value = ""
            ramal.value = ""
            area.value = ""


        } else {
            erro.value = "Ocorreu um erro no cadastro. Entre em contato com o suporte."
            setTimeout(() => erro.value = "", 5000)
        }
    } else {
        const response = await setDoc(doc(db, "ramais", idRamal), {
            name: nome.value,
            phone: ramal.value,
            area: area.value
        }).then(() => {
            sucesso.value = "Ramal alterado com sucesso."
            setTimeout(() => sucesso.value = "", 5000)
            getRamal()

        })
            .catch((error) => {
                erro.value = error
                setTimeout(() => erro.value = "", 5000)
            });


    }


}


</script>


<template>
    <div class="h-screen flex flex-col">

        <StyledHeader title="Cadastro de Ramais" icon="database" />

        <div class=" mx-4 flex justify-start gap-x-4 my-4">

            <div>
                <label class="block mb-1 text-sm font-medium">Nome</label>
                <input v-model="nome" class="bg-rose-100 px-2 w-80" />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium">Ramal</label>
                <input v-model="ramal" class="bg-rose-100 px-2" />
            </div>

            <div>

                <label class="block mb-1 text-sm font-medium">Area</label>
                <select v-model="area" class="bg-rose-100 px-2">
                    <option v-for="setor in setores">{{ setor }}</option>

                </select>

            </div>



        </div>

        <div class="mx-4 flex justify-start gap-x-4">

            <button class="rounded-lg shadow-lg py-1 px-2 bg-logo text-white font-semibold"
                @click="postContact">Salvar</button>

        </div>



        <AlertModal v-if="erro" type="erro" :message="erro" />
        <AlertModal v-if="sucesso" type="sucesso" :message="sucesso" />
    </div>
</template>