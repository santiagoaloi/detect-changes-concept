/*
 * General application related logic.
 */

export const useAppStore = defineStore('global-application', {
  state: () => ({
    currentTheme: 'light'
  }),

  persist: {
    //Persist only currentTheme
    paths: ['currentTheme']
  },

  getters: {
    isDark: (state) => state.currentTheme === 'dark'
  },

  actions: {}
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
