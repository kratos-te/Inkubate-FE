/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { ArrowDownLineIcon } from "./SvgIcons";
import { SORT_LIST } from "@/config";


interface DropdownProps {
  value: string;
  setValue: Function;
  setSortAscending: Function;
  className?: string;
}

const SortDropdown: FC<DropdownProps> = ({ value, setValue, setSortAscending, className }) => {



  const handelSetData = (item: any) => {
    setValue(item.value);
    setSortAscending(item.ascending)
  }
  return (
    <div
      className={`${className} w-[177px] h-11 group bg-dark-400 rounded-lg relative z-50 text-[14px]`}
    >
      <div className="flex items-center px-3 text-left text-white h-11 font-readex">
        {SORT_LIST.find((item) => item.value === value)?.title}
        <span className="absolute right-0 w-6 h-6 mt-3 ">
          <ArrowDownLineIcon />
        </span>
      </div>

      <div className="group-hover:flex absolute text-white hidden top-[42px] w-[177px] z-50 rounded-b-lg overflow-hidden">
        <div className="text-white bg-dark-400 flex-col justify-start rounded-lg mt-1">
          {SORT_LIST.map(
            (item, key) =>
              // item.value !== value && (
                <button
                  onClick={() => handelSetData(item)} 
                  key={key}
                  className="px-3 text-left hover:bg-dark-500 h-11 w-full duration-300 font-readex"
                >
                  {item.title}
                </button>
            // )
          )}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
