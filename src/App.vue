<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col w-3/4">
      <div class="flex justify-between items-center">
        <div class="flex">
          <h1 class="text-5xl font-bold">Notes</h1>
        </div>
        <svg
          @click="isEditingModalOpen = true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <div class="grid grid-cols-3 gap-4 items-start mt-4">
        <TransitionGroup name="fade">
          <note
            @removed="removeNote"
            :key="`note-${index}`"
            @edit="enterEditMode"
            v-for="(note, index) in notes"
            :index="index"
            :note="note"
          ></note>
        </TransitionGroup>
      </div>
    </div>
  </div>
  <Modal
    v-if="isEditingModalOpen"
    @close="handleModalClose"
    :is-open="isEditingModalOpen"
  >
    <h3 class="font-bold text-2xl">Note Editor</h3>
    <note-editor
      @add="addNote"
      @edit="editNote"
      :note="editingNote"
    ></note-editor>
  </Modal>
  <Modal :is-open="isDeletingModalOpen" @close="isDeletingModalOpen = false">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, ratione
    nemo, provident distinctio nobis vel officia doloremque impedit at hic
    sapiente mollitia voluptatum minima, eum rerum ea itaque. Perferendis, quae.
  </Modal>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Note from "@/components/Note.vue";
import NoteEditor from "@/components/NoteEditor.vue";
import Modal from "@/components/Modal.vue";
const isEditingModalOpen = ref(false);
const isDeletingModalOpen = ref(false);
const isTextShown = ref(false);
const boxCounts = ref(5);
const notes = ref([
  {
    title: "Note Title",
    text: "Note text body",
  },
  {
    title: "Learn A.I",
    text: "This is the future",
  },
]);
const getData = async () => {
  const { data } = await axios.get("http://localhost:3000/notes");
  notes.value = data.notes;
};
onMounted(getData);
const editingNote = ref();

const removeNote = async (note) => {
  const index = notes.value.indexOf(note);
  // const confirmed = confirm(
  //   `Are you sure you want to delete the note ${note.title}`
  // );
  // if (!confirmed) {
  //   return;
  // }
  notes.value.splice(index, 1);
  try {
    await axios.delete("http://localhost:3000/notes/" + note.id); // Assuming the server supports deleting a note by its ID
    console.log("Note successfully deleted");
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

const addNote = async (note) => {
  notes.value.push(note);
  isEditingModalOpen.value = false;
  await axios.post("http://localhost:3000/notes", {
    title: note.title,
    text: note.text,
  });
};
const editNote = async (note) => {
  try {
    await axios.patch(`http://localhost:3000/api/v1/nodes/${note.id}`, {
      title: note.title,
      text: note.text,
    }); // Send the updated note object in the PATCH request

    const index = notes.value.indexOf(editingNote.value);
    notes.value[index] = note;
    editingNote.value = null;
    isEditingModalOpen.value = false;
    console.log("Note successfully updated");
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

const enterEditMode = (note) => {
  isEditingModalOpen.value = true;
  editingNote.value = note;
};
const handleModalClose = () => {
  isEditingModalOpen.value = false;
  editingNote.value = null;
};
</script>
