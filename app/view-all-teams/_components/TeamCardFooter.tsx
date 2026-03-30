interface TeamCardFooterProps {
    teamColor: string
}

export function TeamCardFooter({ teamColor }: TeamCardFooterProps) {
    return (
        <div
            className="p-2 border-t flex justify-center items-center"
            style={{ borderColor: `${teamColor}44`, backgroundColor: `${teamColor}18` }}
        >
            <div className="flex gap-1.5">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${teamColor}99` }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${teamColor}55` }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${teamColor}99` }} />
            </div>
        </div>
    )
}