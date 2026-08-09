import * as React from "react";
import { Bell, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

import NotificationList from "./NotificationList";
import { notificationData, type Notification } from "./notificationData";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(notificationData);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  const handleMarkAsRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification,
      ),
    );
  }, []);

  const handleMarkAllAsRead = React.useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    );
  }, []);

  const handleDelete = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-orange-500" />

            <h1 className="text-2xl font-bold text-foreground">
              Notifications
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Stay updated with your latest activities and alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleMarkAllAsRead}
            className="w-full gap-2 rounded-xl border-border sm:w-auto"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notification List */}
      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  );
}