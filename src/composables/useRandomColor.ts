import { ref } from 'vue';

/** 隨機生成顏色 */
export const useRandomColor = () => {
  const colorHex = ref<string>('')
  const colorRGB = ref<string>('')

  const getRandomHex = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomRGB = (): string => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  colorHex.value = getRandomHex();
  colorRGB.value = getRandomRGB();

  return {
    colorHex,
    colorRGB,
    getRandomHex,
    getRandomRGB,
  };
}