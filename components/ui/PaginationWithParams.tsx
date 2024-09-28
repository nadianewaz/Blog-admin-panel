import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Pagination} from "antd";

interface PaginationWithParamsProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number, size: number) => void;
  pageSize?: number;
  className?: string;
}

const PaginationWithParams: React.FC<PaginationWithParamsProps> = (
  {
    totalItems,
    currentPage,
    pageSize = 10,
    onPageChange,
    className = '',
  }) => {
  const pathname = usePathname();

  const [pageNumber, setPageNumber] = useState<number>(currentPage);
  const [size, setSize] = useState<number>(pageSize);

  useEffect(() => {
    setPageNumber(currentPage)
    updateQueryParams(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePaginationChange = (page: number, size: number) => {
    setPageNumber(page);
    setSize(size);
    updateQueryParams(page, size);
    onPageChange(page, size);
  };

  const updateQueryParams = (newPage: number, size: number) => {
    const params = new URLSearchParams({
      page: String(newPage),
      size: String(size),
    });
    const newUrl = `${pathname}?${params.toString()}`;
    history.pushState({}, '', newUrl);
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Pagination
        current={pageNumber}
        total={totalItems}
        pageSize={size}
        onChange={handlePaginationChange}
        className='!mt-8'
      />
    </div>
  );
};

export default PaginationWithParams;
