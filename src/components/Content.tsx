import Pagination from './Pagination';
import Cards from './Cards';
import { IDataFetch } from '../types/interfaces';

interface IProps {
  showPagination: boolean;
  dataFetch: IDataFetch;
  fetchPaginationData: (pageNumber: number) => void;
  handleCardClick: (id: number) => Promise<void>;
}

export default function Content({
  showPagination,
  dataFetch,
  fetchPaginationData,
  handleCardClick,
}: IProps): JSX.Element {
  return (
    <div className="content">
      <Cards dataFetch={dataFetch} onCardClick={handleCardClick} />
      {showPagination && <Pagination onPageChange={fetchPaginationData} />}
    </div>
  );
}
