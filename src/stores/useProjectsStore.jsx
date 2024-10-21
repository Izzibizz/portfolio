import { create } from "zustand";

export const useProjectsStore = create((set) => ({

bgWhite: false,
artPortfolioDisplay: false,
frontendPortfolioDisplay: false,


setBgWhite: (input) => set({bgWhite: input}),
setArtPortfolioDisplay: (input) => set({artPortfolioDisplay: input}),
setFrontendPortfolioDisplay: (input) => set({frontendPortfolioDisplay: input}),

}))