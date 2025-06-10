import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeNotification } from '../../store/slices/uiSlice';

const NotificationToast: React.FC = () => {
  const notifications = useAppSelector(state => state.ui.notifications);
  const dispatch = useAppDispatch();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  useEffect(() => {
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => {
        const Icon = getIcon(notification.type);
        const colors = getColors(notification.type);

        return (
          <div
            key={notification.id}
            className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-sm animate-in slide-in-from-right ${colors}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => dispatch(removeNotification(notification.id))}
              className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationToast;