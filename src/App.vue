<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import { useDeliveryStore } from './store'
const store = useDeliveryStore()
const { approvedShare, offers, urgent } = storeToRefs(store)
onMounted(store.load)
</script>

<template><div class="shell"><aside><div class="brand">QuantumTalentEU<span>WORKFORCE READINESS</span></div><nav><RouterLink to="/">Skills plans</RouterLink><RouterLink to="/insights">Skills guidance</RouterLink></nav><div class="health"><i /> Java quantum skills service connected</div></aside><main><header><div><span class="eyebrow">Build a diverse workforce for Europe’s quantum ecosystem</span><h1>Quantum Skills Readiness Desk</h1></div><button @click="store.addOffer">Add skills plan</button></header><section class="summary"><article><small>Plans ready</small><strong>{{ approvedShare }}%</strong><div class="bar"><span :style="{ width: `${approvedShare}%` }" /></div></article><article><small>Plans tracked</small><strong>{{ offers.length }}</strong><p>Shared workforce view</p></article><article><small>High-priority blockers</small><strong>{{ urgent }}</strong><p>Needs attention</p></article></section><RouterView /></main></div></template>
