import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from './store';
import {TypedUseSelectorHook} from 'react-redux';
import {Root} from "react-dom/client";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;