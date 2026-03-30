import Image from "next/image"
import { Users } from "lucide-react"
import { TeamConfig } from "@/app/types/types"
import { isLightColor } from "@/app/constants"

interface TeamCardHeaderProps {
    name: string
    captainName?: string
    managerName?: string
    teamConfig: TeamConfig
}

export function TeamCardHeader({ name, captainName, managerName, teamConfig }: TeamCardHeaderProps) {
    const { color, logo } = teamConfig
    const isLight = isLightColor(color)
    const textColor = isLight ? "#000000" : "#ffffff"
    const subtitleColor = isLight ? "#0d0d14cc" : "#ffffffaa"
    const metaColor = isLight ? "#0d0d1499" : "#ffffff66"
    const logoBg = isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"

    return (
        <div
            className="relative p-4 flex items-start justify-between"
            style={{ backgroundColor: color }}
        >
            <div className="flex-1 min-w-0 pr-2">
                <h2
                    className="text-lg font-black tracking-widest uppercase leading-tight truncate"
                    style={{ color: textColor }}
                >
                    {name}
                </h2>
                <p
                    className="text-[12px] font-bold uppercase tracking-widest truncate italic mt-1"
                    style={{ color: subtitleColor }}
                >
                    Captain: {captainName}
                </p>
                <p
                    className="text-[12px] font-medium uppercase tracking-widest truncate mt-0.5"
                    style={{ color: metaColor }}
                >
                    Manager: {managerName}
                </p>
            </div>

            <div
                className="shrink-0 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: logoBg }}
            >
                {logo ? (
                    <Image
                        src={logo}
                        alt={name}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain p-1"
                    />
                ) : (
                    <Users size={20} className={isLight ? "text-black/40" : "text-white/40"} />
                )}
            </div>
        </div>
    )
}