import DefaultTheme from 'vitepress/theme';
import { watch } from 'vue';
import './custom.css';

export default {
  ...DefaultTheme,
  enhanceApp({ router }) {
    // register global components
    if (typeof window !== 'undefined') {
      let viewer;
      const setup = () => {
        const container = document.querySelector('.vp-doc');
        if (container != null) {
          if (viewer) {
            viewer.update();
          } else {
            viewer = new Viewer(container, { toolbar: false, navbar: false });
          }
        } else if (viewer) {
          viewer.destroy();
          viewer = undefined;
        }
      };

      watch(
        () => router.route,
        () => {
          setTimeout(() => {
            setup();
          }, 1000);
        },
        { immediate: true, deep: true }
      );
    }
  },
};
