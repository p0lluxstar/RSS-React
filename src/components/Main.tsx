import React from 'react';
import Cards from './Cards';
import { IDataFetch } from '../types/interfaces';

interface IProps {
  dataFetch: IDataFetch;
  onCardClick: (id: number) => void;
}

export default function Main({ dataFetch, onCardClick }: IProps): JSX.Element {
  return <Cards dataFetch={dataFetch} onCardClick={onCardClick} />;
}
