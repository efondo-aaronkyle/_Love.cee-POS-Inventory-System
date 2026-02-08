import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DateFilter({ dates, onChange }) {
    return (
        <Select onValueChange={onChange}> 
            <SelectTrigger className="w-full max-w-56 bg-white border border-[#9d1a1f]/20 shadow-sm rounded-xl focus:ring-[#9d1a1f]">
                <SelectValue placeholder="Filter by date" />
            </SelectTrigger>

            <SelectContent className="bg-white border border-[#9d1a1f]/20">

                <SelectGroup>
                    <SelectLabel className="text-[#9d1a1f]">
                        Order Dates
                    </SelectLabel>
                    <SelectItem value="all">
                        All Dates
                    </SelectItem>
                    {dates.map(date => (
                        <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString("en-PH", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}