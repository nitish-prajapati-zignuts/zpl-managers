// "use client"

// import * as React from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Users, User, ShieldCheck, Zap, Target, Hand, UserCircle, Clock, DollarSign, Award } from "lucide-react"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { useTeamPlayerById, useTeams } from "@/app/services/query"

// enum PlayerRole {
//     Batsman = "bat",
//     Bowler = "bowl",
//     Fielder = "field",
//     WicketKeeper = "wk"
// }

// // Custom SVG Icons for Cricket Roles
// const BatIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-amber-500">
//         <path d="M18.5 3.5a2.121 2.121 0 0 1 3 3L8.5 19.5a2.121 2.121 0 0 1-3-3L18.5 3.5z" />
//         <path d="m7.5 15.5-3 3" />
//     </svg>
// )

// const BallIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-blue-500">
//         <circle cx="12" cy="12" r="9" />
//         <path d="M12 3a9 9 0 0 0 0 18" />
//         <path d="M12 8a4 4 0 0 1 0 8" />
//     </svg>
// )

// const FieldIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-green-500">
//         <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
//         <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
//         <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
//         <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
//     </svg>
// )

// const KeepIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-purple-500">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
//         <path d="M8 10h8" />
//         <path d="M8 14h8" />
//     </svg>
// )

// const teamsData = [
//     {
//         id: 1,
//         name: "Mumbai Mavericks",
//         captain: "Rohit Sharma",
//         manager: "Mahela Jayawardene",
//         spent: 785000000,
//         players: [
//             { name: "Ishan Kishan", roles: [PlayerRole.WicketKeeper, PlayerRole.Batsman], price: "15.5 Cr" },
//             { name: "Suryakumar Yadav", roles: [PlayerRole.Batsman], price: "8.0 Cr" },
//             { name: "Jasprit Bumrah", roles: [PlayerRole.Bowler], price: "12.0 Cr" },
//             { name: "Tim David", roles: [PlayerRole.Batsman], price: "8.25 Cr" },
//             { name: "Hardik Pandya", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "15.0 Cr" },
//             { name: "Tilak Varma", roles: [PlayerRole.Batsman], price: "1.7 Cr" },
//             { name: "Gerald Coetzee", roles: [PlayerRole.Bowler], price: "5.0 Cr" },
//             { name: "Nehal Wadhera", roles: [PlayerRole.Batsman, PlayerRole.Fielder], price: "20 L" },
//             { name: "Piyush Chawla", roles: [PlayerRole.Bowler], price: "50 L" },
//             { name: "Akash Madhwal", roles: [PlayerRole.Bowler], price: "20 L" },
//             { name: "Vishnu Vinod", roles: [PlayerRole.Batsman], price: "20 L" },
//             { name: "Shivalik Sharma", roles: [PlayerRole.Fielder], price: "20 L" },
//             { name: "Anshul Kamboj", roles: [PlayerRole.Bowler], price: "20 L" },
//             { name: "Mohammad Nabi", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "1.5 Cr" },
//             { name: "Romario Shepherd", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "50 L" }
//         ],
//         color: "blue"
//     },
//     {
//         id: 2,
//         name: "Chennai Champions",
//         captain: "MS Dhoni",
//         manager: "Stephen Fleming",
//         spent: 820000000,
//         players: [
//             { name: "Ruturaj Gaikwad", roles: [PlayerRole.Batsman], price: "6 Cr" },
//             { name: "Ravindra Jadeja", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "16 Cr" },
//             { name: "Matheesha Pathirana", roles: [PlayerRole.Bowler], price: "20 L" },
//             { name: "Shivam Dube", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "4 Cr" },
//             { name: "Ajinkya Rahane", roles: [PlayerRole.Batsman], price: "50 L" },
//             { name: "Deepak Chahar", roles: [PlayerRole.Bowler], price: "14 Cr" },
//             { name: "Maheesh Theekshana", roles: [PlayerRole.Bowler], price: "70 L" },
//             { name: "Daryl Mitchell", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "14 Cr" },
//             { name: "Sameer Rizvi", roles: [PlayerRole.Batsman], price: "8.4 Cr" },
//             { name: "Mustafizur Rahman", roles: [PlayerRole.Bowler], price: "2 Cr" },
//             { name: "Rachin Ravindra", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "1.8 Cr" },
//             { name: "Shardul Thakur", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "4 Cr" },
//             { name: "Mitchell Santner", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "1.9 Cr" },
//             { name: "Moeen Ali", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "8 Cr" },
//             { name: "Devon Conway", roles: [PlayerRole.WicketKeeper, PlayerRole.Batsman], price: "1 Cr" }
//         ],
//         color: "yellow"
//     },
//     {
//         id: 3,
//         name: "Delhi Dynamos",
//         captain: "Rishabh Pant",
//         manager: "Ricky Ponting",
//         spent: 712000000,
//         players: [
//             { name: "David Warner", roles: [PlayerRole.Batsman], price: "6.25 Cr" },
//             { name: "Axar Patel", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "9 Cr" },
//             { name: "Kuldeep Yadav", roles: [PlayerRole.Bowler], price: "2 Cr" },
//             { name: "Mitchell Marsh", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "6.5 Cr" },
//             { name: "Prithvi Shaw", roles: [PlayerRole.Batsman], price: "8 Cr" },
//             { name: "Anrich Nortje", roles: [PlayerRole.Bowler], price: "6.5 Cr" },
//             { name: "Abishek Porel", roles: [PlayerRole.WicketKeeper, PlayerRole.Batsman], price: "20 L" },
//             { name: "Khaleel Ahmed", roles: [PlayerRole.Bowler], price: "5.25 Cr" },
//             { name: "Ishant Sharma", roles: [PlayerRole.Bowler], price: "50 L" },
//             { name: "Lalit Yadav", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "65 L" },
//             { name: "Pravin Dubey", roles: [PlayerRole.Bowler], price: "50 L" },
//             { name: "Jake Fraser-McGurk", roles: [PlayerRole.Batsman], price: "50 L" },
//             { name: "Jhye Richardson", roles: [PlayerRole.Bowler], price: "5 Cr" },
//             { name: "Shai Hope", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "75 L" },
//             { name: "Tristan Stubbs", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "50 L" }
//         ],
//         color: "red"
//     },
//     {
//         id: 4,
//         name: "Bangalore Blasters",
//         captain: "Faf du Plessis",
//         manager: "Andy Flower",
//         spent: 884000000,
//         players: [
//             { name: "Virat Kohli", roles: [PlayerRole.Batsman], price: "15 Cr" },
//             { name: "Glenn Maxwell", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "11 Cr" },
//             { name: "Mohammed Siraj", roles: [PlayerRole.Bowler], price: "7 Cr" },
//             { name: "Cameron Green", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "17.5 Cr" },
//             { name: "Rajat Patidar", roles: [PlayerRole.Batsman], price: "20 L" },
//             { name: "Anuj Rawat", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "3.4 Cr" },
//             { name: "Dinesh Karthik", roles: [PlayerRole.WicketKeeper, PlayerRole.Batsman], price: "5.5 Cr" },
//             { name: "Suyash Prabhudessai", roles: [PlayerRole.Fielder, PlayerRole.Batsman], price: "30 L" },
//             { name: "Will Jacks", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "3.2 Cr" },
//             { name: "Mahipal Lomror", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "95 L" },
//             { name: "Karn Sharma", roles: [PlayerRole.Bowler], price: "50 L" },
//             { name: "Mayank Dagar", roles: [PlayerRole.Bowler], price: "15 L" },
//             { name: "Vijaykumar Vyshak", roles: [PlayerRole.Bowler], price: "20 L" },
//             { name: "Alzarri Joseph", roles: [PlayerRole.Bowler], price: "11.5 Cr" },
//             { name: "Yash Dayal", roles: [PlayerRole.Bowler], price: "5 Cr" }
//         ],
//         color: "red"
//     },
//     {
//         id: 5,
//         name: "Kolkata Knights",
//         captain: "Shreyas Iyer",
//         manager: "Chandrakant Pandit",
//         spent: 768000000,
//         players: [
//             { name: "Andre Russell", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "12 Cr" },
//             { name: "Sunil Narine", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "6 Cr" },
//             { name: "Rinku Singh", roles: [PlayerRole.Batsman], price: "55 L" },
//             { name: "Mitchell Starc", roles: [PlayerRole.Bowler], price: "24.75 Cr" },
//             { name: "Nitish Rana", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "8 Cr" },
//             { name: "Venkatesh Iyer", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "8 Cr" },
//             { name: "Phil Salt", roles: [PlayerRole.WicketKeeper, PlayerRole.Batsman], price: "1.5 Cr" },
//             { name: "Rahmanullah Gurbaz", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "50 L" },
//             { name: "Ramandeep Singh", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "20 L" },
//             { name: "Varun Chakaravarthy", roles: [PlayerRole.Bowler], price: "8 Cr" },
//             { name: "Suyash Sharma", roles: [PlayerRole.Bowler], price: "20 L" },
//             { name: "Anukul Roy", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "20 L" },
//             { name: "Harshit Rana", roles: [PlayerRole.Bowler], price: "20 L" },
//             { name: "Vaibhav Arora", roles: [PlayerRole.Bowler], price: "2 Cr" },
//             { name: "Dushmantha Chameera", roles: [PlayerRole.Bowler], price: "50 L" }
//         ],
//         color: "purple"
//     },
//     {
//         id: 6,
//         name: "Punjab Power",
//         captain: "Shikhar Dhawan",
//         manager: "Trevor Bayliss",
//         spent: 655000000,
//         players: [
//             { name: "Liam Livingstone", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "11.5 Cr" },
//             { name: "Sam Curran", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "18.5 Cr" },
//             { name: "Arshdeep Singh", roles: [PlayerRole.Bowler], price: "4 Cr" },
//             { name: "Kagiso Rabada", roles: [PlayerRole.Bowler], price: "9.25 Cr" },
//             { name: "Jonny Bairstow", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "6.75 Cr" },
//             { name: "Jitesh Sharma", roles: [PlayerRole.WicketKeeper, PlayerRole.Batsman], price: "20 L" },
//             { name: "Prabhsimran Singh", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "60 L" },
//             { name: "Harpreet Brar", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "3.8 Cr" },
//             { name: "Rahul Chahar", roles: [PlayerRole.Bowler], price: "5.25 Cr" },
//             { name: "Sikandar Raza", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "50 L" },
//             { name: "Rilee Rossouw", roles: [PlayerRole.Batsman], price: "8 Cr" },
//             { name: "Harshal Patel", roles: [PlayerRole.Bowler], price: "11.75 Cr" },
//             { name: "Chris Woakes", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "4.2 Cr" },
//             { name: "Vidwath Kaverappa", roles: [PlayerRole.Bowler], price: "20 L" },
//             { name: "Ashutosh Sharma", roles: [PlayerRole.Batsman, PlayerRole.Fielder], price: "20 L" }
//         ],
//         color: "red"
//     },
//     {
//         id: 7,
//         name: "Rajasthan Royals",
//         captain: "Sanju Samson",
//         manager: "Kumar Sangakkara",
//         spent: 793000000,
//         players: [
//             { name: "Jos Buttler", roles: [PlayerRole.WicketKeeper, PlayerRole.Batsman], price: "10 Cr" },
//             { name: "Yashasvi Jaiswal", roles: [PlayerRole.Batsman], price: "4 Cr" },
//             { name: "Trent Boult", roles: [PlayerRole.Bowler], price: "8 Cr" },
//             { name: "Yuzvendra Chahal", roles: [PlayerRole.Bowler], price: "6.5 Cr" },
//             { name: "Shimron Hetmyer", roles: [PlayerRole.Batsman], price: "8.5 Cr" },
//             { name: "Dhruv Jurel", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "20 L" },
//             { name: "Riyan Parag", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "3.8 Cr" },
//             { name: "Ravichandran Ashwin", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "5 Cr" },
//             { name: "Avesh Khan", roles: [PlayerRole.Bowler], price: "10 Cr" },
//             { name: "Adam Zampa", roles: [PlayerRole.Bowler], price: "1.5 Cr" },
//             { name: "Navdeep Saini", roles: [PlayerRole.Bowler], price: "2.6 Cr" },
//             { name: "Sandeep Sharma", roles: [PlayerRole.Bowler], price: "50 L" },
//             { name: "Nandre Burger", roles: [PlayerRole.Bowler], price: "50 L" },
//             { name: "Rovman Powell", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "7.4 Cr" },
//             { name: "Tom Kohler-Cadmore", roles: [PlayerRole.Batsman, PlayerRole.Fielder], price: "40 L" }
//         ],
//         color: "pink"
//     },
//     {
//         id: 8,
//         name: "Gujarat Giants",
//         captain: "Shubman Gill",
//         manager: "Ashish Nehra",
//         spent: 731000000,
//         players: [
//             { name: "Rashid Khan", roles: [PlayerRole.Bowler, PlayerRole.Batsman], price: "15 Cr" },
//             { name: "David Miller", roles: [PlayerRole.Batsman], price: "3 Cr" },
//             { name: "Sai Sudharsan", roles: [PlayerRole.Batsman], price: "20 L" },
//             { name: "Kane Williamson", roles: [PlayerRole.Batsman], price: "2 Cr" },
//             { name: "Rahul Tewatia", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "9 Cr" },
//             { name: "Vijay Shankar", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "4 Cr" },
//             { name: "Mohit Sharma", roles: [PlayerRole.Bowler], price: "50 L" },
//             { name: "Noor Ahmad", roles: [PlayerRole.Bowler], price: "30 L" },
//             { name: "Umesh Yadav", roles: [PlayerRole.Bowler], price: "5.75 Cr" },
//             { name: "Shahrukh Khan", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "7.4 Cr" },
//             { name: "Sushant Mishra", roles: [PlayerRole.Bowler, PlayerRole.Fielder], price: "2.2 Cr" },
//             { name: "Kartik Tyagi", roles: [PlayerRole.Bowler], price: "60 L" },
//             { name: "Azmatullah Omarzai", roles: [PlayerRole.Batsman, PlayerRole.Bowler], price: "50 L" },
//             { name: "Spencer Johnson", roles: [PlayerRole.Bowler], price: "10 Cr" },
//             { name: "Robin Minz", roles: [PlayerRole.Batsman, PlayerRole.WicketKeeper], price: "3.6 Cr" }
//         ],
//         color: "orange"
//     }
// ]

// const TOTAL_BUDGET = 1000000000 // 10 Cr

// export default function ViewAllTeams() {
//     const [selectedPlayer, setSelectedPlayer] = React.useState<any>(null)
//     const [open, setOpen] = React.useState(false)

//     const { data: teams, isLoading: isStatsLoading } = useTeams()

//     const getColorClasses = (color: string) => {
//         switch (color) {
//             case "blue": return { bg: "bg-blue-100", text: "text-blue-600", border: "border-t-blue-600" }
//             case "yellow": return { bg: "bg-yellow-100", text: "text-yellow-600", border: "border-t-yellow-600" }
//             case "red": return { bg: "bg-red-100", text: "text-red-600", border: "border-t-red-600" }
//             case "purple": return { bg: "bg-purple-100", text: "text-purple-600", border: "border-t-purple-600" }
//             case "pink": return { bg: "bg-pink-100", text: "text-pink-600", border: "border-t-pink-600" }
//             case "orange": return { bg: "bg-orange-100", text: "text-orange-600", border: "border-t-orange-600" }
//             default: return { bg: "bg-slate-100", text: "text-slate-600", border: "border-t-slate-600" }
//         }
//     }

//     const getRoleIcon = (role: string) => {
//         switch (role) {
//             case PlayerRole.Batsman: return <BatIcon />
//             case PlayerRole.Bowler: return <BallIcon />
//             case PlayerRole.Fielder: return <FieldIcon />
//             case PlayerRole.WicketKeeper: return <KeepIcon />
//             default: return <UserCircle className="h-3 w-3 text-slate-400" />
//         }
//     }

//     const handlePlayerClick = (player: any) => {
//         setSelectedPlayer(player)
//         setOpen(true)
//     }

//     return (
//         <div className="p-4 bg-slate-50 min-h-screen">
//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//                 {teamsData.map((team) => {
//                     const colors = getColorClasses(team.color)
//                     const remaining = TOTAL_BUDGET - team.spent
//                     return (
//                         <Card key={team.id} className={`overflow-hidden shadow-md hover:shadow-xl transition-all border-t-8 ${colors.border}`}>
//                             <CardHeader className="bg-white p-5 border-b border-slate-100">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <div className="space-y-1">
//                                         <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${colors.bg} ${colors.text}`}>
//                                             Premier League
//                                         </span>
//                                         <CardTitle className="text-xl font-black tracking-tight uppercase italic text-slate-900 leading-none">
//                                             {team.name}
//                                         </CardTitle>
//                                     </div>
//                                     <div className={`p-2.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner`}>
//                                         <Users className={`h-5 w-5 ${colors.text}`} />
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
//                                         <div className="flex items-center gap-1.5 mb-1">
//                                             <Award className="h-3 w-3 text-amber-500" />
//                                             <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Captain</span>
//                                         </div>
//                                         <p className="text-xs font-black text-slate-900 truncate tracking-tight">{team.captain}</p>
//                                     </div>
//                                     <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
//                                         <div className="flex items-center gap-1.5 mb-1">
//                                             <UserCircle className="h-3 w-3 text-blue-500" />
//                                             <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Manager</span>
//                                         </div>
//                                         <p className="text-xs font-bold text-slate-700 truncate tracking-tight">{team.manager}</p>
//                                     </div>
//                                     <div className="p-2.5 rounded-xl bg-red-50/50 border border-red-100 shadow-sm">
//                                         <div className="flex items-center gap-1.5 mb-1">
//                                             <DollarSign className="h-3 w-3 text-red-500" />
//                                             <span className="block text-[9px] font-black uppercase text-red-400 tracking-wider font-mono">Spent</span>
//                                         </div>
//                                         <p className="text-sm font-black text-red-700 tracking-tighter italic">₹{(team.spent / 10000000).toFixed(2)} Cr</p>
//                                     </div>
//                                     <div className="p-2.5 rounded-xl bg-green-50/50 border border-green-100 shadow-sm">
//                                         <div className="flex items-center gap-1.5 mb-1">
//                                             <Clock className="h-3 w-3 text-green-500" />
//                                             <span className="block text-[9px] font-black uppercase text-green-400 tracking-wider font-mono">Balance</span>
//                                         </div>
//                                         <p className="text-sm font-black text-green-700 tracking-tighter italic">₹{(remaining / 10000000).toFixed(2)} Cr</p>
//                                     </div>
//                                 </div>
//                             </CardHeader>
//                             <CardContent className="p-0">
//                                 <div className="bg-white">
//                                     <div className="px-5 py-3 bg-slate-100/30 flex items-center justify-between border-b border-slate-100">
//                                         <span className="text-xs font-black uppercase text-slate-500 tracking-widest leading-none">Squad Roster ({team.players.length})</span>
//                                     </div>
//                                     <ul className="grid grid-cols-2 divide-x divide-slate-100">
//                                         <div className="divide-y divide-slate-50">
//                                             {team.players.slice(0, 8).map((player, index) => (
//                                                 <li key={index} onClick={() => handlePlayerClick(player)} className="px-4 py-3.5 flex items-center justify-between group/player hover:bg-slate-50 cursor-pointer transition-all active:scale-[0.98]">
//                                                     <span className="text-xs font-bold uppercase tracking-tight text-slate-800 truncate mr-1 group-hover/player:translate-x-1 transition-transform">{player.name.split(' ').pop()}</span>
//                                                     <div className="flex gap-1 shrink-0 opacity-40 group-hover/player:opacity-100 transition-all scale-95 group-hover/player:scale-100">
//                                                         {player.roles.map((role, idx) => (
//                                                             <React.Fragment key={idx}>{getRoleIcon(role)}</React.Fragment>
//                                                         ))}
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </div>
//                                         <div className="divide-y divide-slate-50">
//                                             {team.players.slice(8).map((player, index) => (
//                                                 <li key={index} onClick={() => handlePlayerClick(player)} className="px-4 py-3.5 flex items-center justify-between group/player hover:bg-slate-50 cursor-pointer transition-all active:scale-[0.98]">
//                                                     <span className="text-xs font-bold uppercase tracking-tight text-slate-800 truncate mr-1 group-hover/player:translate-x-1 transition-transform">{player.name.split(' ').pop()}</span>
//                                                     <div className="flex gap-1 shrink-0 opacity-40 group-hover/player:opacity-100 transition-all scale-95 group-hover/player:scale-100">
//                                                         {player.roles.map((role, idx) => (
//                                                             <React.Fragment key={idx}>{getRoleIcon(role)}</React.Fragment>
//                                                         ))}
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </div>
//                                     </ul>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     )
//                 })}
//             </div>

//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent className="sm:max-w-md border-none shadow-2xl overflow-hidden rounded-3xl p-0">
//                     <div className="bg-slate-900 p-8 text-white relative">
//                         <div className="absolute top-0 right-0 p-8 opacity-10">
//                             <Users size={120} />
//                         </div>
//                         <DialogHeader className="relative z-10">
//                             <div className="flex items-center gap-2 mb-2">
//                                 <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">Player Profile</span>
//                                 <div className="flex gap-1">
//                                     {selectedPlayer?.roles.map((role: string, idx: number) => (
//                                         <div key={idx} className="p-1 rounded bg-white/10 backdrop-blur-sm">
//                                             {getRoleIcon(role)}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-1">
//                                 {selectedPlayer?.name}
//                             </DialogTitle>
//                             <DialogDescription className="text-slate-400 font-bold uppercase text-[11px] tracking-widest italic">
//                                 Season 2024 • Official Squad Member
//                             </DialogDescription>
//                         </DialogHeader>
//                     </div>

//                     <div className="p-8 bg-white grid gap-6">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
//                                 <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 font-mono">Current Value</span>
//                                 <p className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">
//                                     ₹{selectedPlayer?.price}
//                                 </p>
//                             </div>
//                             <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner flex flex-col justify-center items-center">
//                                 <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 font-mono">Status</span>
//                                 <div className="flex items-center gap-1.5">
//                                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
//                                     <p className="text-xl font-black text-green-600 uppercase italic tracking-tight">Active</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* --- PLAYER STATISTICS SECTION --- */}
//                         <div className="space-y-3">
//                             <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">Recent Stats</span>
//                             <div className="grid grid-cols-3 gap-3">
//                                 {isStatsLoading ? (
//                                     Array.from({ length: 3 }).map((_, i) => (
//                                         <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 animate-pulse h-16" />
//                                     ))
//                                 ) : (
//                                     <>
//                                         <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                             <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Matches</span>
//                                             <p className="text-xl font-black text-slate-900">{playerStats?.data?.matches || 0}</p>
//                                         </div>
//                                         <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                             <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Runs</span>
//                                             <p className="text-xl font-black text-slate-900">{playerStats?.data?.runs || 0}</p>
//                                         </div>
//                                         <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                             <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Wickets</span>
//                                             <p className="text-xl font-black text-slate-900">{playerStats?.data?.wickets || 0}</p>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
//                                 <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
//                                     <Award className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Performance Tier</p>
//                                     <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Top Tier League Standard</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
//                                 <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
//                                     <Clock className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Availability</p>
//                                     <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Full Season Reservation</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <button 
//                             onClick={() => setOpen(false)}
//                             className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 italic"
//                         >
//                             Return to Dashboard
//                         </button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

"use client"

import * as React from "react"
import Image from "next/image"
import { Users, Award, Clock } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useTeams } from "@/app/services/query"
import { formatAmount, isLightColor } from "@/lib/utils"
import { TEAM_CONFIG } from "@/lib/config"

// Custom SVG Icons for Cricket Roles
const BatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-amber-500">
        <path d="M18.5 3.5a2.121 2.121 0 0 1 3 3L8.5 19.5a2.121 2.121 0 0 1-3-3L18.5 3.5z" />
        <path d="m7.5 15.5-3 3" />
    </svg>
)

const BallIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-blue-500">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 0 0 18" />
        <path d="M12 8a4 4 0 0 1 0 8" />
    </svg>
)

const FieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-green-500">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
)

const KeepIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-purple-500">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="M8 10h8" />
        <path d="M8 14h8" />
    </svg>
)

const getRoleIcon = (role: string) => {
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
            return <Users className="h-3 w-3 text-slate-400" />
    }
}

const findStatsForPlayer = (playerStats: any[], playerId: string) => {
    return playerStats?.find((s: any) => s.playerRef === playerId) ?? null
}

export default function ViewAllTeams() {
    const [selectedPlayer, setSelectedPlayer] = React.useState<any>(null)
    const [selectedStats, setSelectedStats] = React.useState<any>(null)
    const [open, setOpen] = React.useState(false)

    const { data: teamsResponse, isLoading: isTeamsLoading } = useTeams()
    const teams: any[] = teamsResponse?.data ?? []

    const handlePlayerClick = (player: any, stats: any) => {
        setSelectedPlayer(player)
        setSelectedStats(stats)
        setOpen(true)
    }

    return (
        <div className="p-4 bg-slate-50 min-h-screen">
            {isTeamsLoading ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {teams.map((team: any) => {
                        const teamNameKey = team.name?.toUpperCase().trim() || ""
                        const teamConfig = TEAM_CONFIG[teamNameKey] || { color: "#64748b", logo: null, bg: "#f1f5f9" }
                        const spent = (team.totalBudget ?? 0) - (team.budgetRemaining ?? 0)
                        const remaining = team.budgetRemaining ?? 0
                        const players: any[] = [...(team.players ?? [])].sort((a, b) => {
                            const amountA = a.finalAmount || a.basePrice || 0;
                            const amountB = b.finalAmount || b.basePrice || 0;
                            return amountB - amountA;
                        });
                        const playerStats: any[] = team.playerStats ?? []
                        const teamColor = teamConfig.color;
                        const isLight = isLightColor(teamColor);
                        const textColor = isLight ? "#000000" : "#ffffff";

                        return (
                            <section
                                key={team._id}
                                className="flex flex-col rounded-xl shadow-2xl overflow-hidden transition-all duration-300 group min-h-[550px]"
                                style={{ border: `1.5px solid ${teamColor}55` }}
                            >
                                <div
                                    className="relative p-4 flex items-start justify-between"
                                    style={{ backgroundColor: teamColor }}
                                >
                                    <div className="flex-1 min-w-0 pr-2">
                                        <h2
                                            className="text-lg font-black tracking-widest uppercase leading-tight truncate"
                                            style={{ color: textColor }}
                                        >
                                            {team.name}
                                        </h2>
                                        <p
                                            className="text-[12px] font-bold uppercase tracking-widest truncate italic mt-1"
                                            style={{ color: isLight ? "#0d0d14cc" : "#ffffffaa" }}
                                        >
                                            Captain: {team.captainName}
                                        </p>
                                        <p
                                            className="text-[12px] font-medium uppercase tracking-widest truncate mt-0.5"
                                            style={{ color: isLight ? "#0d0d1499" : "#ffffff66" }}
                                        >
                                            Manager: {team.managerName}
                                        </p>
                                    </div>

                                    <div
                                        className="shrink-0 rounded-xl flex items-center justify-center overflow-hidden"
                                        style={{ backgroundColor: isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)" }}
                                    >
                                        {teamConfig.logo ? (
                                            <Image
                                                src={teamConfig.logo}
                                                alt={team.name}
                                                width={60}
                                                height={60}
                                                className="w-full h-full object-contain p-1"
                                            />
                                        ) : (
                                            <Users size={20} className={isLight ? "text-black/40" : "text-white/40"} />
                                        )}
                                    </div>
                                </div>

                                <div className="flex border-b">
                                    <div className="flex-1 p-2 text-center border-r border-[#212130]">
                                        <p className="text-[14px] text-[#4a4a66] uppercase font-black tracking-tighter">Spent</p>
                                        <p className="text-sm font-bold text-slate-800">{formatAmount(spent)}</p>
                                    </div>
                                    <div className="flex-1 p-2 text-center">
                                        <p className="text-[14px] text-[#4a4a66] uppercase font-black tracking-tighter">Remaining</p>
                                        <p className="text-sm font-bold" style={{ color: teamColor === "#000000" ? "#f0c040" : teamColor }}>
                                            {formatAmount(remaining)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar-thin p-2 space-y-1 bg-[#f8fafc]">
                                    {players.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full py-8 text-slate-400">
                                            <Users className="mb-2 opacity-30" size={32} />
                                            <span className="text-xs font-bold uppercase tracking-widest">No players yet</span>
                                        </div>
                                    ) : (
                                        players.map((player: any, idx: number) => {
                                            const stats = findStatsForPlayer(playerStats, player._id);
                                            return (
                                                <div
                                                    key={player._id}
                                                    onClick={() => handlePlayerClick(player, stats)}
                                                    className="flex justify-between items-center px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-all cursor-pointer hover:bg-slate-50"
                                                    style={{ backgroundColor: `${teamColor}08` }}
                                                >
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <span className="text-[9px] text-slate-400 w-4 font-bold shrink-0">{idx + 1}.</span>
                                                        <span className="text-xs text-slate-700 font-bold truncate uppercase tracking-tight">
                                                            {player.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="opacity-30">{getRoleIcon(player.role)}</div>
                                                        <span
                                                            className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                                                            style={{
                                                                color: teamColor === "#000000" ? "#f0c040" : teamColor,
                                                                backgroundColor: `${teamColor === "#000000" ? "#f0c040" : teamColor}12`,
                                                            }}
                                                        >
                                                            {player.finalAmount ? formatAmount(player.finalAmount) : `₹${player.basePrice} L`}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </section>
                        )
                    })}
                </div>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md border-none shadow-2xl overflow-hidden rounded-3xl p-0">
                    <div className="bg-slate-900 p-8 text-white relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Users size={120} />
                        </div>
                        <DialogHeader className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                                    Player Profile
                                </span>
                                <div className="p-1 rounded bg-white/10 backdrop-blur-sm">
                                    {getRoleIcon(selectedPlayer?.role)}
                                </div>
                                {selectedPlayer?.grade && (
                                    <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                                        Grade {selectedPlayer.grade}
                                    </span>
                                )}
                            </div>
                            <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-1">
                                {selectedPlayer?.name}
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 font-bold uppercase text-[11px] tracking-widest italic">
                                Season {selectedStats?.season ?? "2025"} • {selectedPlayer?.soldTo ?? "Official Squad Member"}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-8 bg-white grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
                                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 font-mono">Sold Price</span>
                                <p className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">
                                    ₹{selectedPlayer?.finalAmount ? formatAmount(selectedPlayer.finalAmount) : "—"}
                                </p>
                            </div>
                            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner flex flex-col justify-center items-center">
                                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 font-mono">Status</span>
                                <div className="flex items-center gap-1.5">
                                    <div className={`h-2 w-2 rounded-full ${selectedPlayer?.status === "sold" ? "bg-green-500 animate-pulse" : "bg-yellow-400"}`} />
                                    <p className={`text-xl font-black uppercase italic tracking-tight ${selectedPlayer?.status === "sold" ? "text-green-600" : "text-yellow-600"}`}>
                                        {selectedPlayer?.status ?? "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">Season Stats</span>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Matches</span>
                                    <p className="text-xl font-black text-slate-900">{selectedStats?.total_match ?? 0}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Runs</span>
                                    <p className="text-xl font-black text-slate-900">{selectedStats?.batting?.total_runs ?? 0}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Wickets</span>
                                    <p className="text-xl font-black text-slate-900">{selectedStats?.bowling?.total_wickets ?? 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
                                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Award className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Performance Tier</p>
                                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                                        {selectedStats?.is_mvp ? "MVP • Top Tier" : `Grade ${selectedPlayer?.grade ?? "—"} Standard`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
                                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Clock className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Availability</p>
                                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                                        {selectedPlayer?.isRetained ? "Retained Player" : "Auction Acquisition"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 italic"
                        >
                            Close Profile
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}