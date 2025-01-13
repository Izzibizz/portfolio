import { create } from "zustand";

export const useProjectsStore = create((set) => ({

bgWhite: false,
artPortfolioDisplay: false,
frontendPortfolioDisplay: false,
titleAndVideoVisible: true,
isScrolled: false,


setBgWhite: (input) => set({bgWhite: input}),
setArtPortfolioDisplay: (input) => set({artPortfolioDisplay: input}),
setFrontendPortfolioDisplay: (input) => set({frontendPortfolioDisplay: input}),
setTitleAndVideoVisible: (input) => set({titleAndVideoVisible: input}),
setIsScrolled: (input) => set({isScrolled:input}), 

}))