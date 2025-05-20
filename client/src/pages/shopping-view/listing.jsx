import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  //console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShoppingListing() {

    const dispatch = useDispatch();
    const {productList} = useSelector(state=> state.shopProducts);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

      function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

   // console.log(cpyFilters)
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

    useEffect(()=> {
        setSort("price-lowtohigh")
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, []);

    useEffect(()=> {
        if(filters && Object.keys(filters).length > 0){
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString))
        }
    }, [filters])
    // fetch list os products
    useEffect(() => {
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}));
}, [dispatch, sort, filters]);


   // console.log(productList)

    return <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter filters={filters} handleFilter={handleFilter}/>
        <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex border-gray-200 items-center justify-between">
                <h2 className="text-lg font-extrabold">All Products</h2>
                <div className="flex items-center gap-3">
                    <span className="text-gray-500">
                        {
                            productList.length
                        } Products
                    </span>
                       <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center border cursor-pointer border-gray-200 gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white p-4 shadow-md z-50">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}> 
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="cursor-pointer hover:bg-blue-100 transition-shadow p-3"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    productList && productList.length > 0 ?
                    productList.map((prodctItem, index) => (
                    <div key={prodctItem.id || index}>
                        <ShoppingProductTile product={prodctItem} />
                    </div>
                    )) 
                    : null
                }
            </div>
        </div>
    </div>
};

export default ShoppingListing;