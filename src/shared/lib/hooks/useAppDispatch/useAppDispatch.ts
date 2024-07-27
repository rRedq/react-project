import { AppDispatch } from 'core/providers/storeProvider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
