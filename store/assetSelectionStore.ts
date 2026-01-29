import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AssetSelectionState {
  selectedAssets: Record<string, boolean>;
  selectedCategories: Record<string, boolean | "partial">;

  categoryOrder: string[];
  assetOrder: Record<string, string[]>;

  setSelectedAssets: (assets: Record<string, boolean>) => void;
  setSelectedCategories: (
    categories: Record<string, boolean | "partial">,
  ) => void;
  resetSelections: () => void;

  setCategoryOrder: (order: string[]) => void;
  setAssetOrder: (categoryId: string, order: string[]) => void;
}

export const useAssetSelectionStore = create<AssetSelectionState>()(
  persist(
    (set) => ({
      selectedAssets: {},
      selectedCategories: {},
      categoryOrder: [],
      assetOrder: {},

      setSelectedAssets: (assets) => set({ selectedAssets: assets }),
      setSelectedCategories: (categories) =>
        set({ selectedCategories: categories }),
      resetSelections: () =>
        set({
          selectedAssets: {},
          selectedCategories: {},
          categoryOrder: [],
          assetOrder: {},
        }),

      setCategoryOrder: (order) => set({ categoryOrder: order }),
      setAssetOrder: (categoryId, order) =>
        set((state) => ({
          assetOrder: {
            ...state.assetOrder,
            [categoryId]: order,
          },
        })),
    }),
    {
      name: "asset-selection-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
