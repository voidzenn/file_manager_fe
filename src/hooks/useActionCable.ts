import { useEffect, useState } from 'react';
import ActionCable, { Channel } from 'actioncable';

type SendFunction = (action: string, message: unknown) => void;

interface HookReturnType {
  subscription: Channel | null;
  receivedData: unknown;
  send: SendFunction | null;
}

export const useActionCable = (channelName: string): HookReturnType => {
  const [subscription, setSubscription] = useState<Channel | null>(null);
  const [receivedData, setReceivedData] = useState<unknown>();
  const [send, setSend] = useState<SendFunction | null>(null);

  useEffect(() => {
    const consumer = ActionCable.createConsumer('ws://localhost:3000/cable');

    const newSubscription = consumer.subscriptions.create(channelName, {
      connected() {
        console.log('Connected to channel');
      },

      disconnected() {
        console.log('Disconnected');
      },

      received(data: unknown) {
        setReceivedData(data);
      },
    }) as Channel;

    const sendFn: SendFunction = (action, message) => {
      newSubscription.perform(action, { message });
    };

    setSubscription(newSubscription);
    setSend(() => sendFn);

    return () => {
      if (newSubscription) {
        newSubscription.unsubscribe();
      }
    };
  }, [channelName]);

  return { subscription, receivedData, send };
};
