import styled from '@emotion/styled';

import Text from '../../muiComponents/Text';
import { default as MuiListItemText } from '../../muiComponents/ListItemText';
import { Theme } from '../../design-tokens/theme';

export const StyledText = styled(Text)<{ theme?: Theme }>(props => ({
  fontWeight: props.theme && props.theme.fontWeight.bold,
}));

export const Spacer = styled('div')<{ theme?: Theme }>(({ theme }) => ({
  flex: '1 1 auto',
  borderBottom: `1px dotted ${theme?.palette.type == 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'} `,
  whiteSpace: 'nowrap',
  height: '0.5em',
}));

export const ListItemText = styled(MuiListItemText)<{ theme?: Theme }>(({ theme }) => ({
  flex: 'none',
  color: theme?.palette.type == 'light' ? theme?.palette.black : theme?.palette.white,
  opacity: 0.6,
}));
