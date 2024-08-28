import { onMounted, onBeforeUnmount, type Ref } from 'vue';

export const useClickOutside = (elementRef: Ref<HTMLElement | null>, callback: () => void) => {
  const clickOutsideHandler = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', clickOutsideHandler);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutsideHandler);
  });
}
