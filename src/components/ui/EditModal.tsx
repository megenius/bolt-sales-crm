import React from 'react';
import { X, Save, Loader2 } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isDirty?: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  children, 
  isLoading = false,
  isDirty = false 
}) => {
  if (!isOpen) return null;

  const handleSave = () => {
    if (!isLoading) {
      onSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <div className="flex items-center space-x-2">
            {isDirty && (
              <span className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Unsaved changes
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isLoading || !isDirty}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EditModal;