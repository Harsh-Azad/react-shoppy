import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
 fetchAllProductsAsync,
  selectAllProducts,
  fetchProductsByFiltersAsync,
} from '../ProductSlice';

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon  } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";


const sortOptions = [
  // { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', sort: 'rating', current: false },
  // { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', sort: 'price',order:'asc', current: false },
  { name: 'Price: High to Low', sort: 'price',order:'desc', current: false },
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'beauty', label: 'beauty', checked: false },
      { value: 'fragrances', label: 'fragrances', checked: false },
      { value: 'furniture', label: 'furniture', checked: false },
      { value: 'groceries', label: 'groceries', checked: false },
      {
        value: 'home-decoration',
        label: 'home-decoration',
        checked: false
      },
      {
        value: 'kitchen-accessories',
        label: 'kitchen-accessories',
        checked: false
      },
      { value: 'laptops', label: 'laptops', checked: false },
      { value: 'mens-shirts', label: 'mens-shirts', checked: false },
      { value: 'mens-shoes', label: 'mens-shoes', checked: false },
      { value: 'mens-watches', label: 'mens-watches', checked: false },
      {
        value: 'mobile-accessories',
        label: 'mobile-accessories',
        checked: false
      }
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'Essence', label: 'Essence', checked: false },
      { value: 'Glamour Beauty', label: 'Glamour Beauty', checked: false },
      { value: 'Velvet Touch', label: 'Velvet Touch', checked: false },
      { value: 'Chic Cosmetics', label: 'Chic Cosmetics', checked: false },
      { value: 'Nail Couture', label: 'Nail Couture', checked: false },
      { value: 'Calvin Klein', label: 'Calvin Klein', checked: false },
      { value: 'Chanel', label: 'Chanel', checked: false },
      { value: 'Dior', label: 'Dior', checked: false },
      {
        value: 'Dolce & Gabbana',
        label: 'Dolce & Gabbana',
        checked: false
      },
      { value: 'Gucci', label: 'Gucci', checked: false },
      {
        value: 'Annibale Colombo',
        label: 'Annibale Colombo',
        checked: false
      },
      { value: 'Furniture Co.', label: 'Furniture Co.', checked: false },
      { value: 'Knoll', label: 'Knoll', checked: false },
      { value: 'Bath Trends', label: 'Bath Trends', checked: false },
      { value: undefined, label: undefined, checked: false },
      { value: 'Apple', label: 'Apple', checked: false },
      { value: 'Asus', label: 'Asus', checked: false },
      { value: 'Huawei', label: 'Huawei', checked: false },
      { value: 'Lenovo', label: 'Lenovo', checked: false },
      { value: 'Dell', label: 'Dell', checked: false },
      { value: 'Fashion Trends', label: 'Fashion Trends', checked: false },
      { value: 'Gigabyte', label: 'Gigabyte', checked: false },
      { value: 'Classic Wear', label: 'Classic Wear', checked: false },
      { value: 'Casual Comfort', label: 'Casual Comfort', checked: false },
      { value: 'Urban Chic', label: 'Urban Chic', checked: false },
      { value: 'Nike', label: 'Nike', checked: false },
      { value: 'Puma', label: 'Puma', checked: false },
      { value: 'Off White', label: 'Off White', checked: false },
      {
        value: 'Fashion Timepieces',
        label: 'Fashion Timepieces',
        checked: false
      },
      { value: 'Longines', label: 'Longines', checked: false },
      { value: 'Rolex', label: 'Rolex', checked: false },
      { value: 'Amazon', label: 'Amazon', checked: false }
    ],
  },
]

function classNames(...classes) { 
  return classes.filter(Boolean).join(' ')
}


export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); //state for mobile filters,
  const products = useSelector(selectAllProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

  const handleFilter = (e,section,option) => {
      console.log(e.target.checked)
      const newFilter = {...filter};
      // TODO : on server it will support multiple categories
      if(e.target.checked){
        if(newFilter[section.id]){
          newFilter[section.id].push(option.value)
        } else{
          newFilter[section.id] = [option.value]
        }
      } else{
         const index = newFilter[section.id].findIndex(el=>el===option.value)
         newFilter[section.id].splice(index,1);
      }
      console.log({newFilter});
      setFilter(newFilter);
  }

  //TODO high to low not working fix later

  // trying to impliment reverse sort above ^

  const handleSort = (e,option) => {
    // e.preventDefault();
    // const newFilter = {...filter,_sort:option.sort,_order:option.order};
    // setFilter(newFilter);
    // dispatch(fetchProductsByFiltersAsync(newFilter));
    const sort = { _sort: option.sort, _order: option.order };
    console.log({sort});
    setSort(sort);
}

  // useEffect(() => {
  //   dispatch(fetchAllProductsAsync())
  // },[dispatch])

  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync({filter, sort}));
  }, [dispatch,filter,sort]);

  return (
    <div>
      <div>

      {/* 1.categories side icon */}
      <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter handleFilter={handleFilter} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen}></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <p
                              onClick={e=>handleSort(e,option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter handleFilter={handleFilter}></DesktopFilter>
 
              {/* Product grid */}
              <div className="lg:col-span-3">{
                /* this is our product list */
                <ProductGrid products={products}></ProductGrid>
                
                }</div>
                {/* Product section end here */}
            </div>
          </section>
    {/* section of Product and filter end here */}

    {/* footer Pagination start here  */}
                <Pagenation></Pagenation>
    {/* footer pagination end here */}
        </main>
      </div>
    </div>


      </div>
    </div>
  );
}


function MobileFilter({mobileFiltersOpen, setMobileFiltersOpen,handleFilter}) {
  return (
    <div>
              {/* Mobile filter dialog */}
              <Transition show={mobileFiltersOpen}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={e=>handleFilter(e,section,option)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
    </div>
  ) ;
}

function DesktopFilter({handleFilter}) {
  return (
    <form className="hidden lg:block">

    {filters.map((section) => (
      <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">{section.name}</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onChange={e=>handleFilter(e,section,option)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    ))}
  </form>
  ) ;
}

function Pagenation() {
  return ( <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
  </div> );
}

function ProductGrid({products}) {
  return (
                    /* this is our product list */
                    <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
              
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                          <Link to ="/Productdetail"
                           key={product.id} href={product.thumbnail} className="group border-solid border-2 p-2 border-gray-200">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                              />
                            </div>
                            {/* <h3 className="mt-4 text-sm text-gray-700">{product.title} {product.rating}</h3> */}
                            <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                    <h3>{product.title}</h3>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                            <div>
                            <p className="mt-1 text-lg font-medium text-gray-900">${Math.round(product.price*(1-product.discountPercentage/100))}</p>
                            <p className="line-through mt-1 text-lg font-medium text-gray-600">${product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
  );
}

// export default ProductGrid;

// export default Pagenation;

// export default DesktopFilter;

// export default MobileFilter;
