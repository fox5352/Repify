import { Menubar, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarTrigger } from "@/components/ui/menubar";
import type { SortFilter } from "@/model/workoutroutine.model"
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useSearchParams } from "react-router";

export interface SearchControlsState {
  sortOrder: SortFilter;
  limit: number;
  page: number;
}

interface SearchControlFuncs {
  setSortOrder: (order: SortFilter) => void;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
}

const SearchControlsContext = createContext<SearchControlsState & SearchControlFuncs | null>(null);

export function SearchControlsProvider({ children }: { children: ReactNode | string }) {
  const [params, setParams] = useSearchParams();
  const state = useMemo(() => {
    return {
      limit: parseInt(params.get("limit") || "10", 10),
      page: parseInt(params.get("page") || "1", 10),
      sortOrder: params.get("order") as SortFilter || "dcs"
    } as SearchControlsState;
  }, [params.get("page"), params.get("limit"), params.get("order")]);

  const update = (value: any) =>
    setParams(prev => {
      const newParams = new URLSearchParams(prev);
      for (const [key, val] of Object.entries(value)) {
        newParams.set(key, `${val}`);
      }
      return newParams
    })

  const setSortOrder = (order: SortFilter) => update({ order });

  const setLimit = (limit: number) => update({ limit });

  const setPage = (page: number) => update({ page });

  const value = {
    ...state,
    setSortOrder,
    setLimit,
    setPage
  }

  return (
    <SearchControlsContext.Provider value={value}>
      {children}
    </SearchControlsContext.Provider>
  )
}

export const useSearchControls = () => {
  const ctx = useContext(SearchControlsContext);
  if (!ctx) throw new Error("SearchControlsProvider not found");
  return ctx;
}


export default function() {
  const { sortOrder, setSortOrder, limit, setLimit } = useSearchControls();

  const updateSortOrder = (order: string) => setSortOrder(order as SortFilter || "acs");

  const updateLimit = (limit: string) => setLimit(parseInt(limit, 10) || 10)

  return (
    <Menubar className="max-w-sm mx-auto my-8">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center text-sm">
          Sort Order:
          {sortOrder == "acs" ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={sortOrder} onValueChange={updateSortOrder}>
            <MenubarRadioItem value="acs">Oldest</MenubarRadioItem>
            <MenubarRadioItem value="dcs">Newest</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Limit: {limit}</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={`${limit}`} onValueChange={updateLimit}>
            <MenubarRadioItem value="10">10</MenubarRadioItem>
            <MenubarRadioItem value="20">20</MenubarRadioItem>
            <MenubarRadioItem value="50">50</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
