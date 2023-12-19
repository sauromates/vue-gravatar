<script setup lang="ts">
import { ref } from 'vue'
import { ImageSizeRange } from './types/util'
import Gravatar from './components/Gravatar.vue'
import { type GravatarType, GravatarPlaceholderOption, GravatarRatingOption } from './types/gravatar'

const config = ref<GravatarType>({
  email: 'test@example.org',
  size: 80,
  default: 'mp',
  rating: 'g'
})
</script>

<template>
  <main class="container mx-auto p-6 h-screen grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="flex flex-col justify-center place-items-center col-span-1 h-full">
      <Gravatar
        class="w-fit"
        :email="config.email"
        :default="config.default"
        :size="config.size"
        :rating="config.rating"
        alt="Testing Gravatar within a package"
      />
    </div>

    <form class="flex flex-col justify-center gap-4 col-span-1 h-full">
      <section class="flex flex-wrap justify-between align-middle" name="help">
        <h1 class="font-semibold text-xl">Configure the Gravatar using the form below</h1>
        <div class="flex gap-4">
          <a class="text-sm font-light" href="https://github.com/sauromates/vue-gravatar" target="_blank"
            >Source code</a
          >
          <a class="text-sm font-light" href="https://docs.gravatar.com/general/images" target="_blank"
            >Gravatar docs</a
          >
        </div>
      </section>

      <hr />

      <label for="email" class="flex flex-col gap-2">
        <p>Email</p>
        <input class="border p-2 rounded-md" type="email" name="email" v-model="config.email" />
      </label>
      <label for="size" class="flex flex-col gap-2">
        <p>Size</p>
        <input
          class="border p-2 rounded-md"
          type="number"
          :min="ImageSizeRange.Min"
          :max="ImageSizeRange.Max"
          name="size"
          v-model.lazy="config.size"
        />
      </label>
      <label for="default-placeholder" class="flex flex-col gap-2">
        <p>Placeholder</p>
        <select name="default-placeholder" class="border p-2 rounded-md" v-model.lazy="config.default">
          <option v-for="(option, key) in Object.values(GravatarPlaceholderOption)" :key="key" :value="option">
            {{ option }}
          </option>
        </select>
      </label>
      <label for="default-rating" class="flex flex-col gap-2">
        <p>Rating</p>
        <select name="default-rating" class="border p-2 rounded-md" v-model.lazy="config.rating">
          <option v-for="(option, key) in Object.values(GravatarRatingOption)" :key="key" :value="option">
            {{ option }}
          </option>
        </select>
      </label>
    </form>
  </main>
</template>
