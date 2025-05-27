import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { getCountOfWorkoutRoutines, type CountFilter } from "@/model/workoutroutine.model";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

export default function({ limit, filter }: { limit: number, filter?: CountFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(() => parseInt(searchParams.get("page") || "1", 10), [searchParams.get("page")]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const totalRows = await getCountOfWorkoutRoutines(filter);

      setTotalPages(Math.ceil(totalRows / limit));
    }

    fetchData();
  }, [])

  const updatePage = (page: number) => setSearchParams(prev => ({ ...prev, page }));

  return (
    <Pagination className="mt-4">
      <PaginationContent className="border-2 rounded-lg p-0.5 px-1">
        <PaginationItem>
          <Button size="icon" onClick={() => { updatePage(page - 1) }} disabled={page <= 1}>
            <ArrowLeft />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button  >
            {page}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="icon" onClick={() => { updatePage(page + 1) }} disabled={page >= totalPages}>
            <ArrowRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>)
}
