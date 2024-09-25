import { BaseMessage, BaseMessageContent, ChatOptions } from '@/types';
import { useState, useCallback } from 'react';

// Define base types

export function useChat<T extends BaseMessageContent = BaseMessageContent>(
    options: ChatOptions<T> = {
        responsefieldMapping: {
            text: 'response',
        },
    }
) {
    const [messages, setMessages] = useState<BaseMessage<T>[]>(() =>
        options.initialMessage
            ? [
                  {
                      id: crypto.randomUUID(),
                      content: { text: options.initialMessage } as T,
                      createdAt: new Date(),
                      role: 'assistant',
                  },
              ]
            : []
    );
    const [input, setInput] = useState(() => options.initialInput || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const apiUrl = options.apiUrl || '/api/chat';
    const responsefieldMapping = options.responsefieldMapping;

    const addMessage = useCallback(
        (message: Omit<BaseMessage<T>, 'id' | 'createdAt'>) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    ...message,
                    id: crypto.randomUUID(),
                    createdAt: new Date(),
                },
            ]);
        },
        []
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setInput(event.target.value);
        },
        []
    );

    const handleSubmit = useCallback(
        async (event?: { preventDefault?: () => void }) => {
            event?.preventDefault?.();
            if (!input.trim()) return;

            setIsLoading(true);
            setError(null);
            const userMessage = input.trim();
            addMessage({ role: 'user', content: { text: userMessage } as T });
            setInput('');

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        questions: userMessage,
                        session_id: '123',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to get response from chatbot');
                }

                const data = await response.json();

                const content = {} as T;

                // Apply field mapping
                for (const [key, apiField] of Object.entries(
                    responsefieldMapping
                )) {
                    if ((apiField as string) in data) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (content as any)[key] = data[apiField as string];
                    }
                }

                addMessage({
                    role: 'assistant',
                    content,
                });
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                    if (options.onError) {
                        options.onError(error);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            input,
            addMessage,
            options.onError,
            apiUrl,
            options.responsefieldMapping,
        ]
    );

    const setInitialMessage = useCallback((message: BaseMessage<T>) => {
        setMessages([message]);
        setError(null);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setInput('');
        setError(null);
    }, []);

    return {
        messages,
        input,
        isLoading,
        error,
        handleInputChange,
        handleSubmit,
        setInitialMessage,
        clearMessages,
    };
}

export default useChat;
