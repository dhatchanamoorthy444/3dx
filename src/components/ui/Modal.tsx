'use client';

import React, { forwardRef, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = 'md',
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose();
        }
      };

      if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [open, closeOnEscape, onClose]);

    if (!open) return null;

    const sizeStyles = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-[90vw]',
    };

    const modalContent = (
      <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />
        <div
          ref={ref}
          className={`modal-content relative w-full ${sizeStyles[size]} animate-scale-in pointer-events-auto ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-800">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-xl font-bold text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="text-sm text-slate-400 mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    );

    if (typeof window !== 'undefined') {
      return createPortal(modalContent, document.body);
    }

    return null;
  }
);

Modal.displayName = 'Modal';

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  side?: 'bottom' | 'right' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'full';
  showHandle?: boolean;
  children: React.ReactNode;
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      side = 'bottom',
      size = 'md',
      showHandle = true,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [open, onClose]);

    if (!open) return null;

    const sizeStyles = {
      sm: 'h-[30vh] max-h-[30vh]',
      md: 'h-[50vh] max-h-[50vh]',
      lg: 'h-[70vh] max-h-[70vh]',
      full: 'h-[90vh] max-h-[90vh]',
    };

    const sideStyles = {
      bottom: 'bottom-0 left-0 right-0 rounded-t-3xl animate-slide-up',
      right: 'right-0 top-0 bottom-0 w-[400px] max-w-[90vw] rounded-l-3xl animate-slide-left',
      left: 'left-0 top-0 bottom-0 w-[400px] max-w-[90vw] rounded-r-3xl animate-slide-right',
    };

    const sheetContent = (
      <div className="fixed inset-0 z-[1050] flex pointer-events-none">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={ref}
          className={`sheet-content relative flex flex-col ${sizeStyles[size]} ${sideStyles[side]} pointer-events-auto w-full ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'sheet-title' : undefined}
          aria-describedby={description ? 'sheet-description' : undefined}
          {...props}
        >
          {showHandle && (
            <div className="flex justify-center pt-4">
              <div className="w-10 h-1.5 rounded-full bg-slate-700" />
            </div>
          )}
          {(title || description) && (
            <div className="px-6 pb-4 border-b border-slate-800">
              {title && (
                <h2 id="sheet-title" className="text-xl font-bold text-white">
                  {title}
                </h2>
              )}
              {description && (
                <p id="sheet-description" className="text-sm text-slate-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    );

    if (typeof window !== 'undefined') {
      return createPortal(sheetContent, document.body);
    }

    return null;
  }
);

Sheet.displayName = 'Sheet';

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'default' | 'danger';
  loading?: boolean;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'default',
  loading = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="sm">
      <div className="flex flex-col gap-4">
        {description && <p className="text-slate-400">{description}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

import { Button } from './Button';