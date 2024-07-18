# VueGravatar

![npm](https://img.shields.io/npm/v/%40sauromates%2Fvue-gravatar?logo=npm)
![npm](https://img.shields.io/npm/dt/%40sauromates/vue-gravatar?logo=npm)
![NPM](https://img.shields.io/npm/l/%40sauromates%2Fvue-gravatar?logo=npm)

Reusable, customizable and fully typed Gravatar component for Vue3 projects.

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

More granular control over a Gravatar implementation may be achieved with [`useGravatar`](./src/composables/useGravatar.ts) composable, which is used internally by the component. Note that `useGravatar` should always be provided with reactive object (usually component props) in order for its watchers to function properly.

```ts
<script setup lang="ts">
import { reactive } from 'vue'
import { useGravatar, type GravatarType } from '@sauromates/vue-gravatar'

const config: GravatarType = reactive({
  email: 'test@example.org',
  size: 80,
  default: 'mp',
  rating: 'g'
})

const { gravatar: url, size } = useGravatar(config)
</script>

<template>
  <img :src="url" :height="size" :width="size" />
</template>
```

### Playground

Package includes simple Vue 3 application used to demonstrate it's functionality. In order to use a playground, clone this project locally and run it in dev mode.

```sh
git clone https://github.com/sauromates/vue-gravatar.git
cd vue-gravatar
pnpm install && pnpm dev
```

## Testing

```sh
pnpm test
```

## License

Licensed under the [MIT license](LICENSE)
