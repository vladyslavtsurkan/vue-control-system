<template>
  <div class="bg-white shadow-md rounded p-6">
    <controller-card-error v-if="isErrorMessageVisible" :close-message="closeErrorMessage" />

    <div class="flex items-center justify-between">
      <h5 v-if="!isEditMode" class="text-xl font-bold text-blue-500">{{ name }}</h5>
      <text-input v-else v-model="name" class="text-xl text-blue-500" placeholder="Назва контролера" required />
      <div class="flex items-center">
        <font-awesome-icon :icon="editOrCancelIcon" :class="editOrCancelClass" @click="changeEditMode"/>
        <font-awesome-icon
            v-if="!props.isEmpty && !isEditMode"
            :icon="['fas', 'trash']"
            class="text-lg cursor-pointer text-red-400"
            @click="deleteController"
        />
      </div>
    </div>

    <h5 class="text-xs font-semibold mb-2 text-gray-500">Значення показання: {{ controllerValue }}</h5>
    <p v-if="!isEditMode" class="mb-4 text-gray-700">Опис: {{ description }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Опис:</label>
      <text-input id="description" v-model="description" placeholder="Опис" required />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">IP адреса: {{ ipAddress }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="ipAddress">IP адреса:</label>
      <text-input id="ipAddress" v-model="ipAddress" placeholder="IP адреса" required />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">Порт: {{ port }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="port">Порт:</label>
      <integer-input id="port" v-model="port" placeholder="Порт" required />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">Нижній ліміт: {{ readAddress }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="readAddress">Адреса зчитування:</label>
      <integer-input id="readAddress" v-model="readAddress" placeholder="Адреса зчитування" required />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">Адреса запису: {{ writeAddress }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="writeAddress">Адреса запису:</label>
      <integer-input id="writeAddress" v-model="writeAddress" placeholder="Адреса запису" required />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">Нижній ліміт: {{ lowLimit }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="lowLimit">Нижній ліміт:</label>
      <integer-input id="lowLimit" v-model="lowLimit" placeholder="Нижній ліміт" required />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">Верхній ліміт: {{ highLimit }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="highLimit">Верхній ліміт:</label>
      <integer-input id="highLimit" v-model="highLimit" placeholder="Верхній ліміт" required />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">Активний: {{ isActive ? "Так" : "Ні" }}</p>
    <div v-else class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="isActive">Активний:</label>
      <check-box id="isActive" v-model="isActive" />
    </div>

    <p v-if="!isEditMode" class="mb-4 text-gray-700">Створено: {{ createdAt }}</p>
    <p v-if="!isEditMode" class="text-gray-700">Оновлено: {{ updatedAt }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import ControllerCardError from "@/components/Controllers/ControllerCardError.vue";
import TextInput from "@/components/Shared/TextInput.vue";
import IntegerInput from "@/components/Shared/IntegerInput.vue";
import CheckBox from "@/components/Shared/CheckBox.vue";
import type {Controller, ControllerCreate, ControllerUpdate} from "@/types/controller";
import { updateController, createController } from "@/api";

const props = defineProps({
  controller: {
    type: Object as () => Controller,
    required: true
  },
  isEmpty: {
    type: Boolean,
    required: false,
    default: false
  },
})

const controllerValue = ref(10)

const name = ref(props.controller.name)
const description = ref(props.controller.description)
const ipAddress = ref(props.controller.ipAddress)
const port = ref(props.controller.port)
const readAddress = ref(props.controller.readAddress)
const writeAddress = ref(props.controller.writeAddress)
const lowLimit = ref(props.controller.lowLimit)
const highLimit = ref(props.controller.highLimit)
const isActive = ref(props.controller.isActive)
const createdAt = ref(props.controller.createdAt)
const updatedAt = ref(props.controller.updatedAt)

const isErrorMessageVisible = ref(false)
const closeErrorMessage = () => isErrorMessageVisible.value = false
const isEditMode = ref(props.isEmpty)

const editOrCancelIcon = computed(
    () => isEditMode.value ? ['fas', 'check'] : ['fas', 'pencil']
)
const editOrCancelClass = computed(
    () => [
      isEditMode.value ? 'text-green-400' : 'text-orange-300',
      'cursor-pointer',
      'text-lg',
      isEditMode.value ? '' : 'mr-3'
    ]
)

const emit = defineEmits(["add:controller", "update:controller", "delete:controller"]);

const changeEditMode = async () => {
  if (
      name.value === "" ||
      description.value === "" ||
      ipAddress.value === "" ||
      port.value === 0
  ) {
    isErrorMessageVisible.value = true;
    return;
  }
  if (props.isEmpty) {
    const controller: ControllerCreate = {
      name: name.value,
      description: description.value,
      ipAddress: ipAddress.value,
      port: port.value,
      readAddress: readAddress.value,
      writeAddress: writeAddress.value,
      lowLimit: lowLimit.value,
      highLimit: highLimit.value,
      isActive: isActive.value,
    };
    try {
      const response = await createController(controller);
      if (response.status !== 201) {
        console.error("Error while creating controller");
        emit("add:controller", false);
        isErrorMessageVisible.value = true;
        return;
      }
      emit("add:controller", response.status === 201);
      isErrorMessageVisible.value = false;
    } catch (e) {
      console.error("Error while creating controller", e);
      isErrorMessageVisible.value = true;
      emit("add:controller", false);
      return;
    }
  } else {
    const controller: ControllerUpdate = {
      id: props.controller.id,
      name: name.value,
      description: description.value,
      ipAddress: ipAddress.value,
      port: port.value,
      readAddress: readAddress.value,
      writeAddress: writeAddress.value,
      lowLimit: lowLimit.value,
      highLimit: highLimit.value,
      isActive: isActive.value,
    };
    try {
      const response = await updateController(controller);
      if (response.status !== 200) {
        console.error("Error while updating controller");
        emit("update:controller", false);
        isErrorMessageVisible.value = true;
        return;
      }
      emit("update:controller", response.status === 200);
      isErrorMessageVisible.value = false;
    } catch (e) {
      console.error("Error while updating controller", e);
      isErrorMessageVisible.value = true;
      emit("update:controller", false);
      return;
    }
  }
  isEditMode.value = !isEditMode.value;
}

const deleteController = () => {
  emit("delete:controller", props.controller.id);
}
</script>
