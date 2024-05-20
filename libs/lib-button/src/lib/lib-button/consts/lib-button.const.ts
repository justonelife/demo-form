import { LibButtonSize, LibButtonStatus } from "../types";

export const STATUS_TO_KLASS: Record<LibButtonStatus, string[]> = {
    'danger': ['bg-red-500', 'text-white'],
    'info': ['bg-slate-200', 'text-black'],
    'warning': ['bg-yellow-500', 'text-black'],
    'success': ['bg-green-500', 'text-white'],
    'primary': ['bg-blue-500', 'text-white'],
}

export const SIZE_TO_KLASS: Record<LibButtonSize, string[]> = {
    'large': ['py-4', 'px-4'],
    'medium': ['py-2', 'px-3'],
    'small': ['py-1', 'px-3'],
}