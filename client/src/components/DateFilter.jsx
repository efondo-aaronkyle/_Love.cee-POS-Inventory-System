import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DateFilter({ onChange }) {
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
                    <SelectItem value="July 12, 2026">
                        July 12, 2026
                    </SelectItem>
                    <SelectItem value="July 11, 2026">
                        July 11, 2026
                    </SelectItem>
                    <SelectItem value="July 10, 2026">
                        July 10, 2026
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}