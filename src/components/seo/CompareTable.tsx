import type { CompareRow } from "@/content/synq-vs-spreadsheets";

/* Spreadsheet vs Synq, row by row. A real table (headers stay with their
   cells for screen readers); on phones each row becomes a small card with
   the column name above each cell. Where the spreadsheet holds its own, the
   row says so. */
export default function CompareTable({ rows }: { rows: CompareRow[] }) {
  return (
    <div className="synq-card overflow-hidden">
      <table className="compare-table text-[14.5px] leading-[1.55]">
        <caption className="sr-only">Pricing trading cards in a spreadsheet compared with Synq</caption>
        <thead>
          <tr className="border-b border-black/[0.06] bg-[#fafafa]">
            <th scope="col" className="w-[24%] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
              Task
            </th>
            <th scope="col" className="w-[34%] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
              Spreadsheet
            </th>
            <th scope="col" className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink)]">
              Synq
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.task}>
              <th scope="row" className="text-[15px] font-[650] tracking-[-0.01em] text-[var(--color-ink)]">
                {r.task}
              </th>
              <td data-label="Spreadsheet" className="text-[var(--color-ink-2)]">
                {r.sheet}
                {r.sheetWins && (
                  <span className="ml-2 inline-flex translate-y-[-1px] max-md:mt-1.5 max-md:ml-0 max-md:flex max-md:w-fit max-md:translate-y-0 items-center rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-set)]">
                    Spreadsheet holds up
                  </span>
                )}
              </td>
              <td data-label="Synq" className="text-[var(--color-ink)]">
                <span className="flex gap-2.5">
                  {r.sheetWins ? (
                    <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-ink-4)] mx-[5px]" aria-hidden="true" />
                  ) : (
                  <svg
                    className="mt-[3px] h-4 w-4 flex-none text-[var(--color-green)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                  )}
                  <span>{r.synq}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
