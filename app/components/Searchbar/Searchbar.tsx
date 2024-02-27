import { SearchIcon } from "@/app/icons/SearchIcon";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";

interface SearchbarProps {
  onSearch: (searchTerm: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <>
      <div className="flex pl-10 pr-20 justify-start">
        <Input
          startContent={<SearchIcon />}
          type="text"
          placeholder="Search By Name..."
          value={searchTerm}
          onChange={handleChange}
          className="bg-background rounded-large w-full "
        />
      </div>
    </>
  );
};

export default Searchbar;
