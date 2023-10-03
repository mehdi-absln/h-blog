<template>
<div class="modal-container d-flex justify-content-center align-items-center w-100 h-100 position-fixed top-0 start-0">
  <div class="modal-content w-25 px-4 py-4">
    <p>{{modalMessage}}</p>
    <button @click="$emit('close-modal')" class="btn btn-danger text-white rounded-pill py-2 mt-3">Close</button>
  </div>
</div>
</template>


<style lang="scss" scoped>
.modal-container{
  background-color: rgba(0,0,0,0.7);
  z-index: 5;
  .modal-content{
    border-radius: 20px;
  }
}
</style>


<script>
export default {
  name: "ModalComp",
  props:['modalMessage'],
}
</script>
