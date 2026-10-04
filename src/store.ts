import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type Offer = { id: number; title: string; owner: string; status: 'Draft' | 'Review' | 'Approved'; priority: 'Low' | 'Medium' | 'High' }

export const useDeliveryStore = defineStore('eu-talent-pool', () => {
  const offers = ref<Offer[]>([])
  const query = ref('')
  const loading = ref(false)
  const error = ref('')
  const approvedShare = computed(() => offers.value.length ? Math.round(offers.value.filter((item) => item.status === 'Approved').length / offers.value.length * 100) : 0)
  const urgent = computed(() => offers.value.filter((item) => item.priority === 'High').length)
  const visibleOffers = computed(() => offers.value.filter((item) => `${item.title} ${item.owner} ${item.status}`.toLowerCase().includes(query.value.toLowerCase())).sort((a, b) => a.title.localeCompare(b.title)))

  async function load() {
    loading.value = true; error.value = ''
    try { const response = await fetch('/api/items'); if (!response.ok) throw new Error(); offers.value = await response.json() }
    catch { error.value = 'Quantum skills plan information is temporarily unavailable.' }
    finally { loading.value = false }
  }

  async function addOffer() {
    error.value = ''
    const response = await fetch('/api/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Brussels quantum lab skills pilot', owner: 'Brussels Quantum Academy Team', status: 'Draft', priority: 'Medium' }) })
    if (!response.ok) { error.value = 'The skills plan could not be saved.'; return }
    offers.value.push(await response.json())
  }

  async function advanceOffer(item: Offer) {
    const status = item.status === 'Draft' ? 'Review' : 'Approved'
    const response = await fetch(`/api/items/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, status }) })
    if (!response.ok) { error.value = 'The skills plan could not be updated.'; return }
    const updated = await response.json()
    offers.value = offers.value.map((entry) => entry.id === updated.id ? updated : entry)
  }

  return { offers, query, visibleOffers, loading, error, approvedShare, urgent, load, addOffer, advanceOffer }
})
