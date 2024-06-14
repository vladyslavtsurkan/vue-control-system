<template>
  <div class="container mx-auto py-8">
    <div class="flex justify-center content-center">
      <h2 class="text-2xl font-bold mb-6 text-blue-600 mr-5">Список контролерів</h2>
      <font-awesome-icon :icon="addOrCancelIcon" :class="addOrCancelClass" @click="changeAddMode"/>
    </div>
    <div v-if="isAddMode" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 items-center">
      <controller-card
          :key="0"
          :controller="emptyController"
          :is-empty="true"
          @add:controller="handleAddController"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <controller-card
          v-for="controller in controllers"
          :key="controller.id"
          :controller="controller"
          @update:controller="handleUpdateController"
          @delete:controller="handleDeleteController"
      />
    </div>
    <div v-if="controllers.length === 0" class="text-center text-gray-500 mt-10 text-4xl">Список контролерів порожній</div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onRenderTriggered } from "vue";

import ControllerCard from "@/components/Controllers/ControllerCard.vue";
import type {Controller, ControllerCreate, ControllerUpdate} from "@/types/controller";
import { getControllers, createController, updateController, deleteController } from "@/api";

const controllers = ref<Controller[]>([]);

const isAddMode = ref(false);

const changeAddMode = () => {
  isAddMode.value = !isAddMode.value;
}

const addOrCancelIcon = computed(
    () => isAddMode.value ? ['fas', 'times'] : ['fas', 'plus']
)
const addOrCancelClass = computed(
    () => [isAddMode.value ? 'text-red-400' : 'text-green-400', 'cursor-pointer', 'text-lg', 'pt-2']
)

const emptyController = {
  id: 0,
  name: "",
  description: "",
  ipAddress: "",
  port: 502,
  readAddress: 0,
  writeAddress: 1,
  lowLimit: 0,
  highLimit: 0,
  isActive: true,
  createdAt: "",
  updatedAt: ""
};

const updateControllersOnPage = async () => {
  try {
    const response = await getControllers();
    if (response.status !== 200) {
      console.error("Error while fetching controllers");
      return;
    }
    controllers.value = response.data;
  } catch (e) {
    console.error("Error while fetching controllers", e);
  }
}

const handleAddController = async (isCreated: boolean) => {
  if (!isCreated) {
    return;
  }
  isAddMode.value = false;
  await updateControllersOnPage();
}

const handleUpdateController = async (isUpdated: boolean) => {
  if (!isUpdated) {
    return;
  }
  await updateControllersOnPage();
}

const handleDeleteController = async (controller_id: number) => {
  try {
    const response = await deleteController(controller_id);
    if (response.status !== 204) {
      console.error("Error while deleting controller");
      return;
    }
    controllers.value = controllers.value.filter(controller => controller.id !== controller_id);
  } catch (e) {
    console.error("Error while deleting controller", e);
  }
}

onMounted(async () => {
  await updateControllersOnPage();
})
</script>
