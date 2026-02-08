import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function DashboardPagination({ page, totalPages, onChange }) {
  return (
    <Pagination>
      <PaginationContent className="gap-3">
        <PaginationItem>
          <PaginationPrevious onClick={() => onChange(Math.max(1, page - 1))} className={`
              rounded-xl border
              border-[#caa272]
              bg-[#f4f0e5]
              text-[#9d1a1f]
              hover:bg-[#9d1a1f]
              hover:text-white
              transition
              ${page === 1 ? "pointer-events-none opacity-40" : ""}
            `} />
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1
          const isActive = page === pageNumber
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => onChange(pageNumber)}
                isActive={isActive}
                className={`
                  rounded-2xl min-w-[40px] text-center font-medium transition
                  ${
                    isActive
                      ? "bg-[#9d1a1f] text-white shadow-md"
                      : "bg-[#f4f0e5] text-[#9d1a1f] border border-[#caa272] hover:bg-[#caa272]/30"
                  }
                `}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext onClick={() => onChange(Math.min(totalPages, page + 1))} className={`
              rounded-xl border
              border-[#caa272]
              bg-[#f4f0e5]
              text-[#9d1a1f]
              hover:bg-[#9d1a1f]
              hover:text-white
              transition
              ${page === totalPages ? "pointer-events-none opacity-40" : ""}
            `}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}