<script setup lang="ts">
import { computed } from 'vue'
import type { ToastContainerProps } from '../../types'
import { useToast } from '../../composables/useToast'
import ToastItem from './ToastItem.vue'

const props = withDefaults(defineProps<ToastContainerProps>(), {
  placement: 'top-end',
  max: 5,
})

const { toasts, dismiss } = useToast()

const visible = computed(() => {
  const list = toasts.value
  return props.max > 0 ? list.slice(-props.max) : list
})

const classes = computed(() => ['gmz-toasts', `gmz-toasts--${props.placement}`])
</script>

<template>
  <Teleport to="body">
    <div :class="classes">
      <TransitionGroup name="gmz-toast">
        <ToastItem
          v-for="t in visible"
          :key="t.id"
          :toast="t"
          @dismiss="dismiss(t.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style>
@import '../../styles/tokens.css';

.gmz-toasts {
  position: fixed;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(360px, calc(100vw - 32px));
  pointer-events: none;
}

.gmz-toasts--top-end {
  top: 16px;
  right: 16px;
  align-items: flex-end;
}

.gmz-toasts--top-start {
  top: 16px;
  left: 16px;
  align-items: flex-start;
}

.gmz-toasts--bottom-end {
  bottom: 16px;
  right: 16px;
  align-items: flex-end;
}

.gmz-toasts--bottom-start {
  bottom: 16px;
  left: 16px;
  align-items: flex-start;
}

.gmz-toast-enter-active,
.gmz-toast-leave-active {
  transition:
    opacity var(--gmz-transition),
    transform var(--gmz-transition);
}

.gmz-toast-enter-from,
.gmz-toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.gmz-toast-leave-active {
  position: absolute;
}

@media (prefers-reduced-motion: reduce) {
  .gmz-toast-enter-active,
  .gmz-toast-leave-active {
    transition: none;
  }
}
</style>
