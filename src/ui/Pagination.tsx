import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { getCountOfWorkoutRoutines, type CountFilter } from "@/model/workoutroutine.model";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchControls } from "./SearchControls";

export default function({ filter }: { filter?: CountFilter }) {
  const { limit, page, setPage } = useSearchControls();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const totalRows = await getCountOfWorkoutRoutines(filter);

      setTotalPages(Math.ceil(totalRows / limit));
    }

    fetchData();
  }, [])

  return (
    <Pagination className="mt-4">
      <PaginationContent className="border-2 rounded-lg p-0.5 px-1">
        <PaginationItem>
          <Button size="icon" onClick={() => { setPage(page - 1) }} disabled={page <= 1}>
            <ArrowLeft />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button  >
            {page}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="icon" onClick={() => { setPage(page + 1) }} disabled={page >= totalPages}>
            <ArrowRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>)
}
