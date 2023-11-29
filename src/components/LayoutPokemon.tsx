/* import styles from './LayoutPokemon.module.css';
 */
interface Data {
  key: string;
  name: string;
  type: string;
  imgUrl: string;
}

export const LayoutPokemon = (props: Data) => {
  return (
    <div key={props.key} className={'pokemon'}>
      <p>
        Pokemon name: <span className={'name'}>{props.name.toUpperCase()}</span>
      </p>
      <p>
        Pokemon type: <span>{props.type}</span>
      </p>
      <img src={props.imgUrl} />
    </div>
  );
};
