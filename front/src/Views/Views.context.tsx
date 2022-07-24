import { Dispatch, FC, ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useAxios } from '../hooks/useAxios';
import { paths } from '../router/paths';

interface Realtor {
  id: number;
  logo: string;
  name: string;
  unread_messages: number;
}

const INITIAL_STATE = {
  activeRealtor: null,
  isLoading: false,
  realtors: null,
};

export interface ViewsContextProps {
  activeRealtor: Realtor | null;
  isLoading: boolean;
  realtors: Realtor[] | null;
}
export const ViewsContext = createContext<ViewsContextProps>(INITIAL_STATE);

interface ViewsProviderProps {
  children: ReactNode;
}
export const ViewsProvider: FC<ViewsProviderProps> = ({ children }) => {
  const location = useLocation();
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
        realtorId: activeRealtor?.id.toString() || dataRealtors.at(0)!.id.toString(),
      };

      const newPath = generatePath(
        `${paths.LIST_ID}${'messageId' in newRouteParams ? '/' + paths.MESSAGES_ID : ''}`,
        newRouteParams,
      );

      navigate(newPath, { replace: true });
    }
  }, [dataRealtors, routeParams.realtorId]);

  return (
    <ViewsContext.Provider
      value={{
        activeRealtor,
        isLoading: !loaded,
        realtors: dataRealtors,
      }}
    >
      {children}
    </ViewsContext.Provider>
  );
};
