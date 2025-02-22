import React, { useState, useCallback, useContext, useEffect, useMemo } from 'react';
import Add from '@material-ui/icons/Add';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { DetailContext } from '../../pages/Version';
import Tooltip from '../../muiComponents/Tooltip';
import Avatar from '../../muiComponents/Avatar';
import Box from '../../muiComponents/Box';
import FloatingActionButton from '../../muiComponents/FloatingActionButton';
import { Theme } from '../../design-tokens/theme';

import getUniqueDeveloperValues from './get-unique-developer-values';
import DevelopersTitle from './DevelopersTitle';
import { DeveloperType } from './types';

export const Fab = styled(FloatingActionButton)<{ theme?: Theme }>(props => ({
  backgroundColor: props.theme && props.theme.palette.primary.main,
  color: props.theme && props.theme.palette.white,
}));

interface Props {
  type: DeveloperType;
  visibleMax?: number;
}

const StyledBox = styled(Box)({
  '> *': {
    margin: 5,
  },
});

export const VISIBLE_MAX = 6;

const Developers: React.FC<Props> = ({ type, visibleMax = VISIBLE_MAX }) => {
  const detailContext = useContext(DetailContext);
  const { t } = useTranslation();

  if (!detailContext) {
    throw Error(t('app-context-not-correct-used'));
  }

  const developers = useMemo(() => getUniqueDeveloperValues(detailContext.packageMeta?.latest[type]), [
    detailContext.packageMeta,
    type,
  ]);

  const [visibleDevelopersMax, setVisibleDevelopersMax] = useState(visibleMax);
  const [visibleDevelopers, setVisibleDevelopers] = useState(developers);

  useEffect(() => {
    if (!developers) return;
    setVisibleDevelopers(developers.slice(0, visibleDevelopersMax));
  }, [developers, visibleDevelopersMax]);

  const handleSetVisibleDevelopersMax = useCallback(() => {
    setVisibleDevelopersMax(visibleDevelopersMax + VISIBLE_MAX);
  }, [visibleDevelopersMax]);

  if (!visibleDevelopers || !developers) return null;

  return (
    <>
      <DevelopersTitle type={type} />
      <StyledBox display="flex" flexWrap="wrap" margin="10px 0 10px 0">
        {visibleDevelopers.map(visibleDeveloper => (
          <Tooltip key={visibleDeveloper.email} title={visibleDeveloper.name}>
            <Avatar alt={visibleDeveloper.name} src={visibleDeveloper.avatar} />
          </Tooltip>
        ))}
        {visibleDevelopersMax < developers.length && (
          <Fab onClick={handleSetVisibleDevelopersMax} size="small">
            <Add />
          </Fab>
        )}
      </StyledBox>
    </>
  );
};

export default Developers;
