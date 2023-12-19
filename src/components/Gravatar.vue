<script setup lang="ts">
import { computed } from 'vue'
import { useGravatar } from '../composables/useGravatar'
import { type GravatarType } from '../types/gravatar'

const props = defineProps<GravatarType & { alt?: string }>()

const { gravatar } = useGravatar(props)
const alt = computed<string>(() => props?.alt ?? "User's avatar from Gravatar service")
</script>

<template>
  <img :alt="alt" :src="gravatar" />
</template>
