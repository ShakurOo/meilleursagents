import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { useAxios } from './hooks';
import { Paths } from './router/paths';
import type { Realtor } from './types/realtor';

const INITIAL_STATE = {
  activeRealtor: null,
  isLoading: false,
  realtors: null,
};

export interface AppContextProps {
  activeRealtor: Realtor | null;
  isLoading: boolean;
  realtors: Realtor[] | null;
  setActiveRealtor?: Dispatch<SetStateAction<Realtor>>;
}
export const AppContext = createContext<AppContextProps>(INITIAL_STATE);

interface AppProviderProps {
  children: ReactNode;
}
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const { data: dataRealtors, loaded } = useAxios<Realtor[]>('realtors/', 'GET');

  const [activeRealtor, setActiveRealtor] = useState<Realtor | null>(null);

  /**
   * We setting the active realtor by listening when data / routeParams changes
   **/
  useEffect(() => {
    const canUpdateActiveRealtor =
      routeParams.realtorId &&
      Number(routeParams.realtorId) !== activeRealtor?.id &&
      dataRealtors?.length;

    if (canUpdateActiveRealtor) {
      const newActiveRealtor =
        dataRealtors.find(({ id }) => id === Number(routeParams.realtorId)) || null;

      setActiveRealtor(newActiveRealtor);
    }
  }, [routeParams.realtorId, dataRealtors]);

  /**
   * If user try to access to /realtors without providing realtorId,
   * [or]
   * If user put unknown realtorId in the url,
   * [Then]
   * We selecting the first realtor of the list by default
   **/
  useEffect(() => {
    if (dataRealtors?.length) {
      const activeRealtor = dataRealtors.find(
        ({ id }) => id === Number(routeParams.realtorId),
      );

      const newRouteParams = {
        ...routeParams,
        realtorId: activeRealtor?.id.toString() || dataRealtors[0]!.id.toString(),
      };

      const newPath = generatePath(
        `${Paths.LIST_ID}${'messageId' in newRouteParams ? '/' + Paths.MESSAGES_ID : ''}`,
        newRouteParams,
      );

      navigate(newPath, { replace: true });
    }
  }, [dataRealtors, routeParams.realtorId]);

  return (
    <AppContext.Provider
      value={{
        activeRealtor,
        isLoading: !loaded,
        realtors: dataRealtors,
        setActiveRealtor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
