<template>
  <div v-if="isDebugMode" class="role-display">
    <p>{{ role }}</p>
    <p>{{ houseId }}</p>
  </div>
</template>

<script>
export default {
  name: 'RoleDisplay',
  components: {
  },
  data: function () {
    return {
      uri: ''
    }
  },
  computed: {
    isDebugMode: function () {
      return this.$store.state.meta.isDebugMode;
    },
    role: function () {
      return this.$store.state.meta.role;
    },
    houseId: function () {
      return this.$store.state.meta.houseId;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.role-display {
  font-weight: bold;
  position: absolute;
  color: white;
  font-size: 12pt;
  background-color: #111;
  outline: 1px dashed purple;
  opacity: 0.8;
  top: 90vh;
  left: 0;
  padding: 1em;
  pointer-events: none;
  z-index: 9999;
}
</style>
