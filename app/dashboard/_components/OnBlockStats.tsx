import { CardContent } from "@/components/ui/card"
import { AuctionLog } from "@/app/types/types"

interface OnBlockStatsProps {
    log: AuctionLog
}

export function OnBlockStats({ log }: OnBlockStatsProps) {
    const { statsDetails: s } = log

    return (
        <>
            <CardContent className="flex-1 min-h-0 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 py-4 px-4 md:px-6 border-t bg-slate-50/30 animate-in fade-in duration-700 overflow-auto">

                {/* Batting Column */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-blue-100 pb-1.5">
                        <svg className="h-3.5 w-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4-1 1-4 9.5-9.5z" />
                            <path d="M7 14l-5 5v3h3l5-5" />
                        </svg>
                        <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Batting Stats</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                        <StatCell label="Innings" value={s?.batting?.innings} />
                        <StatCell label="Runs" value={s?.batting?.total_runs} />
                        <StatCell label="SR" value={s?.batting?.strike_rate} valueClass="text-blue-600" />
                        <StatCell label="Avg" value={s?.batting?.average} />
                        <StatCell label="Highest" value={s?.batting?.highest_run} />
                        <StatCell label="4s/6s" value={`${s?.batting?.["4s"] ?? "0"}/${s?.batting?.["6s"] ?? "0"}`} />
                        <StatCell label="50s/100s" value={`${s?.batting?.["50s"] ?? "0"}/${s?.batting?.["100s"] ?? "0"}`} />
                        <StatCell label="Not Out" value={s?.batting?.not_out ?? "0"} valueClass="text-green-600" />
                        <StatCell label="B.Runs" value={s?.batting?.boundary_runs ?? "0"} valueClass="text-blue-700" />
                    </div>
                </div>

                {/* Bowling Column */}
                <div className="space-y-3 md:border-x md:border-slate-200 md:px-4">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                        <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2c1 4 1 16 0 20" />
                            <path d="M12 2c-1 4-1 16 0 20" />
                        </svg>
                        <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Bowling Stats</p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                        <StatCell label="Innings" value={s?.bowling?.innings} />
                        <StatCell label="Wickets" value={s?.bowling?.total_wickets} />
                        <StatCell label="Econ" value={s?.bowling?.economy} valueClass="text-blue-600" />
                        <div className="col-span-2">
                            <p className="text-[9px] text-muted-foreground font-medium uppercase">Style</p>
                            <p className="text-[10px] font-black text-slate-800 leading-tight">{s?.bowling?.bowling_style ?? "-"}</p>
                        </div>
                        <StatCell label="Overs" value={s?.bowling?.overs ?? "0"} />
                        <StatCell label="Maidens" value={s?.bowling?.maidens ?? "0"} />
                        <StatCell label="Runs" value={s?.bowling?.runs ?? "0"} />
                        <StatCell label="Avg" value={s?.bowling?.avg} />
                        <StatCell label="Dot %" value={`${s?.bowling?.dot_ball_percentage ?? "0"}%`} />
                        <StatCell label="WPM" value={s?.bowling?.wickets_per_match} />
                    </div>
                </div>

                {/* Fielding Column */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-green-100 pb-1.5">
                        <svg className="h-3.5 w-3.5 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                        </svg>
                        <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Fielding / WK</p>
                        {s?.fielding?.is_keeper && (
                            <span className="ml-auto text-[7px] font-black px-1 py-0.5 bg-green-100 text-green-700 rounded-sm uppercase border border-green-200">WK</span>
                        )}
                    </div>
                    <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                        <StatCell label="Catches" value={s?.fielding?.catches} />
                        <StatCell label="Stumpings" value={s?.fielding?.stumpings} valueClass="text-green-600" />
                        <StatCell label="Run Outs" value={s?.fielding?.run_outs} />
                        <StatCell label="C&B" value={s?.fielding?.caught_and_bowl} />
                        <StatCell label="Total" value={s?.fielding?.total_dismissal} />
                    </div>
                </div>
            </CardContent>

            {/* Footer */}
            <div className="px-4 md:px-6 py-3 bg-muted/20 shrink-0 flex items-center justify-between border-t shadow-inner">
                <div className="flex gap-3 items-center">
                    <p className="text-[9px] font-bold uppercase text-muted-foreground hidden sm:block">Season Stats:</p>
                    <div className="flex gap-1 items-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded border border-slate-200 uppercase">
                            Matches: {s?.total_match ?? "-"}
                        </span>
                        {s?.is_mvp && (
                            <span className="text-[10px] font-black px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded border border-yellow-200 uppercase">
                                MVP
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                        <div className="h-5 w-5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">PWR</div>
                        <div className="h-5 w-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">FIN</div>
                        <div className="h-5 w-5 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">EXP</div>
                    </div>
                    <p className="text-[9px] font-black uppercase text-slate-400 hidden sm:block">Elite Category</p>
                </div>
            </div>
        </>
    )
}

// ---------------------------------------------------------------------------
// Internal helper — single stat cell
// ---------------------------------------------------------------------------

function StatCell({
    label,
    value,
    valueClass = "text-slate-800",
}: {
    label: string
    value?: string | number | null
    valueClass?: string
}) {
    return (
        <div>
            <p className="text-[9px] text-muted-foreground font-medium uppercase">{label}</p>
            <p className={`text-sm font-black ${valueClass}`}>{value ?? "-"}</p>
        </div>
    )
}