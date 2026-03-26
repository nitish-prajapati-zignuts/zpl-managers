import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ViewAllTeamsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-900 border-l-4 border-l-blue-600 pl-3">
                        All Teams
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/dashboard">
                        <Button variant="outline" size="sm" className="font-bold uppercase tracking-tight text-[11px] h-8 border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </header>
            <main className="flex-1 overflow-auto">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
