import { Email } from '@mui/icons-material';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  useTheme,
} from '@mui/material';
import { FC, useCallback, useContext } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { Logo } from '../../../components/Icons/Logo';
import { paths } from '../../../router/paths';
import { ViewsContext } from '../../Views.context';
import { AGENCIES_TITLE } from './constants';
import { Wrapper, WrapperActions, WrapperLogo } from './styles';

export const Header: FC = () => {
  const theme = useTheme();
  const routeParams = useParams();
  const navigate = useNavigate();

  const { activeRealtor, realtors } = useContext(ViewsContext);

  const handleRealtorChange = useCallback(
    (event) => {
      const selectedId = event.target.value;
      const newRouteParams = {
        ...routeParams,
        realtorId: realtors?.find(({ id }) => id === selectedId)?.id.toString(),
      };

      const newPath = generatePath(paths.LIST_ID, newRouteParams);
      navigate(newPath);
    },
    [realtors],
  );

  return (
    <Wrapper>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WrapperLogo>
            <Logo fill={theme.palette.secondary.main} />
          </WrapperLogo>

          <WrapperActions>
            <Button
              className="unread-counter"
              variant="contained"
              size="medium"
              startIcon={<Email />}
            >
              {activeRealtor?.unread_messages}
            </Button>

            <FormControl className="realtors-select" fullWidth>
              <InputLabel>{AGENCIES_TITLE}</InputLabel>
              <Select
                value={activeRealtor?.id || ''}
                label={AGENCIES_TITLE}
                onChange={handleRealtorChange}
                size="small"
              >
                {realtors?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </WrapperActions>
        </Toolbar>
      </Container>
    </Wrapper>
  );
};
