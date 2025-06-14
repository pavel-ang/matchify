import { useAuth0 } from "@auth0/auth0-react";

const cloudFunctionURL = "https://us-central1-core-chemist-461519-f4.cloudfunctions.net/sendNotification";

const useNotificationService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const sendNotification = async (toUserId: string, fromUserId: string, type: string) => {
    const token = await getAccessTokenSilently();

    const res = await fetch(cloudFunctionURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: toUserId,
        from: fromUserId,
        type,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Cloud function error:", errText);
    }
  };

  return { sendNotification };
};

export default useNotificationService;
