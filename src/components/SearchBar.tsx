import { FC, useEffect, useState } from "react";
import { SearchIcon } from "./SvgIcons";

const SearchBar: FC = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (search !== "") {
      setShow(true)
    } else { setShow(false) }
  }, [search])
  return (
    <div
      className="rounded-xl w-[250px] xl:w-[430px] 2xl:w-[500px]  p-[1px] hidden lg:block relative h-11 backdrop-blur-sm"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%, rgba(246, 246, 246, 0.00) 100%)",
      }}
    >
      {/* <div
        className="inline-flex items-center py-3 rounded-[11px] px-[15px] w-full backdrop-blur-md"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.10) 100%, rgba(246, 246, 246, 0.00) 100%)",
        }}
      > */}
      <SearchIcon className="absolute left-[14px] top-[14px]" />
      <input
        className="w-full p-0 bg-transparent text-light-100 placeholder:text-white text-[15px] h-[42.5px] rounded-xl absolute left-0 top-0 pl-[38px]"
        placeholder="Search for collections and accounts"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%, rgba(246, 246, 246, 0.00) 100%)",
        }} 
        value={search}
        onChange={(e) => setSearch(e.target.value || "")}
      />
      {show && (
        <div className="absolute w-full flex flex-col  top-[50px] rounded-xl backdrop-blur-sm text-white p-4" style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%, rgba(246, 246, 246, 0.00) 100%)",
        }}>
          <div className="flex flex-col gap-2">
            <div className="text-[15px] uppercase">collections</div>
            { }
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[15px] uppercase">accounts</div>
            { }
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default SearchBar;
