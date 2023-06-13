import vue from '@vitejs/plugin-vue';
import path from 'path'

export default {
  plugins: [vue()],
  test: {
    include: ['**/*.(spec|test).(js|ts)'],
    globals: true,
    environment: 'happy-dom',
    deps: {
      inline: ["vuetify"],
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './')
    }
  }
}