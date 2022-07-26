import { Email } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  useTheme,
} from '@mui/material';
import type { FC } from 'react';
import { useCallback, useContext } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { AppContext } from '../../../App.context';
import { Logo } from '../../../components';
import { Paths } from '../../../router/paths';
import { AGENCIES_TITLE } from './constants';
import { Wrapper, WrapperActions, WrapperLogo } from './styles';

export const Header: FC = () => {
  const theme = useTheme();
  const routeParams = useParams();
  const navigate = useNavigate();

  const { activeRealtor, isLoading, realtors } = useContext(AppContext);

  const handleRealtorChange = useCallback(
    (event: SelectChangeEvent<HTMLSelectElement>) => {
      const selectedId = event.target.value;
      const newRouteParams = {
        ...routeParams,
        realtorId: realtors?.find(({ id }) => id === Number(selectedId))?.id.toString(),
      };

      const newPath = generatePath(Paths.LIST_ID, newRouteParams);
      navigate(newPath);
    },
    [realtors],
  );

  return (
    <Wrapper data-testid="main-header">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <WrapperLogo>
            <Logo fill={theme.palette.secondary.main} />
          </WrapperLogo>

          <WrapperActions>
            <LoadingButton
              className="unread-counter"
              disableFocusRipple
              disableRipple
              disabled={!isLoading && !activeRealtor}
              loading={isLoading}
              size="medium"
              startIcon={<Email />}
              variant="contained"
            >
              {activeRealtor?.unread_messages || 0}
            </LoadingButton>

            {(isLoading || activeRealtor) && (
              <FormControl className="realtors-select" fullWidth>
                {isLoading ? (
                  <LoadingButton loading={true} variant="outlined" disabled>
                    ...
                  </LoadingButton>
                ) : (
                  <>
                    <InputLabel>{AGENCIES_TITLE}</InputLabel>
                    <Select
                      data-testid="realtors-select"
                      disabled={!isLoading && !activeRealtor}
                      label={AGENCIES_TITLE}
                      onChange={handleRealtorChange}
                      size="small"
                      value={(activeRealtor?.id?.toString() as any) || ''}
                    >
                      {realtors?.map(({ id, name }) => (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              </FormControl>
            )}
          </WrapperActions>
        </Toolbar>
      </Container>
    </Wrapper>
  );
};
