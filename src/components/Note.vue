<template>
  <div class="p-2 rounded-lg" :class="colorForNoteByIndex(index)">
    <!-- This div element will contain the note title and the edit and remove buttons. -->
    <div class="flex justify-between">
      <!-- This h2 element will contain the note title. -->
      <h2 class="font-bold text-xl" v-text="note.title"></h2>
      <!-- This div element will contain the edit and remove buttons. They will be hidden by default and will become visible when the user hovers over the note. -->
      <div class="flex gap-1 hover:opacity-100 opacity-0">
        <!-- This svg element will be the edit button. It will emit an "edit" event when clicked. -->
        <svg
          @click="editNote"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        <!-- This svg element will be the remove button. It will emit a "removed" event when clicked. -->
        <svg
          @click="isDeletingModalOpen = true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
    <pre v-text="note.text"></pre>

    <Modal
      :is-open="isDeletingModalOpen"
      @close="isDeletingModalOpen = false"
      @cancel="isDeletingModalOpen = false"
      @confirm="removeNote"
    >
      <div class="flex flex-col">
        <h3 class="font-bold text-2xl">confirm</h3>
        <span
          ><p class="font-extralight">
            Are you sure you want to delete the note?
          </p>
        </span>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import Modal from "./Modal.vue";
import { defineEmits, ref } from "vue";
import { colorForNoteByIndex } from "@/helpers.js";
const isDeletingModalOpen = ref();
const props = defineProps({
  note: Object,
  index: Number,
});
const emit = defineEmits(["removed", "edit"]);
const removeNote = () => {
  emit("removed", props.note);
};
const editNote = () => {
  emit("edit", props.note);
};
</script>
