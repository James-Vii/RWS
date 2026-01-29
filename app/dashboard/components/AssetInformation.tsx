"use client";

import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import DragIndicator from "@mui/icons-material/DragIndicator";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Asset, Category, initialCategories } from "../../../types/assetTypes";
import { useAssetSelectionStore } from "@/store/assetSelectionStore";
import { Pencil, Check, X } from "lucide-react";

export default function AssetInformationTable() {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [openCategories, setOpenCategories] = useState<string[]>(
    categories.map((cat) => cat.name)
  );
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const {
    selectedAssets,
    selectedCategories,
    setSelectedAssets,
    setSelectedCategories,
    categoryOrder,
    assetOrder,
    setCategoryOrder,
    setAssetOrder,
  } = useAssetSelectionStore();

  useEffect(() => {
    if (categoryOrder.length > 0 || Object.keys(assetOrder).length > 0) {
      setCategories((prev) => {
        let ordered = [...prev];
        if (categoryOrder.length > 0) {
          ordered = ordered.sort(
            (a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id)
          );
        }
        return ordered.map((cat) => {
          const saved = assetOrder[cat.id];
          if (!saved) return cat;
          const reorderedAssets = [...cat.assets].sort(
            (a, b) => saved.indexOf(a.id) - saved.indexOf(b.id)
          );
          return { ...cat, assets: reorderedAssets };
        });
      });
    }
  }, []);

  const isCategoryChecked = (catName: string) =>
    selectedCategories[catName] === true;

  const isCategoryPartial = (catName: string) =>
    selectedCategories[catName] === "partial";

  const toggleCategory = (catName: string, checked: boolean) => {
    const category = categories.find((c) => c.name === catName);
    if (!category) return;
    const updatedAssets = { ...selectedAssets };
    category.assets.forEach((a) => (updatedAssets[a.name] = checked));
    setSelectedAssets(updatedAssets);

    setSelectedCategories({
      ...selectedCategories,
      [catName]: checked,
    });
  };

  const toggleAsset = (
    catName: string,
    assetName: string,
    checked: boolean
  ) => {
    const newAssets = { ...selectedAssets, [assetName]: checked };
    setSelectedAssets(newAssets);

    const category = categories.find((c) => c.name === catName);
    if (!category) return;

    const allChecked = category.assets.every((a) => newAssets[a.name]);
    const someChecked = category.assets.some((a) => newAssets[a.name]);

    setSelectedCategories({
      ...selectedCategories,
      [catName]: allChecked ? true : someChecked ? "partial" : false,
    });
  };

  function moveAssetToCategory(
    assetId: string,

    fromCategoryId: string,

    toCategoryId: string
  ) {
    if (fromCategoryId === toCategoryId) return;

    setCategories((prev) => {
      const updated = prev.map((cat) => {
        if (cat.id === fromCategoryId) {
          const newAssets = cat.assets.filter((a) => a.id !== assetId);
          setAssetOrder(
            fromCategoryId,
            newAssets.map((a) => a.id)
          );
          return { ...cat, assets: newAssets };
        }
        if (cat.id === toCategoryId) {
          const fromCat = prev.find((c) => c.id === fromCategoryId);
          const asset = fromCat?.assets.find((a) => a.id === assetId);
          if (!asset) return cat;
          const newAssets = [...cat.assets, asset];
          setAssetOrder(
            toCategoryId,
            newAssets.map((a) => a.id)
          );
          return { ...cat, assets: newAssets };
        }
        return cat;
      });
      return updated;
    });
  }

  function reorderCategories(fromIndex: number, toIndex: number) {
    setCategories((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);

      queueMicrotask(() => {
        setCategoryOrder(updated.map((c) => c.id));
      });

      return updated;
    });
  }

  function reorderAssetsWithinCategory(
    categoryId: string,
    fromIndex: number,
    toIndex: number
  ) {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        const updated = [...cat.assets];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setAssetOrder(
          categoryId,
          updated.map((a) => a.id)
        );
        return { ...cat, assets: updated };
      })
    );
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;
    const activeParts = String(active.id).split(":");
    const overParts = String(over.id).split(":");

    if (activeParts[0] === "cat" && overParts[0] === "cat") {
      setCategories((items) => {
        const oldIndex = items.findIndex((i) => i.id === activeParts[1]);
        const newIndex = items.findIndex((i) => i.id === overParts[1]);
        const newCats = arrayMove(items, oldIndex, newIndex);
        setCategoryOrder(newCats.map((c) => c.id));
        return newCats;
      });
    }

    if (activeParts[0] === "asset") {
      const activeAssetId = activeParts[1];
      const activeCategoryId = activeParts[2];

      if (overParts[0] === "asset") {
        const overAssetId = overParts[1];
        const overCategoryId = overParts[2];

        if (activeCategoryId === overCategoryId) {
          const cat = categories.find((c) => c.id === activeCategoryId);
          if (!cat) return;
          const fromIndex = cat.assets.findIndex((a) => a.id === activeAssetId);
          const toIndex = cat.assets.findIndex((a) => a.id === overAssetId);
          reorderAssetsWithinCategory(activeCategoryId, fromIndex, toIndex);
        } else {
          moveAssetToCategory(activeAssetId, activeCategoryId, overCategoryId);
        }
      } else if (overParts[0] === "cat") {
        moveAssetToCategory(activeAssetId, activeCategoryId, overParts[1]);
      }
    }

    setActiveDrag(null);
    setHoveredCategory(null);
  }

  return (
    <div className="overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(e) => setActiveDrag(String(e.active.id))}
        onDragOver={(e) => {
          const { over } = e;

          if (!over) return setHoveredCategory(null);

          const parts = String(over.id).split(":");

          if (parts[0] === "cat") setHoveredCategory(parts[1]);
          else if (parts[0] === "asset") setHoveredCategory(parts[2]);
          else setHoveredCategory(null);
        }}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={[
            ...categories.map((cat) => `cat:${cat.id}`),
            ...categories.flatMap((cat) =>
              cat.assets.map((a) => `asset:${a.id}:${cat.id}`)
            ),
          ]}
          strategy={verticalListSortingStrategy}
        >
          <table className="min-w-full table-fixed text-sm border-collapse">
            <thead className="bg-white text-[#8E8E93] text-left border-b">
              <tr>
                {[
                  "Asset",
                  "Asset ID",
                  "Share-of-asset",
                  "Valuation",
                  "Volume",
                  "Market Value",
                  "Loan",
                  "Chain",
                  "Issuer",
                  "Custodian",
                  "Oracle Source",
                  "Valuation Date",
                ].map((col, index) => (
                  <th
                    key={col}
                    className={`py-3 px-4 font-medium ${
                      index === 0 ? "min-w-[217px]" : "min-w-[120px]"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <SortableCategoryRow
                  key={cat.id}
                  cat={cat}
                  hoveredRow={hoveredRow}
                  setHoveredRow={setHoveredRow}
                  openCategory={openCategories}
                  setOpenCategory={setOpenCategories}
                  isCategoryChecked={isCategoryChecked}
                  isCategoryPartial={isCategoryPartial}
                  toggleCategory={toggleCategory}
                  toggleAsset={toggleAsset}
                  selectedAssets={selectedAssets}
                  hoveredCategory={hoveredCategory}
                  activeDrag={activeDrag}
                />
              ))}
            </tbody>
          </table>
        </SortableContext>

        <DragOverlay>
          {activeDrag ? (
            <GhostRow id={activeDrag} categories={categories} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function SortableCategoryRow({
  cat,
  hoveredRow,
  setHoveredRow,
  openCategory,
  setOpenCategory,
  isCategoryChecked,
  isCategoryPartial,
  toggleCategory,
  toggleAsset,
  selectedAssets,
  hoveredCategory,
  activeDrag,
  setCategories,
}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `cat:${cat.id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isActiveHover = hoveredCategory === cat.id;
  const isBeingDragged = activeDrag === `cat:${cat.id}` || isDragging;

  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<any>(null);

  return (
    <>
      <tr
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`transition cursor-pointer select-none
          ${
            isBeingDragged
              ? "bg-blue-200 ring-2 ring-blue-500"
              : isActiveHover
              ? "bg-blue-100 ring-1 ring-blue-300"
              : isCategoryChecked(cat.name)
              ? "bg-blue-50"
              : "hover:bg-gray-50 bg-white"
          }`}
        onMouseEnter={() => setHoveredRow(`cat:${cat.name}`)}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <td colSpan={12} className="py-3 px-4 font-medium text-gray-800">
          <div className="flex items-center gap-2 content-center">
            {hoveredRow === `cat:${cat.name}` && (
              <DragIndicator className="text-[#8E8E93] cursor-grab w-[16px] h-[16px] active:cursor-grabbing" />
            )}

            {hoveredRow === `cat:${cat.name}` && (
              <>
                <input
                  type="checkbox"
                  checked={isCategoryChecked(cat.name)}
                  ref={(el) => {
                    if (el) el.indeterminate = isCategoryPartial(cat.name);
                  }}
                  onChange={(e) => toggleCategory(cat.name, e.target.checked)}
                  className="custom-checkbox"
                />
                <EllipsisVerticalIcon className="w-[16px] h-[16px] text-[#8E8E93] cursor-pointer" />
              </>
            )}

            <button
              onClick={() => {
                setOpenCategory((prev: string[]) =>
                  prev.includes(cat.name)
                    ? prev.filter((name) => name !== cat.name)
                    : [...prev, cat.name]
                );
              }}
            >
              {openCategory.includes(cat.name) ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
              )}
            </button>

            <span className="text-gray-900 font-medium">{cat.name}</span>
          </div>
        </td>
      </tr>

      {openCategory.includes(cat.name) && (
        <SortableContext
          items={cat.assets.map((a: Asset) => `asset:${a.id}:${cat.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {cat.assets.map((a: Asset) => (
            <SortableAssetRow
              key={a.id}
              a={a}
              cat={cat}
              hoveredRow={hoveredRow}
              setHoveredRow={setHoveredRow}
              toggleAsset={toggleAsset}
              selectedAssets={selectedAssets}
              activeDrag={activeDrag}
              editingAssetId={editingAssetId}
              setEditingAssetId={setEditingAssetId}
              editBuffer={editBuffer}
              setEditBuffer={setEditBuffer}
              setCategories={setCategories}
            />
          ))}
        </SortableContext>
      )}
    </>
  );
}

function SortableAssetRow({
  a,
  cat,
  hoveredRow,
  setHoveredRow,
  toggleAsset,
  selectedAssets,
  activeDrag,
  editingAssetId,
  setEditingAssetId,
  editBuffer,
  setEditBuffer,
  setCategories,
}: any) {
  const isEditing = editingAssetId === a.id;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `asset:${a.id}:${cat.id}` });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const isDragging = activeDrag === `asset:${a.id}:${cat.id}`;

  const handleInput = (field: string, value: string) => {
    setEditBuffer((prev: any) => ({ ...prev, [field]: value }));
  };

  const enterEditMode = (a: Asset) => {
    setEditingAssetId(a.id);
    setEditBuffer({ ...a });
  };

  const handleSaveAsset = (cat: Category, a: Asset) => {
    setEditingAssetId(null);
    setEditBuffer(null);
  };

  const handleCancelEdit = () => {
    setEditingAssetId(null);
    setEditBuffer(null);
  };

  function deleteAsset(cat: any, a: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`transition

    ${
      isEditing
        ? "bg-yellow-50 ring-1 ring-yellow-300"
        : isDragging
        ? "bg-blue-200 ring-1 ring-blue-400"
        : selectedAssets[a.name]
        ? "text-[#8E8E93]"
        : "hover:bg-gray-50 bg-white text-[#8E8E93]"
    }

  `}
      onMouseEnter={() => setHoveredRow(`asset:${a.name}`)}
      onMouseLeave={() => setHoveredRow(null)}
    >
      <td className="py-3 px-4 w-[217px]">
        <div
          className={`flex items-center gap-2 ${
            hoveredRow === `asset:${a.name}` || selectedAssets[a.name]
              ? "pl-6"
              : "pl-12"
          }`}
        >
          {hoveredRow === `asset:${a.name}` && (
            <DragIndicator
              className="text-[#8E8E93] cursor-grab w-[16px] h-[16px]"
              {...attributes}
              {...listeners}
            />
          )}

          {(hoveredRow === `asset:${a.name}` || selectedAssets[a.name]) && (
            <input
              type="checkbox"
              checked={!!selectedAssets[a.name]}
              onChange={(e) => toggleAsset(cat.name, a.name, e.target.checked)}
              className="custom-checkbox"
            />
          )}

          {hoveredRow === `asset:${a.name}` && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (editingAssetId === a.id) {
                    handleSaveAsset(cat, a);
                  } else {
                    enterEditMode(a);
                  }
                }}
              >
                {editingAssetId === a.id ? (
                  <Check
                    size={18}
                    className="text-green-700 hover:cursor-pointer hover:text-white hover:bg-green-700"
                  />
                ) : (
                  <Pencil
                    size={18}
                    className="text-green-700 hover:cursor-pointer hover:text-white hover:bg-green-700"
                  />
                )}
              </button>

              <button
                onClick={() => {
                  if (editingAssetId === a.id) {
                    handleCancelEdit();
                  } else {
                    deleteAsset(cat, a);
                  }
                }}
              >
                {editingAssetId === a.id ? (
                  <X
                    size={18}
                    className="text-red-700 hover:cursor-pointer hover:text-white hover:bg-red-700"
                  />
                ) : null}
              </button>
            </div>
          )}

          <span className="text-[#101828] ml-2">
            {isEditing ? (
              <input
                className="border px-1 rounded"
                value={editBuffer.name}
                onChange={(e) => handleInput("name", e.target.value)}
              />
            ) : (
              a.name
            )}
          </span>
        </div>
      </td>

      {[
        "id",
        "share",
        "valuation",
        "volume",
        "marketValue",
        "loan",
        "chain",
        "issuer",
        "custodian",
        "oracle",
        "date",
      ].map((field) => {
        const isShareField = field === "share";

        return (
          <td key={field} className="py-3 px-4 w-[89px]">
            {isEditing ? (
              <input
                className="border px-1 rounded w-full"
                value={editBuffer[field]}
                onChange={(e) => handleInput(field, e.target.value)}
              />
            ) : (
              <span className={isShareField ? a.shareColor : undefined}>
                {a[field]}
              </span>
            )}
          </td>
        );
      })}
    </tr>
  );
}

function GhostRow({ id, categories }: { id: string; categories: any[] }) {
  const parts = id.split(":");

  if (parts[0] === "cat") {
    const category = categories.find((c) => c.id === parts[1]);
    if (!category) return null;
    return (
      <div className="bg-white border shadow-md rounded-md px-4 py-2 w-[600px] opacity-90">
        <strong>{category.name}</strong>
      </div>
    );
  }

  if (parts[0] === "asset") {
    const [_, assetId, catId] = parts;
    const category = categories.find((c) => c.id === catId);
    const asset = category?.assets.find((a: any) => a.id === assetId);
    if (!asset) return null;
    return (
      <div className="flex items-center bg-white border shadow-md rounded-md px-4 py-2 w-[600px] opacity-90">
        <span className="font-medium text-gray-800">{asset.name}</span>
        <span className="ml-auto text-gray-500 text-sm">{asset.id}</span>
      </div>
    );
  }

  return null;
}
