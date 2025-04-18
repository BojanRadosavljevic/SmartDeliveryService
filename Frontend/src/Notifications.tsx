export const showNotification = (message: string) => {
    if (Notification.permission === "granted") {
        new Notification("Nova Notifikacija", {
            body: message,
        });
    }
};
