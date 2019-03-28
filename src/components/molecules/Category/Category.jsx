import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BodyText, Subtitle } from 'components/atoms/Typography';
import { Section } from './styles';

const Category = ({ title, data, fetchMethod, meta, keyLabel }) => {
  const { items, loading, isFetched } = meta;
  const [loadedCategory, setLoad] = useState(false);
  useEffect(() => {
    const tempData = data.filter(item => !items[item]);
    if (fetchMethod && !loading && tempData.length > 0 && !loadedCategory) {
      tempData.forEach((uri) => {
        fetchMethod(uri);
      });
      setLoad(true);
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (data.length > 0 && isFetched) {
    return (
      <Section>
        <Subtitle tag="h3">{title}</Subtitle>

        {data.map(item => {
          return (
            <BodyText key={item} tag="p">
              {items[item] && items[item][keyLabel]}
            </BodyText>
          );
        })}
      </Section>
    );
  }
  return null;
};

Category.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  fetchMethod: PropTypes.func,
  meta: PropTypes.object,
  keyLabel: PropTypes.string,
};

Category.defaultProps = {
  data: [],
  title: '',
  fetchMethod: undefined,
  meta: {},
  keyLabel: '',
};

export default memo(Category);
