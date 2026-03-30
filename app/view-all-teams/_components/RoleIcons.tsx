import { UserCircle } from "lucide-react"

export const BatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-amber-500">
        <path d="M18.5 3.5a2.121 2.121 0 0 1 3 3L8.5 19.5a2.121 2.121 0 0 1-3-3L18.5 3.5z" />
        <path d="m7.5 15.5-3 3" />
    </svg>
)

export const BallIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-blue-500">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 0 0 18" />
        <path d="M12 8a4 4 0 0 1 0 8" />
    </svg>
)

export const FieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-green-500">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
)

export const KeepIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-purple-500">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="M8 10h8" />
        <path d="M8 14h8" />
    </svg>
)

export const getRoleIcon = (role?: string) => {
    switch (role?.toLowerCase()) {
        case "batsmen":
        case "batsman":
            return <BatIcon />
        case "bowler":
        case "bowling":
            return <BallIcon />
        case "fielder":
        case "fielding":
            return <FieldIcon />
        case "wicketkeeper":
        case "wk":
        case "keeper":
            return <KeepIcon />
        default:
            return <UserCircle className="h-3 w-3 text-slate-400" />
    }
}