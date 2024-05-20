import { create } from "zustand";

const useWatchStore = create((set) => ({
  watchs: [],
  loading: true,
  error: "",

  getWatchs: () => {
    try {
      const watchs = JSON.parse(localStorage.getItem("watchs")) || [];
      set((state) => ({
        ...state,
        watchs: watchs,
        loading: false,
        error: "",
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        watchs: [],
        loading: false,
        error: "Failed to load watchs from localStorage.",
      }));
    }
  },

  addWatch: (newWatch) => {
    set((state) => {
      const IdWatch = state.watchs?.some((watch) => watch.id === newWatch.id);
      if (!IdWatch) {
        const updatedWatch = [...state.watchs, newWatch];
        localStorage.setItem("watchs", JSON.stringify(updatedWatch));
        return { watchs: updatedWatch };
      } else {
        return { watchs: state.watchs };
      }
    });
  },

  removeWatch: (Id) => {
    set((state) => {
      const updatedWatch = state?.watchs.filter((el) => el?.id !== Id);
      localStorage.setItem("watchs", JSON.stringify(updatedWatch));
      return { watchs: updatedWatch };
    });
  },

  setError: (errorMessage) => set({ error: errorMessage }),

  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useWatchStore;
