import { create } from "zustand";

const useWatchStore = create((set) => ({
  watchs: JSON.parse(localStorage.getItem("watchs")) || [],
  loading: true,
  error: "",

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
