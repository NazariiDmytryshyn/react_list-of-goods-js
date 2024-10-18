import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortButton, setSortButton] = useState({
    alphabetically: false,
    length: false,
    reverse: false,
    reset: false,
  });

  const sortAlphabetically = () => {
    const sortedGoods = [...visibleGoods].sort();

    if (sortButton.reverse) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
    setSortButton(prevState => ({
      ...prevState,
      alphabetically: true,
      length: false,
      reset: true,
    }));
  };

  const sortByLength = () => {
    const sortedGoods = [...visibleGoods].sort((goods1, goods2) => {
      if (goods1.length !== goods2.length) {
        return goods1.length - goods2.length;
      }

      return goods1.localeCompare(goods2);
    });

    if (sortButton.reverse) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
    setSortButton(prevState => ({
      ...prevState,
      alphabetically: false,
      length: true,
      reset: true,
    }));
  };

  const reverseSort = () => {
    if (sortButton.reverse) {
      let sortedGoods = [...goodsFromServer];

      if (sortButton.alphabetically) {
        sortedGoods = sortedGoods.sort();
      }

      if (sortButton.length) {
        sortedGoods = sortedGoods.sort(
          (goods1, goods2) => goods1.length - goods2.length,
        );
      }

      setVisibleGoods(sortedGoods);
      setSortButton(prevState => ({
        ...prevState,
        reverse: false,
        reset: prevState.alphabetically || prevState.length,
      }));
    } else {
      setVisibleGoods([...visibleGoods].reverse());
      setSortButton(prevState => ({
        ...prevState,
        reverse: true,
        reset: true,
      }));
    }
  };

  const resetSort = () => {
    setVisibleGoods([...goodsFromServer]);
    setSortButton({
      alphabetically: false,
      reverse: false,
      length: false,
      reset: false,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-active': sortButton.alphabetically,
            'is-light': !sortButton.alphabetically,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        {/* "button is-success is-light" */}
        <button
          type="button"
          className={cn('button is-success', {
            'is-active': sortButton.length,
            'is-light': !sortButton.length,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-active': sortButton.reverse,
            'is-light': !sortButton.reverse,
          })}
          onClick={reverseSort}
        >
          Reverse
        </button>

        {sortButton.reset ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
