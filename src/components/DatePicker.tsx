import { FC, useEffect, useState } from "react";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isToday,
    parse,
    startOfToday,
    startOfWeek,
    addMonths,
    addDays,
} from "date-fns";
import Typography from "./Typography";
import { NextIcon, PrevIcon } from "./SvgIcons";

interface DatePrickerProps {
    type: string
    range: number
}

export const DatePicker: FC<DatePrickerProps> = ({ type, range }) => {

    const today = startOfToday();
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];


    const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
    const [startDay, setStartDay] = useState(() => format(today, "MM/dd/yyyy"))
    const [endDay, setEndDay] = useState(() => format(addMonths(today, 3), "MM/dd/yyyy"))
    const [seletedDay, setSeletedDay] = useState<Date>()
    const [isSeletedDay, setIsSelectedDay] = useState(false)
    let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

    useEffect(() => {
        if (seletedDay) {
            if (seletedDay === today) {
                if (type === "day") {
                    setEndDay(format(addDays(today, range), "MM/dd/yyyy"))
                }
                if (type === "month") {
                    setEndDay(format(addMonths(today, range), "MM/dd/yyyy"))
                }
            } else {
                if (type === "day") {
                    setEndDay(format(addDays(seletedDay, range), "MM/dd/yyyy"))
                }
                if (type === "month") {
                    setEndDay(format(addMonths(seletedDay, range), "MM/dd/yyyy"))
                }
            }
        }
        console.log("endDay", endDay)
    }, [range])

    const capitalizeFirstLetter = (query: string): string => {
        return query.charAt(0).toUpperCase() + query.substring(1);
    };

    const daysInMonth = eachDayOfInterval({
        start: startOfWeek(firstDayOfMonth),
        end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });

    const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
        setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
    };

    const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
        setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
    };

    const handleSetDate = (day: Date) => {
        const today = new Date();
        // if(day )
        if (day > today) {
            setEndDay(format(day, "MM/dd/yyyy"))
        }
        const settedDay = format(day, "MM/dd/yyyy")
        if (settedDay < endDay) {
            setStartDay(settedDay)
        }

        // setSeletedDay(day)
        // setIsSelectedDay(true)
    }

    const handleSetStartDay = (e: any) => {
        setStartDay(e.target.value)
    }

    return (
        <>
            <div className="flex mt-5 justify-between items-center">
                <div className="flex-col gap-2 w-[209px]">
                    <Typography className="text-left text-lg text-white font-semibold max-sm:text-[16px]">
                        Starting
                    </Typography>

                    {/* <input type="text" className="text-white text-[14px] font-normal bg-[#616161]" value={startDay} /> */}
                    <input
                        className="bg-[#616161] w-full rounded-[8px] mt-2 px-3 py-[14px] max-sm:py-[12px] text-light-100 text-[14px]placeholder:text-third"
                        placeholder="--/--/----"
                        value={startDay}
                        onChange={handleSetStartDay}
                    />

                </div>
                <div className="border-b border-white h-1/2 w-[15px] mt-10"></div>
                <div className="flex-col gap-2 w-[209px]">
                    <Typography className="text-left text-lg text-white w-[209px] font-semibold max-sm:text-[16px]">
                        Ending
                    </Typography>
                    <input
                        className="bg-[#616161] w-full rounded-[8px] mt-2 px-3 py-[14px] max-sm:py-[12px] text-light-100 text-[14px]placeholder:text-third"
                        placeholder="--/--/----"
                        value={endDay}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-[14px] px-[10px] mt-[40px]">
                <div className="flex justify-between">
                    <button onClick={getPrevMonth}>
                        <PrevIcon color="#666666" />
                    </button>
                    <div>
                        <p className="font-semibold text-xl text-white">
                            {format(firstDayOfMonth, "MMMM yyyy")}
                        </p>
                    </div>
                    <button onClick={getNextMonth}>
                        <NextIcon />
                    </button>

                </div>
                <div className="grid grid-cols-7 gap-[19px]  place-items-center">
                    {days.map((day, idx) => {
                        return (
                            <div key={idx} className="font-semibold text-[20px] text-[#8E8C9A]">
                                {capitalizeFirstLetter(day)}
                            </div>
                        );
                    })}
                </div>
                <div className="grid grid-cols-7 gap-[19px]  mt-[14px] place-items-center">
                    {daysInMonth.map((day, idx) => {
                        return (
                            <div key={idx} className={colStartClasses[getDay(day)]}>
                                <button
                                    className={`cursor-pointer disabled:cursor-not-allowed flex items-center justify-center text-[20px]  font-semibold h-12 w-12 rounded-[12px] ${isToday(day) ? " bg-secondary text-white" : "text-[#CAC7C7] hover:bg-[#666666] hover:text-white active:bg-[#666666]"}  ${format(day, "MMM") !== currMonth.slice(0, 3) ? "hidden" : ""} ${startDay <= format(day, "MM/dd/yyyy") && (format(day, "MM/dd/yyyy") <= endDay) ? "bg-[#666666]" : ""}`}
                                    onClick={() => handleSetDate(day)}
                                    disabled={day < today}
                                >
                                    {format(day, "d")}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}