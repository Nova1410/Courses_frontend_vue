<template>
<q-page padding>
  <div class="doc-container">
    <div class="row">
      <div class="col-6">
        <q-input class="q-mr-md" v-model="search_term" label="Search all courses">
          <template v-slot:prepend>
            <q-icon color="blue-5" name="search" />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
export default {
    data() {
      return {
        search_term: ''
      }
    }
}
</script>

<style scoped>

</style>