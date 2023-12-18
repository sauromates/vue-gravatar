# VueGravatar

Package provides a reusable, customizable and fully typed Gravatar component for Vue3/Tailwind projects.

## Installation

```sh
pnpm add @sauromates/vue-gravatar
```

## Usage

### Component

Package may be used as a ready-to-go single file component. Below is an example with all possible props provided. Note that only `email` prop is required to use the component.

```ts
<script setup lang="ts">
import { Gravatar } from '@sauromates/vue-gravatar'
</script>

<template>
   <Gravatar
      email="test@example.org"
      alt="User's avatar from Gravatar service"
      default="mp"
      :size="80"
      rating="g"
      force-default="y"
      extension=".jpg"
   />
</template>
```

### Composable

More granular control over a Gravatar implementation may be achieved with [`useGravatar`](./src/composables/useGravatar.ts) composable, which is used internally by the component. For details see the source code.

### Playground

Package includes simple Vue 3 application used to demonstrate it's functionality. In order to use a playground, clone this project locally and run it in dev mode.

```sh
git clone https://github.com/sauromates/vue-gravatar
cd vue-gravatar
pnpm install && pnpm dev
```

## Testing

Work in progress
